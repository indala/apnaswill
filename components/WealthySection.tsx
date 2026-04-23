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

const wealthyStats = [
  { value: "₹6,000 Cr+", label: "Investments Executed" },
  { value: "1,00,000+", label: "Investors on Platform" },
  { value: "20+", label: "Offices Across India" },
  { value: "SEBI", label: "Registered & Regulated" },
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
      <div className="bg-maroon px-8 pt-8 pb-6">
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
            className="heading-serif text-4xl font-bold text-gold mb-3"
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
      <div className="p-8 space-y-6">
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
                min={500}
                max={100000}
                step={500}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full accent-gold h-2 rounded-full"
              />
              <div className="flex justify-between text-xs text-zinc-400 mt-1">
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
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-gold h-2 rounded-full"
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-1">
            <span>1 yr</span>
            <span>30 yrs</span>
          </div>
        </div>

        {/* Progress bar showing invested vs gains */}
        <div>
          <div className="flex justify-between text-xs text-zinc-500 mb-2">
            <span>Invested Amount</span>
            <span>Estimated Returns</span>
          </div>
          <div className="h-3 rounded-full bg-zinc-100 overflow-hidden flex">
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

        <p className="text-[10px] text-zinc-400 text-center">
          *Assumed {rate}% p.a. returns. Actual returns may vary. Not financial advice.
        </p>
      </div>
    </div>
  );
}

export default function WealthySection() {
  return (
    <div className="flex flex-col">
      {/* Wealthy Partnership Banner */}
      <section className="py-6 bg-zinc-950 border-b border-gold/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            <span className="text-white/40 text-xs uppercase tracking-widest font-bold">
              Investments managed via
            </span>
            <div className="flex items-center gap-3 bg-white/5 border border-gold/20 rounded-2xl px-6 py-3">
              <span className="text-gold font-black text-lg tracking-tight">wealthy</span>
              <span className="text-white/20 text-xs">|</span>
              <span className="text-white/60 text-xs font-medium">SEBI Registered Platform</span>
            </div>
            <div className="flex flex-wrap gap-6">
              {wealthyStats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-gold font-black text-sm">{s.value}</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Products */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] font-black text-gold uppercase tracking-[0.5em] mb-4">
              Powered by Wealthy
            </p>
            <h2 className="heading-serif text-4xl font-bold text-maroon sm:text-5xl mb-4">
              Investment Products Available to You
            </h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              We handpick the right investment options to help you grow your wealth across every asset class.
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
                className="relative bg-zinc-50 border border-gold/10 rounded-[2rem] p-8 group overflow-hidden cursor-default"
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
      <section className="py-24 bg-maroon overflow-hidden relative">
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
            <h2 className="heading-serif text-4xl font-bold text-white sm:text-5xl mb-4">
              Goal-Based Investing
            </h2>
            <p className="text-gold/70 text-lg max-w-xl mx-auto">
              Inflation will eat your savings if you don't invest wisely. We help you map your life goals to the right instruments.
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
                className="flex flex-col items-center gap-3 p-6 rounded-[1.5rem] border border-white/10 bg-white/5 cursor-default group"
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

      {/* SIP Calculator + Wealthy App Features */}
      <section className="py-24 bg-zinc-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Calculator */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SIPCalculator />
            </motion.div>

            {/* Wealthy App Features */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <p className="text-[10px] font-black text-gold uppercase tracking-[0.5em] mb-3">
                  Powered by Wealthy
                </p>
                <h2 className="heading-serif text-3xl font-bold text-maroon sm:text-4xl mb-4">
                  One App for All Your Investments
                </h2>
                <p className="text-zinc-500 leading-relaxed">
                  Your investments are managed via the{" "}
                  <span className="font-bold text-maroon">Wealthy App</span> — a SEBI-registered,
                  secure, and trusted investment platform used by over 1,00,000+ investors.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: "📱",
                    title: "Real-time Portfolio Tracking",
                    desc: "Monitor all your investments live, anytime.",
                  },
                  {
                    icon: "👨‍👩‍👧‍👦",
                    title: "Add & Manage Family Portfolios",
                    desc: "One app to manage your entire family's wealth.",
                  },
                  {
                    icon: "🔗",
                    title: "Track External Portfolios",
                    desc: "Import and track investments held elsewhere.",
                  },
                  {
                    icon: "🔒",
                    title: "SEBI Registered & Secure",
                    desc: "Bank-grade security with full regulatory compliance.",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-5 rounded-2xl bg-white border border-gold/10 shadow-sm hover:shadow-md hover:border-gold/30 transition-all group"
                  >
                    <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-maroon text-sm mb-1">{feature.title}</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Wealthy Platform Stats */}
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Wealthy Platform Stats</p>
                <div className="grid grid-cols-2 gap-4">
                  {wealthyStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-maroon rounded-2xl p-5 text-center"
                    >
                      <p className="heading-serif text-xl font-bold text-gold mb-1">{stat.value}</p>
                      <p className="text-white/50 text-[10px] uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <a
                href="https://wealthy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-zinc-900 text-white px-6 py-4 rounded-2xl font-bold text-sm hover:bg-maroon transition-colors group"
              >
                <span className="text-gold font-black text-base">wealthy</span>
                <span className="text-white/40">|</span>
                <span>View SEBI Registration</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
