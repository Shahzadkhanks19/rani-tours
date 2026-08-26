import Image from "next/image";
import Link from "next/link";
import {
  BadgeIndianRupee,
  CircleUserRound,
  FileText,
  Headphones,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { siteContact } from "@/lib/site-data";

type LegalSection = { title: string; paragraphs?: string[]; items?: string[] };
type LegalVariant = "privacy" | "terms" | "cancellation";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  variant: LegalVariant;
};

const highlights = {
  privacy: [
    [ShieldCheck, "Secure & Trusted", "We protect your data with responsible safeguards."],
    [LockKeyhole, "100% Confidential", "Your information is handled with care."],
    [CircleUserRound, "User Control", "You can contact us about your personal information."],
    [FileText, "Transparent Policy", "Clear information about how data is handled."],
  ],
  terms: [
    [FileText, "Clear Terms", "Straightforward conditions for enquiries and bookings."],
    [ShieldCheck, "Fair & Transparent", "Trip-specific conditions are communicated clearly."],
    [CircleUserRound, "Customer First", "Responsibilities and service expectations are explained."],
    [Headphones, "24/7 Assistance", "Our team is available if you need clarification."],
  ],
  cancellation: [
    [CircleUserRound, "Customer Friendly", "Clear guidance when your travel plans change."],
    [BadgeIndianRupee, "No Hidden Charges", "Applicable conditions are explained for your booking."],
    [FileText, "Easy Process", "Contact our team with your booking details to cancel."],
    [Headphones, "24/7 Assistance", "Our team is here to help with changes and cancellations."],
  ],
} as const;

const heroImages: Record<LegalVariant, { src: string; alt: string; position: string }> = {
  privacy: {
    src: "https://images.pexels.com/photos/19195945/pexels-photo-19195945.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Hawa Mahal in Jaipur, Rajasthan",
    position: "object-center",
  },
  terms: {
    src: "https://images.pexels.com/photos/17831363/pexels-photo-17831363.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "City Palace and Udaipur cityscape in Rajasthan",
    position: "object-center",
  },
  cancellation: {
    src: "https://images.pexels.com/photos/35130760/pexels-photo-35130760.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Aerial view of Jaisalmer Fort in Rajasthan",
    position: "object-center",
  },
};

export function LegalPage({ eyebrow, title, intro, updated, sections, variant }: LegalPageProps) {
  const heroImage = heroImages[variant];

  return (
    <>
      <section className="relative overflow-hidden bg-[#f7f6f0]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
          <Image src={heroImage.src} alt={heroImage.alt} fill loading="eager" className={`object-cover ${heroImage.position}`} sizes="(min-width:1024px) 64vw, 100vw" />
          <div className="absolute inset-0 bg-white/5" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f4] via-[#faf9f4]/80 via-45% to-white/0" />

        <div className="relative mx-auto min-h-[455px] max-w-[1180px] px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-xs text-[#5d695f]"><Link href="/" className="transition hover:text-[#0b6531]">Home</Link><span>›</span><span>{title}</span></div>
          <div className="mt-10 max-w-[600px]">
            <h1 className="font-serif text-5xl font-bold leading-none text-[#17341f] sm:text-6xl">{title}</h1>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#c77c22] sm:text-4xl">{eyebrow}</h2>
            <div className="mt-5 flex items-center gap-3 text-[#d29a2c]"><span className="h-px w-10 bg-current"/><span>✤</span><span className="h-px w-10 bg-current"/></div>
            <p className="mt-6 max-w-[520px] text-sm leading-7 text-[#465148]">{intro}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-[11px] text-[#6b746d]"><FileText className="h-4 w-4 text-[#0b6531]"/>Last updated: {updated}</div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-6 pb-5">
        <div className="mx-auto max-w-[1180px] px-4">
          <div className="grid overflow-hidden rounded-2xl border border-[#e7e3da] bg-white shadow-lg shadow-black/5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights[variant].map(([Icon, heading, text], index) => (
              <div key={heading} className={`flex gap-4 p-5 ${index ? "border-t border-[#ece8df] sm:border-l sm:border-t-0" : ""}`}>
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#edf5e8] text-[#0b6531]"><Icon className="h-5 w-5"/></div>
                <div><h3 className="text-sm font-bold text-[#213725]">{heading}</h3><p className="mt-1 text-[11px] leading-5 text-[#687269]">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 lg:grid-cols-[300px_1fr]">
          <aside className="self-start">
            <div className="rounded-2xl border border-[#e5e2d9] bg-[#fffdfa] p-5 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#17341f]">In This Page</h2>
              <div className="mt-3 flex items-center gap-2 text-[#d29a2c]"><span className="h-px w-8 bg-current"/><span>✤</span></div>
              <nav className="mt-5 grid gap-1" aria-label={`${title} sections`}>
                {sections.map((section, index) => (
                  <a key={section.title} href={`#section-${index + 1}`} className="group flex items-center justify-between rounded-xl px-3 py-3 text-xs font-semibold text-[#4f5b52] transition hover:bg-[#eef5e9] hover:text-[#0b6531]">
                    <span>{index + 1}. {section.title}</span><span className="transition group-hover:translate-x-0.5">›</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-6 rounded-2xl bg-[#0b4f2a] p-6 text-white shadow-lg shadow-[#0b4f2a]/10">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-[#e2bd57]"><Headphones className="h-5 w-5"/></div>
              <h3 className="mt-4 font-serif text-2xl font-bold">Need Help?</h3>
              <p className="mt-2 text-xs leading-6 text-white/75">If you have questions regarding this policy, our team is here to help.</p>
              <Link href="/contact" className="mt-5 inline-flex rounded-lg bg-white px-4 py-3 text-xs font-bold text-[#0b4f2a]">Contact Us →</Link>
              <div className="mt-5 border-t border-white/15 pt-4 text-xs text-white/80"><a href={siteContact.phones[0].href} className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#e2bd57]"/>{siteContact.phones[0].display}</a><a href={siteContact.emailHref} className="mt-2 flex items-center gap-2 break-all"><Mail className="h-4 w-4 shrink-0 text-[#e2bd57]"/>{siteContact.email}</a></div>
            </div>
          </aside>

          <article className="min-w-0 rounded-2xl border border-[#e8e5de] bg-white px-6 py-2 shadow-sm sm:px-9">
            {sections.map((section, index) => (
              <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-32 border-b border-[#eceae4] py-8 last:border-b-0">
                <h2 className="font-serif text-2xl font-bold text-[#17341f]">{index + 1}. {section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 text-sm leading-7 text-[#59655c]">{paragraph}</p>)}
                {section.items && <ul className="mt-4 grid gap-3">{section.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#59655c]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c98e2b]"/><span>{item}</span></li>)}</ul>}
              </section>
            ))}
            <div className="mb-8 flex gap-3 rounded-xl border border-[#cfe0c9] bg-[#f3f8f0] p-5"><ShieldCheck className="h-5 w-5 shrink-0 text-[#0b6531]"/><p className="text-xs leading-6 text-[#566258]">We are committed to clear, fair and transparent service. If anything on this page needs clarification, please contact Rani Tour&apos;s before confirming your journey.</p></div>
          </article>
        </div>
      </section>

      <section className="bg-[#fff8ed] py-10"><div className="mx-auto max-w-[1180px] px-4"><div className="flex flex-col gap-5 rounded-2xl bg-[#0b4f2a] px-7 py-7 text-white sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-serif text-2xl font-bold">Plan with <span className="text-[#e3b94e]">Peace of Mind</span></h2><p className="mt-1 text-xs text-white/70">Clear policies. Reliable service. Memorable journeys.</p></div><Link href="/get-quote" className="w-fit rounded-full border border-[#e3b94e] px-5 py-3 text-xs font-bold text-[#f0ca63] transition hover:bg-[#e3b94e] hover:text-[#17341f]">Get a Quote →</Link></div></div></section>
    </>
  );
}
