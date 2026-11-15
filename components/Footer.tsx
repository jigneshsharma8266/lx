"use client";

import React, { useState } from "react";
import Link from "next/link";
import LuxoraLogo from "@/components/LuxoraLogo";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowUp,
  FileText,
  X,
  ExternalLink,
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


export default function Footer() {
  const [showAssetModal, setShowAssetModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050709] text-[#F3EFE6] border-t border-[#C5A880]/15 pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] max-w-[90vw] h-[300px] bg-[#C5A880]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#C5A880]/10">
          {/* Brand Manifesto (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="#" className="inline-block focus:outline-none">
              <LuxoraLogo />
            </Link>

            <p className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#C5A880] font-medium">
              {villaData.meta.brandCollection} • &ldquo;{villaData.meta.motto}&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-[#A69E92] font-light leading-relaxed max-w-sm">
              An exclusive private villa in Udaipur featuring a private adult swimming pool, AC bedrooms, spacious dining hall with in-house kitchen, scenic Aravalli mountain views, and quiet garden living for families, friends, and private getaways.
            </p>

            {/* Social & Contact Direct Links (Fixed Hover Colors - Never Black on Dark) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={villaData.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#12161D] border border-[#C5A880]/30 hover:border-[#E1306C] flex items-center justify-center text-[#C5A880] hover:text-white hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] transition-all duration-300 shadow-sm"
                title="Follow on Instagram @_luxora_villa"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={villaData.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#12161D] border border-[#C5A880]/30 hover:border-[#C5A880] flex items-center justify-center text-[#C5A880] hover:text-[#080B0E] hover:bg-[#C5A880] transition-all duration-300 shadow-sm"
                title="Open in Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${villaData.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#12161D] border border-[#25D366]/40 hover:border-[#25D366] flex items-center justify-center text-[#25D366] hover:text-[#080B0E] hover:bg-[#25D366] transition-all duration-300 shadow-sm"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${villaData.contact.email}`}
                className="w-10 h-10 rounded-full bg-[#12161D] border border-[#C5A880]/30 hover:border-[#C5A880] flex items-center justify-center text-[#C5A880] hover:text-[#080B0E] hover:bg-[#C5A880] transition-all duration-300 shadow-sm"
                title="Email Reservations"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (Exact Match to Header Navbar) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-[#D2CBC1]">
              <li>
                <a href="#intro" className="hover:text-[#C5A880] transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-[#C5A880] transition-colors">
                  Villa Experiences
                </a>
              </li>
              <li>
                <a href="#pool" className="hover:text-[#C5A880] transition-colors">
                  Adult Swimming Pool
                </a>
              </li>
              <li>
                <a href="#dining" className="hover:text-[#C5A880] transition-colors">
                  Dining Hall & Kitchen
                </a>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5">
                  <span>In-House Menu (₹)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#C5A880]/15 text-[#C5A880] font-mono">Live</span>
                </Link>
              </li>
              <li>
                <a href="#3d-view" className="hover:text-[#C5A880] transition-colors">
                  3D Orbit & 360° Views
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C5A880] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#C5A880] transition-colors">
                  Location & Map
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#C5A880] transition-colors font-medium text-[#C5A880]">
                  Reserve Private Stay →
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Villa Features (Direct from Villa Owner) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              Verified Features
            </p>
            <ul className="space-y-2 text-xs text-[#A69E92]">
              <li className="flex items-center gap-1.5 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>Adult Swimming Pool</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>Furnished AC Bedrooms</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>Spacious Dining Hall</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>Scenic Mountain Views</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>Garden Sitting Area</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>Bluetooth Sound System</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>Parking up to 5 Cars</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span>24/7 Power Backup</span>
              </li>
            </ul>
          </div>

          {/* Contact & Location Details (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              Location & Enquiries
            </p>
            <div className="space-y-2.5 text-xs text-[#A69E92]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <a
                  href={villaData.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A880] transition-colors leading-relaxed"
                >
                  {villaData.location.addressLine1}, {villaData.location.addressLine2}
                  <span className="block text-[10px] text-[#C5A880] mt-0.5 font-mono">
                    GPS {villaData.location.coordinates}
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hello%20Luxora%20Villa%20Udaipur,%20I%20would%20like%20to%20enquire%20about%20a%20private%20stay.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-[#25D366] font-medium"
                >
                  Chat on WhatsApp Direct
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href={villaData.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-[#C5A880] font-medium inline-flex items-center gap-1"
                >
                  <span>@{villaData.contact.instagramHandle}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`mailto:${villaData.contact.email}`} className="hover:text-[#F3EFE6]">
                  {villaData.contact.email}
                </a>
              </div>
            </div>

            {/* Google Maps One-Click Action */}
            <div className="pt-2">
              <a
                href={villaData.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#C5A880]/15 border border-[#C5A880]/30 text-[10px] uppercase tracking-wider text-[#C5A880] transition-all"
              >
                <MapPin className="w-3 h-3 text-[#C5A880]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A69E92]">
          <p>© 2026 Luxora Villa. All rights reserved. Private Luxury Vacation Sanctuary.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowAssetModal(true)}
              className="hover:text-[#C5A880] transition-colors"
            >
              Owner Configuration Notice
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#C5A880] hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Asset Replacement Guide Modal for Owner / Developer */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-2xl w-full glass-panel p-6 sm:p-8 rounded-3xl border border-[#C5A880]/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAssetModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Asset Management Architecture</span>
            </div>
            <h3 className="font-serif text-3xl text-[#F8F5EE] mb-4">
              Owner Photo & Content Replacement Guide
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#D2CBC1] font-light leading-relaxed">
              <p>
                All photographs, phone numbers, WhatsApp details, and section text are strictly centralized in a single file:
              </p>
              <code className="block p-3 rounded-xl bg-[#090C0F] border border-[#C5A880]/30 text-[#C5A880] font-mono text-xs">
                data/villaData.ts
              </code>

              <h4 className="font-serif text-lg text-white mt-4">1. Replacing Photographs</h4>
              <p>
                When official high-resolution photographs from the Luxora Villa property are provided or exported from Instagram:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Place your JPG/PNG files in the <code className="text-[#C5A880]">public/images/</code> folder or host them on a CDN.</li>
                <li>Open <code className="text-[#C5A880]">data/villaData.ts</code> and update the <code className="text-[#C5A880]">image</code> and <code className="text-[#C5A880]">gallery</code> arrays.</li>
                <li>The website will instantly re-render with your authentic photos.</li>
              </ul>

              <h4 className="font-serif text-lg text-white mt-4">2. Connecting Official WhatsApp & Phone</h4>
              <p>
                To receive reservation inquiries directly on your actual phone number, update <code className="text-[#C5A880]">villaData.contact.whatsappNumber</code> in international format (e.g. <code className="text-[#C5A880]">15553895896</code>). All WhatsApp buttons across the website are already wired to format custom reservation messages.
              </p>

              <h4 className="font-serif text-lg text-white mt-4">3. Instagram Integration</h4>
              <p>
                The official Instagram link is linked to:{" "}
                <a
                  href={villaData.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A880] underline inline-flex items-center gap-1"
                >
                  <span>{villaData.contact.instagramUrl}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C5A880]/20 flex justify-end">
              <button
                onClick={() => setShowAssetModal(false)}
                className="px-6 py-2.5 rounded-full bg-[#C5A880] text-[#080B0E] font-semibold text-xs tracking-wider uppercase"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
