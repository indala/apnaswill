"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { name: "Abakkus", url: "/brochure_assets/Abakkus01.png", cat: "PMS" },
  { name: "Aditya Birla", url: "/brochure_assets/AdityaBirlaSunLifeMutualFund01.png", cat: "MF" },
  { name: "Alchemy", url: "/brochure_assets/AlchemyCapitalManagement01.png", cat: "PMS" },
  { name: "Alf Accurate", url: "/brochure_assets/AlfAccurateAdvisors.png", cat: "PMS" },
  { name: "Ambit", url: "/brochure_assets/Ambit.png", cat: "Wealth" },
  { name: "Ask Investment", url: "/brochure_assets/AskInvestmentManagers01.png", cat: "PMS" },
  { name: "Asset 360", url: "/brochure_assets/Asset360One01.png", cat: "PMS" },
  { name: "Axis Mutual Fund", url: "/brochure_assets/AxisMutualFund01.png", cat: "MF" },
  { name: "Bajaj Allianz", url: "/brochure_assets/BajajAllianzLife.png", cat: "Insurance" },
  { name: "Bandhan MF", url: "/brochure_assets/BandhanMutualFund.jpeg", cat: "MF" },
  { name: "Baroda BNP", url: "/brochure_assets/BarodaBnpParibasMutualFund.png", cat: "MF" },
  { name: "Buoyant", url: "/brochure_assets/Buoyant01.png", cat: "PMS" },
  { name: "Canara Robeco", url: "/brochure_assets/CanaraRobeco.jpeg", cat: "MF" },
  { name: "Care Health", url: "/brochure_assets/CareHealthInsurance.png", cat: "Insurance" },
  { name: "Carnelian", url: "/brochure_assets/CarnelianAssetManagement01.jpeg", cat: "PMS" },
  { name: "DSP Mutual Fund", url: "/brochure_assets/DspMutualFund01.png", cat: "MF" },
  { name: "Edelweiss", url: "/brochure_assets/EdelweissMutualFund01.png", cat: "MF" },
  { name: "Emkay", url: "/brochure_assets/EmkayInvestmentManagers01.png", cat: "PMS" },
  { name: "Franklin Templeton", url: "/brochure_assets/FranklinTempleton.jpeg", cat: "MF" },
  { name: "HDFC Life", url: "/brochure_assets/HdfcLife.png", cat: "Insurance" },
  { name: "HDFC Mutual Fund", url: "/brochure_assets/HdfcMutualFund01.jpeg", cat: "MF" },
  { name: "Helios", url: "/brochure_assets/Helios01.jpeg", cat: "PMS" },
  { name: "HSBC", url: "/brochure_assets/HsbcAssetManagement.png", cat: "MF" },
  { name: "ICICI Lombard", url: "/brochure_assets/IciciLombard.png", cat: "Insurance" },
  { name: "ICICI Prudential", url: "/brochure_assets/IciciPrudentialLifeInsurance.jpeg", cat: "Insurance" },
  { name: "Invesco", url: "/brochure_assets/InvescoMutualFund01.png", cat: "MF" },
  { name: "ITI Mutual Fund", url: "/brochure_assets/ItiMutualFund.png", cat: "MF" },
  { name: "Kotak MF", url: "/brochure_assets/KotakMutualFund01.jpeg", cat: "MF" },
  { name: "LIC MF", url: "/brochure_assets/LicMutualFund.jpeg", cat: "MF" },
  { name: "Mirae Asset", url: "/brochure_assets/MiraeAsset01.png", cat: "MF" },
  { name: "Niva Bupa", url: "/brochure_assets/NivaBupa.png", cat: "Insurance" },
  { name: "NSE", url: "/brochure_assets/Nse.png", cat: "Equity" },
  { name: "PGIM India", url: "/brochure_assets/PgimIndiaMutualFund01.png", cat: "MF" },
  { name: "PPFAS", url: "/brochure_assets/PpfasMutualFund.jpeg", cat: "MF" },
  { name: "Quantum", url: "/brochure_assets/QuantumMutualFund.jpeg", cat: "MF" },
  { name: "Renaissance", url: "/brochure_assets/Renaissance01.png", cat: "PMS" },
  { name: "SBI Mutual Fund", url: "/brochure_assets/SbiMutualFund01.png", cat: "MF" },
  { name: "Sundaram Mutual", url: "/brochure_assets/SundaramMutual01.png", cat: "MF" },
  { name: "Tata AIA", url: "/brochure_assets/TataAiaLifeInsurance.jpeg", cat: "Insurance" },
  { name: "Unifi", url: "/brochure_assets/UnifiMutualFund.png", cat: "PMS" },
  { name: "UTI Mutual Fund", url: "/brochure_assets/UtiMutualFund.jpeg", cat: "MF" },
  { name: "WhiteOak", url: "/brochure_assets/WhiteoakCapitalMutualFund01.png", cat: "MF" },
  { name: "Zepto", url: "/brochure_assets/Zepto.png", cat: "Pre-IPO" }
];

export default function EcosystemWall() {
  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-serif text-4xl font-bold text-maroon mb-6">Our Institutional Ecosystem</h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            A comprehensive network of India's leading financial powerhouses, working together to secure your future.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 20px 40px -15px rgba(184, 134, 11, 0.15)"
              }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-zinc-50 border border-gold/5 transition-all group cursor-pointer"
            >
              <div className="relative h-12 w-full mb-4">
                <Image 
                  src={partner.url} 
                  alt={partner.name} 
                  fill
                  className="object-contain transition-all duration-500" 
                />
              </div>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center group-hover:text-maroon transition-colors">
                {partner.name}
              </span>
              <div className="mt-2 px-2 py-0.5 rounded-full bg-gold/10 text-[8px] font-bold text-gold uppercase tracking-tighter">
                {partner.cat}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
