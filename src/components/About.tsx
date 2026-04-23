import { motion } from "framer-motion";
import bg from "@/assets/about-bg.jpeg";
import ribbon from "@/assets/hero-ribbon.jpg";

const About = () => {
  return (
    <section id="about" className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Background image with subtle slow zoom */}
      <div className="absolute inset-0">
        <motion.img
          src={bg}
          alt=""
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/40" />
      </div>

      {/* Right ribbon — slow drift */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full pointer-events-none opacity-30">
        <img src={ribbon} alt="" className="w-full h-full object-cover animate-ribbon" style={{ mixBlendMode: "screen" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 w-full py-24">
        {/* Faded STORY background text */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.18 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="font-display text-accent-red text-[20vw] md:text-[16vw] leading-none font-normal tracking-tight select-none pointer-events-none"
        >
          STORY
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="-mt-16 md:-mt-32 max-w-2xl"
        >
          <p className="text-lg md:text-2xl leading-relaxed text-foreground/90 font-light space-y-2">
            Annie Makes Studio is a creative production space focused on cinematic{" "}
            <span className="text-highlight">storytelling</span>,{" "}
            <span className="text-accent-red font-medium">VFX</span>,{" "}
            <span className="text-accent-red font-medium">animation</span>, and{" "}
            <span className="text-accent-red font-medium">AI-driven</span> content.
            Every project is crafted with intention, combining creativity and technology
            to create <span className="text-highlight">immersive</span> visual experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
