import { Schema, model, models } from "mongoose";
const SequenceSchema=new Schema({key:{type:String,required:true,unique:true},value:{type:Number,default:0}},{timestamps:true});
export const Sequence=models.Sequence||model("Sequence",SequenceSchema);
