"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { destinations, popularRoutes } from "@/lib/site-data";

export function HomeSections() {
  return (
    <>
      <section className="site-shell py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="section-kicker">Most requested</div><h2 className="mt-2 text-4xl font-black tracking-[-.035em] text-[#143124]">Popular taxi routes</h2></div><Link href="/taxi-services" className="text-sm font-black text-[#006d3a]">View all services →</Link></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {popularRoutes.map(([from, to, note], i) => <motion.article key={to} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }} whileHover={{ y: -6 }} className="rounded-3xl border border-[#e3eadf] bg-white p-5 shadow-[0_12px_35px_rgba(0,50,27,.07)]"><div className="mb-8 grid h-11 w-11 place-items-center rounded-full bg-[#edf7d1] font-black text-[#006d3a]">↗</div><p className="text-xs font-bold uppercase tracking-[.15em] text-[#7e8c82]">{from}</p><h3 className="mt-1 text-xl font-black">{to}</h3><p className="mt-2 text-sm text-[#6f7b73]">{note}</p><Link href={`/taxi-services/jodhpur-to-${to.toLowerCase().replaceAll(" ", "-")}`} className="mt-6 inline-block text-sm font-black text-[#006d3a]">Explore route →</Link></motion.article>)}
        </div>
      </section>

      <section className="bg-[#eef4e8] py-24">
        <div className="site-shell"><div className="max-w-2xl"><div className="section-kicker">Rajasthan highlights</div><h2 className="mt-2 text-4xl font-black tracking-[-.035em]">Places worth the journey</h2><p className="mt-4 leading-7 text-[#617066]">Our destination system will grow from these featured cities into a complete Rajasthan and India travel catalogue.</p></div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{destinations.map((destination, i) => <motion.a key={destination.name} href={`/destinations/${destination.name.toLowerCase()}`} initial={{ opacity: 0, scale: .98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .05 }} className={`group relative min-h-72 overflow-hidden rounded-[30px] bg-gradient-to-br ${destination.accent} p-6 text-white`}><div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_80%_10%,white_0,transparent_35%)]"/><div className="relative flex h-full flex-col justify-end"><p className="text-xs font-bold uppercase tracking-[.16em] text-white/70">{destination.note}</p><h3 className="mt-1 text-3xl font-black">{destination.name}</h3><span className="mt-4 text-sm font-bold">Discover destination →</span></div></motion.a>)}</div>
        </div>
      </section>

      <section className="site-shell py-24"><div className="grid overflow-hidden rounded-[36px] bg-[#003f22] text-white lg:grid-cols-[1.15fr_.85fr]"><div className="p-8 sm:p-12 lg:p-16"><div className="text-xs font-black uppercase tracking-[.18em] text-[#b3df24]">Custom Rajasthan tours</div><h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-.035em] sm:text-5xl">Tell us the places. We&apos;ll shape the journey.</h2><p className="mt-5 max-w-xl leading-7 text-white/70">Choose your dates, group size, interests and comfort level. Rani Tour&apos;s will turn it into a practical, flexible itinerary.</p><Link href="/plan-your-trip" className="mt-8 inline-block rounded-full bg-[#9bd500] px-6 py-3.5 font-black text-[#003f22]">Plan a Custom Tour</Link></div><div className="grid grid-cols-2 gap-px bg-white/10"><Stat value="24×7" label="Travel support"/><Stat value="Local" label="Rajasthan expertise"/><Stat value="100%" label="Flexible itineraries"/><Stat value="India" label="Intercity coverage"/></div></div></section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) { return <div className="grid min-h-44 place-content-center bg-[#07512f] p-6 text-center"><strong className="text-3xl font-black text-[#b3df24]">{value}</strong><span className="mt-2 text-sm text-white/65">{label}</span></div>; }
