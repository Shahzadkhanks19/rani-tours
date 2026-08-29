import Image from "next/image";
import Link from "next/link";
import { Car, Headphones, IndianRupee, ShieldCheck } from "lucide-react";
import { GalleryGrid, type PublicGalleryItem } from "@/components/gallery/gallery-grid";
import { SiteCta } from "@/components/layout/site-cta";
import { publicImageUrl } from "@/lib/public-image";

export type { PublicGalleryItem } from "@/components/gallery/gallery-grid";

const fallbackHero="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=76&w=1600";
const trustItems=[[ShieldCheck,"Trusted & Reliable","Thousands of happy customers trust us for their journeys."],[IndianRupee,"Transparent Quotations","Clear quotations with no hidden surprises."],[Car,"Comfort & Safety","Well-maintained vehicles for a safe journey."],[Headphones,"24/7 Travel Support","Our team is always here to assist you anytime."]] as const;

export function GalleryPageContent({items}:{items:PublicGalleryItem[]}){
  const heroItem=items.find(item=>item.featured&&item.category==="Destinations")||items.find(item=>item.category==="Destinations")||items[0];
  const heroImage=publicImageUrl(heroItem?.src||fallbackHero,1200);
  const heroAlt=heroItem?.alt||"Scenic travel destination in India";

  return <>
    <section className="relative overflow-hidden bg-[#f6f5f0]"><Image src={heroImage} alt={heroAlt} fill priority fetchPriority="high" quality={60} sizes="100vw" className="object-cover object-center"/><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.98)_0%,rgba(255,255,255,.9)_34%,rgba(255,255,255,.28)_68%,rgba(255,255,255,.08)_100%)]"/><div className="relative mx-auto flex min-h-[370px] max-w-[1180px] items-center px-4 py-12"><div className="max-w-[570px]"><div className="flex items-center gap-2 text-xs text-[#536054]"><Link href="/" className="transition hover:text-[#0b6531]">Home</Link><span>›</span><span>Gallery</span></div><h1 className="hero-reveal mt-6 font-serif text-5xl font-bold text-[#17341f] sm:text-6xl">Our Gallery</h1><h2 className="hero-reveal mt-2 font-serif text-3xl font-bold text-[#c67b22] [animation-delay:80ms]">Moments. Places. Memories.</h2><div className="mt-4 flex items-center gap-3 text-[#d6a63a]"><span className="h-px w-8 bg-current"/><span>✤</span><span className="h-px w-8 bg-current"/></div><p className="mt-5 max-w-[500px] text-sm leading-7 text-[#313b31]">A glimpse of beautiful destinations, our vehicle fleet and memorable road journeys with Rani Tour&apos;s across Rajasthan and India.</p></div></div></section>
    <GalleryGrid items={items}/>
    <section className="defer-render bg-white pb-10 pt-3"><div className="mx-auto max-w-[1180px] px-4"><div className="text-center"><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#315d3b]">Why Travel with Rani Tour&apos;s?</p><div className="mx-auto mt-3 flex items-center justify-center gap-3 text-[#d6a63a]"><span className="h-px w-9 bg-current"/><span>✤</span><span className="h-px w-9 bg-current"/></div></div><div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{trustItems.map(([Icon,title,text],index)=><div key={title} className={`flex gap-4 ${index<trustItems.length-1?"lg:border-r lg:border-[#e6e0d7] lg:pr-5":""}`}><div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#97ae9b] text-[#0b6531]"><Icon className="h-5 w-5"/></div><div><h3 className="text-sm font-bold text-[#1d3021]">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#687068]">{text}</p></div></div>)}</div></div></section>
    <SiteCta/>
  </>;
}
