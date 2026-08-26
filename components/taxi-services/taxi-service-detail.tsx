import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  Headphones,
  Luggage,
  MapPin,
  Phone,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { siteContact } from "@/lib/site-data";

type Img = { url: string; alt?: string };
type Feature = { title: string; description?: string };
type Card = { title: string; description?: string; image?: Img | null };
type Route = { title: string; from?: string; to?: string; durationLabel?: string; image?: Img | null };
type Service = {
  title: string;
  slug: string;
  serviceType: string;
  pageTemplate?: string;
  tagline?: string;
  shortDescription: string;
  overview?: string;
  heroImage: Img;
  bookingForm?: {
    title?: string;
    showReturnDate?: boolean;
    showTime?: boolean;
    showTransferType?: boolean;
    showFlightNumber?: boolean;
    showVehicleType?: boolean;
    showPassengers?: boolean;
  };
  heroFeatures?: Feature[];
  whyChooseFeatures?: Feature[];
  serviceCards?: Card[];
  popularRoutes?: Route[];
  useCases?: Card[];
};
type Fleet = {
  _id: string;
  name: string;
  modelLabel?: string;
  image?: Img;
  seatCount?: number;
  seatingLabel?: string;
  luggageCount?: number;
  luggageLabel?: string;
  category?: string;
  ac?: boolean;
};

const sectionCopy: Record<string, { whyEyebrow: string; whyTitle: string; contentEyebrow: string; contentTitle: string; useEyebrow: string; useTitle: string; ctaTitle: string; ctaText: string }> = {
  "jodhpur-local-taxi": { whyEyebrow: "Why Choose Rani Tours Local Taxi?", whyTitle: "Best Local Taxi Service in Jodhpur", contentEyebrow: "Popular Local Places in Jodhpur", contentTitle: "Explore Jodhpur With Us", useEyebrow: "Perfect for Local Travel", useTitle: "Comfortable Rides for Every Need", ctaTitle: "Need a Local Taxi in Jodhpur?", ctaText: "Tell us your pickup and travel plan and we will arrange a comfortable local ride." },
  "outstation-taxi": { whyEyebrow: "Why Choose Outstation Taxi With Rani Tours?", whyTitle: "Your Journey, Our Responsibility", contentEyebrow: "Top Outstation Routes", contentTitle: "Travel from Jodhpur to Popular Destinations", useEyebrow: "Choose Your Journey", useTitle: "One Way, Round Trip or Multi-City", ctaTitle: "Ready for an Outstation Trip?", ctaText: "Share your route and travel date for a smooth outstation journey." },
  "one-way-taxi": { whyEyebrow: "Why Choose Our One Way Taxi?", whyTitle: "Simple, Comfortable One Way Travel", contentEyebrow: "Popular One Way Routes", contentTitle: "Travel Directly to Your Destination", useEyebrow: "Perfect for One Way Travel", useTitle: "Travel Smart Without a Return Plan", ctaTitle: "Book Your One Way Taxi Today!", ctaText: "Travel directly and comfortably with a professional driver." },
  "round-trip-taxi": { whyEyebrow: "Why Choose Rani Tours for Round Trips?", whyTitle: "Travel Out and Return With Ease", contentEyebrow: "Popular Round Trip Routes", contentTitle: "Plan a Comfortable Return Journey", useEyebrow: "Perfect for Every Round Trip", useTitle: "Travel for Any Occasion", ctaTitle: "Plan Your Round Trip Today!", ctaText: "Keep one vehicle for your complete journey and travel on your schedule." },
  "multi-city-taxi": { whyEyebrow: "Why Choose Rani Tours for Multi City Travel?", whyTitle: "Comfort, Convenience & Complete Flexibility", contentEyebrow: "Popular Multi City Routes", contentTitle: "Explore Popular Multi City Routes", useEyebrow: "Perfect for Every Journey", useTitle: "Ideal for Every Type of Traveller", ctaTitle: "Plan Your Multi City Journey Today!", ctaText: "Tell us the cities you want to cover and we will help organize the route." },
  "airport-transfers": { whyEyebrow: "Why Choose Rani Tours for Airport Transfers?", whyTitle: "Smooth Airport Pickup & Drop", contentEyebrow: "Airport Transfer Services", contentTitle: "Reliable Transfers for Every Flight", useEyebrow: "Perfect for Every Occasion", useTitle: "Ideal for All Your Airport Transfer Needs", ctaTitle: "Book Your Airport Taxi Today!", ctaText: "On-time pickup coordination and a comfortable ride to or from the airport." },
  "railway-station-transfers": { whyEyebrow: "Why Choose Rani Tours for Railway Transfers?", whyTitle: "Safe, Reliable & Comfortable", contentEyebrow: "Our Railway Transfer Services", contentTitle: "Popular Pickup & Drop Services", useEyebrow: "Travel With Ease", useTitle: "Station Transfers for Every Traveller", ctaTitle: "Need a Railway Station Transfer?", ctaText: "Share your train timing and destination and our team will coordinate your ride." },
  "hotel-transfers": { whyEyebrow: "Why Choose Rani Tours for Hotel Transfers?", whyTitle: "Your Comfort, Our Priority", contentEyebrow: "Popular Hotels in Jodhpur", contentTitle: "Pickup & Drop to Major Hotels", useEyebrow: "Hotel Travel Made Easy", useTitle: "Door-to-Door Transfers for Every Stay", ctaTitle: "Need Hotel Pickup or Drop in Jodhpur?", ctaText: "Book a comfortable transfer between your hotel, airport, station or destination." },
  "corporate-travel": { whyEyebrow: "Why Choose Rani Tours for Corporate Travel?", whyTitle: "Your Business, Our Responsibility", contentEyebrow: "Corporate Travel Services", contentTitle: "Professional Transport for Every Business Need", useEyebrow: "Built for Business", useTitle: "Reliable Corporate Mobility", ctaTitle: "Need Corporate Transportation?", ctaText: "Plan professional travel for your team, clients, meetings or events." },
  "wedding-transportation": { whyEyebrow: "Why Choose Rani Tours for Weddings?", whyTitle: "Elegant Travel for Your Special Day", contentEyebrow: "Wedding Transport Services", contentTitle: "Complete Transportation for Your Celebration", useEyebrow: "Perfect for Every Wedding Event", useTitle: "From Family Travel to Guest Movement", ctaTitle: "Planning Your Wedding?", ctaText: "Let us coordinate comfortable transport for you, your family and your guests." },
  "tempo-traveller-rental": { whyEyebrow: "Why Choose a Tempo Traveller?", whyTitle: "Comfortable Group Travel Made Easy", contentEyebrow: "Tempo Traveller Options", contentTitle: "Choose the Right Space for Your Group", useEyebrow: "Popular Uses", useTitle: "Best for Every Occasion", ctaTitle: "Travel Together, Enjoy Together!", ctaText: "Plan a comfortable group journey with family, friends or colleagues." },
  "luxury-car-rental": { whyEyebrow: "Why Choose Rani Tours for Luxury Rides?", whyTitle: "Luxury Beyond Your Expectations", contentEyebrow: "Premium Travel Services", contentTitle: "Arrive in Comfort and Style", useEyebrow: "Perfect for Every Special Occasion", useTitle: "Make Every Journey Extraordinary", ctaTitle: "Experience Premium Travel", ctaText: "Choose a chauffeur-driven vehicle for your special journey." },
  "bus-rental": { whyEyebrow: "Why Choose Rani Tours Bus Rental?", whyTitle: "Reliable Travel for Large Groups", contentEyebrow: "Bus Rental Options", contentTitle: "Group Transport for Every Requirement", useEyebrow: "Popular Uses", useTitle: "Travel Together for Every Occasion", ctaTitle: "Planning a Group Trip?", ctaText: "Tell us your group size and route and we will help arrange a suitable vehicle." },
};

const defaultCopy = { whyEyebrow: "Why Choose Rani Tours?", whyTitle: "Comfortable, Reliable Travel", contentEyebrow: "Travel Options", contentTitle: "Built Around Your Journey", useEyebrow: "Perfect for Every Journey", useTitle: "Travel for Every Occasion", ctaTitle: "Plan Your Journey Today!", ctaText: "Share your travel plan and our team will help arrange the right ride." };

export function TaxiServiceDetail({ service, fleet }: { service: Service; fleet: Fleet[] }) {
  const copy = sectionCopy[service.slug] || defaultCopy;
  const hasRoutes = Boolean(service.popularRoutes?.length);
  return (
    <div className="bg-white text-[#17341f]">
      <Hero service={service} />

      <section className="bg-[#f6f8f1] py-14">
        <div className="mx-auto max-w-[1180px] px-4">
          <Heading eyebrow={copy.whyEyebrow} title={copy.whyTitle} />
          <div className="mt-9 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {(service.whyChooseFeatures || []).slice(0, 6).map((feature, index) => <FeatureCard key={`${feature.title}-${index}`} feature={feature} index={index}/>) }
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-14">
        <Heading eyebrow={copy.contentEyebrow} title={copy.contentTitle} />
        {hasRoutes ? <RouteGrid routes={service.popularRoutes || []}/> : <ImageCardGrid cards={service.serviceCards || []}/>} 
      </section>

      {hasRoutes && service.serviceCards?.length ? <section className="bg-[#f6f8f1] py-14"><div className="mx-auto max-w-[1180px] px-4"><Heading eyebrow="Our Service Options" title="Choose the Journey That Fits Your Plan"/><ImageCardGrid cards={service.serviceCards}/></div></section> : null}

      {fleet.length ? <FleetStrip fleet={fleet}/> : null}

      {service.useCases?.length ? <section className="mx-auto max-w-[1180px] px-4 py-14"><Heading eyebrow={copy.useEyebrow} title={copy.useTitle}/><ImageCardGrid cards={service.useCases}/></section> : null}

      <Cta title={copy.ctaTitle} text={copy.ctaText}/>
    </div>
  );
}

function Hero({service}:{service:Service}) {
  return <section className="relative isolate min-h-[500px] overflow-hidden bg-[#073d25] text-white"><Image src={service.heroImage.url} alt={service.heroImage.alt || service.title} fill priority className="object-cover object-center opacity-50"/><div className="absolute inset-0 bg-gradient-to-r from-[#042b1a]/96 via-[#063c25]/80 to-[#073d25]/50"/><div className="relative mx-auto grid max-w-[1180px] gap-9 px-4 py-11 lg:grid-cols-[1.15fr_.85fr] lg:items-center"><div><div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-white/72"><Link href="/">Home</Link><span>›</span><Link href="/taxi-services">Taxi Services</Link><span>›</span><span>{service.title}</span></div><p className="mt-7 text-[11px] font-black uppercase tracking-[.2em] text-[#e1bd58]">{service.serviceType}</p><h1 className="mt-2 max-w-2xl font-serif text-4xl font-black leading-[1.02] sm:text-5xl lg:text-[58px]">{service.title}</h1>{service.tagline ? <p className="mt-3 font-serif text-xl font-bold text-[#e1bd58]">{service.tagline}</p> : null}<p className="mt-4 max-w-[650px] text-sm leading-7 text-white/83">{service.shortDescription}</p><div className="mt-8 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">{(service.heroFeatures || []).slice(0,4).map((feature,index)=><div key={`${feature.title}-${index}`} className="flex items-center gap-2 border-r border-white/15 last:border-r-0"><HeroIcon index={index}/><p className="text-[11px] font-bold leading-4">{feature.title}</p></div>)}</div></div><EnquiryPanel service={service}/></div></section>;
}

function EnquiryPanel({service}:{service:Service}) {
  const field = "h-10 w-full rounded-lg border border-[#17341f]/10 bg-[#fbfcfa] px-3 text-xs outline-none transition placeholder:text-[#99a29a] focus:border-[#08713b] focus:ring-2 focus:ring-[#08713b]/10";
  const isAirport = service.pageTemplate === "airport";
  const isRoundTrip = service.pageTemplate === "round_trip";
  return <aside className="rounded-[22px] bg-white p-5 text-[#17341f] shadow-2xl"><div className="text-center"><h2 className="font-serif text-xl font-black text-[#08713b]">{service.bookingForm?.title || "Plan Your Ride"}</h2><div className="mx-auto mt-2 h-px w-20 bg-[#d8b752]"/></div><form action="/get-quote" method="get" className="mt-5 grid gap-3"><label className="text-[10px] font-bold">{isAirport ? "Pick-up / Airport" : "Pick-up Location"}<input name="pickup" className={`${field} mt-1`} placeholder={isAirport ? "Enter airport or pickup location" : "Enter pick-up location"}/></label><label className="text-[10px] font-bold">Destination<input name="destination" className={`${field} mt-1`} placeholder="Enter destination"/></label>{isAirport ? <label className="text-[10px] font-bold">Transfer Type<input name="journeyType" className={`${field} mt-1`} placeholder="Airport pickup or drop"/></label> : null}<div className="grid grid-cols-2 gap-3"><label className="text-[10px] font-bold">Journey Date<input name="date" className={`${field} mt-1`} placeholder="Select date"/></label>{isRoundTrip ? <label className="text-[10px] font-bold">Return Date<input name="returnDate" className={`${field} mt-1`} placeholder="Select return date"/></label> : service.bookingForm?.showTime ? <label className="text-[10px] font-bold">Time<input name="time" className={`${field} mt-1`} placeholder="Select time"/></label> : <label className="text-[10px] font-bold">Travellers<input name="travellers" className={`${field} mt-1`} placeholder="1 Traveller"/></label>}</div>{service.bookingForm?.showPassengers && (isRoundTrip || service.bookingForm?.showTime) ? <label className="text-[10px] font-bold">Travellers<input name="travellers" className={`${field} mt-1`} placeholder="1 Traveller"/></label> : null}{isAirport && service.bookingForm?.showFlightNumber ? <label className="text-[10px] font-bold">Flight Number<input name="flight" className={`${field} mt-1`} placeholder="Optional flight number"/></label> : null}{service.bookingForm?.showVehicleType !== false ? <label className="text-[10px] font-bold">Vehicle Type<input name="vehicle" className={`${field} mt-1`} placeholder="Select vehicle type"/></label> : null}<button className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#08723c] text-xs font-black text-white">Get Quote / Enquiry Now <ArrowRight className="size-4"/></button></form><div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-bold text-[#53625a]"><a href={siteContact.whatsapp}>WhatsApp Us</a><span className="h-3 w-px bg-black/15"/><a href={siteContact.phones[0].href}>{siteContact.phones[0].display}</a></div></aside>;
}

function FeatureCard({feature,index}:{feature:Feature;index:number}) {
  const icons = [MapPin,ShieldCheck,CarFront,Clock3,Headphones,CheckCircle2]; const Icon = icons[index % icons.length];
  return <article className="rounded-2xl border border-[#143124]/8 bg-white p-4 text-center shadow-sm"><span className="mx-auto grid size-11 place-items-center rounded-full bg-[#eef4e2] text-[#08723c]"><Icon className="size-5"/></span><h3 className="mt-3 text-sm font-black leading-5">{feature.title}</h3>{feature.description ? <p className="mt-2 text-[11px] leading-5 text-[#6c786f]">{feature.description}</p> : null}</article>;
}

function RouteGrid({routes}:{routes:Route[]}) {
  return <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{routes.slice(0,5).map((route,index)=><article key={`${route.title}-${index}`} className="group overflow-hidden rounded-[18px] border border-[#143124]/10 bg-white shadow-sm"><div className="relative h-36 overflow-hidden">{route.image?.url ? <Image src={route.image.url} alt={route.image.alt || route.title} fill className="object-cover transition duration-500 group-hover:scale-105"/> : null}<div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"/></div><div className="p-4"><h3 className="font-serif text-base font-black">{route.title}</h3>{route.durationLabel ? <p className="mt-1 text-[11px] text-[#718074]">{route.durationLabel}</p> : null}</div></article>)}</div>;
}

function ImageCardGrid({cards}:{cards:Card[]}) {
  return <div className="mt-9 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">{cards.slice(0,6).map((card,index)=><article key={`${card.title}-${index}`} className="group overflow-hidden rounded-[18px] border border-[#143124]/10 bg-white shadow-sm">{card.image?.url ? <div className="relative h-36 overflow-hidden"><Image src={card.image.url} alt={card.image.alt || card.title} fill className="object-cover transition duration-500 group-hover:scale-105"/></div> : <div className="grid h-28 place-items-center bg-[#eef4e2] text-[#08723c]"><RouteIcon className="size-8"/></div>}<div className="p-4"><h3 className="font-serif text-base font-black">{card.title}</h3>{card.description ? <p className="mt-1.5 text-[11px] leading-5 text-[#6d796f]">{card.description}</p> : null}</div></article>)}</div>;
}

function FleetStrip({fleet}:{fleet:Fleet[]}) {
  return <section className="bg-[#f6f8f1] py-14"><div className="mx-auto max-w-[1180px] px-4"><Heading eyebrow="Choose the Right Vehicle for Your Journey" title="Comfortable Vehicles for Every Group Size"/><div className="mt-9 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">{fleet.slice(0,6).map(vehicle=><article key={vehicle._id} className="overflow-hidden rounded-2xl border border-[#143124]/10 bg-white shadow-sm"><div className="relative h-32 bg-white">{vehicle.image?.url ? <Image src={vehicle.image.url} alt={vehicle.image.alt || vehicle.name} fill className="object-contain p-3"/> : <div className="grid h-full place-items-center"><CarFront className="size-10 text-[#0b6b3a]"/></div>}</div><div className="border-t border-[#143124]/8 p-3"><h3 className="text-xs font-black">{vehicle.name}</h3>{vehicle.modelLabel ? <p className="mt-0.5 text-[10px] text-[#7a877c]">{vehicle.modelLabel}</p> : null}<div className="mt-2 flex flex-wrap gap-2 text-[9px] font-bold text-[#647167]">{vehicle.seatCount ? <span className="inline-flex items-center gap-1"><UsersRound className="size-3"/>{vehicle.seatingLabel || `${vehicle.seatCount} Seats`}</span> : null}{vehicle.luggageCount ? <span className="inline-flex items-center gap-1"><Luggage className="size-3"/>{vehicle.luggageLabel || `${vehicle.luggageCount} Bags`}</span> : null}{vehicle.ac ? <span>AC</span> : null}</div></div></article>)}</div></div></section>;
}

function Cta({title,text}:{title:string;text:string}) {
  return <section className="bg-[#eff4e5]"><div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-5 px-4 py-7 md:flex-row md:items-center"><div className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#075d32] text-white"><Phone className="size-5"/></span><div><h2 className="font-serif text-xl font-black">{title}</h2><p className="mt-1 max-w-xl text-xs leading-5 text-[#68756c]">{text}</p></div></div><div className="flex flex-wrap gap-3"><a href={siteContact.phones[0].href} className="inline-flex items-center gap-2 rounded-xl border border-[#0b6b3a]/20 bg-white px-4 py-2.5 text-xs font-black"><Phone className="size-4"/>{siteContact.phones[0].display}</a><a href={siteContact.whatsapp} className="rounded-xl bg-[#08723c] px-5 py-2.5 text-xs font-black text-white">WhatsApp Us</a></div></div></section>;
}

function Heading({eyebrow,title}:{eyebrow:string;title:string}) { return <div className="text-center"><p className="text-[11px] font-black uppercase tracking-[.17em] text-[#08723c]">{eyebrow}</p><h2 className="mx-auto mt-2 max-w-3xl font-serif text-3xl font-black sm:text-[34px]">{title}</h2><div className="mx-auto mt-3 h-px w-16 bg-[#d8b752]"/></div>; }
function HeroIcon({index}:{index:number}) { const icons=[RouteIcon,ShieldCheck,CarFront,Headphones]; const Icon=icons[index%icons.length]; return <Icon className="size-6 shrink-0 text-[#e1bd58]"/>; }
