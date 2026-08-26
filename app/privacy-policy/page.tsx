import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = { title: "Privacy Policy | Rani Tour's", description: "Read how Rani Tour's handles personal information submitted through its travel enquiry and booking services." };

const sections = [
  { title: "Introduction", paragraphs: ["At Rani Tour's, we value your trust and are committed to protecting your personal information and privacy. This policy explains how information is collected and handled when you use our website or travel services."] },
  { title: "Information We Collect", paragraphs: ["We collect information that you voluntarily provide when you contact us, request a quotation, make a travel enquiry or communicate with our team."], items: ["Name, phone number, email address and contact details.", "Pickup point, destination, travel dates, group size, preferred vehicle and itinerary requirements.", "Messages, enquiries and other information you choose to share with us."] },
  { title: "How We Use Information", items: ["To respond to enquiries and prepare travel quotations.", "To coordinate vehicles, drivers, routes, pickup details and travel arrangements.", "To communicate booking updates and provide customer support.", "To maintain service records, improve our services and meet applicable legal or accounting requirements."] },
  { title: "Information Sharing", paragraphs: ["We do not sell or rent your personal information. Information may be shared only where reasonably necessary to provide your requested service, such as with assigned drivers, vehicle operators, accommodation or travel partners, payment/service providers, or authorities where disclosure is legally required."] },
  { title: "Data Security", paragraphs: ["We take reasonable measures to protect information from unauthorized access, misuse or disclosure. Information is retained only for as long as reasonably required for enquiries, bookings, business records, dispute handling or legal obligations."] },
  { title: "Your Rights", paragraphs: ["You may contact us to request correction or deletion of personal information held by us, subject to information that we are required to retain for legitimate business, accounting, dispute-resolution or legal purposes."] },
  { title: "Cookies & Tracking", paragraphs: ["The website may use essential cookies, analytics or similar technologies to understand website usage, maintain functionality and improve the visitor experience."] },
  { title: "Third-Party Links", paragraphs: ["Independent third-party websites and services linked from this website operate under their own privacy practices. Rani Tour's does not control those external services."] },
  { title: "Children's Privacy", paragraphs: ["Our services are intended to be arranged by adults. We do not knowingly seek personal information directly from children without appropriate involvement of a parent or guardian."] },
  { title: "Changes to This Policy", paragraphs: ["We may update this Privacy Policy as our services, website or legal requirements change. The latest version published on this page will apply from its stated update date."] },
  { title: "Contact Us", paragraphs: ["For privacy-related questions or requests, contact Rani Tour's using the phone number, email address or office details shown on this website."] },
];

export default function PrivacyPolicyPage() {
  return <><Header /><main><LegalPage eyebrow="Your Privacy. Our Priority." title="Privacy Policy" intro="At Rani Tour's, we value your trust and are committed to protecting your personal information and privacy." updated="26 August 2026" variant="privacy" sections={sections} /></main><Footer /><FloatingActions /></>;
}
