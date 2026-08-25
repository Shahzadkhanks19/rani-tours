"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  BadgeIndianRupee,
  CalendarDays,
  CarFront,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Headphones,
  MapPin,
  MessageCircleMore,
  Minus,
  Phone,
  Plus,
  Route,
  Send,
  ShieldCheck,
  UsersRound,
  X,
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

const journeyOptions = ["Local / Sightseeing", "One Way", "Round Trip", "Multi-City", "Airport / Railway Transfer", "Corporate Travel", "Tour Package", "Wedding / Event", "Other"];
const vehicleOptions = ["Let Rani Tour's recommend", "Toyota Etios / Sedan", "Swift Dzire", "Toyota Corolla", "Innova Crysta", "Toyota Fortuner", "Force Traveller - 12 Seater", "Force Traveller - 14 Seater", "Force Traveller - 17 Seater", "Force Traveller - 21 Seater", "Tourist Bus - 24 Seater", "Tourist Bus - 32 Seater", "Other / On Demand"];

const fieldClass = "mt-2 h-12 w-full rounded-xl border border-[#dadfd6] bg-white px-4 text-sm text-[#27332a] outline-none transition placeholder:text-[#949b94] focus:border-[#4f8f50] focus:ring-2 focus:ring-[#4f8f50]/10";

type FormState = {
  name: string;
  phone: string;
  email: string;
  journeyType: string;
  pickup: string;
  destination: string;
  date: string;
  travellers: number;
  duration: string;
  vehicle: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  journeyType: "",
  pickup: "",
  destination: "",
  date: "",
  travellers: 1,
  duration: "",
  vehicle: "Let Rani Tour's recommend",
  message: "",
  consent: false,
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function displayDate(value: string) {
  if (!value) return "Select travel date";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(year, month - 1, day));
}

export function GetQuotePageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openControl, setOpenControl] = useState<"journey" | "vehicle" | "date" | null>(null);
  const today = useMemo(() => new Date(), []);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const setValue = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(form.phone)) next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.journeyType) next.journeyType = "Please choose a journey type.";
    if (form.pickup.trim().length < 2) next.pickup = "Please enter the pickup location.";
    if (form.destination.trim().length < 2) next.destination = "Please enter the destination.";
    if (!form.date) next.date = "Please choose a travel date.";
    if (!form.consent) next.consent = "Please allow us to contact you about this request.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setOpenControl(null);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#f9f8f3]">
        <div className="absolute inset-0">
          <Image src="https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Scenic Rajasthan journey landscape" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/25" />
        </div>
        <div className="relative mx-auto min-h-[470px] max-w-[1180px] px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-xs text-[#59645b]"><Link href="/" className="transition hover:text-[#0b6531]">Home</Link><span>›</span><span>Get a Quote</span></div>
          <div className="mt-8 max-w-[650px]">
            <h1 className="font-serif text-5xl font-bold leading-none text-[#17341f] sm:text-6xl">Get a Quote</h1>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#c67b22] sm:text-4xl">Plan Your Perfect Journey</h2>
            <div className="mt-5 flex items-center gap-3 text-[#d29a2c]"><span className="h-px w-10 bg-current"/><span>✤</span><span className="h-px w-10 bg-current"/></div>
            <p className="mt-6 max-w-[540px] text-sm leading-7 text-[#465148]">Tell us your travel requirements and we will help you choose the right route, vehicle and travel plan with a clear quotation.</p>
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              {heroHighlights.map(([Icon, title, text]) => <div key={title} className="flex gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#edf5e8] text-[#0b6531]"><Icon className="h-5 w-5" /></div><div><h3 className="text-sm font-bold text-[#203524]">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#667067]">{text}</p></div></div>)}
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
              <div className="mt-8 grid gap-7">{whyQuote.map(([Icon, title, text]) => <div key={title} className="flex gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-[#f0c95d]"><Icon className="h-5 w-5" /></div><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-xs leading-6 text-white/72">{text}</p></div></div>)}</div>
              <div className="mt-9 border-t border-white/15 pt-7"><p className="text-xs font-semibold text-white/60">Need help before filling the form?</p><div className="mt-4 grid gap-3"><a href={siteContact.phones[0].href} className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"><Phone className="h-4 w-4 text-[#f0c95d]" />{siteContact.phones[0].display}</a><a href={siteContact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"><FaWhatsapp className="h-4 w-4 text-[#65d46e]" />WhatsApp Us</a></div></div>
            </div>
          </div>

          <div className="rounded-[26px] border border-[#e4e3dc] bg-[#fffdfa] p-6 shadow-lg shadow-black/5 sm:p-8">
            <div className="text-center"><span className="text-xs font-bold uppercase tracking-[.18em] text-[#17703a]">Travel Requirements</span><h2 className="mt-2 font-serif text-3xl font-bold text-[#17341f]">Tell Us About Your Journey</h2><div className="mx-auto mt-4 flex w-fit items-center gap-3 text-[#d29a2c]"><span className="h-px w-10 bg-current"/><span>✤</span><span className="h-px w-10 bg-current"/></div></div>

            {submitted ? (
              <div className="mt-9 rounded-2xl border border-[#9fc099] bg-[#f1f8ee] p-7 text-center"><CheckCircle2 className="mx-auto h-11 w-11 text-[#0b6531]" /><h3 className="mt-4 font-serif text-2xl font-bold text-[#17341f]">Quote Request Ready</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5c685f]">The request passed our custom validation. We will connect submission storage, notifications and the admin enquiry workflow during the backend phase.</p><button type="button" onClick={() => { setSubmitted(false); setForm(initialForm); setErrors({}); }} className="mt-5 rounded-full border border-[#0b6531] px-5 py-2.5 text-xs font-bold text-[#0b6531] transition hover:bg-[#0b6531] hover:text-white">Submit Another Request</button></div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name *" error={errors.name}><input value={form.name} onChange={(e) => setValue("name", e.target.value)} placeholder="Enter your full name" className={fieldClass} /></Field>
                  <Field label="Mobile Number *" error={errors.phone}><input value={form.phone} onChange={(e) => setValue("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} inputMode="numeric" placeholder="10-digit mobile number" className={fieldClass} /></Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email Address" error={errors.email}><input value={form.email} onChange={(e) => setValue("email", e.target.value)} inputMode="email" placeholder="Enter your email" className={fieldClass} /></Field>
                  <Field label="Journey Type *" error={errors.journeyType}><CustomSelect value={form.journeyType} placeholder="Select journey type" options={journeyOptions} open={openControl === "journey"} onToggle={() => setOpenControl(openControl === "journey" ? null : "journey")} onSelect={(value) => { setValue("journeyType", value); setOpenControl(null); }} /></Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Pickup Location *" error={errors.pickup}><span className="relative block"><MapPin className="pointer-events-none absolute left-4 top-[26px] h-4 w-4 text-[#718074]"/><input value={form.pickup} onChange={(e) => setValue("pickup", e.target.value)} placeholder="Enter pickup location" className={`${fieldClass} pl-11`} /></span></Field>
                  <Field label="Destination *" error={errors.destination}><span className="relative block"><MapPin className="pointer-events-none absolute left-4 top-[26px] h-4 w-4 text-[#718074]"/><input value={form.destination} onChange={(e) => setValue("destination", e.target.value)} placeholder="Enter destination" className={`${fieldClass} pl-11`} /></span></Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Travel Date *" error={errors.date}><CustomDatePicker value={form.date} open={openControl === "date"} month={calendarMonth} today={today} onToggle={() => setOpenControl(openControl === "date" ? null : "date")} onMonthChange={setCalendarMonth} onSelect={(value) => { setValue("date", value); setOpenControl(null); }} /></Field>
                  <Field label="Travellers *"><TravellerStepper value={form.travellers} onChange={(value) => setValue("travellers", value)} /></Field>
                  <Field label="Trip Duration"><input value={form.duration} onChange={(e) => setValue("duration", e.target.value)} placeholder="e.g. 3 Days" className={fieldClass} /></Field>
                </div>

                <Field label="Preferred Vehicle"><CustomSelect value={form.vehicle} placeholder="Let Rani Tour's recommend" options={vehicleOptions} open={openControl === "vehicle"} onToggle={() => setOpenControl(openControl === "vehicle" ? null : "vehicle")} onSelect={(value) => { setValue("vehicle", value); setOpenControl(null); }} /></Field>

                <Field label="Additional Requirements"><textarea value={form.message} onChange={(e) => setValue("message", e.target.value)} rows={5} placeholder="Tell us about stops, luggage, hotel pickup, special requirements, itinerary preferences, or anything else..." className="mt-2 w-full resize-none rounded-xl border border-[#dadfd6] bg-white px-4 py-3 text-sm leading-6 text-[#27332a] outline-none transition placeholder:text-[#949b94] focus:border-[#4f8f50] focus:ring-2 focus:ring-[#4f8f50]/10" /></Field>

                <div>
                  <button type="button" role="checkbox" aria-checked={form.consent} onClick={() => setValue("consent", !form.consent)} className="flex items-start gap-3 text-left text-[11px] leading-5 text-[#667067]"><span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${form.consent ? "border-[#0b6531] bg-[#0b6531] text-white" : "border-[#bac4b9] bg-white text-transparent"}`}><Check className="h-3.5 w-3.5" /></span><span>I agree to be contacted by Rani Tour&apos;s regarding this quote request.</span></button>
                  {errors.consent ? <p className="mt-1 text-[11px] font-medium text-[#b42318]">{errors.consent}</p> : null}
                </div>

                {Object.keys(errors).length ? <div className="flex items-start gap-3 rounded-xl border border-[#f1c3bd] bg-[#fff4f2] px-4 py-3 text-xs text-[#912018]"><X className="mt-0.5 h-4 w-4 shrink-0"/><span>Please review the highlighted fields before submitting your request.</span></div> : null}

                <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-[#147435] px-6 py-4 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0f612c] hover:shadow-lg"><Send className="h-4 w-4"/>Request My Free Quote <span>→</span></button>
                <p className="text-center text-[11px] text-[#7c857e]">No booking is confirmed until our team verifies availability and shares the final quotation.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ed] py-14"><div className="mx-auto max-w-[1180px] px-4"><div className="text-center"><span className="text-xs font-bold uppercase tracking-[.18em] text-[#17703a]">Travel With Confidence</span><h2 className="mt-2 font-serif text-3xl font-bold text-[#17341f]">Simple Planning. Reliable Journeys.</h2><div className="mx-auto mt-4 h-px w-16 bg-[#d29a2c]"/></div><div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{trustItems.map(([Icon,title,text]) => <div key={title} className="rounded-2xl border border-[#ece5d8] bg-white p-6 text-center shadow-sm"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#eef5e9] text-[#0b6531]"><Icon className="h-5 w-5"/></div><h3 className="mt-4 font-serif text-lg font-bold text-[#213825]">{title}</h3><p className="mt-2 text-xs leading-5 text-[#687169]">{text}</p></div>)}</div></div></section>

      <section className="bg-white py-10"><div className="mx-auto max-w-[1180px] px-4"><div className="flex flex-col gap-5 rounded-2xl bg-[#0b4d29] px-7 py-7 text-white lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-4"><div className="grid h-13 w-13 shrink-0 place-items-center rounded-full bg-white/10 text-[#f0c95d]"><MessageCircleMore className="h-6 w-6"/></div><div><h2 className="font-serif text-2xl font-bold">Prefer to Talk to a Travel Expert?</h2><p className="mt-1 text-xs text-white/75">Call or WhatsApp us and we&apos;ll help plan your journey.</p></div></div><div className="flex flex-wrap gap-3"><a href={siteContact.phones[0].href} className="flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3 text-xs font-bold"><Phone className="h-4 w-4"/>Call Now</a><a href={siteContact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-bold text-[#0b4d29]"><FaWhatsapp className="h-4 w-4"/>WhatsApp Us</a></div></div></div></section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-[#37443a]">{label}{children}{error ? <span className="mt-1 block text-[11px] font-medium text-[#b42318]">{error}</span> : null}</label>;
}

function CustomSelect({ value, placeholder, options, open, onToggle, onSelect }: { value: string; placeholder: string; options: readonly string[]; open: boolean; onToggle: () => void; onSelect: (value: string) => void }) {
  return <div className="relative mt-2"><button type="button" onClick={onToggle} aria-haspopup="listbox" aria-expanded={open} className="flex h-12 w-full items-center justify-between rounded-xl border border-[#dadfd6] bg-white px-4 text-left text-sm text-[#27332a] transition hover:border-[#aebbaa] focus:outline-none focus:ring-2 focus:ring-[#4f8f50]/10"><span className={value ? "" : "text-[#949b94]"}>{value || placeholder}</span><ChevronDown className={`h-4 w-4 text-[#718074] transition ${open ? "rotate-180" : ""}`} /></button>{open ? <div role="listbox" className="absolute z-40 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-[#dce2d8] bg-white p-1.5 shadow-xl">{options.map((option) => <button key={option} type="button" role="option" aria-selected={value === option} onClick={() => onSelect(option)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition ${value === option ? "bg-[#edf5e8] font-bold text-[#0b6531]" : "text-[#344138] hover:bg-[#f6f8f4]"}`}><span>{option}</span>{value === option ? <Check className="h-4 w-4"/> : null}</button>)}</div> : null}</div>;
}

function TravellerStepper({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <div className="mt-2 flex h-12 items-center justify-between rounded-xl border border-[#dadfd6] bg-white px-2"><button type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1} className="grid h-8 w-8 place-items-center rounded-lg bg-[#f1f5ee] text-[#0b6531] transition hover:bg-[#e4eee0] disabled:cursor-not-allowed disabled:opacity-35" aria-label="Decrease travellers"><Minus className="h-4 w-4"/></button><div className="flex items-center gap-2 text-sm font-bold text-[#27332a]"><UsersRound className="h-4 w-4 text-[#0b6531]"/><span>{value}</span></div><button type="button" onClick={() => onChange(Math.min(99, value + 1))} disabled={value >= 99} className="grid h-8 w-8 place-items-center rounded-lg bg-[#f1f5ee] text-[#0b6531] transition hover:bg-[#e4eee0] disabled:cursor-not-allowed disabled:opacity-35" aria-label="Increase travellers"><Plus className="h-4 w-4"/></button></div>;
}

function CustomDatePicker({ value, open, month, today, onToggle, onMonthChange, onSelect }: { value: string; open: boolean; month: Date; today: Date; onToggle: () => void; onMonthChange: (date: Date) => void; onSelect: (value: string) => void }) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = Array.from({ length: firstWeekday + daysInMonth }, (_, index) => index < firstWeekday ? null : index - firstWeekday + 1);
  const monthLabel = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(month);
  const minDate = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  return <div className="relative mt-2"><button type="button" onClick={onToggle} aria-haspopup="dialog" aria-expanded={open} className="flex h-12 w-full items-center gap-3 rounded-xl border border-[#dadfd6] bg-white px-4 text-left text-sm transition hover:border-[#aebbaa] focus:outline-none focus:ring-2 focus:ring-[#4f8f50]/10"><CalendarDays className="h-4 w-4 shrink-0 text-[#0b6531]"/><span className={value ? "text-[#27332a]" : "text-[#949b94]"}>{displayDate(value)}</span></button>{open ? <div role="dialog" aria-label="Choose travel date" className="absolute left-0 z-50 mt-2 w-[300px] rounded-2xl border border-[#dce2d8] bg-white p-4 shadow-2xl sm:w-[330px]"><div className="flex items-center justify-between"><button type="button" onClick={() => onMonthChange(new Date(year, monthIndex - 1, 1))} className="grid h-9 w-9 place-items-center rounded-lg text-[#0b6531] transition hover:bg-[#eef5e9]" aria-label="Previous month"><ChevronLeft className="h-4 w-4"/></button><strong className="text-sm text-[#233728]">{monthLabel}</strong><button type="button" onClick={() => onMonthChange(new Date(year, monthIndex + 1, 1))} className="grid h-9 w-9 place-items-center rounded-lg text-[#0b6531] transition hover:bg-[#eef5e9]" aria-label="Next month"><ChevronRight className="h-4 w-4"/></button></div><div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-[#8a938b]">{["Su","Mo","Tu","We","Th","Fr","Sa"].map((day) => <span key={day} className="py-1">{day}</span>)}</div><div className="mt-1 grid grid-cols-7 gap-1">{cells.map((day, index) => { if (!day) return <span key={`blank-${index}`} />; const dateValue = formatDate(year, monthIndex, day); const disabled = dateValue < minDate; const selected = value === dateValue; return <button key={dateValue} type="button" disabled={disabled} onClick={() => onSelect(dateValue)} className={`grid h-9 w-9 place-items-center rounded-full text-xs transition ${selected ? "bg-[#0b6531] font-bold text-white" : disabled ? "cursor-not-allowed text-[#c8cec8]" : "text-[#344138] hover:bg-[#edf5e8] hover:text-[#0b6531]"}`}>{day}</button>; })}</div><button type="button" onClick={() => { const current = new Date(); onMonthChange(new Date(current.getFullYear(), current.getMonth(), 1)); onSelect(formatDate(current.getFullYear(), current.getMonth(), current.getDate())); }} className="mt-4 w-full rounded-lg bg-[#f1f6ee] py-2 text-xs font-bold text-[#0b6531] transition hover:bg-[#e5efe1]">Choose Today</button></div> : null}</div>;
}
