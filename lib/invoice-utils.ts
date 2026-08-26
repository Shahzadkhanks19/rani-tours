import { Sequence } from "@/models/Sequence";

const money=(value:unknown)=>Math.max(0,Math.round((Number(value)||0)*100)/100);
export type TaxiInvoiceInput={totalKm?:unknown;pricePerKm?:unknown;tollIncluded?:unknown;tollAmount?:unknown;parkingIncluded?:unknown;parkingAmount?:unknown;otherCharges?:unknown;taxRate?:unknown;amountPaid?:unknown};
export function calculateInvoice(input:TaxiInvoiceInput){
  const totalKm=money(input.totalKm);const pricePerKm=money(input.pricePerKm);const distanceAmount=money(totalKm*pricePerKm);
  const tollIncluded=Boolean(input.tollIncluded);const parkingIncluded=Boolean(input.parkingIncluded);
  const tollAmount=tollIncluded?0:money(input.tollAmount);const parkingAmount=parkingIncluded?0:money(input.parkingAmount);const otherCharges=money(input.otherCharges);
  const taxableAmount=money(distanceAmount+tollAmount+parkingAmount+otherCharges);
  const taxRate=money(input.taxRate);if(taxRate<=0)throw new Error("Tax rate is mandatory and must be greater than 0.");
  const taxAmount=money(taxableAmount*taxRate/100);const total=money(taxableAmount+taxAmount);const amountPaid=Math.min(total,money(input.amountPaid));const balanceDue=money(total-amountPaid);const paymentStatus=balanceDue<=0?"paid":amountPaid>0?"partial":"unpaid";
  return{totalKm,pricePerKm,distanceAmount,tollIncluded,tollAmount,parkingIncluded,parkingAmount,otherCharges,taxableAmount,taxRate,taxAmount,total,amountPaid,balanceDue,paymentStatus};
}
export async function nextInvoiceNumber(){const year=new Date().getFullYear();const key=`invoice-${year}`;const seq=await Sequence.findOneAndUpdate({key},{$inc:{value:1}},{new:true,upsert:true,setDefaultsOnInsert:true});return `RT-${year}-${String(seq.value).padStart(4,"0")}`;}
