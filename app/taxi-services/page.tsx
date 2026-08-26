import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { TaxiServicesListing } from "@/components/taxi-services/taxi-services-listing";
import { connectToDatabase } from "@/lib/db";
import { TaxiService } from "@/models/TaxiService";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Taxi Services in Jodhpur | Rani Tour's",description:"Explore local, outstation, one-way, round-trip, airport, railway, hotel, corporate, wedding, luxury, tempo traveller and bus taxi services from Jodhpur."};
export default async function TaxiServicesPage(){await connectToDatabase();const services=await TaxiService.find({status:"published"}).sort({sortOrder:1,title:1}).select({title:1,slug:1,tagline:1,shortDescription:1,heroImage:1,startingPrice:1,priceUnit:1,serviceType:1,featured:1}).lean();return <><Header/><main><TaxiServicesListing services={JSON.parse(JSON.stringify(services))}/></main><Footer/><FloatingActions/></>}
