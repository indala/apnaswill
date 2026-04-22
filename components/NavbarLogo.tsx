"use client";

import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      {/* Dynamic Logo Support */}
      <img
        src="/logo.png"
        alt="APNAS Will"
        className="h-12 w-auto object-contain brightness-0 invert"
        onError={(e) => {
          (e.target as any).style.display = "none";
          const sibling = (e.target as any).nextSibling;
          if (sibling) sibling.style.display = "flex";
        }}
      />
      <div
        className="h-10 w-10 rounded-full bg-gold items-center justify-center text-maroon font-bold text-xl"
        style={{ display: "none" }} // Hidden by default, shown via onError if logo fails
      >
        A
      </div>
      <span className="text-2xl font-bold tracking-tight text-white heading-serif">
        APNAS <span className="text-gold">Will</span>
      </span>
    </Link>
  );
}
