import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Camera, Film, Clapperboard } from "lucide-react";
import bg from "@/assets/about-bg.jpeg";

const ease = [0.22, 1, 0.36, 1] as const;

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const [bgLoaded, setBgLoaded] = useState(false);

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full overflow-hidden min-h-screen flex items-center"
    >
      {/* Background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={{ y: 80, opacity: 0 }}
        animate={bgLoaded ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.img
          src={bg}
          alt=""
          onLoad={() => setBgLoaded(true)}
          style={{ y: bgY, scale: 1.04 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/20" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-14 w-full py-24">
        <div className="max-w-2xl md:max-w-[58%] lg:max-w-[55%] relative z-20">
          {/* Heading falls down first */}
          <motion.h2
            initial={{ opacity: 0, y: -80 }}
            animate={bgLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.5, ease }}
            className="font-display text-highlight text-6xl md:text-8xl lg:text-9xl leading-none font-light tracking-tight glow-text mb-10 md:mb-14"
          >
            STORY
          </motion.h2>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={bgLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4, ease }}
              className="w-16 h-px bg-highlight/60 mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: -30 }}
              animate={bgLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 1.7, ease }}
              className="text-lg md:text-2xl leading-relaxed text-foreground/90 font-light"
            >
              Annie Makes Studio is a creative production space focused on cinematic{" "}
              <span className="text-highlight">storytelling</span>,{" "}
              <span className="text-accent-red font-medium">VFX</span>,{" "}
              <span className="text-accent-red font-medium">animation</span>, and{" "}
              <span className="text-accent-red font-medium">AI-driven</span> content.
              Every project is crafted with intention, combining creativity and technology
              to create <span className="text-highlight">immersive</span> visual experiences.
            </motion.p>
          </div>
        </div>

        {/* Decorative animated cinema elements — pinned to extreme right */}
        <div
          aria-hidden
          className="pointer-events-none hidden lg:block absolute right-2 xl:right-6 top-1/2 -translate-y-1/2 w-[240px] xl:w-[300px] h-[400px]"
        >
          {/* Film reel — top right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={bgLoaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.1, delay: 2.0, ease }}
            className="absolute top-0 right-0"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity }}
              className="text-highlight/80 drop-shadow-[0_0_25px_hsl(44_100%_88%_/_0.35)]"
            >
              <Film size={110} strokeWidth={1.1} />
            </motion.div>
          </motion.div>

          {/* Clapperboard — middle right */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 12 }}
            animate={bgLoaded ? { opacity: 1, x: 0, rotate: -6 } : {}}
            transition={{ duration: 1.0, delay: 2.2, ease }}
            className="absolute top-[42%] right-[55%]"
          >
            <motion.div
              animate={{ rotate: [-6, 4, -6] }}
              transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
              className="text-accent-red drop-shadow-[0_0_20px_hsl(8_78%_58%_/_0.45)]"
            >
              <Clapperboard size={80} strokeWidth={1.3} />
            </motion.div>
          </motion.div>

          {/* Camera — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={bgLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 2.4, ease }}
            className="absolute bottom-0 right-0"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
              className="text-highlight drop-shadow-[0_0_28px_hsl(44_100%_88%_/_0.45)]"
            >
              <Camera size={100} strokeWidth={1.2} />
            </motion.div>
          </motion.div>

          {/* Soft glow halo */}
          <motion.div
            aria-hidden
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-0 -z-10 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle at 70% 50%, hsl(8 78% 58% / 0.35), transparent 65%)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
