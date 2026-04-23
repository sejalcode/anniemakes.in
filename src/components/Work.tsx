import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { CinematicSection, Reveal } from "./CinematicSection";
import ribbon from "@/assets/hero-ribbon.jpg";

const Work = () => {
  const navigate = useNavigate();
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  // Pin section: vertical scroll → horizontal pan of cards
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Translate the track left as user scrolls. Range tuned so the last card
  // ends near the right edge. We move ~55% of the track width.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  // Background ribbon parallax
  const ribbonY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const handleHover = (id: number, hovering: boolean) => {
    const v = videoRefs.current[id];
    if (!v) return;
    if (hovering) v.play().catch(() => {});
    else { v.pause(); v.currentTime = 0; }
  };

  return (
    // Tall outer wrapper enables scroll-driven horizontal motion
    <section ref={sectionRef} id="work" className="relative" style={{ height: "260vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <CinematicSection
          className="h-screen flex flex-col justify-center bg-background"
          background={
            <>
              <motion.div style={{ y: ribbonY }} className="absolute inset-y-0 left-0 w-1/3 opacity-25">
                <img src={ribbon} alt="" className="w-full h-full object-cover -scale-x-100" style={{ mixBlendMode: "screen" }} />
              </motion.div>
              <motion.div style={{ y: ribbonY }} className="absolute inset-y-0 right-0 w-1/3 opacity-25">
                <img src={ribbon} alt="" className="w-full h-full object-cover" style={{ mixBlendMode: "screen" }} />
              </motion.div>
              <div className="absolute inset-0 bg-background/40" />
            </>
          }
        >
          <div className="w-full">
            <div className="text-center mb-10 px-8">
              <Reveal order={0}>
                <p className="tracking-[0.4em] text-xs text-highlight/80 mb-3">SELECTED PROJECTS</p>
              </Reveal>
              <Reveal order={1}>
                <h2 className="font-display text-5xl md:text-7xl text-highlight font-light glow-text">OUR WORK</h2>
              </Reveal>
              <Reveal order={2}>
                <div className="mx-auto mt-3 w-24 h-px bg-highlight/60 relative">
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rotate-45 bg-highlight" />
                </div>
              </Reveal>
            </div>

            <div className="relative">
              {/* Horizontal pan track */}
              <motion.div
                ref={trackRef}
                style={{ x }}
                className="flex gap-6 md:gap-8 pl-8 md:pl-16 pr-[40vw] will-change-transform"
              >
                {PROJECTS.map((p, i) => (
                  <Reveal key={p.id} order={3 + i}>
                    <button
                      onClick={() => navigate(`/work/${p.id}`)}
                      onMouseEnter={() => handleHover(p.id, true)}
                      onMouseLeave={() => handleHover(p.id, false)}
                      className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-accent-red/30 shrink-0"
                      style={{ width: "min(42vw, 540px)" }}
                    >
                      <img src={p.img} alt={p.category} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
                      {p.video && (
                        <video
                          ref={el => (videoRefs.current[p.id] = el)}
                          src={p.video}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "inset 0 0 60px hsl(5 87% 45% / 0.5)" }} />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                        <p className="text-xs text-foreground/70 font-light mb-1">{p.num}</p>
                        <div className="w-8 h-px bg-highlight/70 mb-2" />
                        <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-wide">{p.category}</h3>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </motion.div>

              {/* Decorative arrows (visual only — actual scroll drives motion) */}
              <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 text-highlight/40">
                <ChevronLeft size={28} />
              </div>
              <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-highlight/40">
                <ChevronRight size={28} />
              </div>
            </div>

            <p className="text-center mt-6 tracking-[0.3em] text-[10px] text-foreground/50 uppercase">
              Scroll to explore →
            </p>
          </div>
        </CinematicSection>
      </div>
    </section>
  );
};

export default Work;
