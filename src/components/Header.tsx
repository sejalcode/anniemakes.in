import { motion } from "framer-motion";
import { useState } from "react";
import logo from "@/assets/logo.png";

const NAV = ["HOME", "ABOUT", "WORK", "SERVICE", "CONTACT"];

interface Props {
  active: string;
  onNavigate: (id: string) => void;
  visible: boolean;
}

const Header = ({ active, onNavigate, visible }: Props) => {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-14 py-5 flex items-center justify-between bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm"
    >
      <button onClick={() => onNavigate("home")} className="flex items-center">
        <img src={logo} alt="Annie Makes Studio" className="h-12 md:h-14 w-auto drop-shadow-[0_0_15px_rgba(255,240,196,0.25)]" />
      </button>
      <nav className="hidden md:flex items-center gap-10 lg:gap-16">
        {NAV.map((item, i) => {
          const id = item.toLowerCase();
          const isActive = active === id;
          return (
            <motion.button
              key={item}
              initial={{ y: -20, opacity: 0 }}
              animate={visible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
              onClick={() => onNavigate(id === "service" ? "services" : id)}
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
    </motion.header>
  );
};

export default Header;
