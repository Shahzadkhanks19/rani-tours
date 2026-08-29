"use client";

import { ChevronLeft, ChevronRight, CheckCircle2, Star } from "lucide-react";
import { useEffect, useState } from "react";

const reviews = [
  { name: "Bharath Acharya", time: "a year ago", text: "Great experience with the service. The driver was on time and driving was safe and reasonable. I would recommend this service to others.", url: "https://www.google.com/maps/contrib/115466863396884456209/reviews?hl=en-GB" },
  { name: "Bharat Borana", time: "13 years ago", text: "Excellent service with good knowledge of local sight seen tour. Fully satisfied.", url: "https://www.google.com/maps/contrib/115120289813398986829/reviews?hl=en-GB" },
  { name: "Aditya Vyas", time: "Edited 3 years ago", text: "Most affordable and reliable cab or taxi service in town. 👍", url: "https://www.google.com/maps/contrib/105887633599062594516/reviews?hl=en-GB" },
  { name: "kamlesh purohit", time: "2 years ago", text: "Very nice Service and good behaviour", url: "https://www.google.com/maps/contrib/101969734732370018906/reviews?hl=en-IN" },
  { name: "Danish Khan", time: "Edited 6 years ago", text: "Excellent Service", url: "https://www.google.com/maps/contrib/101858844519142106684/reviews?hl=en-IN" },
] as const;

function GoogleMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.63-2.36l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.93A6.02 6.02 0 0 1 6.08 12c0-.67.11-1.32.31-1.93V7.45H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.55l3.35-2.62Z" />
      <path fill="#EA4335" d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.45l3.35 2.62C7.18 7.7 9.39 5.94 12 5.94Z" />
    </svg>
  );
}

export function GoogleReviewsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % reviews.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const visible = [reviews[index], reviews[(index + 1) % reviews.length]];
  const previous = () => setIndex((value) => (value - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((value) => (value + 1) % reviews.length);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <GoogleMark className="h-7 w-7 shrink-0" />
          <div>
            <div className="text-sm font-bold text-[#202124]">Google Reviews</div>
            <div className="flex items-center gap-1 text-[10px] font-medium text-[#5f6368]"><CheckCircle2 className="h-3 w-3 fill-[#1a73e8] text-white" /> Verified Google reviews</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={previous} aria-label="Previous Google review" className="grid h-8 w-8 place-items-center rounded-full border border-[#dadce0] bg-white text-[#5f6368] shadow-sm transition hover:border-[#1a73e8] hover:text-[#1a73e8]"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={next} aria-label="Next Google review" className="grid h-8 w-8 place-items-center rounded-full border border-[#dadce0] bg-white text-[#5f6368] shadow-sm transition hover:border-[#1a73e8] hover:text-[#1a73e8]"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div key={index} className="review-slide-in grid gap-4 sm:grid-cols-2">
        {visible.map((review, cardIndex) => (
          <a key={`${review.name}-${cardIndex}`} href={review.url} target="_blank" rel="noopener noreferrer" className={`${cardIndex === 1 ? "hidden sm:block" : "block"} rounded-2xl border border-[#dadce0] bg-white p-4 shadow-[0_3px_10px_rgba(60,64,67,.12)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(60,64,67,.16)]`}>
            <div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8f0fe] text-sm font-bold uppercase text-[#1a73e8]">{review.name.charAt(0)}</div><div className="min-w-0"><div className="truncate text-xs font-bold text-[#202124]">{review.name}</div><div className="mt-0.5 text-[10px] text-[#70757a]">{review.time}</div></div></div><GoogleMark className="h-5 w-5 shrink-0" /></div>
            <div className="mt-3 flex items-center gap-0.5" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="h-3.5 w-3.5 fill-[#fbbc04] text-[#fbbc04]" />)}</div>
            <p className="mt-3 min-h-[72px] text-[11px] leading-[18px] text-[#3c4043]">{review.text}</p>
            <div className="mt-3 flex items-center gap-1.5 border-t border-[#f1f3f4] pt-3 text-[10px] font-semibold text-[#1a73e8]"><CheckCircle2 className="h-3.5 w-3.5" /> Verified Google Review</div>
          </a>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-1.5" aria-label="Google review slider pages">
        {reviews.map((review, dotIndex) => <button key={review.name} type="button" onClick={() => setIndex(dotIndex)} aria-label={`Show review ${dotIndex + 1}`} aria-current={dotIndex === index ? "true" : undefined} className={`h-1.5 rounded-full transition-all ${dotIndex === index ? "w-5 bg-[#1a73e8]" : "w-1.5 bg-[#bdc1c6] hover:bg-[#80868b]"}`} />)}
      </div>
    </div>
  );
}
