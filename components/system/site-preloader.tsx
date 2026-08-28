"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function SitePreloader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const key = "rani-tours-preloader-seen";
    if (sessionStorage.getItem(key) === "1" || reduceMotion) return;
    sessionStorage.setItem(key, "1");
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 420);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none fixed inset-0 z-[9999] grid place-items-center bg-[#fffdf8]"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center px-6 text-center">
            <div className="relative grid h-28 w-28 place-items-center">
              <motion.span
                className="absolute inset-0 rounded-full border border-[#d6a63a]/35"
                animate={{ scale: [0.9, 1.08], opacity: [0.6, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid h-24 w-24 place-items-center rounded-full bg-white shadow-[0_14px_40px_rgba(11,77,41,.14)]"
              >
                <Image src="/rani-tours-icon.svg" alt="" width={76} height={76} priority />
              </motion.div>
            </div>
            <div className="mt-4 font-serif text-3xl font-bold text-[#0b4d29]">Rani Tour&apos;s</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7a846f]">Your Tour Expert</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
