"use client";

import Image from "next/image";
import Link from "next/link";
import StatusRing from "@/components/StatusRing";
import InvestmentSection from "@/components/WealthySection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden bg-maroon py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="heading-serif text-5xl font-bold tracking-tight sm:text-7xl mb-8 leading-tight"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["200% 0", "-200% 0"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="bg-linear-to-r from-gold via-[#e0c58e] to-gold bg-size-[200%_auto] bg-clip-text text-transparent"
                >
                  APNAS Will
                </motion.span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-light text-gold italic mb-10 tracking-wide"
              >
                "Guiding Every Stage of Life"
              </motion.p>
              <p className="text-lg leading-8 text-white/70 mb-10 max-w-xl">
                Professional financial consultancy focused on securing your family's future through wealth creation, comprehensive insurance, and disciplined retirement planning.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="rounded-full bg-gold px-10 py-5 text-lg font-bold text-maroon shadow-2xl hover:bg-gold-light transition-all inline-block"
                  >
                    Book Free Consultation
                  </Link>
                </motion.div>
                <Link
                  href="https://wa.me/919059058688"
                  className="rounded-full border-2 border-gold px-8 py-4 text-base font-bold text-gold hover:bg-gold hover:text-maroon transition-all"
                >
                  WhatsApp Now
                </Link>
              </div>
            </div>

            {/* Right column: Status Ring */}
            <div className="flex flex-col items-center justify-center gap-4">
              <StatusRing />
              <p className="text-gold font-bold text-sm uppercase tracking-widest">Daily Updates</p>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gold opacity-10 blur-3xl"></div>

      </motion.section>



      {/* Services Preview */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center mb-24"
          >
            <h2 className="heading-serif text-4xl font-bold tracking-tight text-maroon sm:text-5xl mb-6">Our Expertise</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gold mx-auto"
            ></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {[
              {
                title: "Offshore Investments",
                description: "Exclusive access to GIFT City (IFSC) products, including WhiteOak and Mirae Asset global funds.",
                icon: "🌐"
              },
              {
                title: "Bonds & Fixed Income",
                description: "High-rated corporate bonds, PSU bonds, and 54 EC tax-saving instruments for capital preservation.",
                icon: "📈"
              },
              {
                title: "Insurance & Legacy",
                description: "Elite protection with SBI Life, Optima Secure, iProtect Smart, and comprehensive estate planning solutions.",
                icon: "🛡️"
              }
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -15, scale: 1.05, boxShadow: "0 25px 50px -12px rgba(212, 175, 55, 0.2)" }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="flex flex-col items-center text-center p-12 rounded-[3.5rem] bg-maroon/[0.03] border border-gold/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-maroon text-5xl shadow-xl group-hover:rotate-12 transition-transform relative z-10">
                  {service.icon}
                </div>
                <dl>
                  <dt className="text-2xl font-bold leading-7 text-maroon mb-6 italic relative z-10">
                    {service.title}
                  </dt>
                  <dd className="text-maroon/60 leading-relaxed mb-8 relative z-10">
                    {service.description}
                  </dd>
                </dl>
                <Link href="/services" className="relative z-10 text-maroon font-black text-sm uppercase tracking-widest hover:text-gold flex items-center gap-2 group/link transition-colors">
                  Explore Details
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    &rarr;
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Trust Ribbon */}
      <section className="py-20 bg-maroon/[0.02] border-y border-maroon/5 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-[10px] font-black text-maroon/40 uppercase tracking-[0.5em] mb-12">
            Empowering Futures with Industry Leaders
          </p>
          <div className="relative flex overflow-x-hidden py-8">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap gap-16 items-center pr-16"
            >
              {[
                { name: "SBI Life", url: "/brochure_assets/SbiMutualFund01.png" },
                { name: "Axis Mutual Fund", url: "/brochure_assets/AxisMutualFund01.png" },
                { name: "HDFC Life", url: "/brochure_assets/HdfcLife.png" },
                { name: "ICICI Prudential", url: "/brochure_assets/IciciPrudentialLifeInsurance.jpeg" },
                { name: "Tata AIA", url: "/brochure_assets/TataAiaLifeInsurance.jpeg" },
                { name: "Care Health", url: "/brochure_assets/CareHealthInsurance.png" },
                { name: "NSE", url: "/brochure_assets/Nse.png" },
                { name: "Zepto", url: "/brochure_assets/Zepto.png" }
              ].map((partner) => (
                <motion.div
                  key={partner.name}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-all cursor-crosshair px-4"
                >
                  <div className="relative h-10 w-28">
                    <Image
                      src={partner.url}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="heading-serif text-lg font-bold text-maroon/60">{partner.name}</span>
                </motion.div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { name: "SBI Life", url: "/brochure_assets/SbiMutualFund01.png" },
                { name: "Axis Mutual Fund", url: "/brochure_assets/AxisMutualFund01.png" },
                { name: "HDFC Life", url: "/brochure_assets/HdfcLife.png" },
                { name: "ICICI Prudential", url: "/brochure_assets/IciciPrudentialLifeInsurance.jpeg" },
                { name: "Tata AIA", url: "/brochure_assets/TataAiaLifeInsurance.jpeg" },
                { name: "Care Health", url: "/brochure_assets/CareHealthInsurance.png" },
                { name: "NSE", url: "/brochure_assets/Nse.png" },
                { name: "Zepto", url: "/brochure_assets/Zepto.png" }
              ].map((partner) => (
                <motion.div
                  key={partner.name + '-dup'}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-all cursor-crosshair px-4"
                >
                  <div className="relative h-10 w-28">
                    <Image
                      src={partner.url}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="heading-serif text-lg font-bold text-maroon/60">{partner.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Families Served", value: "500+", sub: "Trusted Partners" },
              { label: "Expertise", value: "15+", sub: "Years of Trust" },
              { label: "Financial Products", value: "100+", sub: "Curated Portfolio" },
              { label: "Client Retention", value: "98%", sub: "Long-term Relations" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="h-0.5 w-8 bg-gold mb-6 group-hover:w-16 transition-all duration-500"></div>
                <span className="heading-serif text-5xl font-bold text-maroon mb-2">{stat.value}</span>
                <span className="text-maroon font-black text-xs uppercase tracking-[0.3em] mb-1">{stat.label}</span>
                <span className="text-maroon/40 text-[10px] uppercase tracking-widest">{stat.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-maroon/[0.03] overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-serif text-3xl font-bold tracking-tight text-maroon sm:text-4xl mb-8">Why Trust APNAS Will?</h2>
              <div className="space-y-8">
                {[
                  { title: "Personalized Advice", text: "We don't believe in one-size-fits-all. Every financial plan is tailored to your unique goals." },
                  { title: "Transparent Process", text: "Clear, honest, and jargon-free advice. You'll always know where your money is and why." },
                  { title: "Long-Term Relationship", text: "We are partners in your journey, guiding you through every stage of life and market cycle." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 h-8 w-8 rounded-full bg-maroon flex items-center justify-center text-gold">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-maroon mb-1">{item.title}</h4>
                      <p className="text-maroon/60 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              whileHover={{ rotateY: 5, rotateX: -2, scale: 1.05 }}
              viewport={{ once: true }}
              style={{ perspective: 1000 }}
              className="relative transition-all duration-700 ease-out"
            >
              <div className="aspect-4/3 rounded-[3rem] bg-maroon/10 border-2 border-gold/20 flex items-center justify-center p-12 text-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 maroon-gradient opacity-10"></div>
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="h-1 w-20 bg-gold mx-auto mb-8"
                  ></motion.div>
                  <p className="heading-serif text-3xl text-maroon font-bold italic mb-6 leading-relaxed">
                    "Securing every family with awareness and trust."
                  </p>
                  <p className="text-xs font-black text-maroon/40 uppercase tracking-[0.4em]">Our Mission</p>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 h-32 w-32 bg-gold rounded-full opacity-20 blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Options Section */}
      <InvestmentSection />

      {/* FAQ Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="heading-serif text-4xl font-bold text-maroon mb-6">Frequently Asked Questions</h2>
            <div className="h-1 w-12 bg-gold mx-auto"></div>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "What makes APNAS Will different from other consultants?",
                a: "We provide institutional-grade advice with a deeply personalized touch. Unlike generic platforms, we focus on long-term family legacies and offer exclusive access to premium products like GIFT City offshore funds."
              },
              {
                q: "Is my financial data secure with you?",
                a: "Security is our top priority. We use bank-grade encryption and partner with India's most trusted institutions like SBI, HDFC, and ICICI to ensure your assets and data are always protected."
              },
              {
                q: "Do you offer international investment options?",
                a: "Yes, through our strategic GIFT City (IFSC) access, we provide our clients with opportunities to invest in global offshore funds and emerging market portfolios."
              },
              {
                q: "How do I get started with a personalized roadmap?",
                a: "Simply click the 'Book Free Consultation' button. We'll schedule a discovery session to understand your goals and design a tailored financial roadmap for your family."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-[2rem] bg-maroon/[0.03] p-8 border border-gold/5"
              >
                <h4 className="text-lg font-bold text-maroon mb-4">{faq.q}</h4>
                <p className="text-maroon/60 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-maroon text-center"
      >
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="heading-serif text-3xl font-bold text-white mb-6">Ready to secure your future?</h2>
          <p className="text-white/70 mb-10 text-lg">Join hundreds of families who have chosen a disciplined path to wealth and protection.</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="inline-block rounded-full bg-gold px-10 py-5 text-lg font-bold text-maroon shadow-2xl hover:bg-gold-light transition-all"
            >
              Start Your Journey Today
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
