"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import EstateShowcase from "@/components/EstateShowcase";
import GuestExperience from "@/components/GuestExperience";
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

  const handleQuickBook = () => {
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

        {/* C. Editorial Estate Showcase (Leading directly to dedicated /rooms, /gallery, /experiences, /menu, /3d, /contact pages) */}
        <EstateShowcase />

        {/* D. Guest Experience & Verified Reviews */}
        <GuestExperience />

        {/* E. Direct Reservation Section */}
        <BookingSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Concierge WhatsApp Widget */}
      <FloatingWhatsApp />
    </div>
  );
}
