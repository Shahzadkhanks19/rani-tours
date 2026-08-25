"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  BadgeIndianRupee,
  BriefcaseBusiness,
  Building2,
  CarFront,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileText,
  Headphones,
  MapPinned,
  Phone,
  ReceiptText,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { siteContact } from "@/lib/site-data";

const highlights = [
  [Headphones, "Quick Answers", "Get instant answers to common questions"],
  [ShieldCheck, "Trusted & Reliable", "Transparent information you can trust"],
  [FileText, "Clear & Simple", "Easy to understand information"],
  [Clock3, "24/7 Assistance", "Our team is always here to help you"],
] as const;

const faqGroups = [
  {
    label: "General",
    title: "General Questions",
    icon: CircleHelp,
    items: [
      ["What services does Rani Tour's provide?", "We provide local and outstation taxi services, Rajasthan and all-India travel, airport and railway transfers, corporate travel, tour planning, group transport, and customized travel solutions."],
      ["How can I book a taxi with Rani Tour's?", "You can call us, WhatsApp us, send an enquiry through the website, or request a quote. Our team will confirm availability and guide you through the booking."],
      ["What areas do you serve?", "We are based in Jodhpur and serve destinations across Rajasthan as well as long-distance routes across India."],
      ["Are your drivers verified and experienced?", "Yes. We focus on professional, experienced drivers and safe, dependable travel for local, outstation, family, and corporate journeys."],
      ["Do you provide 24/7 customer support?", "Yes. Booking and travel assistance is available 24/7 through phone and WhatsApp."],
    ],
  },
  {
    label: "Bookings & Payments",
    title: "Bookings & Payments",
    icon: ReceiptText,
    items: [
      ["What payment methods do you accept?", "Accepted payment methods may vary by booking. Our team will confirm the available payment options when your booking is finalized."],
      ["Is advance payment required for booking?", "Advance requirements depend on the route, vehicle, and booking type. Any advance amount will be clearly communicated before confirmation."],
      ["Can I get a receipt for my booking?", "Yes. Booking and payment details can be shared for confirmed trips."],
      ["Do you offer GST invoices for corporate bookings?", "Corporate invoicing requirements can be discussed with our team while confirming your booking."],
    ],
  },
  {
    label: "Cancellations & Refunds",
    title: "Cancellations & Refunds",
    icon: RotateCcw,
    items: [
      ["Can I cancel a confirmed booking?", "Yes. Cancellation is possible subject to the booking terms shared at confirmation."],
      ["Are cancellation charges applicable?", "Charges depend on how close the cancellation is to the pickup time, vehicle arrangements, and booking type."],
      ["How are eligible refunds processed?", "Eligible refunds are processed after cancellation review using the agreed payment method or another method confirmed with you."],
      ["What happens if Rani Tour's has to cancel a booking?", "If an exceptional situation prevents us from fulfilling a confirmed booking, our team will contact you promptly and discuss an alternate vehicle, rescheduling, or applicable refund."],
    ],
  },
  {
    label: "Taxi Services",
    title: "Taxi Services",
    icon: CarFront,
    items: [
      ["Do you provide local Jodhpur sightseeing taxis?", "Yes. We arrange local Jodhpur sightseeing and point-to-point taxi requirements."],
      ["Can I book an outstation taxi from Jodhpur?", "Yes. We provide one-way, round-trip, and multi-day outstation taxi services from Jodhpur to Rajasthan and destinations across India."],
      ["Do you provide airport and railway station transfers?", "Yes. Pickup and drop services can be arranged for Jodhpur Airport, railway station, hotels, homes, and other requested locations."],
      ["Can I request a particular vehicle category?", "Yes. You can request a sedan, Innova Crysta, Fortuner, Traveller, bus, or another available vehicle according to your group and trip requirements."],
    ],
  },
  {
    label: "Tour Packages",
    title: "Tour Packages",
    icon: MapPinned,
    items: [
      ["Do you offer customized Rajasthan tour packages?", "Yes. Tour plans can be customized around your destinations, trip duration, group size, interests, and preferred vehicle."],
      ["Can you arrange multi-city Rajasthan tours?", "Yes. We can help plan routes covering cities such as Jodhpur, Jaisalmer, Jaipur, Udaipur, Pushkar, Mount Abu, and other destinations."],
      ["Are hotels included in your tour packages?", "Package inclusions depend on the selected plan. Our team will clearly explain what is and is not included before confirmation."],
      ["Can I change the itinerary after discussing a package?", "Yes. We can revise the proposed itinerary before confirmation and may accommodate later changes subject to availability and logistics."],
    ],
  },
  {
    label: "Corporate Services",
    title: "Corporate Services",
    icon: BriefcaseBusiness,
    items: [
      ["Do you provide corporate employee transport?", "Yes. We arrange business travel, employee movement, executive transfers, event transport, and other corporate requirements."],
      ["Can companies make recurring transport arrangements?", "Yes. Recurring requirements can be discussed with our corporate travel team and planned according to schedule and vehicle availability."],
      ["Do you provide vehicles for conferences and business events?", "Yes. Sedans, SUVs, Travellers, and buses can be arranged for conferences, delegations, meetings, and corporate events."],
      ["Can corporate bookings receive billing documentation?", "Yes. Billing and invoice requirements can be discussed while setting up the corporate booking."],
    ],
  },
  {
    label: "Fleet & Vehicles",
    title: "Fleet & Vehicles",
    icon: CarFront,
    items: [
      ["Which vehicles are available in your fleet?", "Our regular options include Toyota Etios, Swift Dzire, Innova Crysta, Fortuner, Corolla, Force Tempo Travellers, tourist buses, and additional vehicles on demand."],
      ["What Tempo Traveller capacities are available?", "Force Tempo Traveller configurations include approximately 12, 14, 17, and 21 seater options, subject to availability."],
      ["Do you have buses for larger groups?", "Yes. Tourist buses including approximately 24 and 32 seater options can be arranged subject to availability."],
      ["Are your vehicles air-conditioned?", "The main fleet categories used for passenger travel are air-conditioned. Exact specifications are confirmed when your vehicle is assigned."],
      ["Can I request another vehicle not listed on the website?", "Yes. Additional vehicle types can be arranged on demand depending on your requirement and availability."],
    ],
  },
  {
    label: "Safety & Policies",
    title: "Safety & Policies",
    icon: ShieldCheck,
    items: [
      ["How do you maintain passenger safety?", "We focus on experienced drivers, maintained vehicles, suitable routing, and dependable customer support throughout the journey."],
      ["Are vehicles cleaned before trips?", "Vehicles are expected to be kept clean and travel-ready. For special hygiene requirements, mention them while booking."],
      ["Is smoking allowed inside vehicles?", "Smoking inside vehicles is generally discouraged to maintain cleanliness and comfort for all passengers."],
      ["What if there is a vehicle issue during the journey?", "Contact our support team immediately. We will assist with the situation and arrange the most practical solution available."],
    ],
  },
  {
    label: "Travel & Destinations",
    title: "Travel & Destinations",
    icon: Building2,
    items: [
      ["Which Rajasthan destinations do you cover?", "We cover Jodhpur, Jaisalmer, Jaipur, Udaipur, Mount Abu, Pushkar, Ajmer, Bikaner, Ranthambore, and many other Rajasthan destinations."],
      ["Do you operate outside Rajasthan?", "Yes. We provide long-distance travel to destinations across India depending on route and vehicle availability."],
      ["Can you help plan the best route between multiple destinations?", "Yes. Share your desired stops and duration and our team can suggest a practical route and suitable vehicle."],
      ["Do you provide sightseeing travel at the destination?", "Sightseeing arrangements can be included in your travel plan depending on the destination and itinerary."],
    ],
  },
  {
    label: "Other Questions",
    title: "Other Questions",
    icon: CircleHelp,
    items: [
      ["Can I travel with children or senior citizens?", "Yes. Tell us about your group while booking so we can recommend an appropriate and comfortable vehicle."],
      ["Can I carry luggage in the vehicle?", "Yes. Luggage capacity varies by vehicle, so please share the approximate number and size of bags before vehicle selection."],
      ["Can I request multiple vehicles for one group?", "Yes. Multiple vehicles can be coordinated for weddings, corporate groups, family events, tours, and other large movements."],
      ["How do I ask a question that is not listed here?", "Call us, WhatsApp us, or use the Contact page. Our team will help with any travel requirement not covered in these FAQs."],
    ],
  },
] as const;

const trustItems = [
  [BadgeIndianRupee, "Best Price Guarantee", "Competitive pricing with no hidden surprises"],
  [ShieldCheck, "Safe & Comfortable", "Well-maintained vehicles and experienced drivers"],
  [Clock3, "On-Time Service", "Punctual pickups and dependable travel"],
  [UsersRound, "Customer Satisfaction", "Trusted by travelers across Rajasthan and India"],
  [Sparkles, "Easy Booking", "Simple booking through call, WhatsApp, or enquiry"],
] as const;

export function FaqPageContent() {
  const [openKey, setOpenKey] = useState("0-0");
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  const goToCategory = (index: number) => {
    setActiveCategory(index);
    if (index >= 2) setShowAll(true);
    window.setTimeout(() => {
      document.getElementById(`faq-group-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const visibleGroups = showAll ? faqGroups : faqGroups.slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden bg-[#f8f7f2]">
        <div className="absolute inset-0">
          <Image src="https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Rajasthan scenic road and hills" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/30" />
        </div>
        <div className="relative mx-auto min-h-[430px] max-w-[1180px] px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-xs text-[#4f5b50]"><Link href="/" className="hover:text-[#0b6531]">Home</Link><span>›</span><span>FAQ</span></div>
          <div className="mt-8 max-w-[620px]">
            <h1 className="font-serif text-5xl font-bold leading-[.98] text-[#17341f] sm:text-6xl">Frequently Asked <span className="block text-[#ca7c1c]">Questions</span></h1>
            <div className="mt-5 flex items-center gap-3 text-[#d29a2c]"><span className="h-px w-10 bg-current"/><span>✤</span><span className="h-px w-10 bg-current"/></div>
            <p className="mt-6 max-w-[520px] text-sm leading-7 text-[#435045]">Find answers to common questions about our services, bookings, vehicles, payments, and travel solutions.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-[820px] lg:grid-cols-4">
            {highlights.map(([Icon,title,text]) => <div key={title} className="flex gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#edf5e8] text-[#0b6531]"><Icon className="h-5 w-5"/></div><div><h3 className="text-sm font-bold text-[#1d3422]">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#667067]">{text}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 lg:grid-cols-[300px_1fr]">
          <aside>
            <div className="rounded-2xl border border-[#e6e2da] bg-[#fffdfa] p-5 shadow-sm lg:sticky lg:top-[118px]">
              <h2 className="font-serif text-2xl font-bold text-[#17341f]">FAQ Categories</h2>
              <div className="mt-3 flex items-center gap-2 text-[#d29a2c]"><span className="h-px w-8 bg-current"/><span>✤</span></div>
              <div className="mt-5 grid gap-1.5">
                {faqGroups.map(({icon:Icon,label},index) => <button key={label} type="button" onClick={() => goToCategory(index)} className={`flex items-center justify-between rounded-xl px-3 py-3 text-left text-xs font-semibold transition ${activeCategory===index?"bg-[#eef5e9] text-[#0b6531]":"text-[#445047] hover:bg-[#f6f8f3] hover:text-[#0b6531]"}`}><span className="flex items-center gap-2.5"><Icon className="h-4 w-4"/>{label}</span><span>›</span></button>)}
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-[#0c4f2a] p-6 text-white">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white/12"><Headphones className="h-5 w-5 text-[#f0c451]"/></div>
              <h3 className="mt-4 font-serif text-2xl font-bold">Still Have Questions?</h3>
              <p className="mt-2 text-xs leading-6 text-white/75">Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.</p>
              <Link href="/contact" className="mt-5 inline-flex rounded-lg bg-white px-4 py-3 text-xs font-bold text-[#0c4f2a]">Contact Us →</Link>
              <div className="mt-5 border-t border-white/15 pt-4 text-xs text-white/80"><a href={siteContact.phones[0].href}>{siteContact.phones[0].display}</a><br/><a href={siteContact.phones[1].href}>{siteContact.phones[1].display}</a><br/><a href={siteContact.emailHref}>{siteContact.email}</a></div>
            </div>
          </aside>

          <div>
            {visibleGroups.map((group) => {
              const groupIndex = faqGroups.findIndex((entry) => entry.label === group.label);
              return <section id={`faq-group-${groupIndex}`} key={group.title} className={`${groupIndex ? "mt-10" : ""} scroll-mt-32`}>
                <h2 className="font-serif text-3xl font-bold text-[#17341f]">{group.title}</h2>
                <div className="mt-3 flex items-center gap-2 text-[#d29a2c]"><span className="h-px w-8 bg-current"/><span>✤</span><span className="h-px w-8 bg-current"/></div>
                <div className="mt-6 grid gap-3">
                  {group.items.map(([question,answer],itemIndex)=>{
                    const key=`${groupIndex}-${itemIndex}`;
                    const open=openKey===key;
                    return <article key={question} className={`overflow-hidden rounded-xl border transition ${open?"border-[#95b38d] bg-[#f4f8f1]":"border-[#e5e3dd] bg-white"}`}>
                      <button type="button" onClick={()=>setOpenKey(open?"":key)} className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left">
                        <span className="text-sm font-bold text-[#223827]">{question}</span>
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${open?"bg-[#0b6531] text-white":"bg-[#eff3ec] text-[#0b6531]"}`}><ChevronDown className={`h-4 w-4 transition ${open?"rotate-180":""}`}/></span>
                      </button>
                      {open?<div className="px-5 pb-5 text-xs leading-6 text-[#5b665d]">{answer}</div>:null}
                    </article>;
                  })}
                </div>
              </section>;
            })}
            <div className="mt-9 text-center"><button type="button" onClick={() => setShowAll((value) => !value)} className="rounded-full border border-[#a8b9a5] px-5 py-3 text-xs font-bold text-[#0b6531] transition hover:bg-[#eef5e9]">{showAll ? "Show Fewer Categories ↑" : "View More Categories ↓"}</button></div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff8ed] py-14">
        <div className="mx-auto max-w-[1180px] px-4">
          <h2 className="text-center font-serif text-3xl font-bold text-[#17341f]">Why Travelers Choose Rani Tour&apos;s</h2>
          <div className="mx-auto mt-3 h-px w-16 bg-[#d29a2c]"/>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">{trustItems.map(([Icon,title,text])=><div key={title} className="text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#c7d6c2] bg-white text-[#0b6531]"><Icon className="h-5 w-5"/></div><h3 className="mt-4 text-sm font-bold text-[#203524]">{title}</h3><p className="mx-auto mt-2 max-w-[190px] text-[11px] leading-5 text-[#667067]">{text}</p></div>)}</div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-[1180px] px-4"><div className="flex flex-col gap-5 rounded-2xl bg-[#0b4d29] px-7 py-7 text-white lg:flex-row lg:items-center lg:justify-between"><div><h2 className="font-serif text-2xl font-bold">Ready to Plan Your Journey?</h2><p className="mt-1 text-xs text-white/75">Your perfect trip is just a booking away. Get in touch with us today.</p></div><div className="flex flex-wrap gap-3"><a href={siteContact.phones[0].href} className="flex items-center gap-2 rounded-lg border border-white/35 px-5 py-3 text-xs font-bold"><Phone className="h-4 w-4"/>Call Now</a><Link href="/get-quote" className="rounded-lg bg-white px-5 py-3 text-xs font-bold text-[#0b4d29]">Get a Quote →</Link></div></div></div>
      </section>
    </>
  );
}
