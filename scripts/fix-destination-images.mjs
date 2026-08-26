import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const Mixed = new mongoose.Schema({}, { strict: false, timestamps: true });
const Destination = mongoose.models.Destination || mongoose.model("Destination", Mixed, "destinations");

const ALLOWED_LICENSES = ["cc0", "public domain", "cc by", "cc-by", "cc by-sa", "cc-by-sa"];
const STOP_WORDS = new Set(["the", "and", "of", "in", "to", "a", "an", "india", "travel", "tour", "trip", "experience"]);
const DEFAULT_PLACE_REJECT = ["musician", "artisan", "portrait", "selfie", "woman", "women", "man", "men", "person", "people", "orchard", "pomelo", "flower", "flowers", "food", "thali", "bird", "birds"];
const clean = (value = "") => String(value).replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").trim();
const words = (value = "") => clean(value).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((word) => word.length > 2 && !STOP_WORDS.has(word));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HERO_QUERIES = {
  jodhpur: { query: "Mehrangarh Fort Jodhpur Rajasthan exterior panorama", must: ["mehrangarh", "jodhpur"], reject: DEFAULT_PLACE_REJECT },
  ranthambore: { query: "Ranthambore National Park tiger Rajasthan", must: ["ranthambore"], reject: ["logo", "map", "sign"] },
  chittorgarh: { query: "Chittorgarh Fort Rajasthan panorama", must: ["chittorgarh"], reject: DEFAULT_PLACE_REJECT },
  bundi: { query: "Garh Palace Bundi Rajasthan panorama", must: ["bundi"], reject: DEFAULT_PLACE_REJECT },
  "north-india": { query: "Himalaya Ladakh North India landscape", must: ["himalaya"], reject: DEFAULT_PLACE_REJECT },
  "south-india": { query: "Kerala backwaters houseboat landscape", must: ["kerala"], reject: DEFAULT_PLACE_REJECT },
  "west-india": { query: "Gateway of India Mumbai Maharashtra exterior", must: ["gateway", "mumbai"], reject: DEFAULT_PLACE_REJECT },
  "east-india": { query: "Victoria Memorial Kolkata West Bengal exterior", must: ["victoria", "kolkata"], reject: DEFAULT_PLACE_REJECT },
  "hill-stations": { query: "Manali Himachal Pradesh Himalaya landscape", must: ["manali"], reject: DEFAULT_PLACE_REJECT },
  "beach-destinations": { query: "Goa beach coastline landscape", must: ["goa"], reject: DEFAULT_PLACE_REJECT },
  wildlife: { query: "Ranthambore tiger Rajasthan wildlife", must: ["ranthambore"], reject: ["logo", "map", "sign"] },
  spiritual: { query: "Varanasi ghats Ganges river panorama", must: ["varanasi"], reject: DEFAULT_PLACE_REJECT },
  honeymoon: { query: "Lake Pichola City Palace Udaipur panorama", must: ["udaipur"], reject: DEFAULT_PLACE_REJECT },
  "weekend-getaways": { query: "Hawa Mahal Jaipur exterior facade", must: ["hawa", "jaipur"], reject: DEFAULT_PLACE_REJECT },
};

const CARD_OVERRIDES = {
  "Mehrangarh Fort": { query: "Mehrangarh Fort Jodhpur exterior", must: ["mehrangarh"], reject: DEFAULT_PLACE_REJECT },
  "Jaswant Thada": { query: "Jaswant Thada Jodhpur exterior", must: ["jaswant", "thada"], reject: DEFAULT_PLACE_REJECT },
  "Umaid Bhawan Palace": { query: "Umaid Bhawan Palace Jodhpur exterior", must: ["umaid", "bhawan"], reject: DEFAULT_PLACE_REJECT },
  "Clock Tower & Sardar Market": { query: "Ghanta Ghar Clock Tower Jodhpur exterior", must: ["jodhpur"], reject: DEFAULT_PLACE_REJECT },
  "Blue City Walk": { query: "Blue City Jodhpur houses streets", must: ["jodhpur"], reject: ["portrait", "selfie"] },
  "Bishnoi Village Experience": { query: "Bishnoi village Rajasthan landscape", must: ["bishnoi"], reject: ["award", "certificate", "portrait"] },
  "Rajasthani Cuisine": { query: "Rajasthani thali Rajasthan cuisine", must: ["rajasthan"], reject: ["portrait", "person", "people"] },

  "Ranthambore National Park": { query: "Ranthambore National Park tiger landscape", must: ["ranthambore"], reject: ["logo", "map", "sign"] },
  "Ranthambore Fort": { query: "Ranthambore Fort Rajasthan exterior", must: ["ranthambore", "fort"], reject: DEFAULT_PLACE_REJECT },
  "Padam Talao": { query: "Padam Talao Lake Ranthambore", must: ["padam"], reject: DEFAULT_PLACE_REJECT },
  "Trinetra Ganesh Temple": { query: "Trinetra Ganesh Temple Ranthambore exterior", must: ["trinetra"], reject: DEFAULT_PLACE_REJECT },
  "Jungle Safari": { query: "Ranthambore safari jeep tiger", must: ["ranthambore"], reject: ["logo", "map", "sign"] },
  "Wildlife Photography": { query: "Ranthambore tiger wildlife", must: ["ranthambore"], reject: ["logo", "map", "sign"] },
  "Fort & Heritage Walk": { query: "Ranthambore Fort Rajasthan exterior", must: ["ranthambore", "fort"], reject: DEFAULT_PLACE_REJECT },

  "Chittorgarh Fort": { query: "Chittorgarh Fort Rajasthan panorama", must: ["chittorgarh"], reject: DEFAULT_PLACE_REJECT },
  "Vijay Stambh": { query: "Vijay Stambh Chittorgarh tower", must: ["vijay", "stambh"], reject: DEFAULT_PLACE_REJECT },
  "Rana Kumbha Palace": { query: "Rana Kumbha Palace Chittorgarh ruins", must: ["kumbha"], reject: DEFAULT_PLACE_REJECT },
  "Padmini Palace": { query: "Padmini Palace Chittorgarh exterior", must: ["padmini"], reject: DEFAULT_PLACE_REJECT },
  "Fort Heritage Drive": { query: "Chittorgarh Fort Rajasthan road panorama", must: ["chittorgarh"], reject: DEFAULT_PLACE_REJECT },
  "Sunset Views": { query: "Chittorgarh Fort sunset panorama", must: ["chittorgarh"], reject: DEFAULT_PLACE_REJECT },

  "Garh Palace": { query: "Garh Palace Bundi Rajasthan exterior", must: ["garh", "bundi"], reject: DEFAULT_PLACE_REJECT },
  "Taragarh Fort": { query: "Taragarh Fort Bundi Rajasthan exterior", must: ["taragarh", "bundi"], reject: DEFAULT_PLACE_REJECT },
  "Raniji Ki Baori": { query: "Raniji Ki Baori Bundi stepwell", must: ["raniji", "bundi"], reject: DEFAULT_PLACE_REJECT },
  "Nawal Sagar": { query: "Nawal Sagar Lake Bundi Rajasthan", must: ["nawal", "bundi"], reject: DEFAULT_PLACE_REJECT },
  "Heritage Walk": { query: "Bundi old city streets Rajasthan", must: ["bundi"], reject: ["portrait", "selfie"] },
  "Stepwell Trail": { query: "Bundi stepwell Rajasthan", must: ["bundi"], reject: DEFAULT_PLACE_REJECT },

  "Delhi & Agra": { query: "Taj Mahal Agra exterior", must: ["taj", "agra"], reject: DEFAULT_PLACE_REJECT },
  "Himachal & Uttarakhand": { query: "Himachal Pradesh Himalaya landscape", must: ["himachal"], reject: DEFAULT_PLACE_REJECT },
  Varanasi: { query: "Varanasi Ganges ghats panorama", must: ["varanasi"], reject: DEFAULT_PLACE_REJECT },
  Rajasthan: { query: "Hawa Mahal Jaipur exterior facade", must: ["hawa", "jaipur"], reject: DEFAULT_PLACE_REJECT },
  Kerala: { query: "Kerala backwaters houseboat landscape", must: ["kerala"], reject: DEFAULT_PLACE_REJECT },
  "Tamil Nadu": { query: "Meenakshi Amman Temple Madurai exterior", must: ["meenakshi"], reject: DEFAULT_PLACE_REJECT },
  Karnataka: { query: "Hampi Karnataka ruins landscape", must: ["hampi"], reject: DEFAULT_PLACE_REJECT },
  "Southern Hills": { query: "Munnar Kerala tea plantation landscape", must: ["munnar"], reject: DEFAULT_PLACE_REJECT },
  Gujarat: { query: "Rann of Kutch Gujarat salt desert landscape", must: ["kutch"], reject: DEFAULT_PLACE_REJECT },
  Mumbai: { query: "Gateway of India Mumbai exterior", must: ["gateway", "mumbai"], reject: DEFAULT_PLACE_REJECT },
  Goa: { query: "Goa beach coastline landscape", must: ["goa"], reject: DEFAULT_PLACE_REJECT },
  Kolkata: { query: "Victoria Memorial Kolkata exterior", must: ["victoria", "kolkata"], reject: DEFAULT_PLACE_REJECT },
  Odisha: { query: "Konark Sun Temple Odisha exterior", must: ["konark"], reject: DEFAULT_PLACE_REJECT },
  Darjeeling: { query: "Darjeeling tea gardens landscape", must: ["darjeeling"], reject: DEFAULT_PLACE_REJECT },
  Sikkim: { query: "Sikkim Kanchenjunga Himalaya landscape", must: ["sikkim"], reject: DEFAULT_PLACE_REJECT },
  Manali: { query: "Manali Himachal Pradesh landscape", must: ["manali"], reject: DEFAULT_PLACE_REJECT },
  Shimla: { query: "Shimla Himachal Pradesh city landscape", must: ["shimla"], reject: DEFAULT_PLACE_REJECT },
  "Mount Abu": { query: "Nakki Lake Mount Abu Rajasthan landscape", must: ["abu"], reject: DEFAULT_PLACE_REJECT },
  Munnar: { query: "Munnar tea plantations Kerala landscape", must: ["munnar"], reject: DEFAULT_PLACE_REJECT },
  Gokarna: { query: "Gokarna beach Karnataka coastline", must: ["gokarna"], reject: DEFAULT_PLACE_REJECT },
  "Kerala Coast": { query: "Kerala beach coastline landscape", must: ["kerala"], reject: DEFAULT_PLACE_REJECT },
  "Konkan Coast": { query: "Konkan coast Maharashtra beach sea coastline", must: ["konkan"], reject: [...DEFAULT_PLACE_REJECT, "orchard", "pomelo", "farm", "fruit"] },
  Bharatpur: { query: "Keoladeo National Park Bharatpur birds wetland", must: ["keoladeo"], reject: ["logo", "map", "sign"] },
  "Central India Parks": { query: "Kanha National Park tiger forest Madhya Pradesh", must: ["kanha"], reject: ["logo", "map", "sign"] },
  "Nature Photography": { query: "Ranthambore tiger Rajasthan wildlife", must: ["ranthambore"], reject: ["logo", "map", "sign"] },
  Pushkar: { query: "Pushkar Lake Rajasthan panorama", must: ["pushkar"], reject: DEFAULT_PLACE_REJECT },
  Ajmer: { query: "Ajmer Sharif Dargah Rajasthan exterior", must: ["ajmer"], reject: DEFAULT_PLACE_REJECT },
  "Ranakpur & Nathdwara": { query: "Ranakpur Jain Temple Rajasthan exterior", must: ["ranakpur"], reject: DEFAULT_PLACE_REJECT },
  Udaipur: { query: "Lake Pichola City Palace Udaipur panorama", must: ["udaipur"], reject: DEFAULT_PLACE_REJECT },
  Jaipur: { query: "Hawa Mahal Jaipur exterior facade", must: ["hawa", "jaipur"], reject: DEFAULT_PLACE_REJECT },
};

function relevanceScore(title, query, must = [], reject = []) {
  const haystack = words(title);
  const hay = new Set(haystack);
  const lowerTitle = clean(title).toLowerCase();
  if (reject.some((term) => lowerTitle.includes(term.toLowerCase()))) return -1;
  const required = must.map((term) => term.toLowerCase());
  if (required.length && !required.every((term) => haystack.some((word) => word.includes(term) || term.includes(word)))) return -1;
  const queryWords = words(query);
  const matches = queryWords.reduce((score, word) => score + (hay.has(word) || haystack.some((candidate) => candidate.includes(word) || word.includes(candidate)) ? 1 : 0), 0);
  return matches - Math.max(0, haystack.length - queryWords.length) * 0.08;
}

async function fetchWithRetry(url, options = {}, label = "request", attempts = 4) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (response.status !== 429 && response.status < 500) return response;
      if (attempt === attempts - 1) return response;
      const retryAfter = Number(response.headers.get("retry-after") || 0);
      const exponentialMs = Math.min(8000, 1000 * 2 ** attempt);
      const waitMs = Math.min(10000, retryAfter > 0 ? retryAfter * 1000 : exponentialMs);
      console.warn(`${label} returned ${response.status}; retrying in ${Math.ceil(waitMs / 1000)}s...`);
      await sleep(waitMs);
    } catch (error) {
      if (attempt === attempts - 1) throw error;
      const waitMs = Math.min(8000, 1000 * 2 ** attempt);
      console.warn(`${label} failed; retrying in ${Math.ceil(waitMs / 1000)}s...`);
      await sleep(waitMs);
    }
  }
  return null;
}

async function imageUrlWorks(url) {
  try {
    const response = await fetchWithRetry(url, { method: "GET", headers: { "User-Agent": "RaniToursImageSeeder/4.0", Range: "bytes=0-511" } }, "Image verification", 2);
    return Boolean(response?.ok && String(response.headers.get("content-type") || "").startsWith("image/"));
  } catch {
    return false;
  }
}

async function findCommonsImage(spec, usedUrls) {
  await sleep(1100);
  const params = new URLSearchParams({ action: "query", format: "json", origin: "*", generator: "search", gsrsearch: spec.query, gsrnamespace: "6", gsrlimit: "16", prop: "imageinfo", iiprop: "url|extmetadata|mime", iiurlwidth: "1600" });
  const response = await fetchWithRetry(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { "User-Agent": "RaniToursImageSeeder/4.0", Accept: "application/json" } }, `Commons search for ${spec.query}`, 4);
  if (!response?.ok) return null;

  const json = await response.json();
  const candidates = [];
  for (const page of Object.values(json?.query?.pages || {})) {
    const info = page.imageinfo?.[0];
    if (!info?.url || !String(info.mime || "").startsWith("image/")) continue;
    const meta = info.extmetadata || {};
    const license = clean(meta.LicenseShortName?.value || meta.UsageTerms?.value || "");
    if (!ALLOWED_LICENSES.some((allowed) => license.toLowerCase().includes(allowed))) continue;
    const title = String(page.title || "").replace(/^File:/, "");
    const score = relevanceScore(title, spec.query, spec.must || [], spec.reject || []);
    if (score < 0) continue;
    const url = info.thumburl || info.url;
    if (usedUrls.has(url) || usedUrls.has(info.url)) continue;
    candidates.push({ url, originalUrl: info.url, sourceUrl: info.descriptionurl || "", credit: clean(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons contributor"), license, licenseUrl: meta.LicenseUrl?.value || "", title, score });
  }

  candidates.sort((a, b) => b.score - a.score || a.title.length - b.title.length);
  for (const candidate of candidates.slice(0, 6)) {
    if (await imageUrlWorks(candidate.url)) return candidate;
    if (candidate.originalUrl !== candidate.url && !usedUrls.has(candidate.originalUrl) && await imageUrlWorks(candidate.originalUrl)) return { ...candidate, url: candidate.originalUrl };
  }
  return null;
}

async function resolveImage(spec, alt, usedUrls) {
  try {
    const found = await findCommonsImage(spec, usedUrls);
    if (!found) {
      console.warn(`No exact reusable Commons image found for: ${alt}`);
      return null;
    }
    usedUrls.add(found.url);
    usedUrls.add(found.originalUrl);
    console.log(`Using ${found.title} for ${alt} [${found.license}]`);
    return { url: found.url, publicId: "", alt, credit: found.credit, sourceUrl: found.sourceUrl, license: found.license, licenseUrl: found.licenseUrl };
  } catch (error) {
    console.warn(`Image lookup skipped for ${alt}: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

const destinations = await Destination.find({}).sort({ sortOrder: 1, title: 1 }).lean();
for (const doc of destinations) {
  console.log(`\nProcessing ${doc.title}...`);
  const usedUrls = new Set();
  try {
    const heroSpec = HERO_QUERIES[doc.slug] || { query: `${doc.title} ${doc.state || doc.region || "India"} landscape`, must: words(doc.title).slice(0, 1), reject: DEFAULT_PLACE_REJECT };
    const hero = await resolveImage(heroSpec, `${doc.title} destination`, usedUrls);

    const mapCards = async (items = []) => {
      const output = [];
      for (const item of items) {
        const spec = CARD_OVERRIDES[item.title] || { query: `${item.title} ${doc.title} ${doc.state || doc.region || "India"}`, must: words(item.title).slice(0, 1), reject: DEFAULT_PLACE_REJECT };
        const image = await resolveImage(spec, `${item.title}, ${doc.title}`, usedUrls);
        output.push({ ...item, image });
      }
      return output;
    };

    const attractions = await mapCards(doc.attractions || []);
    const experiences = await mapCards(doc.experiences || []);
    const update = { attractions, experiences, gallery: [] };
    if (hero) { update.heroImage = hero; update["seo.ogImage"] = hero; }
    await Destination.updateOne({ _id: doc._id }, { $set: update });
    console.log(`Finished ${doc.title}`);
  } catch (error) {
    console.warn(`Destination image pass skipped for ${doc.title}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

console.log("\nDestination imagery pass finished. Images are reusable Wikimedia Commons assets, duplicate URLs are avoided per page, visually irrelevant filename matches are rejected, and retries are capped at 10 seconds.");
await mongoose.disconnect();
