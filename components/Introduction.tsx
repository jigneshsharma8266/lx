"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Check, Shield, Compass, ArrowRight } from "lucide-react";
import { villaData } from "@/data/villaData";

export default function Introduction() {
  return (
    <section id="intro" className="relative py-24 sm:py-32 bg-[#080B0E] text-[#F3EFE6] overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#39483D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A880] mb-4">
            <span className="font-serif italic text-sm">I.</span> The Philosophy
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F5EE] max-w-4xl leading-[1.08]">
            More Than a Stay. <br />
            <span className="italic font-serif gold-text-gradient">An Entire Experience.</span>
          </h2>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-20">
          {/* Left Column: Brand Narrative & Key Values (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pr-6">
            <p className="text-lg sm:text-xl text-[#F3EFE6] font-light leading-relaxed">
              {villaData.meta.introBody1}
            </p>
            <p className="text-sm sm:text-base text-[#B0A799] font-light leading-relaxed">
              {villaData.meta.introBody2}
            </p>

            {/* Feature Checklist */}
            <div className="pt-4 space-y-3.5 border-t border-[#C5A880]/15">
              {[
                "Private Swimming Pool (Adults) with Open Sun Deck",
                "Fully Furnished Bedrooms with Air Conditioning (AC)",
                "Spacious Dining Hall & Authentic Kitchen Menu (Sev Tamatar, Paneer, Rotis)",
                "Beautiful Garden & Outdoor Sitting Area with Mountain Views",
                "Bluetooth Speaker for Music & Private Gatherings",
                "Private On-Site Parking for up to 5 Cars & 24/7 Power Backup",
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#C5A880]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#D2CBC1] font-light">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#experiences"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A880] hover:text-[#E0CDB5] transition-colors group"
              >
                <span>Explore All 7 Villa Experiences</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Architecture Photo Collage (7 Cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#C5A880]/20 shadow-2xl">
              <Image
                src="/images/villa/villa-lawn-architecture.jpg"
                alt="Luxora Villa Udaipur Architecture & Lawn"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Inset Photo Overlay Badge */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-md p-4 rounded-xl glass-panel border border-[#C5A880]/30 shadow-xl">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-medium mb-1">
                  Architectural Harmony
                </p>
                <p className="text-xs text-[#E5D5C0] font-light">
                  Seamless indoor-outdoor transitions blending natural stone, rich timbers, and panoramic garden light.
                </p>
              </div>
            </div>

            {/* Overlapping Secondary Detail Card */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 w-60 p-4 rounded-xl glass-panel border border-[#C5A880]/30 shadow-2xl bg-[#0F1318]/90">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium">
                  Secluded Living
                </span>
              </div>
              <p className="text-2xl font-serif text-[#F8F5EE] leading-tight">
                Zero Shared Spaces
              </p>
              <p className="text-[11px] text-[#A69E92] mt-1">
                The entire property, grounds, pool, and staff are dedicated solely to you.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Estate Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-[#C5A880]/15">
          {villaData.specs.slice(0, 4).map((spec, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl glass-panel glass-panel-hover border border-[#C5A880]/15 flex flex-col justify-between"
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C5A880]/80 mb-2">
                {spec.label}
              </span>
              <span className="font-serif text-lg sm:text-xl md:text-2xl text-[#F8F5EE] font-normal leading-snug">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

