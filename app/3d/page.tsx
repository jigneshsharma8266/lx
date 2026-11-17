"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Villa3DViewer from "@/components/Villa3DViewer";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function ThreeDPage() {
  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />
      <main>
        <PageHero
          badge="Interactive 3D & 360° Orbit"
          title="Explore Luxora Villa from"
          titleHighlight="Every Angle"
          subtitle="Rotate through 360-degree all-side orbital photography, step onto the pool deck, and inspect the architecture with real daylight and sunset simulation."
          bgImage="/images/villa/hero-villa-exterior-day.webp"
          stats={[
            { label: "Angles", value: "360° Orbit" },
            { label: "Rendering", value: "Three.js WebGL" },
            { label: "Lighting", value: "Day / Sunset / Night" },
            { label: "Tour", value: "Self-Guided" },
          ]}
        />
        <div className="py-8">
          <Villa3DViewer />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
