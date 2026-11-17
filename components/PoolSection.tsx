"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Moon, Sparkles, Droplets, Waves, Check, ShieldCheck } from "lucide-react";

export default function PoolSection() {
  const [ambientMode, setAmbientMode] = useState<"day" | "twilight">("day");

  const poolSpecs = [
    { label: "Pool Classification", value: "Dedicated Adult Pool" },
    { label: "Mountain View", value: "Aravalli Range Backdrop" },
    { label: "Night Ambience", value: "Underwater Ambient Glow" },
    { label: "Music & Vibe", value: "Bluetooth Sound Setup" },
  ];

  return (
    <section id="pool" className="relative py-24 sm:py-32 bg-[#06080A] text-[#F3EFE6] overflow-hidden">
      {/* Dynamic ambient background glow that changes with mode */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[90vw] h-[600px] rounded-full blur-[180px] pointer-events-none transition-all duration-1000 ${
          ambientMode === "day" ? "bg-[#3A7685]/15" : "bg-[#9A6237]/20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A880] mb-4">
              <Waves className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Private Adult Swimming Pool • Udaipur</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F5EE]">
              Take a Dip. <br />
              <span className="italic font-serif gold-text-gradient">Forget the World.</span>
            </h2>
          </div>

          {/* Interactive Day / Twilight Ambience Switcher */}
          <div className="flex flex-col sm:items-end gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880]/80">
              Preview Pool Atmosphere
            </span>
            <div className="inline-flex p-1 rounded-full glass-panel border border-[#C5A880]/30">
              <button
                onClick={() => setAmbientMode("day")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
                  ambientMode === "day"
                    ? "bg-[#C5A880] text-[#080B0E] font-semibold shadow-md shadow-[#C5A880]/20"
                    : "text-[#A69E92] hover:text-[#F3EFE6]"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Sunlit Day</span>
              </button>
              <button
                onClick={() => setAmbientMode("twilight")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
                  ambientMode === "twilight"
                    ? "bg-[#C5A880] text-[#080B0E] font-semibold shadow-md shadow-[#C5A880]/20"
                    : "text-[#A69E92] hover:text-[#F3EFE6]"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Twilight Glow</span>
              </button>
            </div>
          </div>
        </div>

        {/* Large Cinematic Pool Spotlight Card */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#C5A880]/25 shadow-2xl mb-12">
          {/* Day Pool Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              ambientMode === "day" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src="/images/villa/pool-daylight-deck.webp"
              alt="Luxora Villa Adult Swimming Pool & Gazebo Deck in Daylight"
              fill
              sizes="100vw"
              className="object-cover object-center scale-100 hover:scale-105 transition-transform duration-1000"
              priority
            />
          </div>

          {/* Twilight Pool Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              ambientMode === "twilight" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src="/images/villa/pool-night-villa.jpg"
              alt="Luxora Villa Swimming Pool Night Illumination & Floating Rings"
              fill
              sizes="100vw"
              className="object-cover object-center scale-100 hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* Floating Pool Highlights Info Bar */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block mb-2">
                {ambientMode === "day" ? "Morning & Afternoon Serenity" : "Evening Starlight Swim"}
              </span>
              <p className="font-serif text-2xl sm:text-4xl text-[#F8F5EE] leading-tight">
                {ambientMode === "day"
                  ? "Crystalline azure waters kissed by tropical sunshine."
                  : "Ambient underwater illumination beneath the starry canopy."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#booking"
                className="px-6 py-2.5 rounded-full bg-[#C5A880] text-[#080B0E] font-semibold text-xs tracking-[0.16em] uppercase hover:bg-white transition-all shadow-lg"
              >
                Reserve Stay
              </a>
              <Link
                href="/gallery"
                className="px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A880]/30 text-[#D2CBC1] hover:text-[#C5A880] text-xs font-semibold tracking-[0.16em] uppercase transition-all"
              >
                Pool Photos →
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Feature Specification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {poolSpecs.map((spec, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl glass-panel glass-panel-hover border border-[#C5A880]/15"
            >
              <div className="w-8 h-8 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]/80 block mb-1">
                {spec.label}
              </span>
              <p className="font-serif text-lg text-[#F8F5EE] font-normal">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
