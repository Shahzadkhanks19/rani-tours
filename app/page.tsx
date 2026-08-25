import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { HomeSections } from "@/components/home/home-sections";
import { TripSearch } from "@/components/home/trip-search";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TripSearch />
        <HomeSections />
      </main>
      <Footer />
    </>
  );
}
