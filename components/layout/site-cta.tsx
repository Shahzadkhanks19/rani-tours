import Link from "next/link";
import { Headphones, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteContact } from "@/lib/site-data";

export function SiteCta() {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="relative overflow-hidden rounded-[24px] border border-[#285f3b] bg-[#0b4d29] px-6 py-7 text-white shadow-[0_18px_46px_rgba(11,77,41,.14)] sm:px-9 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full border border-white/5" aria-hidden="true" />
          <div className="relative flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#fff8ed] text-[#0b6531] shadow-sm"><Headphones className="h-6 w-6" /></div>
            <div><h2 className="font-serif text-2xl font-bold leading-tight sm:text-[28px]">Ready to Plan <span className="text-[#e7b844]">Your Journey?</span></h2><p className="mt-2 max-w-[620px] text-xs leading-6 text-white/75">Tell us where you want to go and our team will help with the right route, vehicle and travel plan.</p></div>
          </div>
          <div className="relative mt-6 flex flex-wrap gap-3 lg:mt-0 lg:justify-end">
            <Link href="/get-quote" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#e4b63f] px-6 text-xs font-bold text-[#17341f] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f0c653] hover:shadow-md">Get a Quote <span className="ml-2">→</span></Link>
            <a href={siteContact.phones[0].href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 text-xs font-bold text-white transition hover:bg-white hover:text-[#0b4d29]"><Phone className="h-4 w-4" />Call Now</a>
            <a href={siteContact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 text-xs font-bold text-white transition hover:bg-white hover:text-[#0b4d29]"><FaWhatsapp className="h-4 w-4" />WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}
