import { Schema,model,models } from "mongoose";
const PageViewSchema=new Schema({path:{type:String,required:true,index:true},referrer:{type:String,default:""},sessionId:{type:String,required:true,index:true},device:{type:String,enum:["mobile","tablet","desktop"],default:"desktop",index:true},createdAt:{type:Date,default:Date.now,index:true}},{versionKey:false});
PageViewSchema.index({createdAt:1},{expireAfterSeconds:60*60*24*365});
export const PageView=models.PageView||model("PageView",PageViewSchema);
