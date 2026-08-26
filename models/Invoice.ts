import { Schema, model, models } from "mongoose";

const LineItemSchema=new Schema({description:{type:String,required:true,trim:true},quantity:{type:Number,default:1,min:0},rate:{type:Number,default:0,min:0},amount:{type:Number,default:0,min:0}},{_id:false});
const InvoiceSchema=new Schema({
  invoiceNumber:{type:String,required:true,unique:true,index:true},
  issueDate:{type:Date,required:true,default:Date.now,index:true},dueDate:{type:Date,default:null},
  customer:{name:{type:String,required:true,trim:true},phone:{type:String,default:""},email:{type:String,default:""},address:{type:String,default:""},gstin:{type:String,default:""}},
  trip:{serviceType:{type:String,default:""},pickup:{type:String,default:""},destination:{type:String,default:""},travelDate:{type:Date,default:null},vehicle:{type:String,default:""},vehicleNumber:{type:String,default:""},driverName:{type:String,default:""}},
  lineItems:{type:[LineItemSchema],default:[]},subtotal:{type:Number,default:0},discountType:{type:String,enum:["none","fixed","percent"],default:"none"},discountValue:{type:Number,default:0},discountAmount:{type:Number,default:0},taxRate:{type:Number,default:0},taxAmount:{type:Number,default:0},total:{type:Number,default:0},amountPaid:{type:Number,default:0},balanceDue:{type:Number,default:0},
  paymentStatus:{type:String,enum:["unpaid","partial","paid"],default:"unpaid",index:true},paymentMethod:{type:String,enum:["cash","upi","bank_transfer","card","other",""],default:""},
  status:{type:String,enum:["draft","issued","cancelled"],default:"issued",index:true},notes:{type:String,default:""},terms:{type:String,default:""},
  createdBy:{type:Schema.Types.ObjectId,ref:"AdminUser",default:null},updatedBy:{type:Schema.Types.ObjectId,ref:"AdminUser",default:null},
},{timestamps:true});
InvoiceSchema.index({invoiceNumber:"text","customer.name":"text","customer.phone":"text","trip.pickup":"text","trip.destination":"text"});
export const Invoice=models.Invoice||model("Invoice",InvoiceSchema);
