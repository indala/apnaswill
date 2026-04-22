"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-maroon py-24 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gold opacity-5 rotate-12 transform translate-x-1/2"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="heading-serif text-5xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Our Story
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-1 bg-gold mx-auto mt-8"
          ></motion.div>
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
              
              <div className="prose prose-xl text-maroon/70 max-w-none leading-relaxed space-y-6">
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
                    className={`bg-zinc-50 p-8 rounded-3xl border-l-8 ${box.color} shadow-sm group hover:shadow-xl transition-all`}
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
              <div className="aspect-3/4 rounded-[3rem] bg-maroon overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative border-12 border-zinc-50">
                <div className="absolute inset-0 flex items-center justify-center text-white/10 text-[12rem] font-bold heading-serif italic select-none">
                  AP
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-maroon via-transparent to-transparent opacity-80"></div>
              </div>
              
              {/* Floating Experience Badge */}
              <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 12 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-10 -left-10 bg-gold p-10 rounded-[2.5rem] shadow-2xl border-[6px] border-maroon transform rotate-12 hover:rotate-0 transition-transform duration-500"
              >
                <p className="text-maroon font-black text-center">
                  <span className="text-5xl block mb-1">PRO</span>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">In Financial Services</span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder's Vision */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="heading-serif text-4xl font-bold text-maroon italic">The Founder's Vision</h2>
              <p className="text-xl text-zinc-600 leading-relaxed italic">
                "APNAS Will was born from a simple realization: every family deserves the same institutional-grade financial guidance usually reserved for the ultra-wealthy."
              </p>
              <div className="space-y-6">
                <p className="text-zinc-500 leading-relaxed">
                  Led by <strong>Aswini Prasad</strong>, our consultancy is built on the pillars of awareness, transparency, and trust. We don't just manage wealth; we orchestrate legacies. By bridging the gap between complex financial instruments and family needs, we ensure that your hard-earned success is protected for generations.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden bg-maroon/5 border-2 border-gold/20 flex items-center justify-center p-12"
            >
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img src="/brochure_assets/page1_img1.jpeg" className="w-full h-full object-cover" />
               </div>
               <div className="relative z-10 text-center">
                  <span className="text-8xl mb-8 block">🛡️</span>
                  <p className="heading-serif text-3xl font-bold text-maroon italic">"Guiding every stage of life with integrity."</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Institutional Strength Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="heading-serif text-4xl font-bold text-maroon mb-6 tracking-tight">Our Institutional Strength</h2>
            <div className="h-1 w-20 bg-gold mx-auto mb-8"></div>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              Our authority is built on strategic partnerships with the world's most trusted financial institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Direct Partner Access", desc: "No intermediaries. We work directly with institutional leads from SBI Life, HDFC, and ICICI.", icon: "🏢" },
              { title: "GIFT City Gateway", desc: "Official access to offshore investment opportunities through our IFSC-registered portals.", icon: "🌐" },
              { title: "Pre-IPO Exclusive", desc: "Early-stage access to India's most promising unicorns before they hit the public market.", icon: "📈" }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-50 p-12 rounded-[2.5rem] shadow-sm border border-gold/5 text-center group hover:scale-105 hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-8 group-hover:rotate-12 transition-transform">{feature.icon}</div>
                <h4 className="text-xl font-bold text-maroon mb-4 italic tracking-tight">{feature.title}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <img src="/brochure_assets/page2_img30.png" className="w-full h-full object-cover" />
        </div>
      </section>
    </div>
  );
}
