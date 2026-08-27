export const indianPhonePattern=/^[6-9]\d{9}$/;
export const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const vehicleNumberPattern=/^[A-Z]{2}[ -]?\d{1,2}[ -]?[A-Z]{0,3}[ -]?\d{1,4}$/i;

export const normalizePhone=(value:unknown)=>String(value??"").replace(/\D/g,"").slice(-10);
export const cleanText=(value:unknown,max=1000)=>String(value??"").trim().replace(/\s+/g," ").slice(0,max);
export const cleanMultiline=(value:unknown,max=4000)=>String(value??"").trim().replace(/\r\n/g,"\n").slice(0,max);
export const isValidEmail=(value:string)=>emailPattern.test(value.trim().toLowerCase());
export const isValidIndianPhone=(value:string)=>indianPhonePattern.test(normalizePhone(value));
export const isValidFutureOrTodayDate=(value:string)=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const date=new Date(`${value}T00:00:00`);if(Number.isNaN(date.getTime()))return false;const now=new Date();const today=new Date(now.getFullYear(),now.getMonth(),now.getDate());return date>=today};

export type ValidationErrors=Record<string,string>;
export function validateContactInput(input:{name:unknown;phone:unknown;email:unknown;subject:unknown;message:unknown}){
 const name=cleanText(input.name,100),phone=normalizePhone(input.phone),email=cleanText(input.email,160).toLowerCase(),subject=cleanText(input.subject,160),message=cleanMultiline(input.message,4000);const errors:ValidationErrors={};
 if(name.length<2)errors.name="Please enter at least 2 characters for your name.";else if(name.length>100)errors.name="Name is too long.";
 if(!indianPhonePattern.test(phone))errors.phone="Enter a valid 10-digit Indian mobile number.";
 if(!email)errors.email="Email is required.";else if(!emailPattern.test(email))errors.email="Enter a valid email address.";
 if(subject.length<2)errors.subject="Please enter a subject.";
 if(message.length<10)errors.message="Please enter at least 10 characters in your message.";
 return{valid:Object.keys(errors).length===0,errors,data:{name,phone,email,subject,message}};
}
export function validateQuoteInput(input:{name:unknown;phone:unknown;email?:unknown;journeyType:unknown;pickup:unknown;destination:unknown;travelDate:unknown;travellers?:unknown;duration?:unknown;vehicle?:unknown;message?:unknown}){
 const name=cleanText(input.name,100),phone=normalizePhone(input.phone),email=cleanText(input.email,160).toLowerCase(),journeyType=cleanText(input.journeyType,120),pickup=cleanText(input.pickup,160),destination=cleanText(input.destination,160),travelDate=cleanText(input.travelDate,30),duration=cleanText(input.duration,100),vehicle=cleanText(input.vehicle,160),message=cleanMultiline(input.message,4000),travellers=Math.max(1,Math.min(100,Math.trunc(Number(input.travellers)||1)));const errors:ValidationErrors={};
 if(name.length<2)errors.name="Please enter your full name.";
 if(!indianPhonePattern.test(phone))errors.phone="Enter a valid 10-digit Indian mobile number.";
 if(email&&!emailPattern.test(email))errors.email="Enter a valid email address.";
 if(!journeyType)errors.journeyType="Please choose a journey type.";
 if(pickup.length<2)errors.pickup="Please enter a valid pickup location.";
 if(destination.length<2)errors.destination="Please enter a valid destination.";
 if(pickup&&destination&&pickup.toLowerCase()===destination.toLowerCase())errors.destination="Destination must be different from pickup location.";
 if(!travelDate)errors.travelDate="Please choose a travel date.";else if(!isValidFutureOrTodayDate(travelDate))errors.travelDate="Travel date cannot be in the past.";
 return{valid:Object.keys(errors).length===0,errors,data:{name,phone,email,journeyType,pickup,destination,travelDate,travellers,duration,vehicle,message}};
}
