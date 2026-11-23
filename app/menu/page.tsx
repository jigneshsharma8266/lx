"use client";

import React from "react";
import Link from "next/link";
import { Utensils, ChevronRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import DiningSection from "@/components/DiningSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      <main className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C5A880]/8 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Simplified Luxury Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#F3EFE6] tracking-tight">
              In-House Dining & <span className="italic font-serif gold-text-gradient">Food Menu</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#A69E92] font-light">
              Freshly cooked homestyle Mewari & Punjabi cuisine with ₹ INR menu pricing
            </p>
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-[#25D366]/30 text-[#25D366] font-medium shadow-sm">
                <span className="font-bold">₹0</span> Table Charge
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-white/10 text-[#D2CBC1]">
                <Utensils className="w-3 h-3 text-[#C5A880]" /> 100% Homestyle Fresh
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-[#C5A880]/30 text-[#C5A880]">
                <Sparkles className="w-3 h-3 text-[#C5A880]" /> Open to Non-Staying Guests
              </span>
            </div>
          </div>

          {/* Prominent Table Reservation Banner — Zero Seating Fee Reassurance */}
          <div className="mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#12161D] via-[#18212B] to-[#12161D] border border-[#C5A880]/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880]/35 flex items-center justify-center shrink-0 text-[#C5A880]">
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] uppercase font-sans tracking-widest px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] font-semibold">
                    Zero Sitting Charge
                  </span>
                  <span className="text-[10px] text-[#C5A880] font-sans">• Open to Non-Staying Guests</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg lg:text-xl text-white font-medium leading-snug">
                  Want to Visit Luxora Villa for Lunch or Dinner?
                </h3>
                <p className="text-xs text-[#A69E92] font-light max-w-xl mx-auto sm:mx-0">
                  Reserve your table in our stone dining hall or open lawn. You only pay for the food items you eat!
                </p>
              </div>
            </div>

            <Link
              href="/book-dining"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#D4BC9B] text-[#080B0E] font-semibold text-xs tracking-wider uppercase transition-all shadow-md shrink-0 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-center"
            >
              <span>Book Lunch/Dinner Table</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
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
