import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Box, Brain, Film, Hexagon, ArrowRight } from "lucide-react";
import { CinematicSection, Reveal } from "./CinematicSection";
import bg from "@/assets/services-bg.jpeg";

const SERVICES = [
  { num: "01", title: "VFX", icon: Box, desc: "High-end visual effects and compositing that bring imagination to life with cinematic precision." },
  { num: "02", title: "AI CONTENT", icon: Brain, desc: "AI-driven content creation and workflow solutions that accelerate ideas and elevate creative storytelling." },
  { num: "03", title: "VIDEO EDITING", icon: Film, desc: "Story-driven editing that shapes raw footage into powerful, engaging, and emotionally resonant stories." },
  { num: "04", title: "ANIMATION", icon: Hexagon, desc: "Creative animation and motion graphics that communicate ideas through movement, style, and emotion." },
];

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div ref={ref}>
      <CinematicSection
        id="services"
        className="min-h-screen py-24"
        background={
          <>
            <motion.img
              src={bg}
              alt=""
              style={{ y: bgY, scale: 1.06 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/35 to-background/70" />
          </>
        }
      >
        <div className="max-w-6xl mx-auto px-8 md:px-14">
          <div className="text-center mb-16">
            <Reveal order={0}>
              <p className="tracking-[0.4em] text-xs text-highlight/80 mb-2">WHAT WE DO</p>
            </Reveal>
            <Reveal order={1}>
              <div className="mx-auto w-16 h-px bg-highlight/60 mb-4" />
            </Reveal>
            <Reveal order={2}>
              <h2 className="font-display text-5xl md:text-7xl text-highlight font-light glow-text tracking-[0.15em]">SERVICES</h2>
            </Reveal>
            <Reveal order={3}>
              <p className="mt-6 text-foreground/80 max-w-xl mx-auto font-light">
                End-to-end creative production services crafted for storytellers,<br className="hidden md:block" />
                brands, and forward-thinking visionaries.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} order={4 + i}>
                  <div className="glass-card group rounded-md p-6 md:p-8 flex gap-6 items-start cursor-pointer h-full">
                    <Icon className="text-highlight/80 shrink-0" size={56} strokeWidth={1} />
                    <div className="flex-1">
                      <p className="text-xs text-foreground/50 mb-1">{s.num}</p>
                      <h3 className="font-display text-2xl md:text-3xl text-highlight tracking-wider mb-2">{s.title}</h3>
                      <div className="w-10 h-px bg-highlight/50 mb-3" />
                      <p className="text-sm text-foreground/75 leading-relaxed font-light">{s.desc}</p>
                    </div>
                    <ArrowRight className="text-highlight/0 group-hover:text-highlight/80 transition-all duration-500 self-end" size={20} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </CinematicSection>
    </div>
  );
};

export default Services;
