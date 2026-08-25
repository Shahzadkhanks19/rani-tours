"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Headphones, Menu, Phone, Quote, X } from "lucide-react";
import { useState } from "react";
import { siteContact } from "@/lib/site-data";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Taxi Services", href: "/taxi-services", dropdown: true },
  { label: "Tour Packages", href: "/tour-packages", dropdown: true },
  { label: "Destinations", href: "/destinations", dropdown: true },
  { label: "Fleet", href: "/fleet" },
  { label: "Corporate", href: "/corporate" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-50 bg-white">
      <div className="bg-[#003f22] text-white">
        <div className="mx-auto flex min-h-10 max-w-[1180px] items-center justify-between gap-4 px-4 text-[11px] font-semibold sm:text-xs">
          <div className="flex items-center gap-2"><span className="text-[#b5d83d]">🚕</span><span>Reliable Rides. Memorable Journeys.</span></div>
          <div className="hidden items-center gap-5 md:flex">
            <a href={siteContact.phones[0].href} className="flex items-center gap-1.5 transition hover:text-[#d8b752]"><Phone className="h-3.5 w-3.5 text-[#d8b752]" />{siteContact.phones[0].display}</a>
            <span className="h-4 w-px bg-white/30" />
            <a href={siteContact.phones[1].href} className="flex items-center gap-1.5 transition hover:text-[#d8b752]"><Phone className="h-3.5 w-3.5 text-[#d8b752]" />{siteContact.phones[1].display}</a>
          </div>
          <div className="flex items-center gap-1.5"><Headphones className="h-3.5 w-3.5 text-[#d8b752]" /><span>24/7 Support</span></div>
        </div>
      </div>

      <div className="border-b border-black/5 bg-white shadow-sm">
        <div className="mx-auto flex min-h-[82px] max-w-[1180px] items-center justify-between gap-4 px-4">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Rani Tour's home">
            <Image src="/rani-tours-icon.svg" alt="Rani Tour's phoenix logo" width={54} height={54} priority />
            <div className="leading-none">
              <div className="font-serif text-[26px] font-bold text-[#006837]">Rani Tour&apos;s</div>
              <div className="mt-1 text-center text-[10px] font-medium text-[#313d31]">Your Tour Expert</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 xl:flex" aria-label="Primary navigation">
            {links.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center gap-1 overflow-hidden rounded-full px-3.5 py-2.5 text-[13px] font-semibold transition duration-300 ${active ? "bg-[#edf6e8] text-[#006837] shadow-[inset_0_0_0_1px_rgba(0,104,55,.12)]" : "text-[#171717] hover:bg-[#f3f7ef] hover:text-[#006837]"}`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {item.dropdown ? <ChevronDown className="relative z-10 h-3.5 w-3.5 transition duration-300 group-hover:rotate-180" /> : null}
                  <span className={`absolute inset-x-3 bottom-1 h-[2px] origin-left rounded-full bg-[#9bd500] transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>

          <Link href="/get-quote" className="hidden items-center gap-2 rounded-full bg-[#067326] px-5 py-3 text-xs font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#055c20] hover:shadow-lg xl:flex">
            <Quote className="h-4 w-4" />Get Quote <span>→</span>
          </Link>

          <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full bg-[#edf4e8] text-[#006837] transition hover:bg-[#dfead8] xl:hidden" aria-label="Toggle navigation" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute inset-x-4 top-full rounded-2xl border border-black/5 bg-white p-3 text-[#171717] shadow-2xl xl:hidden">
            {links.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.label} href={item.href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${active ? "bg-[#edf6e8] text-[#006837]" : "hover:bg-[#f2f6ee] hover:text-[#006837]"}`}>
                  <span>{item.label}</span>{item.dropdown ? <ChevronDown className="h-4 w-4" /> : null}
                </Link>
              );
            })}
            <Link href="/get-quote" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#067326] px-4 py-3 font-bold text-white"><Quote className="h-4 w-4" />Get Quote</Link>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
