import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [active, setActive] = useState("home");
  const [inFooter, setInFooter] = useState(false);

  useEffect(() => {
    document.title = "Annie Makes Studio — Cinematic Storytelling, VFX & AI Content";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Annie Makes Studio is a creative production house crafting cinematic storytelling, VFX, animation, and AI-driven content.");
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "work", "services", "contact"];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const footer = document.getElementById("site-footer");
    let footerObs: IntersectionObserver | null = null;
    if (footer) {
      footerObs = new IntersectionObserver(
        entries => entries.forEach(e => setInFooter(e.isIntersecting)),
        { threshold: 0.05 }
      );
      footerObs.observe(footer);
    }

    return () => {
      observer.disconnect();
      footerObs?.disconnect();
    };
  }, []);

  const handleNav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-background text-foreground">
      <Header active={active} onNavigate={handleNav} visible={headerVisible && !inFooter} />
      <Hero onIntroComplete={() => setHeaderVisible(true)} />
      <About />
      <Work />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
