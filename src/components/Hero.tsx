import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import logo from "@/assets/logo.png";
import ribbon from "@/assets/hero-ribbon.jpg";

interface Props {
  onIntroComplete: () => void;
}

const INTRO_KEY = "annie-makes-intro-played";

const Hero = ({ onIntroComplete }: Props) => {
  // Stages:
  // 0: blank dark screen
  // 1: logo fades in at center & scales up
  // 2: logo flies to header position (top-left) and stays
  // 3: "ANNIE MAKES" reveals letter-by-letter in the center
  // 4: tagline + CTA + scroll cue fade in (top/bottom enter)
  // 5: background ribbon + particles start
  const alreadyPlayed = typeof window !== "undefined" && sessionStorage.getItem(INTRO_KEY) === "1";
  const [stage, setStage] = useState(alreadyPlayed ? 5 : 0);

  useEffect(() => {
    if (alreadyPlayed) {
      onIntroComplete();
      return;
    }
    const timers = [
      setTimeout(() => setStage(1), 400),     // logo center appears
      setTimeout(() => setStage(2), 2000),    // logo flies to header
      setTimeout(() => { setStage(3); onIntroComplete(); }, 3100), // ANNIE MAKES + nav
      setTimeout(() => setStage(4), 4400),    // content
      setTimeout(() => {
        setStage(5);
        sessionStorage.setItem(INTRO_KEY, "1");
      }, 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onIntroComplete, alreadyPlayed]);

  const agencyName = "ANNIE MAKES";

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background ribbon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 5 ? 0.85 : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 bg-cover bg-center animate-ribbon"
          style={{ backgroundImage: `url(${ribbon})`, mixBlendMode: "screen" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--surface)/0.4) 0%, hsl(var(--background)) 75%)" }}
        />
      </motion.div>

      {/* Soft glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(var(--accent-red)/0.5) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 md:w-80 md:h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(var(--highlight)/0.25) 0%, transparent 70%)", filter: "blur(35px)" }}
        />
      </div>

      {/* Particles */}
      {stage >= 5 && (
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

      {/* Centered hero content (final UI) */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-10 text-center">
        {/* "ANNIE MAKES" — appears at stage 3 (after logo flies up) */}
        <div className="overflow-hidden mb-6">
          <div className="flex justify-center flex-wrap">
            {agencyName.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(20px)", y: 50 }}
                animate={stage >= 3 ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
                transition={{
                  delay: alreadyPlayed ? i * 0.04 : i * 0.08,
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-highlight font-light tracking-tight inline-block text-6xl md:text-8xl lg:text-[9rem] glow-text leading-none"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Tagline (top→down enter) */}
        <motion.p
          initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
          animate={stage >= 4 ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-light text-sm md:text-base text-foreground/75 tracking-[0.3em] uppercase mb-12"
        >
          Cinematic Storytelling • VFX • AI Content
        </motion.p>

        {/* CTA (bottom→up enter) */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={stage >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 bg-accent-red/90 text-foreground tracking-[0.25em] text-xs font-medium uppercase border border-highlight/20 hover:bg-accent-red transition-colors duration-500"
          style={{ boxShadow: "0 0 30px hsl(var(--accent-red)/0.35)" }}
        >
          <span className="relative z-10">Get In Touch</span>
          <motion.span
            className="relative z-10"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Intro logo overlay: center → header (only when intro plays) */}
      {!alreadyPlayed && stage < 2 && (
        <motion.img
          src={logo}
          alt="Annie Makes"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: stage >= 1 ? 1 : 0,
            scale: stage >= 1 ? 1.15 : 0.4,
          }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 md:h-60 w-auto z-40 drop-shadow-[0_0_40px_rgba(255,240,196,0.4)] pointer-events-none"
        />
      )}
      {!alreadyPlayed && stage === 2 && (
        <motion.img
          src={logo}
          alt=""
          initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", scale: 1.15, opacity: 1 }}
          animate={{ top: "20px", left: "32px", x: "0%", y: "0%", scale: 0.32, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          className="fixed h-44 md:h-60 w-auto z-40 drop-shadow-[0_0_20px_rgba(255,240,196,0.3)] pointer-events-none origin-top-left"
        />
      )}

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={stage >= 4 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-highlight/70 hover:text-highlight transition-colors"
      >
        <span className="tracking-[0.3em] text-[10px] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
