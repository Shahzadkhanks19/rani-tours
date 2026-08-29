"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { siteContact } from "@/lib/site-data";

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7" fill="currentColor">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.49 14.8L2 22l5.34-1.4A9.9 9.9 0 1 0 12.04 2Zm0 17.97a8.11 8.11 0 0 1-4.13-1.13l-.3-.18-3.17.83.85-3.09-.2-.31a8.13 8.13 0 1 1 6.95 3.88Zm4.46-6.1c-.24-.12-1.44-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.25-.63.8-.77.96-.14.16-.29.18-.53.06-.25-.12-1.03-.38-1.96-1.21-.73-.65-1.21-1.44-1.35-1.69-.14-.24-.02-.37.1-.5.11-.11.25-.28.37-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.55-1.34-.76-1.84-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7.58.25 1.04.4 1.4.52.58.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastVisible = false;

    const update = () => {
      frame = 0;
      const nextVisible = window.scrollY > 420;
      if (nextVisible !== lastVisible) {
        lastVisible = nextVisible;
        setShowTop(nextVisible);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
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
        <WhatsappIcon />
      </a>
    </div>
  );
}
