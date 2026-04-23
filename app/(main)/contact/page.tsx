"use client";

import { useState } from "react";
import { z } from "zod";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    subject: "Wealth Creation / Mutual Funds",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate with Zod
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: any = {};
      result.error.issues.forEach((issue: z.ZodIssue) => {
        if (issue.path[0]) formattedErrors[issue.path[0] as keyof ContactFormData] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", subject: "Wealth Creation / Mutual Funds", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-maroon py-24 text-center relative overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="heading-serif text-5xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Contact Us
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gold mx-auto mt-8"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gold/80 mt-6 text-xl max-w-2xl mx-auto"
          >
            Expert financial guidance is just a message away. Let's secure your future together.
          </motion.p>
        </div>
        {/* Artistic accent */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
      </motion.section>

      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h2 className="heading-serif text-4xl font-bold text-maroon mb-8">Get In Touch</h2>
                <p className="text-maroon/60 text-lg leading-relaxed mb-10 max-w-md">
                  Whether you're starting your wealth journey or looking to protect your family, our team is ready to provide personalized solutions.
                </p>
              </div>

              <div className="space-y-10">
                {[
                  {
                    label: "Email Us",
                    val: "contact.apnaswill@zohomail.in",
                    sub: "Alternative: aswinichikkam29@gmail.com",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    )
                  },
                  {
                    label: "Phone / WhatsApp",
                    val: "+91 90590 58688",
                    sub: "Available for calls and messages",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                    )
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-start gap-8"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-gold/5 flex items-center justify-center text-maroon border border-gold/10 shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gold uppercase tracking-[0.3em] mb-2">{item.label}</p>
                      <a href={item.label.includes("Email") ? `mailto:${item.val}` : `tel:${item.val.replace(/ /g, '')}`} className="text-2xl font-bold text-maroon hover:text-gold transition-colors block mb-1">
                        {item.val}
                      </a>
                      <p className="text-sm text-maroon/40 italic">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-zinc-50/50 p-12 rounded-[3rem] border border-gold/10 shadow-2xl relative"
            >
              <h3 className="heading-serif text-3xl font-bold text-maroon mb-10">Enquiry Form</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-maroon/60 uppercase tracking-widest ml-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, borderColor: "rgba(184, 134, 11, 0.5)" }}
                      type="text"
                      required
                      className={`w-full bg-white border-2 ${errors.name ? 'border-red-500' : 'border-zinc-100'} rounded-2xl px-6 py-4 text-maroon font-medium focus:outline-none shadow-sm transition-all`}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <span className="text-red-500 text-[10px] font-bold uppercase tracking-tighter block mt-1">{errors.name}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-maroon/60 uppercase tracking-widest ml-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, borderColor: "rgba(184, 134, 11, 0.5)" }}
                      type="tel"
                      required
                      className={`w-full bg-white border-2 ${errors.phone ? 'border-red-500' : 'border-zinc-100'} rounded-2xl px-6 py-4 text-maroon font-medium focus:outline-none shadow-sm transition-all`}
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <span className="text-red-500 text-[10px] font-bold uppercase tracking-tighter block mt-1">{errors.phone}</span>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-maroon/60 uppercase tracking-widest ml-1">Email Address (Optional)</label>
                  <motion.input
                    whileFocus={{ scale: 1.01, borderColor: "rgba(184, 134, 11, 0.5)" }}
                    type="email"
                    className={`w-full bg-white border-2 ${errors.email ? 'border-red-500' : 'border-zinc-100'} rounded-2xl px-6 py-4 text-maroon font-medium focus:outline-none shadow-sm transition-all`}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span className="text-red-500 text-[10px] font-bold uppercase tracking-tighter block mt-1">{errors.email}</span>}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-maroon/60 uppercase tracking-widest ml-1">Subject</label>
                  <select
                    title="Inquiry Subject"
                    className="w-full bg-white border-2 border-zinc-100 rounded-2xl px-6 py-4 text-maroon font-medium focus:outline-none shadow-sm"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option>Wealth Creation / Mutual Funds</option>
                    <option>Insurance (Life / Health)</option>
                    <option>Retirement Planning</option>
                    <option>Estate / Will Planning</option>
                    <option>Other Enquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-maroon/60 uppercase tracking-widest ml-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01, borderColor: "rgba(184, 134, 11, 0.5)" }}
                    rows={4}
                    required
                    className={`w-full bg-white border-2 ${errors.message ? 'border-red-500' : 'border-zinc-100'} rounded-2xl px-6 py-4 text-maroon font-medium focus:outline-none shadow-sm transition-all`}
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></motion.textarea>
                  {errors.message && <span className="text-red-500 text-[10px] font-bold uppercase tracking-tighter block mt-1">{errors.message}</span>}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-maroon text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-maroon/90 transition-all disabled:opacity-50 text-lg"
                >
                  {status === "loading" ? "Sending..." : "Send Enquiry"}
                </motion.button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-green-600 font-bold text-center mt-4 bg-green-50 p-4 rounded-xl border border-green-100"
                    >
                      Enquiry sent successfully! We will contact you soon.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-red-600 font-bold text-center mt-4 bg-red-50 p-4 rounded-xl border border-red-100"
                    >
                      Failed to send enquiry. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      {/* What Happens Next */}
      <section className="py-24 bg-zinc-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="heading-serif text-3xl font-bold text-maroon mb-6">Your Path to Clarity</h2>
            <p className="text-maroon/50 text-lg">Transparent steps from your first inquiry to a secure legacy.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Initial Inquiry", desc: "You submit your details and focus area via this form or WhatsApp." },
              { title: "Expert Match", desc: "A specialist in your specific area (Wealth, Insurance, or Estate) reaches out." },
              { title: "Discovery Session", desc: "A complimentary session to understand your family's unique landscape." },
              { title: "Strategic Plan", desc: "Receive a bespoke roadmap using institutional-grade instruments." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gold/10 relative"
              >
                <span className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm mb-6">{i + 1}</span>
                <h4 className="text-lg font-bold text-maroon mb-4">{step.title}</h4>
                <p className="text-maroon/50 text-sm leading-relaxed">{step.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-4 translate-y-[-50%] text-gold opacity-30 text-2xl">→</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
