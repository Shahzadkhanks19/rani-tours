"use client";

import Image from "next/image";
import { Headphones, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { TripSearch } from "@/components/home/trip-search";

const heroImage = "https://images.unsplash.com/photo-1569096610945-1a094be04c74?auto=format&fit=crop&q=86&w=2200";
const fortunerImage = "https://upload.wikimedia.org/wikipedia/commons/a/a6/Toyota_Fortuner_Full.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#102317] text-white">
      <Image src={heroImage} alt="Mehrangarh Fort in Jodhpur at golden hour" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,24,15,.92)_0%,rgba(8,28,16,.72)_42%,rgba(5,16,10,.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,19,10,.7)_0%,transparent_34%)]" />

      <div className="relative mx-auto grid min-h-[600px] max-w-[1180px] items-center gap-10 px-4 py-14 lg:grid-cols-[1fr_380px] lg:py-8">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[650px] py-6">
          <h1 className="font-serif text-[54px] font-bold leading-[0.98] tracking-[-0.035em] sm:text-[66px] lg:text-[76px]">
            Travel Anywhere<br /><span className="text-[#68a95e]">in India</span>
          </h1>
          <p className="mt-3 font-serif text-2xl font-semibold text-[#f1e0b4] sm:text-[27px]">From Jodhpur to Every Destination</p>
          <p className="mt-4 max-w-[620px] text-sm leading-7 text-white/88 sm:text-[15px]">Reliable taxi service for local sightseeing, Rajasthan tours, airport transfers and outstation travel across India. Safe. Comfortable. Always On Time.</p>

          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4 text-xs font-medium sm:text-[13px]">
            <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-[#e0bb4c]" />Local & Outstation</span>
            <span className="flex items-center gap-2"><span className="text-xl text-[#e0bb4c]">◆</span>All India Service</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#e0bb4c]" />Safe & Reliable</span>
            <span className="flex items-center gap-2"><Headphones className="h-5 w-5 text-[#e0bb4c]" />24/7 Support</span>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.6 }} className="relative mt-8 hidden h-48 w-[520px] overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl sm:block">
            <Image src={fortunerImage} alt="Toyota Fortuner used for premium taxi and outstation travel" fill sizes="520px" className="object-cover object-[center_58%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
            <div className="absolute bottom-[31px] left-[80px] rounded-[2px] border border-black/50 bg-[#f5c400] px-3 py-0.5 text-[9px] font-black tracking-[0.16em] text-black shadow-sm sm:bottom-[42px] sm:left-[103px] sm:text-[10px]">
              TAXI
            </div>
          </motion.div>
        </motion.div>

        <TripSearch />
      </div>
    </section>
  );
}
