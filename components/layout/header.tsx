import Image from "next/image";
import Link from "next/link";
import { Headphones, Phone } from "lucide-react";
import { siteContact } from "@/lib/site-data";
import { HeaderNavigation } from "@/components/layout/header-navigation";

export function Header() {
  return (
    <>
      <div className="relative z-40 bg-[#0b4d29] text-white">
        <div className="mx-auto flex min-h-10 max-w-[1180px] items-center justify-between gap-3 px-4 text-[10px] font-semibold sm:text-xs">
          <div className="flex min-w-0 items-center gap-2"><span className="text-[#d6a63a]">🚕</span><span className="truncate sm:whitespace-normal">Reliable Rides. Memorable Journeys.</span></div>
          <div className="hidden items-center gap-5 md:flex">
            <a href={siteContact.phones[0].href} className="flex items-center gap-1.5 transition hover:text-[#e7b844]"><Phone className="h-3.5 w-3.5 text-[#e7b844]" />{siteContact.phones[0].display}</a>
            <span className="h-4 w-px bg-white/25" />
            <a href={siteContact.phones[1].href} className="flex items-center gap-1.5 transition hover:text-[#e7b844]"><Phone className="h-3.5 w-3.5 text-[#e7b844]" />{siteContact.phones[1].display}</a>
          </div>
          <div className="flex shrink-0 items-center gap-1.5"><Headphones className="h-3.5 w-3.5 text-[#e7b844]" /><span>24/7 Support</span></div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#17341f]/8 bg-white shadow-sm">
        <div className="mx-auto flex min-h-[82px] max-w-[1180px] items-center justify-between gap-4 px-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image src="/rani-tours-icon.svg" alt="" aria-hidden="true" width={54} height={54} priority />
            <div className="leading-none"><div className="font-serif text-[26px] font-bold text-[#0b6531]">Rani Tour&apos;s</div><div className="mt-1 text-center text-[10px] font-medium text-[#313d31]">Your Tour Expert</div></div>
          </Link>
          <HeaderNavigation />
        </div>
      </header>
    </>
  );
}
