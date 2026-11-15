"use client";

import React from "react";
import Image from "next/image";
import { Trees, Sparkles, Smile, Trophy, Flame, Compass } from "lucide-react";

export default function OutdoorSection() {
  const outdoorCards = [
    {
      title: "Beautiful Garden & Outdoor Sitting Area",
      tag: "Verified Feature",
      icon: Trees,
      description:
        "Spacious green lawns with comfortable outdoor seating. Savor morning chai, unwind in the open air, and share peaceful moments with friends and family.",
      image: "/images/villa/garden-lawn-sunlight.jpg",
      colSpan: "lg:col-span-6",
    },
    {
      title: "Scenic Aravalli Mountain Vistas",
      tag: "Scenic Landscape",
      icon: Compass,
      description:
        "Framed by the majestic mountain ranges of Udaipur. Enjoy golden morning sunrises, cooling mountain breezes, and sunset hill panoramas from private balconies.",
      image: "/images/villa/terrace-mountain-dining.jpeg",
      colSpan: "lg:col-span-6",
    },
    {
      title: "Bluetooth Speaker & Evening Gatherings",
      tag: "Music & Vibe",
      icon: Sparkles,
      description:
        "Connect your playlist to our vertical party Bluetooth sound setup for celebrations, birthday moments, and music by the poolside under the stars.",
      image: "/images/villa/amenity-bluetooth-speaker.jpg",
      colSpan: "lg:col-span-7",
    },
    {
      title: "Parking for up to 5 Cars & Power Backup",
      tag: "Peace of Mind",
      icon: Trophy,
      description:
        "Secure private parking space accommodating up to 5 vehicles with ease, accompanied by 24/7 generator power backup for uninterrupted comfort.",
      image: "/images/villa/villa-parking-night.jpg",
      colSpan: "lg:col-span-5",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#0B0F14] text-[#F3EFE6] overflow-hidden">
      {/* Decorative ambient background accent */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#26322A]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A880] mb-4">
            <Trees className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Outdoor Living & Grounds</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#F8F5EE] leading-[1.08]">
            Sunlit Grounds & <br />
            <span className="italic font-serif gold-text-gradient">Outdoor Play.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base text-[#A69E92] font-light leading-relaxed">
            Luxora Villa is designed for open-air freedom. With expansive private gardens, a dedicated play zone, and peaceful relaxation nooks, every moment under the sky is yours to enjoy.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {outdoorCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`${card.colSpan} relative rounded-3xl overflow-hidden border border-[#C5A880]/20 glass-panel group min-h-[360px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-8 shadow-xl`}
              >
                {/* Background image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-[#080B0E]/60 to-black/30 group-hover:via-[#080B0E]/50 transition-colors" />

                {/* Content Overlay */}
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A880]/30 text-[10px] uppercase tracking-wider text-[#C5A880] mb-3">
                    <Icon className="w-3 h-3 text-[#C5A880]" />
                    <span>{card.tag}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F5EE] mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D2CBC1] font-light leading-relaxed max-w-xl">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

