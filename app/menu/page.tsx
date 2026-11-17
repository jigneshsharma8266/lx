"use client";

import React from "react";
import { Utensils } from "lucide-react";
import Navbar from "@/components/Navbar";
import DiningSection from "@/components/DiningSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      <main className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C5A880]/8 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Compact Above-the-Fold Header */}
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A202C]/60 border border-[#C5A880]/30 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#C5A880] mb-2">
              <Utensils className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>In-House Food Menu • Fresh Homestyle Cooking</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-[#F3EFE6] tracking-tight leading-[1.15]">
              Fresh Home-Cooked Food & <span className="italic font-serif gold-text-gradient">Local Mewari Dishes</span>
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-[#C8C0B5] font-light max-w-xl mx-auto leading-relaxed">
              All meals are freshly cooked in our villa kitchen. Browse our transparent ₹ INR pricing below and order directly with the host on WhatsApp.
            </p>
          </div>

          {/* Dining Menu (Immediately Visible Above the Fold!) */}
          <DiningSection embedded={true} menuFirst={true} />
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
