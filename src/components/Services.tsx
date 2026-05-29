import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Box, Brain, Film, Hexagon, Layers3 } from "lucide-react";
import { Reveal } from "./CinematicSection";
import bg from "@/assets/services-bg.jpeg";
import bgVfx from "@/assets/service-vfx.jpg";
import bg3d from "@/assets/service-3d.jpg";
import bgAi from "@/assets/service-ai.jpg";
import bgEdit from "@/assets/service-edit.jpg";
import bgAnimation from "@/assets/service-animation.jpg";

interface ServiceItem {
  num: string;
  title: string;
  icon: typeof Box;
  desc: string;
  hue: string;
  flavor: "slit" | "depth" | "glitch" | "pulse" | "fluid";
  bg: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    title: "VFX",
    icon: Box,
    desc: "Cinematic compositing and high-end visual effects that bring imagination to life with precision.",
    hue: "28 95% 62%",
    flavor: "slit",
    bg: bgVfx,
  },
  {
    num: "02",
    title: "3D MODELS",
    icon: Layers3,
    desc: "Sculpted geometry, materials and lighting — from product renders to fully realized cinematic worlds.",
    hue: "210 20% 88%",
    flavor: "depth",
    bg: bg3d,
  },
  {
    num: "03",
    title: "AI CONTENT",
    icon: Brain,
    desc: "AI-driven content creation and workflows that accelerate ideas and elevate creative storytelling.",
    hue: "315 90% 70%",
    flavor: "glitch",
    bg: bgAi,
  },
  {
    num: "04",
    title: "VIDEO EDITING",
    icon: Film,
    desc: "Story-driven editing that shapes raw footage into powerful, engaging, emotionally resonant films.",
    hue: "208 95% 68%",
    flavor: "pulse",
    bg: bgEdit,
  },
  {
    num: "05",
    title: "ANIMATION",
    icon: Hexagon,
    desc: "Motion graphics and fluid animation that communicate ideas through movement, style and emotion.",
    hue: "180 80% 72%",
    flavor: "fluid",
    bg: bgAnimation,
  },
];

/* ---------- Hooks ---------- */
const useIsDesktop = () => {
  const [is, setIs] = useState(
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIs(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return is;
};

/* ---------- Wireframe rotating cube for 3D MODELS ---------- */
const WireframeCube = ({ hue }: { hue: string }) => (
  <motion.svg
    aria-hidden
    viewBox="-60 -60 120 120"
    className="absolute inset-0 m-auto w-[55%] h-[55%] opacity-50"
    style={{ color: `hsl(${hue})` }}
    animate={{ rotate: 360 }}
    transition={{ duration: 30, ease: "linear", repeat: Infinity }}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      style={{ filter: `drop-shadow(0 0 10px hsl(${hue} / 0.7))` }}
    >
      <rect x="-26" y="-26" width="52" height="52" />
      <rect x="-38" y="-38" width="52" height="52" />
      <line x1="-26" y1="-26" x2="-38" y2="-38" />
      <line x1="26" y1="-26" x2="14" y2="-38" />
      <line x1="26" y1="26" x2="14" y2="14" />
      <line x1="-26" y1="26" x2="-38" y2="14" />
    </g>
  </motion.svg>
);

/* ---------- Per-panel decorative background ---------- */
const PanelBackground = ({ s }: { s: ServiceItem }) => {
  const wash = (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse 70% 60% at 50% 50%, hsl(${s.hue} / 0.22), transparent 70%)`,
        mixBlendMode: "screen",
      }}
    />
  );
  const baseImg = (extraStyle: React.CSSProperties = {}) => (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${s.bg})`, opacity: 0.85, ...extraStyle }}
    />
  );
  switch (s.flavor) {
    case "slit":
      return (
        <>
          {baseImg({ filter: "saturate(1.2) hue-rotate(-10deg)" })}
          {wash}
        </>
      );
    case "depth":
      return (
        <>
          {baseImg()}
          <WireframeCube hue={s.hue} />
          {wash}
        </>
      );
    case "glitch":
      return (
        <>
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${s.bg})`,
              opacity: 0.85,
            }}
            animate={{ x: [0, -4, 3, -2, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {wash}
        </>
      );
    case "pulse":
      return (
        <>
          {baseImg()}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(circle at 50% 50%, hsl(${s.hue} / 0.4), transparent 65%)`,
            }}
          />
          {wash}
        </>
      );
    case "fluid":
      return (
        <>
          {baseImg()}
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `linear-gradient(120deg, hsl(${s.hue} / 0.32), transparent 40%, hsl(${s.hue} / 0.22) 80%)`,
              backgroundSize: "200% 200%",
              mixBlendMode: "screen",
            }}
          />
          {wash}
        </>
      );
  }
};

/* ---------- A single horizontal panel ---------- */
const Panel = ({
  s,
  index,
  count,
  trackProgress,
}: {
  s: ServiceItem;
  index: number;
  count: number;
  trackProgress: MotionValue<number>;
}) => {
  const reduce = useReducedMotion();
  const Icon = s.icon;

  // local progress: 0 entering, 0.5 centered, 1 leaving
  const start = Math.max(0, (index - 0.5) / (count - 1));
  const end = Math.min(1, (index + 0.5) / (count - 1));
  const local = useTransform(trackProgress, [start, (start + end) / 2, end], [0, 0.5, 1]);

  // bell curve that peaks at center
  const center = useTransform(local, [0, 0.5, 1], [0, 1, 0]);
  // subtle stretch (1.0 at center, 1.12 at edges) — readable, not squashed
  const scaleY = useTransform(center, [0, 1], [1.12, 1]);
  const opacity = useTransform(center, [0, 1], [0.35, 1]);

  return (
    <div
      className="relative shrink-0 h-screen flex items-center justify-center px-6 lg:px-12"
      style={{ width: "100vw" }}
    >
      <div className="absolute inset-6 lg:inset-12 rounded-lg overflow-hidden border border-highlight/15 bg-background/10">
        <PanelBackground s={s} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/40" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start">
        <div className="flex items-center gap-4 mb-6 w-full">
          <span className="font-display text-sm tracking-[0.35em] text-foreground/60">{s.num}</span>
          <span className="h-px flex-1 bg-highlight/25" />
          <Icon
            size={32}
            strokeWidth={1}
            className="text-highlight/85"
            style={{ filter: `drop-shadow(0 0 12px hsl(${s.hue} / 0.7))` }}
          />
        </div>

        <motion.h3
          style={{
            scaleY: reduce ? 1 : scaleY,
            opacity: reduce ? 1 : opacity,
            transformOrigin: "center",
            color: `hsl(${s.hue})`,
            textShadow: `0 0 24px hsl(${s.hue} / 0.5), 0 2px 0 hsl(0 0% 0% / 0.3)`,
          }}
          className="font-display font-light tracking-[0.15em] text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1] break-words w-full"
        >
          {s.title}
        </motion.h3>

        <div className="mt-6 w-20 h-px" style={{ background: `hsl(${s.hue} / 0.8)` }} />

        <p className="mt-6 max-w-xl text-base lg:text-lg text-foreground/85 leading-relaxed font-light">
          {s.desc}
        </p>
      </div>
    </div>
  );
};

/* ---------- Mobile / tablet: vertical card list ---------- */
const MobileServices = () => (
  <div className="px-6 space-y-5 max-w-2xl mx-auto">
    {SERVICES.map((s) => {
      const Icon = s.icon;
      return (
        <Reveal key={s.title}>
          <div
            className="relative rounded-md p-6 border border-highlight/15 overflow-hidden glass-card"
            style={{ boxShadow: `0 0 30px hsl(${s.hue} / 0.15)` }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 80% 70% at 50% 0%, hsl(${s.hue} / 0.18), transparent 70%)`,
              }}
            />
            <div className="relative flex items-start gap-4">
              <Icon
                size={40}
                strokeWidth={1}
                className="text-highlight/85 shrink-0"
                style={{ filter: `drop-shadow(0 0 10px hsl(${s.hue} / 0.6))` }}
              />
              <div className="flex-1">
                <p className="text-xs text-foreground/55 tracking-[0.3em]">{s.num}</p>
                <h3
                  className="font-display text-3xl tracking-[0.15em] mt-1"
                  style={{
                    color: `hsl(${s.hue})`,
                    textShadow: `0 0 18px hsl(${s.hue} / 0.45)`,
                  }}
                >
                  {s.title}
                </h3>
                <div className="w-10 h-px my-3" style={{ background: `hsl(${s.hue} / 0.7)` }} />
                <p className="text-sm text-foreground/80 leading-relaxed font-light">{s.desc}</p>
              </div>
            </div>
          </div>
        </Reveal>
      );
    })}
  </div>
);

/* ---------- Section ---------- */
const Services = () => {
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  // Track has N panels of 100vw. Need to translate from 0 to -(N-1)*100vw.
  const totalShift = `-${(SERVICES.length - 1) * 100}vw`;
  const x = useTransform(smoothProgress, [0, 1], ["0vw", totalShift]);

  // Active hue for ambient glow + progress bar
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const unsub = smoothProgress.on("change", (p) => {
      const i = Math.min(SERVICES.length - 1, Math.max(0, Math.round(p * (SERVICES.length - 1))));
      setActiveIdx(i);
    });
    return () => unsub();
  }, [smoothProgress]);
  const activeHue = SERVICES[activeIdx].hue;

  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  /* ---------------- MOBILE / TABLET ---------------- */
  if (!isDesktop) {
    return (
      <section id="services" className="relative w-full py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src={bg} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/65 to-background/95" />
        </div>
        <div className="relative z-10 text-center mb-12 px-6">
          <p className="tracking-[0.4em] text-xs text-highlight/80 mb-2">WHAT WE DO</p>
          <div className="mx-auto w-16 h-px bg-highlight/60 mb-4" />
          <h2 className="font-display text-5xl text-highlight font-light glow-text tracking-[0.15em]">
            SERVICES
          </h2>
          <p className="mt-6 text-foreground/80 max-w-xl mx-auto font-light text-sm">
            End-to-end creative production services crafted for storytellers, brands, and forward-thinking visionaries.
          </p>
        </div>
        <div className="relative z-10">
          <MobileServices />
        </div>
      </section>
    );
  }

  /* ---------------- DESKTOP: horizontal film strip ---------------- */
  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient background */}
        <motion.div
          aria-hidden
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})`, opacity: 0.35 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background/85" />
          <div
            className="absolute inset-0 transition-[background] duration-700"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 50%, hsl(${activeHue} / 0.18), transparent 70%)`,
              mixBlendMode: "screen",
            }}
          />
        </motion.div>

        {/* Eyebrow header — sits ABOVE the panels, doesn't overlap */}
        <div className="absolute top-8 left-0 right-0 z-20 text-center pointer-events-none">
          <p className="tracking-[0.4em] text-[10px] text-highlight/70 mb-2">WHAT WE DO · SERVICES</p>
          <div className="mx-auto w-12 h-px bg-highlight/40" />
        </div>

        {/* Horizontal film strip */}
        <motion.div style={{ x }} className="absolute inset-0 flex items-center will-change-transform">
          {SERVICES.map((s, i) => (
            <Panel key={s.title} s={s} index={i} count={SERVICES.length} trackProgress={smoothProgress} />
          ))}
        </motion.div>

        {/* Progress seek bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[60%] max-w-2xl z-20">
          <div className="relative h-px bg-highlight/15 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{
                width: progressWidth,
                background: `linear-gradient(90deg, transparent, hsl(${activeHue}) 60%, hsl(${activeHue}))`,
                boxShadow: `0 0 14px hsl(${activeHue} / 0.7)`,
              }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[10px] tracking-[0.3em] text-foreground/55">
            {SERVICES.map((s, i) => (
              <span
                key={s.title}
                className="transition-colors duration-300"
                style={{ color: i === activeIdx ? `hsl(${s.hue})` : undefined }}
              >
                {s.num} · {s.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
