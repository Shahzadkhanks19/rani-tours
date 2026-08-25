import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { HomeSections } from "@/components/home/home-sections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HomeSections />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
