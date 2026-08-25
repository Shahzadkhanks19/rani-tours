"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const links = ["Home", "About", "Taxi Services", "Tour Packages", "Destinations", "Fleet", "Contact"];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white">
      <div className="border-b border-white/15 bg-[#003f22]/90 text-xs backdrop-blur-md">
        <div className="site-shell flex min-h-10 items-center justify-between gap-4 py-2">
          <p>24×7 Taxi & Tour Assistance from Jodhpur</p>
          <div className="hidden gap-5 sm:flex"><span>+91 98292 35555</span><span>info@ranitour.in</span></div>
        </div>
      </div>
      <div className="site-shell mt-3 flex h-20 items-center justify-between rounded-2xl border border-white/15 bg-white/95 px-4 text-[#143124] shadow-[0_16px_50px_rgba(0,45,24,.16)] backdrop-blur-xl md:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Rani Tour's home">
          <Image src="/rani-tours-icon.svg" alt="Rani Tour's phoenix logo" width={52} height={52} priority />
          <div><div className="text-lg font-black text-[#00562e]">Rani Tour&apos;s</div><div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#617066]">Travel Rajasthan</div></div>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {links.map((label) => <Link key={label} href={label === "Home" ? "/" : `/${label.toLowerCase().replaceAll(" ", "-")}`} className="text-sm font-bold transition hover:text-[#0b8045]">{label}</Link>)}
        </nav>
        <div className="hidden lg:block"><Link href="/get-quote" className="rounded-full bg-[#9bd500] px-5 py-3 text-sm font-black text-[#003f22] transition hover:scale-[1.02]">Get a Quote</Link></div>
        <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-[#edf5e8] text-xl lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Toggle navigation">{open ? "×" : "☰"}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="site-shell mt-2 grid overflow-hidden rounded-2xl bg-white p-3 text-[#143124] shadow-2xl lg:hidden">
            {links.map((label) => <Link key={label} onClick={() => setOpen(false)} href={label === "Home" ? "/" : `/${label.toLowerCase().replaceAll(" ", "-")}`} className="rounded-xl px-4 py-3 font-bold hover:bg-[#f2f7ee]">{label}</Link>)}
            <Link href="/get-quote" className="mt-2 rounded-xl bg-[#9bd500] px-4 py-3 text-center font-black text-[#003f22]">Get a Quote</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
