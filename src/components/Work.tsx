import { motion } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import ribbon from "@/assets/hero-ribbon.jpg";

const Work = () => {
  const navigate = useNavigate();
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const handleHover = (id: number, hovering: boolean) => {
    const v = videoRefs.current[id];
    if (!v) return;
    if (hovering) v.play().catch(() => {});
    else { v.pause(); v.currentTime = 0; }
  };

  return (
    <section id="work" className="relative min-h-screen w-full py-24 overflow-hidden bg-background">
      <div className="absolute inset-y-0 left-0 w-1/3 opacity-30 pointer-events-none">
        <img src={ribbon} alt="" className="w-full h-full object-cover -scale-x-100" style={{ mixBlendMode: "screen" }} />
      </div>
      <div className="absolute inset-y-0 right-0 w-1/3 opacity-30 pointer-events-none">
        <img src={ribbon} alt="" className="w-full h-full object-cover" style={{ mixBlendMode: "screen" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <p className="tracking-[0.4em] text-xs text-highlight/80 mb-3">SELECTED PROJECTS</p>
          <h2 className="font-display text-5xl md:text-7xl text-highlight font-light glow-text">OUR WORK</h2>
          <div className="mx-auto mt-3 w-24 h-px bg-highlight/60 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rotate-45 bg-highlight" />
          </div>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {PROJECTS.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                onClick={() => navigate(`/work/${p.id}`)}
                onMouseEnter={() => handleHover(p.id, true)}
                onMouseLeave={() => handleHover(p.id, false)}
                className="group relative aspect-[2/3] overflow-hidden rounded-sm border border-accent-red/30"
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
              </motion.button>
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
    </section>
  );
};

export default Work;
