import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#003f22] text-white">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div><div className="flex items-center gap-3"><Image src="/rani-tours-icon.svg" alt="" width={58} height={58}/><div className="text-xl font-black">Rani Tour&apos;s</div></div><p className="mt-4 max-w-sm text-sm leading-6 text-white/70">Thoughtful taxi services and memorable Rajasthan journeys, starting from the heart of Jodhpur.</p></div>
        <div><h3 className="font-black">Explore</h3><div className="mt-4 grid gap-3 text-sm text-white/70"><Link href="/taxi-services">Taxi Services</Link><Link href="/tour-packages">Tour Packages</Link><Link href="/destinations">Destinations</Link><Link href="/fleet">Our Fleet</Link></div></div>
        <div><h3 className="font-black">Popular Routes</h3><div className="mt-4 grid gap-3 text-sm text-white/70"><span>Jodhpur → Jaisalmer</span><span>Jodhpur → Udaipur</span><span>Jodhpur → Jaipur</span><span>Jodhpur → Mount Abu</span></div></div>
        <div><h3 className="font-black">Contact</h3><div className="mt-4 grid gap-3 text-sm text-white/70"><span>Jodhpur, Rajasthan, India</span><span>+91 98292 35555</span><span>info@ranitour.in</span><span>Available 24×7</span></div></div>
      </div>
      <div className="border-t border-white/10"><div className="site-shell flex flex-col gap-3 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Rani Tour&apos;s. All rights reserved.</span><div className="flex gap-4"><Link href="/privacy-policy">Privacy</Link><Link href="/terms-and-conditions">Terms</Link><Link href="/cancellation-policy">Cancellation</Link></div></div></div>
    </footer>
  );
}
