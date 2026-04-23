import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV = ["HOME", "ABOUT", "WORK", "SERVICE", "CONTACT"];

interface Props {
  active: string;
  onNavigate: (id: string) => void;
  visible: boolean;
}

const Header = ({ active, onNavigate, visible }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    onNavigate(id === "service" ? "services" : id);
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-14 py-5 flex items-center justify-between bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm"
    >
      <button onClick={() => onNavigate("home")} className="flex items-center">
        <img src={logo} alt="Annie Makes Studio" className="h-10 md:h-14 w-auto drop-shadow-[0_0_15px_rgba(255,240,196,0.25)]" />
      </button>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-10 lg:gap-16">
        {NAV.map((item, i) => {
          const id = item.toLowerCase();
          const isActive = active === (id === "service" ? "services" : id);
          return (
            <motion.button
              key={item}
              initial={{ y: -20, opacity: 0 }}
              animate={visible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
              onClick={() => handleClick(id)}
              className="relative tracking-[0.3em] text-xs font-light text-foreground/90 hover:text-highlight transition-colors duration-500"
            >
              {item}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 right-0 h-px bg-highlight"
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Mobile burger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="md:hidden text-highlight p-2 -mr-2"
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-accent-red/20 flex flex-col py-6"
          >
            {NAV.map(item => {
              const id = item.toLowerCase();
              const target = id === "service" ? "services" : id;
              const isActive = active === target;
              return (
                <button
                  key={item}
                  onClick={() => handleClick(id)}
                  className={`px-8 py-3 text-left tracking-[0.3em] text-xs font-light transition-colors ${
                    isActive ? "text-highlight" : "text-foreground/85 hover:text-highlight"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
