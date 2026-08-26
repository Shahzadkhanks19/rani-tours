import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const exact = (url, alt) => ({ url, publicId: "", alt });

// Every URL below was selected for the exact landmark/destination named in the title.
// If an exact image is not available, the card intentionally renders without an image
// rather than showing a generic or incorrect travel photo.
const HERO_IMAGES = {
  jodhpur: exact("https://gostops.com/blog/wp-content/uploads/2016/11/Jodhpur-2.jpg", "Mehrangarh Fort overlooking Jodhpur Blue City"),
  ranthambore: exact("https://www.ranthamborenationalpark.com/blog/wp-content/uploads/2017/03/Ranthambore_Tiger_Fateh_1.jpg", "Bengal tiger in Ranthambore National Park"),
  chittorgarh: exact("https://static.toiimg.com/photo/62694616/.jpg", "Chittorgarh Fort Rajasthan"),
  bundi: exact("https://www.indianrajputs.com/i/t/i/thumb800_bundi-Taragarh-fort-of-Bundi-princely-state-which-was-built-by-Rao-Raja-Bar-Singh-Hada-Chauhan-in-the-beginning-of-the-13th-century--1.jpg", "Taragarh Fort Bundi"),
  "north-india": exact("https://i.pinimg.com/736x/1a/52/cd/1a52cde99939ebb778947a7e0a7734a3.jpg", "India Gate New Delhi"),
  "south-india": exact("https://r1imghtlak.mmtcdn.com/071ab8bedd9111ec978c0a58a9feac02.jpg", "Kerala backwater houseboat"),
  "west-india": exact("https://www.trawellino.com/media/images/blog_images/1751152608_fL7AGedg.jpg", "Gateway of India Mumbai"),
  "east-india": exact("https://jckolkata.wordpress.com/wp-content/uploads/2020/07/queen-victorias-statue.jpg?w=1024", "Victoria Memorial Kolkata"),
  "hill-stations": exact("https://www.stayvista.com/blog/wp-content/uploads/2025/04/Kullu_Valley_near_Manali_Himachal_Pradesh_India-edited-1024x768.jpg", "Manali Himalayan valley"),
  "beach-destinations": exact("https://s7ap1.scene7.com/is/image/incredibleindia/2-baga-beach-goa-city-hero?qlt=82&ts=1742160280795", "Baga Beach Goa"),
  wildlife: exact("https://www.ranthamborenationalpark.com/blog/wp-content/uploads/2017/03/Ranthambore_Tiger_Fateh_1.jpg", "Tiger in Ranthambore National Park"),
  spiritual: exact("https://vishwanthretreat.com/wp-content/uploads/2025/07/2-1.jpg", "Dashashwamedh Ghat Varanasi"),
  honeymoon: exact("https://avathioutdoors.gumlet.io/travelGuide/dev/udaipur_P6712.jpg?compress=true&format=webp&h=630&q=80&w=1200", "City Palace Udaipur"),
  "weekend-getaways": exact("https://www.fabhotels.com/blog/wp-content/uploads/2019/05/Hawa-Mahal_600.jpg", "Hawa Mahal Jaipur"),
};

const TITLE_IMAGES = {
  "Mehrangarh Fort": exact("https://gostops.com/blog/wp-content/uploads/2016/11/Jodhpur-2.jpg", "Mehrangarh Fort Jodhpur"),
  "Jaswant Thada": exact("https://cms.patrika.com/wp-content/uploads/2024/03/11/jaswant_thada.jpg", "Jaswant Thada Jodhpur"),
  "Umaid Bhawan Palace": exact("https://www.rajasthandriver.com/img/attractions/667x445_umaid-bhawan-palace-jodhpur-2.jpg", "Umaid Bhawan Palace Jodhpur"),
  "Clock Tower & Sardar Market": exact("https://media.assettype.com/homegrown%2Fimport%2Fltoytmthmw-1542377247.gif?auto=format%2Ccompress&w=640", "Sardar Market Clock Tower Jodhpur"),

  "Ranthambore National Park": exact("https://www.ranthamborenationalpark.com/blog/wp-content/uploads/2017/03/Ranthambore_Tiger_Fateh_1.jpg", "Tiger in Ranthambore National Park"),
  "Ranthambore Fort": exact("https://api.welcomerajasthantours.com/uploads/1756889789261-882156829-ranthambhore-fort-bharatpur-rajasthan-1-attr-hero.jpeg", "Ranthambore Fort Rajasthan"),
  "Trinetra Ganesh Temple": exact("https://media1.thrillophilia.com/filestore/jaew06pdkorfng8w9eqhj5vorgn3_shutterstock_2372569215.jpg?dpr=2&w=400", "Trinetra Ganesh Temple Ranthambore"),

  "Chittorgarh Fort": exact("https://static.toiimg.com/photo/62694616/.jpg", "Chittorgarh Fort Rajasthan"),
  "Vijay Stambh": exact("https://static2.tripoto.com/media/filter/nl/img/237878/SpotDocument/1568533106_1568533106589.jpg", "Vijay Stambh Chittorgarh"),
  "Padmini Palace": exact("https://upload.wikimedia.org/wikipedia/commons/1/1e/......._padmini......_%2825107180249%29.jpg", "Rani Padmini Palace Chittorgarh"),

  "Garh Palace": exact("https://commons.wikimedia.org/wiki/Special:FilePath/Garh%20Palace%2C%20Bundi%20Rajasthan.jpg", "Garh Palace Bundi"),
  "Taragarh Fort": exact("https://www.indianrajputs.com/i/t/i/thumb800_bundi-Taragarh-fort-of-Bundi-princely-state-which-was-built-by-Rao-Raja-Bar-Singh-Hada-Chauhan-in-the-beginning-of-the-13th-century--1.jpg", "Taragarh Fort Bundi"),
  "Raniji Ki Baori": exact("https://www.indianrajputs.com/i/t/i/thumb800_bundi-Rani-jis-stepwell-Bundi-In-1699-AD-Rao-Raja-Anirudh-Singh-Ji-Hada-the-Chauhan-ruler-of-Bundi-Maharani-Ladkanwar-Ji-Nathawat-of-Hada-built-this-beautiful-stepwell-In-Rajputana-queens-have-always-1.jpg", "Raniji ki Baori Bundi"),

  "Delhi & Agra": exact("https://media.traveldepartment.com/dmxa8n1ci/image/upload/g_auto%2Cf_auto%2Cq_auto%3Abest%2Cc_lfill%2Cw_1000/v1702401117/discover_the_taj_mahal_2959996fa7.jpg", "Taj Mahal Agra"),
  "Varanasi": exact("https://vishwanthretreat.com/wp-content/uploads/2025/07/2-1.jpg", "Dashashwamedh Ghat Varanasi"),
  "Rajasthan": exact("https://www.fabhotels.com/blog/wp-content/uploads/2019/05/Hawa-Mahal_600.jpg", "Hawa Mahal Jaipur Rajasthan"),
  "Himachal & Uttarakhand": exact("https://www.stayvista.com/blog/wp-content/uploads/2025/04/Kullu_Valley_near_Manali_Himachal_Pradesh_India-edited-1024x768.jpg", "Manali Himalayan valley"),

  "Kerala": exact("https://r1imghtlak.mmtcdn.com/071ab8bedd9111ec978c0a58a9feac02.jpg", "Kerala backwater houseboat"),
  "Tamil Nadu": exact("https://www.sreestours.com/wp-content/uploads/2025/08/Meenakshi-Amman-Temple-tickets.jpg", "Meenakshi Amman Temple Madurai Tamil Nadu"),
  "Southern Hills": exact("https://www.sreestours.com/wp-content/uploads/2016/06/munnar-tour-e1466596391424.jpg", "Munnar tea plantations Kerala"),

  "Mumbai": exact("https://www.trawellino.com/media/images/blog_images/1751152608_fL7AGedg.jpg", "Gateway of India Mumbai"),
  "Goa": exact("https://s7ap1.scene7.com/is/image/incredibleindia/2-baga-beach-goa-city-hero?qlt=82&ts=1742160280795", "Baga Beach Goa"),

  "Kolkata": exact("https://jckolkata.wordpress.com/wp-content/uploads/2020/07/queen-victorias-statue.jpg?w=1024", "Victoria Memorial Kolkata"),
  "Odisha": exact("https://telugu.nativeplanet.com/img/2020/01/2-konark-sun-temple---front-elevation-1564142903-1579852194.jpg", "Konark Sun Temple Odisha"),
  "Darjeeling": exact("https://www.transindiatravels.com/wp-content/uploads/darjeeling1.jpg", "Darjeeling tea gardens"),

  "Manali": exact("https://www.stayvista.com/blog/wp-content/uploads/2025/04/Kullu_Valley_near_Manali_Himachal_Pradesh_India-edited-1024x768.jpg", "Manali Himalayan valley"),
  "Munnar": exact("https://www.sreestours.com/wp-content/uploads/2016/06/munnar-tour-e1466596391424.jpg", "Munnar tea plantations"),
  "Udaipur": exact("https://avathioutdoors.gumlet.io/travelGuide/dev/udaipur_P6712.jpg?compress=true&format=webp&h=630&q=80&w=1200", "City Palace Udaipur"),
  "Jaipur": exact("https://www.fabhotels.com/blog/wp-content/uploads/2019/05/Hawa-Mahal_600.jpg", "Hawa Mahal Jaipur"),
};

const Mixed = new mongoose.Schema({}, { strict: false, timestamps: true });
const Destination = mongoose.models.Destination || mongoose.model("Destination", Mixed, "destinations");

for (const [slug, heroImage] of Object.entries(HERO_IMAGES)) {
  const doc = await Destination.findOne({ slug }).lean();
  if (!doc) continue;

  const mapCards = (items = []) => items.map((item) => ({
    ...item,
    image: TITLE_IMAGES[item.title] || null,
  }));

  const attractions = mapCards(doc.attractions || []);
  const experiences = mapCards(doc.experiences || []);

  // Galleries are cleared until we have separately verified, non-repeating exact photos.
  // This prevents generic or unrelated images from appearing just to fill space.
  await Destination.updateOne(
    { slug },
    {
      $set: {
        heroImage,
        attractions,
        experiences,
        gallery: [],
        "seo.ogImage": heroImage,
      },
    },
  );

  console.log(`Applied exact title imagery for ${slug}`);
}

console.log("Exact destination imagery pass complete.");
await mongoose.disconnect();
