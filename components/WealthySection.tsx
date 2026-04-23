"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const investmentProducts = [
  {
    icon: "📊",
    title: "Mutual Funds",
    desc: "SIP or lumpsum investment based on your goals.",
    tag: "Most Popular",
  },
  {
    icon: "🏦",
    title: "Fixed Deposits",
    desc: "Bank & Private FDs for stability.",
    tag: "Low Risk",
  },
  {
    icon: "📜",
    title: "Bonds & Debentures",
    desc: "Fixed income securities for conservative growth.",
    tag: "Steady Returns",
  },
  {
    icon: "📈",
    title: "Stocks",
    desc: "Gold Bonds · Pre-IPO · F&O",
    tag: "High Growth",
  },
  {
    icon: "🏛️",
    title: "PMS / AIFs",
    desc: "For HNIs with higher risk appetite.",
    tag: "Premium",
  },
  {
    icon: "🛡️",
    title: "Insurance",
    desc: "Term & Health — protect your family & savings.",
    tag: "Essential",
  },
];

const goals = [
  { icon: "🏖️", label: "Retirement" },
  { icon: "🎓", label: "Children's Education" },
  { icon: "✈️", label: "Vacation" },
  { icon: "🚨", label: "Emergency Fund" },
  { icon: "💍", label: "Marriage" },
  { icon: "🏠", label: "Home Purchase" },
];

function SIPCalculator() {
  const [mode, setMode] = useState<"sip" | "lumpsum">("sip");
  const [monthly, setMonthly] = useState(5000);
  const [lumpsum, setLumpsum] = useState(100000);
  const [years, setYears] = useState(10);
  const [rate] = useState(12); // assumed 12% p.a.

  const sipFV = (() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  })();

  const lumpsumFV = lumpsum * Math.pow(1 + rate / 100, years);

  const invested = mode === "sip" ? monthly * years * 12 : lumpsum;
  const futureValue = mode === "sip" ? sipFV : lumpsumFV;
  const gains = futureValue - invested;

  const fmt = (n: number) =>
    n >= 10000000
      ? `₹${(n / 10000000).toFixed(2)} Cr`
      : n >= 100000
      ? `₹${(n / 100000).toFixed(2)} L`
      : `₹${Math.round(n).toLocaleString("en-IN")}`;

  const gainPct = Math.round((gains / invested) * 100);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gold/10 overflow-hidden">
      {/* Header */}
      <div className="bg-maroon p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="heading-serif text-2xl font-bold text-white">SIP & Lumpsum Calculator</h3>
            <p className="text-gold/70 text-sm mt-1">See your wealth grow over time</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-2xl p-1">
            {(["sip", "lumpsum"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  mode === m
                    ? "bg-gold text-maroon shadow-lg"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {m === "sip" ? "SIP" : "Lumpsum"}
              </button>
            ))}
          </div>
        </div>

        {/* Result Display */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2">
            Potential value after {years} years
          </p>
          <motion.p
            key={`${futureValue}-${mode}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold text-gold mb-3"
          >
            {fmt(futureValue)}
          </motion.p>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-white/40">Invested</span>
              <p className="text-white font-bold">{fmt(invested)}</p>
            </div>
            <div>
              <span className="text-white/40">Est. Gains</span>
              <p className="text-green-400 font-bold">
                +{fmt(gains)} ({gainPct}%)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 sm:p-8 space-y-6">
        <AnimatePresence mode="wait">
          {mode === "sip" ? (
            <motion.div
              key="sip"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <label className="block text-sm font-bold text-maroon mb-3">
                Monthly Investment
                <span className="ml-2 text-gold font-black">
                  ₹{monthly.toLocaleString("en-IN")}
                </span>
              </label>
              <input
                type="range"
                title="Monthly Investment Amount"
                min={500}
                max={100000}
                step={500}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full accent-gold h-2 rounded-full"
              />
              <div className="flex justify-between text-xs text-maroon/40 mt-1">
                <span>₹500</span>
                <span>₹1,00,000</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="lumpsum"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <label className="block text-sm font-bold text-maroon mb-3">
                Lumpsum Amount
                <span className="ml-2 text-gold font-black">
                  {fmt(lumpsum)}
                </span>
              </label>
              <input
                type="range"
                title="Lumpsum Investment Amount"
                min={10000}
                max={10000000}
                step={10000}
                value={lumpsum}
                onChange={(e) => setLumpsum(Number(e.target.value))}
                className="w-full accent-gold h-2 rounded-full"
              />
              <div className="flex justify-between text-xs text-zinc-400 mt-1">
                <span>₹10,000</span>
                <span>₹1 Cr</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="block text-sm font-bold text-maroon mb-3">
            Investment Period
            <span className="ml-2 text-gold font-black">{years} Years</span>
          </label>
          <input
            type="range"
            title="Investment Period in Years"
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-gold h-2 rounded-full"
          />
          <div className="flex justify-between text-xs text-maroon/40 mt-1">
            <span>1 yr</span>
            <span>30 yrs</span>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-maroon/50 mb-2">
            <span>Invested Amount</span>
            <span>Estimated Returns</span>
          </div>
          <div className="h-3 rounded-full bg-maroon/10 overflow-hidden flex">
            <motion.div
              className="h-full bg-maroon rounded-l-full"
              animate={{ width: `${(invested / futureValue) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="h-full bg-gold rounded-r-full"
              animate={{ width: `${(gains / futureValue) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <p className="text-[10px] text-maroon/40 text-center">
          *Assumed {rate}% p.a. returns. Actual returns may vary. Not financial advice.
        </p>
      </div>
    </div>
  );
}

export default function InvestmentSection() {
  return (
    <div className="flex flex-col">
      {/* Premium Trust Banner */}
      <section className="py-12 bg-[#1a0404] border-b border-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5 opacity-20 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
           <h2 className="heading-serif text-3xl font-bold text-white italic mb-4">
             Securing Your Financial Future
           </h2>
           <p className="text-gold/60 text-sm tracking-widest uppercase font-black">
             Direct Access to Institutional-Grade Portfolios
           </p>
        </div>
      </section>

      {/* Investment Products */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-serif text-3xl sm:text-5xl font-bold text-maroon mb-4">
              Our Investment Universe
            </h2>
            <p className="text-maroon/50 text-lg max-w-2xl mx-auto">
              We handpick premium investment options to help you grow and protect your wealth across every asset class.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentProducts.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, boxShadow: "0 30px 60px -15px rgba(99,13,13,0.12)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 120 }}
                className="relative bg-maroon/[0.03] border border-gold/10 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 group overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-linear-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <span className="text-4xl">{product.icon}</span>
                  <span className="text-[9px] font-black text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                    {product.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-maroon mb-2 relative z-10">{product.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed relative z-10">{product.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Goal-Based Investing */}
      <section className="py-16 sm:py-24 bg-maroon overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-serif text-3xl sm:text-5xl font-bold text-white mb-4">
              Goal-Based Planning
            </h2>
            <p className="text-gold/70 text-lg max-w-xl mx-auto">
              We help you map your life goals to the right financial instruments, ensuring you stay ahead of inflation.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, backgroundColor: "rgba(197,160,89,0.15)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 150 }}
                className="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-[1.2rem] sm:rounded-[1.5rem] border border-white/10 bg-white/5 cursor-default group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {goal.icon}
                </span>
                <span className="text-white/80 text-xs font-bold text-center leading-tight">
                  {goal.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SIP Calculator + App Features */}
      <section className="py-16 sm:py-24 bg-maroon/[0.03] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SIPCalculator />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <h2 className="heading-serif text-2xl sm:text-4xl font-bold text-maroon mb-4">
                  Unified Portfolio Management
                </h2>
                <p className="text-maroon/50 leading-relaxed text-lg">
                  Experience seamless tracking and management of your entire family's wealth through our secure, institutional-grade platform.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: "📱",
                    title: "Real-time Tracking",
                    desc: "Monitor all your investments live, anytime, anywhere.",
                  },
                  {
                    icon: "👨‍👩‍👧‍👦",
                    title: "Family Portfolios",
                    desc: "Consolidate and manage your entire family's wealth in one place.",
                  },
                  {
                    icon: "🔗",
                    title: "External Tracking",
                    desc: "Import and track investments held across different platforms.",
                  },
                  {
                    icon: "🔒",
                    title: "Bank-Grade Security",
                    desc: "Your data and investments are protected by state-of-the-art security.",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-gold/10 shadow-sm hover:shadow-md hover:border-gold/30 transition-all group"
                  >
                    <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-maroon text-lg mb-1">{feature.title}</h4>
                      <p className="text-maroon/50 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
