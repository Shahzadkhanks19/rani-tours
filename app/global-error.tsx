"use client";

import Image from "next/image";
import { Home, RotateCcw, TriangleAlert } from "lucide-react";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="m-0 bg-[#fffdf8] font-sans text-[#17341f] antialiased">
        <main className="grid min-h-screen place-items-center px-4 py-12">
          <section className="w-full max-w-2xl rounded-[28px] border border-[#dfe5db] bg-white p-7 text-center shadow-[0_22px_70px_rgba(11,77,41,.10)] sm:p-10">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#f5f8f1]"><Image src="/rani-tours-icon.svg" alt="Rani Tour's logo" width={58} height={58} priority /></div>
            <div className="mx-auto mt-6 grid h-12 w-12 place-items-center rounded-full bg-[#fff0e9] text-[#b4532f]"><TriangleAlert className="h-6 w-6"/></div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-[#0b6531]">Unexpected system error</p>
            <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Rani Tour&apos;s hit an unexpected problem.</h1>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#667067]">Please retry the application. If the problem continues, return to the homepage and try again in a moment.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={reset} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#d6a63a] px-6 text-sm font-bold text-[#17341f] transition hover:bg-[#e5b84d]"><RotateCcw className="h-4 w-4"/>Try Again</button>
              <a href="/" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#bdcaba] bg-white px-6 text-sm font-bold text-[#0b4d29] transition hover:border-[#0b6531] hover:bg-[#f5f9f2]"><Home className="h-4 w-4"/>Go Home</a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
