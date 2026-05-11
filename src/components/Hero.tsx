import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mouse, Instagram } from "lucide-react";
import ribbon from "@/assets/hero-ribbon.jpg";

interface Props {
  onIntroComplete: () => void;
}

const SERVICES = ["VFX", "3D MODELLING", "AI CONTENT", "ANIMATION", "VIDEO PRODUCTION"];
const AGENCY = "ANNIE MAKES";

const INTRO_KEY = "annie-hero-intro-played";

const Hero = ({ onIntroComplete }: Props) => {
  // Skip the staged reveal if the intro has already played this session.
  const alreadyPlayed =
    typeof window !== "undefined" && sessionStorage.getItem(INTRO_KEY) === "1";
  // Stage 0: blank, 1: ribbon visible, 2: title + content
  const [stage, setStage] = useState(alreadyPlayed ? 2 : 0);

  useEffect(() => {
    if (alreadyPlayed) {
      onIntroComplete();
      return;
    }
    const t1 = setTimeout(() => setStage(1), 400);   // ribbon pattern fades in
    const t2 = setTimeout(() => setStage(2), 1800);  // title + rest reveal
    const t3 = setTimeout(() => {
      onIntroComplete();
      try { sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onIntroComplete, alreadyPlayed]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#1a0402" }}
    >
      {/* SVG turbulence filter — creates wavy heat-haze warp on the ribbon */}
      <svg className="absolute -z-10 w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="ribbon-warp" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.022"
              numOctaves="2"
              seed="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="14s"
                values="0.012 0.022; 0.018 0.030; 0.012 0.022"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Ribbon pattern — right side only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 1 ? 1 : 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Flowing ribbon — vertical curtain stretch + wavy warp */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${ribbon})`,
              opacity: 1,
              filter: "url(#ribbon-warp)",
              transformOrigin: "center",
            }}
            animate={{
              scaleY: [1.04, 1.12, 1.04],
              scaleX: [1.02, 1.06, 1.02],
              y: ["-1%", "1.5%", "-1%"],
            }}
            transition={{
              duration: 11,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>

        {/* Reddish-brown ambient glow around the ribbon edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 65% 50%, rgba(140, 50, 25, 0.28) 0%, rgba(90, 25, 12, 0.18) 40%, transparent 75%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Fade ribbon into dark on the left edge — keep title legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #1a0402 0%, rgba(26,4,2,0.95) 20%, rgba(26,4,2,0.55) 38%, rgba(26,4,2,0.1) 58%, transparent 78%)",
          }}
        />

        {/* Reddish-brown vignette on the outer borders */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, transparent 35%, rgba(60, 18, 10, 0.55) 80%, rgba(30, 8, 4, 0.85) 100%)",
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
                className="font-display font-light text-highlight inline-block leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl glow-text"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Instagram link */}
        <motion.a
          href="https://www.instagram.com/anniemakesstudio/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-flex items-center gap-3 mb-10 px-5 py-2.5 rounded-full w-fit group overflow-hidden border border-accent-red/60 bg-gradient-to-r from-accent-red/30 via-accent-red/20 to-highlight/10 text-highlight hover:text-background hover:border-highlight transition-all duration-500"
          style={{ boxShadow: "0 0 24px hsl(var(--accent-red) / 0.55)" }}
        >
          {/* Pulsing glow ring */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: [
              "0 0 0px hsl(var(--accent-red) / 0.0)",
              "0 0 28px hsl(var(--accent-red) / 0.75)",
              "0 0 0px hsl(var(--accent-red) / 0.0)",
            ] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Sweeping shine on hover */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-highlight/80 to-transparent" />
          {/* Hover fill */}
          <span className="absolute inset-0 bg-highlight scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-0" />
          <Instagram size={20} strokeWidth={2.5} className="relative z-10 text-highlight group-hover:text-background transition-colors" />
          <span className="relative z-10 tracking-[0.35em] text-xs md:text-sm font-bold uppercase">@anniemakesstudio</span>
        </motion.a>

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
            initial={{ x: -8, opacity: 0 }}
            animate={stage >= 2 ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
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
