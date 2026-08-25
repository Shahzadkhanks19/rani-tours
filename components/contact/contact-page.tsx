"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  BadgeIndianRupee,
  CalendarDays,
  Clock3,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { siteContact } from "@/lib/site-data";

const heroFeatures = [
  [Headphones, "24/7 Support", "We’re here whenever you need us"],
  [MessageCircle, "Quick Response", "Fast assistance for your travel queries"],
  [ShieldCheck, "Trusted & Reliable", "Dependable travel support from Jodhpur"],
  [BadgeIndianRupee, "Transparent Quotes", "Clear pricing with no hidden surprises"],
] as const;

const faqs = [
  [Headphones, "What are your booking hours?", "Our booking team is available 24/7 to assist with your travel plans."],
  [MapPin, "Do you offer customized tours?", "Yes. Routes and travel plans can be customized according to your requirements."],
  [BadgeIndianRupee, "Is advance payment required?", "Advance requirements depend on the booking. Our team will explain the applicable terms."],
  [CalendarDays, "Can I change my booking?", "Bookings can be modified subject to availability and the applicable booking terms."],
] as const;

export function ContactPageContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#f6f8f3]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(108,153,76,.18),transparent_38%),linear-gradient(115deg,#ffffff_0%,#ffffff_43%,#eef4e8_100%)]" />
        <div className="relative mx-auto max-w-[1180px] px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-xs text-[#516052]"><Link href="/">Home</Link><span>›</span><span>Contact</span></div>
          <div className="mt-7 grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="font-serif text-5xl font-bold text-[#17341f] sm:text-6xl">Contact Us</motion.h1>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#cf7c14]">We’re Here to Help!</h2>
              <div className="mt-4 flex items-center gap-3 text-[#d69a28]"><span className="h-px w-8 bg-current"/><span>✤</span><span className="h-px w-8 bg-current"/></div>
              <p className="mt-6 max-w-[620px] text-sm leading-7 text-[#475149]">Have a question, need a quote, or planning your next trip? Get in touch with Rani Tour’s and our team will help you plan a comfortable journey from Jodhpur to your destination.</p>
            </div>
            <div className="rounded-[30px] border border-[#dfe7db] bg-white/75 p-7 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#397244]">Jodhpur Travel Support</p>
              <h3 className="mt-2 font-serif text-3xl font-bold text-[#17341f]">Reliable help, one call away.</h3>
              <p className="mt-3 text-sm leading-6 text-[#5b645c]">Call, WhatsApp, email or visit our office in Shastri Nagar. We’ll help with routes, vehicles, group travel and custom requirements.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={siteContact.phones[0].href} className="rounded-full bg-[#0b6531] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#084f27]">Call Now</a>
                <a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="rounded-full border border-[#0b6531] px-5 py-3 text-xs font-bold text-[#0b6531] transition hover:bg-[#eff6ec]">WhatsApp Us</a>
              </div>
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{heroFeatures.map(([Icon,title,text])=><div key={title} className="flex gap-3 rounded-2xl bg-white/85 p-4 shadow-sm"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#eef5e9] text-[#0b6531]"><Icon className="h-5 w-5"/></div><div><h3 className="text-sm font-bold text-[#1c3221]">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#667067]">{text}</p></div></div>)}</div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionHeading title="Get in Touch" align="left" />
            <div className="mt-7 divide-y divide-[#ebe8e1] rounded-2xl border border-[#e7e3dc] bg-[#fffdf9] px-5">
              <ContactItem icon={Phone} title="Call Us"><a href={siteContact.phones[0].href}>{siteContact.phones[0].display}</a><br/><a href={siteContact.phones[1].href}>{siteContact.phones[1].display}</a></ContactItem>
              <ContactItem icon={Mail} title="Email Us"><a href={siteContact.emailHref}>{siteContact.email}</a></ContactItem>
              <ContactItem icon={MapPin} title="Office Address"><a href={siteContact.mapsUrl} target="_blank" rel="noreferrer">{siteContact.address}</a></ContactItem>
              <ContactItem icon={Clock3} title="Availability">24/7 booking and travel assistance</ContactItem>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e2ded5] bg-white p-6 shadow-[0_16px_50px_rgba(31,54,35,.08)] sm:p-8">
            <SectionHeading title="Send Us a Message" align="left" />
            <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={(event)=>event.preventDefault()}>
              <Field label="Your Name *" name="name" placeholder="Enter your name" />
              <Field label="Phone Number *" name="phone" placeholder="Enter your mobile number" type="tel" />
              <Field label="Email Address *" name="email" placeholder="Enter your email" type="email" />
              <Field label="Subject *" name="subject" placeholder="How can we help?" />
              <label className="sm:col-span-2 text-xs font-semibold text-[#263429]">Your Message *<textarea name="message" required rows={6} placeholder="Tell us about your route, dates or travel requirement" className="mt-2 w-full resize-none rounded-xl border border-[#dcded8] bg-[#fafbf9] px-4 py-3 text-sm font-normal outline-none transition placeholder:text-[#9aa09a] focus:border-[#6f966d] focus:bg-white"/></label>
              <button type="submit" className="sm:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-[#0b6531] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#084f27]"><Send className="h-4 w-4"/>Send Message</button>
              <p className="sm:col-span-2 text-center text-[10px] text-[#798079]">Form UI is ready; backend message delivery will be connected when we build the data layer.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ee] py-12">
        <div className="mx-auto max-w-[1180px] px-4">
          <SectionHeading title="Visit Rani Tour’s in Jodhpur" />
          <div className="mt-7 overflow-hidden rounded-3xl border border-[#e2d8c9] bg-white shadow-sm lg:grid lg:grid-cols-[1.2fr_.8fr]">
            <div className="relative min-h-[330px] bg-[radial-gradient(circle_at_35%_35%,#e9f1e5_0%,#f8f7f1_46%,#e3eadf_100%)] p-8">
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#d6dfd1_1px,transparent_1px),linear-gradient(90deg,#d6dfd1_1px,transparent_1px)] [background-size:38px_38px]"/>
              <div className="relative flex h-full min-h-[270px] items-center justify-center">
                <div className="text-center"><MapPin className="mx-auto h-12 w-12 text-[#0b6531]"/><p className="mt-4 font-serif text-2xl font-bold text-[#17341f]">Rani Tour’s</p><p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-[#5d665e]">{siteContact.address}</p><a href={siteContact.mapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-[#0b6531] px-5 py-3 text-xs font-bold text-white">Open in Google Maps →</a></div>
              </div>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#397244]">Our Location</p><h3 className="mt-3 font-serif text-3xl font-bold text-[#17341f]">Easy to Reach in Shastri Nagar</h3><p className="mt-4 text-sm leading-7 text-[#626b63]">Visit our office for route planning, corporate travel discussions, vehicle arrangements and customized travel requirements.</p><div className="mt-6 space-y-3 text-sm"><a href={siteContact.phones[0].href} className="flex items-center gap-3 font-semibold text-[#22462b]"><Phone className="h-4 w-4 text-[#0b6531]"/>{siteContact.phones[0].display}</a><a href={siteContact.emailHref} className="flex items-center gap-3 font-semibold text-[#22462b]"><Mail className="h-4 w-4 text-[#0b6531]"/>{siteContact.email}</a></div></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12"><div className="mx-auto max-w-[1180px] px-4"><SectionHeading title="Frequently Asked Questions"/><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{faqs.map(([Icon,q,a])=><article key={q} className="rounded-2xl border border-[#e7e3dc] p-5"><div className="grid h-11 w-11 place-items-center rounded-full bg-[#eef5e9] text-[#0b6531]"><Icon className="h-5 w-5"/></div><h3 className="mt-4 font-serif text-lg font-bold text-[#17341f]">{q}</h3><p className="mt-2 text-xs leading-6 text-[#687068]">{a}</p></article>)}</div></div></section>

      <section className="bg-white pb-12"><div className="mx-auto max-w-[1180px] px-4"><div className="flex flex-col gap-5 rounded-3xl bg-[#0c4d28] px-7 py-7 text-white sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-serif text-2xl font-bold">Need Help Planning Your Trip?</h2><p className="mt-1 text-xs text-white/75">Call us or send a message. We’ll help you plan a safe and comfortable journey.</p></div><div className="flex flex-wrap gap-3"><a href={siteContact.phones[0].href} className="rounded-full border border-white/40 px-5 py-3 text-xs font-bold">Call Now</a><a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="rounded-full bg-[#f0cb5b] px-5 py-3 text-xs font-bold text-[#17341f]">WhatsApp Us</a></div></div></div></section>
    </>
  );
}

function ContactItem({icon:Icon,title,children}:{icon:typeof Phone;title:string;children:React.ReactNode}) {return <div className="flex gap-4 py-5"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0b6531] text-white"><Icon className="h-5 w-5"/></div><div><h3 className="text-sm font-bold text-[#1c3221]">{title}</h3><div className="mt-1 text-xs leading-6 text-[#626b63]">{children}</div></div></div>}
function Field({label,name,placeholder,type="text"}:{label:string;name:string;placeholder:string;type?:string}) {return <label className="text-xs font-semibold text-[#263429]">{label}<input name={name} type={type} required placeholder={placeholder} className="mt-2 w-full rounded-xl border border-[#dcded8] bg-[#fafbf9] px-4 py-3 text-sm font-normal outline-none transition placeholder:text-[#9aa09a] focus:border-[#6f966d] focus:bg-white"/></label>}
function SectionHeading({title,align="center"}:{title:string;align?:"left"|"center"}) {return <div className={align==="center"?"text-center":"text-left"}><h2 className="font-serif text-3xl font-bold text-[#17341f]">{title}</h2><div className={`mt-3 h-px w-16 bg-[#d69a28] ${align==="center"?"mx-auto":""}`}/></div>}
