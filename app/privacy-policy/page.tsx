import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Privacy Policy | Rani Tour's", description: "Read how Rani Tour's handles personal information submitted through its travel enquiry and booking services." };

const sections = [
  { title: "Information We Collect", paragraphs: ["We collect information that you voluntarily provide when you contact us, request a quotation, make a travel enquiry or communicate with our team."], items: ["Name, phone number, email address and contact details.", "Pickup point, destination, travel dates, group size, preferred vehicle and itinerary requirements.", "Messages, enquiries and other information you choose to share with us."] },
  { title: "How We Use Your Information", items: ["To respond to enquiries and prepare travel quotations.", "To coordinate vehicles, drivers, routes, pickup details and travel arrangements.", "To communicate booking updates and provide customer support.", "To maintain service records, improve our services and meet applicable legal or accounting requirements."] },
  { title: "Sharing of Information", paragraphs: ["We do not sell or rent your personal information. Information may be shared only where reasonably necessary to provide your requested service, such as with assigned drivers, vehicle operators, accommodation or travel partners, payment/service providers, or authorities where disclosure is legally required."] },
  { title: "Payments and Third-Party Services", paragraphs: ["Where a payment or third-party service is used, that provider may process information under its own privacy practices. Rani Tour's does not claim control over independent third-party websites or services linked from this website."] },
  { title: "Cookies and Website Data", paragraphs: ["The website may use essential cookies, analytics or similar technologies to understand website usage, maintain functionality and improve the visitor experience. Browser settings can generally be used to control optional cookies where applicable."] },
  { title: "Data Security and Retention", paragraphs: ["We take reasonable measures to protect information from unauthorized access, misuse or disclosure. Information is retained only for as long as reasonably required for enquiries, bookings, business records, dispute handling or legal obligations."] },
  { title: "Your Choices and Rights", paragraphs: ["You may contact us to request correction or deletion of personal information held by us, subject to information that we are required to retain for legitimate business, accounting, dispute-resolution or legal purposes."] },
  { title: "Children's Privacy", paragraphs: ["Our services are intended to be arranged by adults. We do not knowingly seek personal information directly from children without appropriate involvement of a parent or guardian."] },
  { title: "Policy Updates", paragraphs: ["We may update this Privacy Policy as our services, website or legal requirements change. The latest version published on this page will apply from its stated update date."] },
  { title: "Contact Us", paragraphs: ["For privacy-related questions or requests, contact Rani Tour's using the phone number, email address or office details shown on this website."] },
];

export default function PrivacyPolicyPage() { return <LegalPage eyebrow="Your Privacy Matters" title="Privacy Policy" intro="This policy explains what information Rani Tour's may collect through this website and our travel services, why we use it, and the choices available to you." updated="26 August 2026" sections={sections} />; }
