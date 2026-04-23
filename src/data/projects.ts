import ads from "@/assets/work-ads.jpg";
import shorts from "@/assets/work-shortfilms.jpg";
import doc from "@/assets/work-documentary.jpg";
import vfx from "@/assets/work-vfx.jpg";
import digital from "@/assets/work-digital.jpg";
import goZeroAd from "@/assets/go-zero-ad.mp4";

export interface Project {
  id: number;
  num: string;
  category: string;
  img: string;
  video: string | null;
  title: string;
  description: string;
  youtube: string;
}

export const PROJECTS: Project[] = [
  { id: 1, num: "01", category: "ADS", img: ads, video: goZeroAd, title: "Go Zero — Ice Cream Ad", description: "A high-energy commercial film created for a next-gen brand. Combines cinematic storytelling, dynamic visuals, and sleek VFX to deliver a powerful message about innovation and craft.", youtube: "https://youtube.com" },
  { id: 2, num: "02", category: "SHORT FILMS", img: shorts, video: null, title: "Through the Lens", description: "An intimate short film exploring the craft of filmmaking, blending vérité moments with painterly cinematography.", youtube: "https://youtube.com" },
  { id: 3, num: "03", category: "DOCUMENTARY", img: doc, video: null, title: "Above the Clouds", description: "A documentary capturing the silent vastness of mountain ecosystems at dawn.", youtube: "https://youtube.com" },
  { id: 4, num: "04", category: "VFX", img: vfx, video: null, title: "Red Horizon", description: "A sci-fi VFX showcase blending practical lighting and CG environments to construct an alien atmosphere.", youtube: "https://youtube.com" },
  { id: 5, num: "05", category: "DIGITAL CONTENT", img: digital, video: null, title: "Signal", description: "Vertical-format digital content engineered for social storytelling with cinematic depth.", youtube: "https://youtube.com" },
];
