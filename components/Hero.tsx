"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowDown, Sparkles, MessageCircle, ShieldCheck } from "lucide-react";
import { villaData } from "@/data/villaData";

interface HeroProps {
  onQuickBook?: (bookingData: { checkIn: string; checkOut: string; guests: string }) => void;
}

export default function Hero({ onQuickBook }: HeroProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("4 Guests");

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onQuickBook) {
      onQuickBook({ checkIn, checkOut, guests });
    }
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] sm:max-h-[1050px] w-full flex flex-col justify-between items-center text-center overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-16 px-3 sm:px-4">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/villa/hero-villa-exterior-day.webp"
          alt="Luxora Villa Udaipur Architecture & Private Adult Pool"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multilayered Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-[#080B0E]/60 to-black/75" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-[#080B0E]/90" />
        <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
      </div>

      {/* Floating Status Pill */}
      <div className="relative z-10 inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full glass-panel text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#E5D5C0] border border-[#C5A880]/30 shadow-lg shadow-black/50 mb-3 sm:mb-4 animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] -ml-2 sm:-ml-2.5" />
        <span className="font-medium text-[#C5A880]">Luxora Villa, Udaipur</span>
        <span className="text-[#C5A880]/40">•</span>
        <span className="text-[#D2CBC1] font-serif italic capitalize tracking-normal sm:tracking-wider">Stay Grand. Stay Luxora.</span>
      </div>

      {/* Central Headline Content */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto flex flex-col items-center">
        <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#C5A880] font-sans font-medium mb-2 sm:mb-3">
          {villaData.meta.brandCollection}
        </p>

        <h1 className="font-serif text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-[#F8F5EE] leading-[0.98] sm:leading-[0.95] mb-4 sm:mb-8">
          Escape the <span className="italic font-serif gold-text-gradient">Ordinary.</span>
        </h1>

        <p className="max-w-2xl text-sm sm:text-xl text-[#D2CBC1] font-light leading-relaxed mb-6 sm:mb-10 px-2 sm:px-4">
          {villaData.meta.heroSubtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <a
            href="#booking"
            className="w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#D4BC9B] to-[#AD8F6F] text-[#080B0E] text-[11px] sm:text-xs font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase shadow-xl shadow-[#C5A880]/25 hover:shadow-[#C5A880]/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Reserve Your Stay
          </a>
          <a
            href="#intro"
            className="w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 rounded-full glass-panel hover:bg-white/10 text-[#F3EFE6] text-[11px] sm:text-xs font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase border border-[#C5A880]/30 hover:border-[#C5A880] transition-all duration-300"
          >
            Explore the Villa
          </a>
        </div>
      </div>

      {/* Floating Hero Quick Booking Bar */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-6 sm:mt-12">
        <form
          onSubmit={handleHeroSubmit}
          className="glass-panel p-2.5 sm:p-4 rounded-2xl sm:rounded-full border border-[#C5A880]/25 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 text-left"
        >
          {/* Check-In */}
          <div className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border-b sm:border-b-0 sm:border-r border-[#C5A880]/15">
            <label className="block text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium mb-0.5 sm:mb-1">
              Check-In
            </label>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F3EFE6]">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]/70" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-[#F3EFE6] text-xs sm:text-sm focus:outline-none w-full [color-scheme:dark]"
                placeholder="Select date"
              />
            </div>
          </div>

          {/* Check-Out */}
          <div className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border-b sm:border-b-0 sm:border-r border-[#C5A880]/15">
            <label className="block text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium mb-0.5 sm:mb-1">
              Check-Out
            </label>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F3EFE6]">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]/70" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-[#F3EFE6] text-xs sm:text-sm focus:outline-none w-full [color-scheme:dark]"
                placeholder="Select date"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border-b sm:border-b-0 sm:border-r border-[#C5A880]/15">
            <label className="block text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium mb-0.5 sm:mb-1">
              Party Size
            </label>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F3EFE6]">
              <Users className="w-3.5 h-3.5 text-[#C5A880]/70" />
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-[#F3EFE6] text-xs sm:text-sm focus:outline-none w-full cursor-pointer [color-scheme:dark]"
              >
                <option value="2 Guests" className="bg-[#0F1318] text-[#F3EFE6]">2 Guests (Couple)</option>
                <option value="4 Guests" className="bg-[#0F1318] text-[#F3EFE6]">4 Guests</option>
                <option value="6 Guests" className="bg-[#0F1318] text-[#F3EFE6]">6 Guests</option>
                <option value="8 Guests" className="bg-[#0F1318] text-[#F3EFE6]">8 Guests (Family)</option>
                <option value="10-12 Guests" className="bg-[#0F1318] text-[#F3EFE6]">10–12 Guests (Full Buyout)</option>
              </select>
            </div>
          </div>

          {/* Check Availability CTA */}
          <button
            type="submit"
            className="sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full bg-[#C5A880] hover:bg-[#D4BC9B] text-[#080B0E] font-semibold text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-[0.16em] uppercase transition-all duration-300 shadow-md shadow-[#C5A880]/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Check Availability</span>
          </button>
        </form>

        {/* Feature Highlights Pills under bar */}
        <div className="hidden md:flex items-center justify-center gap-6 mt-4 text-[11px] text-[#A69E92] tracking-wider">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Private Adult Pool</span>
          </div>
          <span className="text-[#C5A880]/40">•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Scenic Mountain Views</span>
          </div>
          <span className="text-[#C5A880]/40">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span>AC Bedrooms & 5-Car Parking</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 pt-4 hidden sm:block">
        <a
          href="#intro"
          className="inline-flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#A69E92] hover:text-[#C5A880] transition-colors group"
        >
          <span>Scroll to Discover</span>
          <div className="w-5 h-8 rounded-full border border-[#C5A880]/40 flex items-start justify-center p-1 group-hover:border-[#C5A880]">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-[#C5A880]"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
