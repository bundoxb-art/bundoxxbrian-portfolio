import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import QuoteCalculator from "@/components/QuoteCalculator";
import Payment from "@/components/Payment";
import InquiryWizard from "@/components/InquiryWizard";
import Feedback from "@/components/Feedback";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--bg, #05070d)", minHeight: "100vh" }}>
      <Hero />
      <TrustBar />
      <About />
      <Projects />
      <Skills />
      <Services />
      <QuoteCalculator />
      <Payment />
      <InquiryWizard />
      <Feedback />
      <Contact />
      <Footer />
    </main>
  );
}