"use client";

import Image from "next/image";
import { motion } from "motion/react";

const heroImage = "https://images.unsplash.com/photo-1764243213897-45e6def5ad3e?auto=format&fit=crop&q=85&w=2400";

export function Hero() {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#003f22] text-white">
      <Image src={heroImage} alt="Mehrangarh Fort in Jodhpur, Rajasthan" fill priority sizes="100vw" className="object-cover opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,50,27,.92)_0%,rgba(0,50,27,.62)_45%,rgba(0,50,27,.16)_100%)]" />
      <div className="site-shell relative flex min-h-[760px] items-center pb-16 pt-44">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] backdrop-blur">Discover Rajasthan, your way</div>
          <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-[-.04em] sm:text-6xl lg:text-7xl">Journeys built around <span className="text-[#b3df24]">you.</span></h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">Trusted local taxis, handpicked Rajasthan tours and flexible itineraries from Jodhpur to destinations across India.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#trip-search" className="rounded-full bg-[#9bd500] px-6 py-3.5 font-black text-[#003f22]">Plan Your Trip</a><a href="/tour-packages" className="rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-bold backdrop-blur">Explore Packages</a></div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/75"><span>✓ Professional Drivers</span><span>✓ Transparent Quotes</span><span>✓ 24×7 Assistance</span></div>
        </motion.div>
      </div>
    </section>
  );
}
