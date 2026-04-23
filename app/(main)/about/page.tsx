"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-maroon py-32 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="heading-serif text-4xl font-bold tracking-tight text-white sm:text-7xl"
          >
            Our Story
          </motion.h1>
          <div className="h-1.5 w-24 bg-gold mx-auto mt-8 rounded-full"></div>
        </div>
      </motion.section>

      {/* Profile Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div>
                <motion.h2 
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="heading-serif text-4xl font-bold text-maroon mb-4"
                >
                  Aswini Prasad
                </motion.h2>
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gold italic tracking-tight"
                >
                  Financial Consultant & Wealth Partner
                </motion.p>
              </div>
              
              <div className="prose prose-xl text-maroon/70 max-w-none leading-relaxed space-y-6 font-light">
                <p>
                  I am Aswini Prasad, a dedicated Financial Consultant focused on helping families build sustainable wealth and secure their future through disciplined financial planning and robust risk protection strategies.
                </p>
                <p>
                  With a strong foundation in finance and years of experience in advisory services, my mission is to bring insurance and financial awareness to every family, ensuring they are prepared for every stage of life.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                {[
                  {
                    title: "Qualifications",
                    items: ["MBA Finance", "M.Com", "PGDCA", "CA Finalist"],
                    color: "border-maroon"
                  },
                  {
                    title: "Expertise",
                    items: ["Financial Planning", "Client Relationship", "Insurance Advisory", "Wealth Management"],
                    color: "border-gold"
                  }
                ].map((box, i) => (
                  <motion.div 
                    key={i}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className={`bg-maroon/[0.03] p-8 rounded-[2.5rem] border-l-8 ${box.color} shadow-sm group hover:shadow-2xl hover:-translate-y-2 transition-all`}
                  >
                    <h4 className="font-bold text-maroon mb-4 text-lg italic tracking-tight">{box.title}</h4>
                    <ul className="space-y-3">
                      {box.items.map((item, j) => (
                        <li key={j} className="text-sm text-maroon/60 font-medium flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-[2.5rem] sm:rounded-[4rem] bg-maroon overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative border-[8px] sm:border-[16px] border-maroon/[0.03] group">
                <div className="absolute inset-0 flex items-center justify-center text-white/5 text-[15rem] font-bold heading-serif italic select-none group-hover:scale-110 transition-transform duration-1000">
                  AP
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-maroon via-maroon/20 to-transparent opacity-80"></div>
                
                {/* Visual Accent */}
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="h-1 w-12 bg-gold mb-4"></div>
                   <p className="text-white font-bold text-2xl heading-serif italic">Aswini Prasad</p>
                   <p className="text-gold/60 text-xs uppercase tracking-widest font-black mt-1">Founder & Lead Consultant</p>
                </div>
              </div>
              
              {/* Floating Credential Badge */}
              <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 12 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 bg-gold p-6 sm:p-10 rounded-[2rem] sm:rounded-[3.3rem] shadow-2xl border-[6px] sm:border-[8px] border-white transform rotate-12 hover:rotate-0 transition-transform duration-500"
              >
                <div className="text-maroon font-black text-center">
                  <span className="text-xl sm:text-3xl block mb-1">MBA · M.Com</span>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold opacity-70">CA Finalist · PGDCA</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder's Vision */}
      <section className="py-16 sm:py-32 bg-maroon/[0.03] relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="heading-serif text-3xl font-bold text-maroon italic">The Vision</h2>
              <p className="text-2xl text-maroon/60 leading-relaxed italic font-light">
                "APNAS Will was born from a simple realization: every family deserves the same institutional-grade financial guidance usually reserved for the ultra-wealthy."
              </p>
              <div className="space-y-6">
                <p className="text-maroon/50 leading-relaxed text-lg">
                  Led by <strong>Aswini Prasad</strong>, our consultancy is built on the pillars of awareness, transparency, and trust. We don't just manage wealth; we build lasting legacies. By bridging the gap between complex financial instruments and family needs, we ensure that your hard-earned success is protected for generations.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
               <div className="bg-white p-10 sm:p-16 rounded-[3rem] sm:rounded-[4rem] shadow-2xl border border-gold/10 text-center relative z-10">
                  <span className="text-9xl mb-10 block drop-shadow-2xl">🛡️</span>
                  <p className="heading-serif text-2xl sm:text-3xl font-bold text-maroon italic leading-relaxed">
                    "Guiding every stage of life with unwavering integrity."
                  </p>
                  <div className="h-1 w-16 bg-gold mx-auto mt-8"></div>
               </div>
               <div className="absolute -top-12 -right-12 h-64 w-64 bg-gold rounded-full opacity-10 blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Institutional Strength Section */}
      <section className="py-16 sm:py-32 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="heading-serif text-3xl sm:text-5xl font-bold text-maroon mb-6 tracking-tight">Our Core Strength</h2>
            <div className="h-1.5 w-24 bg-gold mx-auto mb-10 rounded-full"></div>
            <p className="text-maroon/50 text-xl max-w-2xl mx-auto font-light">
              Our advisory is backed by powerful partnerships with India's leading financial institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Direct Partner Access", desc: "We work directly with institutional representatives from SBI Life, HDFC Life, and more.", icon: "🏢" },
              { title: "GIFT City Access", desc: "Strategic access to global offshore investment opportunities via IFSC portals.", icon: "🌐" },
              { title: "Pre-IPO Opportunities", desc: "Exclusive access to select high-growth pre-IPO companies through our private network.", icon: "📈" }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-maroon/[0.03] p-12 rounded-[3.5rem] shadow-sm border border-gold/5 text-center group hover:shadow-2xl hover:-translate-y-4 transition-all duration-500"
              >
                <div className="text-7xl mb-10 group-hover:rotate-12 transition-transform duration-500">{feature.icon}</div>
                <h4 className="text-2xl font-bold text-maroon mb-6 italic tracking-tight">{feature.title}</h4>
                <p className="text-maroon/50 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-16 sm:py-32 bg-maroon text-center relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-6 relative z-10">
           <h2 className="heading-serif text-3xl sm:text-4xl font-bold text-white mb-8">Ready to secure your legacy?</h2>
           <Link 
            href="/contact"
            className="inline-block rounded-full bg-gold px-12 py-5 text-maroon font-bold text-xl shadow-2xl hover:bg-white transition-all"
           >
            Schedule a Consultation
           </Link>
        </div>
      </section>
    </div>
  );
}
