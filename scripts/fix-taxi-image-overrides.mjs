import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const p = (id, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const image = (id, alt, w = 1600) => ({ url: p(id, w), publicId: "", alt });
const routeImageIds = [19041162, 6325583, 5558524, 16993877, 6218156];

const Mixed = new mongoose.Schema({}, { strict: false, timestamps: true });
const Taxi = mongoose.models.TaxiService || mongoose.model("TaxiService", Mixed, "taxiservices");

const heroOverrides = {
  "rajasthan-taxi-service": image(36561998, "Rajasthan palace and heritage architecture"),
  "all-india-taxi": image(8570419, "India travel and heritage destination"),
};

for (const [slug, heroImage] of Object.entries(heroOverrides)) {
  await Taxi.updateOne({ slug }, { $set: { heroImage, "seo.ogImage": heroImage } });
}

const routeSlugs = ["outstation-taxi", "one-way-taxi", "round-trip-taxi", "multi-city-taxi", "rajasthan-taxi-service", "all-india-taxi"];
for (const slug of routeSlugs) {
  const item = await Taxi.findOne({ slug }).lean();
  if (!item?.popularRoutes?.length) continue;
  const popularRoutes = item.popularRoutes.map((route, index) => ({
    ...route,
    image: image(routeImageIds[index % routeImageIds.length], route.title || "Taxi route", 1100),
    startingPrice: 0,
    priceUnit: "",
  }));
  await Taxi.updateOne({ slug }, { $set: { popularRoutes } });
}

const cardOverrides = {
  "jodhpur-local-taxi": [36213405, 37350667, 15344913, 33689320],
  "corporate-travel": [33988321, 18860533, 32176173, 31646408],
  "luxury-car-rental": [33988321, 35641554, 31646408, 32691096],
  "bus-rental": [6657469, 27174508, 7276715],
};

for (const [slug, ids] of Object.entries(cardOverrides)) {
  const item = await Taxi.findOne({ slug }).lean();
  if (!item?.serviceCards?.length) continue;
  const serviceCards = item.serviceCards.map((entry, index) => ({
    ...entry,
    image: image(ids[index % ids.length], entry.title || "Taxi service", 1100),
  }));
  await Taxi.updateOne({ slug }, { $set: { serviceCards } });
}

console.log("Taxi image relevance and duplicate cleanup complete.");
await mongoose.disconnect();