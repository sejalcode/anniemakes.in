import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Box, Brain, Film, Hexagon, Layers3 } from "lucide-react";
import { Reveal } from "./CinematicSection";
import bg from "@/assets/services-bg.jpeg";

interface ServiceItem {
  num: string;
  title: string;
  icon: typeof Box;
  desc: string;
  /** accent hue for the cinematic glow per service */
  hue: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    title: "VFX",
    icon: Box,
    desc: "Cinematic compositing and high-end visual effects that bring imagination to life with precision.",
    hue: "22 95% 60%",   // warm orange
  },
  {
    num: "02",
    title: "3D MODELS",
    icon: Layers3,
    desc: "Sculpted geometry, materials and lighting — from product renders to fully realized cinematic worlds.",
    hue: "8 78% 58%",    // coral red
  },
  {
    num: "03",
    title: "AI CONTENT",
    icon: Brain,
    desc: "AI-driven content creation and workflows that accelerate ideas and elevate creative storytelling.",
    hue: "200 90% 65%",  // electric blue
  },
  {
    num: "04",
    title: "VIDEO EDITING",
    icon: Film,
    desc: "Story-driven editing that shapes raw footage into powerful, engaging, emotionally resonant films.",
    hue: "44 100% 75%",  // warm highlight
  },
  {
    num: "05",
    title: "ANIMATION",
    icon: Hexagon,
    desc: "Motion graphics and fluid animation that communicate ideas through movement, style and emotion.",
    hue: "280 70% 70%",  // violet
  },
];

/* ---------- Service Row: curtain stretch + per-service hue ---------- */
const ServiceRow = ({ s, index, hovered, setHovered }: {
  s: ServiceItem;
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const Icon = s.icon;

  // Curtain effect: title stretches vertically as it crosses the viewport center
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [1.6, 1, 1.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.15, 1, 1, 0.15]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], ["8px", "0px", "8px"]);
  const filterMV = useTransform(blur, (b) => `blur(${b})`);

  const isHovered = hovered === index;

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative border-t border-highlight/15 py-10 md:py-14 group cursor-pointer"
      style={{
        // expose hue as CSS var for child glows
        // @ts-expect-error custom prop
        "--svc-hue": s.hue,
      }}
    >
      {/* hover wash — service-specific hue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 80% at 50% 50%, hsl(${s.hue} / 0.18), transparent 70%)`,
        }}
      />

      <div className="relative grid grid-cols-12 items-center gap-4 md:gap-8 px-6 md:px-10">
        {/* Number */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-display text-sm md:text-base text-foreground/50 tracking-[0.3em]">
            {s.num}
          </span>
        </div>

        {/* Icon */}
        <div className="col-span-2 md:col-span-1 flex justify-center">
          <motion.div
            animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon
              size={36}
              strokeWidth={1}
              className="text-highlight/85"
              style={{ filter: isHovered ? `drop-shadow(0 0 14px hsl(${s.hue} / 0.8))` : "none" }}
            />
          </motion.div>
        </div>

        {/* Title — curtain stretch */}
        <div className="col-span-8 md:col-span-6 overflow-hidden">
          <motion.h3
            style={{
              scaleY: reduce ? 1 : scaleY,
              opacity: reduce ? 1 : opacity,
              filter: reduce ? "none" : filterMV,
              transformOrigin: "center",
              color: isHovered ? `hsl(${s.hue})` : undefined,
              textShadow: isHovered
                ? `0 0 24px hsl(${s.hue} / 0.6), 0 0 60px hsl(${s.hue} / 0.35)`
                : "0 0 18px hsl(var(--highlight) / 0.25)",
            }}
            className="font-display font-light text-highlight tracking-[0.18em] text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-none transition-colors duration-500"
          >
            {s.title}
          </motion.h3>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-4">
          <motion.p
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 1 : 0.7, x: isHovered ? 0 : -4 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-foreground/80 leading-relaxed font-light"
          >
            {s.desc}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- Section ---------- */
const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  // Cursor glow tracking
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const sx = useSpring(cursorX, { stiffness: 180, damping: 22, mass: 0.4 });
  const sy = useSpring(cursorY, { stiffness: 180, damping: 22, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const activeHue = hovered !== null ? SERVICES[hovered].hue : "44 100% 88%";
  // warp intensity rises on hover for the "distortion field" feel
  const warpScale = hovered !== null ? 38 : 18;
  const warpDur = hovered !== null ? "6s" : "14s";

  return (
    <section
      id="services"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { cursorX.set(-200); cursorY.set(-200); }}
      className="relative w-full overflow-hidden min-h-screen py-24"
    >
      {/* Heat-haze warp filter — animates faster on hover */}
      <svg className="absolute -z-10 w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="services-warp" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.02"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur={warpDur}
                values="0.010 0.020; 0.020 0.034; 0.010 0.020"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={warpScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Background ribbon — warped */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.img
          src={bg}
          alt=""
          style={{ y: bgY, scale: 1.1, filter: "url(#services-warp)" }}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background/80" />
        {/* dynamic ambient glow tied to active service */}
        <motion.div
          className="absolute inset-0 transition-colors"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, hsl(${activeHue} / 0.18), transparent 70%)`,
            mixBlendMode: "screen",
          }}
        />
      </motion.div>

      {/* Custom cursor glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-20 rounded-full hidden md:block"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          width: 360,
          height: 360,
          background: `radial-gradient(circle, hsl(${activeHue} / 0.18) 0%, hsl(${activeHue} / 0.06) 35%, transparent 65%)`,
          mixBlendMode: "screen",
        }}
      />

      {/* Foreground */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <Reveal order={0}>
            <p className="tracking-[0.4em] text-xs text-highlight/80 mb-2">WHAT WE DO</p>
          </Reveal>
          <Reveal order={1}>
            <div className="mx-auto w-16 h-px bg-highlight/60 mb-4" />
          </Reveal>
          <Reveal order={2}>
            <h2 className="font-display text-5xl md:text-7xl text-highlight font-light glow-text tracking-[0.15em]">
              SERVICES
            </h2>
          </Reveal>
          <Reveal order={3}>
            <p className="mt-6 text-foreground/80 max-w-xl mx-auto font-light">
              End-to-end creative production services crafted for storytellers,<br className="hidden md:block" />
              brands, and forward-thinking visionaries.
            </p>
          </Reveal>
        </div>

        {/* Film-strip ribbon */}
        <div className="border-b border-highlight/15">
          {SERVICES.map((s, i) => (
            <ServiceRow
              key={s.title}
              s={s}
              index={i}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
