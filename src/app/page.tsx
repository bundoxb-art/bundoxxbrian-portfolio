import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Payment from "@/components/Payment";
import Feedback from "@/components/Feedback";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#05070d", minHeight: "100vh" }}>
      <Hero />
      <TrustBar />
      <About />
      <Projects />
      <Skills />
      <Services />
      <Payment />
      <Feedback />
      <Contact />
      <Footer />
    </main>
  );
}