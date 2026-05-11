import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail } from "lucide-react";
import { CinematicSection, Reveal } from "./CinematicSection";
import bg from "@/assets/contact-bg.jpeg";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div ref={ref}>
      <CinematicSection
        id="contact"
        background={
          <>
            <motion.img src={bg} alt="" style={{ y: bgY, scale: 1.05 }} className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--background) / 0.85) 0%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.92) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, hsl(var(--background) / 0.4) 100%)",
              }}
            />
          </>
        }
      >
        <div className="max-w-2xl mx-auto px-8 md:px-14 py-24 text-center">
          <Reveal order={0}>
            <p className="tracking-[0.4em] text-xs text-accent-red mb-2">LET'S CONNECT</p>
          </Reveal>
          <Reveal order={1}>
            <div className="mx-auto w-16 h-px bg-accent-red mb-6 relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rotate-45 bg-accent-red" />
            </div>
          </Reveal>
          <Reveal order={2}>
            <h2 className="font-display text-5xl md:text-7xl font-light tracking-wide">
              <span className="text-foreground">GET IN </span>
              <span className="text-accent-red glow-text">TOUCH</span>
            </h2>
          </Reveal>
          <Reveal order={3}>
            <p className="mt-4 text-foreground/85 font-light">Let's create something impactful together.</p>
          </Reveal>

              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-12 h-px bg-accent-red/60" />
                <p className="tracking-[0.35em] text-xs text-accent-red">OR REACH US DIRECTLY</p>
                <span className="w-12 h-px bg-accent-red/60" />
              </div>
              <a href="mailto:anniemakesstudio@gmail.com" className="inline-flex items-center gap-3 text-foreground hover:text-highlight transition">
                <Mail size={18} className="text-accent-red" />
                anniemakesstudio@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </CinematicSection>
    </div>
  );
};

export default Contact;
