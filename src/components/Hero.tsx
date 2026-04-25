import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowDown } from "lucide-react";
import ribbon from "@/assets/hero-ribbon.jpg";

interface Props {
  onIntroComplete: () => void;
}

const Hero = ({ onIntroComplete }: Props) => {
  // Intro logo animation removed — show final UI immediately.
  useEffect(() => {
    onIntroComplete();
  }, [onIntroComplete]);

  const agencyName = "ANNIE MAKES";

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background ribbon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 bg-cover bg-center animate-ribbon"
          style={{ backgroundImage: `url(${ribbon})`, mixBlendMode: "screen" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, hsl(var(--surface)/0.25) 0%, hsl(var(--background)/0.85) 80%)" }}
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

      {/* Centered hero content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-10 text-center">
        <div className="overflow-hidden mb-6">
          <div className="flex justify-center flex-wrap">
            {agencyName.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(20px)", y: 50 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  delay: i * 0.05,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-highlight font-light tracking-tight inline-block text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] glow-text leading-none"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-light text-xs sm:text-sm md:text-base text-foreground/75 tracking-[0.3em] uppercase mb-12"
        >
          Cinematic Storytelling • VFX • AI Content
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
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
