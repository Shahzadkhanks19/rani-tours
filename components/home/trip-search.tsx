"use client";

import { CalendarDays, ChevronDown, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import { motion } from "motion/react";

export function TripSearch() {
  return (
    <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }} className="w-full rounded-[22px] border border-white/70 bg-white/95 p-5 text-[#202020] shadow-[0_18px_45px_rgba(0,0,0,.22)] backdrop-blur md:p-6 lg:max-w-[380px]">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-bold text-[#006837]">Plan Your Journey</h2>
        <div className="mx-auto mt-2 flex items-center justify-center gap-2 text-[#bd9b43]"><span className="h-px w-8 bg-[#bd9b43]/60" /><span>❈</span><span className="h-px w-8 bg-[#bd9b43]/60" /></div>
      </div>

      <form className="mt-5 space-y-3">
        <Field label="Pickup Location" icon={<MapPin className="h-4 w-4" />} placeholder="Enter pickup location" />
        <Field label="Destination" icon={<MapPin className="h-4 w-4" />} placeholder="Enter destination" />
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-[11px] font-semibold text-[#383838]">Travel Date<div className="mt-1 flex h-11 items-center gap-2 rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#777]"><CalendarDays className="h-4 w-4 text-[#666]" /><span>Select date</span></div></label>
          <label className="block text-[11px] font-semibold text-[#383838]">Travellers<div className="mt-1 flex h-11 items-center gap-2 rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#777]"><UserRound className="h-4 w-4 text-[#666]" /><span className="flex-1">1 Traveller</span><ChevronDown className="h-4 w-4" /></div></label>
        </div>
        <label className="block text-[11px] font-semibold text-[#383838]">Vehicle Type<div className="mt-1 flex h-11 items-center rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#777]"><span className="flex-1">Select vehicle type</span><ChevronDown className="h-4 w-4" /></div></label>
        <button type="submit" className="flex h-11 w-full items-center justify-center gap-3 rounded-full bg-[#067326] text-sm font-bold text-white shadow-sm transition hover:bg-[#055c20]">Get Quote / Enquiry Now <span>→</span></button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-6 border-t border-[#ececec] pt-4 text-[11px] font-semibold">
        <a href="https://wa.me/919828069795" className="flex items-center gap-1.5 text-[#087a2c]"><MessageCircle className="h-4 w-4" />WhatsApp Us</a>
        <a href="tel:+919828069795" className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-[#a5883f]" />+91 98280 69795</a>
      </div>
    </motion.aside>
  );
}

function Field({ label, icon, placeholder }: { label: string; icon: React.ReactNode; placeholder: string }) {
  return <label className="block text-[11px] font-semibold text-[#383838]">{label}<div className="mt-1 flex h-11 items-center gap-2 rounded-md border border-[#dedede] bg-white px-3 text-xs text-[#888]">{icon}<input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#999]" placeholder={placeholder} /></div></label>;
}
