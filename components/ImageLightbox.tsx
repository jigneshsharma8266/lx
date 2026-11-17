"use client";

import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Share2,
  Check,
} from "lucide-react";

export interface LightboxImage {
  url: string;
  title: string;
  caption?: string;
  category?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    setIsZoomed(false);
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    setIsZoomed(false);
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  const handleShare = async () => {
    if (!currentImage) return;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: currentImage.caption || currentImage.title,
          url: shareUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6"
          onClick={onClose}
        >
          {/* Top Bar Controls */}
          <div
            className="flex items-center justify-between text-[#F3EFE6] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#C5A880] tracking-wider px-2.5 py-1 rounded-full bg-[#1A202C]/80 border border-[#C5A880]/30">
                {currentIndex + 1} / {images.length}
              </span>
              {currentImage.category && (
                <span className="hidden sm:inline-block text-[11px] font-sans uppercase tracking-[0.2em] text-[#A69E92]">
                  {currentImage.category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-[#1A202C]/80 hover:bg-[#C5A880]/20 text-[#D2CBC1] hover:text-[#C5A880] transition-colors"
                title="Share this photo"
                aria-label="Share this photo"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2.5 rounded-full bg-[#1A202C]/80 hover:bg-[#C5A880]/20 text-[#D2CBC1] hover:text-[#C5A880] transition-colors"
                title={isZoomed ? "Actual size" : "Zoom in"}
                aria-label="Toggle Zoom"
              >
                {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-[#1A202C]/80 hover:bg-rose-500/20 text-[#D2CBC1] hover:text-white transition-colors"
                title="Close viewer (Esc)"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Stage & Image */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#C5A880] hover:text-[#080B0E] text-white backdrop-blur-md border border-white/10 hover:border-[#C5A880] transition-all duration-300"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Current Image */}
            <motion.div
              key={currentImage.url}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.35 : 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={currentImage.url}
                alt={currentImage.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain drop-shadow-2xl select-none"
              />
            </motion.div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#C5A880] hover:text-[#080B0E] text-white backdrop-blur-md border border-white/10 hover:border-[#C5A880] transition-all duration-300"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Caption & Information */}
          <div
            className="max-w-2xl mx-auto w-full text-center px-4 py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-lg sm:text-xl text-[#F3EFE6] font-medium tracking-wide">
              {currentImage.title}
            </h3>
            {currentImage.caption && (
              <p className="text-xs sm:text-sm text-[#A69E92] font-light mt-1">
                {currentImage.caption}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

