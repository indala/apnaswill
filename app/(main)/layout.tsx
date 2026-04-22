"use client";

import { useState } from "react";
import Link from "next/link";
import NavbarLogo from "@/components/NavbarLogo";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-full flex flex-col bg-white font-sans text-foreground">
      <header className="bg-maroon sticky top-0 z-50 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <NavbarLogo />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-white/90 hover:text-gold transition-colors">Home</Link>
              <Link href="/about" className="text-sm font-medium text-white/90 hover:text-gold transition-colors">About</Link>
              <Link href="/services" className="text-sm font-medium text-white/90 hover:text-gold transition-colors">Services</Link>
              <Link href="/contact" className="text-sm font-medium text-white/90 hover:text-gold transition-colors">Contact</Link>
              <Link 
                href="https://wa.me/919059058688" 
                className="rounded-full bg-gold px-4 py-2 text-sm font-bold text-maroon hover:bg-gold-light transition-all shadow-sm"
              >
                WhatsApp Now
              </Link>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-maroon border-t border-white/10 px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-white hover:text-gold transition-colors">Home</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-white hover:text-gold transition-colors">About</Link>
            <Link href="/services" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-white hover:text-gold transition-colors">Services</Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-white hover:text-gold transition-colors">Contact</Link>
            <Link 
              href="https://wa.me/919059058688" 
              className="block rounded-xl bg-gold px-6 py-4 text-center font-bold text-maroon shadow-lg"
            >
              WhatsApp Now
            </Link>
          </div>
        )}
      </header>

      <main className="grow">
        {children}
      </main>

      <footer className="bg-maroon py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-12 mb-12">
            <div className="flex flex-col items-center md:items-start gap-4">
               <span className="text-3xl font-bold text-white heading-serif italic">
                 APNAS <span className="text-gold">Will</span>
               </span>
               <p className="text-white/60 text-sm max-w-xs text-center md:text-left">
                 Professional financial advice to help you secure your family's future and build lasting wealth.
               </p>
            </div>
            <div className="flex gap-12 text-white/80 text-sm font-medium">
               <Link href="/" className="hover:text-gold transition-colors">Home</Link>
               <Link href="/about" className="hover:text-gold transition-colors">About</Link>
               <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
               <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
            <p>&copy; 2026 APNAS Will Financial Consultants. All Rights Reserved.</p>
            <p>Designed for Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
