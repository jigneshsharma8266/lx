"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12161D] border border-[#C5A880]/30 text-xs tracking-[0.2em] uppercase text-[#C5A880] mb-3">
            <span>Welcome to Luxora Villa</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F8F5EE] max-w-3xl leading-[1.15]">
            A Peaceful Private Villa <br />
            <span className="italic font-serif gold-text-gradient">in the Udaipur Foothills.</span>
          </h2>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-20">
          {/* Left Column: Brand Narrative & Key Values (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 lg:pr-6">
            <p className="text-base sm:text-lg text-[#F3EFE6] font-light leading-relaxed">
              {villaData.meta.introBody1}
            </p>
            <p className="text-sm text-[#A69E92] font-light leading-relaxed">
              {villaData.meta.introBody2}
            </p>

            {/* Feature Checklist in Simple, Real Words */}
            <div className="pt-3 space-y-3 border-t border-[#C5A880]/15">
              {[
                "Private adult swimming pool with open sun deck & loungers",
                "Fully furnished air-conditioned bedrooms with mountain balconies",
                "Large indoor dining hall with in-house kitchen (Sev Tamatar, Dal, Paneer, fresh Rotis)",
                "Green garden lawn with mountain views & outdoor sitting area",
                "Bluetooth party speaker ready for your music and gatherings",
                "Gated on-site parking for up to 5 cars with 24/7 power backup",
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#C5A880]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#D2CBC1] font-light">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C5A880] text-[#080B0E] text-xs font-semibold tracking-[0.16em] uppercase hover:scale-105 transition-all shadow-md shadow-[#C5A880]/20"
              >
                <span>View Suites & Rooms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#D2CBC1] hover:text-[#C5A880] transition-colors group"
              >
                <span>Photo Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-[#C5A880]" />
              </Link>
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

              {/* Inset Photo Overlay Badge (Top-Right to avoid collision with Bottom-Left Buyout card) */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 max-w-[260px] sm:max-w-xs p-3.5 sm:p-4 rounded-xl bg-[#080B0E]/85 backdrop-blur-md border border-[#C5A880]/30 shadow-xl">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium mb-1">
                  Private Estate Grounds
                </p>
                <p className="text-xs text-[#E5D5C0] font-light">
                  Surrounded by natural Aravalli hills, green garden lawns, and calm mountain air.
                </p>
              </div>
            </div>

            {/* Overlapping Secondary Detail Card */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 w-60 p-4 rounded-xl bg-[#0F1318]/95 backdrop-blur-md border border-[#C5A880]/30 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-[#C5A880]" />
                <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium">
                  Exclusive Buyout
                </span>
              </div>
              <p className="text-2xl font-serif text-[#F8F5EE] leading-tight">
                Zero Shared Spaces
              </p>
              <p className="text-[11px] text-[#A69E92] mt-1">
                The entire property, adult pool, lawn, and staff are reserved solely for your group.
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

