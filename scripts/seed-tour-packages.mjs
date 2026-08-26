import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const p = (id, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const image = (id, alt, w = 1600) => ({ url: p(id, w), publicId: "", alt });
const stop = (time, title) => ({ time, title });
const day = (n, title, description, imageId, stops) => ({ day: n, title, description, image: image(imageId, title, 1200), stops });

const commonInclusions = [
  "AC private vehicle for the complete tour",
  "Experienced and courteous driver",
  "Fuel, toll, parking and driver allowance",
  "Sightseeing and transfers as per itinerary",
  "Bottled water during the journey",
  "All applicable transport taxes",
];
const commonExclusions = [
  "Air or train tickets",
  "Monument and attraction entry tickets",
  "Meals unless specifically mentioned",
  "Personal expenses and shopping",
  "Adventure activities and optional experiences",
  "Anything not mentioned in the inclusions",
];

const plans = [
  {title:"Rajasthan Heritage Tour",slug:"rajasthan-heritage-tour",category:"Heritage",location:"Jaipur • Jodhpur • Udaipur • Jaisalmer",days:8,nights:7,hero:36561998,desc:"Discover Rajasthan's royal forts, palaces, lakes and desert heritage on a private customizable journey.",highlights:["Amber Fort & Jaipur heritage","Mehrangarh Fort & Blue City","Udaipur lakes and palaces","Jaisalmer Fort & desert sunset"],dayIds:[36213405,37350667,15344913,33726478,37272317,12510699,19091920,36563717]},
  {title:"Golden Triangle Tour",slug:"golden-triangle-tour",category:"Classic India",location:"Delhi • Agra • Jaipur",days:6,nights:5,hero:8570419,desc:"Experience India's iconic Golden Triangle covering Delhi, the Taj Mahal in Agra and royal Jaipur.",highlights:["Old & New Delhi landmarks","Taj Mahal & Agra Fort","Amber Fort & City Palace","Private flexible sightseeing"],dayIds:[31804744,15295236,8570419,36213405,37350667,33726478]},
  {title:"Desert Safari Tour",slug:"desert-safari-tour",category:"Desert",location:"Jodhpur • Jaisalmer • Sam Sand Dunes",days:4,nights:3,hero:12510699,desc:"Combine Jodhpur heritage with Jaisalmer's golden fort, camel safari and a memorable desert evening.",highlights:["Mehrangarh Fort","Jaisalmer Fort","Camel safari at Sam Dunes","Desert sunset experience"],dayIds:[37350616,37272317,12510699,19091920]},
  {title:"Royal Rajasthan Tour",slug:"royal-rajasthan-tour",category:"Heritage",location:"Jaipur • Jodhpur • Udaipur • Jaisalmer • Bikaner",days:10,nights:9,hero:37272317,desc:"A grand Rajasthan circuit through royal cities, historic forts, elegant palaces and desert landscapes.",highlights:["Five royal Rajasthan cities","Forts, palaces and havelis","Lake City experiences","Golden Desert journey"],dayIds:[36213405,37350667,33726478,15344913,36561998,12510699,19091920,36563717,31804744,8570419]},
  {title:"Cultural Rajasthan Tour",slug:"cultural-rajasthan-tour",category:"Culture",location:"Jaipur • Pushkar • Jodhpur • Udaipur",days:7,nights:6,hero:33726478,desc:"Explore Rajasthan through living traditions, colourful markets, temples, old cities and local culture.",highlights:["Traditional markets","Pushkar spiritual atmosphere","Jodhpur old city","Udaipur cultural evenings"],dayIds:[36213405,15344913,8570419,37350616,33726478,36563717,31804744]},
  {title:"Forts & Palaces Tour",slug:"forts-palaces-tour",category:"Heritage",location:"Jaipur • Jodhpur • Udaipur • Chittorgarh",days:7,nights:6,hero:36213405,desc:"A focused journey through Rajasthan's greatest forts, royal residences and architectural landmarks.",highlights:["Amber Fort","Mehrangarh Fort","City Palace Udaipur","Chittorgarh Fort"],dayIds:[37350667,36561998,15344913,33726478,37272317,31804744,8570419]},
  {title:"Pilgrimage Tour",slug:"pilgrimage-tour",category:"Spiritual",location:"Pushkar • Ajmer • Nathdwara • Ranakpur",days:5,nights:4,hero:8570419,desc:"A comfortable spiritual journey connecting Rajasthan's important temples, shrines and peaceful sacred towns.",highlights:["Pushkar Brahma Temple","Ajmer Sharif","Nathdwara","Ranakpur Jain Temple"],dayIds:[31804744,15344913,33726478,36563717,37272317]},
  {title:"Adventure Rajasthan Tour",slug:"adventure-rajasthan-tour",category:"Adventure",location:"Jodhpur • Jaisalmer • Mount Abu",days:6,nights:5,hero:15295236,desc:"Mix heritage with desert adventure, outdoor experiences and Rajasthan's scenic hill landscapes.",highlights:["Desert safari","Camel experience","Outdoor activities","Mount Abu scenery"],dayIds:[37350616,12510699,19091920,2187050,9834000,33726478]},
  {title:"Family Rajasthan Tour",slug:"family-rajasthan-tour",category:"Family",location:"Jaipur • Jodhpur • Udaipur",days:6,nights:5,hero:33598030,desc:"A relaxed Rajasthan family itinerary with comfortable pacing, popular attractions and private transport.",highlights:["Family-friendly sightseeing","Comfortable private travel","Flexible daily schedule","Major Rajasthan highlights"],dayIds:[36213405,37350667,37350616,33726478,36563717,31804744]},
  {title:"Honeymoon Rajasthan Tour",slug:"honeymoon-rajasthan-tour",category:"Honeymoon",location:"Udaipur • Jodhpur • Jaisalmer",days:5,nights:4,hero:37298875,desc:"A romantic Rajasthan getaway combining lakeside Udaipur, blue Jodhpur and magical desert sunsets.",highlights:["Romantic Udaipur evening","Heritage stays","Private sightseeing","Jaisalmer desert sunset"],dayIds:[36563717,33726478,37350616,12510699,19091920]},
  {title:"Budget Rajasthan Tour",slug:"budget-rajasthan-tour",category:"Budget",location:"Jodhpur • Jaipur • Pushkar",days:5,nights:4,hero:2187050,desc:"See Rajasthan's essential highlights with a practical itinerary, private road travel and flexible stay options.",highlights:["Essential Rajasthan sights","Efficient route planning","Flexible hotel choices","Private transport"],dayIds:[37350616,36213405,15344913,8570419,33726478]},
  {title:"Wildlife Rajasthan Tour",slug:"wildlife-rajasthan-tour",category:"Wildlife",location:"Ranthambore • Bharatpur • Jaipur",days:6,nights:5,hero:145939,desc:"Combine Rajasthan heritage with wildlife experiences around Ranthambore and Bharatpur's natural landscapes.",highlights:["Ranthambore safari zone","Birding at Bharatpur","Jaipur heritage","Nature-focused itinerary"],dayIds:[247431,145939,792381,36213405,37350667,33726478]},
  {title:"Luxury Rajasthan Tour",slug:"luxury-rajasthan-tour",category:"Luxury",location:"Jaipur • Jodhpur • Udaipur • Jaisalmer",days:8,nights:7,hero:18860533,desc:"Experience Rajasthan with premium private transport, elegant stays and a refined heritage itinerary.",highlights:["Premium private travel","Luxury heritage stays","Curated sightseeing","Flexible concierge-style planning"],dayIds:[36213405,37350667,37350616,36563717,33726478,12510699,19091920,31804744]},
  {title:"All India Tour Packages",slug:"all-india-tour-packages",category:"All India",location:"Custom destinations across India",days:10,nights:9,hero:31804744,desc:"Build a longer private journey connecting Rajasthan with destinations across North, West, South or Central India.",highlights:["Custom multi-state routes","Private vehicle planning","Flexible duration","Hotels and sightseeing tailored to you"],dayIds:[8570419,15295236,2187050,9834000,12510699,36563717,33726478,36213405,37350667,31804744]},
  {title:"Customised Tour Package",slug:"customised-tour-package",category:"Custom",location:"Your route • Your dates • Your preferences",days:5,nights:4,hero:15295236,desc:"Tell us your destinations, dates and travel style and Rani Tours will shape a private itinerary around you.",highlights:["Choose your destinations","Choose your duration","Flexible sightseeing","Vehicle and stay options"],dayIds:[2187050,9834000,12510699,33726478,36563717]},
];

function buildItinerary(plan) {
  const places = plan.location.split("•").map((x) => x.trim()).filter(Boolean);
  return Array.from({ length: plan.days }, (_, index) => {
    const place = places[index % places.length] || "Rajasthan";
    const isFirst = index === 0;
    const isLast = index === plan.days - 1;
    const title = isFirst ? `Arrival & ${place}` : isLast ? `${place} & Departure` : `${place} Exploration`;
    const description = isFirst
      ? `Meet your Rani Tours driver and begin the journey with a comfortable arrival transfer and relaxed introduction to ${place}.`
      : isLast
        ? `Enjoy the final planned experiences in ${place} before your comfortable onward or departure transfer.`
        : `Explore the key sights, local character and memorable experiences of ${place} at a comfortable private-tour pace.`;
    return day(index + 1, title, description, plan.dayIds[index % plan.dayIds.length], [
      stop("09:00 AM", isFirst ? "Pickup / arrival coordination" : "Hotel pickup after breakfast"),
      stop("11:00 AM", `${place} sightseeing and local highlights`),
      stop("02:00 PM", "Lunch break at your preferred restaurant"),
      stop("04:00 PM", "Continue sightseeing / local experience"),
      stop("07:00 PM", isLast ? "Departure transfer / tour conclusion" : "Hotel drop and evening at leisure"),
    ]);
  });
}

const Mixed = new mongoose.Schema({}, { strict: false, timestamps: true });
const Tour = mongoose.models.TourPackage || mongoose.model("TourPackage", Mixed, "tourpackages");

for (let index = 0; index < plans.length; index++) {
  const plan = plans[index];
  const itinerary = buildItinerary(plan);
  const used = new Set([plan.hero, ...plan.dayIds]);
  const galleryPool = [32176173,36512152,35641554,37102472,32176403,29396537,7464537,5329530,31646408,32691096];
  const galleryIds = galleryPool.filter((id) => !used.has(id)).slice(0, 5);
  const payload = {
    title: plan.title,
    slug: plan.slug,
    category: plan.category,
    location: plan.location,
    shortDescription: plan.desc,
    overview: `${plan.desc} This private itinerary can be adjusted around your travel dates, preferred pace, hotel category and interests.`,
    heroImage: image(plan.hero, plan.title),
    gallery: galleryIds.map((id, i) => image(id, `${plan.title} gallery ${i + 1}`, 1200)),
    durationDays: plan.days,
    durationNights: plan.nights,
    approximateDistanceKm: plan.days * 180,
    popularAttractions: Math.max(6, plan.days * 2),
    tourType: "Private Tour",
    flexibleItinerary: true,
    customizable: true,
    startingPrice: 0,
    priceUnit: "",
    priceNote: "",
    highlights: plan.highlights,
    itinerary,
    itineraryNote: "This is a suggested itinerary. It can be customized according to your travel preferences.",
    inclusions: [...commonInclusions],
    exclusions: [...commonExclusions],
    faq: [
      { question: `Can I customize the ${plan.title}?`, answer: "Yes. The route, duration, hotel category and sightseeing can be adjusted around your requirements." },
      { question: "Is the tour private?", answer: "Yes. The seeded package is planned as a private vehicle tour for your group." },
      { question: "How do I confirm the tour?", answer: "Send an enquiry or contact Rani Tours by phone or WhatsApp. The team will confirm the final itinerary and travel details with you." },
    ],
    relatedPackageIds: [],
    featured: index < 6,
    status: "published",
    sortOrder: index + 1,
    publishedAt: new Date(),
    seo: {
      metaTitle: `${plan.title} | Rani Tour's`,
      metaDescription: plan.desc,
      keywords: [plan.title, "Rajasthan tour package", "Rani Tours", "private tour from Jodhpur"],
      canonicalUrl: `/tour-packages/${plan.slug}`,
      ogImage: image(plan.hero, plan.title),
    },
  };
  await Tour.findOneAndUpdate({ slug: plan.slug }, { $set: payload }, { upsert: true, returnDocument: "after", setDefaultsOnInsert: true });
  console.log(`Seeded ${plan.slug}`);
}

console.log(`Done. ${plans.length} tour packages seeded.`);
await mongoose.disconnect();