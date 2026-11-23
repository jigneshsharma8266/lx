"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageLightbox, { LightboxImage } from "@/components/ImageLightbox";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { villaData, RoomDetail } from "@/data/villaData";
import {
  Sparkles,
  Wind,
  Tv,
  Wifi,
  Droplets,
  Eye,
  Users,
  Bed,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Maximize2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function RoomsPage() {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);

  const handleOpenRoomGallery = (room: RoomDetail, photoIdx: number = 0) => {
    const formatted: LightboxImage[] = room.images.map((img) => ({
      url: img.url,
      title: `${room.name} — ${img.caption}`,
      caption: room.description,
      category: room.type,
    }));
    setLightboxImages(formatted);
    setActivePhotoIndex(photoIdx);
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
              Suites & AC Bedrooms at <span className="italic font-serif gold-text-gradient">Luxora Villa</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#A69E92] font-light">
              4 private AC bedrooms with attached baths & scenic mountain balconies
            </p>
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-[#25D366]/30 text-[#25D366] font-medium shadow-sm">
                <span className="font-bold">10-15</span> Guests Capacity
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-white/10 text-[#D2CBC1]">
                <Sparkles className="w-3 h-3 text-[#C5A880]" /> Entire Estate Buyout
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-[#C5A880]/30 text-[#C5A880]">
                <Bed className="w-3 h-3 text-[#C5A880]" /> 4 Ensuite Bathrooms
              </span>
            </div>
          </div>

          {/* Detailed Room Showcases (Immediately Visible Above the Fold!) */}
          <div className="space-y-12 sm:space-y-16">
          {villaData.rooms.map((room, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={room.id}
                id={room.id}
                className="rounded-3xl bg-[#12161D]/80 border border-[#C5A880]/20 p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Photo Showcase (7 cols) */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? "" : "lg:order-2"}`}>
                    {/* Primary Large Photo */}
                    <div
                      onClick={() => handleOpenRoomGallery(room, 0)}
                      className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/40 border border-[#C5A880]/20 cursor-pointer shadow-lg"
                    >
                      <Image
                        src={room.images[0].url}
                        alt={room.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full text-xs font-sans font-medium uppercase tracking-widest bg-black/70 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30">
                          {room.type}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Maximize2 className="w-4 h-4 text-[#C5A880]" />
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <p className="text-xs text-[#E8D8BF] font-light">
                          {room.images[0].caption}
                        </p>
                      </div>
                    </div>

                    {/* Secondary Thumbnail Row */}
                    <div className="grid grid-cols-3 gap-3">
                      {room.images.slice(1, 4).map((thumb, tIdx) => (
                        <div
                          key={tIdx}
                          onClick={() => handleOpenRoomGallery(room, tIdx + 1)}
                          className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-[#C5A880]/15 cursor-pointer hover:border-[#C5A880]/50 transition-all"
                        >
                          <Image
                            src={thumb.url}
                            alt={thumb.caption}
                            fill
                            sizes="(max-width: 1024px) 33vw, 20vw"
                            className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                          <div className="absolute bottom-1.5 inset-x-1.5 text-center">
                            <span className="text-[10px] text-white/90 font-light truncate block px-1 drop-shadow-md">
                              {thumb.caption}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Room Details & Features (5 cols) */}
                  <div className={`lg:col-span-5 space-y-6 ${isEven ? "" : "lg:order-1"}`}>
                    <div>
                      <p className="text-xs font-sans tracking-[0.2em] uppercase text-[#C5A880] font-medium mb-1">
                        {room.tagline}
                      </p>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EFE6] font-light leading-tight">
                        {room.name}
                      </h3>
                    </div>

                    {/* Room Quick Specs Grid */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#C5A880]/15 text-xs text-[#D2CBC1]">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#C5A880] shrink-0" />
                        <span>{room.occupancy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-[#C5A880] shrink-0" />
                        <span>{room.bed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-[#C5A880] shrink-0" />
                        <span>{room.view}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-[#C5A880] shrink-0" />
                        <span>Split AC Included</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#A69E92] font-light leading-relaxed">
                      {room.description}
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-sans tracking-wider uppercase text-[#C5A880] font-medium">
                        Room Features & Inclusions:
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#E8D8BF]">
                        {room.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#C5A880]/15">
                      <a
                        href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hi%2C%20I%20am%20interested%20in%20reserving%20the%20${encodeURIComponent(
                          room.name
                        )}%20at%20Luxora%20Villa%20Udaipur.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#AD8F6F] text-[#080B0E] text-xs font-semibold tracking-wider uppercase hover:scale-105 transition-all shadow-md shadow-[#C5A880]/20 flex items-center gap-2"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Inquire on WhatsApp</span>
                      </a>

                      <button
                        onClick={() => handleOpenRoomGallery(room, 0)}
                        className="px-4 py-2.5 rounded-full bg-[#1A202C] hover:bg-[#232B3B] border border-[#C5A880]/30 text-xs text-[#D2CBC1] hover:text-[#C5A880] transition-colors"
                      >
                        View Photos ({room.images.length})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Property-Wide Amenities Grid */}
        <section className="py-16 bg-[#0B0F14] border-t border-[#C5A880]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#C5A880]">
                All-Inclusive Luxury
              </span>
              <h2 className="font-serif text-3xl text-[#F3EFE6] font-light">
                Included with Every Stay
              </h2>
              <p className="text-xs sm:text-sm text-[#A69E92] font-light">
                Whether booking individual suites or the entire private villa, every guest enjoys full access to our verified premium amenities.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Droplets className="w-6 h-6 text-[#C5A880]" />,
                  title: "Private Adult Pool",
                  desc: "Dedicated swimming pool with lounge deck and evening water illumination.",
                },
                {
                  icon: <Wind className="w-6 h-6 text-[#C5A880]" />,
                  title: "Air Conditioning",
                  desc: "Individual split ACs with personal remote controls in all bedrooms.",
                },
                {
                  icon: <Tv className="w-6 h-6 text-[#C5A880]" />,
                  title: "Smart Entertainment",
                  desc: "LED Smart TVs with Netflix, YouTube, plus high-power party speaker.",
                },
                {
                  icon: <Wifi className="w-6 h-6 text-[#C5A880]" />,
                  title: "Wi-Fi & 24/7 Power",
                  desc: "High-speed broadband and dedicated generator backup for uninterrupted peace.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#12161D] border border-[#C5A880]/15 space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1A202C] border border-[#C5A880]/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-serif text-base text-[#F3EFE6] font-medium">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#A69E92] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 text-center space-y-6 max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F3EFE6] font-light">
            Planning a Group Stay in Udaipur?
          </h2>
          <p className="text-sm text-[#A69E92] font-light">
            We offer special rates for multi-night bookings, family reunions, and celebration retreats. Contact our team directly for custom packages with meals included.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A880] to-[#AD8F6F] text-[#080B0E] text-xs font-semibold tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-[#C5A880]/20"
            >
              Book Whole Villa
            </Link>
            <Link
              href="/gallery"
              className="px-6 py-3 rounded-full bg-[#12161D] border border-[#C5A880]/30 text-[#D2CBC1] hover:text-[#C5A880] text-xs font-semibold tracking-widest uppercase transition-all"
            >
              Explore Photo Gallery →
            </Link>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
      />

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

