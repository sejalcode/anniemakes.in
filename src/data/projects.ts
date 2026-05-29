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
  videos?: string[];
  title: string;
  description: string;
  youtube: string;
  instagram?: string;
}

export const PROJECTS: Project[] = [
  { id: 4, num: "01", category: "VFX", title: "Red Horizon", img: vfx, video: null, videos: [goZeroAd], description: "A sci-fi VFX showcase blending practical lighting and CG environments to construct an alien atmosphere.", youtube: "https://youtube.com", instagram: "https://www.instagram.com/anniemakesstudio/" },
  { id: 5, num: "02", category: "3D MODELS", title: "Form & Light", img: digital, video: null, description: "A showcase of 3D modeling and rendering — sculpting form, material, and light into cinematic frames.", youtube: "https://youtube.com", instagram: "https://www.instagram.com/anniemakesstudio/" },
  { id: 1, num: "03", category: "ADS", title: "Go Zero — Ice Cream Ad", img: ads, video: goZeroAd, videos: [goZeroAd, goZeroAd], description: "A high-energy commercial film created for a next-gen brand. Combines cinematic storytelling, dynamic visuals, and sleek VFX to deliver a powerful message about innovation and craft.", youtube: "https://youtube.com" },
  { id: 2, num: "04", category: "SHORT FILMS", title: "Through the Lens", img: shorts, video: null, description: "An intimate short film exploring the craft of filmmaking, blending vérité moments with painterly cinematography.", youtube: "https://youtube.com" },
  { id: 3, num: "05", category: "DOCUMENTARY", title: "Above the Clouds", img: doc, video: null, description: "A documentary capturing the silent vastness of mountain ecosystems at dawn.", youtube: "https://youtube.com" },
];
