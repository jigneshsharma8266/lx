"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bed,
  Camera,
  Waves,
  UtensilsCrossed,
  RotateCw,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface PortalCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  icon: React.ReactNode;
  tags: string[];
}

const PORTAL_CARDS: PortalCard[] = [
  {
    id: "rooms",
    badge: "Bedrooms & Suites",
    title: "Furnished AC Bedrooms",
    subtitle:
      "Comfortable king beds with split air-conditioning, attached modern bathrooms, 24/7 hot water, and private balconies overlooking the mountains.",
    href: "/rooms",
    image: "/images/villa/room-master-bedroom.jpeg",
    icon: <Bed className="w-4 h-4 text-[#C5A880]" />,
    tags: ["Split AC", "Hill View Balcony", "Hot Water 24/7"],
  },
  {
    id: "gallery",
    badge: "Photo Gallery",
    title: "Real Property Photos",
    subtitle:
      "Browse through 37+ genuine photos of the swimming pool, bedrooms, dining hall, lawn bonfire, and rooftop terrace taken on site.",
    href: "/gallery",
    image: "/images/villa/rooftop-jharokha-sunset.jpeg",
    icon: <Camera className="w-4 h-4 text-[#C5A880]" />,
    tags: ["37+ Photos", "Category Filters", "Full Screen View"],
  },
  {
    id: "experiences",
    badge: "Pool & Outdoors",
    title: "Private Pool & Lawn",
    subtitle:
      "Enjoy a clean adult swimming pool with loungers, evening tea under the rooftop chhatri, a lawn bonfire, and Bluetooth sound for your music.",
    href: "/experiences",
    image: "/images/villa/pool-daylight-deck.webp",
    icon: <Waves className="w-4 h-4 text-[#C5A880]" />,
    tags: ["Adult Pool", "Lawn Bonfire", "Bluetooth Speaker"],
  },
  {
    id: "menu",
    badge: "Food & Kitchen",
    title: "Dining Hall & Kitchen",
    subtitle:
      "Our in-house kitchen prepares fresh, tasty homestyle meals including Sev Tamatar, Dal Tadka, Paneer, fresh Rotis, and evening Chai.",
    href: "/menu",
    image: "/images/villa/dining-hall-stone-wall.jpeg",
    icon: <UtensilsCrossed className="w-4 h-4 text-[#C5A880]" />,
    tags: ["Fresh In-House", "Mewari Food", "Large Dining Hall"],
  },
  // {
  //   id: "3d",
  //   badge: "360° Virtual Tour",
  //   title: "360° View of the Villa",
  //   subtitle:
  //     "Take an interactive 360-degree look around the villa facade, swimming pool, and mountain setting in both daylight and night mode.",
  //   href: "/3d",
  //   image: "/images/villa/hero-villa-exterior-day.webp",
  //   icon: <RotateCw className="w-4 h-4 text-[#C5A880]" />,
  //   tags: ["360° Orbit", "Day & Night Views", "Interactive"],
  // },
  {
    id: "contact",
    badge: "Location & Contact",
    title: "Directions & Concierge",
    subtitle:
      "Find us in the peaceful Aravalli foothills of Udaipur, 18 mins from Fateh Sagar Lake, with private parking for 5 cars and WhatsApp support.",
    href: "/contact",
    image: "/images/villa/villa-lawn-architecture.jpg",
    icon: <MapPin className="w-4 h-4 text-[#C5A880]" />,
    tags: ["Udaipur Foothills", "18 Mins to Lake", "5-Car Parking"],
  },
];

export default function EstateShowcase() {
  return (
    <section className="py-20 sm:py-32 bg-[#080B0E] text-[#F3EFE6] border-t border-[#C5A880]/15 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#C5A880]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12161D] border border-[#C5A880]/30 text-xs uppercase tracking-[0.2em] text-[#C5A880]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span>Explore The Villa</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F3EFE6] font-light tracking-tight leading-[1.1]">
              Everything You Need for a <br className="hidden sm:inline" />
              <span className="italic font-normal font-serif gold-text-gradient">Comfortable Stay.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#A69E92] font-light leading-relaxed">
            Choose any section below to see bedroom details, real photos, swimming pool features, in-house food menus, and directions.
          </p>
        </div>

        {/* 6-Card Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTAL_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group relative rounded-3xl overflow-hidden bg-[#12161D] border border-[#C5A880]/20 hover:border-[#C5A880]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#C5A880]/15 flex flex-col justify-between"
            >
              {/* Card Header Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12161D] via-black/20 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <div className="p-2 rounded-full bg-black/70 backdrop-blur-md border border-[#C5A880]/30 text-[#C5A880]">
                    {card.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-sans font-medium uppercase tracking-widest bg-black/70 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30">
                    {card.badge}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-[#F3EFE6] font-light group-hover:text-[#C5A880] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A69E92] font-light leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {card.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-full text-[10px] bg-[#1A202C] text-[#C8C0B5] border border-white/5 font-sans"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Call to action arrow */}
                <div className="pt-4 border-t border-[#C5A880]/15 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#C5A880] group-hover:text-white transition-colors">
                  <span>Explore {card.badge}</span>
                  <div className="w-8 h-8 rounded-full bg-[#1A202C] group-hover:bg-[#C5A880] group-hover:text-[#080B0E] flex items-center justify-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
