"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Quote, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Taxi Services", href: "/taxi-services" },
  { label: "Tour Packages", href: "/tour-packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "Fleet", href: "/fleet" },
  { label: "Corporate", href: "/corporate" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function HeaderNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <nav className="hidden items-center gap-4 xl:flex" aria-label="Primary navigation">
        {links.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.label} href={item.href} aria-current={active ? "page" : undefined} className={`group relative flex whitespace-nowrap items-center py-7 text-[13px] font-semibold transition-colors duration-300 ${active ? "text-[#0b6531]" : "text-[#171717] hover:text-[#0b6531]"}`}>
              <span>{item.label}</span>
              <span className={`absolute bottom-[18px] left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-[#d6a63a] transition-all duration-300 ${active ? "w-7" : "w-0 group-hover:w-5"}`} />
            </Link>
          );
        })}
      </nav>
      <Link href="/get-quote" className="hidden items-center gap-2 rounded-full bg-[#0b6531] px-5 py-3 text-xs font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b4d29] hover:shadow-lg xl:flex"><Quote className="h-4 w-4" />Get Quote <span>→</span></Link>
      <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full bg-[#edf5e8] text-[#0b6531] transition hover:bg-[#dfead8] xl:hidden" aria-label="Toggle navigation" aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      {open ? (
        <nav className="absolute inset-x-4 top-full max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl border border-[#17341f]/10 bg-white p-3 text-[#171717] shadow-2xl xl:hidden" aria-label="Mobile navigation">
          {links.map((item) => {
            const active = isActive(item.href);
            return <Link key={item.label} href={item.href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition ${active ? "bg-[#edf5e8] text-[#0b6531]" : "hover:bg-[#f6f8f4] hover:text-[#0b6531]"}`}>{item.label}</Link>;
          })}
          <Link href="/get-quote" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0b6531] px-4 py-3 font-bold text-white transition hover:bg-[#0b4d29]"><Quote className="h-4 w-4" />Get Quote</Link>
        </nav>
      ) : null}
    </>
  );
}
