"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

type StatusItem = {
  id: string;
  image_url: string;
  expiry_days: number;
  created_at: string;
};

type MediaKind = "image" | "video" | "pdf" | "unknown";

function getMediaKind(url: string): MediaKind {
  const cleanUrl = url.split("?")[0].toLowerCase();
  if (cleanUrl.endsWith(".pdf")) return "pdf";
  if (cleanUrl.match(/\.(mp4|mov|webm)$/)) return "video";
  if (cleanUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return "image";
  return "unknown";
}

export default function StatusRing() {
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function fetchStatuses() {
    const { data } = await supabase
      .from('statuses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      const now = Date.now();
      const activeStatuses = data.filter(status => {
        const createdAt = new Date(status.created_at).getTime();
        const expiryMs = (status.expiry_days || 1) * 24 * 60 * 60 * 1000;
        return createdAt + expiryMs > now;
      });
      setStatuses(activeStatuses);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStatuses();
  }, []);

  const openStatus = () => {
    setIsOpen(true);
    setCurrentIndex(0);
  };

  const nextStatus = () => {
    if (currentIndex < statuses.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsOpen(false);
    }
  };

  const prevStatus = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") nextStatus();
      if (e.key === "ArrowLeft") prevStatus();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  // Auto-advance logic
  useEffect(() => {
    if (isOpen && statuses.length > 0) {
      const timer = setTimeout(nextStatus, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentIndex, statuses]);

  if (statuses.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-56 w-56 rounded-[2.5rem] border-2 border-gold/10 flex items-center justify-center bg-maroon shadow-2xl relative overflow-hidden group"
      >
         <div className="absolute inset-0 bg-linear-to-br from-maroon to-zinc-900 opacity-40"></div>
         <div className="text-white text-4xl font-bold heading-serif italic opacity-10 group-hover:opacity-20 transition-opacity">APNAS</div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.button 
        layoutId="status-card"
        onClick={openStatus}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative h-48 w-48 sm:h-64 sm:w-64 rounded-[2.5rem] sm:rounded-[3rem] p-1 bg-linear-to-tr from-gold/30 via-maroon to-gold/30 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
      >
        <div className="h-full w-full rounded-[2.3rem] sm:rounded-[2.8rem] border-4 border-maroon bg-zinc-900 overflow-hidden relative">
          {getMediaKind(statuses[0].image_url) === "image" && (
            <motion.img
              src={statuses[0].image_url}
              alt="Latest Insight"
              className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
            />
          )}
          {getMediaKind(statuses[0].image_url) === "video" && (
            <motion.video
              src={statuses[0].image_url}
              className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
              muted
              playsInline
              preload="metadata"
            />
          )}
          {getMediaKind(statuses[0].image_url) === "pdf" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950 text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">PDF Status</span>
              <span className="text-xs text-white/70">Tap to open</span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-maroon via-transparent to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-left">
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse"></span>
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Live Feed</span>
            </motion.div>
            <h3 className="text-white text-sm font-bold leading-tight mb-1">Financial Insights</h3>
            <p className="text-white/60 text-[10px] italic">Updated {new Date(statuses[0].created_at).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="absolute -top-4 -right-4 bg-gold text-maroon h-14 w-14 rounded-3xl flex items-center justify-center border-4 border-maroon font-black shadow-2xl transform rotate-12 group-hover:rotate-0 transition-all duration-500 text-xl">
          {statuses.length}
        </div>
      </motion.button>

      {/* Cinematic Viewer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/98 backdrop-blur-3xl"
          >
            {/* Close Button */}
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-10 sm:right-10 z-50 text-white/40 hover:text-gold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            
            <div className="relative max-w-2xl w-full px-4 sm:px-6 flex flex-col h-full py-12 sm:py-16 justify-center">
              {/* Progress Tracker */}
              <div className="flex gap-2 mb-6">
                {statuses.map((_, i) => (
                  <div key={i} className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gold"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: i === currentIndex ? "100%" : (i < currentIndex ? "100%" : "0%") 
                      }}
                      transition={{ 
                        duration: i === currentIndex ? 5 : 0.4,
                        ease: "linear"
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Main Content Area — fills remaining height */}
              <div className="relative flex-1 min-h-0 rounded-[2rem] overflow-hidden shadow-[0_0_150px_rgba(184,134,11,0.2)] border border-white/5 group">
                <AnimatePresence mode="wait">
                  {getMediaKind(statuses[currentIndex].image_url) === "image" && (
                    <motion.img
                      key={currentIndex}
                      src={statuses[currentIndex].image_url}
                      initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -100, filter: "blur(20px)" }}
                      transition={{ type: "spring", damping: 20, stiffness: 100 }}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  )}
                  {getMediaKind(statuses[currentIndex].image_url) === "video" && (
                    <motion.video
                      key={currentIndex}
                      src={statuses[currentIndex].image_url}
                      initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -100, filter: "blur(20px)" }}
                      transition={{ type: "spring", damping: 20, stiffness: 100 }}
                      className="absolute inset-0 w-full h-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  )}
                  {getMediaKind(statuses[currentIndex].image_url) === "pdf" && (
                    <motion.iframe
                      key={currentIndex}
                      src={`${statuses[currentIndex].image_url}#toolbar=0&navpanes=0`}
                      title="Status PDF"
                      initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -100, filter: "blur(20px)" }}
                      transition={{ type: "spring", damping: 20, stiffness: 100 }}
                      className="absolute inset-0 w-full h-full bg-white"
                    />
                  )}
                </AnimatePresence>
                
                {/* Navigation Hotzones */}
                <div className="absolute inset-0 flex z-10">
                  <div className="w-1/2 h-full cursor-pointer" onClick={prevStatus}></div>
                  <div className="w-1/2 h-full cursor-pointer" onClick={nextStatus}></div>
                </div>

                {/* Arrow Hints */}
                <div className="absolute inset-x-4 sm:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                   </div>
                   <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                   </div>
                </div>
              </div>

              {/* Identity Bar */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex items-center justify-between px-2"
              >
                <div className="flex items-center gap-5">
                   <div className="h-16 w-16 rounded-3xl bg-maroon border border-gold/30 flex items-center justify-center text-xl font-bold text-white shadow-xl">AW</div>
                   <div>
                      <h4 className="text-white text-xl font-bold tracking-tight">APNAS Will</h4>
                      <p className="text-gold font-bold text-[11px] uppercase tracking-[0.4em]">Strategic Insights</p>
                   </div>
                </div>
                <div className="text-white/30 text-sm font-mono tracking-tighter">
                   {currentIndex + 1} / {statuses.length}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
