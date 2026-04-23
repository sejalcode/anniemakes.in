import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CinematicSection, Reveal } from "./CinematicSection";
import bg from "@/assets/about-bg.jpeg";
import ribbon from "@/assets/hero-ribbon.jpg";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <div ref={ref}>
      <CinematicSection
        id="about"
        className="min-h-screen flex items-center"
        background={
          <>
            <motion.img
              src={bg}
              alt=""
              style={{ y: bgY, scale: 1.1 }}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/40" />
            <motion.div
              style={{ y: ribbonY }}
              className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-30"
            >
              <img src={ribbon} alt="" className="w-full h-full object-cover animate-ribbon" style={{ mixBlendMode: "screen" }} />
            </motion.div>
          </>
        }
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 w-full py-24">
          <Reveal as="h2" order={0} className="font-display text-accent-red text-[20vw] md:text-[16vw] leading-none font-normal tracking-tight select-none pointer-events-none opacity-20">
            STORY
          </Reveal>
          <div className="-mt-16 md:-mt-32 max-w-2xl space-y-4">
            <Reveal order={1}>
              <p className="text-lg md:text-2xl leading-relaxed text-foreground/90 font-light">
                Annie Makes Studio is a creative production space focused on cinematic{" "}
                <span className="text-highlight">storytelling</span>,{" "}
                <span className="text-accent-red font-medium">VFX</span>,{" "}
                <span className="text-accent-red font-medium">animation</span>, and{" "}
                <span className="text-accent-red font-medium">AI-driven</span> content.
                Every project is crafted with intention, combining creativity and technology
                to create <span className="text-highlight">immersive</span> visual experiences.
              </p>
            </Reveal>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
};

export default About;
