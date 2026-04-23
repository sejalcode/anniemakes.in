import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import ribbon from "@/assets/hero-ribbon.jpg";

interface Props {
  onIntroComplete: () => void;
}

const Hero = ({ onIntroComplete }: Props) => {
  // 0: blank
  // 1: logo center fades in & scales up
  // 2: "ANNIE MAKES" reveals left-to-right behind the logo
  // 3: logo flies from center to header position
  // 4: nav appears (handled in parent via onIntroComplete)
  // 5: content fades in
  // 6: background animation starts
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),   // logo appears center & scales
      setTimeout(() => setStage(2), 1800),  // title reveals behind logo
      setTimeout(() => setStage(3), 3400),  // logo flies to header
      setTimeout(() => { setStage(4); onIntroComplete(); }, 4200), // nav appears
      setTimeout(() => setStage(5), 4800),  // content fades in
      setTimeout(() => setStage(6), 5600),  // background animation begins
    ];
    return () => timers.forEach(clearTimeout);
  }, [onIntroComplete]);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background ribbon — appears last */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 6 ? 0.85 : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 bg-cover bg-center animate-ribbon"
          style={{ backgroundImage: `url(${ribbon})`, mixBlendMode: "screen" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </motion.div>

      {/* Particle drift — last */}
      {stage >= 6 && (
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

      {/* Hero content area */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-8 md:px-14">
        {/* "ANNIE MAKES" — reveals left-to-right behind the logo (stage 2) */}
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
          animate={stage >= 5 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
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
                animate={stage >= 5 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
              >
                {s}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={stage >= 5 ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-16 group flex items-center gap-4 self-start"
        >
          <span className="tracking-[0.35em] text-sm text-highlight/90 group-hover:text-highlight transition-colors">VIEW WORK</span>
          <span className="w-12 h-px bg-highlight/60 group-hover:w-20 transition-all duration-500" />
          <span className="text-highlight/80">→</span>
        </motion.button>
      </div>

      {/* Center logo — appears at stage 1, sits on top of title at stage 2,
          then flies to header position at stage 3 */}
      {stage < 3 && (
        <motion.img
          src={logo}
          alt="Annie Makes"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: stage >= 1 ? 1 : 0,
            scale: stage >= 1 ? (stage >= 2 ? 1.15 : 1) : 0.4,
          }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 md:h-60 w-auto z-40 drop-shadow-[0_0_40px_rgba(255,240,196,0.4)] pointer-events-none"
        />
      )}

      {/* Logo flying from center to header position (stage 3) */}
      {stage === 3 && (
        <motion.img
          src={logo}
          alt=""
          initial={{
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            scale: 1.15,
            opacity: 1,
          }}
          animate={{
            top: "20px",
            left: "32px",
            x: "0%",
            y: "0%",
            scale: 0.32,
            opacity: 1,
          }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          className="fixed h-44 md:h-60 w-auto z-40 drop-shadow-[0_0_20px_rgba(255,240,196,0.3)] pointer-events-none origin-top-left"
        />
      )}

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={stage >= 5 ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.6 }}
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
