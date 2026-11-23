"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { villaData } from "@/data/villaData";
import {
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Car,
  Navigation,
  CheckCircle2,
} from "lucide-react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "8-12 Guests",
    notes: "",
  });

  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "checkIn") {
      setFormData((prev) => ({
        ...prev,
        checkIn: value,
        checkOut: prev.checkOut && prev.checkOut < value ? value : prev.checkOut,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*Check Availability & Stay Enquiry — Luxora Villa, Udaipur*\n\n• Name: ${formData.name || "Guest"}\n• Phone: ${
      formData.phone || "Not specified"
    }\n• Check-in: ${formData.checkIn || "Flexible"}\n• Check-out: ${
      formData.checkOut || "Flexible"
    }\n• Group Size: ${formData.guests}\n• Notes: ${formData.notes || "None"}\n\nPlease check live availability for these dates and confirm booking rates.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${villaData.contact.whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      <main className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C5A880]/8 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Simplified Luxury Header */}
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#F3EFE6] tracking-tight">
              Location & <span className="italic font-serif gold-text-gradient">Contact the Host</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#A69E92] font-light">
              Godach, Ghoda Ghati Road • Scenic foothills between Udaipur & Nathdwara
            </p>
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-[#25D366]/30 text-[#25D366] font-medium shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" /> Direct Host Booking
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-white/10 text-[#D2CBC1]">
                <MapPin className="w-3 h-3 text-[#C5A880]" /> 20 Min from Nathdwara
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-[#C5A880]/30 text-[#C5A880]">
                <Phone className="w-3 h-3 text-[#C5A880]" /> +91 86909 55700
              </span>
            </div>
          </div>

          {/* 1. Map & Inquiry Form Combined Section (ON TOP!) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-12 sm:mb-16">
            {/* Map & Location Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
                  Scenic Location
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F3EFE6] font-light">
                  Scenic Foothills between Udaipur & Nathdwara
                </h2>
                <p className="text-xs sm:text-sm text-[#A69E92] font-light leading-relaxed">
                  {villaData.location.directionsNote}
                </p>
              </div>

              {/* Embedded Map Card */}
              <div className="relative rounded-3xl overflow-hidden bg-[#12161D] border border-[#C5A880]/20 aspect-[16/10] shadow-2xl">
                <iframe
                  title="Luxora Villa Udaipur Map"
                  src={villaData.location.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "contrast(1.1) invert(0.9) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Overlaid Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto p-4 rounded-2xl bg-[#080B0E]/90 backdrop-blur-md border border-[#C5A880]/30 shadow-xl max-w-sm space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] font-sans text-[#C5A880] uppercase tracking-wider">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Exact Villa Address & GPS</span>
                  </div>
                  <p className="text-white text-xs font-medium leading-snug">
                    {villaData.location.addressLine1}
                  </p>
                  <p className="text-[11px] text-[#A69E92] leading-snug">
                    {villaData.location.addressLine2}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-[#C5A880]">
                      GPS: {villaData.location.coordinates}
                    </span>
                    <a
                      href={villaData.location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#C5A880] hover:underline font-semibold"
                    >
                      <span>Open Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Nearby Attractions Distance Table */}
              <div className="rounded-2xl bg-[#12161D] border border-[#C5A880]/15 p-5 sm:p-6 space-y-4">
                <h3 className="font-serif text-base sm:text-lg text-white font-medium flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#C5A880]" />
                  <span>Key Transit Times & Sightseeing</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {villaData.location.attractions.map((att, aIdx) => (
                    <div key={aIdx} className="p-3.5 rounded-xl bg-[#1A202C]/60 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-serif text-white font-medium">{att.name}</span>
                        <span className="text-[#C5A880] font-mono font-medium">{att.distance}</span>
                      </div>
                      <p className="text-[11px] text-[#A69E92] font-light leading-snug">
                        {att.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Inquiry Booking Card (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#12161D] border border-[#C5A880]/25 p-6 sm:p-8 shadow-2xl space-y-5">
              <div>
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
                  Direct Villa Reservation
                </span>
                <h3 className="font-serif text-2xl text-[#F3EFE6] font-light mt-1">
                  Check Dates & Villa Rates
                </h3>
                <p className="text-xs text-[#A69E92] font-light mt-1">
                  Fill in your travel dates below to directly coordinate your private stay with the host on WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSendToWhatsApp} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-medium mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className="w-full px-4 py-3 rounded-xl bg-[#0F1318] border border-[#C5A880]/20 text-[#F3EFE6] text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-medium mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 rounded-xl bg-[#0F1318] border border-[#C5A880]/20 text-[#F3EFE6] text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-medium mb-1.5">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      min={minDate}
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 rounded-xl bg-[#0F1318] border border-[#C5A880]/20 text-[#F3EFE6] text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-medium mb-1.5">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      min={formData.checkIn || minDate}
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 rounded-xl bg-[#0F1318] border border-[#C5A880]/20 text-[#F3EFE6] text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-medium mb-1.5">
                    Estimated Guest Count
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F1318] border border-[#C5A880]/20 text-[#F3EFE6] text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer [color-scheme:dark]"
                  >
                    <option value="2-4 Guests (Couples/Small Family)">2–4 Guests (Couples/Small Family)</option>
                    <option value="5-8 Guests (Family Group)">5–8 Guests (Family Group)</option>
                    <option value="9-15 Guests (Private Friends Reunion)">9–15 Guests (Private Friends Reunion)</option>
                    <option value="16-25+ Guests (Full Estate Celebration)">16–25+ Guests (Full Estate Buyout)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-medium mb-1.5">
                    Special Requests or Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requests or food preferences (optional)"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0F1318] border border-[#C5A880]/20 text-[#F3EFE6] text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                  />
                </div>

                {/* Equal Matched Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={`tel:${villaData.contact.phone.replace(/\s+/g, "")}`}
                    className="h-14 w-full px-4 rounded-full bg-white/5 hover:bg-white/10 border border-[#C5A880]/30 hover:border-[#C5A880] text-[#F3EFE6] hover:text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-sm text-center"
                  >
                    <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>Call Host</span>
                  </a>

                  <button
                    type="submit"
                    className="h-14 w-full px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-md text-center"
                  >
                    <MessageCircle className="w-4 h-4 fill-black text-black shrink-0" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </form>

              <div className="pt-2 border-t border-[#C5A880]/15 space-y-1.5 text-[11px] text-[#A69E92]">
                <p className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>Direct property confirmation with no third-party commissions.</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>Exclusive private estate access for your group.</span>
                </p>
              </div>
            </div>
          </div>

          {/* 2. 4 Social & Direct Contact Cards (BELOW Map & Form!) */}
          <div className="pt-8 sm:pt-10 border-t border-[#C5A880]/15">
            <div className="text-center mb-6 sm:mb-8">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block mb-1">
                Direct Channels
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                Connect Directly with Luxora Villa
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* WhatsApp Direct */}
              <a
                href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hi%2C%20I%20am%20inquiring%20about%20staying%20at%20Luxora%20Villa%20Udaipur.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#12161D] border border-[#25D366]/30 hover:border-[#25D366] transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <h4 className="font-serif text-base sm:text-lg text-white font-medium group-hover:text-[#25D366] transition-colors">
                  WhatsApp Concierge
                </h4>
                <p className="text-[11px] text-[#A69E92] mt-1 font-light leading-snug">
                  Instant reply for rates, photo requests, and group custom bookings.
                </p>
                <p className="text-xs font-semibold text-[#25D366] mt-3 flex items-center gap-1">
                  <span>Chat Directly</span>
                  <ExternalLink className="w-3 h-3" />
                </p>
              </a>

              {/* Direct Phone */}
              <a
                href={`tel:${villaData.contact.phone.replace(/\s+/g, "")}`}
                className="p-5 rounded-2xl bg-[#12161D] border border-[#C5A880]/30 hover:border-[#C5A880] transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div className="w-11 h-11 rounded-xl bg-[#C5A880]/10 text-[#C5A880] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-[#C5A880]" />
                </div>
                <h4 className="font-serif text-base sm:text-lg text-white font-medium group-hover:text-[#C5A880] transition-colors">
                  Direct Call
                </h4>
                <p className="text-[11px] text-[#A69E92] mt-1 font-light leading-snug">
                  Speak directly with villa management for booking inquiries.
                </p>
                <p className="text-xs font-semibold text-[#C5A880] mt-3">
                  {villaData.contact.phoneDisplay}
                </p>
              </a>

              {/* Official Instagram */}
              <a
                href={villaData.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#12161D] border border-[#E1306C]/30 hover:border-[#E1306C] transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base sm:text-lg text-white font-medium group-hover:text-[#E1306C] transition-colors">
                  Official Instagram
                </h4>
                <p className="text-[11px] text-[#A69E92] mt-1 font-light leading-snug">
                  Explore real guest reels, stories, pool videos, and sunrise vistas.
                </p>
                <p className="text-xs font-semibold text-[#E1306C] mt-3 flex items-center gap-1">
                  <span>@{villaData.contact.instagramHandle}</span>
                  <ExternalLink className="w-3 h-3" />
                </p>
              </a>

              {/* Google Maps Location */}
              <a
                href={villaData.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#12161D] border border-[#C5A880]/30 hover:border-[#C5A880] transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div className="w-11 h-11 rounded-xl bg-[#C5A880]/10 text-[#C5A880] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-[#C5A880]" />
                </div>
                <h4 className="font-serif text-base sm:text-lg text-white font-medium group-hover:text-[#C5A880] transition-colors">
                  Google Maps Navigation
                </h4>
                <p className="text-[11px] text-[#A69E92] mt-1 font-light leading-snug">
                  Godach, Ghoda Ghati Road, Udaipur – Nathdwara Route, Rajsamand – 313011.
                </p>
                <p className="text-xs font-semibold text-[#C5A880] mt-3 flex items-center gap-1">
                  <span>Open GPS Pin</span>
                  <ExternalLink className="w-3 h-3" />
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
