import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const p = (id, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const image = (url, alt) => ({ url, publicId: "", alt });
const card = (title, description, id) => ({ title, description, image: image(p(id, 1100), title) });
const feature = (title, description) => ({ title, description, icon: "check" });
const route = (title, from, to, durationLabel, id) => ({ title, from, to, durationLabel, startingPrice: 0, priceUnit: "", image: image(p(id, 1100), title) });

const why = [
  feature("Experienced Drivers", "Professional and courteous drivers focused on a smooth journey."),
  feature("Well Maintained Vehicles", "Clean and regularly serviced vehicles for comfortable travel."),
  feature("Reliable Service", "Clear communication and dependable planning from start to finish."),
  feature("On-Time Service", "Punctual pickup and thoughtful route planning for every trip."),
  feature("24/7 Customer Support", "Assistance before and throughout your journey whenever required."),
  feature("Safe & Comfortable", "Passenger comfort and safe driving remain our first priority."),
];

const heroes = {
  local: p(37350616),
  outstation: p(2187050),
  oneWay: p(9834000),
  roundTrip: p(19091920),
  multiCity: p(12510699),
  airport: p(6726195),
  railway: p(37040199),
  hotel: p(36342196),
  corporate: p(9520200),
  wedding: p(37298875),
  tempo: p(36512152),
  luxury: p(18860533),
  bus: p(37102472),
  rajasthan: p(37272317),
  india: p(31804744),
  custom: p(15295236),
};

function service({ title, slug, type, template = "generic", tagline, desc, overview, hero, form, order, cards = [], routes = [], uses = [] }) {
  return {
    title,
    slug,
    serviceType: type,
    pageTemplate: template,
    tagline,
    shortDescription: desc,
    overview,
    heroImage: image(hero, `${title} by Rani Tours`),
    gallery: [],
    origin: "Jodhpur",
    destination: "",
    distanceKm: 0,
    estimatedDuration: "",
    tripType: type,
    startingPrice: 0,
    priceUnit: "",
    priceNote: "",
    bookingForm: {
      title: form,
      showReturnDate: template === "round_trip",
      showTime: ["airport", "local"].includes(template),
      showTransferType: template === "airport",
      showFlightNumber: template === "airport",
      showVehicleType: true,
      showPassengers: true,
    },
    heroFeatures: why.slice(0, 4),
    whyChooseFeatures: why,
    serviceCards: cards,
    popularRoutes: routes,
    useCases: uses,
    faq: [],
    featured: order <= 8,
    status: "published",
    sortOrder: order,
    publishedAt: new Date(),
    seo: {
      metaTitle: `${title} in Jodhpur | Rani Tour's`,
      metaDescription: desc,
      keywords: [title, "taxi service Jodhpur", "Rani Tours", "Rajasthan travel"],
      canonicalUrl: `/taxi-services/${slug}`,
      ogImage: image(hero, title),
    },
  };
}

const roadRoutes = [
  route("Jodhpur → Jaipur", "Jodhpur", "Jaipur", "Approx. 6 hours", 2187050),
  route("Jodhpur → Udaipur", "Jodhpur", "Udaipur", "Approx. 5 hours", 9834000),
  route("Jodhpur → Jaisalmer", "Jodhpur", "Jaisalmer", "Approx. 5 hours", 12510699),
  route("Jodhpur → Mount Abu", "Jodhpur", "Mount Abu", "Scenic hill journey", 19091920),
  route("Jodhpur → Delhi", "Jodhpur", "Delhi", "Interstate journey", 15295236),
];

const localCards = [
  card("Mehrangarh Fort", "Explore Jodhpur's iconic hilltop fort with a convenient local ride.", 37350616),
  card("Blue City Streets", "Comfortable local travel through Jodhpur's old city neighbourhoods.", 37272317),
  card("Heritage Sightseeing", "Plan a relaxed city tour covering major landmarks and markets.", 33726478),
  card("Hotel Pickup & Drop", "Door-to-door local movement for hotel guests and visitors.", 36563717),
];

const airportCards = [
  card("Airport Pickup", "Coordinated pickup after your arrival with easy communication.", 36183004),
  card("Airport Drop", "Plan a timely departure transfer with comfortable door-to-door travel.", 32176403),
  card("Business Transfer", "Professional airport movement for executives and corporate guests.", 32176173),
  card("Family & Group Transfer", "Comfortable airport rides with luggage-friendly vehicle options.", 33598030),
];

const railwayCards = [
  card("Station Pickup", "Meet-and-transfer service from the railway station to your destination.", 11918704),
  card("Station Drop", "Reach the railway station comfortably with planned pickup timing.", 7119394),
  card("Passenger Assistance", "Simple coordination for travellers with luggage and family members.", 19249875),
  card("Outstation Connection", "Continue directly from the station to another city or destination.", 34859817),
];

const hotelCards = [
  card("Luxury Hotel Transfer", "Smooth pickup and drop for premium hotels and resorts.", 14768982),
  card("Heritage Hotel Transfer", "Comfortable movement for heritage stays across Rajasthan.", 36563717),
  card("Lobby Pickup", "Door-to-door coordination from hotel reception to your next stop.", 5157828),
  card("Inter-Hotel Transfer", "Easy travel between hotels, airports, stations and attractions.", 17001787),
];

const corporateCards = [
  card("Executive Travel", "Professional chauffeur-driven travel for executives and clients.", 9520200),
  card("Business Meetings", "Punctual point-to-point travel for meetings and appointments.", 18860533),
  card("Airport Coordination", "Smooth airport movement for business guests and teams.", 32176173),
  card("Corporate Events", "Reliable transport coordination for conferences and events.", 33988321),
];

const weddingCards = [
  card("Bride & Groom Car", "Elegant chauffeured travel for the couple on their special day.", 13777170),
  card("Wedding Car Arrival", "Stylish arrival and departure transport for wedding functions.", 13924551),
  card("Guest Transportation", "Organized movement for wedding guests between hotels and venues.", 29396537),
  card("Multi-Event Coordination", "Travel support across wedding functions and celebrations.", 8337944),
];

const tempoCards = [
  card("Small Group Travel", "Comfortable van-style travel for smaller families and teams.", 5329298),
  card("Family Tours", "Relaxed group movement for vacations, sightseeing and pilgrimages.", 7464537),
  card("Group Road Trips", "Travel together with extra seating and luggage flexibility.", 5329530),
  card("Long Journey Comfort", "Suitable for multi-day trips and organized group travel.", 7276715),
];

const luxuryCards = [
  card("Premium Sedan", "Elegant chauffeur-driven travel for business and special occasions.", 33988321),
  card("Luxury Highway Travel", "Smooth premium travel for longer journeys and VIP movement.", 35641554),
  card("Executive Transfer", "Professional vehicle service for meetings and corporate movement.", 31646408),
  card("Special Occasion Travel", "A polished premium option for celebrations and important arrivals.", 32691096),
];

const busCards = [
  card("Tour Coach", "Comfortable coach travel for sightseeing tours and large groups.", 37102472),
  card("Group Sightseeing", "Organized bus movement for group travel and city tours.", 6657469),
  card("Event Transport", "Coordinated bus travel for weddings, events and institutions.", 27174508),
];

const data = [
  service({ title: "Jodhpur Local Taxi", slug: "jodhpur-local-taxi", type: "Local Taxi", template: "local", tagline: "Travel Local. Travel Comfortable.", desc: "Safe and reliable local taxi service for daily travel and Jodhpur sightseeing.", overview: "Explore Jodhpur comfortably with experienced local drivers who know the city's landmarks, hotels, markets and neighbourhoods.", hero: heroes.local, form: "Plan Your Local Ride", order: 1, cards: localCards }),
  service({ title: "Outstation Taxi", slug: "outstation-taxi", type: "Outstation Taxi", tagline: "Long Rides. Smooth Journeys.", desc: "Comfortable outstation taxi services from Jodhpur to Rajasthan and destinations across India.", overview: "Choose flexible outstation travel with experienced drivers and comfortable vehicles for long-distance journeys.", hero: heroes.outstation, form: "Plan Your Outstation Ride", order: 2, routes: roadRoutes }),
  service({ title: "One Way Taxi", slug: "one-way-taxi", type: "One Way Taxi", tagline: "Direct Travel Without the Return Hassle.", desc: "Convenient one-way taxi service from Jodhpur for direct city-to-city travel.", overview: "Ideal when you only need a direct drop at your destination with no return journey planned.", hero: heroes.oneWay, form: "Plan Your One Way Ride", order: 3, routes: roadRoutes.slice().reverse() }),
  service({ title: "Round Trip Taxi", slug: "round-trip-taxi", type: "Round Trip Taxi", template: "round_trip", tagline: "Go. Explore. Return Comfortably.", desc: "Flexible round-trip taxi service for vacations, business trips, pilgrimages and weekend travel.", overview: "Keep the same vehicle for the journey and plan stops, sightseeing and return travel around your schedule.", hero: heroes.roundTrip, form: "Plan Your Round Trip", order: 4, routes: roadRoutes.slice(1).concat(roadRoutes.slice(0, 1)) }),
  service({ title: "Multi City Taxi", slug: "multi-city-taxi", type: "Multi City Taxi", tagline: "One Journey. Many Destinations.", desc: "Travel across multiple cities with a flexible taxi and customizable itinerary.", overview: "Perfect for Rajasthan circuits, family holidays, business travel and spiritual journeys covering multiple cities.", hero: heroes.multiCity, form: "Plan Your Multi City Ride", order: 5, routes: roadRoutes.slice(2).concat(roadRoutes.slice(0, 2)) }),
  service({ title: "Airport Transfers", slug: "airport-transfers", type: "Airport Transfer", template: "airport", tagline: "On-Time Airport Pickup. Smooth Transfers.", desc: "Reliable airport pickup and drop service with flight-friendly timings and comfortable vehicles.", overview: "Pre-book airport transfers for business, family and group travel with dependable pickup coordination.", hero: heroes.airport, form: "Plan Your Airport Transfer", order: 6, cards: airportCards }),
  service({ title: "Railway Station Transfers", slug: "railway-station-transfers", type: "Railway Transfer", tagline: "On-Time Pickup. Hassle-Free Travel.", desc: "Timely railway station pickup and drop service from Jodhpur and surrounding stations.", overview: "We coordinate station pickups and drops around your train schedule with comfortable vehicles and simple communication.", hero: heroes.railway, form: "Plan Your Railway Transfer", order: 7, cards: railwayCards }),
  service({ title: "Hotel Transfers", slug: "hotel-transfers", type: "Hotel Transfer", tagline: "Hassle-Free Pickup & Drop From Your Hotel.", desc: "Reliable hotel pickup and drop in Jodhpur and across Rajasthan.", overview: "Door-to-door hotel transfers for airports, stations, sightseeing, outstation travel and inter-hotel movement.", hero: heroes.hotel, form: "Plan Your Hotel Transfer", order: 8, cards: hotelCards }),
  service({ title: "Corporate Travel", slug: "corporate-travel", type: "Corporate Travel", template: "corporate", tagline: "Smart Travel. Strong Business.", desc: "Professional corporate taxi services for meetings, airport transfers, employee travel and events.", overview: "Punctual and presentable transport solutions for businesses, executives and corporate guests.", hero: heroes.corporate, form: "Plan Your Corporate Ride", order: 9, cards: corporateCards }),
  service({ title: "Wedding Transportation", slug: "wedding-transportation", type: "Wedding Transportation", template: "wedding", tagline: "Elegant Travel for Your Special Day.", desc: "Coordinated wedding transportation for couples, families, guests and event logistics.", overview: "From premium wedding cars to guest movement, tempo travellers and buses, we coordinate wedding travel with care.", hero: heroes.wedding, form: "Plan Your Wedding Transport", order: 10, cards: weddingCards }),
  service({ title: "Tempo Traveller Rental", slug: "tempo-traveller-rental", type: "Tempo Traveller Rental", tagline: "Travel Together. Enjoy Together.", desc: "Comfortable tempo traveller rental for family trips, group tours, corporate outings and pilgrimages.", overview: "Choose group-friendly vehicles for small and medium groups with comfortable seating and experienced drivers.", hero: heroes.tempo, form: "Plan Your Group Ride", order: 11, cards: tempoCards }),
  service({ title: "Luxury Car Rental", slug: "luxury-car-rental", type: "Luxury Car Rental", tagline: "Travel in Style. Arrive in Elegance.", desc: "Premium chauffeur-driven luxury cars for VIP travel, weddings, business and airport transfers.", overview: "Travel in premium sedans and SUVs with professional chauffeurs and polished service.", hero: heroes.luxury, form: "Plan Your Luxury Ride", order: 12, cards: luxuryCards }),
  service({ title: "Bus Rental", slug: "bus-rental", type: "Bus Rental", tagline: "Comfortable Group Travel, Made Simple.", desc: "Bus and coach rental for weddings, institutions, corporate events, tours, pilgrimages and large groups.", overview: "Choose suitable seating capacity for safe and coordinated group transportation.", hero: heroes.bus, form: "Plan Your Bus Rental", order: 13, cards: busCards }),
  service({ title: "Rajasthan Taxi Service", slug: "rajasthan-taxi-service", type: "Rajasthan Taxi", tagline: "Explore Rajasthan With Local Experts.", desc: "Taxi service from Jodhpur for Jaipur, Udaipur, Jaisalmer, Mount Abu, Pushkar and Rajasthan circuits.", overview: "Discover Rajasthan with flexible routes, experienced drivers and vehicles suited for heritage tours and long journeys.", hero: heroes.rajasthan, form: "Plan Your Rajasthan Ride", order: 14, routes: roadRoutes }),
  service({ title: "All India Taxi", slug: "all-india-taxi", type: "All India Taxi", tagline: "From Jodhpur to Every Corner of India.", desc: "Long-distance taxi service from Jodhpur to destinations across North, South, East and West India.", overview: "Plan custom interstate and multi-day taxi journeys with route flexibility and vehicle choices for every group size.", hero: heroes.india, form: "Plan Your All India Ride", order: 15, routes: roadRoutes.slice().reverse() }),
  service({ title: "Custom Taxi Booking", slug: "custom-taxi-booking", type: "Custom Taxi", tagline: "Your Plan. Your Route. Your Ride.", desc: "A fully customized taxi plan for routes or travel requirements that do not fit a standard service.", overview: "Tell us where, when and how you want to travel and we will build a suitable taxi plan around your requirements.", hero: heroes.custom, form: "Build Your Custom Ride", order: 16 }),
];

const Mixed = new mongoose.Schema({}, { strict: false, timestamps: true });
const Taxi = mongoose.models.TaxiService || mongoose.model("TaxiService", Mixed, "taxiservices");

for (const item of data) {
  await Taxi.findOneAndUpdate({ slug: item.slug }, { $set: item }, { upsert: true, returnDocument: "after", setDefaultsOnInsert: true });
  console.log(`Seeded ${item.slug}`);
}

console.log(`Done. ${data.length} taxi services seeded with verified imagery.`);
await mongoose.disconnect();