import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APNAS Will - Professional Financial Consultants",
  description: "Guiding Every Stage of Life. Wealth creation, Insurance, and Retirement planning by Aswini Prasad.",
};

import AuthProvider from "@/components/AuthProvider";
import GoldenCursor from "@/components/GoldenCursor";
import FloatingSparkles from "@/components/FloatingSparkles";
import GeometricNetwork from "@/components/GeometricNetwork";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased h-full lg:cursor-none`}>
        <AuthProvider>
          <GoldenCursor />
          <FloatingSparkles />
          <GeometricNetwork />
          <div className="relative z-10">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
