import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({ url:{type:String,required:true}, publicId:{type:String,default:""}, alt:{type:String,default:""} },{_id:false});
const CardSchema = new Schema({ title:{type:String,required:true}, description:{type:String,default:""}, image:{type:ImageSchema,default:null}, meta:{type:String,default:""} },{_id:false});
const FaqSchema = new Schema({ question:{type:String,required:true}, answer:{type:String,required:true} },{_id:false});

const DestinationSchema = new Schema({
  title:{type:String,required:true,trim:true},
  slug:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},
  entityType:{type:String,enum:["destination","category"],default:"destination",index:true},
  categoryType:{type:String,enum:["city","region","theme"],default:"city",index:true},
  parentCategoryIds:{type:[Schema.Types.ObjectId],ref:"Destination",default:[]},
  tagline:{type:String,default:""},
  shortDescription:{type:String,required:true,trim:true},
  overview:{type:String,default:""},
  heroImage:{type:ImageSchema,required:true},
  gallery:{type:[ImageSchema],default:[]},
  country:{type:String,default:"India"},
  state:{type:String,default:""},
  region:{type:String,default:""},
  bestTimeToVisit:{type:String,default:""},
  idealDuration:{type:String,default:""},
  knownFor:{type:[String],default:[]},
  latitude:{type:Number,default:null},
  longitude:{type:Number,default:null},
  attractions:{type:[CardSchema],default:[]},
  experiences:{type:[CardSchema],default:[]},
  travelTips:{type:[String],default:[]},
  featuredDestinationIds:{type:[Schema.Types.ObjectId],ref:"Destination",default:[]},
  nearbyDestinationIds:{type:[Schema.Types.ObjectId],ref:"Destination",default:[]},
  relatedPackageIds:{type:[Schema.Types.ObjectId],ref:"TourPackage",default:[]},
  relatedTaxiServiceIds:{type:[Schema.Types.ObjectId],ref:"TaxiService",default:[]},
  ctaTitle:{type:String,default:"Plan Your Trip"},
  ctaDescription:{type:String,default:""},
  faq:{type:[FaqSchema],default:[]},
  featured:{type:Boolean,default:false,index:true},
  status:{type:String,enum:["draft","published"],default:"draft",index:true},
  sortOrder:{type:Number,default:0},
  publishedAt:{type:Date,default:null},
  seo:{ metaTitle:{type:String,default:""}, metaDescription:{type:String,default:""}, keywords:{type:[String],default:[]}, canonicalUrl:{type:String,default:""}, ogImage:{type:ImageSchema,default:null} },
  createdBy:{type:Schema.Types.ObjectId,ref:"AdminUser",default:null},
  updatedBy:{type:Schema.Types.ObjectId,ref:"AdminUser",default:null},
},{timestamps:true});

DestinationSchema.index({title:"text",shortDescription:"text",state:"text",region:"text",country:"text"});
export const Destination = models.Destination || model("Destination",DestinationSchema);
