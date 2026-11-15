"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import DiningSection from "@/components/DiningSection";
import Footer from "@/components/Footer";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6]">
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-12">
        <DiningSection />
      </main>
      <Footer />
    </div>
  );
}

