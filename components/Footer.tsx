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
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  X,
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

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

export default function Footer() {
  const [showAssetModal, setShowAssetModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050709] text-[#F3EFE6] border-t border-[#C5A880]/20 pt-16 sm:pt-24 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] max-w-[95vw] h-[350px] bg-[#C5A880]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Pre-Footer Luxury Reservation Strip */}
        <div className="mb-16 sm:mb-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#12161D] via-[#161C24] to-[#12161D] border border-[#C5A880]/25 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-sans uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span>Direct Host Booking</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-tight">
              Ready for an Exclusive Private Getaway in Udaipur?
            </h3>
            <p className="text-sm text-[#A69E92] font-light max-w-2xl">
              Reserve the entire villa for your family, group of friends, or celebration with zero third-party commissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <Link
              href="/book"
              className="px-6 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#D4BC9B] text-[#080B0E] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Availability & Book</span>
            </Link>

            <a
              href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hello%20Luxora%20Villa%2C%20I%20would%20like%20to%20inquire%20about%20booking%20dates.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#1A202C] hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Main 4-Column Footer Grid with Generous Spacing and Clear Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#C5A880]/15">
          {/* Column 1: Brand Manifesto (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block focus:outline-none">
              <LuxoraLogo variant="horizontal" />
            </Link>

            <p className="text-xs font-sans tracking-[0.2em] uppercase text-[#C5A880] font-medium">
              {villaData.meta.brandCollection} • &ldquo;{villaData.meta.motto}&rdquo;
            </p>

            <p className="text-sm text-[#B0A799] font-light leading-relaxed max-w-sm">
              An exclusive private villa in Udaipur featuring a secluded adult swimming pool, fully furnished AC bedrooms, dedicated dining hall serving fresh in-house meals, and tranquil Aravalli mountain views.
            </p>

            {/* Social Pill Links */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={villaData.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#12161D] border border-[#C5A880]/20 hover:border-[#E1306C] text-[#C5A880] hover:text-[#E1306C] text-xs transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span className="font-sans">@{villaData.contact.instagramHandle}</span>
              </a>

              <a
                href={`https://wa.me/${villaData.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#12161D] border border-[#C5A880]/20 hover:border-[#25D366] text-[#C5A880] hover:text-[#25D366] text-xs transition-colors"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span className="font-sans">WhatsApp</span>
              </a>

              <a
                href={villaData.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#12161D] border border-[#C5A880]/20 hover:border-[#C5A880] text-[#C5A880] hover:text-white text-xs transition-colors"
                title="Google Maps"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-sans">Map Pin</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold border-b border-[#C5A880]/20 pb-2">
              Explore Villa
            </h4>
            <ul className="space-y-3 text-sm text-[#D2CBC1]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#C5A880] transition-colors flex items-center justify-between group"
                >
                  <span>Home & Overview</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]/40 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-[#C5A880] transition-colors flex items-center justify-between group"
                >
                  <span>Suites & AC Bedrooms</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]/40 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-[#C5A880] transition-colors flex items-center justify-between group"
                >
                  <span>Photo Gallery (37+ Photos)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]/40 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/experiences"
                  className="hover:text-[#C5A880] transition-colors flex items-center justify-between group"
                >
                  <span>Pool & Villa Experiences</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]/40 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="hover:text-[#C5A880] transition-colors flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <span>Dining & Kitchen Menu</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] font-mono">
                      Live
                    </span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]/40 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/3d"
                  className="hover:text-[#C5A880] transition-colors flex items-center justify-between group"
                >
                  <span>3D Orbit & 360° Tour</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]/40 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#C5A880] transition-colors flex items-center justify-between group"
                >
                  <span>Location & Contact</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]/40 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="hover:text-[#C5A880] transition-colors flex items-center justify-between group font-medium text-[#C5A880]"
                >
                  <span>Reserve Private Stay</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Features (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold border-b border-[#C5A880]/20 pb-2">
              Features
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A69E92]">
              <li className="flex items-center gap-2 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                <span>Private Adult Pool</span>
              </li>
              <li className="flex items-center gap-2 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                <span>Furnished AC Bedrooms</span>
              </li>
              <li className="flex items-center gap-2 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                <span>Spacious Dining Hall</span>
              </li>
              <li className="flex items-center gap-2 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                <span>Scenic Mountain Views</span>
              </li>
              <li className="flex items-center gap-2 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                <span>Garden Lawn Sitting</span>
              </li>
              <li className="flex items-center gap-2 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                <span>Bluetooth Sound System</span>
              </li>
              <li className="flex items-center gap-2 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                <span>Parking up to 5 Cars</span>
              </li>
              <li className="flex items-center gap-2 text-[#D2CBC1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                <span>24/7 Power Backup</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Enquiries (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold border-b border-[#C5A880]/20 pb-2">
              Location & Enquiries
            </h4>

            <div className="space-y-4 text-xs sm:text-sm text-[#A69E92]">
              {/* Address with Map Pin */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#12161D] border border-[#C5A880]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#C5A880]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#F3EFE6] font-medium leading-snug">
                    {villaData.location.addressLine1}
                  </p>
                  <p className="text-xs text-[#A69E92] mt-0.5">
                    {villaData.location.addressLine2}
                  </p>
                  <p className="font-mono text-[11px] text-[#C5A880] mt-1">
                    GPS: {villaData.location.coordinates}
                  </p>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#12161D] border border-[#25D366]/30 flex items-center justify-center shrink-0 text-[#25D366]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-[#8E867A] uppercase tracking-wider">
                    Instant Concierge
                  </span>
                  <a
                    href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hello%20Luxora%20Villa%2C%20I%20would%20like%20to%20inquire%20about%20a%20stay.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline font-medium text-xs sm:text-sm"
                  >
                    WhatsApp: {villaData.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Direct Phone Call */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#12161D] border border-[#C5A880]/30 flex items-center justify-center shrink-0 text-[#C5A880]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-[#8E867A] uppercase tracking-wider">
                    Direct Call
                  </span>
                  <a
                    href={`tel:${villaData.contact.phone}`}
                    className="text-[#D2CBC1] hover:text-[#C5A880] font-medium text-xs sm:text-sm transition-colors"
                  >
                    {villaData.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#12161D] border border-[#C5A880]/30 flex items-center justify-center shrink-0 text-[#C5A880]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-[#8E867A] uppercase tracking-wider">
                    Email Inquiries
                  </span>
                  <a
                    href={`mailto:${villaData.contact.email}`}
                    className="text-[#D2CBC1] hover:text-[#C5A880] text-xs sm:text-sm transition-colors"
                  >
                    {villaData.contact.email}
                  </a>
                </div>
              </div>

              {/* Google Maps Button */}
              <div className="pt-2">
                <a
                  href={villaData.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#12161D] hover:bg-[#1A202C] border border-[#C5A880]/30 hover:border-[#C5A880] text-xs font-semibold uppercase tracking-[0.15em] text-[#C5A880] hover:text-white transition-all shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E867A]">
          <p>© 2026 Luxora Villa, Udaipur. All rights reserved. Private Luxury Vacation Estate.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowAssetModal(true)}
              className="hover:text-[#C5A880] transition-colors"
            >
              Owner Configuration Notice
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#C5A880] hover:text-white transition-colors font-medium"
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
          <div className="max-w-2xl w-full bg-[#0D1117] p-6 sm:p-8 rounded-3xl border border-[#C5A880]/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
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
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F5EE] mb-4">
              Owner Photo & Content Replacement Guide
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#D2CBC1] font-light leading-relaxed">
              <p>
                All photographs, phone numbers, WhatsApp details, and section text are strictly centralized in a single file:
              </p>
              <code className="block p-3 rounded-xl bg-[#050709] border border-[#C5A880]/30 text-[#C5A880] font-mono text-xs">
                data/villaData.ts
              </code>

              <h4 className="font-serif text-lg text-white mt-4">1. Replacing Photographs</h4>
              <p>
                When official high-resolution photographs from the Luxora Villa property are provided:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Place your JPG/PNG files in the <code className="text-[#C5A880]">public/images/villa/</code> folder.</li>
                <li>Open <code className="text-[#C5A880]">data/villaData.ts</code> and update the <code className="text-[#C5A880]">gallery</code> and <code className="text-[#C5A880]">rooms</code> arrays.</li>
                <li>The website will instantly re-render with your authentic photos across all pages.</li>
              </ul>

              <h4 className="font-serif text-lg text-white mt-4">2. Connecting Official WhatsApp & Phone</h4>
              <p>
                Official reservation inquiries are wired directly to <code className="text-[#C5A880]">+91 86909 55700</code> (WhatsApp: <code className="text-[#C5A880]">918690955700</code>).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C5A880]/20 flex justify-end">
              <button
                onClick={() => setShowAssetModal(false)}
                className="px-6 py-2.5 rounded-full bg-[#C5A880] text-[#080B0E] font-semibold text-xs tracking-wider uppercase"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
