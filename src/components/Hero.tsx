import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mouse } from "lucide-react";
import ribbon from "@/assets/hero-ribbon.jpg";

interface Props {
  onIntroComplete: () => void;
}

const SERVICES = ["VFX", "AI CONTENT", "ANIMATION", "VIDEO PRODUCTION"];
const AGENCY = "ANNIE MAKES";

const Hero = ({ onIntroComplete }: Props) => {
  // Stage 0: blank, 1: ribbon visible, 2: title + content
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 500);   // ribbon pattern fades in
    const t2 = setTimeout(() => setStage(2), 1600);  // title + rest reveal
    const t3 = setTimeout(() => onIntroComplete(), 2400); // header appears
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onIntroComplete]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#1a0402" }}
    >
      {/* Ribbon pattern — right side only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 1 ? 1 : 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute inset-y-0 right-0 w-full md:w-[75%] pointer-events-none"
      >
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-right animate-ribbon"
          style={{ backgroundImage: `url(${ribbon})`, mixBlendMode: "screen", opacity: 0.85 }}
        />
        {/* Fade ribbon into dark on the left edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #1a0402 0%, rgba(26,4,2,0.95) 22%, rgba(26,4,2,0.55) 45%, rgba(26,4,2,0.15) 70%, transparent 100%)",
          }}
        />
        {/* Vignette to deepen edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 78% 55%, transparent 0%, rgba(10,2,1,0.55) 75%, rgba(10,2,1,0.85) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-20 lg:px-28">
        {/* ANNIE MAKES title */}
        <div className="overflow-hidden mb-16 md:mb-24">
          <div className="flex flex-wrap">
            {AGENCY.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
                animate={
                  stage >= 2
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 80, filter: "blur(20px)" }
                }
                transition={{
                  delay: stage >= 2 ? i * 0.06 : 0,
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display font-light text-highlight inline-block leading-[0.95] text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] glow-text"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Services list with timeline */}
        <div className="relative pl-8 md:pl-10 mb-12 max-w-md">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-2 bottom-2 w-px bg-accent-red/70"
          />
          <ul className="space-y-5 md:space-y-6">
            {SERVICES.map((s, i) => (
              <li key={s} className="relative">
                {/* Dot */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={stage >= 2 ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 + i * 0.15 }}
                  className="absolute -left-[34px] md:-left-[42px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-red"
                  style={{ boxShadow: "0 0 12px hsl(var(--accent-red))" }}
                />
                <motion.span
                  initial={{ opacity: 0, y: -15 }}
                  animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 1.0 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="block tracking-[0.35em] text-sm md:text-base text-foreground/95 font-light"
                >
                  {s}
                </motion.span>
              </li>
            ))}
          </ul>
        </div>

        {/* VIEW WORK link */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          className="group inline-flex items-center gap-5 tracking-[0.35em] text-xs md:text-sm text-highlight/90 hover:text-highlight transition-colors w-fit"
        >
          <span>VIEW WORK</span>
          <span className="relative block w-16 md:w-20 h-px bg-highlight/70 overflow-hidden">
            <motion.span
              className="absolute inset-y-0 left-0 w-full bg-highlight"
              initial={{ x: "-100%" }}
              animate={stage >= 2 ? { x: "0%" } : {}}
              transition={{ duration: 0.9, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-highlight"
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 2.1 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-highlight/80 hover:text-highlight transition-colors"
      >
        <Mouse size={22} strokeWidth={1.25} />
        <span className="tracking-[0.35em] text-[10px] uppercase">Scroll to Discover</span>
      </motion.button>
    </section>
  );
};

export default Hero;
