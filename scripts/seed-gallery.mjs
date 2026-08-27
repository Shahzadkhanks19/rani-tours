import mongoose from "mongoose";

const uri=process.env.MONGODB_URI;
if(!uri)throw new Error("MONGODB_URI is required");
await mongoose.connect(uri);

const db=mongoose.connection.db;
if(!db)throw new Error("MongoDB connection is unavailable");
const destinations=db.collection("destinations");
const fleet=db.collection("fleetvehicles");
const gallery=db.collection("galleryitems");

const preferredDestinationSlugs=["jodhpur","ranthambore","chittorgarh","bundi","north-india","south-india","west-india","east-india","hill-stations","beach-destinations","spiritual","honeymoon"];
const usedUrls=new Set();
const items=[];

function addItem(item){
  const url=item.image?.url;
  if(!url||usedUrls.has(url))return;
  usedUrls.add(url);
  items.push(item);
}

const destinationDocs=await destinations.find({status:"published",slug:{$in:preferredDestinationSlugs}}).toArray();
const destinationMap=new Map(destinationDocs.map((doc)=>[doc.slug,doc]));
let order=0;
for(const slug of preferredDestinationSlugs){
  const doc=destinationMap.get(slug);
  if(!doc)continue;
  if(doc.heroImage?.url)addItem({title:doc.title,category:"Destinations",image:{url:doc.heroImage.url,publicId:doc.heroImage.publicId||"",alt:doc.heroImage.alt||`${doc.title} travel destination`},caption:doc.tagline||doc.shortDescription||`Explore ${doc.title} with Rani Tour's.`,location:[doc.state,doc.country].filter(Boolean).join(", "),destinationId:doc._id,fleetId:null,featured:order===0,status:"published",sortOrder:order++});
  for(const attraction of (doc.attractions||[]).slice(0,2)){
    if(!attraction?.image?.url)continue;
    addItem({title:attraction.title,category:"Destinations",image:{url:attraction.image.url,publicId:attraction.image.publicId||"",alt:attraction.image.alt||`${attraction.title}, ${doc.title}`},caption:attraction.description||`Popular place to visit in ${doc.title}.`,location:doc.title,destinationId:doc._id,fleetId:null,featured:false,status:"published",sortOrder:order++});
  }
}

const fleetDocs=await fleet.find({status:"published","image.url":{$exists:true,$ne:""}}).sort({sortOrder:1,name:1}).toArray();
for(const vehicle of fleetDocs){
  addItem({title:vehicle.name,category:"Vehicles",image:{url:vehicle.image.url,publicId:vehicle.image.publicId||"",alt:vehicle.image.alt||`${vehicle.name} from Rani Tour's fleet`},caption:vehicle.modelLabel||vehicle.description||"Comfortable vehicle available with Rani Tour's.",location:"Rani Tour's Fleet",destinationId:null,fleetId:vehicle._id,featured:false,status:"published",sortOrder:order++});
}

const now=new Date();
for(const item of items){
  await gallery.updateOne({title:item.title,category:item.category},{
    $set:{...item,publishedAt:now,updatedAt:now},
    $setOnInsert:{createdAt:now,createdBy:null,updatedBy:null},
  },{upsert:true});
  console.log(`Seeded gallery: ${item.category} — ${item.title}`);
}

console.log(`Done. ${items.length} CMS gallery items seeded from the current Destination and Fleet CMS data.`);
await mongoose.disconnect();
