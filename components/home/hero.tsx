import Image from "next/image";
import { Headphones, MapPin, ShieldCheck } from "lucide-react";
import { TripSearch } from "@/components/home/trip-search";

const heroImage = "https://images.unsplash.com/photo-1569096610945-1a094be04c74?auto=format&fit=crop&q=82&w=1600";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#102317] text-white">
      <Image src={heroImage} alt="Mehrangarh Fort in Jodhpur at golden hour" fill priority fetchPriority="high" sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,24,15,.92)_0%,rgba(8,28,16,.72)_42%,rgba(5,16,10,.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,19,10,.7)_0%,transparent_34%)]" />

      <div className="relative mx-auto grid min-h-[600px] max-w-[1180px] items-center gap-10 px-4 py-14 lg:grid-cols-[1fr_380px] lg:py-8">
        <div className="hero-intro max-w-[650px] py-6">
          <h1 className="font-serif text-[54px] font-bold leading-[0.98] tracking-[-0.035em] sm:text-[66px] lg:text-[76px]">
            Travel Anywhere<br /><span className="text-[#68a95e]">in India</span>
          </h1>
          <p className="mt-3 font-serif text-2xl font-semibold text-[#f1e0b4] sm:text-[27px]">From Jodhpur to Every Destination</p>
          <p className="mt-4 max-w-[620px] text-sm leading-7 text-white/88 sm:text-[15px]">Reliable taxi service for local sightseeing, Rajasthan tours, airport transfers and outstation travel across India. Safe. Comfortable. Always On Time.</p>

          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4 text-xs font-medium sm:text-[13px]">
            <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-[#e0bb4c]" />Local & Outstation</span>
            <span className="flex items-center gap-2"><span className="text-xl text-[#e0bb4c]">◆</span>All India Service</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#e0bb4c]" />Safe & Reliable</span>
            <span className="flex items-center gap-2"><Headphones className="h-5 w-5 text-[#e0bb4c]" />24/7 Support</span>
          </div>
        </div>

        <TripSearch />
      </div>
    </section>
  );
}
