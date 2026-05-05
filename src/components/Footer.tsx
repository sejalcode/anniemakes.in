import { Instagram, Youtube, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer id="site-footer" className="relative bg-background border-t border-accent-red/20 py-14 px-8 md:px-14">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 md:gap-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="" className="h-10 w-auto" />
            <div>
              <p className="font-display text-lg text-accent-red tracking-widest leading-tight">ANNIE MAKES</p>
              <p className="font-display text-lg text-accent-red tracking-widest leading-tight">STUDIO</p>
            </div>
          </div>
          <p className="text-sm text-foreground/70 font-light max-w-xs leading-relaxed">
            A creative production space focused on cinematic storytelling, VFX, animation, and AI-driven content.
          </p>
        </div>

        <div className="md:border-l md:border-accent-red/20 md:pl-10">
          <h4 className="tracking-[0.35em] text-xs text-accent-red mb-5">QUICK LINKS</h4>
          <ul className="space-y-3 text-sm text-foreground/85 font-light">
            {["Home", "About", "Our Work", "Services", "Contact"].map(l => (
              <li key={l}><a href={`#${l.toLowerCase().replace(" ", "")}`} className="hover:text-highlight transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div className="md:border-l md:border-accent-red/20 md:pl-10">
          <h4 className="tracking-[0.35em] text-xs text-accent-red mb-5">FOLLOW US</h4>
          <ul className="space-y-3 text-sm text-foreground/85 font-light">
            <li><a href="https://www.instagram.com/anniemakesstudio/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-highlight transition"><Instagram size={16} className="text-accent-red" /> Instagram</a></li>
            <li><a href="#" className="flex items-center gap-3 hover:text-highlight transition"><Youtube size={16} className="text-accent-red" /> YouTube</a></li>
            <li><a href="#" className="flex items-center gap-3 hover:text-highlight transition"><Linkedin size={16} className="text-accent-red" /> LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-accent-red/20 flex items-center justify-center gap-4">
        <span className="w-1 h-1 rounded-full bg-accent-red" />
        <p className="text-xs tracking-wider text-foreground/60 text-center">© 2024 Annie Makes Studio. All rights reserved.</p>
        <span className="w-1 h-1 rounded-full bg-accent-red" />
      </div>
    </footer>
  );
};

export default Footer;
