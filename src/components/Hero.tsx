import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import ribbon from "@/assets/hero-ribbon.jpg";

interface Props {
  onIntroComplete: () => void;
}

const Hero = ({ onIntroComplete }: Props) => {
  const [stage, setStage] = useState(0);
  // 0: blank, 1: logo center scale, 2: title reveal, 3: logo to header, 4: content visible

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 400),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => { setStage(3); onIntroComplete(); }, 3200),
      setTimeout(() => setStage(4), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onIntroComplete]);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background ribbon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 4 ? 0.85 : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 bg-cover bg-center animate-ribbon"
          style={{ backgroundImage: `url(${ribbon})`, mixBlendMode: "screen" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </motion.div>

      {/* Particle dots */}
      {stage >= 4 && (
        <div className="absolute inset-0 pointer-events-none opacity-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-highlight/60"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>
      )}

      {/* Center logo intro animation */}
      {stage < 3 && (
        <motion.img
          src={logo}
          alt="Annie Makes"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: stage >= 1 ? 1 : 0,
            scale: stage >= 1 ? (stage >= 2 ? 1.1 : 1) : 0.4,
          }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 md:h-56 w-auto z-30 drop-shadow-[0_0_30px_rgba(255,240,196,0.3)]"
        />
      )}

      {/* Hero content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-8 md:px-14">
        <motion.h1
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={stage >= 2 ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
          className="font-display text-highlight text-6xl md:text-8xl lg:text-9xl font-light tracking-wide glow-text"
        >
          ANNIE MAKES
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={stage >= 4 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="mt-16 flex items-start gap-6"
        >
          <div className="flex flex-col items-center pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight glow-cream" />
            <span className="w-px h-40 bg-gradient-to-b from-highlight/60 to-transparent my-1" />
            <span className="w-1.5 h-1.5 rounded-full bg-highlight/40" />
          </div>
          <ul className="space-y-4 tracking-[0.35em] text-sm md:text-base text-foreground/90 font-light">
            {["VFX", "AI CONTENT", "ANIMATION", "VIDEO PRODUCTION"].map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -20 }}
                animate={stage >= 4 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
              >
                {s}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={stage >= 4 ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-16 group flex items-center gap-4 self-start"
        >
          <span className="tracking-[0.35em] text-sm text-highlight/90 group-hover:text-highlight transition-colors">VIEW WORK</span>
          <span className="w-12 h-px bg-highlight/60 group-hover:w-20 transition-all duration-500" />
          <span className="text-highlight/80">→</span>
        </motion.button>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={stage >= 4 ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full border border-highlight/50 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-highlight"
          />
        </div>
        <span className="tracking-[0.3em] text-[10px] text-highlight/70">SCROLL TO DISCOVER</span>
      </motion.div>
    </section>
  );
};

export default Hero;
