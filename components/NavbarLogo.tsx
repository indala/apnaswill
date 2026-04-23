"use client";

import Image from "next/image";
import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-4 group">
      {/* Dynamic Logo Support */}
      <div className="relative size-32 overflow-hidden transition-transform duration-300 group-hover:scale-110">
        <Image
          src="/logo.png"
          alt="APNAS Will"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className="text-3xl font-bold tracking-tight text-gold heading-serif">
        APNAS Will
      </span>
    </Link>
  );
}
