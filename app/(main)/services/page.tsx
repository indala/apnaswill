"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import EcosystemWall from "@/components/EcosystemWall";

export default function Services() {
  const services = [
    {
      id: "wealth",
      title: "Wealth Creation",
      icon: "💰",
      items: [
        "Mutual Funds & SIFs (Goal-based)",
        "Portfolio Management (PMS)",
        "Alternative Investments (AIF)",
        "Institutional Investment Baskets",
        "Strategic SIP Management"
      ],
      description: "Harness the power of professional portfolio management and curated investment strategies to grow your wealth across market cycles."
    },
    {
      id: "insurance-health",
      title: "Health & Life Protection",
      icon: "🛡️",
      items: [
        "SBI Life Insurance Solutions",
        "Optima Secure & Reassure 3.0",
        "iProtect Smart (IPS) Term Plan",
        "GOLD Ultra & GIFT Pro",
        "Fortune Guarantee Secure"
      ],
      description: "Secure your family's future with elite protection plans from trusted partners including HDFC Life, SBI Life, and Star Health."
    },
    {
      id: "fixed-income",
      title: "Fixed Income & Bonds",
      icon: "📈",
      items: [
        "Corporate & PSU Bonds",
        "54 EC Tax-Saving Bonds",
        "High-Rated Private Debentures",
        "State Guaranteed Bonds",
        "Fixed Deposit Laddering"
      ],
      description: "Preserve capital and ensure steady returns with high-rated fixed income instruments, including tax-efficient 54 EC bonds."
    },
    {
      id: "offshore",
      title: "GIFT City Investments",
      icon: "🌐",
      items: [
        "WhiteOak Capital Offshore",
        "Motilal Oswal Alternative",
        "Mirae Asset India Equity (IFSC)",
        "Global Emerging Allocation",
        "Min. Investment: $150,000 USD"
      ],
      description: "Access global investment opportunities and tax-efficient offshore structures through GIFT City (IFSC)."
    },
    {
      id: "equity",
      title: "Equity & Pre-IPO",
      icon: "🏛️",
      items: [
        "Stocks & ETF Portfolio",
        "Pre-IPO Access (Select Opportunities)",
        "Metropolitan Stock Exchange",
        "Futures & Options (Research Support)",
        "Equity Portfolio Review"
      ],
      description: "Gain a competitive edge with direct equity access and pre-IPO opportunities in India's high-growth companies."
    },
    {
      id: "future",
      title: "Legacy & Retirement",
      icon: "👴",
      items: [
        "Retirement Corpus Building",
        "Child Education & Legacy Planning",
        "Pension & Annuity Planning",
        "Estate Planning & Will Creation",
        "Wealth Transfer Strategies"
      ],
      description: "Design a lasting legacy and ensure a dignified retirement with disciplined planning tailored for the next generation."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-maroon py-32 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="heading-serif text-5xl font-bold tracking-tight text-white sm:text-7xl mb-8">
              Our Expertise
            </h1>
            <div className="h-1.5 w-24 bg-gold mx-auto rounded-full mb-8"></div>
            <p className="text-gold/80 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Institutional-grade financial planning and wealth management, planned with precision and trust.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Detail */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-40">
            {services.map((service, index) => (
              <motion.div 
                key={service.id} 
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.98 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                className={`flex flex-col lg:flex-row gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 space-y-10">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-6"
                  >
                    <span className="text-6xl drop-shadow-lg">{service.icon}</span>
                    <h2 className="heading-serif text-4xl font-bold text-maroon">{service.title}</h2>
                  </motion.div>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-maroon/60 text-xl leading-relaxed max-w-xl"
                  >
                    {service.description}
                  </motion.p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.items.map((item, i) => (
                      <li key={i}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05, borderColor: "rgba(184, 134, 11, 0.4)" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + (i * 0.05) }}
                          className="flex items-center gap-3 text-maroon/80 bg-maroon/[0.03] p-5 rounded-2xl border border-gold/5 shadow-sm transition-all cursor-default"
                        >
                          <svg className="h-5 w-5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium">{item}</span>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </div>
                <motion.div 
                  initial={{ rotate: index % 2 === 0 ? 5 : -5, scale: 0.9, opacity: 0 }}
                  whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="flex-1 w-full max-w-md"
                >
                   <div className="aspect-square rounded-[3rem] bg-zinc-50 border-4 border-gold/10 flex items-center justify-center relative group overflow-hidden shadow-2xl">
                      <div className="absolute inset-10 border-2 border-maroon/10 rounded-3xl group-hover:scale-110 transition-transform duration-700"></div>
                      <motion.span 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="text-9xl opacity-30 drop-shadow-2xl"
                      >
                        {service.icon}
                      </motion.span>
                   </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy Discovery Tool */}
      <section className="py-32 bg-maroon relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="heading-serif text-4xl font-bold text-white mb-6">Find Your Strategic Roadmap</h2>
            <p className="text-gold/70 text-xl max-w-2xl mx-auto">Select your primary focus area to see our recommended expertise.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'growth', label: 'Aggressive Growth', icon: '🚀', rec: 'Equity & Pre-IPO Access' },
              { id: 'income', label: 'Steady Income', icon: '💰', rec: 'Fixed Income & Bond Laddering' },
              { id: 'safety', label: 'Family Safety', icon: '🛡️', rec: 'Health & Life Protection' },
              { id: 'offshore', label: 'Global Diversification', icon: '🌐', rec: 'GIFT City Offshore Investments' }
            ].map((choice) => (
              <motion.button
                key={choice.id}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[3rem] group hover:bg-gold hover:border-gold transition-all"
              >
                <span className="text-6xl mb-6 block group-hover:scale-125 transition-transform">{choice.icon}</span>
                <h4 className="text-xl font-bold text-white group-hover:text-maroon mb-2">{choice.label}</h4>
                <div className="h-0.5 w-8 bg-gold mx-auto mb-6 group-hover:bg-maroon/20"></div>
                <p className="text-gold/50 text-xs font-bold uppercase tracking-widest group-hover:text-maroon/60">Recommendation:</p>
                <p className="text-white font-medium mt-1 group-hover:text-maroon">{choice.rec}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section className="py-32 bg-maroon/[0.03] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="heading-serif text-4xl font-bold text-maroon mb-6">Featured Portfolio</h2>
            <p className="text-maroon/50 text-lg max-w-2xl mx-auto">Explore our curated selection of top-tier financial instruments from India's leading institutions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: "Health & Life",
                products: ["SBI Life Plans", "Optima Secure", "Reassure 3.0", "iProtect Smart", "SRP Term Plan", "GOLD Ultra", "Fortune Guarantee"]
              },
              {
                category: "Bonds & Fixed Income",
                products: ["54 EC Bonds", "PSU Bonds (PFC/REC)", "Navi Finserv Bonds", "Edelweiss Financial", "IIFL Samasta", "State Guaranteed Bonds"]
              },
              {
                category: "Offshore & High-Net",
                products: ["WhiteOak Capital Global", "Mirae Asset India (IFSC)", "Alchemy India Trust", "Institutional Baskets", "Pre-IPO (NSE/Zepto)", "Alternative Assets"]
              }
            ].map((group, i) => (
              <motion.div 
                key={group.category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 30px 60px -15px rgba(184, 134, 11, 0.15)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                className="bg-white p-10 rounded-[3rem] shadow-xl border border-gold/5 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-sm font-black text-gold uppercase tracking-[0.3em] mb-8 relative z-10">{group.category}</h3>
                <ul className="space-y-4">
                  {group.products.map((product) => (
                    <li key={product} className="flex items-center gap-3 text-maroon font-bold group cursor-pointer">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold group-hover:scale-150 transition-transform"></span>
                      {product}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Network Wall */}
      <EcosystemWall />

      <section className="py-24 bg-maroon/[0.03] relative overflow-hidden">
        <div className="absolute inset-0 bg-maroon/3"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-gold uppercase tracking-[0.5em] mb-16"
          >
            Strategic Partnerships
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
              {[
                { name: "SBI Life", url: "/brochure_assets/SbiMutualFund01.png" },
                { name: "Axis Mutual Fund", url: "/brochure_assets/AxisMutualFund01.png" },
                { name: "HDFC Life", url: "/brochure_assets/HdfcLife.png" },
                { name: "ICICI Prudential", url: "/brochure_assets/IciciPrudentialLifeInsurance.jpeg" },
                { name: "Tata AIA", url: "/brochure_assets/TataAiaLifeInsurance.jpeg" },
                { name: "Care Health", url: "/brochure_assets/CareHealthInsurance.png" }
              ].map((partner, i) => (
               <motion.div 
                key={i} 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 transition-all cursor-default"
               >
                 <div className="bg-white rounded-2xl p-4 shadow-sm border border-gold/10 w-full flex items-center justify-center h-16 relative">
                   <Image 
                    src={partner.url} 
                    alt={partner.name} 
                    fill
                    className="object-contain p-4" 
                   />
                 </div>
                 <span className="text-[9px] font-bold text-maroon/50 uppercase tracking-widest">{partner.name}</span>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-32 bg-white text-center"
      >
        <div className="mx-auto max-w-3xl px-6">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="heading-serif text-4xl font-bold text-maroon mb-8"
          >
            Ready for a tailored financial roadmap?
          </motion.h2>
          <p className="text-maroon/50 text-xl mb-12 max-w-xl mx-auto">
            Book a complimentary session with our experts to find the perfect strategy for your family.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="rounded-full bg-maroon px-12 py-5 text-white font-bold text-lg shadow-2xl hover:bg-maroon/90 transition-all inline-block"
            >
              Consult Our Experts
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
