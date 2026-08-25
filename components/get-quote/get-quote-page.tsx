"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  BadgeIndianRupee,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  Headphones,
  MapPin,
  MessageCircleMore,
  Phone,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteContact } from "@/lib/site-data";

const heroHighlights = [
  [Clock3, "Quick Response", "Get a quote within minutes"],
  [BadgeIndianRupee, "Best Prices", "Competitive pricing with no hidden charges"],
  [Headphones, "Expert Support", "Our team is here to help you 24/7"],
] as const;

const whyQuote = [
  [Route, "Customized Itineraries", "Travel plans tailored to your route, preferences, group size and budget."],
  [CarFront, "Wide Range of Options", "Choose from sedans, SUVs, Force Travellers, buses and vehicles on demand."],
  [BadgeIndianRupee, "100% Transparent Pricing", "Clear quotations with the trip details explained before you confirm."],
  [Headphones, "Personal Travel Assistance", "Talk directly with our team for route, vehicle and journey planning."],
] as const;

const trustItems = [
  [ShieldCheck, "Safe & Reliable", "Experienced drivers and dependable travel"],
  [CarFront, "Well Maintained Fleet", "Comfortable vehicles for every group size"],
  [Clock3, "On-Time Service", "Punctual pickup and coordinated journeys"],
  [UsersRound, "All Group Sizes", "From solo travel to large group movement"],
] as const;

const vehicleOptions = [
  "Toyota Etios / Sedan",
  "Swift Dzire",
  "Toyota Corolla",
  "Innova Crysta",
  "Toyota Fortuner",
  "Force Traveller - 12 Seater",
  "Force Traveller - 14 Seater",
  "Force Traveller - 17 Seater",
  "Force Traveller - 21 Seater",
  "Tourist Bus - 24 Seater",
  "Tourist Bus - 32 Seater",
  "Other / On Demand",
];

const fieldClass = "mt-2 h-12 w-full rounded-xl border border-[#dadfd6] bg-white px-4 text-sm text-[#27332a] outline-none transition placeholder:text-[#949b94] focus:border-[#4f8f50] focus:ring-2 focus:ring-[#4f8f50]/10";

export function GetQuotePageContent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#f9f8f3]">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Scenic Rajasthan journey landscape"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/25" />
        </div>

        <div className="relative mx-auto min-h-[470px] max-w-[1180px] px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-xs text-[#59645b]">
            <Link href="/" className="transition hover:text-[#0b6531]">Home</Link>
            <span>›</span>
            <span>Get a Quote</span>
          </div>

          <div className="mt-8 max-w-[650px]">
            <h1 className="font-serif text-5xl font-bold leading-none text-[#17341f] sm:text-6xl">Get a Quote</h1>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#c67b22] sm:text-4xl">Plan Your Perfect Journey</h2>
            <div className="mt-5 flex items-center gap-3 text-[#d29a2c]"><span className="h-px w-10 bg-current"/><span>✤</span><span className="h-px w-10 bg-current"/></div>
            <p className="mt-6 max-w-[540px] text-sm leading-7 text-[#465148]">Tell us your travel requirements and we will help you choose the right route, vehicle and travel plan with a clear quotation.</p>

            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              {heroHighlights.map(([Icon, title, text]) => (
                <div key={title} className="flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#edf5e8] text-[#0b6531]"><Icon className="h-5 w-5" /></div>
                  <div><h3 className="text-sm font-bold text-[#203524]">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#667067]">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 lg:grid-cols-[.82fr_1.18fr]">
          <div className="self-start overflow-hidden rounded-[26px] bg-[#0b4f2a] text-white shadow-xl shadow-[#0b4f2a]/10">
            <div className="p-7 sm:p-9">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-[#e0b84e]">Why choose us</span>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight">Why Get a Quote from <span className="text-[#e0b84e]">Rani Tour&apos;s?</span></h2>
              <div className="mt-5 flex items-center gap-3 text-[#e0b84e]"><span className="h-px w-10 bg-current"/><span>✤</span><span className="h-px w-10 bg-current"/></div>

              <div className="mt-8 grid gap-7">
                {whyQuote.map(([Icon, title, text]) => (
                  <div key={title} className="flex gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-[#f0c95d]"><Icon className="h-5 w-5" /></div>
                    <div><h3 className="font-bold">{title}</h3><p className="mt-1 text-xs leading-6 text-white/72">{text}</p></div>
                  </div>
                ))}
              </div>

              <div className="mt-9 border-t border-white/15 pt-7">
                <p className="text-xs font-semibold text-white/60">Need help before filling the form?</p>
                <div className="mt-4 grid gap-3">
                  <a href={siteContact.phones[0].href} className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"><Phone className="h-4 w-4 text-[#f0c95d]" />{siteContact.phones[0].display}</a>
                  <a href={siteContact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"><FaWhatsapp className="h-4 w-4 text-[#65d46e]" />WhatsApp Us</a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-[#e4e3dc] bg-[#fffdfa] p-6 shadow-lg shadow-black/5 sm:p-8">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-[#17703a]">Travel Requirements</span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-[#17341f]">Tell Us About Your Journey</h2>
              <div className="mx-auto mt-4 flex w-fit items-center gap-3 text-[#d29a2c]"><span className="h-px w-10 bg-current"/><span>✤</span><span className="h-px w-10 bg-current"/></div>
            </div>

            {submitted ? (
              <div className="mt-9 rounded-2xl border border-[#9fc099] bg-[#f1f8ee] p-7 text-center">
                <CheckCircle2 className="mx-auto h-11 w-11 text-[#0b6531]" />
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#17341f]">Quote Request Ready</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5c685f]">The frontend form is working. We will connect this submission to the backend and admin enquiry system during the data-layer phase.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-5 rounded-full border border-[#0b6531] px-5 py-2.5 text-xs font-bold text-[#0b6531] transition hover:bg-[#0b6531] hover:text-white">Submit Another Request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-[#37443a]">Full Name *<input required name="name" placeholder="Enter your full name" className={fieldClass} /></label>
                  <label className="text-xs font-semibold text-[#37443a]">Mobile Number *<input required name="phone" inputMode="tel" pattern="[6-9][0-9]{9}" placeholder="10-digit mobile number" className={fieldClass} /></label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-[#37443a]">Email Address<input name="email" type="email" placeholder="Enter your email" className={fieldClass} /></label>
                  <label className="text-xs font-semibold text-[#37443a]">Journey Type *<select required name="journeyType" defaultValue="" className={fieldClass}><option value="" disabled>Select journey type</option><option>Local / Sightseeing</option><option>One Way</option><option>Round Trip</option><option>Multi-City</option><option>Airport / Railway Transfer</option><option>Corporate Travel</option><option>Tour Package</option><option>Wedding / Event</option><option>Other</option></select></label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-[#37443a]">Pickup Location *<span className="relative block"><MapPin className="pointer-events-none absolute left-4 top-[26px] h-4 w-4 text-[#718074]"/><input required name="pickup" placeholder="Enter pickup location" className={`${fieldClass} pl-11`} /></span></label>
                  <label className="text-xs font-semibold text-[#37443a]">Destination *<span className="relative block"><MapPin className="pointer-events-none absolute left-4 top-[26px] h-4 w-4 text-[#718074]"/><input required name="destination" placeholder="Enter destination" className={`${fieldClass} pl-11`} /></span></label>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <label className="text-xs font-semibold text-[#37443a]">Travel Date *<span className="relative block"><CalendarDays className="pointer-events-none absolute left-4 top-[26px] h-4 w-4 text-[#718074]"/><input required name="date" type="date" className={`${fieldClass} pl-11`} /></span></label>
                  <label className="text-xs font-semibold text-[#37443a]">Travellers *<span className="relative block"><UsersRound className="pointer-events-none absolute left-4 top-[26px] h-4 w-4 text-[#718074]"/><input required name="travellers" type="number" min="1" max="99" defaultValue="1" className={`${fieldClass} pl-11`} /></span></label>
                  <label className="text-xs font-semibold text-[#37443a]">Trip Duration<input name="duration" placeholder="e.g. 3 Days" className={fieldClass} /></label>
                </div>

                <label className="text-xs font-semibold text-[#37443a]">Preferred Vehicle<select name="vehicle" defaultValue="" className={fieldClass}><option value="">Let Rani Tour&apos;s recommend</option>{vehicleOptions.map((vehicle) => <option key={vehicle}>{vehicle}</option>)}</select></label>

                <label className="text-xs font-semibold text-[#37443a]">Additional Requirements<textarea name="message" rows={5} placeholder="Tell us about stops, luggage, hotel pickup, special requirements, itinerary preferences, or anything else..." className="mt-2 w-full resize-none rounded-xl border border-[#dadfd6] bg-white px-4 py-3 text-sm leading-6 text-[#27332a] outline-none transition placeholder:text-[#949b94] focus:border-[#4f8f50] focus:ring-2 focus:ring-[#4f8f50]/10" /></label>

                <label className="flex items-start gap-3 text-[11px] leading-5 text-[#667067]"><input required type="checkbox" className="mt-1 h-4 w-4 accent-[#0b6531]"/><span>I agree to be contacted by Rani Tour&apos;s regarding this quote request.</span></label>

                <button type="submit" className="flex h-13 items-center justify-center gap-2 rounded-xl bg-[#147435] px-6 py-4 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0f612c] hover:shadow-lg"><Send className="h-4 w-4"/>Request My Free Quote <span>→</span></button>
                <p className="text-center text-[11px] text-[#7c857e]">No booking is confirmed until our team verifies availability and shares the final quotation.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ed] py-14">
        <div className="mx-auto max-w-[1180px] px-4">
          <div className="text-center"><span className="text-xs font-bold uppercase tracking-[.18em] text-[#17703a]">Travel With Confidence</span><h2 className="mt-2 font-serif text-3xl font-bold text-[#17341f]">Simple Planning. Reliable Journeys.</h2><div className="mx-auto mt-4 h-px w-16 bg-[#d29a2c]"/></div>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map(([Icon,title,text]) => <div key={title} className="rounded-2xl border border-[#ece5d8] bg-white p-6 text-center shadow-sm"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#eef5e9] text-[#0b6531]"><Icon className="h-5 w-5"/></div><h3 className="mt-4 font-serif text-lg font-bold text-[#213825]">{title}</h3><p className="mt-2 text-xs leading-5 text-[#687169]">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-[1180px] px-4">
          <div className="flex flex-col gap-5 rounded-2xl bg-[#0b4d29] px-7 py-7 text-white lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4"><div className="grid h-13 w-13 shrink-0 place-items-center rounded-full bg-white/10 text-[#f0c95d]"><MessageCircleMore className="h-6 w-6"/></div><div><h2 className="font-serif text-2xl font-bold">Prefer to Talk to a Travel Expert?</h2><p className="mt-1 text-xs text-white/75">Call or WhatsApp us and we&apos;ll help plan your journey.</p></div></div>
            <div className="flex flex-wrap gap-3"><a href={siteContact.phones[0].href} className="flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3 text-xs font-bold"><Phone className="h-4 w-4"/>Call Now</a><a href={siteContact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-bold text-[#0b4d29]"><FaWhatsapp className="h-4 w-4"/>WhatsApp Us</a></div>
          </div>
        </div>
      </section>
    </>
  );
}
