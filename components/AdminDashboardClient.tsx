"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { signOut } from "next-auth/react";
import { uploadStatusAction, deleteStatusAction } from "@/app/actions/status";
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

export default function AdminDashboardClient() {
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [expiryDays, setExpiryDays] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatuses();
  }, []);

  async function fetchStatuses() {
    // We can still use the public client for reading
    const { data } = await supabase
      .from('statuses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setStatuses(data);
    }
  }

  const addStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!file) {
      setFormError("Please select an image, video, or PDF file");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("expiry_days", expiryDays.toString());

      const result = await uploadStatusAction(formData);

      if (result.success) {
        alert("Status posted successfully!");
        setFile(null);
        fetchStatuses();
      } else {
        setFormError(result.error || "Upload failed");
      }
    } catch (error: unknown) {
      setFormError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteStatus = async (id: string) => {
    if (!confirm("Are you sure you want to delete this status?")) return;
    
    const result = await deleteStatusAction(id);
    if (result.success) {
      fetchStatuses();
    } else {
      alert(result.error || "Delete failed");
    }
  };

  return (
    <div className="py-20 bg-zinc-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-16 border-b border-zinc-200 pb-10"
        >
          <div>
            <h1 className="heading-serif text-5xl font-bold text-maroon">Admin Panel</h1>
            <p className="text-zinc-400 mt-2 font-medium tracking-tight">Real-time status management & orchestration</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signOut({ callbackUrl: "/" })} 
            className="px-6 py-3 bg-white border-2 border-red-100 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-50 transition-all shadow-sm"
          >
            Sign Out
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gold/5 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <svg className="w-24 h-24 text-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
          </div>
          
          <h2 className="text-2xl font-bold text-maroon mb-10 tracking-tight">Post New Insight</h2>
          
          <AnimatePresence mode="wait">
            {formError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-5 bg-red-50 border-2 border-red-100 text-red-700 rounded-2xl text-sm font-bold flex items-center gap-3"
              >
                <span className="h-2 w-2 rounded-full bg-red-600"></span>
                {formError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={addStatus} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Visual Content</label>
                <div className="relative group">
                  <motion.div 
                    whileHover={{ borderColor: "rgba(184, 134, 11, 0.4)" }}
                    className="relative border-3 border-dashed border-zinc-100 rounded-4xl px-8 py-12 text-center bg-zinc-50/50 transition-all cursor-pointer overflow-hidden"
                  >
                    <input
                      type="file"
                      accept="image/*,video/*,application/pdf"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <div className="space-y-4">
                       <div className="mx-auto h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-maroon/20 group-hover:text-gold transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                       </div>
                       <p className="text-zinc-500 font-bold text-sm">{file ? file.name : "Click to select or drag & drop"}</p>
                       <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-black">Images, Videos, PDF (Max 50MB)</p>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Lifecycle Duration (Days)</label>
                <motion.input
                  whileFocus={{ borderColor: "rgba(184, 134, 11, 0.4)" }}
                  type="number"
                  min="1"
                  max="30"
                  className="w-full border-2 border-zinc-100 rounded-3xl px-8 py-6 focus:outline-none transition-all font-bold text-2xl text-maroon shadow-sm"
                  value={expiryDays || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setExpiryDays(val === "" ? 0 : parseInt(val));
                  }}
                />
                <p className="text-xs text-zinc-400 italic flex items-center gap-2">
                   <span className="h-1 w-1 rounded-full bg-gold"></span>
                   Auto-expires after {expiryDays} day{expiryDays !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={uploading}
              className="w-full bg-maroon text-white font-black py-6 rounded-4xl shadow-[0_20px_40px_-10px_rgba(128,0,0,0.3)] hover:bg-maroon/90 transition-all disabled:opacity-50 text-xl tracking-tight"
            >
              {uploading ? "Broadcasting..." : "Deploy New Status"}
            </motion.button>
          </form>
        </motion.div>

        {/* Status List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {statuses.map((status, i) => (
              <motion.div 
                key={status.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-zinc-100 group relative"
              >
                <div className="aspect-9/16 relative bg-zinc-100">
                  {getMediaKind(status.image_url) === "image" && (
                    <img src={status.image_url} alt="Status" className="w-full h-full object-cover" />
                  )}
                  {getMediaKind(status.image_url) === "video" && (
                    <video
                      src={status.image_url}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                  )}
                  {getMediaKind(status.image_url) === "pdf" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-900 text-white">
                      <div className="rounded-2xl bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest">
                        PDF Document
                      </div>
                      <a
                        href={status.image_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] uppercase tracking-widest text-gold underline"
                      >
                        Open PDF
                      </a>
                    </div>
                  )}
                  {getMediaKind(status.image_url) === "unknown" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-200 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                      Unsupported Preview
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-maroon/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                     <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteStatus(status.id)}
                      className="w-full bg-white text-maroon py-4 rounded-2xl font-black shadow-2xl hover:bg-red-50 transition-all text-sm uppercase tracking-widest"
                    >
                      Purge Status
                    </motion.button>
                  </div>
                </div>
                <div className="p-6 flex justify-between items-center bg-white border-t border-zinc-50">
                  <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">
                    {status.expiry_days}d Lifecycle
                  </span>
                  <span className="text-[10px] font-bold text-zinc-300 uppercase">
                    {new Date(status.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
