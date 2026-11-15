"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Utensils,
  Coffee,
  Sun,
  Moon,
  Clock,
  Sparkles,
  Check,
  ArrowRight,
  Flame,
  MessageCircle,
  Search,
} from "lucide-react";
import { villaData, MenuCategory, MenuItem } from "@/data/villaData";

export default function DiningSection() {
  const [activeMenuTab, setActiveMenuTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const menuCardRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tabId: string) => {
    setActiveMenuTab(tabId);
    if (menuCardRef.current) {
      const navOffset = 88; // offset for fixed navbar
      const elementPosition = menuCardRef.current.getBoundingClientRect().top;
      const targetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });
    }
  };

  const menuCategories = villaData.menu;

  // Filter items based on active tab and search query
  const getFilteredCategories = () => {
    let cats = menuCategories;
    if (activeMenuTab !== "all") {
      cats = menuCategories.filter((c) => c.id === activeMenuTab);
    }
    if (!searchQuery.trim()) return cats;

    const query = searchQuery.toLowerCase();
    return cats
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  };

  const filteredCategories = getFilteredCategories();

  return (
    <section id="dining" className="relative py-24 sm:py-32 bg-[#080B0E] text-[#F3EFE6] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A880] mb-4">
            <Utensils className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Spacious Dining Hall & In-House Kitchen</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#F8F5EE] leading-[1.05]">
            Good Food. <br />
            <span className="italic font-serif gold-text-gradient">Authentic Udaipur Flavors.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base text-[#B0A799] font-light leading-relaxed">
            Gather in our spacious dining hall for freshly cooked comfort meals. From royal Rajasthani Sev Tamatar and Kadai Paneer to morning Poha and cooling Masala Chach — all prepared hot on-site.
          </p>
        </div>

        {/* Feature Cards: Dining Hall & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-[#C5A880]/20 shadow-2xl">
              <Image
                src="/images/villa/dining-hall-stone-wall.jpeg"
                alt="Luxora Villa Udaipur Spacious Dedicated Dining Hall with Natural Stone Wall"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#080B0E] bg-[#C5A880] px-3 py-1 rounded-full font-semibold inline-block mb-2">
                  Verified Feature
                </span>
                <p className="font-serif text-2xl sm:text-3xl text-white">
                  Spacious Dedicated Dining Hall
                </p>
                <p className="text-xs text-[#E5D5C0] font-light mt-1 max-w-md">
                  Large dining space accommodating your entire family or group of friends comfortably under one roof.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl glass-panel border border-[#C5A880]/20 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A880] font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Homestyle Dining Experience</span>
              </div>
              <h3 className="font-serif text-2xl text-[#F8F5EE]">
                Freshly Prepared on Order
              </h3>
              <p className="text-xs sm:text-sm text-[#D2CBC1] font-light leading-relaxed">
                Enjoy hassle-free home-style dining without having to step outside into traffic. Share your meal preferences with our caretakers and enjoy hot rotis straight from the tawa.
              </p>
              <div className="pt-2 space-y-2 border-t border-white/10 text-xs text-[#E5D5C0]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Rajasthani & North Indian Specialties</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Fresh Makki ki Roti & Winter Specials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Chilled Masala Chach & Punjabi Lassi</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hello%20Luxora%20Villa%20Udaipur,%20I%20would%20like%20to%20know%20more%20about%20the%20dining%20and%20food%20arrangements.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold tracking-wider uppercase hover:bg-[#25D366] hover:text-black transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire Dining on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* OFFICIAL IN-HOUSE KITCHEN MENU (Browse Real Dishes & Verified Prices in ₹) */}
        {/* ------------------------------------------------------------------------- */}
        <div ref={menuCardRef} className="rounded-3xl glass-panel border border-[#C5A880]/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#C5A880]/15 pb-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold block mb-1">
                Official In-House Kitchen
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F8F5EE]">
                Villa Dining Menu
              </h3>
              <p className="text-xs text-[#A69E92] mt-1">
                Honest, transparent pricing in ₹ INR. Prepared fresh by our in-house villa staff.
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#C5A880]/70 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search dishes (e.g. Paneer, Roti)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-full py-2 pl-9 pr-4 text-xs text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Pills (Auto-scrolls to top of menu when clicked) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            <button
              onClick={() => handleTabChange("all")}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                activeMenuTab === "all"
                  ? "bg-[#C5A880] text-[#080B0E] font-semibold shadow-md"
                  : "bg-white/5 text-[#A69E92] hover:text-white"
              }`}
            >
              All Dishes
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                  activeMenuTab === cat.id
                    ? "bg-[#C5A880] text-[#080B0E] font-semibold shadow-md"
                    : "bg-white/5 text-[#A69E92] hover:text-white"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Menu Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-[#C5A880]/20 pb-2">
                  <h4 className="font-serif text-xl sm:text-2xl text-[#E5D5C0]">
                    {cat.title}
                  </h4>
                  {cat.badge && (
                    <span className="text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 font-medium">
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Dish Items List */}
                <div className="space-y-3">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline justify-between gap-4 group p-2 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base text-[#F3EFE6] font-medium group-hover:text-[#C5A880] transition-colors">
                            {item.name}
                          </span>
                          {item.isSpecialty && (
                            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                              <Flame className="w-2.5 h-2.5 text-amber-400" />
                              Specialty
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-[#A69E92] font-light mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Dotted Leader & Price */}
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base sm:text-lg text-[#C5A880] font-semibold whitespace-nowrap">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Menu Notice */}
          <div className="mt-10 pt-6 border-t border-[#C5A880]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A69E92]">
            <p>
              * All items prepared fresh in the villa kitchen. Please inform the caretakers in advance for smooth meal coordination.
            </p>
            <a
              href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hello%20Luxora%20Villa,%20I%20have%20a%20special%20dining%20request%20for%20our%20stay.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C5A880] hover:underline whitespace-nowrap font-medium"
            >
              <span>Custom Meal Requests via WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
