import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const p = (id, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const img = (id, alt, w = 1600) => ({ url: p(id, w), publicId: "", alt });

const sets = {
  "rajasthan-heritage-tour": { hero: 797824, heroAlt: "Mehrangarh Fort and the Blue City of Jodhpur", days: [36077515,29624144,9179927,35870476,21382502,30725009,19160088,33658452], gallery: [35394623,19149576,33658449,9497619,31778015] },
  "golden-triangle-tour": { hero: 19149636, heroAlt: "Taj Mahal in Agra", days: [11521896,20127177,19149627,36077515,29624144,19149576], gallery: [16614143,17869793,9179927,17070404,36470355] },
  "desert-safari-tour": { hero: 30725009, heroAlt: "Camel safari in the Jaisalmer desert", days: [797824,19160088,9497619,5058588], gallery: [37415418,36353482,7323438,36868152,30573733] },
  "royal-rajasthan-tour": { hero: 9179927, heroAlt: "Amber Fort in Jaipur at sunset", days: [36077515,29624144,797824,35394623,35870476,21382502,30725009,9497619,19160088,33658452], gallery: [19149576,33658449,31778015,30573733,17070404] },
  "cultural-rajasthan-tour": { hero: 19149576, heroAlt: "City Palace Jaipur architecture", days: [36077515,19195923,19160121,797824,35870476,33658452,17070404], gallery: [18676457,35394354,29449927,19160088,31866953] },
  "forts-palaces-tour": { hero: 29624144, heroAlt: "Amber Fort gardens in Jaipur", days: [9179927,35394354,797824,35394623,35870476,21382502,33658449], gallery: [36470355,34927925,31866953,19149576,17070404] },
  "pilgrimage-tour": { hero: 19195923, heroAlt: "Rangji Temple in Pushkar", days: [19160121,11947760,29449927,29449928,30647799], gallery: [19195923,19160121,11947760,29449927,30647799] },
  "adventure-rajasthan-tour": { hero: 30725009, heroAlt: "Desert adventure in Jaisalmer", days: [797824,9497619,37415418,30078933,36350293,19435858], gallery: [30573733,36353482,30078931,30647799,35394623] },
  "family-rajasthan-tour": { hero: 36077515, heroAlt: "Hawa Mahal Jaipur", days: [29624144,19149576,35870476,33658449,797824,35394623], gallery: [17070404,21382502,31778015,35394354,9179927] },
  "honeymoon-rajasthan-tour": { hero: 33658452, heroAlt: "Udaipur City Palace at dusk", days: [36153990,33658451,30725009,797824,35870476], gallery: [33230288,8143915,31866953,9497619,30573733] },
  "budget-rajasthan-tour": { hero: 797824, heroAlt: "Jodhpur and Mehrangarh Fort", days: [35394623,36077515,29624144,19195923,19149576], gallery: [6233443,17070404,9179927,19160121,35394354] },
  "wildlife-rajasthan-tour": { hero: 11943859, heroAlt: "Bengal tiger in Ranthambore National Park", days: [25785873,11934062,31393397,27960753,36077515,29624144], gallery: [30188584,29510993,36781003,36780892,9179927] },
  "luxury-rajasthan-tour": { hero: 33658451, heroAlt: "Lake Palace in Udaipur", days: [36077515,29624144,35870476,36153990,797824,35394623,30725009,9497619], gallery: [31866953,21382502,19149576,19160088,33658449] },
  "all-india-tour-packages": { hero: 19149636, heroAlt: "Taj Mahal in Agra", days: [11521896,36077515,29624144,797824,35870476,30725009,36350293,11943859,19160121,33658451], gallery: [16614143,35394354,31866953,9497619,30078933] },
  "customised-tour-package": { hero: 35870476, heroAlt: "Udaipur City Palace reflected on Lake Pichola", days: [36077515,797824,30725009,36350293,19149636], gallery: [33658452,29624144,9497619,11943859,19160121] },
};

const Tour = mongoose.connection.collection("tourpackages");
for (const [slug, set] of Object.entries(sets)) {
  const current = await Tour.findOne({ slug });
  if (!current) continue;
  const itinerary = Array.isArray(current.itinerary) ? current.itinerary.map((day, index) => ({
    ...day,
    image: img(set.days[index % set.days.length], `${current.title} - ${day.title || `Day ${index + 1}`}`, 1200),
  })) : [];
  const gallery = set.gallery.filter((id) => id !== set.hero && !set.days.includes(id)).slice(0, 5).map((id, index) => img(id, `${current.title} gallery ${index + 1}`, 1200));
  await Tour.updateOne({ slug }, { $set: {
    heroImage: img(set.hero, set.heroAlt),
    itinerary,
    gallery,
    "seo.ogImage": img(set.hero, set.heroAlt),
  }});
  console.log(`Updated images for ${slug}`);
}

console.log("Tour package image relevance cleanup complete.");
await mongoose.disconnect();
