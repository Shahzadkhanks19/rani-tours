"use client";

import { motion } from "motion/react";

export function TripSearch() {
  return (
    <section id="trip-search" className="site-shell relative z-20 -mt-14">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[28px] border border-black/5 bg-white p-5 shadow-[0_24px_70px_rgba(0,63,34,.14)] md:p-7">
        <div className="mb-5 flex items-end justify-between gap-4"><div><div className="section-kicker">Quick enquiry</div><h2 className="mt-1 text-2xl font-black tracking-tight">Where do you want to go?</h2></div><div className="hidden rounded-full bg-[#edf7d1] px-4 py-2 text-xs font-black text-[#00562e] sm:block">Best local rates</div></div>
        <form className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_.8fr_.8fr_auto]">
          <label className="grid gap-1.5 text-xs font-bold text-[#617066]">FROM<input className="h-12 rounded-xl border border-[#dce6dd] bg-[#fbfdf9] px-4 text-sm font-semibold text-[#143124] outline-none focus:border-[#0b8045]" defaultValue="Jodhpur" /></label>
          <label className="grid gap-1.5 text-xs font-bold text-[#617066]">TO<input className="h-12 rounded-xl border border-[#dce6dd] bg-[#fbfdf9] px-4 text-sm font-semibold text-[#143124] outline-none focus:border-[#0b8045]" placeholder="Destination" /></label>
          <label className="grid gap-1.5 text-xs font-bold text-[#617066]">PICKUP<input type="date" className="h-12 rounded-xl border border-[#dce6dd] bg-[#fbfdf9] px-4 text-sm font-semibold text-[#143124] outline-none focus:border-[#0b8045]" /></label>
          <label className="grid gap-1.5 text-xs font-bold text-[#617066]">TRIP TYPE<select className="h-12 rounded-xl border border-[#dce6dd] bg-[#fbfdf9] px-4 text-sm font-semibold text-[#143124] outline-none focus:border-[#0b8045]"><option>One Way</option><option>Round Trip</option><option>Local</option><option>Tour</option></select></label>
          <button type="submit" className="mt-auto h-12 rounded-xl bg-[#006d3a] px-6 font-black text-white transition hover:bg-[#00562e]">Search</button>
        </form>
      </motion.div>
    </section>
  );
}
