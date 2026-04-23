import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface CinematicSectionProps {
  children: ReactNode;
  background: ReactNode;
  id?: string;
  className?: string;
  /** Stagger delay for foreground children (in seconds). Default 0.25. */
  foregroundDelay?: number;
}

/**
 * Cinematic section with layered scroll reveal:
 * 1) Background layer rises first (translateY 80→0, opacity 0→1, ~0.8s)
 * 2) Foreground content follows after a short delay
 * Use <Reveal /> children inside `children` to stagger headings → subtext → cards.
 */
export const CinematicSection = ({
  children,
  background,
  id,
  className = "",
  foregroundDelay = 0.25,
}: CinematicSectionProps) => {
  const reduce = useReducedMotion();
  return (
    <section id={id} className={`relative w-full overflow-hidden ${className}`}>
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={reduce ? false : { y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {background}
      </motion.div>
      <motion.div
        className="relative z-10"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.6, delay: foregroundDelay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

interface RevealProps {
  children: ReactNode;
  /** Order in the stagger sequence (0 = first). Each step adds 0.12s. */
  order?: number;
  /** Extra base delay added on top of the stagger. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span" | "p" | "h2" | "h3";
  y?: number;
}

/** Single foreground element with cinematic reveal. */
export const Reveal = ({
  children,
  order = 0,
  delay = 0,
  className = "",
  as = "div",
  y = 40,
}: RevealProps) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay: 0.35 + delay + order * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};
