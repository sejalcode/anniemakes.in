import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  useVelocity,
  MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Box, Brain, Film, Hexagon, Layers3 } from "lucide-react";
import { Reveal } from "./CinematicSection";
import bg from "@/assets/services-bg.jpeg";

interface ServiceItem {
  num: string;
  title: string;
  icon: typeof Box;
  desc: string;
  /** glow color in HSL triplet */
  hue: string;
  /** transition style label */
  flavor: "slit" | "depth" | "glitch" | "pulse" | "fluid";
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    title: "VFX",
    icon: Box,
    desc: "Cinematic compositing and high-end visual effects that bring imagination to life with precision.",
    hue: "28 95% 60%",
    flavor: "slit",
  },
  {
    num: "02",
    title: "3D MODELS",
    icon: Layers3,
    desc: "Sculpted geometry, materials and lighting — from product renders to fully realized cinematic worlds.",
    hue: "210 15% 82%", // chrome / silver
    flavor: "depth",
  },
  {
    num: "03",
    title: "AI CONTENT",
    icon: Brain,
    desc: "AI-driven content creation and workflows that accelerate ideas and elevate creative storytelling.",
    hue: "315 90% 65%", // neon magenta
    flavor: "glitch",
  },
  {
    num: "04",
    title: "VIDEO EDITING",
    icon: Film,
    desc: "Story-driven editing that shapes raw footage into powerful, engaging, emotionally resonant films.",
    hue: "210 95% 62%", // electric blue
    flavor: "pulse",
  },
  {
    num: "05",
    title: "ANIMATION",
    icon: Hexagon,
    desc: "Motion graphics and fluid animation that communicate ideas through movement, style and emotion.",
    hue: "180 80% 70%", // soft cyan
    flavor: "fluid",
  },
];

/* ---------- Useful: detect mobile to switch layout ---------- */
const useIsDesktop = () => {
  const [is, setIs] = useState(
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIs(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return is;
};

/* ---------- Wireframe rotating cube (for 3D MODELS panel) ---------- */
const WireframeCube = ({ hue }: { hue: string }) => (
  <motion.svg
    aria-hidden
    viewBox="-60 -60 120 120"
    className="absolute inset-0 m-auto w-[60%] h-[60%] opacity-40"
    style={{ color: `hsl(${hue})` }}
    animate={{ rotate: 360 }}
    transition={{ duration: 28, ease: "linear", repeat: Infinity }}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      style={{ filter: `drop-shadow(0 0 8px hsl(${hue} / 0.8))` }}
    >
      {/* back face */}
      <rect x="-28" y="-28" width="56" height="56" />
      {/* front face */}
      <rect x="-40" y="-40" width="56" height="56" />
      {/* connectors */}
      <line x1="-28" y1="-28" x2="-40" y2="-40" />
      <line x1="28" y1="-28" x2="16" y2="-40" />
      <line x1="28" y1="28" x2="16" y2="16" />
      <line x1="-28" y1="28" x2="-40" y2="16" />
    </g>
  </motion.svg>
);

/* ---------- Per-service background visual ---------- */
const PanelBackground = ({ s, progress }: { s: ServiceItem; progress: MotionValue<number> }) => {
  // Slit-scan reveal: clip-path opens horizontally
  const slitClip = useTransform(progress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  // Depth parallax for 3D MODELS — model holds while text passes
  const depthX = useTransform(progress, [0, 1], ["-15%", "15%"]);
  // Glitch jitter
  const glitchX = useTransform(progress, [0, 0.3, 0.5, 0.7, 1], ["0px", "-6px", "4px", "-3px", "0px"]);

  const common = (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse 70% 60% at 50% 50%, hsl(${s.hue} / 0.28), transparent 70%)`,
        mixBlendMode: "screen",
      }}
    />
  );

  switch (s.flavor) {
    case "slit":
      return (
        <>
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})`, clipPath: slitClip as unknown as string, opacity: 0.55 }}
          />
          {common}
        </>
      );
    case "depth":
      return (
        <>
          <motion.div className="absolute inset-0" style={{ x: depthX }}>
            <WireframeCube hue={s.hue} />
          </motion.div>
          {common}
        </>
      );
    case "glitch":
      return (
        <>
          <motion.div
            className="absolute inset-0 bg-cover bg-center mix-blend-screen"
            style={{
              backgroundImage: `url(${bg})`,
              x: glitchX,
              opacity: 0.5,
              filter: `hue-rotate(280deg) saturate(1.4)`,
            }}
          />
          {common}
        </>
      );
    case "pulse":
      return (
        <>
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(circle at 50% 50%, hsl(${s.hue} / 0.45), transparent 65%)`,
            }}
          />
          {common}
        </>
      );
    case "fluid":
      return (
        <>
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `linear-gradient(120deg, hsl(${s.hue} / 0.35), transparent 40%, hsl(${s.hue} / 0.25) 80%)`,
              backgroundSize: "200% 200%",
            }}
          />
          {common}
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

  // local progress: 0 when entering center, 1 when leaving center
  const start = index / count;
  const end = (index + 1) / count;
  const localProgress = useTransform(trackProgress, [start, end], [0, 1]);

  // Curtain stretch: scaleY peaks at center
  const centerSignal = useTransform(localProgress, [0, 0.5, 1], [0, 1, 0]);
  const scaleY = useTransform(centerSignal, [0, 1], [1.6, 1]);
  const opacity = useTransform(centerSignal, [0, 0.4, 1], [0.25, 0.85, 1]);
  const blurMV = useTransform(centerSignal, [0, 1], ["6px", "0px"]);
  const filterMV = useTransform(blurMV, (b) => `blur(${b})`);

  return (
    <div
      className="relative shrink-0 h-screen flex items-center justify-center px-8 md:px-16"
      style={{ width: "80vw" }}
    >
      {/* per-panel background */}
      <div className="absolute inset-6 md:inset-10 rounded-lg overflow-hidden border border-highlight/10">
        <PanelBackground s={s} progress={localProgress} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
      </div>

      {/* foreground */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-display text-sm tracking-[0.35em] text-foreground/55">{s.num}</span>
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
            filter: reduce ? "none" : filterMV,
            transformOrigin: "center",
            color: `hsl(${s.hue})`,
            textShadow: `0 0 28px hsl(${s.hue} / 0.55), 0 0 80px hsl(${s.hue} / 0.3)`,
          }}
          className="font-display font-light tracking-[0.18em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none"
        >
          {s.title}
        </motion.h3>

        <div className="mt-6 w-16 h-px" style={{ background: `hsl(${s.hue} / 0.7)` }} />

        <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed font-light">
          {s.desc}
        </p>
      </div>
    </div>
  );
};

/* ---------- Mobile: simple vertical snap list ---------- */
const MobileServices = () => (
  <div className="px-6 space-y-6">
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
                background: `radial-gradient(ellipse 70% 60% at 50% 0%, hsl(${s.hue} / 0.18), transparent 70%)`,
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

  // Scroll progress through the tall sticky container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth the progress for the horizontal track
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  // Translate the inner track from 0% to -80% (5 panels × 80vw, but section is 100vw — leave room for padding)
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);

  // Velocity → drives warp intensity
  const velocity = useVelocity(smoothProgress);
  const absVel = useTransform(velocity, (v) => Math.min(Math.abs(v) * 60, 1));
  const warpScale = useTransform(absVel, [0, 1], [14, 46]);
  const warpScaleSpring = useSpring(warpScale, { stiffness: 90, damping: 20 });
  const [warpScaleNum, setWarpScaleNum] = useState(14);
  useEffect(() => warpScaleSpring.on("change", setWarpScaleNum), [warpScaleSpring]);

  // Active panel for ambient hue
  const indexMV = useTransform(smoothProgress, (p) =>
    Math.min(SERVICES.length - 1, Math.max(0, Math.floor(p * SERVICES.length)))
  );
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => indexMV.on("change", setActiveIdx), [indexMV]);
  const activeHue = SERVICES[activeIdx].hue;

  // Progress bar width
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  if (!isDesktop) {
    return (
      <section id="services" className="relative w-full py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src={bg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
        </div>
        <div className="relative z-10 text-center mb-12 px-6">
          <p className="tracking-[0.4em] text-xs text-highlight/80 mb-2">WHAT WE DO</p>
          <div className="mx-auto w-16 h-px bg-highlight/60 mb-4" />
          <h2 className="font-display text-5xl text-highlight font-light glow-text tracking-[0.15em]">
            SERVICES
          </h2>
        </div>
        <div className="relative z-10">
          <MobileServices />
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      {/* SVG warp filter — scale driven by scroll velocity */}
      <svg className="absolute -z-10 w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="services-warp" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.022" numOctaves="2" seed="5" result="noise">
              <animate
                attributeName="baseFrequency"
                dur="12s"
                values="0.012 0.022; 0.020 0.034; 0.012 0.022"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={warpScaleNum}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Warped ambient background */}
        <motion.div
          aria-hidden
          initial={reduce ? false : { y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${bg})`, filter: "url(#services-warp)", opacity: 0.55 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background/85" />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 50%, hsl(${activeHue} / 0.22), transparent 70%)`,
              mixBlendMode: "screen",
              transition: "background 600ms ease",
            }}
          />
        </motion.div>

        {/* Header */}
        <div className="absolute top-12 left-0 right-0 z-20 text-center pointer-events-none">
          <Reveal order={0}>
            <p className="tracking-[0.4em] text-xs text-highlight/80 mb-2">WHAT WE DO</p>
          </Reveal>
          <Reveal order={1}>
            <div className="mx-auto w-16 h-px bg-highlight/60 mb-3" />
          </Reveal>
          <Reveal order={2}>
            <h2 className="font-display text-4xl md:text-6xl text-highlight font-light glow-text tracking-[0.15em]">
              SERVICES
            </h2>
          </Reveal>
        </div>

        {/* Horizontal film strip */}
        <motion.div style={{ x }} className="absolute inset-0 flex items-center will-change-transform">
          {/* leading spacer to center first panel */}
          <div className="shrink-0" style={{ width: "10vw" }} />
          {SERVICES.map((s, i) => (
            <Panel key={s.title} s={s} index={i} count={SERVICES.length} trackProgress={smoothProgress} />
          ))}
          <div className="shrink-0" style={{ width: "10vw" }} />
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
                className="transition-colors"
                style={{ color: i === activeIdx ? `hsl(${s.hue})` : undefined }}
              >
                {s.num}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
