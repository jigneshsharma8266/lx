"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Navigation,
  Compass,
  ExternalLink,
  ShieldCheck,
  Car,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { villaData } from "@/data/villaData";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function LocationSection() {
  const [mapStyleDark, setMapStyleDark] = useState(true);

  return (
    <section id="location" className="relative py-24 sm:py-32 bg-[#0B0F14] text-[#F3EFE6] overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A880] mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Official Location & Surroundings</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#F8F5EE]">
              Scenic Foothills. <br />
              <span className="italic font-serif gold-text-gradient">Udaipur, Rajasthan.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-[#A69E92] font-light leading-relaxed">
              Tucked away in the serene Aravalli valley of Udaipur. Enjoy secluded mountain living with direct access to Fateh Sagar Lake, the City Palace, and Sajjangarh.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs text-[#C5A880]">
              <Compass className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] tracking-wider">{villaData.location.coordinates}</span>
            </div>
          </div>
        </div>

        {/* Location Grid: Interactive Map Card (7 Cols) + Nearby Attractions (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16">
          {/* Interactive Live Google Maps Card (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-[#C5A880]/30 glass-panel shadow-2xl flex-1 flex flex-col justify-between bg-[#080B0E]">
              {/* Embedded Live Google Map iframe */}
              <div className="absolute inset-0 z-0">
                <iframe
                  src={villaData.location.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: mapStyleDark
                      ? "invert(92%) hue-rotate(180deg) contrast(1.15) brightness(0.85) grayscale(20%)"
                      : "none",
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Luxora Villa Udaipur Google Maps Location"
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>

              {/* Top Floating Info Badge */}
              <div className="relative z-10 m-4 sm:m-6 flex items-center justify-between gap-2 pointer-events-auto">
                <div className="px-3.5 py-1.5 rounded-full bg-[#080B0E]/85 backdrop-blur-md border border-[#C5A880]/30 text-xs text-[#E5D5C0] flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="font-serif font-medium text-white">Luxora Villa, Udaipur</span>
                </div>

                <button
                  onClick={() => setMapStyleDark(!mapStyleDark)}
                  className="px-3 py-1 rounded-full bg-[#080B0E]/85 backdrop-blur-md border border-white/20 text-[10px] text-[#A69E92] hover:text-white transition-colors"
                >
                  {mapStyleDark ? "Standard View" : "Luxury Dark View"}
                </button>
              </div>

              {/* Bottom Interactive Action Glass Bar */}
              <div className="relative z-10 m-4 sm:m-6 p-4 rounded-2xl bg-[#080B0E]/90 backdrop-blur-xl border border-[#C5A880]/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
                <div>
                  <p className="font-serif text-base sm:text-lg text-[#F8F5EE] leading-tight">
                    {villaData.location.addressLine1}
                  </p>
                  <p className="text-[11px] text-[#A69E92] font-light mt-0.5">
                    {villaData.location.addressLine2} • GPS {villaData.location.coordinates}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={villaData.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#C5A880] text-[#080B0E] font-semibold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-md shadow-[#C5A880]/20 whitespace-nowrap"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hello%20Luxora%20Villa%20Udaipur,%20please%20send%20me%20the%20exact%20arrival%20directions.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-colors"
                    title="Get Route on WhatsApp"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Attractions List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold block mb-1">
                Prime Surroundings
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F5EE] mb-4">
                Close to Udaipur Highlights
              </h3>
            </div>

            <div className="space-y-3">
              {villaData.location.attractions.map((attraction, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl glass-panel glass-panel-hover border border-[#C5A880]/15 flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-[9px] tracking-wider uppercase text-[#C5A880]/80 font-medium block mb-0.5">
                      {attraction.category}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg text-[#F8F5EE] leading-tight mb-1">
                      {attraction.name}
                    </h4>
                    <p className="text-xs text-[#A69E92] font-light leading-relaxed">
                      {attraction.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-[#C5A880]/20 text-[11px] text-[#C5A880] font-medium whitespace-nowrap">
                    <Car className="w-3 h-3" />
                    <span>{attraction.distance}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-[#A69E92] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Dedicated 5-car private parking on-site with secure gated access.</span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* OFFICIAL INSTAGRAM COMMUNITY & SOCIAL PROOF SHOWCASE CARD        */}
        {/* ----------------------------------------------------------------- */}
        <div className="rounded-3xl glass-panel border border-[#C5A880]/30 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#0F1318] via-[#080B0E] to-[#141A22]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#E1306C]/10 via-[#F77737]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            {/* Left Brand Identity */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              {/* Instagram Avatar Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shrink-0 shadow-xl shadow-[#DD2A7B]/20">
                <div className="w-full h-full rounded-full bg-[#080B0E] flex flex-col items-center justify-center p-2 text-center border border-white/20">
                  <span className="font-serif text-[#C5A880] text-xs font-bold tracking-widest uppercase">
                    Luxora
                  </span>
                  <span className="text-[7px] text-[#A69E92] uppercase font-sans tracking-wider -mt-0.5">
                    Villa
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-[#C5A880]/20 text-[10px] tracking-wider uppercase text-[#C5A880]">
                  <Sparkles className="w-3 h-3 text-[#C5A880]" />
                  <span>{villaData.meta.brandCollection}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F5EE]">
                  @{villaData.contact.instagramHandle}
                </h3>
                <p className="text-xs sm:text-sm text-[#C5A880] font-serif italic">
                  &ldquo;{villaData.meta.motto}&rdquo;
                </p>
                <p className="text-xs text-[#A69E92] font-light max-w-lg mt-1">
                  Follow our official Instagram community for real guest stories, poolside reels, birthday celebrations, and breathtaking Aravalli sunset captures.
                </p>
              </div>
            </div>

            {/* Right Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={villaData.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#F56040] text-white text-xs font-semibold tracking-wider uppercase shadow-lg shadow-[#E1306C]/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={villaData.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[#C5A880]/40 text-[#C5A880] hover:bg-[#C5A880]/10 text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Google Maps Pin</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#12161D] border border-[#C5A880]/40 text-[#D2CBC1] hover:text-[#C5A880] text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap"
              >
                <span>Contact & Transit Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

