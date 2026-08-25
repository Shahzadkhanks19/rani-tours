"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import {
  BadgeIndianRupee, CalendarDays, Clock3, Headphones, LockKeyhole, Mail, MapPin,
  MessageCircle, Phone, Send, ShieldCheck,
} from "lucide-react";
import { siteContact } from "@/lib/site-data";

const heroFeatures = [
  [Headphones, "24/7 Support", "We’re here anytime you need us"],
  [MessageCircle, "Quick Response", "Fast help for your travel queries"],
  [ShieldCheck, "Trusted & Reliable", "Dependable service you can count on"],
  [BadgeIndianRupee, "Best Price Guarantee", "Transparent pricing with no hidden charges"],
] as const;

const faqs = [
  [Headphones, "What are your booking hours?", "Our booking team is available 24/7 to assist you with your travel plans."],
  [MapPin, "Do you offer customized tours?", "Yes. We create customized routes and travel plans based on your preferences and group requirements."],
  [BadgeIndianRupee, "Is advance payment required?", "Advance payment depends on the booking. Our team will guide you through the applicable terms."],
  [CalendarDays, "Can I change my booking?", "Yes, bookings can be modified subject to availability and the applicable booking terms."],
] as const;

export function ContactPageContent() {
  return <>
    <section className="relative overflow-hidden bg-[#f8f8f5]">
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85')"}} aria-hidden="true"/>
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/28"/>
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/15"/>
      <div className="relative mx-auto min-h-[520px] max-w-[1180px] px-4 py-12 sm:py-16 lg:min-h-[560px] lg:py-14">
        <div className="relative z-20 flex items-center gap-2 text-xs text-[#4c5b4f]"><Link href="/" className="transition hover:text-[#0b6531]">Home</Link><span>›</span><span>Contact</span></div>
        <div className="relative z-20 mt-9 max-w-[610px]">
          <motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="font-serif text-5xl font-bold leading-none text-[#17341f] sm:text-6xl lg:text-[64px]">Contact Us</motion.h1>
          <h2 className="mt-3 font-serif text-3xl font-bold text-[#cf7c14] sm:text-4xl">We&apos;re Here to Help!</h2>
          <div className="mt-5 flex items-center gap-3 text-[#d69a28]"><span className="h-px w-10 bg-current"/><span>✤</span><span className="h-px w-10 bg-current"/></div>
          <p className="mt-6 max-w-[540px] text-[15px] leading-7 text-[#344139]">Have a question, need a quote, or planning your next trip? Get in touch with us. Our team will reply as soon as possible and help you plan a safe, comfortable journey.</p>
        </div>
        <div className="relative z-20 mt-9 grid max-w-[760px] gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">{heroFeatures.map(([Icon,title,text])=><div key={title} className="flex items-start gap-3 border-r border-[#dfe6dc] pr-4 last:border-r-0"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#eef5e9] text-[#0b6531]"><Icon className="h-5 w-5"/></div><div><h3 className="text-[13px] font-bold text-[#1a3320]">{title}</h3><p className="mt-1 text-[10px] leading-4 text-[#5f6a61]">{text}</p></div></div>)}</div>
      </div>
    </section>

    <section className="bg-white py-16"><div className="mx-auto grid max-w-[1180px] gap-12 px-4 lg:grid-cols-[.82fr_1.18fr]">
      <div><SectionHeading title="Get in Touch" align="left"/><div className="mt-8 divide-y divide-[#e9e4da]">
        <ContactItem icon={Phone} title="Call Us"><a href={siteContact.phones[0].href}>{siteContact.phones[0].display}</a><br/><a href={siteContact.phones[1].href}>{siteContact.phones[1].display}</a></ContactItem>
        <ContactItem icon={Mail} title="Email Us"><a href={siteContact.emailHref}>{siteContact.email}</a></ContactItem>
        <ContactItem icon={MapPin} title="Office Address"><a href={siteContact.mapsUrl} target="_blank" rel="noreferrer">Rani Tour&apos;s<br/>{siteContact.address}</a></ContactItem>
        <ContactItem icon={Clock3} title="Office Hours">Mon - Sun: 9:00 AM - 8:00 PM<br/><span className="text-[#8a918a]">Booking support available 24/7</span></ContactItem>
        <div className="flex gap-4 py-6"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0b6531] text-white"><MessageCircle className="h-5 w-5"/></div><div><h3 className="text-sm font-bold text-[#1c3221]">Follow Us</h3><div className="mt-3 flex gap-2"><Social href="#" label="Facebook"><FaFacebookF className="h-4 w-4"/></Social><Social href="#" label="Instagram"><FaInstagram className="h-4 w-4"/></Social><Social href="#" label="YouTube"><FaYoutube className="h-4 w-4"/></Social><Social href={siteContact.whatsapp} label="WhatsApp"><FaWhatsapp className="h-4 w-4"/></Social></div></div></div>
      </div></div>
      <div className="rounded-[24px] border border-[#e3dfd7] bg-[#fffdfa] p-6 shadow-[0_14px_38px_rgba(28,52,32,.08)] sm:p-8"><SectionHeading title="Send Us a Message" align="left"/><form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={e=>e.preventDefault()}><Field label="Your Name *" name="name" placeholder="Enter your name"/><Field label="Phone Number *" name="phone" placeholder="Enter your mobile number" type="tel"/><Field label="Email Address *" name="email" placeholder="Enter your email" type="email"/><Field label="Subject *" name="subject" placeholder="Select a subject"/><label className="sm:col-span-2 text-xs font-semibold text-[#263429]">Your Message *<textarea name="message" required rows={7} placeholder="Type your message here..." className="mt-2 w-full resize-none rounded-lg border border-[#dddcd6] bg-white px-4 py-3 text-sm font-normal outline-none transition placeholder:text-[#999f99] focus:border-[#6f966d]"/></label><button type="submit" className="sm:col-span-2 flex items-center justify-center gap-2 rounded-lg bg-[#0b6531] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#084f27]"><Send className="h-4 w-4"/>Send Message</button><p className="sm:col-span-2 flex items-center justify-center gap-2 text-center text-[10px] text-[#788078]"><LockKeyhole className="h-3.5 w-3.5"/>Your information is safe with us. We never share your details.</p></form></div>
    </div></section>

    <section className="bg-[#fbf6ec] py-14"><div className="mx-auto max-w-[1180px] px-4"><SectionHeading title="Find Us in Jodhpur"/><div className="mt-8 overflow-hidden rounded-[24px] border border-[#dfd8ca] bg-white shadow-sm lg:grid lg:grid-cols-[1.3fr_.7fr]">
      <iframe title="Rani Tour's office location" src={`https://www.google.com/maps?q=${encodeURIComponent(`Rani Tour's, ${siteContact.address}`)}&z=17&output=embed`} className="min-h-[390px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
      <div className="flex flex-col justify-center bg-[#0f522b] p-8 text-white sm:p-10"><div className="grid h-14 w-14 place-items-center rounded-full bg-white/10"><MapPin className="h-6 w-6 text-[#efc34d]"/></div><p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#efc34d]">Our Location</p><h3 className="mt-2 font-serif text-3xl font-bold">Rani Tour&apos;s, Jodhpur</h3><p className="mt-4 text-sm leading-7 text-white/78">{siteContact.address}</p><a href={siteContact.mapsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit rounded-full border border-white/35 px-5 py-3 text-xs font-bold transition hover:bg-white hover:text-[#0f522b]">View on Google Maps →</a><div className="mt-7 border-t border-white/15 pt-6 text-sm"><a href={siteContact.phones[0].href} className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#efc34d]"/>{siteContact.phones[0].display}</a><a href={siteContact.emailHref} className="mt-3 flex items-center gap-3"><Mail className="h-4 w-4 text-[#efc34d]"/>{siteContact.email}</a></div></div>
    </div></div></section>

    <section className="bg-[#fffaf1] py-14"><div className="mx-auto max-w-[1180px] px-4"><SectionHeading title="Frequently Asked Questions"/><div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{faqs.map(([Icon,q,a])=><article key={q} className="text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#b8cab5] bg-white text-[#0b6531]"><Icon className="h-5 w-5"/></div><h3 className="mt-4 font-serif text-lg font-bold text-[#17341f]">{q}</h3><p className="mx-auto mt-2 max-w-[230px] text-xs leading-6 text-[#687068]">{a}</p></article>)}</div></div></section>
    <section className="bg-white pb-14 pt-2"><div className="mx-auto max-w-[1180px] px-4"><div className="relative overflow-hidden rounded-[22px] bg-[#0b4d29] px-7 py-7 text-white sm:px-9 lg:flex lg:items-center lg:justify-between lg:gap-8"><div className="flex items-start gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#fff8ec] text-[#0b6531]"><Headphones className="h-6 w-6"/></div><div><h2 className="font-serif text-2xl font-bold">Need Help Planning <span className="text-[#efb43a]">Your Trip?</span></h2><p className="mt-1 max-w-[600px] text-xs leading-6 text-white/75">Call us or send a message. We&apos;re happy to help you plan a safe and memorable journey.</p></div></div><div className="mt-6 flex flex-wrap gap-3 lg:mt-0"><Link href="/get-quote" className="rounded-lg border border-[#d7ad3e] px-5 py-3 text-xs font-bold text-[#f1c24b] transition hover:bg-[#f1c24b] hover:text-[#17341f]">Get a Quote →</Link><a href={siteContact.phones[0].href} className="flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3 text-xs font-bold"><Phone className="h-4 w-4"/>Call Now</a></div></div></div></section>
  </>;
}

function ContactItem({icon:Icon,title,children}:{icon:typeof Phone;title:string;children:React.ReactNode}){return <div className="flex gap-4 py-6"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0b6531] text-white"><Icon className="h-5 w-5"/></div><div><h3 className="text-sm font-bold text-[#1c3221]">{title}</h3><div className="mt-1 text-xs leading-6 text-[#626b63]">{children}</div></div></div>}
function Social({href,label,children}:{href:string;label:string;children:React.ReactNode}){return <a href={href} target={href.startsWith("http")?"_blank":undefined} rel={href.startsWith("http")?"noreferrer":undefined} aria-label={label} className="grid h-9 w-9 place-items-center rounded-full border border-[#cfd9cc] bg-white text-[#0b6531] transition hover:border-[#0b6531] hover:bg-[#0b6531] hover:text-white">{children}</a>}
function Field({label,name,placeholder,type="text"}:{label:string;name:string;placeholder:string;type?:string}){return <label className="text-xs font-semibold text-[#263429]">{label}<input name={name} type={type} required placeholder={placeholder} className="mt-2 w-full rounded-lg border border-[#dddcd6] bg-white px-4 py-3 text-sm font-normal outline-none transition placeholder:text-[#999f99] focus:border-[#6f966d]"/></label>}
function SectionHeading({title,align="center"}:{title:string;align?:"left"|"center"}){return <div className={align==="center"?"text-center":"text-left"}><h2 className="font-serif text-3xl font-bold text-[#17341f] sm:text-4xl">{title}</h2><div className={`mt-4 flex items-center gap-3 text-[#d69a28] ${align==="center"?"justify-center":"justify-start"}`}><span className="h-px w-10 bg-current"/><span>✤</span><span className="h-px w-10 bg-current"/></div></div>}
