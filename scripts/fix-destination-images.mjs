import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const p = (id, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const image = (id, alt, w = 1600) => ({ url: p(id, w), publicId: "", alt });

// These IDs are deliberately curated from search results whose Pexels pages explicitly
// identify the photographed place/subject. Do not add guessed photo IDs here.
const pools = {
  jodhpur: [37350602, 797824, 18010572, 37350638, 37350641, 35394623, 36470630, 37350610, 36470445, 19160102, 34035714, 6233443],
  ranthambore: [11934062, 25785873, 36780892, 11943859, 36781003, 12436501, 31393397, 21701085, 36076418],
};

const Mixed = new mongoose.Schema({}, { strict: false, timestamps: true });
const Destination = mongoose.models.Destination || mongoose.model("Destination", Mixed, "destinations");

for (const [slug, ids] of Object.entries(pools)) {
  const doc = await Destination.findOne({ slug }).lean();
  if (!doc) {
    console.warn(`Skipped missing destination: ${slug}`);
    continue;
  }

  let cursor = 0;
  const next = (label, width = 1200) => {
    const id = ids[cursor % ids.length];
    cursor += 1;
    return image(id, `${doc.title} — ${label}`, width);
  };

  const heroImage = next("destination hero", 1800);
  const attractions = (doc.attractions || []).map((item) => ({ ...item, image: next(item.title || "attraction") }));
  const experiences = (doc.experiences || []).map((item) => ({ ...item, image: next(item.title || "experience") }));
  const gallery = Array.from({ length: Math.min(5, Math.max(0, ids.length - cursor)) }, (_, index) => next(`travel gallery ${index + 1}`));

  await Destination.updateOne({ slug }, { $set: { heroImage, attractions, experiences, gallery, "seo.ogImage": heroImage } });
  console.log(`Updated verified imagery for ${slug}`);
}

console.log("Verified destination image cleanup complete.");
await mongoose.disconnect();
