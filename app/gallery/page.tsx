"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { villaData, VillaImage } from "@/data/villaData";
import {
  Sparkles,
  Camera,
  Maximize2,
  Calendar,
  MessageCircle,
  Grid3X3,
  LayoutGrid,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type GalleryCategory = "all" | "rooms" | "pool" | "dining" | "heritage" | "villa" | "outdoor";

interface CategoryTab {
  id: GalleryCategory;
  label: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: "all", label: "All Works" },
  { id: "rooms", label: "Suites & Rooms" },
  { id: "pool", label: "Private Pool" },
  { id: "dining", label: "Dining Hall & Feasts" },
  { id: "heritage", label: "Heritage Rooftop" },
  { id: "outdoor", label: "Gardens & Mountains" },
  { id: "villa", label: "Architecture & Night" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [activeLayout, setActiveLayout] = useState<"grid" | "masonry">("grid");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") {
      return villaData.gallery;
    }
    return villaData.gallery.filter((img) => {
      if (activeCategory === "dining") {
        return img.category === "dining" || img.category === "food";
      }
      if (activeCategory === "outdoor") {
        return img.category === "outdoor" || img.category === "experiences";
      }
      if (activeCategory === "heritage") {
        return (
          img.category === "heritage" ||
          img.title.toLowerCase().includes("chhatri") ||
          img.title.toLowerCase().includes("jharokha") ||
          img.title.toLowerCase().includes("rooftop")
        );
      }
      return img.category === activeCategory;
    });
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: villaData.gallery.length };
    CATEGORY_TABS.forEach((cat) => {
      if (cat.id === "all") return;
      counts[cat.id] = villaData.gallery.filter((img) => {
        if (cat.id === "dining") return img.category === "dining" || img.category === "food";
        if (cat.id === "outdoor") return img.category === "outdoor" || img.category === "experiences";
        if (cat.id === "heritage") {
          return (
            img.category === "heritage" ||
            img.title.toLowerCase().includes("chhatri") ||
            img.title.toLowerCase().includes("jharokha") ||
            img.title.toLowerCase().includes("rooftop")
          );
        }
        return img.category === cat.id;
      }).length;
    });
    return counts;
  }, []);

  const chipsContainerRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (
    catId: GalleryCategory,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    setActiveCategory(catId);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      <main className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C5A880]/8 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-4 sm:mb-5">
          {/* Compact Above-the-Fold Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A202C]/60 border border-[#C5A880]/30 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#C5A880] mb-2">
              <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Real Property Photography • {villaData.gallery.length}+ High-Resolution Photos</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-[#F3EFE6] tracking-tight leading-[1.15]">
              Explore Luxora Villa in <span className="italic font-serif gold-text-gradient">Photos</span>
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-[#C8C0B5] font-light max-w-xl mx-auto leading-relaxed">
              Real photos of our private adult swimming pool, air-conditioned suites, dining hall, garden lawns, and rooftop terrace in Udaipur.
            </p>
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <section className="sticky top-16 z-30 bg-[#080B0E]/90 backdrop-blur-xl border-b border-[#C5A880]/15 py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Category Filter Pills (Auto-centers smoothly on click, hides native scrollbar) */}
            <div
              ref={chipsContainerRef}
              className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -ms-overflow-style:none"
            >
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#A69E92] uppercase tracking-wider mr-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
                Filter:
              </span>
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab.id;
                const count = categoryCounts[tab.id] || 0;

                return (
                  <button
                    key={tab.id}
                    onClick={(e) => handleCategorySelect(tab.id, e)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-[#C5A880] text-[#080B0E] font-medium shadow-md shadow-[#C5A880]/20"
                        : "bg-[#12161D] text-[#D2CBC1] hover:text-white hover:bg-[#1A202C] border border-[#C5A880]/15"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-[#080B0E]/20 text-[#080B0E]"
                          : "bg-white/5 text-[#A69E92]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Layout Toggles */}
            <div className="hidden sm:flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => setActiveLayout("grid")}
                className={`p-2 rounded-lg border transition-colors ${
                  activeLayout === "grid"
                    ? "bg-[#C5A880]/15 border-[#C5A880] text-[#C5A880]"
                    : "border-white/10 text-[#A69E92] hover:text-white"
                }`}
                title="3-Column Balanced Grid"
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveLayout("masonry")}
                className={`p-2 rounded-lg border transition-colors ${
                  activeLayout === "masonry"
                    ? "bg-[#C5A880]/15 border-[#C5A880] text-[#C5A880]"
                    : "border-white/10 text-[#A69E92] hover:text-white"
                }`}
                title="Dynamic Showcase Grid"
                aria-label="Showcase view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Gallery Image Grid */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={
              activeLayout === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [column-fill:_balance]"
            }
          >
            {filteredImages.map((image, index) => {
              const isLargeCard =
                activeLayout === "masonry" && (index === 0 || index % 7 === 0);

              return (
                <div
                  key={image.id}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative rounded-2xl overflow-hidden bg-[#12161D] border border-[#C5A880]/15 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#C5A880]/15 transition-all duration-500 hover:-translate-y-1 ${
                    isLargeCard ? "sm:col-span-2 lg:col-span-2 aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  {/* Photo */}
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Category Pill on Card */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-sans font-medium uppercase tracking-[0.18em] bg-black/60 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30">
                      {image.category}
                    </span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                    <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  </div>

                  {/* Caption & Title */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-base sm:text-lg text-white font-medium group-hover:text-[#C5A880] transition-colors leading-snug">
                      {image.title}
                    </h3>
                    <p className="text-xs text-[#C8C0B5] font-light line-clamp-2 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      {image.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-24">
              <p className="text-base text-[#A69E92]">No photographs in this category.</p>
            </div>
          )}
        </section>

        {/* Bottom Booking & Contact Callout Banner */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-[#12161D]/50 to-[#080B0E] border-t border-[#C5A880]/15">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A202C] border border-[#C5A880]/30 text-[#C5A880] text-xs font-sans uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Experience It Live</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#F3EFE6] font-light tracking-tight">
              Ready to Escape to <span className="italic text-[#C5A880]">Luxora Villa</span>?
            </h2>

            <p className="text-sm sm:text-base text-[#A69E92] font-light max-w-xl mx-auto leading-relaxed">
              Book the entire villa exclusively for your family or private gathering. Includes private adult pool, furnished AC bedrooms, spacious dining hall, and 5-car parking.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/book"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A880] to-[#AD8F6F] text-[#080B0E] text-xs font-semibold tracking-[0.16em] uppercase shadow-lg shadow-[#C5A880]/20 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Your Stay</span>
              </Link>

              <a
                href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hi%2C%20I%20saw%20the%20Luxora%20Villa%20photo%20gallery%20and%20would%20like%20to%20inquire%20about%20booking.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#12161D] hover:bg-[#1A202C] border border-[#25D366]/40 text-[#25D366] text-xs font-semibold tracking-[0.16em] uppercase hover:border-[#25D366] transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>

              <Link
                href="/rooms"
                className="px-6 py-3 rounded-full bg-[#12161D] hover:bg-[#1A202C] border border-[#C5A880]/30 text-[#D2CBC1] hover:text-[#C5A880] text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300"
              >
                View Suites & Bedrooms →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

