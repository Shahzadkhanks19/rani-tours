"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BusFront, Car, CheckCircle2, Headphones, MapPinned, Plane, ShieldCheck, UsersRound } from "lucide-react";
import { GoogleReviewsSlider } from "@/components/home/google-reviews-slider";
import { siteContact } from "@/lib/site-data";

const stats = [
  [MapPinned, "12+", "Years Experience"],
  [UsersRound, "25,000+", "Happy Customers"],
  [Car, "500+", "Vehicles"],
  [MapPinned, "100+", "Destinations Across India"],
  [Headphones, "24/7", "Customer Support"],
  [ShieldCheck, "Safe & Reliable", "Trusted Always"],
] as const;

const services = [
  { title: "Local Services", text: "Sightseeing, airport pickup, railway station transfers and hotel drop services in Jodhpur", image: "https://images.unsplash.com/photo-1764243213897-45e6def5ad3e?auto=format&fit=crop&q=82&w=900", icon: MapPinned },
  { title: "Rajasthan Tours", text: "Explore Rajasthan&apos;s iconic destinations with comfort and care", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=82&w=900", icon: MapPinned },
  { title: "Outstation Taxi", text: "Taxi service for any destination across India — safe and reliable", image: "https://images.unsplash.com/photo-1650643683806-cdaf346a0bb2?auto=format&fit=crop&q=82&w=900", icon: Car },
  { title: "All India Taxi Service", text: "Travel anywhere in India with comfort, on time every time", image: "https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&q=82&w=900", icon: MapPinned },
  { title: "Airport & Railway Transfers", text: "Timely airport pickups and drop-offs to all major locations", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=82&w=900", icon: Plane },
  { title: "Corporate & Events", text: "Corporate travel, staff transport and event transportation solutions", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=82&w=900", icon: BusFront },
];

const packages = [
  { title: "Jodhpur Local Tour", meta: "1 Day", price: "₹1,999", image: "https://images.unsplash.com/photo-1569096610945-1a094be04c74?auto=format&fit=crop&q=82&w=900" },
  { title: "Jodhpur – Jaisalmer Tour", meta: "3 Days / 2 Nights", price: "₹7,999", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=82&w=900" },
  { title: "Rajasthan Heritage Tour", meta: "5 Days / 4 Nights", price: "₹18,999", image: "https://images.unsplash.com/photo-1764243213897-45e6def5ad3e?auto=format&fit=crop&q=82&w=900" },
  { title: "Udaipur – Jodhpur – Jaipur", meta: "6 Days / 5 Nights", price: "₹24,999", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=82&w=900" },
  { title: "All India Road Trip", meta: "Custom Plan", price: "Get Quote", image: "https://images.unsplash.com/photo-1650643683806-cdaf346a0bb2?auto=format&fit=crop&q=82&w=900" },
];

export function HomeSections() {
  return (
    <>
      <section className="bg-[#fffaf3] py-4">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-y-4 rounded-2xl border border-[#eadfce] bg-white/80 px-5 py-5 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
          {stats.map(([Icon, value, label], index) => (
            <motion.div key={label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="flex items-center gap-3 border-[#e8dfd3] px-2 lg:border-r lg:last:border-r-0">
              <Icon className="h-8 w-8 shrink-0 text-[#08762c]" strokeWidth={1.8} />
              <div><div className="text-lg font-bold leading-none text-[#1b241b]">{value}</div><div className="mt-1 text-[10px] leading-4 text-[#5f665f]">{label}</div></div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#fffdf9] py-8 sm:py-10">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading eyebrow="OUR SERVICES" title="Your Journey, Our Commitment" subtitle="From local rides to all India travel — we&apos;ve got you covered." />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article key={service.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ y: -5 }} className="overflow-hidden rounded-xl border border-[#e3ddd3] bg-white shadow-[0_8px_22px_rgba(48,44,34,.08)]">
                  <div className="relative h-28 overflow-hidden"><Image src={service.image} alt={service.title} fill sizes="(max-width:768px) 100vw, 190px" className="object-cover transition duration-500 hover:scale-105" /></div>
                  <div className="relative px-4 pb-4 pt-7 text-center">
                    <div className="absolute left-1/2 top-0 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-white text-[#08762c] shadow"><Icon className="h-6 w-6" /></div>
                    <h3 className="font-serif text-base font-bold text-[#213021]">{service.title}</h3>
                    <p className="mt-2 min-h-[54px] text-[11px] leading-[18px] text-[#666]">{service.text}</p>
                    <Link href="/taxi-services" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#08762c]">Explore <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9] pb-8">
        <div className="mx-auto max-w-[1180px] px-4">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#236b3b]">Popular Tour Packages</p><h2 className="font-serif text-3xl font-bold text-[#17341f]">Handpicked Journeys Across India</h2></div>
            <Link href="/tour-packages" className="hidden rounded-full border border-[#15813d] px-4 py-2 text-xs font-bold text-[#086b2d] sm:inline-flex">View All Packages</Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {packages.map((item, index) => (
              <motion.article key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="overflow-hidden rounded-xl border border-[#e2ddd4] bg-white shadow-sm">
                <div className="relative h-32"><Image src={item.image} alt={item.title} fill sizes="(max-width:768px) 100vw, 230px" className="object-cover" /></div>
                <div className="p-3"><h3 className="font-serif text-sm font-bold">{item.title}</h3><div className="mt-3 flex items-center justify-between gap-2"><span className="rounded bg-[#078033] px-2 py-1 text-[10px] font-bold text-white">{item.meta}</span><span className="text-[10px] text-[#6f6f6f]">From <strong className="text-[#222]">{item.price}</strong></span></div></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f9f0e5] py-8">
        <div className="absolute inset-y-0 right-0 hidden w-[28%] bg-[radial-gradient(circle_at_center,#e5b46f_0,transparent_68%)] opacity-30 lg:block" />
        <div className="relative mx-auto grid max-w-[1180px] gap-8 px-4 lg:grid-cols-[.9fr_1.2fr]">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#17341f]">WHY CHOOSE RANI TOURS</h2>
            <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {["Experienced & Professional Drivers", "24/7 Customer Support", "Well Maintained & Sanitized Vehicles", "All India Coverage", "Transparent Pricing – No Hidden Charges", "On-Time Pickup & Drop", "Safe & Comfortable Travel", "Custom Itineraries as per Need"].map((item) => <div key={item} className="flex items-start gap-2 text-xs text-[#3f463f]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 fill-[#15913e] text-white" />{item}</div>)}
            </div>
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#17341f]">WHAT OUR CUSTOMERS SAY</h2>
            <div className="mt-4"><GoogleReviewsSlider /></div>
          </div>
        </div>
      </section>

      <section className="bg-[#005728] py-4 text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#006837]"><Headphones className="h-6 w-6" /></div><div><div className="font-serif text-lg font-bold">Need a Ride or Plan a Trip?</div><div className="text-xs text-white/80">We&apos;re just a call away</div></div></div>
          <div className="flex flex-wrap justify-center gap-3"><a href={siteContact.phones[0].href} className="rounded-full bg-[#f4cf5e] px-7 py-3 text-sm font-bold text-[#0d4223]">☎ {siteContact.phones[0].display}</a><a href={siteContact.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#1ca443] px-7 py-3 text-sm font-bold">WhatsApp Us</a></div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return <div className="text-center"><div className="flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#285c36]"><span className="h-px w-9 bg-[#bc9c59]/70" />{eyebrow}<span className="h-px w-9 bg-[#bc9c59]/70" /></div><h2 className="mt-1 font-serif text-3xl font-bold text-[#17341f]">{title}</h2><p className="mt-1 text-xs text-[#666]">{subtitle}</p></div>;
}
