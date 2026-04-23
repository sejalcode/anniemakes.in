import { motion } from "framer-motion";
import { Box, Brain, Film, Hexagon, Clapperboard, ArrowRight } from "lucide-react";
import bg from "@/assets/services-bg.jpeg";

const SERVICES = [
  { num: "01", title: "VFX", icon: Box, desc: "High-end visual effects and compositing that bring imagination to life with cinematic precision." },
  { num: "02", title: "AI CONTENT", icon: Brain, desc: "AI-driven content creation and workflow solutions that accelerate ideas and elevate creative storytelling." },
  { num: "03", title: "VIDEO EDITING", icon: Film, desc: "Story-driven editing that shapes raw footage into powerful, engaging, and emotionally resonant stories." },
  { num: "04", title: "ANIMATION", icon: Hexagon, desc: "Creative animation and motion graphics that communicate ideas through movement, style, and emotion." },
];

const Services = () => {
  return (
    <section id="services" className="relative min-h-screen w-full py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={bg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="tracking-[0.4em] text-xs text-highlight/80 mb-2">WHAT WE DO</p>
          <div className="mx-auto w-16 h-px bg-highlight/60 mb-4" />
          <h2 className="font-display text-5xl md:text-7xl text-highlight font-light glow-text tracking-[0.15em]">SERVICES</h2>
          <p className="mt-6 text-foreground/80 max-w-xl mx-auto font-light">
            End-to-end creative production services crafted for storytellers,<br className="hidden md:block" />
            brands, and forward-thinking visionaries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="glass-card group rounded-md p-6 md:p-8 flex gap-6 items-start cursor-pointer"
              >
                <Icon className="text-highlight/80 shrink-0" size={56} strokeWidth={1} />
                <div className="flex-1">
                  <p className="text-xs text-foreground/50 mb-1">{s.num}</p>
                  <h3 className="font-display text-2xl md:text-3xl text-highlight tracking-wider mb-2">{s.title}</h3>
                  <div className="w-10 h-px bg-highlight/50 mb-3" />
                  <p className="text-sm text-foreground/75 leading-relaxed font-light">{s.desc}</p>
                </div>
                <ArrowRight className="text-highlight/0 group-hover:text-highlight/80 transition-all duration-500 self-end" size={20} />
              </motion.div>
            );
          })}
        </div>

        {/* Full-width 5th card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card group rounded-md p-6 md:p-8 mt-5 flex gap-6 items-center cursor-pointer"
        >
          <Clapperboard className="text-highlight/80 shrink-0" size={56} strokeWidth={1} />
          <div className="flex-1">
            <p className="text-xs text-foreground/50 mb-1">05</p>
            <h3 className="font-display text-2xl md:text-3xl text-highlight tracking-wider mb-2">VIDEO PRODUCTION</h3>
            <div className="w-10 h-px bg-highlight/50 mb-3" />
            <p className="text-sm text-foreground/75 leading-relaxed font-light max-w-3xl">Full-scale production from concept to delivery — directing, cinematography, post, and finishing under one cinematic roof.</p>
          </div>
          <ArrowRight className="text-highlight/0 group-hover:text-highlight/80 transition-all duration-500" size={20} />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
