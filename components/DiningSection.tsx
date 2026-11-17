"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Utensils,
  Sparkles,
  Check,
  ArrowRight,
  Flame,
  MessageCircle,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { villaData, MenuCategory, MenuItem } from "@/data/villaData";

interface DiningSectionProps {
  embedded?: boolean;
  menuFirst?: boolean;
}

export default function DiningSection({
  embedded = false,
  menuFirst = true,
}: DiningSectionProps) {
  const [activeMenuTab, setActiveMenuTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const menuCardRef = useRef<HTMLDivElement>(null);

  const updateScrollProgress = () => {
    if (chipsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = chipsContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    }
  };

  useEffect(() => {
    updateScrollProgress();
  }, []);

  const handleTabChange = (
    tabId: string,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    setActiveMenuTab(tabId);

    // Smoothly scroll the selected chip into the center of the container
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const scrollChips = (direction: "left" | "right") => {
    if (chipsContainerRef.current) {
      const offset = direction === "left" ? -220 : 220;
      chipsContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
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

  /* ------------------------------------------------------------------------- */
  /* COMPONENT: VILLA DINING MENU CARD (With Search, Auto-Scroll Chips, Photos) */
  /* ------------------------------------------------------------------------- */
  const renderMenuCard = () => (
    <div
      ref={menuCardRef}
      className="rounded-3xl glass-panel border border-[#C5A880]/30 p-5 sm:p-8 lg:p-10 shadow-2xl relative scroll-mt-28 mb-12 sm:mb-16"
    >
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-[#C5A880]/15 pb-5">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold block mb-1">
            Official In-House Kitchen
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F8F5EE]">
            Villa Dining Menu
          </h2>
          <p className="text-xs text-[#A69E92] mt-1 font-light">
            Honest, transparent pricing in ₹ INR. Freshly prepared on order by our in-house villa staff.
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

      {/* Category Filter Chips Container */}
      <div className="relative mb-2">
        <div
          ref={chipsContainerRef}
          onScroll={updateScrollProgress}
          className="flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -ms-overflow-style:none"
        >
          {/* All Dishes Chip */}
          <button
            onClick={(e) => handleTabChange("all", e)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeMenuTab === "all"
                ? "bg-[#C5A880] text-[#080B0E] font-bold shadow-md shadow-[#C5A880]/20 scale-105"
                : "bg-white/5 text-[#A69E92] hover:text-white hover:bg-white/10"
            }`}
          >
            All Dishes
          </button>

          {/* Category Chips */}
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={(e) => handleTabChange(cat.id, e)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeMenuTab === cat.id
                  ? "bg-[#C5A880] text-[#080B0E] font-bold shadow-md shadow-[#C5A880]/20 scale-105"
                  : "bg-white/5 text-[#A69E92] hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Sleek Small Interactive Scrollbar Indicator */}
      <div className="flex items-center justify-center gap-3 pt-1 pb-6">
        <button
          type="button"
          onClick={() => scrollChips("left")}
          aria-label="Scroll filter chips left"
          className="w-6 h-6 rounded-full bg-white/5 hover:bg-[#C5A880]/20 border border-white/10 hover:border-[#C5A880]/40 text-[#A69E92] hover:text-[#C5A880] flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div
          className="w-36 sm:w-48 h-1 rounded-full bg-white/10 relative overflow-hidden cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const ratio = clickX / rect.width;
            if (chipsContainerRef.current) {
              const maxScroll = chipsContainerRef.current.scrollWidth - chipsContainerRef.current.clientWidth;
              chipsContainerRef.current.scrollTo({ left: ratio * maxScroll, behavior: "smooth" });
            }
          }}
        >
          <div
            className="h-full bg-gradient-to-r from-[#C5A880] to-[#E5D5C0] rounded-full transition-all duration-200"
            style={{
              width: "35%",
              transform: `translateX(${scrollProgress * 1.85}%)`,
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => scrollChips("right")}
          aria-label="Scroll filter chips right"
          className="w-6 h-6 rounded-full bg-white/5 hover:bg-[#C5A880]/20 border border-white/10 hover:border-[#C5A880]/40 text-[#A69E92] hover:text-[#C5A880] flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Menu Sections Grid with Mouthwatering Dish Photos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="space-y-4">
            {/* Category Header */}
            <div className="flex items-center justify-between border-b border-[#C5A880]/20 pb-3">
              <div className="flex items-center gap-2.5">
                <h3 className="font-serif text-xl sm:text-2xl text-[#E5D5C0]">
                  {cat.title}
                </h3>
                <span className="text-[10px] text-[#A69E92] font-sans">
                  ({cat.items.length} {cat.items.length === 1 ? "dish" : "dishes"})
                </span>
              </div>
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
                  className="flex items-center gap-3.5 sm:gap-4 group p-2.5 sm:p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#C5A880]/30 transition-all duration-300 shadow-sm"
                >
                  {/* Dish Food Photo with Zoom Effect */}
                  {item.image && (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#C5A880]/20 bg-[#0F1318] shadow-inner">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 64px, 80px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Dish Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base text-[#F3EFE6] font-medium group-hover:text-[#C5A880] transition-colors">
                        {item.name}
                      </span>
                      {item.isSpecialty && (
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 shrink-0">
                          <Flame className="w-2.5 h-2.5 text-amber-400" />
                          Specialty
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-[11px] sm:text-xs text-[#A69E92] font-light mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="shrink-0 text-right pl-2">
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
  );

  /* ------------------------------------------------------------------------- */
  /* COMPONENT: DINING HALL FEATURE SHOWCASE (Stone Wall, Big Table, Highlights)*/
  /* ------------------------------------------------------------------------- */
  const renderDiningHallShowcase = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-[#C5A880]/15">
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
              Large indoor dining hall accommodating your entire family or group of friends comfortably under one roof.
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
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-black text-black" />
            <span>Enquire Dining on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="dining"
      className={`relative text-[#F3EFE6] overflow-hidden ${
        embedded ? "pt-2 pb-16" : "py-24 sm:py-32 bg-[#080B0E]"
      }`}
    >
      {/* Ambient background glow */}
      {!embedded && (
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-[160px] pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Render Order: When menuFirst is true, the Menu is IMMEDIATELY at the top! */}
        {menuFirst ? (
          <>
            {renderMenuCard()}
            {renderDiningHallShowcase()}
          </>
        ) : (
          <>
            {renderDiningHallShowcase()}
            {renderMenuCard()}
          </>
        )}
      </div>
    </section>
  );
}
