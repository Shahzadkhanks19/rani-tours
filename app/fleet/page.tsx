import type { Metadata } from "next";
import { FleetPageContent } from "@/components/fleet/fleet-page";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { connectToDatabase } from "@/lib/db";
import { FleetVehicle } from "@/models/FleetVehicle";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Fleet | Rani Tour's Jodhpur",
  description: "Explore Rani Tour's fleet of sedans, Innova, Tempo Travellers and tourist buses for safe and comfortable travel from Jodhpur.",
};

export default async function FleetPage() {
  await connectToDatabase();
  const rows = await FleetVehicle.find({ status: "published" }).sort({ sortOrder: 1, name: 1 }).lean();
  const vehicles = JSON.parse(JSON.stringify(rows));
  return (
    <>
      <Header />
      <main>
        <FleetPageContent vehicles={vehicles} />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
