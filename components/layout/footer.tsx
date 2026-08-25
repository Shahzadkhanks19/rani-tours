import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const quickLinks = ["Home", "About Us", "Taxi Services", "Tour Packages", "Destinations", "Fleet", "Corporate Travel", "Gallery", "Blog", "Contact", "Enquiry", "Privacy Policy"];
const services = ["Local Taxi", "Rajasthan Tours", "Outstation Taxi", "All India Taxi", "Airport Transfers", "Wedding & Events"];
const destinations = ["Jodhpur", "Jaisalmer", "Jaipur", "Udaipur", "Mount Abu", "Pushkar", "Ranthambore", "Ajmer", "Bikaner", "Many More"];

export function Footer() {
  return (
    <footer className="bg-[#003f22] text-white">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-9 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.2fr_.8fr_1fr_1.05fr]">
        <div>
          <div className="flex items-center gap-3"><Image src="/rani-tours-icon.svg" alt="Rani Tour's logo" width={48} height={48} /><div><div className="font-serif text-2xl font-bold">Rani Tour&apos;s</div><div className="text-[9px] text-white/70">Your Tour Expert</div></div></div>
          <p className="mt-4 text-[11px] leading-[18px] text-white/70">Your trusted travel partner in Jodhpur for Rajasthan and all India taxi services. Safe journeys. Happy memories.</p>
          <div className="mt-4 flex gap-2">{["f", "◎", "◉", "▶"].map((item) => <span key={item} className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-xs">{item}</span>)}</div>
        </div>

        <FooterGroup title="Quick Links"><div className="grid grid-cols-2 gap-x-5 gap-y-1.5">{quickLinks.map((item) => <Link key={item} href={item === "Home" ? "/" : `/${item.toLowerCase().replaceAll(" ", "-")}`} className="text-[11px] text-white/72 hover:text-white">{item}</Link>)}</div></FooterGroup>
        <FooterGroup title="Services"><div className="grid gap-1.5">{services.map((item) => <span key={item} className="text-[11px] text-white/72">• {item}</span>)}</div></FooterGroup>
        <FooterGroup title="Destinations"><div className="grid grid-cols-2 gap-x-4 gap-y-1.5">{destinations.map((item) => <span key={item} className="text-[11px] text-white/72">{item}</span>)}</div></FooterGroup>
        <FooterGroup title="Contact Us">
          <div className="grid gap-2 text-[11px] text-white/75">
            <a href="tel:+919828069795" className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#d8b752]" />+91 98280 69795</a>
            <a href="tel:+919414167196" className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#d8b752]" />+91 94141 67196</a>
            <a href="mailto:info@ranitour.in" className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#d8b752]" />info@ranitour.in</a>
            <span className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d8b752]" />Jodhpur, Rajasthan, India</span>
          </div>
        </FooterGroup>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-4 py-4 text-[10px] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Rani Tour&apos;s. All Rights Reserved.</span>
          <div className="flex flex-wrap gap-4"><Link href="/terms-and-conditions">Terms & Conditions</Link><span>|</span><Link href="/privacy-policy">Privacy Policy</Link><span>|</span><Link href="/cancellation-policy">Cancellation Policy</Link></div>
          <span>Designed with ♥ in Rajasthan</span>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h3 className="text-xs font-bold uppercase tracking-[0.06em] text-[#e1bd58]">{title}</h3><div className="mt-4">{children}</div></div>;
}
