"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageLightbox, { LightboxImage } from "@/components/ImageLightbox";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { villaData } from "@/data/villaData";
import {
  Sparkles,
  Waves,
  SunMedium,
  Flame,
  Volume2,
  UtensilsCrossed,
  Car,
  Calendar,
  MessageCircle,
  Maximize2,
  ChevronRight,
} from "lucide-react";

interface ExperienceStory {
  id: string;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  imageUrl: string;
  imageCaption: string;
}

const EXPERIENCES_LIST: ExperienceStory[] = [
  {
    id: "pool-deck",
    icon: <Waves className="w-5 h-5 text-[#C5A880]" />,
    tag: "Exclusive Leisure",
    title: "Secluded Adult Swimming Pool & Gazebo Deck",
    description:
      "A sparkling adult swimming pool wrapped in checkered stone patios and manicured greenery. Featuring an elevated two-level viewing gazebo, underwater night illumination, and reclining loungers for all-day soaking under the warm Rajasthan sun.",
    bullets: [
      "Dedicated adult depth for refreshing lap swimming and pool volleyball",
      "Two-level viewing gazebo deck with scenic 360° hill backdrop",
      "Warm ambient underwater lighting for romantic night swims",
      "Comfortable loungers and poolside tea & snack service",
    ],
    imageUrl: "/images/villa/pool-daylight-deck.webp",
    imageCaption: "Private adult swimming pool with 2-level viewing gazebo deck",
  },
  {
    id: "sunset-chhatri",
    icon: <SunMedium className="w-5 h-5 text-[#C5A880]" />,
    tag: "Heritage Viewpoint",
    title: "Rooftop Rajasthani Chhatri & Golden Hour Sunset",
    description:
      "Step onto our signature checkered rooftop terrace adorned with authentic hand-carved stone pillars and jharokha arches. As the sun dips behind the ancient Aravalli peaks, watch the sky ignite into fiery shades of gold, amber, and indigo.",
    bullets: [
      "Traditional Rajasthani stone cupola (chhatri) framing sunset views",
      "Elevated vantage point with uninterrupted 360° mountain horizons",
      "Prime location for photoshoot reels, portraits, and golden hour teas",
      "Fresh mountain breezes descending from surrounding valley slopes",
    ],
    imageUrl: "/images/villa/rooftop-jharokha-sunset.jpeg",
    imageCaption: "Rooftop checkered terrace with Rajasthani chhatri at golden hour",
  },
  {
    id: "bonfire-lawns",
    icon: <Flame className="w-5 h-5 text-[#C5A880]" />,
    tag: "Evening Magic",
    title: "Lawn Bonfires & Starlit Barbecue Nights",
    description:
      "As night settles over the Udaipur valley, gather your closest friends and family around a crackling open-flame bonfire on the lawn. Enjoy freshly roasted snacks, piping-hot Masala Chai, and heartwarming conversations under star-studded skies.",
    bullets: [
      "Cozy open-air bonfire setup on the manicured green lawn",
      "Hot appetizers directly from our in-house kitchen (Paneer Tikka, Pakodas)",
      "Warm blankets, lantern glow, and peaceful nocturnal stillness",
      "Perfect setting for storytelling, acoustic music, and family reunions",
    ],
    imageUrl: "/images/villa/dining-lawn-bonfire.jpg",
    imageCaption: "Evening lawn bonfire with tea and appetizers",
  },
  {
    id: "music-sound",
    icon: <Volume2 className="w-5 h-5 text-[#C5A880]" />,
    tag: "Celebration Ready",
    title: "Bluetooth Party Sound & Private Celebrations",
    description:
      "Unlike crowded hotels with restrictive sound curfews, Luxora Villa gives your group the freedom to celebrate. Connect seamlessly to our high-power Bluetooth party speaker and celebrate birthdays, anniversaries, and reunions your way.",
    bullets: [
      "High-power tower Bluetooth speaker compatible with all smartphones",
      "Spacious outdoor lawn and pool patio for dancing and games",
      "Unrestricted private gatherings without shared hotel disturbances",
      "Reliable 24/7 power backup ensures uninterrupted music and lights",
    ],
    imageUrl: "/images/villa/amenity-bluetooth-speaker.jpg",
    imageCaption: "Dedicated high-power Bluetooth sound system for celebrations",
  },
  {
    id: "dining-feasts",
    icon: <UtensilsCrossed className="w-5 h-5 text-[#C5A880]" />,
    tag: "Culinary Comfort",
    title: "Spacious Dining Hall & Homestyle Mewari Feasts",
    description:
      "Our dedicated stone-wall dining hall is built specifically for group meals. Feast on authentic dishes prepared fresh on site — from homestyle Dal Tadka and spicy Mewari Sev Tamatar to hot parathas and afternoon Chai.",
    bullets: [
      "Dedicated indoor hall with large group dining tables and garden windows",
      "In-house kitchen menu with affordable, freshly cooked vegetarian options",
      "Al-fresco terrace dining option with mountain views for breakfast",
      "Personalized menu coordination for multi-day family stays",
    ],
    imageUrl: "/images/villa/dining-hall-stone-wall.jpeg",
    imageCaption: "Spacious dedicated dining hall with natural slate stone wall",
  },
  {
    id: "parking-estate",
    icon: <Car className="w-5 h-5 text-[#C5A880]" />,
    tag: "Effortless Arrival",
    title: "Private 5-Car Parking & Complete Gated Estate",
    description:
      "Arrive stress-free with ample secure parking inside the villa gates for up to 5 full-sized SUVs. The entire property is securely walled with 24/7 power backup, ensuring peace of mind throughout your retreat.",
    bullets: [
      "Secure on-site private parking accommodates up to 5 vehicles",
      "Wide vehicle entrance gate with easy turnaround clearance",
      "Full automatic power backup generator for uninterrupted AC and lights",
      "Private perimeter walls guarantee privacy from exterior roads",
    ],
    imageUrl: "/images/villa/villa-parking-night.jpg",
    imageCaption: "Gated on-site parking for up to 5 vehicles with night lighting",
  },
];

export default function ExperiencesPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages: LightboxImage[] = EXPERIENCES_LIST.map((exp) => ({
    url: exp.imageUrl,
    title: exp.title,
    caption: exp.description,
    category: exp.tag,
  }));

  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      <main className="relative pt-24 sm:pt-28 pb-16 overflow-hidden">
        {/* Subtle Ambient Background */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C5A880]/8 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Compact Above-the-Fold Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A202C]/60 border border-[#C5A880]/30 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#C5A880] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Pool & Outdoor Living • Private Estate Experiences</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-[#F3EFE6] tracking-tight leading-[1.15]">
              Swimming Pool, Bonfires & <span className="italic font-serif gold-text-gradient">Garden Living</span>
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-[#C8C0B5] font-light max-w-xl mx-auto leading-relaxed">
              Swim in our private adult pool, enjoy evening tea under the rooftop chhatri, play your music on the Bluetooth party speaker, or gather around a lawn bonfire under the stars.
            </p>
          </div>

          {/* Stories Section (Directly visible above the fold!) */}
          <div className="space-y-16 sm:space-y-24">
          {EXPERIENCES_LIST.map((exp, idx) => {
            const isReversed = idx % 2 !== 0;

            return (
              <div
                key={exp.id}
                id={exp.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Visual Image Card (6 cols) */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative aspect-[16/11] rounded-3xl overflow-hidden bg-[#12161D] border border-[#C5A880]/20 shadow-2xl cursor-pointer hover:border-[#C5A880]/50 transition-all duration-500"
                  >
                    <Image
                      src={exp.imageUrl}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <div className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A880]/30 text-[#C5A880]">
                        {exp.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-sans font-medium uppercase tracking-widest bg-black/60 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30">
                        {exp.tag}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
                      <Maximize2 className="w-4 h-4 text-[#C5A880]" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <p className="text-xs text-[#E8D8BF] font-light">
                        {exp.imageCaption}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Narrative Details (6 cols) */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#C5A880] font-semibold">
                      0{idx + 1} — {exp.tag}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F3EFE6] font-light leading-snug">
                      {exp.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#A69E92] font-light leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {exp.bullets.map((point, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#D2CBC1]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-2 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href="/book"
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#AD8F6F] text-[#080B0E] text-xs font-semibold tracking-wider uppercase hover:scale-105 transition-all shadow-md shadow-[#C5A880]/20"
                    >
                      Plan Your Stay
                    </Link>

                    <button
                      onClick={() => setLightboxIndex(idx)}
                      className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>View Full Image</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <section className="py-20 bg-[#0B0F14] border-t border-[#C5A880]/15">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F3EFE6] font-light">
              Make These Memories Yours
            </h2>
            <p className="text-sm sm:text-base text-[#A69E92] font-light max-w-xl mx-auto">
              Our on-site villa caretaker and host assist with pool setups, bonfire arrangements, hot meals, and local Udaipur sightseeing tips.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/book"
                className="px-6 py-3 rounded-full bg-[#C5A880] text-[#080B0E] text-xs font-semibold tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-[#C5A880]/20"
              >
                Reserve Stay
              </Link>
              <a
                href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hi%2C%20I%20am%20interested%20in%20hosting%20a%20family%20getaway%20at%20Luxora%20Villa.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#12161D] border border-[#25D366]/40 text-[#25D366] text-xs font-semibold tracking-widest uppercase hover:border-[#25D366] transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

