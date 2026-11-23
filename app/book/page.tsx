"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, ShieldCheck, Waves, Users, Car, Zap, Utensils, Sparkles, MapPin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingSection from "@/components/BookingSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { villaData } from "@/data/villaData";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      <main className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 overflow-hidden">
        {/* Ambient Subtle Lighting Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C5A880]/8 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Simplified Luxury Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#F3EFE6] tracking-tight">
              Check Availability & <span className="italic font-serif gold-text-gradient">Reserve Stay</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#A69E92] font-light">
              Select dates to check live availability & private buyout rates directly with the host
            </p>
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-[#25D366]/30 text-[#25D366] font-medium shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" /> Instant Host Confirmation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-white/10 text-[#D2CBC1]">
                <Sparkles className="w-3 h-3 text-[#C5A880]" /> Entire Estate Buyout
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-[#C5A880]/30 text-[#C5A880]">
                <MapPin className="w-3 h-3 text-[#C5A880]" /> Near Nathdwara
              </span>
            </div>
          </div>

          {/* Prominent Address & Route Reassurance Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-[#12161D] border border-[#C5A880]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center shrink-0 text-[#C5A880]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-white">
                  {villaData.location.addressLine1}
                </p>
                <p className="text-[11px] text-[#C8C0B5]">
                  {villaData.location.addressLine2} • ~20 mins to Nathdwara | ~30 mins to Udaipur
                </p>
              </div>
            </div>
            <a
              href={villaData.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C5A880]/15 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#080B0E] border border-[#C5A880]/30 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
            >
              <span>GPS Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
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
