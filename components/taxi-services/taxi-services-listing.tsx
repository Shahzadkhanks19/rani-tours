import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CarFront,
  CheckCircle2,
  Headphones,
  Map as MapIcon,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { siteContact } from "@/lib/site-data";

type Route = { title: string; durationLabel?: string; image?: { url: string; alt?: string } | null };
type Service = {
  _id: string;
  title: string;
  slug: string;
  tagline?: string;
  shortDescription: string;
  heroImage: { url: string; alt?: string };
  serviceType: string;
  popularRoutes?: Route[];
};

const categoryCards = [
  {
    title: "Local Taxi Services",
    icon: CarFront,
    labels: ["Jodhpur Local Taxi", "Jodhpur Sightseeing", "Airport Transfers", "Railway Station Transfers", "Hotel Transfers"],
    href: "/taxi-services/jodhpur-local-taxi",
  },
  {
    title: "Outstation Taxi",
    icon: MapPin,
    labels: ["One Way Taxi", "Round Trip Taxi", "Multi-City Taxi", "Long Distance Taxi"],
    href: "/taxi-services/outstation-taxi",
  },
  {
    title: "Rajasthan Taxi",
    icon: MapIcon,
    labels: ["Jodhpur → Jaisalmer", "Jodhpur → Jaipur", "Jodhpur → Udaipur", "Jodhpur → Mount Abu", "More Routes"],
    href: "/taxi-services/rajasthan-taxi-service",
  },
  {
    title: "All India Taxi",
    icon: MapIcon,
    labels: ["North India", "South India", "East India", "West India", "Custom All India Taxi"],
    href: "/taxi-services/all-india-taxi",
  },
  {
    title: "Corporate Travel",
    icon: BriefcaseBusiness,
    labels: ["Employee Transport", "Business Trips", "Airport Pickup", "Event Transportation"],
    href: "/taxi-services/corporate-travel",
  },
  {
    title: "Special Services",
    icon: Sparkles,
    labels: ["Tempo Traveller", "Luxury Car Rental", "Bus Rental", "Custom Booking"],
    href: "/taxi-services/custom-taxi-booking",
  },
] as const;

const fallbackRoutes: Route[] = [
  { title: "Jodhpur → Jaipur", durationLabel: "Popular Rajasthan route", image: { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85", alt: "Jaipur heritage architecture" } },
  { title: "Jodhpur → Udaipur", durationLabel: "Lake City route", image: { url: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1200&q=85", alt: "Udaipur lakes and palace" } },
  { title: "Jodhpur → Jaisalmer", durationLabel: "Golden City route", image: { url: "https://images.unsplash.com/photo-1600954700722-b9df46a3a0d3?auto=format&fit=crop&w=1200&q=85", alt: "Jaisalmer fort" } },
  { title: "Jodhpur → Mount Abu", durationLabel: "Hill station route", image: { url: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=85", alt: "Mount Abu hills" } },
  { title: "Jodhpur → Delhi", durationLabel: "Interstate route", image: { url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85", alt: "India Gate Delhi" } },
];

export function TaxiServicesListing({ services }: { services: Service[] }) {
  const serviceMap = new globalThis.Map<string, Service>(services.map((service): [string, Service] => [service.slug, service]));
  const outstation = serviceMap.get("outstation-taxi");
  const routes: Route[] = outstation?.popularRoutes?.length ? outstation.popularRoutes.slice(0, 5) : fallbackRoutes;

  return (
    <div className="bg-white text-[#17341f]">
      <section className="relative isolate min-h-[510px] overflow-hidden bg-[#083e26] text-white">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2200&q=88"
          alt="Rajasthan road and heritage landscape"
          fill
          priority
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062f1e]/95 via-[#073f27]/82 to-[#083e26]/55" />
        <div className="relative mx-auto grid max-w-[1180px] gap-9 px-4 py-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-14">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-white/75"><Link href="/">Home</Link><span>›</span><span>Taxi Services</span></div>
            <p className="mt-7 text-xs font-extrabold uppercase tracking-[.2em] text-[#e1bd58]">Reliable Rides. Memorable Journeys.</p>
            <h1 className="mt-3 font-serif text-5xl font-black leading-[.98] sm:text-6xl">Taxi <span className="text-[#8fc93a]">Services</span></h1>
            <p className="mt-4 font-serif text-xl font-bold text-[#e1bd58]">Drive Safe. Travel Comfortably.</p>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/82">From local Jodhpur rides to Rajasthan tours, airport transfers, corporate travel and long-distance journeys across India, Rani Tours provides dependable taxi solutions for every travel need.</p>
            <div className="mt-8 grid max-w-3xl grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
              {[
                [ShieldCheck, "Safe & Reliable Always"],
                [CarFront, "Well Maintained Vehicles"],
                [CheckCircle2, "Experienced Drivers"],
                [Headphones, "24/7 Customer Support"],
              ].map(([Icon, label]) => {
                const I = Icon as typeof ShieldCheck;
                return <div key={String(label)} className="flex items-center gap-2 border-r border-white/15 last:border-r-0"><I className="size-6 shrink-0 text-[#e1bd58]"/><span className="text-xs font-bold leading-4">{String(label)}</span></div>;
              })}
            </div>
          </div>
          <JourneyPanel />
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-14">
        <SectionHeading eyebrow="Our Taxi Services" title="Complete Travel Solutions for Every Journey" subtitle="Choose the service category that matches your travel plan." />
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categoryCards.map((category) => {
            const Icon = category.icon;
            return (
              <article key={category.title} className="group rounded-[18px] border border-[#163c27]/10 bg-white p-5 shadow-[0_8px_28px_rgba(20,58,34,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#eaf2db] text-[#057138]"><Icon className="size-6"/></span>
                  <div className="min-w-0 flex-1"><h2 className="font-serif text-xl font-black">{category.title}</h2><div className="mt-3 space-y-1.5">{category.labels.map((label) => <p key={label} className="flex items-center gap-2 text-xs text-[#5e6d62]"><span className="size-1.5 rounded-full bg-[#7eab31]"/>{label}</p>)}</div></div>
                </div>
                <Link href={category.href} className="mt-5 inline-flex items-center gap-1 text-xs font-black text-[#067438]">Explore <ArrowRight className="size-3.5 transition group-hover:translate-x-1"/></Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#17341f]/8 bg-[#fbfcf8] py-14">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading eyebrow="All Taxi Services" title="Explore Every Taxi Service" subtitle="Browse all taxi services and choose exactly what you need." />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <Link key={service._id} href={`/taxi-services/${service.slug}`} className="group overflow-hidden rounded-[18px] border border-[#17341f]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-44 overflow-hidden">
                  <Image src={service.heroImage.url} alt={service.heroImage.alt || service.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-[#eff6df] px-3 py-1 text-[9px] font-black uppercase tracking-[.08em] text-[#086d38]">{service.serviceType}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-black leading-6">{service.title}</h3>
                  {service.tagline ? <p className="mt-1 text-[11px] font-bold text-[#a07b25]">{service.tagline}</p> : null}
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#68766c]">{service.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-[#08723c]">View Service <ArrowRight className="size-3.5 transition group-hover:translate-x-1"/></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7ef] py-14">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading eyebrow="Popular Routes" title="Popular Routes from Jodhpur" subtitle="Reliable taxi service to favourite destinations across Rajasthan and India." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {routes.map((route: Route, index: number) => <article key={`${route.title}-${index}`} className="group overflow-hidden rounded-[18px] bg-white shadow-sm"><div className="relative h-36 overflow-hidden">{route.image?.url ? <Image src={route.image.url} alt={route.image.alt || route.title} fill className="object-cover transition duration-500 group-hover:scale-105"/> : null}<div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"/></div><div className="p-4"><h3 className="font-serif text-base font-black">{route.title}</h3>{route.durationLabel ? <p className="mt-1 text-[11px] text-[#718074]">{route.durationLabel}</p> : null}</div></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-12">
        <SectionHeading eyebrow="Why Choose Rani Tours?" title="Travel With Confidence" />
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {["Experienced Drivers","Well Maintained Vehicles","On-Time Service","Safe & Secure Journeys","24/7 Customer Support","Comfortable Travel"].map((item, index) => <div key={item} className="rounded-2xl bg-[#f3f6ec] px-3 py-5 text-center"><span className="mx-auto grid size-10 place-items-center rounded-full bg-white text-[#08723c]">{index === 4 ? <Headphones className="size-5"/> : index === 1 ? <CarFront className="size-5"/> : <ShieldCheck className="size-5"/>}</span><p className="mt-3 text-xs font-black leading-4">{item}</p></div>)}
        </div>
      </section>

      <section className="bg-[#eff4e5]">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-5 px-4 py-7 md:flex-row md:items-center">
          <div className="flex items-center gap-4"><span className="grid size-12 place-items-center rounded-full bg-[#075d32] text-white"><Phone className="size-5"/></span><div><h2 className="font-serif text-xl font-black">Need a Taxi for Local or Outstation?</h2><p className="mt-1 text-xs text-[#68756c]">Send your travel details and our team will help plan a comfortable journey.</p></div></div>
          <div className="flex flex-wrap gap-3"><a href={siteContact.phones[0].href} className="inline-flex items-center gap-2 rounded-xl border border-[#0b6b3a]/20 bg-white px-4 py-2.5 text-xs font-black"><Phone className="size-4"/>{siteContact.phones[0].display}</a><a href={siteContact.whatsapp} className="rounded-xl bg-[#08723c] px-5 py-2.5 text-xs font-black text-white">WhatsApp Us</a></div>
        </div>
      </section>
    </div>
  );
}

function JourneyPanel() {
  const field = "h-10 w-full rounded-lg border border-[#17341f]/10 bg-[#fafbf8] px-3 text-xs outline-none transition focus:border-[#0a713b] focus:ring-2 focus:ring-[#0a713b]/10";
  return <aside className="rounded-[22px] bg-white p-5 text-[#17341f] shadow-2xl"><div className="text-center"><h2 className="font-serif text-xl font-black text-[#08713b]">Plan Your Journey</h2><div className="mx-auto mt-2 h-px w-20 bg-[#d8b752]"/></div><form action="/get-quote" method="get" className="mt-5 grid gap-3"><label className="text-[10px] font-bold">Pickup Location<input name="pickup" className={`${field} mt-1`} placeholder="Enter pickup location"/></label><label className="text-[10px] font-bold">Destination<input name="destination" className={`${field} mt-1`} placeholder="Enter destination"/></label><div className="grid grid-cols-2 gap-3"><label className="text-[10px] font-bold">Travel Date<input name="date" className={`${field} mt-1`} placeholder="Select date"/></label><label className="text-[10px] font-bold">Travellers<input name="travellers" className={`${field} mt-1`} placeholder="1 Traveller"/></label></div><label className="text-[10px] font-bold">Vehicle Type<input name="vehicle" className={`${field} mt-1`} placeholder="Select vehicle type"/></label><button className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#08723c] text-xs font-black text-white">Get Quote / Enquiry Now <ArrowRight className="size-4"/></button></form><div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-bold text-[#526258]"><a href={siteContact.whatsapp}>WhatsApp Us</a><span className="h-3 w-px bg-black/15"/><a href={siteContact.phones[0].href}>{siteContact.phones[0].display}</a></div></aside>;
}

function SectionHeading({eyebrow,title,subtitle}:{eyebrow:string;title:string;subtitle?:string}) {
  return <div className="text-center"><p className="text-[11px] font-black uppercase tracking-[.18em] text-[#08723c]">{eyebrow}</p><h2 className="mt-2 font-serif text-3xl font-black sm:text-[34px]">{title}</h2>{subtitle ? <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-[#6f7d72]">{subtitle}</p> : null}<div className="mx-auto mt-3 h-px w-16 bg-[#d8b752]"/></div>;
}
