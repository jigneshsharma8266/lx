"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Villa3DViewer from "@/components/Villa3DViewer";
import Footer from "@/components/Footer";

export default function ThreeDPage() {
  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6]">
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-12">
        <Villa3DViewer />
      </main>
      <Footer />
    </div>
  );
}

