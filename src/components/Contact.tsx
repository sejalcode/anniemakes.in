import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import bg from "@/assets/contact-bg.jpeg";
import ribbon from "@/assets/hero-ribbon.jpg";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message required").max(1000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    // Netlify form submission
    const body = new URLSearchParams({ "form-name": "contact", ...form }).toString();
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body })
      .catch(() => { /* ignored — Netlify handles in production */ });
    setSent(true);
    toast.success("Message sent successfully. I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={bg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/75" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-50 pointer-events-none">
        <img src={ribbon} alt="" className="w-full h-full object-cover animate-ribbon" style={{ mixBlendMode: "screen" }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-8 md:px-14 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="tracking-[0.4em] text-xs text-accent-red mb-2">LET'S CONNECT</p>
          <div className="mx-auto w-16 h-px bg-accent-red mb-6 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rotate-45 bg-accent-red" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-wide">
            <span className="text-foreground">GET IN </span>
            <span className="text-accent-red glow-text">TOUCH</span>
          </h2>
          <p className="mt-4 text-foreground/85 font-light">Let's create something impactful together.</p>
        </motion.div>

        <motion.form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
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
        </motion.form>

        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-px bg-accent-red/60" />
            <p className="tracking-[0.35em] text-xs text-accent-red">OR REACH US DIRECTLY</p>
            <span className="w-12 h-px bg-accent-red/60" />
          </div>
          <a href="mailto:hello@anniemakes.com" className="inline-flex items-center gap-3 text-foreground hover:text-highlight transition">
            <Mail size={18} className="text-accent-red" />
            hello@anniemakes.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
