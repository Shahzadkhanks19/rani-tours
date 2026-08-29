"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CalendarDays, Camera, Car, Grid3X3, Mountain, UsersRound } from "lucide-react";
import { publicImageUrl } from "@/lib/public-image";

export type Category="All Photos"|"Destinations"|"Vehicles"|"Happy Travelers"|"Travel Moments"|"Events";
export type PublicGalleryItem={id:string;title:string;src:string;alt:string;category:Exclude<Category,"All Photos">;caption:string;location:string;featured:boolean};

const categories:{label:Category;icon:typeof Grid3X3}[]=[
  {label:"All Photos",icon:Grid3X3},
  {label:"Destinations",icon:Mountain},
  {label:"Vehicles",icon:Car},
  {label:"Happy Travelers",icon:UsersRound},
  {label:"Travel Moments",icon:Camera},
  {label:"Events",icon:CalendarDays},
];

export function GalleryGrid({items}:{items:PublicGalleryItem[]}){
  const[activeCategory,setActiveCategory]=useState<Category>("All Photos");
  const filteredItems=useMemo(()=>activeCategory==="All Photos"?items:items.filter(item=>item.category===activeCategory),[activeCategory,items]);

  return <>
    <section className="border-y border-[#eee7dc] bg-[#fff8ed] py-4">
      <div className="mx-auto flex max-w-[1180px] gap-3 overflow-x-auto px-4 pb-1 sm:justify-center">
        {categories.map(({label,icon:Icon})=>{
          const active=activeCategory===label;
          const count=label==="All Photos"?items.length:items.filter(item=>item.category===label).length;
          return <button key={label} type="button" onClick={()=>setActiveCategory(label)} className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold transition ${active?"border-[#0b6531] bg-[#0b6531] text-white shadow-sm":"border-[#ddd7cd] bg-white text-[#26352a] hover:border-[#7da082] hover:text-[#0b6531]"}`} aria-pressed={active}><Icon className="h-4 w-4"/>{label}<span className={`rounded-full px-1.5 py-0.5 text-[9px] ${active?"bg-white/15":"bg-[#edf5e8] text-[#0b6531]"}`}>{count}</span></button>;
        })}
      </div>
    </section>
    <section className="defer-render bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-[1180px] px-4">
        {filteredItems.length?<div key={activeCategory} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{filteredItems.map((item,index)=>{
          const imageSrc=publicImageUrl(item.src,index%5===0?900:640);
          return <figure key={item.id} className={`gallery-reveal group relative overflow-hidden rounded-2xl bg-[#f4f3ef] ${index%5===0?"sm:row-span-2 sm:min-h-[430px]":"min-h-[210px]"}`} style={{animationDelay:`${Math.min(index*20,120)}ms`}}><Image src={imageSrc} alt={item.alt} fill quality={60} sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" className="object-cover transition duration-500 group-hover:scale-[1.04]"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-60 transition group-hover:opacity-80"/><figcaption className="absolute inset-x-0 bottom-0 p-4 text-white"><span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.12em] backdrop-blur">{item.category}</span><h3 className="mt-2 font-serif text-lg font-bold leading-tight">{item.title}</h3>{item.location?<p className="mt-1 text-[10px] text-white/80">{item.location}</p>:null}{item.caption?<p className="mt-2 line-clamp-2 text-[10px] leading-4 text-white/75 opacity-0 transition group-hover:opacity-100">{item.caption}</p>:null}</figcaption></figure>;
        })}</div>:<div className="rounded-2xl border border-dashed border-[#a8b9a5] bg-[#f7faf5] px-6 py-16 text-center"><Camera className="mx-auto h-9 w-9 text-[#0b6531]"/><h2 className="mt-4 font-serif text-2xl font-bold text-[#17341f]">Gallery is being updated</h2><p className="mt-2 text-sm text-[#687068]">Published photos from the Gallery CMS will appear here.</p></div>}
      </div>
    </section>
  </>;
}
