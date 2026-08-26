import { createHash } from "crypto";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
if (!uri) throw new Error("MONGODB_URI is required");
if (!cloudName || !apiKey || !apiSecret) throw new Error("Cloudinary credentials are required for destination image seeding");
await mongoose.connect(uri);

const Mixed = new mongoose.Schema({}, { strict: false, timestamps: true });
const Destination = mongoose.models.Destination || mongoose.model("Destination", Mixed, "destinations");
const ALLOWED_LICENSES = ["cc0", "public domain", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];
const clean = (value = "") => String(value).replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

async function findCommonsImage(query) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "12",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1800",
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { "User-Agent": "RaniToursImageSeeder/1.0" } });
  if (!response.ok) throw new Error(`Commons search failed (${response.status}) for ${query}`);
  const json = await response.json();
  const pages = Object.values(json?.query?.pages || {}).sort((a, b) => (a.index || 999) - (b.index || 999));
  for (const page of pages) {
    const info = page.imageinfo?.[0];
    if (!info?.url) continue;
    const meta = info.extmetadata || {};
    const license = clean(meta.LicenseShortName?.value || meta.UsageTerms?.value || "");
    if (!ALLOWED_LICENSES.some((allowed) => license.toLowerCase().includes(allowed))) continue;
    const sourceUrl = info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}`;
    return {
      downloadUrl: info.thumburl || info.url,
      sourceUrl,
      credit: clean(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor"),
      license,
      licenseUrl: meta.LicenseUrl?.value || "",
      title: page.title.replace(/^File:/, ""),
    };
  }
  return null;
}

async function uploadToCloudinary(found, publicId, alt) {
  const source = await fetch(found.downloadUrl, { headers: { "User-Agent": "RaniToursImageSeeder/1.0" } });
  if (!source.ok) throw new Error(`Image download failed (${source.status}): ${found.sourceUrl}`);
  const blob = await source.blob();
  if (!blob.type.startsWith("image/")) throw new Error(`Commons returned non-image content: ${found.sourceUrl}`);

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "rani-tours/destinations";
  const paramsToSign = `folder=${folder}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}`;
  const signature = createHash("sha1").update(`${paramsToSign}${apiSecret}`).digest("hex");
  const form = new FormData();
  form.append("file", blob, found.title || `${publicId}.jpg`);
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("public_id", publicId);
  form.append("overwrite", "true");
  form.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: form });
  const data = await response.json();
  if (!response.ok || !data.secure_url) throw new Error(data?.error?.message || `Cloudinary upload failed for ${publicId}`);
  return {
    url: data.secure_url,
    publicId: data.public_id || `${folder}/${publicId}`,
    alt,
    credit: found.credit,
    sourceUrl: found.sourceUrl,
    license: found.license,
    licenseUrl: found.licenseUrl,
  };
}

async function resolveImage(query, publicId, alt) {
  const found = await findCommonsImage(query);
  if (!found) {
    console.warn(`No verified reusable Commons image found for: ${query}`);
    return null;
  }
  console.log(`Using ${found.title} for ${alt} [${found.license}]`);
  return uploadToCloudinary(found, publicId, alt);
}

const destinations = await Destination.find({}).lean();
for (const doc of destinations) {
  console.log(`\nProcessing ${doc.title}...`);
  const placeContext = [doc.title, doc.state, doc.region, doc.country || "India"].filter(Boolean).join(" ");
  const hero = await resolveImage(`${placeContext} travel landmark`, `${doc.slug}-hero`, `${doc.title}, ${doc.state || doc.region || "India"}`);

  const mapCards = async (items = [], kind) => {
    const output = [];
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      const query = `${item.title} ${doc.title} ${doc.state || doc.region || "India"}`;
      const image = await resolveImage(query, `${doc.slug}-${kind}-${slugify(item.title)}-${index + 1}`, `${item.title}, ${doc.title}`);
      output.push({ ...item, image });
    }
    return output;
  };

  const attractions = await mapCards(doc.attractions || [], "attraction");
  const experiences = await mapCards(doc.experiences || [], "experience");
  const update = {
    attractions,
    experiences,
    gallery: [],
  };
  if (hero) {
    update.heroImage = hero;
    update["seo.ogImage"] = hero;
  }
  await Destination.updateOne({ _id: doc._id }, { $set: update });
  console.log(`Finished ${doc.title}`);
}

console.log("\nDestination images now use exact-title Wikimedia Commons searches and are hosted in Cloudinary.");
await mongoose.disconnect();
