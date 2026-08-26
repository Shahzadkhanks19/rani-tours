import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, CheckCircle2, Headphones, Luggage, MapPin, Phone, Route, ShieldCheck, Sparkles, UsersRound, X } from "lucide-react";
import { siteContact } from "@/lib/site-data";

type Img={url:string;alt?:string};
type Stop={time:string;title:string};
type Day={day:number;title:string;description?:string;image?:Img|null;stops?:Stop[]};
type Faq={question:string;answer:string};
type Package={title:string;slug:string;category:string;location:string;shortDescription:string;overview?:string;heroImage:Img;gallery?:Img[];durationDays:number;durationNights:number;approximateDistanceKm?:number;popularAttractions?:number;tourType?:string;flexibleItinerary?:boolean;customizable?:boolean;highlights?:string[];itinerary?:Day[];itineraryNote?:string;inclusions?:string[];exclusions?:string[];faq?:Faq[]};
type Fleet={_id:string;name:string;modelLabel?:string;image?:Img;seatCount?:number;seatingLabel?:string;luggageCount?:number;luggageLabel?:string;ac?:boolean};
type Related={_id:string;title:string;slug:string;category:string;location:string;shortDescription:string;durationDays:number;durationNights:number;heroImage:Img};

export function TourPackageDetail({pkg,fleet,related}:{pkg:Package;fleet:Fleet[];related:Related[]}){
  const seen=new Set<string>([pkg.heroImage.url]);
  const uniqueImage=(img?:Img|null)=>{if(!img?.url||seen.has(img.url))return null;seen.add(img.url);return img};
  const itinerary=(pkg.itinerary||[]).map((item)=>({...item,image:uniqueImage(item.image)}));
  const gallery=(pkg.gallery||[]).map((img)=>uniqueImage(img)).filter(Boolean) as Img[];
  const perfectFor=(pkg.highlights||[]).slice(0,4);
  const isHeritage=pkg.slug==="rajasthan-heritage-tour";
  const heroFeatures=getHeroFeatures(pkg);

  return <div className="bg-white text-[#17341f]">
    <section className="relative isolate overflow-hidden bg-[#073d25] text-white">
      <Image src={pkg.heroImage.url} alt={pkg.heroImage.alt||pkg.title} fill priority className="object-cover object-center"/>
      <div className="absolute inset-0 bg-gradient-to-r from-[#071d16]/94 via-[#082a1d]/72 to-[#071d16]/38"/>
      <div className="relative mx-auto grid min-h-[520px] max-w-[1180px] gap-8 px-4 py-8 lg:grid-cols-[1.28fr_.72fr] lg:items-center lg:py-10">
        <div className="self-stretch py-3 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-white/72"><Link href="/">Home</Link><span>›</span><Link href="/tour-packages">Tour Packages</Link><span>›</span><span>{pkg.title}</span></div>
            <div className="mt-10 max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#e3b539]">{pkg.category}</p>
              <h1 className="mt-2 font-serif text-[40px] font-black leading-[1.05] sm:text-5xl lg:text-[58px]">{pkg.title}</h1>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-white/92"><span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4 text-[#efb326]"/>{pkg.durationDays} Days / {pkg.durationNights} Nights</span><span className="inline-flex items-center gap-1.5"><MapPin className="size-4 text-[#efb326]"/>{pkg.location}</span>{pkg.customizable?<span className="inline-flex items-center gap-1.5"><Sparkles className="size-4 text-[#efb326]"/>Customizable</span>:null}</div>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/88">{pkg.shortDescription}</p>
            </div>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-3xl">{heroFeatures.map(({icon:Icon,title})=><div key={title} className="border-r border-white/18 px-1 last:border-r-0"><Icon className="size-6 text-[#efb326]"/><p className="mt-2 text-[11px] font-bold leading-4 text-white">{title}</p></div>)}</div>
        </div>
        <EnquiryCard />
      </div>
    </section>

    <section className="relative z-10 mx-auto -mt-1 max-w-[1180px] px-4">
      <div className="grid overflow-hidden rounded-2xl border border-[#17341f]/10 bg-white shadow-[0_14px_38px_rgba(27,55,35,.10)] sm:grid-cols-2 lg:grid-cols-6">
        <OverviewLead image={pkg.heroImage} />
        <OverviewFact icon={CalendarDays} value={`${pkg.durationDays} Days / ${pkg.durationNights} Nights`} label="Duration"/>
        <OverviewFact icon={Route} value={pkg.approximateDistanceKm?`${pkg.approximateDistanceKm}+ KM`:"Flexible"} label="Total Distance (Approx.)"/>
        <OverviewFact icon={MapPin} value={pkg.popularAttractions?`${pkg.popularAttractions}+`:"Multiple"} label="Top Attractions"/>
        <OverviewFact icon={UsersRound} value={pkg.tourType||"Private Tour"} label="Only for You"/>
        <OverviewFact icon={CalendarDays} value={pkg.flexibleItinerary?"Customizable":"Planned"} label="Itinerary"/>
      </div>
    </section>

    <section className="py-12 lg:py-14">
      <div className="mx-auto max-w-[1180px] px-4">
        <SectionHeading eyebrow={journeyEyebrow(pkg)} title={itineraryTitle(pkg)}/>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.45fr_.75fr]">
          <div>
            <div className="relative space-y-3 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-px before:bg-[#0c7740]/35 md:before:left-[13px]">
              {itinerary.map((item)=><article key={item.day} className="relative pl-9 md:pl-8"><span className="absolute left-[9px] top-6 z-10 size-3 rounded-full border-2 border-white bg-[#08713b] shadow-[0_0_0_1px_#08713b] md:left-[7px]"/><div className="grid overflow-hidden rounded-xl border border-[#17341f]/9 bg-[#fbfcf9] shadow-sm sm:grid-cols-[190px_1fr]">{item.image?<div className="relative min-h-[175px]"><Image src={item.image.url} alt={item.image.alt||item.title} fill className="object-cover"/></div>:null}<div className="p-4"><div className="flex items-center gap-3"><span className="rounded-full bg-[#0a713b] px-3 py-1 text-[10px] font-black text-white">Day {item.day}</span><h3 className="text-[14px] font-black">{item.title}</h3></div>{item.stops?.length?<div className="mt-3 space-y-1.5">{item.stops.map((s,index)=><div key={`${s.time}-${s.title}-${index}`} className="grid grid-cols-[72px_1fr] gap-2 text-[10.5px] leading-4"><span className="font-black text-[#17341f]">{s.time}</span><span className="text-[#4e5f53]">{s.title}</span></div>)}</div>:item.description?<p className="mt-3 text-xs leading-5 text-[#657269]">{item.description}</p>:null}</div></div></article>)}
            </div>
            {pkg.itineraryNote?<div className="ml-8 mt-4 rounded-lg border border-[#eccb78]/50 bg-[#fff7e5] px-4 py-3 text-xs text-[#554d3b]"><b>Note:</b> {pkg.itineraryNote}</div>:null}
          </div>
          <aside className="space-y-4"><ListCard title="Package Inclusions" items={pkg.inclusions||[]} positive/><ListCard title="Package Exclusions" items={pkg.exclusions||[]}/>{perfectFor.length?<PerfectFor items={perfectFor}/>:null}</aside>
        </div>
      </div>
    </section>

    {fleet.length?<section className="border-y border-[#17341f]/8 bg-[#fbfcf8] py-11"><div className="mx-auto max-w-[1180px] px-4"><SectionHeading eyebrow="Our Vehicles for Your Comfort" title={fleetTitle(pkg)}/><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{fleet.slice(0,6).map((v)=><article key={v._id} className="overflow-hidden rounded-xl border border-[#17341f]/9 bg-white shadow-sm"><div className="relative h-32">{v.image?.url?<Image src={v.image.url} alt={v.image.alt||v.name} fill className="object-contain p-2"/>:null}</div><div className="border-t border-[#17341f]/8 p-3 text-center"><h3 className="text-xs font-black">{v.name}</h3><p className="mt-1 text-[9px] text-[#748078]">{v.modelLabel}</p><div className="mt-2 flex items-center justify-center gap-4 text-[9px] font-bold text-[#657269]"><span className="inline-flex items-center gap-1"><UsersRound className="size-3"/>{v.seatingLabel||`${v.seatCount||"—"}`}</span><span className="inline-flex items-center gap-1"><Luggage className="size-3"/>{v.luggageLabel||v.luggageCount||"—"}</span></div></div></article>)}</div></div></section>:null}

    {isHeritage&&gallery.length?<section className="mx-auto max-w-[1180px] px-4 py-11"><SectionHeading eyebrow="Gallery" title="Tour Highlights in Pictures"/><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{gallery.slice(0,5).map((img,index)=><div key={`${img.url}-${index}`} className="relative h-36 overflow-hidden rounded-xl"><Image src={img.url} alt={img.alt||`${pkg.title} gallery`} fill className="object-cover transition duration-500 hover:scale-105"/></div>)}</div></section>:null}

    <section className="mx-auto max-w-[1180px] px-4 py-10"><p className="text-center text-[10px] font-black uppercase tracking-[.18em] text-[#08713b]">Why Choose Rani Tours?</p><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><Why icon={ShieldCheck} title="Trusted & Reliable" text="Thousands of happy travellers trust us for comfortable journeys."/><Why icon={CheckCircle2} title="Clear Planning" text="Routes and inclusions are discussed clearly before your journey."/><Why icon={Route} title="Comfort & Safety" text="Well-maintained vehicles and experienced drivers for a safe trip."/><Why icon={Headphones} title="24/7 Support" text="Our team is available to assist throughout your travel experience."/></div></section>

    {isHeritage&&related.length?<section className="bg-[#fbfcf8] py-11"><div className="mx-auto max-w-[1180px] px-4"><SectionHeading eyebrow="You May Also Like" title="More Rajasthan Journeys"/><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{related.slice(0,4).map((item)=><Link key={item._id} href={`/tour-packages/${item.slug}`} className="group overflow-hidden rounded-xl border border-[#17341f]/8 bg-white shadow-sm"><div className="relative h-36"><Image src={item.heroImage.url} alt={item.heroImage.alt||item.title} fill className="object-cover transition duration-500 group-hover:scale-105"/></div><div className="p-4"><h3 className="font-serif text-base font-black">{item.title}</h3><p className="mt-1 text-[10px] text-[#69756c]">{item.durationDays} Days / {item.durationNights} Nights</p><span className="mt-3 inline-flex items-center gap-1 text-[10px] font-black text-[#08713b]">View Details <ArrowRight className="size-3"/></span></div></Link>)}</div></div></section>:null}

    <section className="bg-[#073d25] py-7 text-white"><div className="mx-auto flex max-w-[1180px] flex-col gap-5 px-4 md:flex-row md:items-center md:justify-between"><div><h2 className="font-serif text-2xl font-black">{ctaTitle(pkg)}</h2><p className="mt-1 text-xs text-white/72">Send your travel dates and preferences and our team will help plan your journey.</p></div><div className="flex flex-wrap gap-3"><a href={siteContact.phones[0].href} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black text-[#073d25]"><Phone className="size-4 text-[#e49b16]"/>{siteContact.phones[0].display}</a><a href={siteContact.whatsapp} className="rounded-full bg-[#08713b] px-5 py-2.5 text-xs font-black text-white ring-1 ring-white/15">WhatsApp Us</a></div></div></section>
  </div>
}

function EnquiryCard(){const field="h-11 w-full rounded-lg border border-[#17341f]/12 bg-[#fbfcfa] px-3 text-xs outline-none transition focus:border-[#08713b] focus:ring-2 focus:ring-[#08713b]/10";return <aside className="rounded-[20px] bg-white p-5 text-[#17341f] shadow-[0_18px_60px_rgba(0,0,0,.22)] lg:p-6"><div className="text-center"><h2 className="font-serif text-2xl font-black text-[#0b5d34]">Book This Package</h2><div className="mx-auto mt-2 h-px w-16 bg-[#e4ad2f]"/></div><form action="/get-quote" method="get" className="mt-5 grid gap-3"><label className="text-[10px] font-bold">Travel Date<input name="date" className={`${field} mt-1`} placeholder="Select date"/></label><div className="grid grid-cols-2 gap-3"><label className="text-[10px] font-bold">No. of Adults<input name="adults" className={`${field} mt-1`} placeholder="Select adults"/></label><label className="text-[10px] font-bold">No. of Children<input name="children" className={`${field} mt-1`} placeholder="Select children"/></label></div><label className="text-[10px] font-bold">Pickup Location<input name="pickup" className={`${field} mt-1`} placeholder="Enter pickup location"/></label><button className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#08713b] text-xs font-black text-white">Enquire Now <ArrowRight className="size-4"/></button></form><div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-black"><a href={siteContact.whatsapp} className="text-[#08713b]">WhatsApp Us</a><span className="h-4 w-px bg-black/12"/><a href={siteContact.phones[0].href}>{siteContact.phones[0].display}</a></div></aside>}
function OverviewLead({image}:{image:Img}){return <div className="flex items-center gap-3 border-b border-[#17341f]/8 p-4 sm:border-b-0 sm:border-r"><div className="relative size-11 shrink-0 overflow-hidden rounded-full"><Image src={image.url} alt={image.alt||"Tour package"} fill className="object-cover"/></div><div><p className="text-[10px] font-bold text-[#738078]">Package</p><p className="font-serif text-base font-black">Overview</p></div></div>}
function OverviewFact({icon:Icon,value,label}:{icon:typeof CalendarDays;value:string;label:string}){return <div className="flex items-center gap-3 border-b border-[#17341f]/8 p-4 sm:border-r lg:border-b-0"><Icon className="size-5 shrink-0 text-[#eea718]"/><div><p className="text-[11px] font-black">{value}</p><p className="mt-0.5 text-[9px] text-[#778179]">{label}</p></div></div>}
function SectionHeading({eyebrow,title}:{eyebrow:string;title:string}){return <div className="text-center"><p className="text-[9px] font-black uppercase tracking-[.17em] text-[#08713b]">{eyebrow}</p><h2 className="mt-1 font-serif text-2xl font-black sm:text-[30px]">{title}</h2><div className="mx-auto mt-2 h-px w-14 bg-[#e3ae2e]"/></div>}
function ListCard({title,items,positive=false}:{title:string;items:string[];positive?:boolean}){return <div className="rounded-xl border border-[#17341f]/9 bg-white p-5 shadow-sm"><h3 className={`text-center font-serif text-lg font-black ${positive?"text-[#08713b]":"text-[#d33d35]"}`}>{title}</h3><div className="mx-auto mt-2 h-px w-10 bg-[#e3ae2e]"/><div className="mt-4 space-y-2">{items.map((item,index)=>{const Icon=positive?Check:X;return <div key={`${item}-${index}`} className="flex gap-2 text-[11px] leading-5 text-[#4f5e53]"><Icon className={`mt-1 size-3 shrink-0 ${positive?"text-[#08713b]":"text-[#e24039]"}`}/><span>{item}</span></div>})}</div></div>}
function PerfectFor({items}:{items:string[]}){return <div className="rounded-xl border border-[#e3b54f]/35 bg-[#fff9eb] p-5"><h3 className="text-center font-serif text-lg font-black text-[#17341f]">Perfect For</h3><div className="mt-4 grid grid-cols-2 gap-3">{items.map((x)=><div key={x} className="text-center"><span className="mx-auto grid size-9 place-items-center rounded-full bg-white text-[#08713b]"><UsersRound className="size-4"/></span><p className="mt-2 text-[10px] font-bold leading-4">{x}</p></div>)}</div></div>}
function Why({icon:Icon,title,text}:{icon:typeof ShieldCheck;title:string;text:string}){return <article className="text-center"><span className="mx-auto grid size-12 place-items-center rounded-full border border-[#08713b]/30 text-[#08713b]"><Icon className="size-5"/></span><h3 className="mt-3 text-xs font-black">{title}</h3><p className="mt-1.5 text-[10px] leading-4 text-[#69756c]">{text}</p></article>}
function getHeroFeatures(pkg:Package){const lower=`${pkg.slug} ${pkg.category}`.toLowerCase();if(lower.includes("honeymoon"))return[{icon:Sparkles,title:"Romantic Experiences"},{icon:CheckCircle2,title:"Handpicked Stays"},{icon:Route,title:"Private Travel"},{icon:Headphones,title:"24/7 Travel Support"}];if(lower.includes("wildlife"))return[{icon:Sparkles,title:"Wildlife Safari Experience"},{icon:UsersRound,title:"Expert Local Guidance"},{icon:CheckCircle2,title:"Comfortable Stays"},{icon:Headphones,title:"24/7 Travel Support"}];if(lower.includes("family"))return[{icon:UsersRound,title:"Family Friendly Itinerary"},{icon:CheckCircle2,title:"Comfortable Stays"},{icon:Route,title:"Spacious Vehicles"},{icon:Headphones,title:"24/7 Travel Support"}];if(lower.includes("desert"))return[{icon:Sparkles,title:"Desert Safari Experience"},{icon:UsersRound,title:"Cultural Experiences"},{icon:CheckCircle2,title:"Comfortable Travel"},{icon:Headphones,title:"24/7 Travel Support"}];return[{icon:Route,title:"Comfortable Vehicles"},{icon:UsersRound,title:"Experienced Drivers"},{icon:ShieldCheck,title:"Safe & Secure Journey"},{icon:Headphones,title:"24/7 Customer Support"}]}
function journeyEyebrow(pkg:Package){if(pkg.slug.includes("honeymoon"))return"Your Honeymoon Journey";if(pkg.slug.includes("desert"))return"Your Desert Journey Plan";if(pkg.slug.includes("family"))return"Your Family Journey Plan";if(pkg.slug.includes("luxury"))return"Your Luxury Journey Plan";return"Your Journey Plan"}
function itineraryTitle(pkg:Package){return `${pkg.title} Itinerary`}
function fleetTitle(pkg:Package){if(pkg.slug.includes("family"))return"Choose the Right Vehicle for Your Family";return"Choose the Right Vehicle for Your Trip"}
function ctaTitle(pkg:Package){if(pkg.slug.includes("honeymoon"))return"Plan Your Dream Honeymoon Today!";if(pkg.slug.includes("desert"))return"Plan Your Desert Adventure Today!";if(pkg.slug.includes("family"))return"Plan Your Family Vacation in Rajasthan Today!";if(pkg.slug.includes("wildlife"))return"Plan Your Wildlife Adventure Today!";return `Plan Your ${pkg.title} Today!`}
