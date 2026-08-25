"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-[#17341f] text-white shadow-[0_12px_30px_rgba(0,0,0,.24)] transition hover:bg-[#0d2816] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9bd500] focus-visible:ring-offset-2"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <motion.a
        href={siteContact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rani Tours on WhatsApp"
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="group flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] px-4 text-white shadow-[0_14px_34px_rgba(37,211,102,.3)] transition hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9bd500] focus-visible:ring-offset-2"
      >
        <FaWhatsapp className="h-6 w-6 shrink-0" />
        <span className="hidden pr-1 text-sm font-bold sm:inline">WhatsApp</span>
      </motion.a>
    </div>
  );
}
