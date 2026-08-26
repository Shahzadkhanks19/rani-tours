import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const u = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
const image = (url, alt) => ({ url, publicId: "", alt });
const card = (title, description, url, alt = title) => ({ title, description, image: image(url, alt) });
const feature = (title, description) => ({ title, description, icon: "check" });
const route = (title, from, to, durationLabel, url) => ({ title, from, to, durationLabel, startingPrice: 0, priceUnit: "", image: image(url, title) });

const why = [
  feature("Experienced Drivers", "Professional, courteous drivers focused on a smooth journey."),
  feature("Well Maintained Vehicles", "Clean and regularly serviced vehicles for comfortable travel."),
  feature("Reliable Service", "Clear communication and dependable travel planning from start to finish."),
  feature("On-Time Service", "Punctual pickup and thoughtful route planning for every trip."),
  feature("24/7 Customer Support", "Assistance before and throughout your journey whenever required."),
  feature("Safe & Comfortable", "Passenger comfort and safe driving remain our first priority."),
];

const heroes = {
  local: u("photo-1599661046289-e31897846e41"),
  outstation: u("photo-1500530855697-b586d89ba3ee"),
  oneWay: u("photo-1449965408869-eaa3f722e40d"),
  roundTrip: u("photo-1500534314209-a25ddb2bd429"),
  multiCity: u("photo-1469854523086-cc02fe5d8800"),
  airport: u("photo-1436491865332-7a61a109cc05"),
  railway: u("photo-1473445361085-b9a07f55608b"),
  hotel: u("photo-1566073771259-6a8506099945"),
  corporate: u("photo-1497366754035-f200968a6e72"),
  wedding: u("photo-1519741497674-611481863552"),
  tempo: u("photo-1544620347-c4fd4a3d5957"),
  luxury: u("photo-1503376780353-7e6692767b70"),
  bus: u("photo-1494515843206-f3117d3f51b7"),
  rajasthan: u("photo-1599661046827-dacff0c0f09a"),
  india: u("photo-1524492412937-b28074a5d7da"),
  custom: u("photo-1488646953014-85cb44e25828"),
};

function service({ title, slug, type, template = "generic", tagline, desc, overview, hero, form, order, cards = [], routes = [], uses = [], heroFeatures = why.slice(0, 4), customWhy = why }) {
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
    heroFeatures,
    whyChooseFeatures: customWhy,
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

const localCards = [
  card("Mehrangarh Fort", "Explore Jodhpur's iconic hilltop fort with a convenient local ride.", u("photo-1590050752117-238cb0fb12b1", 1000)),
  card("Umaid Bhawan Palace", "Comfortable pickup and drop for one of Jodhpur's grandest landmarks.", u("photo-1564507592333-c60657eea523", 1000)),
  card("Jaswant Thada", "Visit the peaceful marble memorial and nearby heritage attractions.", u("photo-1602643163983-ed0babc39797", 1000)),
  card("Clock Tower & Market", "Easy local travel for shopping and exploring the old city markets.", u("photo-1599661046827-dacff0c0f09a", 1000)),
  card("Mandore Gardens", "Plan a relaxed local ride to Mandore's gardens and historic monuments.", u("photo-1622308644420-b20142dc993c", 1000)),
];

const outstationRoutes = [
  route("Jodhpur → Jaipur", "Jodhpur", "Jaipur", "Approx. 6 hours", u("photo-1599661046289-e31897846e41", 1000)),
  route("Jodhpur → Udaipur", "Jodhpur", "Udaipur", "Approx. 5 hours", u("photo-1595658658481-d53d3f999875", 1000)),
  route("Jodhpur → Jaisalmer", "Jodhpur", "Jaisalmer", "Approx. 5 hours", u("photo-1600954700722-b9df46a3a0d3", 1000)),
  route("Jodhpur → Mount Abu", "Jodhpur", "Mount Abu", "Scenic hill journey", u("photo-1627894483216-2138af692e32", 1000)),
  route("Jodhpur → Delhi", "Jodhpur", "Delhi", "Interstate journey", u("photo-1587474260584-136574528ed5", 1000)),
];

const oneWayRoutes = [
  route("Jodhpur → Ajmer", "Jodhpur", "Ajmer", "Direct one-way journey", u("photo-1603262110263-fb0112e7cc33", 1000)),
  route("Jodhpur → Pushkar", "Jodhpur", "Pushkar", "Direct one-way journey", u("photo-1598091383021-15ddea10925d", 1000)),
  route("Jodhpur → Bikaner", "Jodhpur", "Bikaner", "Direct one-way journey", u("photo-1605649487212-47bdab064df7", 1000)),
  route("Jodhpur → Ahmedabad", "Jodhpur", "Ahmedabad", "Interstate one-way journey", u("photo-1599030284356-8a0f23895b1f", 1000)),
  route("Jodhpur → Chandigarh", "Jodhpur", "Chandigarh", "Long-distance one-way journey", u("photo-1588416936097-41850ab3d86d", 1000)),
];

const roundRoutes = [
  route("Jaipur Round Trip", "Jodhpur", "Jaipur", "Flexible return journey", u("photo-1477587458883-47145ed94245", 1000)),
  route("Udaipur Round Trip", "Jodhpur", "Udaipur", "Flexible return journey", u("photo-1575994532957-773da2f83eb5", 1000)),
  route("Jaisalmer Round Trip", "Jodhpur", "Jaisalmer", "Flexible return journey", u("photo-1624473930565-5e12a9b55d0d", 1000)),
  route("Mount Abu Round Trip", "Jodhpur", "Mount Abu", "Flexible return journey", u("photo-1605537964076-3cb0ea2ff329", 1000)),
  route("Pushkar Round Trip", "Jodhpur", "Pushkar", "Flexible return journey", u("photo-1603262110263-fb0112e7cc33", 1000)),
];

const multiRoutes = [
  route("Jodhpur – Udaipur – Jaipur", "Jodhpur", "Jaipur", "3 cities · flexible itinerary", u("photo-1609920658906-8223bd289001", 1000)),
  route("Jodhpur – Jaisalmer – Bikaner", "Jodhpur", "Bikaner", "3 cities · desert circuit", u("photo-1599661046289-e31897846e41", 1000)),
  route("Jodhpur – Ajmer – Pushkar – Jaipur", "Jodhpur", "Jaipur", "4 cities · heritage & spiritual", u("photo-1598091383021-15ddea10925d", 1000)),
  route("Jodhpur – Mount Abu – Udaipur", "Jodhpur", "Udaipur", "3 cities · hills & lakes", u("photo-1575994532957-773da2f83eb5", 1000)),
  route("Rajasthan Heritage Circuit", "Jodhpur", "Rajasthan", "Custom multi-city circuit", u("photo-1524492412937-b28074a5d7da", 1000)),
];

const airportCards = [
  card("Airport Pickup", "Coordinated pickup after your arrival with easy communication.", u("photo-1530521954074-e64f6810b32d", 1000)),
  card("Airport Drop", "Plan a timely departure transfer with comfortable door-to-door travel.", u("photo-1556388158-158ea5ccacbd", 1000)),
  card("Business Transfer", "Professional airport movement for executives and corporate guests.", u("photo-1521791055366-0d553872125f", 1000)),
  card("Family Transfer", "Comfortable airport rides with space for family and luggage.", u("photo-1504150558240-0b4fd8946624", 1000)),
  card("Group Transfer", "Coordinated airport transport for groups travelling together.", u("photo-1529156069898-49953e39b3ac", 1000)),
];

const railwayCards = [
  card("Jodhpur Junction Pickup", "Meet-and-transfer service from Jodhpur Junction to your destination.", u("photo-1516939884455-1445c8652f83", 1000)),
  card("Station Drop", "Reach the railway station comfortably with planned pickup timing.", u("photo-1535535112387-56ffe8db21ff", 1000)),
  card("Hotel Transfer", "Direct travel between the railway station and your hotel.", u("photo-1566073771259-6a8506099945", 1000)),
  card("Outstation Connection", "Continue directly from the station to another city or destination.", u("photo-1526772662000-3f88f10405ff", 1000)),
  card("Group Station Transfer", "Suitable vehicle coordination for families and larger groups.", u("photo-1517245386807-bb43f82c33c4", 1000)),
];

const hotelCards = [
  card("RAAS Jodhpur", "Pickup and drop for guests staying near the old city and Mehrangarh Fort.", u("photo-1564501049412-61c2a3083791", 1000)),
  card("Umaid Bhawan Palace", "Comfortable hotel transfer for palace guests and visitors.", u("photo-1571896349842-33c89424de2d", 1000)),
  card("Taj Hari Mahal", "Door-to-door transfer for hotel, airport, station and sightseeing travel.", u("photo-1542314831-068cd1dbfeeb", 1000)),
  card("Indana Palace", "Reliable transfer service for arrivals, departures and local travel.", u("photo-1551882547-ff40c63fe5fa", 1000)),
  card("Heritage Hotels", "Pickup and drop for heritage stays across Jodhpur and Rajasthan.", u("photo-1445019980597-93fa8acb246c", 1000)),
];

const corporateCards = [
  card("Business Meetings", "Punctual professional travel for meetings and appointments.", u("photo-1521737711867-e3b97375f902", 1000)),
  card("Airport Transfers", "Smooth airport movement for executives, teams and visiting clients.", u("photo-1517245386807-bb43f82c33c4", 1000)),
  card("Client & Guest Travel", "Presentable transport for customers, guests and business partners.", u("photo-1556761175-b413da4baf72", 1000)),
  card("Corporate Events", "Coordinated movement for conferences, events and team gatherings.", u("photo-1505373877841-8d25f7d46678", 1000)),
  card("Employee Travel", "Reliable planned transport for work-related employee movement.", u("photo-1497366811353-6870744d04b2", 1000)),
];

const weddingCards = [
  card("Bride & Groom Car", "Elegant chauffeured travel for the couple on their special day.", u("photo-1507504031003-b417219a0fde", 1000)),
  card("Family Transportation", "Comfortable coordinated travel for close family members.", u("photo-1519225421980-715cb0215aed", 1000)),
  card("Guest Transportation", "Organized movement for wedding guests between hotels and venues.", u("photo-1511285560929-80b456fea0bc", 1000)),
  card("Venue Transfers", "Smooth transport between ceremony, reception and accommodation venues.", u("photo-1507504031003-b417219a0fde", 1000)),
  card("Multi-Event Coordination", "Travel support across wedding functions and celebrations.", u("photo-1464366400600-7168b8af9bc3", 1000)),
];

const tempoCards = [
  card("9 Seater Traveller", "Compact group travel for smaller families and teams.", u("photo-1533473359331-0135ef1b58bf", 1000)),
  card("12 Seater Traveller", "Comfortable space for family trips and small groups.", u("photo-1500530855697-b586d89ba3ee", 1000)),
  card("15 Seater Traveller", "Flexible group travel for tours, outings and events.", u("photo-1500534314209-a25ddb2bd429", 1000)),
  card("17 Seater Traveller", "Suitable for larger family, corporate and pilgrimage groups.", u("photo-1469854523086-cc02fe5d8800", 1000)),
  card("20 Seater Traveller", "Extra group capacity for longer journeys and organized travel.", u("photo-1526772662000-3f88f10405ff", 1000)),
];

const luxuryCards = [
  card("Premium Sedan", "Elegant chauffeur-driven travel for business and special occasions.", u("photo-1550355291-bbee04a92027", 1000)),
  card("Luxury SUV", "Spacious premium travel for executives, families and VIP guests.", u("photo-1519641471654-76ce0107ad1b", 1000)),
  card("Executive Transfer", "Professional vehicle service for meetings and corporate movement.", u("photo-1542282088-72c9c27ed0cd", 1000)),
  card("Wedding Car", "A polished arrival experience for wedding celebrations.", u("photo-1511919884226-fd3cad34687c", 1000)),
  card("VIP Travel", "Discreet and comfortable travel for important guests and occasions.", u("photo-1549317661-bd32c8ce0db2", 1000)),
];

const busCards = [
  card("Mini Bus", "Group travel for compact events, tours and family functions.", u("photo-1494515843206-f3117d3f51b7", 1000)),
  card("Luxury Mini Bus", "Comfort-focused group transport for longer journeys.", u("photo-1544620347-c4fd4a3d5957", 1000)),
  card("Standard Coach", "Reliable transport for tours, institutions and organized groups.", u("photo-1517524008697-84bbe3c3fd98", 1000)),
  card("Luxury Coach", "Enhanced comfort for long routes, events and large groups.", u("photo-1570125909232-eb263c188f7e", 1000)),
  card("Large Group Coach", "Suitable for major events, pilgrimages and large group travel.", u("photo-1547886597-7e87e5288619", 1000)),
];

const roundUses = [
  card("Family Vacations", "Spend quality time together on a flexible return journey.", u("photo-1500534314209-a25ddb2bd429", 1000)),
  card("Business Trips", "Travel comfortably for meetings and work across cities.", u("photo-1522071820081-009f0129c71c", 1000)),
  card("Pilgrimage Tours", "Visit spiritual destinations with a planned vehicle throughout the trip.", u("photo-1567591370504-c8b4a5a8a61a", 1000)),
  card("Weekend Getaways", "Take a break and explore nearby destinations at your pace.", u("photo-1500530855697-b586d89ba3ee", 1000)),
  card("Weddings & Functions", "Coordinated return travel for celebrations and family events.", u("photo-1464366400600-7168b8af9bc3", 1000)),
];

const multiUses = [
  card("Family Holidays", "Explore several cities comfortably with your family.", u("photo-1529156069898-49953e39b3ac", 1000)),
  card("Business Trips", "Cover meetings and destinations on one coordinated route.", u("photo-1521737711867-e3b97375f902", 1000)),
  card("Religious Journeys", "Connect multiple spiritual destinations in one travel plan.", u("photo-1564507592333-c60657eea523", 1000)),
  card("Weekend Getaways", "Build a short multi-stop route for nearby destinations.", u("photo-1526772662000-3f88f10405ff", 1000)),
  card("Group Tours", "Travel together across multiple cities with one coordinated vehicle.", u("photo-1529156069898-49953e39b3ac", 1000)),
];

const airportUses = [
  card("Business Travel", "Professional airport movement for business travellers.", u("photo-1521791055366-0d553872125f", 1000)),
  card("Family Vacations", "Comfortable travel for family arrivals and departures.", u("photo-1504150558240-0b4fd8946624", 1000)),
  card("Group Transfers", "Keep the group together from airport to destination.", u("photo-1529156069898-49953e39b3ac", 1000)),
  card("VIP & Executive", "Smooth premium transfers for executives and important guests.", u("photo-1556761175-b413da4baf72", 1000)),
  card("International Arrivals", "Easy pickup coordination after long-distance flights.", u("photo-1436491865332-7a61a109cc05", 1000)),
];

const eventUses = [
  card("Weddings & Functions", "Coordinated group travel for your special day.", u("photo-1519741497674-611481863552", 1000)),
  card("Family Trips", "Enjoy vacations and outings together in one vehicle.", u("photo-1529156069898-49953e39b3ac", 1000)),
  card("Corporate Tours", "Group transport for teams, conferences and outings.", u("photo-1497366754035-f200968a6e72", 1000)),
  card("Pilgrimage Tours", "Comfortable group travel for spiritual journeys.", u("photo-1564507592333-c60657eea523", 1000)),
  card("Events & Festivals", "Organized transport for concerts, functions and celebrations.", u("photo-1505373877841-8d25f7d46678", 1000)),
];

const data = [
  service({ title:"Jodhpur Local Taxi", slug:"jodhpur-local-taxi", type:"Local Taxi", template:"local", tagline:"Travel Local. Travel Comfortable.", desc:"Safe, reliable local taxi service for daily travel, hotel transfers and Jodhpur sightseeing.", overview:"Explore Jodhpur comfortably with professional local drivers who know the city, monuments, hotels, markets and neighbourhoods.", hero:heroes.local, form:"Plan Your Local Ride", order:1, cards:localCards, uses:[] }),
  service({ title:"Outstation Taxi", slug:"outstation-taxi", type:"Outstation Taxi", tagline:"Travel Outstation. Travel Worry-Free.", desc:"Comfortable outstation taxi service from Jodhpur to Rajasthan and destinations across India.", overview:"Choose one-way, round-trip or multi-city travel with experienced drivers and flexible itineraries.", hero:heroes.outstation, form:"Plan Your Outstation Ride", order:2, routes:outstationRoutes, cards:[card("One Way Taxi","Direct travel when you only need to reach your destination.",u("photo-1449965408869-eaa3f722e40d",1000)),card("Round Trip Taxi","Keep the vehicle through your onward and return journey.",u("photo-1500534314209-a25ddb2bd429",1000)),card("Multi City Taxi","Connect several cities with one flexible travel plan.",u("photo-1469854523086-cc02fe5d8800",1000))] }),
  service({ title:"One Way Taxi", slug:"one-way-taxi", type:"One Way Taxi", tagline:"Direct Travel. Simple Journey.", desc:"Comfortable one-way taxi service from Jodhpur for direct travel to your destination.", overview:"Ideal when your travel plan ends at the destination. Enjoy a direct journey with a professional driver and suitable vehicle.", hero:heroes.oneWay, form:"Plan Your One Way Ride", order:3, routes:oneWayRoutes }),
  service({ title:"Round Trip Taxi", slug:"round-trip-taxi", type:"Round Trip Taxi", template:"round_trip", tagline:"Go. Explore. Return Comfortably.", desc:"Flexible round-trip taxi service for vacations, business trips, pilgrimages and weekend travel.", overview:"Keep the same vehicle with you for the full journey and plan stops, sightseeing and return travel around your schedule.", hero:heroes.roundTrip, form:"Plan Your Round Trip", order:4, routes:roundRoutes, uses:roundUses }),
  service({ title:"Multi City Taxi", slug:"multi-city-taxi", type:"Multi City Taxi", tagline:"One Journey. Many Destinations.", desc:"Travel across multiple cities with a flexible taxi and a customizable itinerary.", overview:"Perfect for Rajasthan circuits, business travel, family holidays and spiritual journeys covering multiple cities.", hero:heroes.multiCity, form:"Plan Your Multi City Ride", order:5, routes:multiRoutes, uses:multiUses }),
  service({ title:"Airport Transfers", slug:"airport-transfers", type:"Airport Transfer", template:"airport", tagline:"On-Time Pickup. Smooth Transfers.", desc:"Reliable airport pickup and drop service with flight-friendly coordination and comfortable vehicles.", overview:"Plan airport transfers for business, family, group and executive travel with dependable pickup communication.", hero:heroes.airport, form:"Plan Your Airport Transfer", order:6, cards:airportCards, uses:airportUses }),
  service({ title:"Railway Station Transfers", slug:"railway-station-transfers", type:"Railway Transfer", tagline:"On-Time Pickup. Hassle-Free Travel.", desc:"Timely railway station pickup and drop service from Jodhpur Junction and other stations.", overview:"We coordinate station pickups and drops around your train schedule with experienced drivers and comfortable vehicles.", hero:heroes.railway, form:"Plan Your Railway Transfer", order:7, cards:railwayCards }),
  service({ title:"Hotel Transfers", slug:"hotel-transfers", type:"Hotel Transfer", tagline:"Hassle-Free Pickup & Drop From Your Hotel.", desc:"Reliable hotel pickup and drop service in Jodhpur and across Rajasthan.", overview:"Door-to-door hotel transfers for airports, railway stations, sightseeing, outstation journeys and inter-hotel travel.", hero:heroes.hotel, form:"Plan Your Hotel Transfer", order:8, cards:hotelCards }),
  service({ title:"Corporate Travel", slug:"corporate-travel", type:"Corporate Travel", template:"corporate", tagline:"Smart Travel. Strong Business.", desc:"Professional corporate taxi services for meetings, airport transfers, employee travel and events.", overview:"Punctual, presentable and reliable transport solutions for businesses, teams, clients and corporate guests.", hero:heroes.corporate, form:"Plan Your Corporate Ride", order:9, cards:corporateCards }),
  service({ title:"Wedding Transportation", slug:"wedding-transportation", type:"Wedding Transportation", template:"wedding", tagline:"Elegant Travel for Your Special Day.", desc:"Coordinated wedding transportation for couples, families, guests and event logistics.", overview:"From couple travel to family and guest movement, we coordinate wedding transportation with care across all functions.", hero:heroes.wedding, form:"Plan Your Wedding Ride", order:10, cards:weddingCards }),
  service({ title:"Tempo Traveller Rental", slug:"tempo-traveller-rental", type:"Tempo Traveller Rental", tagline:"Travel Together. Enjoy Together.", desc:"AC tempo traveller rental for family trips, group tours, corporate outings and pilgrimages.", overview:"Choose a vehicle configuration suited to your group for comfortable long-distance and local travel.", hero:heroes.tempo, form:"Plan Your Group Ride", order:11, cards:tempoCards, uses:eventUses }),
  service({ title:"Luxury Car Rental", slug:"luxury-car-rental", type:"Luxury Car Rental", tagline:"Travel in Style. Arrive in Elegance.", desc:"Premium chauffeur-driven vehicles for executive travel, weddings, business and airport transfers.", overview:"Travel in a premium vehicle with professional chauffeur support for important journeys and special occasions.", hero:heroes.luxury, form:"Plan Your Luxury Ride", order:12, cards:luxuryCards, uses:[card("Airport Transfers","Premium pickup and drop for a polished arrival.",u("photo-1556388158-158ea5ccacbd",1000)),card("Business Travel","Professional travel for meetings and corporate guests.",u("photo-1521737711867-e3b97375f902",1000)),card("Weddings","Arrive elegantly for your special celebration.",u("photo-1511919884226-fd3cad34687c",1000)),card("VIP Transfers","Comfortable travel for important guests.",u("photo-1549317661-bd32c8ce0db2",1000)),card("City Tours","Explore Jodhpur and Rajasthan in comfort.",u("photo-1599661046289-e31897846e41",1000))] }),
  service({ title:"Bus Rental", slug:"bus-rental", type:"Bus Rental", tagline:"Comfortable Group Travel, Made Simple.", desc:"Bus and coach rental for weddings, schools, corporate events, tours, pilgrimages and large groups.", overview:"Choose a suitable coach capacity for safe and coordinated group transportation across Jodhpur, Rajasthan and beyond.", hero:heroes.bus, form:"Plan Your Bus Rental", order:13, cards:busCards, uses:eventUses }),
  service({ title:"Rajasthan Taxi Service", slug:"rajasthan-taxi-service", type:"Rajasthan Taxi", tagline:"Explore Rajasthan With Local Experts.", desc:"Taxi service from Jodhpur for Jaipur, Udaipur, Jaisalmer, Mount Abu, Pushkar and Rajasthan circuits.", overview:"Discover Rajasthan with flexible routes, experienced drivers and vehicles suited to heritage tours and long journeys.", hero:heroes.rajasthan, form:"Plan Your Rajasthan Ride", order:14, routes:[route("Jodhpur → Jaisalmer","Jodhpur","Jaisalmer","Desert route",u("photo-1600954700722-b9df46a3a0d3",1000)),route("Jodhpur → Jaipur","Jodhpur","Jaipur","Heritage route",u("photo-1477587458883-47145ed94245",1000)),route("Jodhpur → Udaipur","Jodhpur","Udaipur","Lake City route",u("photo-1575994532957-773da2f83eb5",1000)),route("Jodhpur → Mount Abu","Jodhpur","Mount Abu","Hill route",u("photo-1605537964076-3cb0ea2ff329",1000)),route("Jodhpur → Pushkar","Jodhpur","Pushkar","Spiritual route",u("photo-1598091383021-15ddea10925d",1000))] }),
  service({ title:"All India Taxi", slug:"all-india-taxi", type:"All India Taxi", tagline:"From Jodhpur to Every Corner of India.", desc:"Long-distance taxi service from Jodhpur to destinations across North, South, East and West India.", overview:"Plan inter-state and multi-day taxi journeys with route flexibility and vehicle choices for different group sizes.", hero:heroes.india, form:"Plan Your All India Ride", order:15, cards:[card("North India","Plan journeys towards Delhi, Punjab, Himachal and Uttarakhand.",u("photo-1506905925346-21bda4d32df4",1000)),card("South India","Build a long-distance route towards southern destinations.",u("photo-1602216056096-3b40cc0c9944",1000)),card("West India","Travel towards Gujarat, Maharashtra and western India.",u("photo-1599030284356-8a0f23895b1f",1000)),card("East India","Create a custom route towards eastern destinations.",u("photo-1558431382-27e303142255",1000)),card("Custom India Route","Tell us your destination sequence and travel requirements.",u("photo-1488646953014-85cb44e25828",1000))] }),
  service({ title:"Custom Taxi Booking", slug:"custom-taxi-booking", type:"Custom Taxi", tagline:"Your Plan. Your Route. Your Ride.", desc:"A fully customized taxi plan for travel requirements that do not fit a standard service.", overview:"Tell us where, when and how you want to travel and our team will help arrange a suitable route and vehicle.", hero:heroes.custom, form:"Build Your Custom Ride", order:16, cards:[card("Custom Route","Build a route around the places you actually want to visit.",u("photo-1469854523086-cc02fe5d8800",1000)),card("Flexible Stops","Add sightseeing, pickup and rest stops to your journey.",u("photo-1500534314209-a25ddb2bd429",1000)),card("Group Requirement","Choose a suitable vehicle according to passengers and luggage.",u("photo-1529156069898-49953e39b3ac",1000)),card("Special Occasion","Plan transport for events, family functions or unique requirements.",u("photo-1464366400600-7168b8af9bc3",1000)),card("Long Journey","Coordinate multi-day and inter-state travel with your own itinerary.",u("photo-1500530855697-b586d89ba3ee",1000))] }),
];

const Mixed = new mongoose.Schema({}, { strict: false, timestamps: true });
const Taxi = mongoose.models.TaxiService || mongoose.model("TaxiService", Mixed, "taxiservices");

for (const item of data) {
  await Taxi.findOneAndUpdate({ slug: item.slug }, { $set: item }, { upsert: true, returnDocument: "after", setDefaultsOnInsert: true });
  console.log(`Seeded ${item.slug}`);
}

console.log(`Done. ${data.length} taxi services seeded.`);
await mongoose.disconnect();
