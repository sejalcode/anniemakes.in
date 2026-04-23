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
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ribbonY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const handleHover = (id: number, hovering: boolean) => {
    const v = videoRefs.current[id];
    if (!v) return;
    if (hovering) v.play().catch(() => {});
    else { v.pause(); v.currentTime = 0; }
  };

  return (
    <div ref={sectionRef}>
      <CinematicSection
        id="work"
        className="min-h-screen py-24 bg-background"
        background={
          <>
            <motion.div style={{ y: ribbonY }} className="absolute inset-y-0 left-0 w-1/3 opacity-30">
              <img src={ribbon} alt="" className="w-full h-full object-cover -scale-x-100" style={{ mixBlendMode: "screen" }} />
            </motion.div>
            <motion.div style={{ y: ribbonY }} className="absolute inset-y-0 right-0 w-1/3 opacity-30">
              <img src={ribbon} alt="" className="w-full h-full object-cover" style={{ mixBlendMode: "screen" }} />
            </motion.div>
          </>
        }
      >
        <div className="max-w-7xl mx-auto px-8 md:px-14">
          <div className="text-center mb-12">
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {PROJECTS.map((p, i) => (
                <Reveal key={p.id} order={3 + i}>
                  <button
                    onClick={() => navigate(`/work/${p.id}`)}
                    onMouseEnter={() => handleHover(p.id, true)}
                    onMouseLeave={() => handleHover(p.id, false)}
                    className="group relative aspect-[2/3] w-full overflow-hidden rounded-sm border border-accent-red/30"
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                      <p className="text-xs text-foreground/70 font-light mb-1">{p.num}</p>
                      <div className="w-8 h-px bg-highlight/70 mb-2" />
                      <h3 className="font-display text-lg md:text-2xl text-foreground tracking-wide">{p.category}</h3>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>

            <button className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 text-highlight/60 hover:text-highlight transition">
              <ChevronLeft size={32} />
            </button>
            <button className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 text-highlight/60 hover:text-highlight transition">
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
};

export default Work;
