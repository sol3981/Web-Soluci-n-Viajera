import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ServicesSection } from "../components/ServicesSection";
import { FeaturedPackages } from "../components/FeaturedPackages";
import { DestinationCards } from "../components/DestinationCards";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { SobreNosotros } from "../components/SobreNosotros";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";

export function HomePage() {
  return (
    <div
      style={{
        fontFamily: "'Satoshi', 'Inter', sans-serif",
        backgroundColor: "#FAFAF8",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <Hero />
      <ServicesSection />
      <FeaturedPackages />
      <DestinationCards />
      <SobreNosotros />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}