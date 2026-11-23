"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { villaData } from "@/data/villaData";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Show after initial 1 second delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    // Auto-minimize tooltip after 7 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  if (!isVisible) return null;

  const whatsappUrl = `https://wa.me/${villaData.contact.whatsappNumber}?text=Hello%20Luxora%20Villa%20Udaipur,%20I%20would%20like%20to%20enquire%20about%20dates%20and%20availability%20for%20a%20private%20stay.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-fade-in">
      {/* Informative Concierge Floating Pill (Dismissible) */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#080B0E]/95 backdrop-blur-xl border border-[#C5A880]/30 shadow-2xl text-xs text-[#F3EFE6] animate-slide-left">
          <div className="flex flex-col">
            <span className="font-serif text-[#C5A880] font-medium leading-none mb-0.5">
              Instant Concierge
            </span>
            <span className="text-[10px] text-[#A69E92] font-light">
              Chat directly on WhatsApp
            </span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="p-1 text-[#A69E92] hover:text-white rounded-full hover:bg-white/10 ml-1 transition-colors"
            title="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Luxora Villa on WhatsApp"
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] flex items-center justify-center text-white shadow-xl shadow-black/60 transition-transform duration-200 hover:scale-105"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white relative z-10" />

        {/* Online Status Dot */}
        <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-200 border-2 border-[#080B0E] rounded-full z-20" />
      </a>
    </div>
  );
}

