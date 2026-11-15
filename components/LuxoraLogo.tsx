"use client";

import React from "react";
import Image from "next/image";

interface LuxoraLogoProps {
  className?: string;
  variant?: "horizontal" | "stacked" | "full" | "icon-only";
  color?: "white" | "original";
  size?: "sm" | "md" | "lg";
}

export default function LuxoraLogo({
  className = "",
  variant = "horizontal",
  color = "white",
  size = "md",
}: LuxoraLogoProps) {
  // Use the transparent logo created from the user's official 1000118101.png
  // white variant: pure crisp white with 100% transparent background for dark themes
  // original variant: untouched black with 100% transparent background
  const logoSrc =
    color === "original"
      ? "/images/luxora-logo.png"
      : "/images/luxora-logo-white.png";

  // Full unified official logo (Emblem + Script Luxora + Villa + Motto)
  if (variant === "full" || variant === "stacked") {
    const heightClass =
      size === "sm"
        ? "h-12"
        : size === "lg"
        ? "h-20 sm:h-24"
        : "h-14 sm:h-16";

    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <Image
          src={logoSrc}
          alt="Luxora Villa Official Transparent Logo"
          width={470}
          height={410}
          className={`${heightClass} w-auto object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.12)] transition-transform duration-300 group-hover:scale-105`}
          priority
        />
      </div>
    );
  }

  if (variant === "icon-only") {
    return (
      <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
        <Image
          src={logoSrc}
          alt="Luxora Villa Emblem"
          width={90}
          height={80}
          className="h-10 sm:h-11 w-auto object-contain"
          priority
        />
      </div>
    );
  }

  // Default: Horizontal brand layout with official transparent logo
  const logoHeight =
    size === "sm"
      ? "h-9 sm:h-10"
      : size === "lg"
      ? "h-14 sm:h-16"
      : "h-11 sm:h-12";

  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 shrink-0 ${className}`}>
      {/* Official transparent logo from user upload 1000118101.png */}
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src={logoSrc}
          alt="Luxora Villa Official Transparent Logo"
          width={240}
          height={210}
          className={`${logoHeight} w-auto object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] transition-transform duration-300 group-hover:scale-105`}
          priority
        />
      </div>

      {/* Typography accompaniment for immediate readability */}
      <div className="flex flex-col shrink-0 text-left">
        <span className="font-serif text-lg sm:text-2xl font-medium tracking-[0.18em] sm:tracking-[0.2em] text-[#F3EFE6] uppercase whitespace-nowrap leading-tight group-hover:text-[#C5A880] transition-colors">
          Luxora
        </span>
        <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.28em] sm:tracking-[0.32em] text-[#C5A880] uppercase font-sans whitespace-nowrap -mt-0.5">
          Villa, Udaipur
        </span>
      </div>
    </div>
  );
}
