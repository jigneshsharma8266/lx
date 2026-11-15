"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import VillaExperiences from "@/components/VillaExperiences";
import PoolSection from "@/components/PoolSection";
import DiningSection from "@/components/DiningSection";
import OutdoorSection from "@/components/OutdoorSection";
import Villa3DViewer from "@/components/Villa3DViewer";
import GallerySection from "@/components/GallerySection";
import GuestExperience from "@/components/GuestExperience";
import LocationSection from "@/components/LocationSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
    }
  }, []);

  const handleQuickBook = (bookingData: {
    checkIn: string;
    checkOut: string;
    guests: string;
  }) => {
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBooking = () => {
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080B0E] text-[#F3EFE6] selection:bg-[#C5A880]/30 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenBooking={scrollToBooking} />

      {/* Main Page Flow */}
      <main>
        {/* A. Cinematic Hero */}
        <Hero onQuickBook={handleQuickBook} />

        {/* B. Introduction & Architecture Narrative */}
        <Introduction />

        {/* C. The Villa Experience (7 Experiences) */}
        <VillaExperiences onReserve={scrollToBooking} />

        {/* E. Swimming Pool Spotlight (Day / Twilight Ambient Toggle) */}
        <PoolSection />

        {/* D. Food & Bespoke Dining */}
        <DiningSection />

        {/* F. Outdoor Fun & Activities (Playground, Lawns, Firepit) */}
        <OutdoorSection />

        {/* 6. 3D Architectural Villa Model & 2.5D Depth Experience */}
        <Villa3DViewer />

        {/* G. Curated Interactive Photo Gallery with Lightbox */}
        <GallerySection />

        {/* H. Guest Experience & Impressions */}
        <GuestExperience />

        {/* I. Location & Arrival */}
        <LocationSection />

        {/* J. Booking CTA with Direct WhatsApp Integration */}
        <BookingSection />
      </main>

      {/* K. Footer */}
      <Footer />

      {/* Floating Concierge WhatsApp Widget */}
      <FloatingWhatsApp />
    </div>
  );
}
