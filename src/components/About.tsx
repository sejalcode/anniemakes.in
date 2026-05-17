import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Camera, Film, Clapperboard } from "lucide-react";
import { CinematicSection, Reveal } from "./CinematicSection";
import bg from "@/assets/about-bg.jpeg";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div ref={ref}>
      <CinematicSection
        id="about"
        className="min-h-screen flex items-center"
        foregroundDelay={1.0}
        background={
          <>
            {/* Background drops up into view first */}
            <motion.div
              className="absolute inset-0"
              initial={{ y: 120, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={bg}
                alt=""
                style={{ y: bgY, scale: 1.04 }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-background/30 to-transparent" />
            </motion.div>
          </>
        }
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14 w-full py-24">
          {/* Title falls down from above after background settles */}
          <Reveal
            as="h2"
            order={0}
            y={-60}
            className="font-display text-highlight text-6xl md:text-8xl lg:text-9xl leading-none font-light tracking-tight glow-text mb-10 md:mb-14"
          >
            STORY
          </Reveal>

          <div className="max-w-2xl space-y-4">
            <Reveal order={1} y={-30}>
              <div className="w-16 h-px bg-highlight/60 mb-6" />
            </Reveal>
            <Reveal order={2} y={-30}>
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
