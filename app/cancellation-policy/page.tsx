import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = { title: "Cancellation Policy | Rani Tour's", description: "Read the general cancellation, modification and refund policy for travel services arranged by Rani Tour's." };

const sections = [
  { title: "Cancellation Overview", paragraphs: ["We understand that plans can change. This policy explains the general approach to cancellations, booking changes and refunds for services arranged by Rani Tour's. Exact conditions may vary by route, vehicle, season, duration and third-party arrangements."] },
  { title: "Cancellation Charges", paragraphs: ["Cancellation charges, where applicable, depend on how close the cancellation is to the scheduled journey and on costs already committed for the booking. The applicable amount will be confirmed for the specific booking rather than assumed from a general website enquiry."] },
  { title: "No Show Policy", paragraphs: ["If passengers do not arrive at the agreed pickup point or cannot be contacted within a reasonable waiting period, the booking may be treated as a no-show. Waiting, parking, additional distance or cancellation charges may apply depending on the confirmed trip terms."] },
  { title: "Rescheduling Policy", paragraphs: ["Requests to change travel dates, pickup points, destinations, vehicles, passenger counts or itinerary details are subject to availability. A material change may require a revised quotation."] },
  { title: "How to Cancel", paragraphs: ["Please contact Rani Tour's as soon as possible using the phone, email or WhatsApp details shown on this website. A cancellation is treated as received when our team acknowledges the request against the relevant booking."] },
  { title: "Refund Process", paragraphs: ["Where a payment is eligible for refund after applicable cancellation charges and committed third-party costs, the refundable balance will be communicated to the customer. Processing time can vary depending on the original payment method, bank or payment service provider."] },
  { title: "Important Notes", items: ["Hotels, attractions, guides, permits and other third-party services may have their own cancellation rules.", "Weather, road closures, government restrictions or emergencies may require rescheduling or another practical resolution.", "For the most accurate information, always refer to the conditions shared for your confirmed booking."] },
  { title: "Contact Us", paragraphs: ["For cancellation, rescheduling or refund assistance, contact Rani Tour's with your booking details and our team will explain the applicable conditions."] },
];

export default function CancellationPolicyPage() {
  return <><Header /><main><LegalPage eyebrow="Flexible. Fair. Transparent." title="Cancellation Policy" intro="We understand that plans can change. Our cancellation policy is designed to be fair and transparent for our valued customers." updated="26 August 2026" variant="cancellation" sections={sections} /></main><Footer /><FloatingActions /></>;
}
