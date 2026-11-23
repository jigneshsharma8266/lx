"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { villaData, MenuItem } from "@/data/villaData";
import {
  Utensils,
  Clock,
  Calendar,
  Users,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  Search,
  MapPin,
  ExternalLink,
  ChevronRight,
  X,
} from "lucide-react";

// Meal types configuration
const MEAL_TYPES = [
  {
    id: "lunch",
    title: "Lunch Feast",
    icon: "☀️",
    timing: "12:30 PM – 3:30 PM",
    badge: "Daylight Mountain Views",
    slots: ["12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM"],
  },
  {
    id: "dinner",
    title: "Dinner Experience",
    icon: "🌙",
    timing: "7:30 PM – 10:30 PM",
    badge: "Poolside Lights & Starlit Garden",
    slots: ["7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"],
  },
  {
    id: "high-tea",
    title: "High Tea & Snacks",
    icon: "☕",
    timing: "4:30 PM – 6:30 PM",
    badge: "Sunset Samosas, Chai & Pakodas",
    slots: ["4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"],
  },
];

// Seating areas
const SEATING_AREAS = [
  {
    id: "hall",
    name: "Grand Indoor Dining Hall",
    desc: "Spacious stone-wall dining hall with large family tables & cooling comfort",
    icon: "🏛️",
  },
  {
    id: "lawn",
    name: "Open-Air Garden Lawn",
    desc: "Al-fresco seating surrounded by manicured grass & fresh mountain breeze",
    icon: "🌿",
  },
  {
    id: "terrace",
    name: "Rooftop / Balcony Terrace",
    desc: "Elevated vantage point overlooking the Aravalli foothills",
    icon: "🌅",
  },
];

export default function BookDiningPage() {
  // Form State
  const [mealType, setMealType] = useState<string>("lunch");
  const [date, setDate] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const formatted = `${yyyy}-${mm}-${dd}`;
    setDate(formatted);
    setMinDate(formatted);
  }, []);
  const [timeSlot, setTimeSlot] = useState<string>("1:30 PM");
  const [guestCount, setGuestCount] = useState<number>(4);
  const [seatingArea, setSeatingArea] = useState<string>("hall");
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("Family Get-Together");
  const [specialNote, setSpecialNote] = useState<string>("");

  // Menu Order State: Map of itemName -> { item: MenuItem, quantity: number }
  const [orderItems, setOrderItems] = useState<{ [key: string]: { item: MenuItem; quantity: number } }>({});
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [foodDrawerOpen, setFoodDrawerOpen] = useState<boolean>(false);

  // Available slots based on meal type
  const currentMealConfig = MEAL_TYPES.find((m) => m.id === mealType) || MEAL_TYPES[0];

  const handleMealTypeSelect = (typeId: string) => {
    setMealType(typeId);
    const config = MEAL_TYPES.find((m) => m.id === typeId);
    if (config && config.slots.length > 0) {
      setTimeSlot(config.slots[0]);
    }
  };

  // Add / Increment Item
  const handleAddItem = (item: MenuItem) => {
    setOrderItems((prev) => {
      const current = prev[item.name]?.quantity || 0;
      return {
        ...prev,
        [item.name]: { item, quantity: current + 1 },
      };
    });
  };

  // Decrement Item
  const handleRemoveItem = (itemName: string) => {
    setOrderItems((prev) => {
      const current = prev[itemName]?.quantity || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[itemName];
        return copy;
      }
      return {
        ...prev,
        [itemName]: { ...prev[itemName], quantity: current - 1 },
      };
    });
  };

  // Clear an item
  const handleDeleteItem = (itemName: string) => {
    setOrderItems((prev) => {
      const copy = { ...prev };
      delete copy[itemName];
      return copy;
    });
  };

  // Total Bill Calculations
  const { totalItemsCount, totalFoodAmount } = useMemo(() => {
    let count = 0;
    let amount = 0;
    Object.values(orderItems).forEach(({ item, quantity }) => {
      count += quantity;
      amount += item.price * quantity;
    });
    return { totalItemsCount: count, totalFoodAmount: amount };
  }, [orderItems]);

  // Filter Menu Categories
  const filteredCategories = useMemo(() => {
    let cats = villaData.menu;
    if (activeCategory !== "all") {
      cats = cats.filter((c) => c.id === activeCategory);
    }
    if (!searchQuery.trim()) return cats;

    const q = searchQuery.toLowerCase();
    return cats
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [activeCategory, searchQuery]);

  // WhatsApp Message Generator
  const handleBookOnWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      alert("Please enter your name for the table reservation.");
      return;
    }
    if (!guestPhone.trim()) {
      alert("Please enter your contact phone number.");
      return;
    }

    const itemsSummaryList = Object.values(orderItems).map(
      ({ item, quantity }) => `• ${quantity} x ${item.name} (₹${item.price * quantity})`
    );

    const seatingName = SEATING_AREAS.find((s) => s.id === seatingArea)?.name || "Dining Hall";

    let msg = `*LUXORA VILLA — LUNCH / DINNER TABLE RESERVATION*\n\n`;
    msg += `*Guest Name:* ${guestName}\n`;
    msg += `*Phone:* ${guestPhone}\n`;
    msg += `*Date:* ${date}\n`;
    msg += `*Meal & Time:* ${currentMealConfig.title} (${timeSlot})\n`;
    msg += `*Number of People:* ${guestCount} Guests\n`;
    msg += `*Seating Preference:* ${seatingName}\n`;
    if (occasion) msg += `*Occasion:* ${occasion}\n`;

    msg += `\n*PRE-ORDERED FOOD MENU:*\n`;
    if (itemsSummaryList.length > 0) {
      msg += itemsSummaryList.join("\n") + "\n\n";
      msg += `*ESTIMATED FOOD BILL:* ₹${totalFoodAmount.toLocaleString("en-IN")}\n`;
    } else {
      msg += `(No specific dishes pre-selected yet. Will decide upon arrival or review menu on chat.)\n\n`;
      msg += `*ESTIMATED FOOD BILL:* Pay as per menu ordered\n`;
    }

    msg += `*TABLE & SEATING FEE:* ₹0 (100% COMPLIMENTARY)\n`;
    msg += `*STAY / ENTRY FEE:* ₹0 (NO STAY REQUIRED)\n`;

    if (specialNote.trim()) {
      msg += `\n*Special Request:* ${specialNote}\n`;
    }

    msg += `\n_Please confirm our table reservation and preparation time._`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${villaData.contact.whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3EFE6] selection:bg-[#C5A880]/30 selection:text-white">
      <Navbar />

      <main className="relative pt-32 sm:pt-36 lg:pt-40 pb-20 overflow-hidden">
        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[600px] h-[260px] bg-[#C5A880]/8 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* 1. Header: Simple, Clean & Compact with Elegant Breathing Room */}
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#F3EFE6] tracking-tight">
              Book Lunch & Dinner at <span className="italic font-serif gold-text-gradient">Luxora Villa</span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-[#A69E92] font-light">
              Mewari & Punjabi homestyle dining in scenic Aravalli foothills
            </p>

            {/* Compact inline assurances */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-[#25D366]/30 text-[#25D366] font-medium shadow-sm">
                <span className="font-bold">₹0</span> Table Charge
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-white/10 text-[#D2CBC1]">
                <Sparkles className="w-3 h-3 text-[#C5A880]" /> Open to Non-Staying Guests
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12161D] border border-[#C5A880]/30 text-[#C5A880]">
                <Utensils className="w-3 h-3 text-[#C5A880]" /> Pay Only For Food
              </span>
            </div>
          </div>

          {/* 2. Main 2-Column Layout: Left = Booking & Food Selection, Right = Order Summary & Bill */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN: Steps 1 & 2 (8 Cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">

              {/* STEP 1: TIME, DATE, GUESTS & SEATING */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#12161D] border border-[#C5A880]/25 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#C5A880] text-[#080B0E] font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                      Select Meal, Time & Guests
                    </h3>
                  </div>
                  <span className="text-xs text-[#A69E92] font-mono">Step 1 of 2</span>
                </div>

                {/* A. Meal Type Tabs (Lunch / Dinner / High Tea) */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                    Select Meal Experience
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {MEAL_TYPES.map((m) => {
                      const isSelected = mealType === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleMealTypeSelect(m.id)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? "bg-[#C5A880]/15 border-[#C5A880] shadow-md shadow-[#C5A880]/10"
                              : "bg-[#0F1318] border-white/5 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xl">{m.icon}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />}
                          </div>
                          <p className={`font-serif text-base font-medium ${isSelected ? "text-white" : "text-[#D2CBC1]"}`}>
                            {m.title}
                          </p>
                          <p className="text-[11px] text-[#A69E92] mt-0.5">{m.timing}</p>
                          <span className="inline-block mt-2 text-[9px] uppercase tracking-wider text-[#C5A880] font-sans">
                            {m.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* B. Date & Time Slot Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1.5">
                      Reservation Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={date}
                        min={minDate}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F1318] border border-[#C5A880]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1.5">
                      Arrival Time Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F1318] border border-[#C5A880]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
                    >
                      {currentMealConfig.slots.map((s) => (
                        <option key={s} value={s} className="bg-[#0F1318] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* C. Guest Count & Occasion Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1.5">
                      Number of People / Guests
                    </label>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0F1318] border border-[#C5A880]/20">
                      <Users className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <button
                        type="button"
                        onClick={() => setGuestCount((g) => Math.max(1, g - 1))}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-serif text-base text-white font-medium flex-1 text-center">
                        {guestCount} {guestCount === 1 ? "Person" : "People"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount((g) => g + 1)}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1.5">
                      Occasion / Celebration (Optional)
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0F1318] border border-[#C5A880]/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880] transition-colors"
                    >
                      <option value="Family Get-Together">Family Get-Together</option>
                      <option value="Birthday Celebration">Birthday Celebration</option>
                      <option value="Anniversary Dinner">Anniversary Dinner</option>
                      <option value="Friends Road-Trip Halt">Friends Road-Trip Halt</option>
                      <option value="Nathdwara Pilgrimage Lunch">Nathdwara Pilgrimage Lunch</option>
                      <option value="Casual Lunch / Dinner">Casual Lunch / Dinner</option>
                    </select>
                  </div>
                </div>

                {/* D. Seating Area Preference */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                    Preferred Seating Ambiance (Zero Extra Cost)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SEATING_AREAS.map((area) => {
                      const isSel = seatingArea === area.id;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setSeatingArea(area.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all ${
                            isSel
                              ? "bg-[#C5A880]/15 border-[#C5A880] text-white"
                              : "bg-[#0F1318] border-white/5 text-[#A69E92] hover:border-white/20"
                          }`}
                        >
                          <div className="text-xl mb-1">{area.icon}</div>
                          <p className={`text-xs font-semibold ${isSel ? "text-white" : "text-[#D2CBC1]"}`}>
                            {area.name}
                          </p>
                          <p className="text-[10px] text-[#8E867A] mt-0.5 leading-snug">{area.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Menu Drawer Quick-Trigger Bar: Select Food without scrolling down! */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#161D26] via-[#1C2633] to-[#161D26] border border-[#C5A880]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880]/35 flex items-center justify-center text-[#C5A880] shrink-0">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
                      <span className="text-[10px] uppercase font-sans tracking-widest px-2 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] font-semibold border border-[#C5A880]/25">
                        Slide-Out Food Drawer
                      </span>
                      <span className="text-[10px] text-[#25D366] font-medium">No scrolling down needed</span>
                    </div>
                    <p className="font-serif text-lg text-white font-medium">
                      Select Your Dishes in a Slide-Out Drawer
                    </p>
                    <p className="text-xs text-[#A69E92]">
                      {totalItemsCount > 0 ? `${totalItemsCount} dishes chosen • Total ₹${totalFoodAmount.toLocaleString("en-IN")}` : "Browse all starters, curries, tawa breads & lassi directly"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFoodDrawerOpen(true)}
                  className="px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#D4BC9B] text-[#080B0E] font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 shrink-0 hover:-translate-y-0.5"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Open Food Menu Drawer</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* STEP 2: INTERACTIVE FOOD PRE-ORDER MENU */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#12161D] border border-[#C5A880]/25 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#C5A880] text-[#080B0E] font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                        Select Dishes You Want to Eat
                      </h3>
                      <p className="text-xs text-[#A69E92]">
                        Choose from fresh in-house cooking. Only pay for what you select.
                      </p>
                    </div>
                  </div>

                  {/* Quick Cart Pill on Desktop */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-xs text-[#C5A880] font-medium shrink-0">
                    <span>{totalItemsCount} dishes selected</span>
                    <span>•</span>
                    <span className="font-bold">₹{totalFoodAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Search Bar & Category Filter Chips */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#A69E92] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search paneer, dal tadka, lassi, roti, sev tamatar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F1318] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveCategory("all")}
                      className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
                        activeCategory === "all"
                          ? "bg-[#C5A880] text-[#080B0E] font-semibold"
                          : "bg-white/5 text-[#D2CBC1] hover:bg-white/10"
                      }`}
                    >
                      All Dishes ({villaData.menu.reduce((acc, cat) => acc + cat.items.length, 0)})
                    </button>
                    {villaData.menu.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
                          activeCategory === cat.id
                            ? "bg-[#C5A880] text-[#080B0E] font-semibold"
                            : "bg-white/5 text-[#D2CBC1] hover:bg-white/10"
                        }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Food Items List by Category */}
                <div className="space-y-6">
                  {filteredCategories.map((category) => (
                    <div key={category.id} className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg text-white font-medium">{category.title}</h4>
                          {category.badge && (
                            <span className="text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/25">
                              {category.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#8E867A]">{category.items.length} items</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.items.map((item) => {
                          const qty = orderItems[item.name]?.quantity || 0;
                          return (
                            <div
                              key={item.name}
                              className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                                qty > 0
                                  ? "bg-[#161D26] border-[#C5A880]/50 shadow-md"
                                  : "bg-[#0F1318] border-white/5 hover:border-white/15"
                              }`}
                            >
                              {/* Left Thumbnail + Info */}
                              <div className="flex items-start gap-3 min-w-0">
                                {item.image && (
                                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/10">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      sizes="56px"
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <div className="space-y-0.5 min-w-0">
                                  <p className="font-medium text-xs sm:text-sm text-white truncate">
                                    {item.name}
                                  </p>
                                  {item.description && (
                                    <p className="text-[11px] text-[#A69E92] font-light line-clamp-1">
                                      {item.description}
                                    </p>
                                  )}
                                  <p className="text-xs font-semibold text-[#C5A880]">
                                    ₹{item.price}
                                  </p>
                                </div>
                              </div>

                              {/* Right: Quantity Selector */}
                              <div className="shrink-0 flex items-center">
                                {qty === 0 ? (
                                  <button
                                    type="button"
                                    onClick={() => handleAddItem(item)}
                                    className="px-3 py-1.5 rounded-full bg-[#C5A880]/15 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#080B0E] border border-[#C5A880]/30 text-xs font-semibold tracking-wider transition-all flex items-center gap-1"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Add</span>
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-[#C5A880] text-[#080B0E]">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveItem(item.name)}
                                      className="w-5 h-5 rounded-full hover:bg-black/20 flex items-center justify-center font-bold"
                                      title="Decrease"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-xs font-bold w-4 text-center">{qty}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleAddItem(item)}
                                      className="w-5 h-5 rounded-full hover:bg-black/20 flex items-center justify-center font-bold"
                                      title="Increase"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {filteredCategories.length === 0 && (
                    <div className="py-8 text-center text-sm text-[#A69E92]">
                      No dishes found matching &quot;{searchQuery}&quot;. Try clearing your search.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Step 3 (Guest Details & Transparent Bill Card) — Sticky on Desktop (4-5 Cols) */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-28 space-y-6">

              {/* LIVE BILL & ORDER SUMMARY CARD */}
              <div className="rounded-3xl bg-[#12161D] border border-[#C5A880]/30 p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-[#C5A880]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#C5A880]" />
                    <h3 className="font-serif text-xl text-white font-medium">Your Food Pre-Order</h3>
                  </div>
                  <span className="text-xs font-mono text-[#C5A880] font-semibold">
                    {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
                  </span>
                </div>

                {/* Selected Food Items List */}
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                  {Object.keys(orderItems).length === 0 ? (
                    <div className="py-6 text-center text-xs text-[#A69E92] space-y-1">
                      <p className="font-serif text-sm text-[#D2CBC1]">No dishes added yet</p>
                      <p className="text-[11px]">
                        Tap &ldquo;+ Add&rdquo; on any menu item above to build your lunch or dinner order.
                      </p>
                    </div>
                  ) : (
                    Object.values(orderItems).map(({ item, quantity }) => (
                      <div
                        key={item.name}
                        className="p-2.5 rounded-xl bg-[#0F1318] border border-white/5 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="truncate flex-1">
                          <p className="text-white font-medium truncate">{item.name}</p>
                          <p className="text-[10px] text-[#A69E92]">
                            {quantity} × ₹{item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-semibold text-white">₹{quantity * item.price}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.name)}
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Transparent Bill Breakdown (Clear zero-sitting guarantee) */}
                <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div className="flex items-center justify-between text-[#D2CBC1]">
                    <span>Food Items Subtotal</span>
                    <span className="font-mono text-white font-semibold">
                      ₹{totalFoodAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#25D366]">
                    <span className="flex items-center gap-1">
                      <span>Table & Sitting Charge</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#25D366]/20 font-mono">100% FREE</span>
                    </span>
                    <span className="font-mono font-bold">₹0</span>
                  </div>

                  <div className="flex items-center justify-between text-[#25D366]">
                    <span className="flex items-center gap-1">
                      <span>Venue / Lawn / Hall Access</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#25D366]/20 font-mono">100% FREE</span>
                    </span>
                    <span className="font-mono font-bold">₹0</span>
                  </div>

                  <div className="flex items-center justify-between text-[#25D366]">
                    <span className="flex items-center gap-1">
                      <span>Parking for up to 5 Cars</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#25D366]/20 font-mono">100% FREE</span>
                    </span>
                    <span className="font-mono font-bold">₹0</span>
                  </div>

                  <div className="pt-3 border-t border-[#C5A880]/30 flex items-center justify-between">
                    <div>
                      <p className="font-serif text-lg text-white font-medium">Total Food Cost</p>
                      <p className="text-[10px] text-[#A69E92]">Pay only for food consumed</p>
                    </div>
                    <span className="font-serif text-2xl text-[#C5A880] font-bold">
                      ₹{totalFoodAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Guest Details Form */}
                <form onSubmit={handleBookOnWhatsApp} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rathore"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1318] border border-[#C5A880]/25 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1318] border border-[#C5A880]/25 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-1">
                      Special Cooking Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Medium spicy, Jain preparation, extra papad..."
                      value={specialNote}
                      onChange={(e) => setSpecialNote(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F1318] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  {/* Primary WhatsApp Reservation Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 mt-4 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Confirm & Send Pre-Order on WhatsApp</span>
                  </button>

                  {/* Quick Direct Call Host Link */}
                  <div className="text-center pt-1">
                    <a
                      href={`tel:${villaData.contact.phone}`}
                      className="text-[11px] text-[#A69E92] hover:text-[#C5A880] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3 h-3 text-[#C5A880]" />
                      <span>Prefer to call? Speak directly with host: {villaData.contact.phoneDisplay}</span>
                    </a>
                  </div>
                </form>
              </div>

              {/* Location & Navigation Quick Card */}
              <div className="p-4 rounded-2xl bg-[#12161D] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#C5A880] font-semibold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Villa Dining Location</span>
                </div>
                <p className="text-white text-xs font-medium">
                  {villaData.location.addressLine1}
                </p>
                <p className="text-[11px] text-[#A69E92]">
                  {villaData.location.addressLine2}
                </p>
                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-[#A69E92] text-[10px]">~20 mins to Nathdwara | ~30 mins to Udaipur</span>
                  <a
                    href={villaData.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A880] hover:underline font-semibold flex items-center gap-1 text-[11px]"
                  >
                    <span>Open GPS Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* 3. Venue Highlights & Photo Gallery Strip */}
          <div className="mt-16 sm:mt-20 pt-12 border-t border-[#C5A880]/15 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
                Private Estate Ambiance
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-light">
                Why Lunch or Dinner at Luxora is Special
              </h2>
              <p className="text-xs sm:text-sm text-[#A69E92]">
                Unlike noisy commercial highway restaurants, here you get a peaceful private estate all to yourselves.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="rounded-3xl overflow-hidden bg-[#12161D] border border-white/10 group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/images/villa/dining-hall-stone-wall.jpeg"
                    alt="Luxora Villa Dining Hall"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12161D] via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-lg text-white font-medium">Stone-Wall Indoor Hall</h4>
                  <p className="text-xs text-[#A69E92] font-light leading-relaxed">
                    Air-cooled spacious hall with large wooden family dining tables, comfortable chairs, and Rajasthani stone architecture.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="rounded-3xl overflow-hidden bg-[#12161D] border border-white/10 group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/images/villa/garden-lawn-sunlight.jpg"
                    alt="Luxora Villa Lawn Dining"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12161D] via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-lg text-white font-medium">Garden Lawn Al-Fresco</h4>
                  <p className="text-xs text-[#A69E92] font-light leading-relaxed">
                    Dine on green grass lawns facing the Aravalli hills during daylight, or under fairy lights and evening stars.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="rounded-3xl overflow-hidden bg-[#12161D] border border-white/10 group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/images/villa/terrace-mountain-dining.jpeg"
                    alt="Luxora Villa Homestyle Food"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12161D] via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif text-lg text-white font-medium">Fresh Cook-On-Arrival</h4>
                  <p className="text-xs text-[#A69E92] font-light leading-relaxed">
                    No pre-cooked buffet food. Your curries, tawa rotis, and dal are cooked hot right when you and your family arrive.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Slide-Over Food Menu Drawer (No scrolling down needed!) */}
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            foodDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Dark Backdrop */}
          <div
            onClick={() => setFoodDrawerOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity"
          />

          {/* Slide-In Panel from Right */}
          <div
            className={`absolute top-0 right-0 bottom-0 w-full max-w-xl bg-[#0B0F14] border-l border-[#C5A880]/25 shadow-2xl flex flex-col justify-between overflow-hidden transform transition-transform duration-300 ease-out ${
              foodDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Drawer Top Header */}
            <div className="p-5 sm:p-6 border-b border-[#C5A880]/20 bg-[#080B0E] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">Villa Dining Menu</h3>
                  <p className="text-xs text-[#A69E92]">Select dishes to add to your table order</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFoodDrawerOpen(false)}
                className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-[#C5A880]/20 border border-white/10 hover:border-[#C5A880] text-white hover:text-[#C5A880] transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold"
              >
                <span>Done</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Bar & Category Filter Chips */}
            <div className="p-4 sm:px-6 bg-[#080B0E] border-b border-white/10 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#A69E92] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search paneer, dal tadka, lassi, roti..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#12161D] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`px-3 py-1 rounded-full whitespace-nowrap text-xs transition-colors font-medium ${
                    activeCategory === "all"
                      ? "bg-[#C5A880] text-[#080B0E] font-semibold"
                      : "bg-white/5 text-[#D2CBC1] hover:bg-white/10"
                  }`}
                >
                  All
                </button>
                {villaData.menu.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap text-xs transition-colors font-medium ${
                      activeCategory === cat.id
                        ? "bg-[#C5A880] text-[#080B0E] font-semibold"
                        : "bg-white/5 text-[#D2CBC1] hover:bg-white/10"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Food Items List in Drawer */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {filteredCategories.map((cat) => (
                <div key={cat.id} className="space-y-2.5">
                  <h4 className="text-xs uppercase font-sans tracking-widest text-[#C5A880] font-semibold border-b border-white/5 pb-1">
                    {cat.title}
                  </h4>
                  <div className="space-y-2">
                    {cat.items.map((item) => {
                      const qty = orderItems[item.name]?.quantity || 0;
                      return (
                        <div
                          key={item.name}
                          className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                            qty > 0
                              ? "bg-[#161D26] border-[#C5A880]/50"
                              : "bg-[#12161D] border-white/5 hover:border-white/15"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {item.image && (
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white/5">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-medium text-xs sm:text-sm text-white truncate">{item.name}</p>
                              <p className="text-xs font-semibold text-[#C5A880]">₹{item.price}</p>
                            </div>
                          </div>

                          <div className="shrink-0">
                            {qty === 0 ? (
                              <button
                                type="button"
                                onClick={() => handleAddItem(item)}
                                className="px-3 py-1.5 rounded-full bg-[#C5A880]/15 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#080B0E] border border-[#C5A880]/30 text-xs font-semibold tracking-wider transition-all flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add</span>
                              </button>
                            ) : (
                              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-[#C5A880] text-[#080B0E]">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem(item.name)}
                                  className="w-5 h-5 rounded-full hover:bg-black/20 flex items-center justify-center font-bold"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold w-4 text-center">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => handleAddItem(item)}
                                  className="w-5 h-5 rounded-full hover:bg-black/20 flex items-center justify-center font-bold"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Bottom Sticky Summary & Done Button */}
            <div className="p-4 sm:p-5 border-t border-[#C5A880]/20 bg-[#080B0E] flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-[#A69E92]">{totalItemsCount} dishes selected</p>
                <p className="font-serif text-xl text-[#C5A880] font-bold">
                  ₹{totalFoodAmount.toLocaleString("en-IN")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFoodDrawerOpen(false)}
                className="px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#D4BC9B] text-[#080B0E] font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Done & View Order</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
