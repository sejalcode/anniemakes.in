import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowLeft } from "lucide-react";
import ads from "@/assets/work-ads.jpg";
import shorts from "@/assets/work-shortfilms.jpg";
import doc from "@/assets/work-documentary.jpg";
import vfx from "@/assets/work-vfx.jpg";
import digital from "@/assets/work-digital.jpg";
import goZeroAd from "@/assets/go-zero-ad.mp4";
import ribbon from "@/assets/hero-ribbon.jpg";

const PROJECTS = [
  { id: 1, num: "01", category: "ADS", img: ads, video: goZeroAd, title: "Go Zero — Ice Cream Ad", description: "A high-energy commercial film created for a next-gen brand. Combines cinematic storytelling, dynamic visuals, and sleek VFX to deliver a powerful message about innovation and craft.", youtube: "https://youtube.com" },
  { id: 2, num: "02", category: "SHORT FILMS", img: shorts, video: null, title: "Through the Lens", description: "An intimate short film exploring the craft of filmmaking, blending vérité moments with painterly cinematography.", youtube: "https://youtube.com" },
  { id: 3, num: "03", category: "DOCUMENTARY", img: doc, video: null, title: "Above the Clouds", description: "A documentary capturing the silent vastness of mountain ecosystems at dawn.", youtube: "https://youtube.com" },
  { id: 4, num: "04", category: "VFX", img: vfx, video: null, title: "Red Horizon", description: "A sci-fi VFX showcase blending practical lighting and CG environments to construct an alien atmosphere.", youtube: "https://youtube.com" },
  { id: 5, num: "05", category: "DIGITAL CONTENT", img: digital, video: null, title: "Signal", description: "Vertical-format digital content engineered for social storytelling with cinematic depth.", youtube: "https://youtube.com" },
];

const Work = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const project = PROJECTS.find(p => p.id === selected);

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

        <AnimatePresence mode="wait">
          {!project ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                {PROJECTS.map((p, i) => (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    onClick={() => setSelected(p.id)}
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

              <button onClick={() => setIndex(i => Math.max(0, i - 1))} className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 text-highlight/60 hover:text-highlight transition">
                <ChevronLeft size={32} />
              </button>
              <button onClick={() => setIndex(i => Math.min(PROJECTS.length - 1, i + 1))} className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 text-highlight/60 hover:text-highlight transition">
                <ChevronRight size={32} />
              </button>

              <div className="flex justify-center gap-2 mt-8">
                {PROJECTS.map((_, i) => (
                  <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? "bg-highlight w-6" : "bg-highlight/30"}`} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="border-t border-accent-red/30 pt-10"
            >
              <button onClick={() => setSelected(null)} className="flex items-center gap-3 text-foreground/80 hover:text-highlight tracking-[0.3em] text-xs mb-8 transition">
                <ArrowLeft size={16} /> BACK TO WORK
              </button>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="relative aspect-video overflow-hidden rounded-sm border border-accent-red/40 glow-red bg-background">
                  {project.video ? (
                    <video
                      src={project.video}
                      controls
                      controlsList="nodownload noplaybackrate"
                      disablePictureInPicture
                      className="w-full h-full object-cover"
                      poster={project.img}
                    />
                  ) : (
                    <>
                      <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                        <div className="w-16 h-16 rounded-full border border-highlight/70 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-highlight text-2xl ml-1">▶</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <p className="tracking-[0.3em] text-xs text-foreground/60 mb-1">PROJECT TYPE</p>
                  <h3 className="font-display text-3xl text-highlight mb-6">{project.category}</h3>
                  <p className="tracking-[0.3em] text-xs text-foreground/60 mb-1">PROJECT TITLE</p>
                  <h4 className="font-display text-2xl text-foreground mb-6">{project.title}</h4>
                  <p className="tracking-[0.3em] text-xs text-foreground/60 mb-2">DESCRIPTION</p>
                  <p className="text-foreground/80 leading-relaxed mb-8 font-light">{project.description}</p>
                  <a href={project.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3 border border-highlight/60 text-highlight tracking-[0.25em] text-xs hover:bg-highlight/10 hover:scale-[1.03] transition-all duration-500">
                    WATCH ON YOUTUBE <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Work;
