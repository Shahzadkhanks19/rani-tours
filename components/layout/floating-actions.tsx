"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { siteContact } from "@/lib/site-data";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-[#17341f] text-white shadow-[0_12px_30px_rgba(0,0,0,.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0d2816] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9bd500] focus-visible:ring-offset-2"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      ) : null}

      <a
        href={siteContact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rani Tours on WhatsApp"
        title="WhatsApp Rani Tours"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,.3)] transition duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-[#20bd5a] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9bd500] focus-visible:ring-offset-2"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
}
