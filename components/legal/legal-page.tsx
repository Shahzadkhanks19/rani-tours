import Link from "next/link";
import { FileText, Headphones, Mail, Phone, ShieldCheck } from "lucide-react";
import { siteContact } from "@/lib/site-data";

type LegalSection = { title: string; paragraphs?: string[]; items?: string[] };

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, intro, updated, sections }: LegalPageProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#f7f4ec]">
        <div className="absolute inset-0 opacity-[.08]" style={{ backgroundImage: "radial-gradient(#0b6531 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-[1180px] px-4 py-14 sm:py-20">
          <div className="flex items-center gap-2 text-xs text-[#657067]"><Link href="/" className="hover:text-[#0b6531]">Home</Link><span>›</span><span>{title}</span></div>
          <div className="mt-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[.2em] text-[#b7791f]">{eyebrow}</span>
            <h1 className="mt-3 font-serif text-4xl font-bold text-[#17341f] sm:text-6xl">{title}</h1>
            <div className="mt-5 flex items-center gap-3 text-[#d29a2c]"><span className="h-px w-10 bg-current"/><span>✤</span><span className="h-px w-10 bg-current"/></div>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#536057] sm:text-base">{intro}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#dfe4db] bg-white/80 px-4 py-2 text-xs text-[#687269]"><FileText className="h-4 w-4 text-[#0b6531]"/>Last updated: {updated}</div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 lg:grid-cols-[280px_1fr]">
          <aside className="self-start lg:sticky lg:top-28">
            <div className="rounded-2xl border border-[#e3e5df] bg-[#fffdfa] p-5 shadow-sm">
              <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#edf5e8] text-[#0b6531]"><ShieldCheck className="h-5 w-5"/></div><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#b7791f]">Legal Information</p><p className="text-sm font-semibold text-[#203524]">Rani Tour&apos;s</p></div></div>
              <nav className="mt-5 grid gap-1.5" aria-label={`${title} sections`}>
                {sections.map((section, index) => <a key={section.title} href={`#section-${index + 1}`} className="rounded-lg px-3 py-2 text-xs leading-5 text-[#5f6961] transition hover:bg-[#edf5e8] hover:text-[#0b6531]">{index + 1}. {section.title}</a>)}
              </nav>
            </div>
            <div className="mt-5 rounded-2xl bg-[#0b4f2a] p-5 text-white">
              <Headphones className="h-6 w-6 text-[#e1bd58]"/><h2 className="mt-3 font-serif text-xl font-bold">Need clarification?</h2><p className="mt-2 text-xs leading-5 text-white/70">Contact our team if you have a question about this policy.</p>
              <div className="mt-4 grid gap-2 text-xs"><a href={siteContact.phones[0].href} className="flex items-center gap-2 hover:text-[#e1bd58]"><Phone className="h-4 w-4"/>{siteContact.phones[0].display}</a><a href={siteContact.emailHref} className="flex items-center gap-2 break-all hover:text-[#e1bd58]"><Mail className="h-4 w-4 shrink-0"/>{siteContact.email}</a></div>
            </div>
          </aside>

          <article className="min-w-0">
            <div className="rounded-[24px] border border-[#e6e5df] bg-white px-6 py-3 shadow-sm sm:px-9">
              {sections.map((section, index) => (
                <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-32 border-b border-[#ecece7] py-8 last:border-b-0">
                  <div className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#edf5e8] text-xs font-bold text-[#0b6531]">{String(index + 1).padStart(2,"0")}</span><div className="min-w-0 flex-1"><h2 className="font-serif text-2xl font-bold text-[#17341f]">{section.title}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 text-sm leading-7 text-[#5d675f]">{paragraph}</p>)}{section.items && <ul className="mt-4 grid gap-3">{section.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#5d675f]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9922e]"/><span>{item}</span></li>)}</ul>}</div></div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#fff8ed] py-10"><div className="mx-auto max-w-[1180px] px-4"><div className="flex flex-col gap-5 rounded-2xl bg-[#0b4f2a] px-7 py-7 text-white sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-serif text-2xl font-bold">Planning a journey with Rani Tour&apos;s?</h2><p className="mt-1 text-xs text-white/70">Review our policies, then request a personalized quotation for your trip.</p></div><Link href="/get-quote" className="w-fit rounded-full bg-white px-5 py-3 text-xs font-bold text-[#0b4f2a] transition hover:-translate-y-0.5">Get a Quote →</Link></div></div></section>
    </>
  );
}
