import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { useEffect } from "react";

const getYouTubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const WorkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) return;
    const title = `${project.title} — ${project.category} | Annie Makes Studio`;
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [a, v] = selector.replace(/[\[\]"]/g, "").split("=");
        el.setAttribute(a, v);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    const desc = project.description.slice(0, 160);
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[name="twitter:description"]', "content", desc);

    const ldId = "ld-project";
    document.getElementById(ldId)?.remove();
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = ldId;
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      genre: project.category,
      description: project.description,
      url: typeof window !== "undefined" ? window.location.href : undefined,
      image: project.img,
      creator: { "@type": "Organization", name: "Annie Makes Studio" },
    });
    document.head.appendChild(ld);

    return () => { document.getElementById(ldId)?.remove(); };
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="font-display text-4xl text-highlight mb-4">Project not found</h1>
          <Link to="/" className="tracking-[0.3em] text-xs text-foreground/80 hover:text-highlight">← BACK HOME</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-8 md:px-14 py-16">
        <button onClick={() => navigate("/#work")} className="flex items-center gap-3 text-foreground/80 hover:text-highlight tracking-[0.3em] text-xs mb-10 transition">
          <ArrowLeft size={16} /> BACK TO WORK
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          <div className="space-y-6">
            {project.videos && project.videos.length > 0 ? (
              project.videos.map((src, i) => (
                <div key={i} className="relative aspect-video overflow-hidden rounded-sm border border-accent-red/40 glow-red bg-background">
                  <video
                    src={src}
                    controls
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    className="w-full h-full object-cover"
                    poster={project.img}
                  />
                </div>
              ))
            ) : (
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
                ) : project.trailer || project.youtube ? (
                  <iframe
                    src={getYouTubeEmbedUrl(project.trailer || project.youtube)}
                    title={project.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
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
            )}
          </div>
          <div>
            <h1 className="font-display text-4xl text-foreground mb-3">{project.title}</h1>
            <h2 className="font-display text-2xl text-highlight mb-6">{project.category}</h2>
            <p className="text-foreground/80 leading-relaxed mb-8 font-light">{project.description}</p>
            {!["VFX", "3D MODELS", "ADS"].includes(project.category) && (
              <a href={project.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3 border border-highlight/60 text-highlight tracking-[0.25em] text-xs hover:bg-highlight/10 hover:scale-[1.03] transition-all duration-500">
                WATCH ON YOUTUBE <ArrowUpRight size={14} />
              </a>
            )}
            {["VFX", "3D MODELS"].includes(project.category) && project.instagram && (
              <a href={project.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3 border border-highlight/60 text-highlight tracking-[0.25em] text-xs hover:bg-highlight/10 hover:scale-[1.03] transition-all duration-500">
                WATCH ON INSTAGRAM <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default WorkDetail;
