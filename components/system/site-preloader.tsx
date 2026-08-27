"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function SitePreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const key = "rani-tours-preloader-seen";
    const alreadySeen = sessionStorage.getItem(key) === "1";
    const delay = alreadySeen ? 0 : 1050;
    if (!alreadySeen) sessionStorage.setItem(key, "1");
    const timer = window.setTimeout(() => setVisible(false), delay);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] grid place-items-center bg-[#fffdf8]"
          aria-label="Loading Rani Tour's"
          role="status"
        >
          <div className="flex flex-col items-center px-6 text-center">
            <div className="relative grid h-28 w-28 place-items-center">
              <motion.span
                className="absolute inset-0 rounded-full border border-[#d6a63a]/35"
                animate={{ scale: [0.86, 1.15], opacity: [0.8, 0] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                initial={{ scale: 0.86, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="grid h-24 w-24 place-items-center rounded-full bg-white shadow-[0_14px_40px_rgba(11,77,41,.14)]"
              >
                <Image src="/rani-tours-icon.svg" alt="Rani Tour's logo" width={76} height={76} priority />
              </motion.div>
            </div>
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
              <div className="mt-4 font-serif text-3xl font-bold text-[#0b4d29]">Rani Tour&apos;s</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7a846f]">Your Tour Expert</div>
            </motion.div>
            <div className="mt-6 h-1 w-36 overflow-hidden rounded-full bg-[#e8eee3]">
              <motion.div
                className="h-full rounded-full bg-[#d6a63a]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
