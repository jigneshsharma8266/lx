"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, ShieldCheck, Waves, Users, Car, Zap, Utensils, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingSection from "@/components/BookingSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { villaData } from "@/data/villaData";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      <main className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
        {/* Ambient Subtle Lighting Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C5A880]/8 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Spacious, Grand Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A202C]/60 border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#C5A880] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
              <span>Direct Host Booking • Instant WhatsApp Confirmation</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-[#F3EFE6] tracking-tight leading-[1.1]">
              Check Availability & <span className="italic font-serif gold-text-gradient">Reserve Stay</span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-[#C8C0B5] font-light leading-relaxed">
              Select your dates and party size to check live availability and private buyout rates directly with the host on WhatsApp.
            </p>
          </div>

          {/* Spacious, Uncongested Booking Form */}
          <div className="w-full">
            <BookingSection embedded={true} showHeading={false} />
          </div>

          {/* Spacious Resort Highlights Bar (Below the form, giving full breathing room) */}
          <div className="mt-12 pt-10 border-t border-[#C5A880]/15">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <Waves className="w-5 h-5 text-[#C5A880] mx-auto" />
                <p className="font-serif text-sm sm:text-base text-white">Private Adult Pool</p>
                <p className="text-[11px] text-[#A69E92]">Exclusive to your group</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <Users className="w-5 h-5 text-[#C5A880] mx-auto" />
                <p className="font-serif text-sm sm:text-base text-white">4 AC Bedrooms</p>
                <p className="text-[11px] text-[#A69E92]">Mountain view balconies</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <Car className="w-5 h-5 text-[#C5A880] mx-auto" />
                <p className="font-serif text-sm sm:text-base text-white">5-Car Parking</p>
                <p className="text-[11px] text-[#A69E92]">Secure on-site space</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <Zap className="w-5 h-5 text-[#C5A880] mx-auto" />
                <p className="font-serif text-sm sm:text-base text-white">24/7 Power Backup</p>
                <p className="text-[11px] text-[#A69E92]">Uninterrupted comfort</p>
              </div>
            </div>

            {/* Direct Host Contact Banner */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl glass-panel border border-[#C5A880]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-serif text-base sm:text-lg text-white">
                  Have questions about dates, large family groups, or custom dining?
                </p>
                <p className="text-xs text-[#A69E92] mt-0.5">
                  Host is available directly at <span className="text-[#C5A880] font-medium">+91 86909 55700</span>.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={`tel:${villaData.contact.phone.replace(/\s+/g, "")}`}
                  className="h-11 px-5 rounded-full border border-[#C5A880]/30 hover:border-[#C5A880] text-[#C5A880] hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Host</span>
                </a>
                <a
                  href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hello%20Luxora%20Villa,%20I%20have%20an%20enquiry%20regarding%20booking%20dates.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>WhatsApp Host</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
