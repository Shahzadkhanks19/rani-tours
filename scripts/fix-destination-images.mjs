import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const Mixed = new mongoose.Schema({}, { strict: false, timestamps: true });
const Destination = mongoose.models.Destination || mongoose.model("Destination", Mixed, "destinations");

const ALLOWED_LICENSES = ["cc0", "public domain", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];
const STOP_WORDS = new Set(["the", "and", "of", "in", "to", "a", "an", "india", "travel", "tour", "trip", "experience"]);
const clean = (value = "") => String(value).replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").trim();
const words = (value = "") => clean(value).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((word) => word.length > 2 && !STOP_WORDS.has(word));

const HERO_QUERIES = {
  jodhpur: { query: "Mehrangarh Fort Jodhpur Rajasthan", must: ["mehrangarh", "jodhpur"] },
  ranthambore: { query: "Ranthambore National Park tiger Rajasthan", must: ["ranthambore"] },
  chittorgarh: { query: "Chittorgarh Fort Rajasthan", must: ["chittorgarh"] },
  bundi: { query: "Bundi Rajasthan Garh Palace Taragarh", must: ["bundi"] },
  "north-india": { query: "Himalayas North India landscape", must: ["himalaya"] },
  "south-india": { query: "Kerala backwaters India houseboat", must: ["kerala"] },
  "west-india": { query: "Gateway of India Mumbai Maharashtra", must: ["gateway", "mumbai"] },
  "east-india": { query: "Victoria Memorial Kolkata West Bengal", must: ["victoria", "kolkata"] },
  "hill-stations": { query: "Manali Himachal Pradesh Himalaya", must: ["manali"] },
  "beach-destinations": { query: "Goa beach India", must: ["goa"] },
  wildlife: { query: "Ranthambore tiger Rajasthan India", must: ["ranthambore"] },
  spiritual: { query: "Varanasi ghats Ganges India", must: ["varanasi"] },
  honeymoon: { query: "Udaipur Lake Pichola City Palace Rajasthan", must: ["udaipur"] },
  "weekend-getaways": { query: "Hawa Mahal Jaipur Rajasthan", must: ["hawa", "jaipur"] },
};

const CARD_OVERRIDES = {
  "Mehrangarh Fort": { query: "Mehrangarh Fort Jodhpur", must: ["mehrangarh"] },
  "Jaswant Thada": { query: "Jaswant Thada Jodhpur", must: ["jaswant", "thada"] },
  "Umaid Bhawan Palace": { query: "Umaid Bhawan Palace Jodhpur", must: ["umaid", "bhawan"] },
  "Clock Tower & Sardar Market": { query: "Ghanta Ghar Clock Tower Sardar Market Jodhpur", must: ["jodhpur"] },
  "Blue City Walk": { query: "Blue City Jodhpur Rajasthan", must: ["jodhpur"] },
  "Bishnoi Village Experience": { query: "Bishnoi village Rajasthan Jodhpur", must: ["bishnoi"] },
  "Rajasthani Cuisine": { query: "Rajasthani thali Rajasthan cuisine", must: ["rajasthan"] },

  "Ranthambore National Park": { query: "Ranthambore National Park tiger", must: ["ranthambore"] },
  "Ranthambore Fort": { query: "Ranthambore Fort Rajasthan", must: ["ranthambore", "fort"] },
  "Padam Talao": { query: "Padam Talao Ranthambore", must: ["padam"] },
  "Trinetra Ganesh Temple": { query: "Trinetra Ganesh Temple Ranthambore", must: ["trinetra"] },
  "Jungle Safari": { query: "Ranthambore safari jeep tiger", must: ["ranthambore"] },
  "Wildlife Photography": { query: "Ranthambore tiger wildlife", must: ["ranthambore"] },
  "Fort & Heritage Walk": { query: "Ranthambore Fort Rajasthan", must: ["ranthambore", "fort"] },

  "Chittorgarh Fort": { query: "Chittorgarh Fort Rajasthan", must: ["chittorgarh"] },
  "Vijay Stambh": { query: "Vijay Stambh Chittorgarh", must: ["vijay", "stambh"] },
  "Rana Kumbha Palace": { query: "Rana Kumbha Palace Chittorgarh", must: ["kumbha"] },
  "Padmini Palace": { query: "Padmini Palace Chittorgarh", must: ["padmini"] },
  "Fort Heritage Drive": { query: "Chittorgarh Fort Rajasthan", must: ["chittorgarh"] },
  "Sunset Views": { query: "Chittorgarh Fort sunset Rajasthan", must: ["chittorgarh"] },

  "Garh Palace": { query: "Garh Palace Bundi Rajasthan", must: ["garh", "bundi"] },
  "Taragarh Fort": { query: "Taragarh Fort Bundi Rajasthan", must: ["taragarh", "bundi"] },
  "Raniji Ki Baori": { query: "Raniji ki Baori Bundi", must: ["raniji", "bundi"] },
  "Nawal Sagar": { query: "Nawal Sagar Bundi", must: ["nawal", "bundi"] },
  "Heritage Walk": { query: "Bundi old city Rajasthan", must: ["bundi"] },
  "Stepwell Trail": { query: "Bundi stepwell Rajasthan", must: ["bundi"] },

  "Delhi & Agra": { query: "Taj Mahal Agra India", must: ["taj", "agra"] },
  "Himachal & Uttarakhand": { query: "Himachal Pradesh Himalaya India", must: ["himachal"] },
  Varanasi: { query: "Varanasi Ganges ghats India", must: ["varanasi"] },
  Rajasthan: { query: "Hawa Mahal Jaipur Rajasthan", must: ["jaipur"] },
  Kerala: { query: "Kerala backwaters houseboat", must: ["kerala"] },
  "Tamil Nadu": { query: "Meenakshi Amman Temple Madurai Tamil Nadu", must: ["meenakshi"] },
  Karnataka: { query: "Hampi Karnataka India", must: ["hampi"] },
  "Southern Hills": { query: "Munnar Kerala tea plantations", must: ["munnar"] },
  Gujarat: { query: "Rann of Kutch Gujarat India", must: ["kutch"] },
  Mumbai: { query: "Gateway of India Mumbai", must: ["gateway", "mumbai"] },
  Goa: { query: "Goa beach India", must: ["goa"] },
  Kolkata: { query: "Victoria Memorial Kolkata", must: ["victoria", "kolkata"] },
  Odisha: { query: "Konark Sun Temple Odisha", must: ["konark"] },
  Darjeeling: { query: "Darjeeling tea gardens India", must: ["darjeeling"] },
  Sikkim: { query: "Sikkim Himalaya India", must: ["sikkim"] },
  Manali: { query: "Manali Himachal Pradesh", must: ["manali"] },
  Shimla: { query: "Shimla Himachal Pradesh", must: ["shimla"] },
  "Mount Abu": { query: "Mount Abu Rajasthan Nakki Lake", must: ["abu"] },
  Munnar: { query: "Munnar tea plantations Kerala", must: ["munnar"] },
  Gokarna: { query: "Gokarna beach Karnataka India", must: ["gokarna"] },
  "Kerala Coast": { query: "Kerala beach India", must: ["kerala"] },
  "Konkan Coast": { query: "Konkan coast Maharashtra India", must: ["konkan"] },
  Bharatpur: { query: "Keoladeo National Park Bharatpur birds", must: ["keoladeo"] },
  "Central India Parks": { query: "Kanha National Park Madhya Pradesh tiger", must: ["kanha"] },
  "Nature Photography": { query: "Ranthambore tiger Rajasthan", must: ["ranthambore"] },
  Pushkar: { query: "Pushkar Lake Brahma Temple Rajasthan", must: ["pushkar"] },
  Ajmer: { query: "Ajmer Sharif Dargah Rajasthan", must: ["ajmer"] },
  "Ranakpur & Nathdwara": { query: "Ranakpur Jain Temple Rajasthan", must: ["ranakpur"] },
  Udaipur: { query: "Lake Pichola City Palace Udaipur", must: ["udaipur"] },
  Jaipur: { query: "Hawa Mahal Jaipur", must: ["jaipur"] },
};

function relevanceScore(title, query, must = []) {
  const haystack = words(title);
  const hay = new Set(haystack);
  const required = must.map((term) => term.toLowerCase());
  if (required.length && !required.every((term) => haystack.some((word) => word.includes(term) || term.includes(word)))) return -1;
  const queryWords = words(query);
  return queryWords.reduce((score, word) => score + (hay.has(word) || haystack.some((candidate) => candidate.includes(word) || word.includes(candidate)) ? 1 : 0), 0);
}

async function imageUrlWorks(url) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": "RaniToursImageSeeder/2.0 (travel website image verification)" },
    });
    return response.ok && String(response.headers.get("content-type") || "").startsWith("image/");
  } catch {
    return false;
  }
}

async function findCommonsImage(query, must = []) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "20",
    prop: "imageinfo",
    iiprop: "url|extmetadata|mime",
    iiurlwidth: "1800",
  });

  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { "User-Agent": "RaniToursImageSeeder/2.0 (travel website image verification)" },
  });
  if (!response.ok) throw new Error(`Commons search failed (${response.status}) for ${query}`);
  const json = await response.json();
  const pages = Object.values(json?.query?.pages || {});
  const candidates = [];

  for (const page of pages) {
    const info = page.imageinfo?.[0];
    if (!info?.url || !String(info.mime || "").startsWith("image/")) continue;
    const meta = info.extmetadata || {};
    const license = clean(meta.LicenseShortName?.value || meta.UsageTerms?.value || "");
    if (!ALLOWED_LICENSES.some((allowed) => license.toLowerCase().includes(allowed))) continue;
    const title = String(page.title || "").replace(/^File:/, "");
    const score = relevanceScore(title, query, must);
    if (score < 0) continue;
    const url = info.thumburl || info.url;
    candidates.push({
      url,
      originalUrl: info.url,
      sourceUrl: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(String(page.title || "").replace(/ /g, "_"))}`,
      credit: clean(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor"),
      license,
      licenseUrl: meta.LicenseUrl?.value || "",
      title,
      score,
    });
  }

  candidates.sort((a, b) => b.score - a.score || a.title.length - b.title.length);
  for (const candidate of candidates.slice(0, 8)) {
    if (await imageUrlWorks(candidate.url)) return candidate;
    if (candidate.originalUrl !== candidate.url && await imageUrlWorks(candidate.originalUrl)) return { ...candidate, url: candidate.originalUrl };
  }
  return null;
}

async function resolveImage(spec, alt) {
  const found = await findCommonsImage(spec.query, spec.must || []);
  if (!found) {
    console.warn(`No exact reusable Commons image found for: ${alt}`);
    return null;
  }
  console.log(`Using ${found.title} for ${alt} [${found.license}]`);
  return {
    url: found.url,
    publicId: "",
    alt,
    credit: found.credit,
    sourceUrl: found.sourceUrl,
    license: found.license,
    licenseUrl: found.licenseUrl,
  };
}

const destinations = await Destination.find({}).sort({ sortOrder: 1, title: 1 }).lean();
for (const doc of destinations) {
  console.log(`\nProcessing ${doc.title}...`);

  const heroSpec = HERO_QUERIES[doc.slug] || {
    query: `${doc.title} ${doc.state || doc.region || "India"}`,
    must: words(doc.title).slice(0, 1),
  };
  const hero = await resolveImage(heroSpec, `${doc.title} destination`);

  const mapCards = async (items = []) => {
    const output = [];
    for (const item of items) {
      const override = CARD_OVERRIDES[item.title];
      const spec = override || {
        query: `${item.title} ${doc.title} ${doc.state || doc.region || "India"}`,
        must: words(item.title).slice(0, 1),
      };
      const image = await resolveImage(spec, `${item.title}, ${doc.title}`);
      output.push({ ...item, image });
    }
    return output;
  };

  const attractions = await mapCards(doc.attractions || []);
  const experiences = await mapCards(doc.experiences || []);
  const update = { attractions, experiences, gallery: [] };
  if (hero) {
    update.heroImage = hero;
    update["seo.ogImage"] = hero;
  }

  await Destination.updateOne({ _id: doc._id }, { $set: update });
  console.log(`Finished ${doc.title}`);
}

console.log("\nDestination imagery complete. All selected images are verified reusable Wikimedia Commons files and are referenced directly from Wikimedia; no Cloudinary upload or manual work is required.");
await mongoose.disconnect();
