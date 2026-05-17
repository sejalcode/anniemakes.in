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

          {/* Decorative animated cinema elements (right side) */}
          <div
            aria-hidden
            className="pointer-events-none hidden md:block absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 w-[280px] lg:w-[360px] h-[360px] lg:h-[440px]"
          >
            {/* Film reel — rotates continuously */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, ease: "linear", repeat: Infinity }}
                className="text-highlight/80 drop-shadow-[0_0_25px_hsl(44_100%_88%_/_0.35)]"
              >
                <Film size={140} strokeWidth={1.1} />
              </motion.div>
            </motion.div>

            {/* Clapperboard — subtle clap/tilt loop */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 12 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.0, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-28 right-32 lg:right-44"
            >
              <motion.div
                animate={{ rotate: [-6, 4, -6] }}
                transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
                className="text-accent-red drop-shadow-[0_0_20px_hsl(8_78%_58%_/_0.45)]"
              >
                <Clapperboard size={96} strokeWidth={1.3} />
              </motion.div>
            </motion.div>

            {/* Camera — floats up and down */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-4 right-10"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
                className="text-highlight drop-shadow-[0_0_28px_hsl(44_100%_88%_/_0.45)]"
              >
                <Camera size={120} strokeWidth={1.2} />
              </motion.div>
            </motion.div>

            {/* Soft glow halo behind elements */}
            <motion.div
              aria-hidden
              animate={{ opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle at 60% 50%, hsl(8 78% 58% / 0.35), transparent 65%)" }}
            />
          </div>
        </div>
      </CinematicSection>
    </div>
  );
};

export default About;
