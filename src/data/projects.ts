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
  trailer?: string;
  instagram?: string;
}

export const PROJECTS: Project[] = [
  { id: 4, num: "01", category: "VFX", title: "Turning Imagination Into Reality", img: vfx, video: null, videos: [goZeroAd], description: "Transform ordinary footage into extraordinary cinematic experiences with professional VFX services. From realistic visual effects and seamless compositing to CGI environments and custom effects for music videos, advertisements, and commercial shoots, every frame is crafted with precision, creativity, and attention to detail..", youtube: "https://youtube.com", instagram: "https://www.instagram.com/anniemakesstudio/" },
  { id: 5, num: "02", category: "3D MODELS", title: "Form & Light", img: digital, video: null, description: "A showcase of 3D modeling and rendering — sculpting form, material, and light into cinematic frames.", youtube: "https://youtube.com", instagram: "https://www.instagram.com/anniemakesstudio/" },
  { id: 1, num: "03", category: "ADS", title: "Go Zero — Ice Cream Ad", img: ads, video: goZeroAd, videos: [goZeroAd, goZeroAd], description: "A high-energy commercial film created for a next-gen brand. Combines cinematic storytelling, dynamic visuals, and sleek VFX to deliver a powerful message about innovation and craft.", youtube: "https://youtube.com" },
  { id: 2, num: "04", category: "SHORT FILMS", title: "Kha Gaya Kaun? - The Pawpur Snack Mystery", img: shorts, video: null, trailer: "https://youtu.be/aNYGrvrnwi4", description: "A short film created entirely using AI-driven workflows, with a strong focus on consistent characters, voice, and cinematic storytelling. From generating environments and designing characters to scripting, storyboarding, and producing images and video clips, every stage was crafted using advanced AI tools. The final piece was brought together through professional post-production in Premiere Pro, After Effects, and DaVinci Resolve.", youtube: "https://youtu.be/DR2p7-tMUWk" },
  { id: 3, num: "05", category: "DOCUMENTARY", title: "The Ocean's Hidden Voices", img: doc, video: null, description: "A documentary centered on storytelling, capturing the essence of its subject through a thoughtful and immersive narrative. The focus lies in building a strong emotional connection, using carefully structured storytelling, pacing, and visual composition to bring the story to life. Every element—from research and scripting to visuals and editing—was crafted to serve the narrative, resulting in a compelling and engaging viewing experience.", youtube: "https://youtu.be/CDJNOK6tLTY" },
];
