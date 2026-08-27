import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, MapPinned } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-[#fffdf8]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(214,166,58,.10),transparent_36%)]" aria-hidden="true" />
        <section className="relative mx-auto grid min-h-[620px] max-w-[1180px] place-items-center px-4 py-16 text-center">
          <div className="max-w-2xl">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-[#d9e4d4] bg-white shadow-[0_18px_45px_rgba(11,77,41,.10)]">
              <Image src="/rani-tours-icon.svg" alt="Rani Tour's logo" width={70} height={70} priority />
            </div>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-[#0b6531]">Lost on the route?</p>
            <div className="mt-3 font-serif text-[92px] font-black leading-none text-[#0b4d29] sm:text-[128px]">404</div>
            <h1 className="mt-2 font-serif text-3xl font-bold text-[#17341f] sm:text-4xl">This destination isn&apos;t on our map.</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#647066]">The page may have moved, the link may be outdated, or the destination may no longer be available. We can get you back to a valid route.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#d6a63a] px-6 text-sm font-bold text-[#17341f] transition hover:-translate-y-0.5 hover:bg-[#e5b84d]"><Home className="h-4 w-4"/>Back to Home</Link>
              <Link href="/destinations" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#b9c8b7] bg-white px-6 text-sm font-bold text-[#0b4d29] transition hover:border-[#0b6531] hover:bg-[#f5f9f2]"><MapPinned className="h-4 w-4"/>Explore Destinations</Link>
              <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#b9c8b7] bg-white px-6 text-sm font-bold text-[#0b4d29] transition hover:border-[#0b6531] hover:bg-[#f5f9f2]"><ArrowLeft className="h-4 w-4"/>Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
