"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  CalendarDays,
  Car,
  ChevronDown,
  Clock3,
  Headphones,
  MapPin,
  MapPinned,
  MessageCircle,
  Phone,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { FaCarSide, FaHeadset, FaMapMarkedAlt, FaRupeeSign, FaShieldAlt, FaUserTie } from "react-icons/fa";
import { siteContact } from "@/lib/site-data";

const heroImage = "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=88&w=2200";

const trustCards = [
  [FaMapMarkedAlt, "All India Coverage", "Taxi service to every corner of India from Jodhpur."],
  [FaShieldAlt, "Safe & Secure", "Verified drivers, safe routes and dependable service."],
  [FaRupeeSign, "Transparent Pricing", "Clear pricing with no hidden charges."],
  [FaCarSide, "Comfortable Vehicles", "Clean, well-maintained cars for every journey."],
  [Clock3, "On-time Guarantee", "Punctual pickup and drop for stress-free travel."],
  [FaHeadset, "24/7 Support", "Our travel team is available before, during and after your trip."],
] as const;

const destinations = [
  { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=84&w=900", oneWay: "₹2,499", round: "₹4,799" },
  { name: "Mumbai", image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&q=84&w=900", oneWay: "₹3,499", round: "₹6,499" },
  { name: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=84&w=900", oneWay: "₹3,999", round: "₹7,499" },
  { name: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=84&w=900", oneWay: "₹4,499", round: "₹8,499" },
  { name: "Haridwar", image: "https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&q=84&w=900", oneWay: "₹4,999", round: "₹9,499" },
] as const;

const vehicles = [
  { name: "Swift Dzire / Etios", seats: "4", luggage: "3", type: "Sedan", price: "From ₹11/km", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=82&w=700" },
  { name: "Toyota Etios / Amaze", seats: "4", luggage: "3", type: "Sedan", price: "From ₹12/km", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=82&w=700" },
  { name: "Toyota Innova Crysta", seats: "7", luggage: "6", type: "SUV", price: "From ₹16/km", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=82&w=700" },
  { name: "Toyota Fortuner", seats: "7", luggage: "6", type: "SUV", price: "From ₹22/km", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=82&w=700" },
  { name: "Tempo Traveller", seats: "12", luggage: "6", type: "Traveller", price: "From ₹20/km", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=82&w=700" },
  { name: "Luxury Car", seats: "4", luggage: "3", type: "Luxury", price: "On Request", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=82&w=700" },
] as const;

export function TaxiServicesPageContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0d2016] text-white">
        <Image src={heroImage} alt="India Gate in Delhi" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,24,15,.94)_0%,rgba(8,28,17,.78)_46%,rgba(8,18,13,.25)_100%)]" />
        <div className="relative mx-auto grid min-h-[560px] max-w-[1180px] items-center gap-10 px-4 py-10 lg:grid-cols-[1fr_380px]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-7 flex flex-wrap items-center gap-2 text-xs text-white/75">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span><span>Taxi Services</span><span>›</span><span>All India Taxi Services</span>
            </div>
            <h1 className="font-serif text-5xl font-bold leading-none sm:text-6xl">All India <span className="text-[#78b465]">Taxi Services</span></h1>
            <h2 className="mt-5 font-serif text-2xl font-bold text-[#f2cf63]">One Country. Countless Destinations.</h2>
            <p className="mt-5 max-w-[640px] text-sm leading-7 text-white/85">Travel anywhere in India with reliable, comfortable and affordable taxi services from Jodhpur. From metro cities to remote destinations, we&apos;ve got you covered.</p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {[
                [MapPinned, "Pan India Coverage"],
                [WalletCards, "Affordable Pricing"],
                [Car, "Well Maintained Vehicles"],
                [FaUserTie, "Experienced Drivers"],
                [Headphones, "24/7 Customer Support"],
              ].map(([Icon, label]) => (
                <div key={String(label)} className="text-center sm:text-left">
                  <Icon className="mx-auto h-7 w-7 text-[#e9c335] sm:mx-0" />
                  <div className="mt-2 text-[11px] font-bold leading-4">{String(label)}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <RidePlanner />
        </div>
      </section>

      <section className="bg-white py-11 sm:py-14">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading eyebrow="WHY CHOOSE RANI TOURS FOR ALL INDIA TRAVEL?" title="Your Journey, Our Responsibility" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {trustCards.map(([Icon, title, text], index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} whileHover={{ y: -4 }} className="rounded-2xl border border-[#ece4d9] bg-white p-5 text-center shadow-[0_10px_28px_rgba(46,38,27,.07)]">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#edf6e9] text-[#087239]"><Icon className="h-8 w-8" /></div>
                <h3 className="mt-4 font-serif text-sm font-bold text-[#203223]">{title}</h3>
                <p className="mt-2 text-[10px] leading-[17px] text-[#656c65]">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9] py-10">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading eyebrow="POPULAR DESTINATIONS ACROSS INDIA" title="Travel Popular Destinations" />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {destinations.map((item) => (
              <Link key={item.name} href={`/destinations/${item.name.toLowerCase()}`} className="group overflow-hidden rounded-2xl border border-[#e8e1d7] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-32 overflow-hidden"><Image src={item.image} alt={`${item.name} landmark`} fill sizes="(max-width:640px) 100vw, 220px" className="object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="p-4"><h3 className="font-serif text-base font-bold text-[#233326]">{item.name}</h3><div className="mt-3 grid grid-cols-2 gap-2 text-[9px] text-[#6d726d]"><div>One Way<br /><strong className="text-xs text-[#1b281d]">From {item.oneWay}</strong></div><div>Round Trip<br /><strong className="text-xs text-[#1b281d]">From {item.round}</strong></div></div></div>
              </Link>
            ))}
            <Link href="/destinations" className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#94b99b] bg-[#f4f8f1] p-5 text-center text-[#075f2d] transition hover:-translate-y-1 hover:shadow-md">
              <MapPinned className="h-12 w-12" /><h3 className="mt-3 font-serif text-base font-bold">And Many More Destinations</h3><p className="mt-2 text-[10px] leading-4 text-[#657165]">Can&apos;t find your destination? Contact us for a custom quote.</p><span className="mt-3 text-xs font-bold">Enquire Now →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading eyebrow="CHOOSE THE RIGHT VEHICLE FOR YOUR JOURNEY" title="Comfort for Every Group Size" />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {vehicles.map((vehicle) => (
              <motion.article key={vehicle.name} whileHover={{ y: -4 }} className="overflow-hidden rounded-2xl border border-[#ebe4da] bg-white p-3 text-center shadow-[0_8px_24px_rgba(45,37,28,.06)]">
                <div className="relative h-24 overflow-hidden rounded-xl bg-[#f4f4f2]"><Image src={vehicle.image} alt={vehicle.name} fill sizes="200px" className="object-cover" /></div>
                <h3 className="mt-3 min-h-10 font-serif text-xs font-bold text-[#243225]">{vehicle.name}</h3>
                <div className="mt-2 flex items-center justify-center gap-3 text-[9px] text-[#666]"><span className="flex items-center gap-1"><UsersRound className="h-3 w-3" />{vehicle.seats}</span><span>🧳 {vehicle.luggage}</span><span>{vehicle.type}</span></div>
                <div className="mt-3 text-[11px] font-bold text-[#075f2d]">{vehicle.price}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#005728] py-4 text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#006837]"><Phone className="h-6 w-6" /></div><div><div className="font-serif text-lg font-bold">Planning an All India Trip?</div><div className="text-xs text-white/80">Get the best taxi fare and dependable service.</div></div></div>
          <div className="flex flex-wrap justify-center gap-3"><a href={siteContact.phones[0].href} className="rounded-full bg-[#f4cf5e] px-7 py-3 text-sm font-bold text-[#0d4223]">☎ {siteContact.phones[0].display}</a><a href={siteContact.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#1ca443] px-7 py-3 text-sm font-bold">WhatsApp Us</a></div>
        </div>
      </section>
    </>
  );
}

function RidePlanner() {
  return (
    <motion.aside initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="w-full rounded-[22px] border border-white/70 bg-white/95 p-5 text-[#202020] shadow-[0_18px_45px_rgba(0,0,0,.22)] backdrop-blur md:p-6 lg:max-w-[380px]">
      <div className="text-center"><h2 className="font-serif text-2xl font-bold text-[#006837]">Plan Your All India Ride</h2><div className="mx-auto mt-2 flex items-center justify-center gap-2 text-[#bd9b43]"><span className="h-px w-8 bg-[#bd9b43]/60" /><span>❈</span><span className="h-px w-8 bg-[#bd9b43]/60" /></div></div>
      <form className="mt-5 space-y-3">
        <Field label="Pick-up Location" icon={<MapPin className="h-4 w-4" />} placeholder="Enter pick-up location" />
        <Field label="Drop Location" icon={<MapPin className="h-4 w-4" />} placeholder="Enter drop location" />
        <div className="grid grid-cols-2 gap-3"><SelectField label="Journey Type" text="Select journey type" /><label className="block text-[11px] font-semibold text-[#383838]">Journey Date<div className="mt-1 flex h-11 items-center gap-2 rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#777]"><CalendarDays className="h-4 w-4" /><span>Select date</span></div></label></div>
        <label className="block text-[11px] font-semibold text-[#383838]">Travellers<div className="mt-1 flex h-11 items-center gap-2 rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#777]"><UserRound className="h-4 w-4" /><span className="flex-1">1 Traveller</span><ChevronDown className="h-4 w-4" /></div></label>
        <button type="submit" className="flex h-11 w-full items-center justify-center gap-3 rounded-full bg-[#067326] text-sm font-bold text-white shadow-sm transition hover:bg-[#055c20]">Get Quote / Enquiry Now <span>→</span></button>
      </form>
      <div className="mt-4 flex items-center justify-center gap-6 border-t border-[#ececec] pt-4 text-[11px] font-semibold">
        <a href={siteContact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#087a2c]"><MessageCircle className="h-4 w-4" />WhatsApp Us</a>
        <a href={siteContact.phones[0].href} className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-[#a5883f]" />{siteContact.phones[0].display}</a>
      </div>
    </motion.aside>
  );
}

function Field({ label, icon, placeholder }: { label: string; icon: React.ReactNode; placeholder: string }) {
  return <label className="block text-[11px] font-semibold text-[#383838]">{label}<div className="mt-1 flex h-11 items-center gap-2 rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#888]">{icon}<input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#999]" placeholder={placeholder} /></div></label>;
}

function SelectField({ label, text }: { label: string; text: string }) {
  return <label className="block text-[11px] font-semibold text-[#383838]">{label}<div className="mt-1 flex h-11 items-center rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#777]"><span className="flex-1">{text}</span><ChevronDown className="h-4 w-4" /></div></label>;
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#237643]">{eyebrow}</p><h2 className="mt-2 font-serif text-3xl font-bold text-[#172c1c]">{title}</h2><div className="mx-auto mt-3 h-px w-16 bg-[#c8a75a]" /></div>;
}
