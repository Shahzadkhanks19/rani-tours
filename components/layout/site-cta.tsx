import Link from "next/link";
import { Headphones, Phone } from "lucide-react";
import { siteContact } from "@/lib/site-data";

export function SiteCta() {
  return (
    <section className="bg-white pb-14 pt-2">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="relative overflow-hidden rounded-[22px] bg-[#0b4d29] px-7 py-7 text-white shadow-[0_16px_42px_rgba(11,77,41,.12)] sm:px-9 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#fff8ec] text-[#0b6531]"><Headphones className="h-6 w-6"/></div>
            <div><h2 className="font-serif text-2xl font-bold">Ready to Plan <span className="text-[#efb43a]">Your Journey?</span></h2><p className="mt-1 max-w-[620px] text-xs leading-6 text-white/75">Tell us where you want to go and our team will help with the right route, vehicle and travel plan.</p></div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
            <Link href="/get-quote" className="rounded-lg border border-[#d7ad3e] px-5 py-3 text-xs font-bold text-[#f1c24b] transition hover:bg-[#f1c24b] hover:text-[#17341f]">Get a Quote →</Link>
            <a href={siteContact.phones[0].href} className="flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3 text-xs font-bold transition hover:bg-white hover:text-[#0b4d29]"><Phone className="h-4 w-4"/>Call Now</a>
          </div>
        </div>
      </div>
    </section>
  );
}
