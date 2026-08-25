"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  AirVent,
  BadgeIndianRupee,
  BriefcaseBusiness,
  BusFront,
  Car,
  Clock3,
  Headphones,
  MapPinned,
  Phone,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { siteContact } from "@/lib/site-data";

const heroImage = "https://images.unsplash.com/photo-1569096610945-1a094be04c74?auto=format&fit=crop&q=86&w=2200";

const fleet = [
  {
    badge: "1 - 4 Seater",
    name: "Toyota Etios",
    model: "Toyota Etios / Similar",
    seats: "4 Seats",
    bags: "3 Bags",
    description: "Comfortable sedan for local sightseeing, airport transfers and outstation travel.",
    bestFor: "Best for Couples & Small Families",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Toyota_Etios_1.5_XS_Sedan_2015.jpg",
  },
  {
    badge: "1 - 4 Seater",
    name: "Swift Dzire",
    model: "Maruti Suzuki Dzire / Similar",
    seats: "4 Seats",
    bags: "3 Bags",
    description: "Efficient and comfortable sedan suited for city travel and long-distance taxi journeys.",
    bestFor: "Best for Everyday Travel",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2026%20Suzuki%20Dzire%20GL%20in%20Arctic%20White%20Pearl%2002.jpg",
  },
  {
    badge: "1 - 7 Seater",
    name: "Innova Crysta",
    model: "Toyota Innova Crysta / Similar",
    seats: "7 Seats",
    bags: "5 Bags",
    description: "Premium family MPV with spacious seating and excellent comfort for Rajasthan and all-India journeys.",
    bestFor: "Best for Families",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Toyota%20Innova%20GUN143%20FL%202.8%20V%20White%20Pearl%20Crystal%20Shine%2001.jpg",
  },
  {
    badge: "1 - 7 Seater",
    name: "Toyota Fortuner",
    model: "Toyota Fortuner / Similar",
    seats: "7 Seats",
    bags: "5 Bags",
    description: "Premium SUV for travellers who prefer extra road presence, comfort and space on long journeys.",
    bestFor: "Best for Premium Family Travel",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Toyota_Fortuner_KUN51_FL2_3.0_V_4x4_Freedom_White_01.jpg",
  },
  {
    badge: "1 - 4 Seater",
    name: "Toyota Corolla",
    model: "Toyota Corolla / Similar",
    seats: "4 Seats",
    bags: "3 Bags",
    description: "Comfort-oriented executive sedan for business travel, airport transfers and premium outstation rides.",
    bestFor: "Best for Executive Travel",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8_White.jpg",
  },
  {
    badge: "12 Seater",
    name: "Force Tempo Traveller 12",
    model: "Force Traveller / Similar",
    seats: "12 Seats",
    bags: "6+ Bags",
    description: "Comfortable group traveller for families, friend groups, sightseeing circuits and destination tours.",
    bestFor: "Best for Medium Groups",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/ForceTravellerside.JPG",
  },
  {
    badge: "14 Seater",
    name: "Force Tempo Traveller 14",
    model: "Force Traveller / Similar",
    seats: "14 Seats",
    bags: "7+ Bags",
    description: "Spacious traveller configuration for group tours, family functions and longer Rajasthan routes.",
    bestFor: "Best for Group Tours",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/ForceTravellerside.JPG",
  },
  {
    badge: "17 Seater",
    name: "Force Tempo Traveller 17",
    model: "Force Traveller / Similar",
    seats: "17 Seats",
    bags: "8+ Bags",
    description: "High-capacity traveller for medium-large groups with dependable comfort for longer trips.",
    bestFor: "Best for Large Families",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/ForceTravellerside.JPG",
  },
  {
    badge: "21 Seater",
    name: "Force Tempo Traveller 21",
    model: "Force Traveller / Similar",
    seats: "21 Seats",
    bags: "10+ Bags",
    description: "Large traveller option for group tours, events, weddings and multi-city journeys.",
    bestFor: "Best for Large Groups",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/ForceTravellerside.JPG",
  },
  {
    badge: "24 Seater",
    name: "Tourist Bus 24",
    model: "Premium Tourist Bus / Similar",
    seats: "24 Seats",
    bags: "15+ Bags",
    description: "Comfortable tourist bus for corporate travel, school groups, weddings and organised tours.",
    bestFor: "Best for Tour Groups",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moscow%20-%202025%20-%20White%20tour%20bus.jpg",
  },
  {
    badge: "32 Seater",
    name: "Tourist Bus 32",
    model: "Premium Tourist Coach / Similar",
    seats: "32 Seats",
    bags: "20+ Bags",
    description: "Full-size tourist coach for large groups, corporate movement and long-distance group travel.",
    bestFor: "Best for Large Tour Groups",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moscow%20-%202025%20-%20White%20tour%20bus.jpg",
  },
] as const;

const highlights = [
  [ShieldCheck, "Well Maintained", "Regularly serviced vehicles for a smooth journey"],
  [UsersRound, "Experienced Drivers", "Polite, professional and well-trained chauffeurs"],
  [ShieldCheck, "Safe & Secure", "Your safety is our top priority always"],
  [Headphones, "24/7 Assistance", "We are always here to assist you on your trip"],
] as const;

const reasons = [
  [Sparkles, "Clean & Hygienic Vehicles"],
  [Clock3, "On-time Pick & Drop"],
  [BadgeIndianRupee, "Transparent Quotations"],
  [BriefcaseBusiness, "No Hidden Charges"],
  [Car, "Customizable Solutions"],
  [MapPinned, "PAN India Service"],
] as const;

export function FleetPageContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#f7f7f4]">
        <Image src={heroImage} alt="Mehrangarh Fort in Jodhpur" fill priority sizes="100vw" className="object-cover object-center opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.98)_0%,rgba(255,255,255,.9)_38%,rgba(255,255,255,.18)_100%)]" />
        <div className="relative mx-auto min-h-[390px] max-w-[1180px] px-4 py-10 sm:py-12">
          <div className="max-w-[560px]">
            <div className="flex items-center gap-2 text-xs text-[#4e5b4f]"><Link href="/" className="hover:text-[#087239]">Home</Link><span>›</span><span>Fleet</span></div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mt-6 font-serif text-5xl font-bold text-[#17341f] sm:text-6xl">Our Fleet</motion.h1>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#d98200]">Comfort. Safety. Reliability.</h2>
            <div className="mt-4 flex items-center gap-3 text-[#d69a28]"><span className="h-px w-8 bg-current" /><span>✤</span><span className="h-px w-8 bg-current" /></div>
            <p className="mt-5 max-w-[500px] text-sm leading-7 text-[#313b31]">From sedans and premium SUVs to multiple Force Traveller configurations and tourist buses, choose the right vehicle for your group size and journey.</p>
          </div>
          <div className="pointer-events-none absolute bottom-2 right-4 hidden h-[245px] w-[58%] lg:block">
            <Image src={fleet[2].image} alt="White Toyota Innova Crysta" fill unoptimized sizes="560px" className="object-contain object-bottom drop-shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="bg-white py-4">
        <div className="mx-auto grid max-w-[1180px] gap-4 rounded-2xl bg-[#fff8ee] px-5 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(([Icon, title, text]) => <div key={title} className="flex gap-3 border-[#e8ddcf] lg:border-r lg:pr-4 lg:last:border-r-0"><Icon className="h-9 w-9 shrink-0 text-[#0a6330]" /><div><h3 className="text-sm font-bold text-[#1c2e20]">{title}</h3><p className="mt-1 text-[10px] leading-4 text-[#626962]">{text}</p></div></div>)}
        </div>
      </section>

      <section className="bg-white py-9 sm:py-12">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading title="Our Vehicle Options" />
          <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-5 text-[#687068]">Vehicle model and exact seating configuration may vary by availability. Tell us your route and group size and we&apos;ll recommend the right option.</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {fleet.map((vehicle, index) => (
              <motion.article key={vehicle.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.035 }} whileHover={{ y: -4 }} className="overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white shadow-[0_10px_28px_rgba(45,38,28,.07)]">
                <div className="relative h-52 bg-[#f5f5f3]">
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[#0c592d] px-3 py-1 text-[10px] font-bold text-white">{vehicle.badge}</span>
                  <Image src={vehicle.image} alt={vehicle.model} fill unoptimized sizes="(max-width:768px) 100vw, 390px" className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-[#1d3021]">{vehicle.name}</h3>
                  <p className="mt-1 text-xs text-[#687068]">{vehicle.model}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-[#4f574f]"><span className="flex items-center gap-1"><UsersRound className="h-4 w-4 text-[#087239]" />{vehicle.seats}</span><span className="flex items-center gap-1"><BriefcaseBusiness className="h-4 w-4 text-[#087239]" />{vehicle.bags}</span><span className="flex items-center gap-1"><AirVent className="h-4 w-4 text-[#087239]" />AC</span></div>
                  <p className="mt-5 min-h-[54px] text-[11px] leading-[18px] text-[#5f675f]">{vehicle.description}</p>
                  <div className="mt-4 rounded-lg border border-[#7a9a7f] px-3 py-2 text-center text-[11px] font-bold text-[#174a29]">{vehicle.bestFor}</div>
                </div>
              </motion.article>
            ))}

            <motion.article whileHover={{ y: -4 }} className="flex min-h-[410px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#83a486] bg-[#f5f9f2] p-8 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-[#0a6330] shadow-sm"><Car className="h-8 w-8" /></div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-[#1d3021]">Other Vehicles on Demand</h3>
              <p className="mt-3 max-w-xs text-xs leading-6 text-[#606b61]">Need a different premium car, larger coach or a specific vehicle configuration? Contact us and we&apos;ll arrange it based on availability and your trip requirements.</p>
              <Link href="/get-quote" className="mt-6 rounded-full bg-[#087239] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#075e30]">Request a Vehicle →</Link>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ee] py-7">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading title="Why Travel with Rani Tours?" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {reasons.map(([Icon, label]) => <div key={label} className="flex items-center gap-3 border-[#e3d7c6] lg:border-r lg:pr-4 lg:last:border-r-0"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#9ab09c] bg-white text-[#0b6331]"><Icon className="h-5 w-5" /></div><span className="text-[11px] font-semibold leading-4 text-[#243326]">{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-6">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-5 rounded-2xl bg-[#004523] px-6 py-5 text-white sm:flex-row">
          <div className="flex items-center gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#fff5e5] text-[#064d29]"><Headphones className="h-7 w-7" /></div><div><h2 className="font-serif text-xl font-bold">Travel in Comfort with Our <span className="text-[#f1b323]">Premium Fleet</span></h2><p className="mt-1 text-xs text-white/75">Have a specific requirement? We&apos;ll help you choose the right vehicle for your journey.</p></div></div>
          <div className="flex flex-wrap justify-center gap-3"><Link href="/get-quote" className="rounded-lg border border-[#e4aa12] px-6 py-3 text-xs font-bold text-[#ffc331]">Get a Custom Quote →</Link><a href={siteContact.phones[0].href} className="flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-xs font-bold"><Phone className="h-4 w-4" />Talk to Expert</a></div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading title="Why Travel with Rani Tours?" />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Trust icon={ShieldCheck} title="Trusted & Reliable" text="Thousands of happy customers trust us for their journeys." />
            <Trust icon={BadgeIndianRupee} title="Transparent Pricing" text="Clear quotations with no hidden charges." />
            <Trust icon={BusFront} title="Comfort & Safety" text="Well-maintained vehicles for a safe journey." />
            <Trust icon={Headphones} title="24/7 Travel Support" text="Our team is always here to assist you anytime." />
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ title }: { title: string }) {
  return <div className="text-center"><h2 className="font-serif text-2xl font-bold text-[#18311e]">{title}</h2><div className="mx-auto mt-2 flex items-center justify-center gap-2 text-[#d39c29]"><span className="h-px w-8 bg-current" /><span>✤</span><span className="h-px w-8 bg-current" /></div></div>;
}

function Trust({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) {
  return <div className="flex gap-3"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#9ab09c] text-[#0b6331]"><Icon className="h-6 w-6" /></div><div><h3 className="text-sm font-bold text-[#213124]">{title}</h3><p className="mt-1 text-[10px] leading-4 text-[#676d67]">{text}</p></div></div>;
}
