"use client";

import React from "react";
import { Sparkles, Heart, Star, Quote, Shield } from "lucide-react";
import { villaData } from "@/data/villaData";

export default function GuestExperience() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#080B0E] text-[#F3EFE6] overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A880] mb-4">
            <Heart className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Memorable Stays</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#F8F5EE] leading-[1.08]">
            Cherished Moments & <br />
            <span className="italic font-serif gold-text-gradient">Guest Impressions.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base text-[#A69E92] font-light leading-relaxed">
            From intimate anniversary retreats to joyous family reunions, discover how guests experience the quiet luxury of Luxora Villa.
          </p>
        </div>

        {/* 3 Editorial Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {villaData.guestImpressions.map((impression) => (
            <div
              key={impression.id}
              className="p-8 rounded-3xl glass-panel glass-panel-hover border border-[#C5A880]/20 flex flex-col justify-between relative group"
            >
              {/* Quote mark icon */}
              <div className="mb-6 flex justify-between items-center">
                <Quote className="w-8 h-8 text-[#C5A880]/40 group-hover:text-[#C5A880] transition-colors" />
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#C5A880]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                  ))}
                </div>
              </div>

              {/* Quote text */}
              <p className="font-serif text-lg sm:text-xl text-[#F3EFE6] italic leading-relaxed mb-6">
                &ldquo;{impression.quote}&rdquo;
              </p>

              {/* Guest Meta info */}
              <div className="border-t border-[#C5A880]/15 pt-4 flex flex-col gap-1">
                <span className="font-medium text-sm text-[#F8F5EE]">
                  {impression.guestName}
                </span>
                <span className="text-[11px] tracking-wider uppercase text-[#C5A880]/80">
                  {impression.stayType}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Guest Hospitality Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#A69E92]">
            <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Direct guest feedback from families and private groups hosted at Luxora Villa.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

