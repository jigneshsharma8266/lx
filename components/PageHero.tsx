"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  breadcrumbs?: BreadcrumbItem[];
  bgImage?: string;
  stats?: { label: string; value: string }[];
}

export default function PageHero({
  badge = "Luxora Villa • Udaipur, Rajasthan",
  title,
  titleHighlight,
  subtitle,
  breadcrumbs,
  bgImage = "/images/villa/hero-villa-exterior-day.webp",
  stats,
}: PageHeroProps) {
  return (
    <div className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 overflow-hidden border-b-0">
      {/* Background Image with Dark Vignette Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          className="object-cover object-center scale-105 filter blur-[2px] opacity-25 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B0E]/90 via-[#080B0E]/80 to-[#080B0E]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#C5A880]/10 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A202C]/60 border border-[#C5A880]/30 backdrop-blur-md mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#C5A880]">
            {badge}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F3EFE6] tracking-tight leading-[1.15] max-w-4xl mb-4">
          {title}{" "}
          {titleHighlight && (
            <span className="italic font-normal font-serif gold-text-gradient">
              {titleHighlight}
            </span>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-[#C8C0B5] font-light max-w-2xl leading-relaxed">
          {subtitle}
        </p>

        {/* Optional Stats / Highlights Bar */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#C5A880]/15 max-w-3xl">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="font-serif text-xl sm:text-2xl text-[#C5A880] font-light">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.15em] uppercase text-[#A69E92]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

