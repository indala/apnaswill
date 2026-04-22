"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("Invalid password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gold/20 max-w-md w-full text-center">
        <div className="mb-8">
          <div className="h-16 w-16 bg-maroon rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="heading-serif text-3xl font-bold text-maroon">Admin Portal</h1>
          <p className="text-gray-500 mt-2">Please enter your secure access key</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-4 text-center text-xl tracking-widest focus:border-gold focus:outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm font-bold animate-pulse">{error}</p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-maroon text-white font-bold py-4 rounded-xl shadow-xl hover:bg-maroon/90 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Unlock Dashboard"}
          </button>
        </form>
        
        <p className="text-xs text-gray-400 mt-10 uppercase tracking-widest">Authorized Access Only</p>
      </div>
    </div>
  );
}
