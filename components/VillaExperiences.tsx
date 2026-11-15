"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, ChevronRight, Eye, Calendar, ArrowRight } from "lucide-react";
import { villaData, ExperienceItem } from "@/data/villaData";

export default function VillaExperiences({ onReserve }: { onReserve?: () => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const currentExp = villaData.experiences[activeTab];

  return (
    <section id="experiences" className="relative py-24 sm:py-32 bg-[#0B0F14] text-[#F3EFE6] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A880] mb-4">
              <span className="font-serif italic text-sm">II.</span> Curated Living
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#F8F5EE]">
              The Villa <span className="italic font-serif gold-text-gradient">Experience.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#A69E92] font-light leading-relaxed">
            Seven distinctive facets of living at Luxora Villa, crafted for seclusion, sensory delight, and memorable gatherings.
          </p>
        </div>

        {/* Experience Selector Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar border-b border-[#C5A880]/15">
          {villaData.experiences.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => setActiveTab(idx)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-xs tracking-[0.16em] uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === idx
                  ? "bg-[#C5A880] text-[#080B0E] font-semibold shadow-lg shadow-[#C5A880]/20 scale-105"
                  : "bg-white/5 text-[#A69E92] hover:text-[#F3EFE6] hover:bg-white/10"
              }`}
            >
              <span className="text-[10px] opacity-70">{exp.number}</span>
              <span>{exp.title}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Editorial Experience Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl glass-panel p-6 sm:p-10 lg:p-12 border border-[#C5A880]/20 shadow-2xl relative"
          >
            {/* Left Col: High-Impact Photography with subtle badge (7 Cols) */}
            <div className="lg:col-span-7 relative order-2 lg:order-1">
              <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#C5A880]/20 shadow-2xl">
                <Image
                  src={currentExp.image}
                  alt={currentExp.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Experience Tagline Inset */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block mb-2">
                    Experience {currentExp.number} of 07
                  </span>
                  <p className="font-serif text-xl sm:text-2xl text-[#F8F5EE] drop-shadow-md">
                    {currentExp.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Details, Highlights & Action (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 order-1 lg:order-2">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-serif text-3xl font-light text-[#C5A880]">
                    {currentExp.number}
                  </span>
                  <div className="h-[1px] w-12 bg-[#C5A880]/30" />
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#F8F5EE] font-normal tracking-tight mb-4">
                  {currentExp.title}
                </h3>
                <p className="text-sm sm:text-base text-[#D2CBC1] font-light leading-relaxed">
                  {currentExp.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-3 pt-4 border-t border-[#C5A880]/15">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-medium">
                  Experience Highlights
                </p>
                {currentExp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#C5A880]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#F3EFE6] font-light">{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#booking"
                  onClick={onReserve}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#AD8F6F] text-[#080B0E] text-xs font-semibold tracking-[0.16em] uppercase shadow-lg shadow-[#C5A880]/20 hover:scale-[1.02] transition-all"
                >
                  Book This Experience
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-1.5 text-xs text-[#A69E92] hover:text-[#C5A880] tracking-wider uppercase transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>View in Gallery</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mini 7-Tile Visual Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-8">
          {villaData.experiences.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => setActiveTab(idx)}
              className={`relative group rounded-xl overflow-hidden aspect-[4/3] border transition-all duration-300 text-left ${
                activeTab === idx
                  ? "border-[#C5A880] ring-2 ring-[#C5A880]/40"
                  : "border-[#C5A880]/15 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-[9px] text-[#C5A880] tracking-widest block font-serif">
                  {exp.number}
                </span>
                <span className="text-[11px] font-sans text-white font-medium line-clamp-1">
                  {exp.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

