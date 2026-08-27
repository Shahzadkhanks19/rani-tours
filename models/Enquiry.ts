import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  text:{type:String,required:true,trim:true},
  adminId:{type:Schema.Types.ObjectId,ref:"AdminUser",default:null},
  adminName:{type:String,default:""},
  createdAt:{type:Date,default:Date.now},
},{_id:true});

const EnquirySchema = new Schema({
  requestId:{type:String,default:"",trim:true,index:true,sparse:true},
  source:{type:String,enum:["get_quote","contact"],required:true,index:true},
  name:{type:String,required:true,trim:true},
  phone:{type:String,required:true,trim:true,index:true},
  email:{type:String,default:"",trim:true,lowercase:true},
  subject:{type:String,default:"",trim:true},
  message:{type:String,default:"",trim:true},
  journeyType:{type:String,default:""},
  pickup:{type:String,default:""},
  destination:{type:String,default:""},
  travelDate:{type:Date,default:null},
  travellers:{type:Number,default:null},
  duration:{type:String,default:""},
  vehicle:{type:String,default:""},
  status:{type:String,enum:["new","contacted","qualified","converted","closed","spam"],default:"new",index:true},
  priority:{type:String,enum:["low","normal","high","urgent"],default:"normal",index:true},
  notes:{type:[NoteSchema],default:[]},
  lastContactedAt:{type:Date,default:null},
  convertedAt:{type:Date,default:null},
  ipAddress:{type:String,default:""},
  userAgent:{type:String,default:""},
},{timestamps:true});

EnquirySchema.index({requestId:1},{unique:true,sparse:true});
EnquirySchema.index({name:"text",phone:"text",email:"text",subject:"text",message:"text",pickup:"text",destination:"text"});
export const Enquiry=models.Enquiry||model("Enquiry",EnquirySchema);
