import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = { title: "Terms & Conditions | Rani Tour's", description: "Terms and conditions governing enquiries, quotations and travel services provided by Rani Tour's." };

const sections = [
  { title: "Introduction", paragraphs: ["Welcome to Rani Tour's. These Terms & Conditions apply to bookings and services made through our website, phone, email, WhatsApp, or other official communication channels."] },
  { title: "Booking & Payments", paragraphs: ["All bookings are subject to availability. A booking is confirmed only after Rani Tour's explicitly confirms the requested service and any required advance or agreed booking condition has been completed."], items: ["Customers should verify passenger details, pickup location, dates, times and itinerary before confirmation.", "The applicable fare, inclusions, exclusions and additional charges will be based on the quotation shared for the journey.", "Changes requested after confirmation remain subject to availability and may affect the final price."] },
  { title: "Cancellations & Refunds", paragraphs: ["Cancellation charges, refund eligibility and related timelines are governed by our Cancellation Policy and any specific conditions communicated for your booking. Certain third-party or special arrangements may have separate non-refundable charges."] },
  { title: "Our Services", paragraphs: ["Vehicle models and service descriptions shown on the website represent the types of travel services generally offered. Exact availability is verified when the booking is confirmed."] },
  { title: "Customer Responsibilities", items: ["Provide accurate passenger and journey information.", "Be available at the agreed pickup point and time.", "Comply with applicable laws and reasonable safety instructions.", "Take responsibility for personal belongings during the journey."] },
  { title: "Limitation of Liability", paragraphs: ["Rani Tour's will use reasonable care in arranging travel services. To the extent permitted by law, we are not responsible for losses arising solely from circumstances outside our reasonable control, including severe weather, road closures, government action or delays caused by third parties."] },
  { title: "Privacy Policy", paragraphs: ["Personal information provided while making an enquiry or booking is handled according to our Privacy Policy."] },
  { title: "Changes to Terms", paragraphs: ["These terms may be updated as our services or legal requirements change. The latest version published on this page will apply from its stated update date."] },
];

export default function TermsPage() {
  return <><Header /><main><LegalPage eyebrow="Please Read Carefully" title="Terms & Conditions" intro="These Terms & Conditions govern your use of services provided by Rani Tour's. By booking with us, you agree to these terms." updated="26 August 2026" variant="terms" sections={sections} /></main><Footer /><FloatingActions /></>;
}
