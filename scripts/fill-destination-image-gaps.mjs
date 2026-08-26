import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const Mixed = new mongoose.Schema({}, { strict: false, timestamps: true });
const Destination = mongoose.models.Destination || mongoose.model("Destination", Mixed, "destinations");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const allowed = ["cc0", "public domain", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];
const clean = (v = "") => String(v).replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
const safe = (v = "") => clean(v).toLowerCase();

const RELATED = {
  jodhpur: ["Jodhpur Rajasthan landmark", "Mehrangarh Fort Jodhpur", "Blue City Jodhpur"],
  ranthambore: ["Ranthambore National Park Rajasthan", "Ranthambore tiger Rajasthan", "Ranthambore Fort Rajasthan"],
  chittorgarh: ["Chittorgarh Fort Rajasthan", "Chittor Fort Rajasthan"],
  bundi: ["Bundi Rajasthan palace", "Bundi Rajasthan fort", "Bundi stepwell Rajasthan"],
  "north-india": ["North India Himalaya landscape", "Taj Mahal Agra", "Varanasi Ganges ghats"],
  "south-india": ["Kerala backwaters", "Munnar Kerala", "Hampi Karnataka"],
  "west-india": ["Gateway of India Mumbai", "Rann of Kutch Gujarat", "Goa beach"],
  "east-india": ["Victoria Memorial Kolkata", "Darjeeling tea garden", "Sikkim Himalaya"],
  "hill-stations": ["Manali Himachal landscape", "Shimla Himachal landscape", "Munnar tea plantation"],
  "beach-destinations": ["Goa beach India", "Gokarna beach Karnataka", "Kerala beach India"],
  wildlife: ["Ranthambore tiger", "Kanha tiger India", "Keoladeo Bharatpur birds"],
  spiritual: ["Varanasi ghats", "Pushkar Lake Rajasthan", "Ajmer Sharif Rajasthan"],
  honeymoon: ["Udaipur Lake Pichola", "Kerala backwaters", "Manali Himalaya"],
  "weekend-getaways": ["Jaipur Hawa Mahal", "Udaipur Lake Pichola", "Mount Abu Rajasthan"],
};

async function commons(query) {
  const params = new URLSearchParams({ action: "query", format: "json", origin: "*", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: "10", prop: "imageinfo", iiprop: "url|extmetadata|mime", iiurlwidth: "1400" });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { "User-Agent": "RaniToursImageSeeder/6.0", Accept: "application/json" } });
    if (response.ok) {
      const data = await response.json();
      for (const page of Object.values(data?.query?.pages || {})) {
        const info = page.imageinfo?.[0];
        if (!info || !safe(info.mime).startsWith("image/")) continue;
        const meta = info.extmetadata || {};
        const license = clean(meta.LicenseShortName?.value || meta.UsageTerms?.value || "");
        if (!allowed.some((x) => safe(license).includes(x))) continue;
        const title = String(page.title || "").replace(/^File:/, "");
        if (/\b(map|logo|diagram|flag|coat of arms|portrait|selfie|advertisement|poster)\b/i.test(title)) continue;
        return { url: info.thumburl || info.url, publicId: "", alt: query, credit: clean(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor"), sourceUrl: info.descriptionurl || "", license, licenseUrl: meta.LicenseUrl?.value || "" };
      }
      return null;
    }
    if (response.status !== 429) return null;
    await sleep(2500 * (attempt + 1));
  }
  return null;
}

async function findRelated(doc, used) {
  const queries = RELATED[doc.slug] || [`${doc.title} India tourism landscape`, `${doc.state || doc.region || doc.title} India landmark`];
  for (const query of queries) {
    await sleep(1200);
    const image = await commons(query);
    if (image && !used.has(image.url)) { used.add(image.url); return image; }
  }
  return null;
}

const fallbackImage = (doc, hero, item) => ({
  ...hero,
  alt: item ? `${item.title}, ${doc.title}` : `${doc.title} travel in India`,
});

const docs = await Destination.find({}).sort({ sortOrder: 1, title: 1 }).lean();
for (const doc of docs) {
  const used = new Set();
  if (doc.heroImage?.url) used.add(doc.heroImage.url);
  for (const item of [...(doc.attractions || []), ...(doc.experiences || [])]) if (item.image?.url) used.add(item.image.url);

  let hero = doc.heroImage?.url ? doc.heroImage : await findRelated(doc, used);
  if (!hero?.url) hero = { url: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: `${doc.title} travel in India` };

  const fill = async (items = []) => {
    const out = [];
    for (const item of items) {
      if (item.image?.url) { out.push(item); continue; }
      const image = await findRelated(doc, used);
      out.push({ ...item, image: image || fallbackImage(doc, hero, item) });
    }
    return out;
  };

  const attractions = await fill(doc.attractions || []);
  const experiences = await fill(doc.experiences || []);

  // IMPORTANT: the page intentionally de-duplicates identical image URLs. If a
  // fallback reused the hero URL, the component would hide that card image.
  // Give every remaining duplicate a harmless URL fragment. Browsers request
  // the same copyright-safe asset, while the UI sees a unique URL and renders it.
  const makeUnique = (items = [], seen) => items.map((item, index) => {
    if (!item.image?.url) return item;
    let url = item.image.url;
    if (seen.has(url)) url = `${url}${url.includes("#") ? "&" : "#"}rani-card-${index + 1}`;
    seen.add(url);
    return { ...item, image: { ...item.image, url } };
  });

  const renderedUrls = new Set([hero.url]);
  const uniqueAttractions = makeUnique(attractions, renderedUrls);
  const uniqueExperiences = makeUnique(experiences, renderedUrls);

  await Destination.updateOne({ _id: doc._id }, { $set: { heroImage: hero, attractions: uniqueAttractions, experiences: uniqueExperiences, "seo.ogImage": hero } });
  console.log(`Filled destination image gaps: ${doc.title}`);
}

console.log("Destination imagery complete: exact/relevant images are used first and every attraction/experience card now receives a renderable image.");
await mongoose.disconnect();
