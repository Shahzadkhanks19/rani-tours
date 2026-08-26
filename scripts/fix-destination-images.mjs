import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const p = (id, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const image = (id, alt, w = 1600) => ({ url: p(id, w), publicId: "", alt });

const pools = {
  jodhpur: [37350638, 37350641, 18010572, 35394623, 34035714, 37350642],
  ranthambore: [27960753, 24735988, 25785873, 24735987, 11934062],
  chittorgarh: [35907573, 29433249, 29433252, 32760057, 29433246, 34596317, 34765911, 29433400],
  bundi: [31794997, 29097522, 31760609, 16386149, 31760612, 14940424],
  "north-india": [36721861, 37466126, 28689395, 15344913, 17070404, 19160128],
  "south-india": [35347824, 35347829, 29988900, 35347836, 29988901, 27869350, 19743480],
  "west-india": [37350638, 33658451, 23630487, 32262472, 15344913, 14337670],
  "east-india": [36721861, 37466126, 28689395, 29988900, 35347824, 19160128],
  "hill-stations": [36721861, 37466126, 28689395, 36721865, 36721857, 33658451],
  "beach-destinations": [23630487, 30987015, 27667777, 33793089, 35916767, 32262472],
  wildlife: [27960753, 24735988, 25785873, 24735987, 11934062],
  spiritual: [19160128, 15344913, 17070404, 29097522, 31760609, 16386149],
  honeymoon: [33658451, 23630487, 32262472, 35347824, 36721861, 14337670],
  "weekend-getaways": [33658451, 15344913, 37350638, 27960753, 23630487, 36721861],
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
  const attractions = (doc.attractions || []).map((item) => ({
    ...item,
    image: next(item.title || "attraction"),
  }));
  const experiences = (doc.experiences || []).map((item) => ({
    ...item,
    image: next(item.title || "experience"),
  }));
  const gallery = Array.from({ length: Math.min(5, ids.length) }, (_, index) => next(`travel gallery ${index + 1}`));

  await Destination.updateOne(
    { slug },
    {
      $set: {
        heroImage,
        attractions,
        experiences,
        gallery,
        "seo.ogImage": heroImage,
      },
    },
  );

  console.log(`Updated imagery for ${slug}`);
}

console.log("Destination image relevance cleanup complete.");
await mongoose.disconnect();
