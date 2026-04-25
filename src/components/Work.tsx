import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { CinematicSection, Reveal } from "./CinematicSection";
import { useIsMobile } from "@/hooks/use-mobile";
import ribbon from "@/assets/hero-ribbon.jpg";

const Work = () => {
  const navigate = useNavigate();
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Measure actual overflow so the last card always lands flush with the
  // viewport's right edge regardless of breakpoint.
  const [maxShift, setMaxShift] = useState(0);
  useEffect(() => {
    if (isMobile) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const overflow = track.scrollWidth - window.innerWidth;
      setMaxShift(Math.max(0, overflow));
    };
    measure();
    window.addEventListener("resize", measure);
    // Re-measure after images/fonts settle
    const t = setTimeout(measure, 300);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -maxShift]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const handleHover = (id: number, hovering: boolean) => {
    const v = videoRefs.current[id];
    if (!v) return;
    if (hovering) v.play().catch(() => {});
    else { v.pause(); v.currentTime = 0; }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative"
      style={{ height: isMobile ? "auto" : "360vh" }}
    >
      <div className={isMobile ? "relative" : "sticky top-0 h-screen overflow-hidden"}>
        <CinematicSection
          className={`${isMobile ? "min-h-screen py-20" : "h-screen"} flex flex-col justify-center bg-background`}
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
            <div className="text-center mb-6 md:mb-8 px-6 md:px-8">
              <Reveal order={0}>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-highlight font-light glow-text">OUR WORK</h2>
              </Reveal>
              <Reveal order={1}>
                <div className="mx-auto mt-3 w-20 h-px bg-highlight/60 relative">
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rotate-45 bg-highlight" />
                </div>
              </Reveal>
            </div>

            <div className="relative">
              {/* Horizontal pan track on desktop, vertical stack on mobile.
                  Symmetric horizontal padding (matches gap) so the first and
                  last cards always have equal breathing room from the edges. */}
              <motion.div
                ref={trackRef}
                style={isMobile ? undefined : { x }}
                className={
                  isMobile
                    ? "flex flex-col gap-6 px-6"
                    : "flex gap-6 lg:gap-8 px-6 lg:px-10 will-change-transform"
                }
              >
                {PROJECTS.map((p, i) => (
                  <Reveal
                    key={p.id}
                    order={2 + i}
                    className={isMobile ? "w-full max-w-sm mx-auto" : "shrink-0"}
                    style={isMobile ? undefined : { width: "min(30vw, 380px)" }}
                  >
                    <button
                      onClick={() => navigate(`/work/${p.id}`)}
                      onMouseEnter={() => handleHover(p.id, true)}
                      onMouseLeave={() => handleHover(p.id, false)}
                      className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-accent-red/30 w-full block"
                      style={isMobile ? undefined : { width: "min(32vw, 420px)" }}
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

                      {/* Category title card (top-left) */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/70 backdrop-blur-sm border border-highlight/30 rounded-sm">
                        <p className="font-display text-[11px] md:text-xs text-highlight tracking-[0.3em] uppercase">
                          {p.category}
                        </p>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                        <p className="text-xs text-foreground/70 font-light mb-1">{p.num}</p>
                        <div className="w-8 h-px bg-highlight/70 mb-2" />
                        <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-wide">{p.category}</h3>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </motion.div>

              {!isMobile && (
                <>
                  <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 text-highlight/40">
                    <ChevronLeft size={28} />
                  </div>
                  <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-highlight/40">
                    <ChevronRight size={28} />
                  </div>
                </>
              )}
            </div>

            {!isMobile && (
              <p className="text-center mt-6 tracking-[0.3em] text-[10px] text-foreground/50 uppercase">
                Scroll to explore →
              </p>
            )}
          </div>
        </CinematicSection>
      </div>
    </section>
  );
};

export default Work;
