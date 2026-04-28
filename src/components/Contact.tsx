import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { CinematicSection, Reveal } from "./CinematicSection";
import bg from "@/assets/contact-bg.jpeg";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message required").max(1000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    const body = new URLSearchParams({ "form-name": "contact", ...form }).toString();
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body })
      .catch(() => {});
    setSent(true);
    toast.success("Message sent successfully. I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div ref={ref}>
      <CinematicSection
        id="contact"
        background={
          <>
            <motion.img src={bg} alt="" style={{ y: bgY, scale: 1.05 }} className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--background) / 0.85) 0%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.92) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 45%, transparent 0%, hsl(var(--background) / 0.4) 100%)",
              }}
            />
          </>
        }
      >
        <div className="max-w-2xl mx-auto px-8 md:px-14 py-24 text-center">
          <Reveal order={0}>
            <p className="tracking-[0.4em] text-xs text-accent-red mb-2">LET'S CONNECT</p>
          </Reveal>
          <Reveal order={1}>
            <div className="mx-auto w-16 h-px bg-accent-red mb-6 relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rotate-45 bg-accent-red" />
            </div>
          </Reveal>
          <Reveal order={2}>
            <h2 className="font-display text-5xl md:text-7xl font-light tracking-wide">
              <span className="text-foreground">GET IN </span>
              <span className="text-accent-red glow-text">TOUCH</span>
            </h2>
          </Reveal>
          <Reveal order={3}>
            <p className="mt-4 text-foreground/85 font-light">Let's create something impactful together.</p>
          </Reveal>

          <Reveal order={4}>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="mt-14 space-y-10 text-left"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label className="tracking-[0.35em] text-xs text-foreground">NAME</label>
                <input name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="underline-input mt-2" maxLength={100} />
              </div>
              <div>
                <label className="tracking-[0.35em] text-xs text-foreground">EMAIL</label>
                <input name="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="underline-input mt-2" maxLength={255} />
              </div>
              <div>
                <label className="tracking-[0.35em] text-xs text-foreground">MESSAGE</label>
                <textarea name="message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="underline-input mt-2 resize-none" rows={3} maxLength={1000} />
              </div>

              <button type="submit" className="group relative w-full py-4 border border-accent-red/60 text-foreground tracking-[0.4em] text-sm hover:border-highlight/70 hover:bg-accent-red/10 transition-all duration-500 overflow-hidden glow-red">
                <span className="flex items-center justify-center gap-3">
                  SEND MESSAGE
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {sent && (
                <p className="text-center text-highlight font-light">Message sent successfully. I'll get back to you soon.</p>
              )}
            </form>
          </Reveal>

          <Reveal order={5}>
            <div className="mt-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-12 h-px bg-accent-red/60" />
                <p className="tracking-[0.35em] text-xs text-accent-red">OR REACH US DIRECTLY</p>
                <span className="w-12 h-px bg-accent-red/60" />
              </div>
              <a href="mailto:anniemakesstudio@gmail.com" className="inline-flex items-center gap-3 text-foreground hover:text-highlight transition">
                <Mail size={18} className="text-accent-red" />
                anniemakesstudio@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </CinematicSection>
    </div>
  );
};

export default Contact;
