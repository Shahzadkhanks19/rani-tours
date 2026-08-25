"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CalendarDays,
  Camera,
  Car,
  Grid3X3,
  Headphones,
  ImageIcon,
  IndianRupee,
  Mountain,
  Phone,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { siteContact } from "@/lib/site-data";

type Category = "All Photos" | "Destinations" | "Vehicles" | "Happy Travelers" | "Travel Moments" | "Events";

type GalleryItem = {
  src: string;
  alt: string;
  category: Exclude<Category, "All Photos">;
};

const heroImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=88&w=2200";

const categories: { label: Category; icon: typeof Grid3X3 }[] = [
  { label: "All Photos", icon: Grid3X3 },
  { label: "Destinations", icon: Mountain },
  { label: "Vehicles", icon: Car },
  { label: "Happy Travelers", icon: UsersRound },
  { label: "Travel Moments", icon: Camera },
  { label: "Events", icon: CalendarDays },
];

const galleryItems: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1566837497312-7be4f4a7e20d?auto=format&fit=crop&q=86&w=1200",
    alt: "Lake and mountain destination",
    category: "Destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&q=86&w=1200",
    alt: "Travelers enjoying a mountain sunset",
    category: "Happy Travelers",
  },
  {
    src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=86&w=1200",
    alt: "White tourist vehicle on a scenic road",
    category: "Vehicles",
  },
  {
    src: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=86&w=1200",
    alt: "Traditional evening ceremony and celebration",
    category: "Events",
  },
  {
    src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=86&w=1200",
    alt: "Rajasthan heritage architecture",
    category: "Destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=86&w=1200",
    alt: "Friends traveling together",
    category: "Happy Travelers",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=86&w=1200",
    alt: "Peaceful beach destination",
    category: "Destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=86&w=1200",
    alt: "Travelers gathered around a campfire",
    category: "Travel Moments",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2024%20Toyota%20Innova%202.8%20V%20in%20White%20Pearl%20Crystal%20Shine%2C%20front%20left.jpg",
    alt: "White Toyota Innova Crysta",
    category: "Vehicles",
  },
  {
    src: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=86&w=1200",
    alt: "Traveler overlooking a green mountain valley",
    category: "Travel Moments",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=86&w=1200",
    alt: "Comfortable hotel stay during a journey",
    category: "Travel Moments",
  },
  {
    src: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=86&w=1200",
    alt: "Mehrangarh Fort and Jodhpur city",
    category: "Destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&q=86&w=1200",
    alt: "Travelers enjoying a snowy destination",
    category: "Happy Travelers",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=86&w=1200",
    alt: "Mountain lake travel scenery",
    category: "Destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=86&w=1200",
    alt: "Festival and event lights",
    category: "Events",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moscow%20-%202025%20-%20White%20tour%20bus.jpg",
    alt: "White tourist coach",
    category: "Vehicles",
  },
];

const trustItems = [
  [ShieldCheck, "Trusted & Reliable", "Thousands of happy customers trust us for their journeys."],
  [IndianRupee, "Best Price Guarantee", "Transparent quotations with no hidden charges."],
  [Car, "Comfort & Safety", "Well-maintained vehicles for a safe journey."],
  [Headphones, "24/7 Travel Support", "Our team is always here to assist you anytime."],
] as const;

export function GalleryPageContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All Photos");

  const filteredItems = useMemo(
    () =>
      activeCategory === "All Photos"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <section className="relative overflow-hidden bg-[#f6f5f0]">
        <Image
          src={heroImage}
          alt="Scenic mountain travel landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.98)_0%,rgba(255,255,255,.9)_34%,rgba(255,255,255,.28)_68%,rgba(255,255,255,.08)_100%)]" />
        <div className="relative mx-auto flex min-h-[370px] max-w-[1180px] items-center px-4 py-12">
          <div className="max-w-[570px]">
            <div className="flex items-center gap-2 text-xs text-[#536054]">
              <Link href="/" className="transition hover:text-[#087239]">Home</Link>
              <span>›</span>
              <span>Gallery</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 font-serif text-5xl font-bold text-[#17341f] sm:text-6xl"
            >
              Our Gallery
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-2 font-serif text-3xl font-bold text-[#d98200]"
            >
              Moments. Places. Memories.
            </motion.h2>
            <div className="mt-4 flex items-center gap-3 text-[#d69a28]">
              <span className="h-px w-8 bg-current" />
              <span>✤</span>
              <span className="h-px w-8 bg-current" />
            </div>
            <p className="mt-5 max-w-[500px] text-sm leading-7 text-[#313b31]">
              A glimpse of beautiful destinations, memorable road journeys and travel experiences with Rani Tour&apos;s across Rajasthan and India.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#eee7dc] bg-[#fffaf2] py-4">
        <div className="mx-auto flex max-w-[1180px] gap-3 overflow-x-auto px-4 pb-1 sm:justify-center">
          {categories.map(({ label, icon: Icon }) => {
            const active = activeCategory === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setActiveCategory(label)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold transition ${
                  active
                    ? "border-[#07582d] bg-[#07582d] text-white shadow-sm"
                    : "border-[#ddd7cd] bg-white text-[#26352a] hover:border-[#7da082] hover:text-[#07582d]"
                }`}
                aria-pressed={active}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-[1180px] px-4">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {filteredItems.map((item, index) => (
                <motion.figure
                  layout
                  key={`${item.src}-${item.category}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, delay: Math.min(index * 0.02, 0.12) }}
                  className={`group relative overflow-hidden rounded-2xl bg-[#f4f3ef] ${
                    index % 5 === 0 ? "sm:row-span-2 sm:min-h-[430px]" : "min-h-[210px]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized={item.src.includes("wikimedia.org")}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <figcaption className="absolute bottom-3 left-3 translate-y-2 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#21402a] opacity-0 shadow-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.category}
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-white px-4 pb-7">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-5 rounded-2xl bg-[#004523] px-6 py-6 text-white sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#fff5e5] text-[#064d29]">
              <ImageIcon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold sm:text-2xl">
                Ready to Create <span className="text-[#f0b11a]">Your Own Memories?</span>
              </h2>
              <p className="mt-1 text-xs leading-5 text-white/75">Let us plan the perfect journey for you. Reliable rides. Memorable journeys.</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/tour-packages" className="rounded-lg border border-[#e8aa17] px-5 py-3 text-xs font-bold text-[#ffc331] transition hover:bg-[#e8aa17] hover:text-[#12351f]">
              Explore Packages →
            </Link>
            <a href={siteContact.phones[0].href} className="flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-xs font-bold transition hover:bg-white/10">
              <Phone className="h-4 w-4" /> Talk to Expert
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white pb-10 pt-3">
        <div className="mx-auto max-w-[1180px] px-4">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#315d3b]">Why Travel with Rani Tour&apos;s?</p>
            <div className="mx-auto mt-3 flex items-center justify-center gap-3 text-[#d69a28]">
              <span className="h-px w-9 bg-current" /><span>✤</span><span className="h-px w-9 bg-current" />
            </div>
          </div>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map(([Icon, title, text], index) => (
              <div key={title} className={`flex gap-4 ${index < trustItems.length - 1 ? "lg:border-r lg:border-[#e6e0d7] lg:pr-5" : ""}`}>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#97ae9b] text-[#0a6330]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1d3021]">{title}</h3>
                  <p className="mt-1 text-[11px] leading-5 text-[#687068]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
