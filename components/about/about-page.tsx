"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Car,
  Clock3,
  Headphones,
  HeartHandshake,
  MapPinned,
  Route,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import {
  FaFileInvoiceDollar,
  FaHeadset,
  FaMapMarkedAlt,
  FaRoute,
  FaTaxi,
  FaUserTie,
} from "react-icons/fa";
import { TripSearch } from "@/components/home/trip-search";
import { siteContact } from "@/lib/site-data";

const heroImage = "https://images.unsplash.com/photo-1569096610945-1a094be04c74?auto=format&fit=crop&q=86&w=2200";
const jodhpurClockTowerImage = "https://images.unsplash.com/photo-1677144702435-ef871adac31c?auto=format&fit=crop&q=84&w=1400";
const jodhpurStoryImage = "https://images.unsplash.com/photo-1569096610945-1a094be04c74?auto=format&fit=crop&q=84&w=1600";

const heroFeatures = [
  [MapPinned, "Local Expertise", "Deep knowledge of Rajasthan & India"],
  [ShieldCheck, "Reliable Service", "On-time, every time with safety"],
  [Car, "Comfortable Travel", "Well maintained vehicles"],
  [HeartHandshake, "Customer First", "Your satisfaction is our priority"],
] as const;

const promises = [
  [FaUserTie, "Experienced Drivers", "Courteous, professional and well-trained drivers who know the best routes."],
  [FaTaxi, "Well Maintained Vehicles", "Clean, comfortable and regularly serviced vehicles for a safe journey."],
  [FaMapMarkedAlt, "All India Coverage", "From Jodhpur to any destination across India — we’ve got you covered."],
  [FaFileInvoiceDollar, "Transparent Pricing", "No hidden charges. What we quote is what you pay."],
  [FaRoute, "Custom Itineraries", "Tailor-made packages and routes as per your requirement."],
  [FaHeadset, "24/7 Support", "We are always just a call away, before, during and after your journey."],
] as const;

const destinations = [
  ["Delhi", "https://images.unsplash.com/photo-1591689837200-57e6d0d7d199?auto=format&fit=crop&q=84&w=900"],
  ["Mumbai", "https://images.unsplash.com/photo-1598434192043-71111c1b3f41?auto=format&fit=crop&q=84&w=900"],
  ["Jaipur", "https://images.unsplash.com/photo-1578155173088-710a9aef3849?auto=format&fit=crop&q=84&w=900"],
  ["Udaipur", "https://images.unsplash.com/photo-1695956353120-54ce5e91632b?auto=format&fit=crop&q=84&w=900"],
  ["Varanasi", "https://images.unsplash.com/photo-1706186839147-0d708602587b?auto=format&fit=crop&q=84&w=900"],
  ["Manali", "https://images.unsplash.com/photo-1652543393354-2056fc3e9551?auto=format&fit=crop&q=84&w=900"],
] as const;

export function AboutPageContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#102317] text-white">
        <Image src={heroImage} alt="Mehrangarh Fort and Jodhpur city" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,23,14,.94)_0%,rgba(7,31,17,.78)_48%,rgba(8,17,12,.25)_100%)]" />
        <div className="relative mx-auto grid min-h-[540px] max-w-[1180px] items-center gap-10 px-4 py-10 lg:grid-cols-[1fr_380px]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="mb-7 flex items-center gap-2 text-xs text-white/75"><Link href="/" className="hover:text-white">Home</Link><span>›</span><span>About Us</span></div>
            <h1 className="font-serif text-5xl font-bold leading-none sm:text-6xl">About <span className="text-[#76ad66]">Rani Tours</span></h1>
            <div className="mt-4 flex items-center gap-2 text-[#d0ae58]"><span className="h-px w-20 bg-[#d0ae58]/60" /><span>❈</span></div>
            <h2 className="mt-5 max-w-[660px] font-serif text-2xl font-bold leading-snug text-[#f3dfa7]">Your trusted travel partner in Jodhpur,<br />for Rajasthan and every corner of India.</h2>
            <p className="mt-5 max-w-[690px] text-sm leading-7 text-white/85">Rani Tours is a leading taxi service based in Jodhpur, Rajasthan. We provide reliable, comfortable and affordable travel solutions for individuals, families, groups and corporate clients across Rajasthan and all over India.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {heroFeatures.map(([Icon, title, text]) => (
                <div key={title} className="flex gap-3 border-white/15 lg:border-r lg:pr-4 lg:last:border-r-0">
                  <Icon className="mt-0.5 h-7 w-7 shrink-0 text-[#9bc33c]" strokeWidth={1.7} />
                  <div><div className="text-xs font-bold">{title}</div><div className="mt-1 text-[10px] leading-4 text-white/65">{text}</div></div>
                </div>
              ))}
            </div>
          </motion.div>
          <TripSearch />
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-4 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="relative h-[320px] overflow-hidden rounded-2xl bg-[#eef1ea] shadow-xl sm:h-[390px]">
              <Image src={jodhpurClockTowerImage} alt="Ghanta Ghar clock tower and old city in Jodhpur" fill sizes="(max-width:1024px) 100vw, 520px" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092415]/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 right-5 rounded-2xl bg-[#076c32] px-7 py-6 text-center text-white shadow-xl">
              <div className="font-serif text-4xl font-bold">12+</div><div className="mt-1 text-[11px] leading-4">Years of<br />Experience</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#237643]">Who We Are</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#172c1c] sm:text-4xl">Your Journey, Our Responsibility</h2>
            <div className="mt-3 h-px w-20 bg-[#c8a75a]" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#535b53]">
              <p>While we specialize in Rajasthan tours, our services are not limited to any region.</p>
              <p>From Jodhpur to any destination across India, we ensure a smooth, comfortable and memorable journey.</p>
              <p>With experienced drivers, well-maintained vehicles and 24/7 support, we focus on delivering more than just rides — we deliver trust.</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-5 border-t border-[#eee5d8] pt-6 sm:grid-cols-4">
              <Stat icon={UsersRound} value="25,000+" label="Happy Customers" />
              <Stat icon={Car} value="500+" label="Vehicles" />
              <Stat icon={Route} value="100+" label="Destinations Across India" />
              <Stat icon={Clock3} value="12+" label="Years of Experience" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#fbf4ea] py-10">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-4 lg:grid-cols-[.78fr_1.22fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#237643]">Our Story</p>
            <div className="mt-2 h-px w-16 bg-[#c8a75a]" />
            <div className="mt-5 space-y-3 text-sm leading-6 text-[#4c534c]">
              <p>Started with a small fleet in Jodhpur, Rani Tours has grown into a trusted travel brand serving thousands of happy customers across India.</p>
              <p>Our journey is built on honesty, transparency and a passion for customer satisfaction.</p>
              <p>Today, we are proud to be a preferred choice for local travel, outstation trips, Rajasthan tours, airport transfers, corporate travel and long-distance journeys across the country.</p>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative min-h-[240px] overflow-hidden rounded-3xl border border-[#d8c8b5] shadow-sm sm:min-h-[285px]">
            <Image src={jodhpurStoryImage} alt="Mehrangarh Fort overlooking Jodhpur, the home of Rani Tours" fill sizes="(max-width:1024px) 100vw, 680px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a2516]/10 via-transparent to-[#0a2516]/35" />
            <div className="absolute bottom-5 right-5 rounded-2xl border border-white/25 bg-[#073c25]/85 px-6 py-4 text-right text-white backdrop-blur-sm">
              <div className="font-serif text-2xl font-bold">Jodhpur</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/75">Our Home • Your Gateway</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-[1180px] px-4">
          <div className="text-center"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#237643]">Why Choose Rani Tours?</p><h2 className="mt-2 font-serif text-3xl font-bold text-[#172c1c]">The Rani Tours Promise</h2></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {promises.map(([Icon, title, text], index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} whileHover={{ y: -4 }} className="rounded-2xl border border-[#ebe5db] bg-white p-5 text-center shadow-[0_10px_26px_rgba(54,45,32,.07)]">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#edf6e9] text-[#067131]"><Icon className="h-8 w-8" /></div>
                <h3 className="mt-4 font-serif text-sm font-bold text-[#1f3123]">{title}</h3><p className="mt-2 text-[10px] leading-[17px] text-[#656b65]">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9] pb-11">
        <div className="mx-auto max-w-[1180px] px-4">
          <div className="text-center"><h2 className="font-serif text-2xl font-bold text-[#1d2e21]">From Jodhpur to Every Corner of India</h2><div className="mx-auto mt-2 h-px w-16 bg-[#c8a75a]" /></div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {destinations.map(([name, image]) => <DestinationCard key={name} name={name} image={image} />)}
            <Link href="/destinations" className="flex min-h-[128px] flex-col items-center justify-center rounded-xl border border-dashed border-[#8ab58f] bg-[#f3f8f0] p-4 text-center text-[#075e2c] transition hover:-translate-y-1 hover:shadow-md"><MapPinned className="h-10 w-10" /><span className="mt-2 text-xs font-bold">And Many More<br />Destinations Across India</span></Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#eadfcf] bg-[#fbf4ea] py-4">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full bg-[#076c32] text-white"><Headphones className="h-6 w-6" /></div><div><div className="font-serif text-lg font-bold text-[#243424]">Need Help Planning Your Trip?</div><div className="text-[11px] text-[#687068]">Our travel experts are here to help you 24/7</div></div></div>
          <div className="flex flex-wrap justify-center gap-3"><a href={siteContact.phones[0].href} className="rounded-full border border-[#6b8f70] bg-white px-6 py-3 text-xs font-bold text-[#174f2b]">{siteContact.phones[0].display}</a><a href={siteContact.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#139d43] px-7 py-3 text-xs font-bold text-white">WhatsApp Us</a></div>
        </div>
      </section>
    </>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof UsersRound; value: string; label: string }) {
  return <div className="flex items-center gap-3"><Icon className="h-7 w-7 shrink-0 text-[#087239]" /><div><div className="font-serif text-lg font-bold text-[#1f2c21]">{value}</div><div className="text-[9px] leading-3 text-[#6a716a]">{label}</div></div></div>;
}

function DestinationCard({ name, image }: { name: string; image: string }) {
  return <Link href={`/destinations/${name.toLowerCase().replaceAll(" ", "-")}`} className="group"><div className="relative h-[96px] overflow-hidden rounded-xl"><Image src={image} alt={`${name} destination landmark`} fill sizes="(max-width:640px) 50vw, 170px" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" /></div><div className="mt-2 text-center text-xs font-semibold text-[#252d26]">{name}</div></Link>;
}
