"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Camera,
  Layers,
} from "lucide-react";
import { villaData, VillaImage } from "@/data/villaData";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSelectedImageIndex(null);
    if (galleryRef.current) {
      const navOffset = 88;
      const elementPosition = galleryRef.current.getBoundingClientRect().top;
      const targetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });
    }
  };

  const categories = [
    { label: "All Works", id: "all" },
    { label: "Villa", id: "villa" },
    { label: "Rooms", id: "rooms" },
    { label: "Pool", id: "pool" },
    { label: "Dining", id: "dining" },
    { label: "Food", id: "food" },
    { label: "Outdoor", id: "outdoor" },
    { label: "Experiences", id: "experiences" },
  ];

  const filteredImages =
    activeCategory === "all"
      ? villaData.gallery
      : villaData.gallery.filter((img) => img.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
    setIsZoomed(false);
  };

  const handleNext = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : 0
    );
    setIsZoomed(false);
  }, [selectedImageIndex, filteredImages.length]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0
    );
    setIsZoomed(false);
  }, [selectedImageIndex, filteredImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, handleNext, handlePrev]);

  const currentImage =
    selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#0B0F14] text-[#F3EFE6] overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A880] mb-4">
              <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Visual Portfolio</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#F8F5EE]">
              The Villa <span className="italic font-serif gold-text-gradient">Gallery.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#A69E92] font-light leading-relaxed">
            Curated views of architecture, private suites, crystal waters, and culinary moments at Luxora Villa.
          </p>
        </div>

        {/* Category Filter Pills (Auto-scrolls to top of gallery when filtered) */}
        <div ref={galleryRef} className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 sm:mb-12 no-scrollbar scroll-mt-28">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#C5A880] text-[#080B0E] font-semibold shadow-md shadow-[#C5A880]/20"
                  : "bg-white/5 text-[#A69E92] hover:text-[#F3EFE6] hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Masonry-style Responsive Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((image, idx) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleOpenLightbox(idx)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-[#C5A880]/15 cursor-pointer shadow-lg hover:border-[#C5A880]/40 transition-all duration-500"
              >
                {/* Image */}
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Hover Reveal Card Inset */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30 font-medium">
                      {image.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1">
                      {image.title}
                    </h3>
                    <p className="text-xs text-[#D2CBC1] font-light line-clamp-2">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full-Screen Interactive Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Bar Controls */}
            <div className="flex items-center justify-between z-50">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg text-[#C5A880]">
                  {String(selectedImageIndex + 1).padStart(2, "0")} /{" "}
                  {String(filteredImages.length).padStart(2, "0")}
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/10 text-[#E5D5C0] border border-[#C5A880]/20 hidden sm:inline-block">
                  {currentImage.category}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Zoom toggle button */}
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3EFE6] transition-colors"
                  title="Toggle Zoom"
                >
                  {isZoomed ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={handleCloseLightbox}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3EFE6] transition-colors"
                  title="Close Lightbox (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Main Stage */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              {/* Previous Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 z-50 p-3 rounded-full bg-black/60 hover:bg-[#C5A880] text-white hover:text-black border border-white/20 transition-all"
                title="Previous (Arrow Left)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 z-50 p-3 rounded-full bg-black/60 hover:bg-[#C5A880] text-white hover:text-black border border-white/20 transition-all"
                title="Next (Arrow Right)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Container */}
              <div
                className={`relative w-full h-full max-w-5xl transition-transform duration-300 ${
                  isZoomed ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <Image
                  src={currentImage.url}
                  alt={currentImage.title}
                  fill
                  sizes="100vw"
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>

            {/* Bottom Caption Bar */}
            <div className="text-center max-w-xl mx-auto z-50">
              <h4 className="font-serif text-2xl text-[#F8F5EE] mb-1">
                {currentImage.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#B0A799] font-light">
                {currentImage.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

