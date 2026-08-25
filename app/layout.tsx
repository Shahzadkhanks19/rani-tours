import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rani Tour's | Taxi & Rajasthan Tour Packages",
    template: "%s | Rani Tour's",
  },
  description:
    "Reliable taxi services, Rajasthan tours and custom travel experiences from Jodhpur with Rani Tour's.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
