"use client";

import React from "react";
import Image from "next/image";

interface LuxoraLogoProps {
  className?: string;
  variant?: "horizontal" | "stacked" | "full" | "icon-only";
  color?: "white" | "original" | "gold";
  size?: "sm" | "md" | "lg";
}

export default function LuxoraLogo({
  className = "",
  variant = "horizontal",
  color = "white",
  size = "md",
}: LuxoraLogoProps) {
  // 1. Icon Only
  if (variant === "icon-only") {
    const emblemSrc =
      color === "original"
        ? "/images/luxora-emblem-dark.png"
        : color === "gold"
        ? "/images/luxora-emblem-gold.png"
        : "/images/luxora-emblem-white.png";

    const iconHeight =
      size === "sm"
        ? "h-8 sm:h-9"
        : size === "lg"
        ? "h-12 sm:h-14"
        : "h-10 sm:h-12";

    return (
      <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
        <Image
          src={emblemSrc}
          alt="Luxora Villa Emblem"
          width={390}
          height={428}
          className={`${iconHeight} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
          priority
        />
      </div>
    );
  }

  // 2. Stacked / Full vertical brandmark (Emblem on top, text underneath)
  if (variant === "stacked" || variant === "full") {
    const stackedSrc =
      color === "original"
        ? "/images/luxora-logo.png"
        : "/images/luxora-logo-white.png";

    const stackedHeight =
      size === "sm"
        ? "h-12 sm:h-14"
        : size === "lg"
        ? "h-20 sm:h-24"
        : "h-16 sm:h-18";

    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <Image
          src={stackedSrc}
          alt="Luxora Villa Official Brandmark"
          width={943}
          height={822}
          className={`${stackedHeight} w-auto object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.12)] transition-transform duration-300 group-hover:scale-105`}
          priority
        />
      </div>
    );
  }

  // 3. Horizontal Lockup (Default for Navbar & Footer):
  // Authentic Original Artwork:
  // [Castle Icon Emblem] on the left + [Original Script Luxora, — VILLA —, Stay Grand. Stay Luxora.] on the right
  const horizontalSrc =
    color === "original"
      ? "/images/luxora-horizontal-dark.png"
      : "/images/luxora-horizontal-white.png";

  const horizontalHeight =
    size === "sm"
      ? "h-9 sm:h-10"
      : size === "lg"
      ? "h-14 sm:h-16"
      : "h-11 sm:h-12 md:h-13";

  return (
    <div className={`relative inline-flex items-center shrink-0 ${className}`}>
      <Image
        src={horizontalSrc}
        alt="Luxora Villa Official Brandmark"
        width={1136}
        height={380}
        className={`${horizontalHeight} w-auto object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.14)] transition-transform duration-300 group-hover:scale-105 select-none`}
        priority
      />
    </div>
  );
}
