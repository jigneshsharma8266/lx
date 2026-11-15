"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Calendar } from "lucide-react";
import { villaData } from "@/data/villaData";
import LuxoraLogo from "./LuxoraLogo";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

export default function Navbar({ onOpenBooking }: { onOpenBooking?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Header styling when scrolled past top
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Smart autohide navbar on scroll down, show on scroll up
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current && currentScrollY - lastScrollYRef.current > 8) {
        // Scrolling DOWN -> hide navbar to immerse visitor in photography & 3D content
        setIsVisible(false);
      } else if (lastScrollYRef.current - currentScrollY > 8) {
        // Scrolling UP -> instantly reveal navbar
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;

      // Check current section for active indicator
      const sections = ["intro", "experiences", "pool", "dining", "3d-view", "gallery", "location", "booking"];
      const scrollPosition = currentScrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#intro", id: "intro" },
    { label: "Experiences", href: "#experiences", id: "experiences" },
    { label: "Pool", href: "#pool", id: "pool" },
    { label: "Dining", href: "#dining", id: "dining" },
    { label: "3D View", href: "#3d-view", id: "3d-view" },
    { label: "Gallery", href: "#gallery", id: "gallery" },
    { label: "Location", href: "#location", id: "location" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isScrolled
            ? "bg-[#080B0E]/95 backdrop-blur-xl py-3 border-b border-[#C5A880]/20 shadow-2xl shadow-black/60"
            : "bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-nowrap">
          {/* Brand Logo with Official Transparent Emblem */}
          <Link
            href="#"
            className="group flex items-center focus:outline-none shrink-0 mr-4 lg:mr-6 xl:mr-8 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Luxora Villa Home"
          >
            <LuxoraLogo variant="horizontal" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 text-[11px] xl:text-[12px] 2xl:text-[13px] tracking-[0.1em] xl:tracking-[0.14em] uppercase text-[#D2CBC1] shrink-0 flex-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 px-0.5 whitespace-nowrap shrink-0 transition-colors duration-300 hover:text-[#C5A880] ${
                  activeSection === link.id ? "text-[#C5A880] font-medium" : ""
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C5A880] rounded-full animate-fade-in" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4 shrink-0 ml-4 lg:ml-6 xl:ml-8 flex-nowrap">
            {/* Primary Reserve Button */}
            <a
              href="#booking"
              onClick={onOpenBooking}
              className="hidden sm:inline-flex relative group overflow-hidden px-4 xl:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#AD8F6F] text-[#080B0E] text-[11px] xl:text-xs font-semibold tracking-[0.14em] uppercase shadow-lg shadow-[#C5A880]/20 hover:shadow-[#C5A880]/35 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Stay</span>
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#F3EFE6] hover:text-[#C5A880] hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#080B0E]/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-between p-6 pt-24 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 max-w-sm mx-auto w-full pt-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880]/70 font-sans border-b border-[#C5A880]/15 pb-2">
            Navigation Menu
          </p>
          <nav className="flex flex-col gap-4 text-left">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-[#F3EFE6] hover:text-[#C5A880] transition-colors flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <span className="text-xs font-sans text-[#C5A880]/50 tracking-widest group-hover:text-[#C5A880]">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="max-w-sm mx-auto w-full border-t border-[#C5A880]/15 pt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs text-[#D2CBC1]">
            <a
              href={villaData.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#C5A880] hover:underline"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>{villaData.contact.instagramHandle}</span>
            </a>
            <a
              href={`https://wa.me/${villaData.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#25D366] hover:underline"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#AD8F6F] text-[#080B0E] text-center text-xs font-semibold tracking-[0.2em] uppercase shadow-lg shadow-[#C5A880]/20"
          >
            Reserve Your Private Stay
          </a>
        </div>
      </div>
    </>
  );
}
