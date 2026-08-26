import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({ url:{type:String,required:true}, publicId:{type:String,default:""}, alt:{type:String,default:""} },{_id:false});

const FleetVehicleSchema = new Schema({
  name:{type:String,required:true,trim:true},
  slug:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},
  modelLabel:{type:String,required:true,trim:true},
  category:{type:String,enum:["sedan","suv","mpv","tempo_traveller","bus","luxury","other"],default:"sedan",index:true},
  seatingLabel:{type:String,required:true,trim:true},
  seatCount:{type:Number,required:true,min:1},
  luggageLabel:{type:String,default:""},
  luggageCount:{type:Number,default:0,min:0},
  ac:{type:Boolean,default:true},
  description:{type:String,required:true,trim:true},
  bestFor:{type:String,default:""},
  badge:{type:String,default:""},
  image:{type:ImageSchema,required:true},
  gallery:{type:[ImageSchema],default:[]},
  startingPrice:{type:Number,default:0,min:0},
  priceUnit:{type:String,default:""},
  localRatePerKm:{type:Number,default:0,min:0},
  outstationRatePerKm:{type:Number,default:0,min:0},
  minimumKmPerDay:{type:Number,default:0,min:0},
  driverAllowancePerDay:{type:Number,default:0,min:0},
  tollParkingIncluded:{type:Boolean,default:false},
  features:{type:[String],default:[]},
  suitableFor:{type:[String],default:[]},
  featured:{type:Boolean,default:false,index:true},
  status:{type:String,enum:["draft","published"],default:"draft",index:true},
  sortOrder:{type:Number,default:0},
  publishedAt:{type:Date,default:null},
  seo:{metaTitle:{type:String,default:""},metaDescription:{type:String,default:""},keywords:{type:[String],default:[]},canonicalUrl:{type:String,default:""},ogImage:{type:ImageSchema,default:null}},
  createdBy:{type:Schema.Types.ObjectId,ref:"AdminUser",default:null},
  updatedBy:{type:Schema.Types.ObjectId,ref:"AdminUser",default:null},
},{timestamps:true});

FleetVehicleSchema.index({name:"text",modelLabel:"text",description:"text",bestFor:"text"});
export const FleetVehicle=models.FleetVehicle||model("FleetVehicle",FleetVehicleSchema);
