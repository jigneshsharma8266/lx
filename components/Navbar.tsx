"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, MapPin, ExternalLink, Phone } from "lucide-react";
import { villaData } from "@/data/villaData";
import LuxoraLogo from "./LuxoraLogo";
import WhatsAppIcon from "./WhatsAppIcon";

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



export default function Navbar({ onOpenBooking }: { onOpenBooking?: () => void }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Smart autohide navbar on scroll down, show on scroll up
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current && currentScrollY - lastScrollYRef.current > 8) {
        setIsVisible(false);
      } else if (lastScrollYRef.current - currentScrollY > 8) {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Rooms", href: "/rooms" },
    { label: "Gallery", href: "/gallery" },
    { label: "Experiences", href: "/experiences" },
    { label: "Dining Menu", href: "/menu" },
    { label: "Book Dining", href: "/book-dining", isSpecial: true },
    { label: "Contact", href: "/contact" },
  ];

  const handleBookingClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      if (onOpenBooking) {
        e.preventDefault();
        onOpenBooking();
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-none ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        {/* Top Luxury Address & Concierge Interactive Strip */}
        <div className="bg-[#050709]/95 backdrop-blur-md border-b border-white/[0.02] text-[#C8C0B5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-3 text-[11px]">
            {/* Interactive Location Link with GPS */}
            <a
              href={villaData.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 min-w-0 transition-colors"
              title="Open Live GPS Route in Google Maps"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C5A880]/15 group-hover:bg-[#C5A880] text-[#C5A880] group-hover:text-[#080B0E] transition-all shrink-0">
                <MapPin className="w-2.5 h-2.5" />
              </span>
              <span className="font-medium text-[#F3EFE6] group-hover:text-[#C5A880] transition-colors truncate">
                Godach, Ghoda Ghati Road
              </span>
              <span className="text-[#C5A880]/50 hidden sm:inline">•</span>
              <span className="text-[#8E867A] hidden sm:inline truncate">
                Udaipur – Nathdwara Route
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-wider text-[#C5A880] bg-[#C5A880]/10 px-2 py-0.5 rounded-full border border-[#C5A880]/20 group-hover:border-[#C5A880]/60 shrink-0 ml-0.5 transition-colors">
                <span>GPS Route</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </a>

            {/* Interactive Host Actions: Direct Call & WhatsApp */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href={`tel:${villaData.contact.phone}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#C5A880]/20 text-[#D2CBC1] hover:text-[#C5A880] transition-all border border-white/5 hover:border-[#C5A880]/30 text-[11px]"
                title="Call Host Directly"
              >
                <Phone className="w-3 h-3 text-[#C5A880]" />
                <span className="hidden sm:inline text-[#8E867A]">Host:</span>
                <span className="text-white font-medium">{villaData.contact.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${villaData.contact.whatsappNumber}?text=Hi%20Luxora%20Villa%2C%20I%20have%20an%20inquiry`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-[11px] font-medium transition-all border border-[#25D366]/25 hover:border-[#25D366]/50"
                title="Chat with Concierge on WhatsApp"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                </span>
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span className="hidden md:inline text-[10px] uppercase font-sans tracking-wider">Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div
          className={`transition-all duration-300 ease-in-out ${isScrolled
            ? "bg-[#080B0E]/95 backdrop-blur-xl py-2 sm:py-2.5 shadow-2xl shadow-black/80 border-none"
            : "bg-gradient-to-b from-black/85 via-black/45 to-transparent py-2.5 sm:py-3.5"
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-nowrap gap-4">
            {/* Brand Logo with Official Transparent Emblem */}
            <Link
              href="/"
              className="group flex items-center focus:outline-none shrink-0 transition-transform duration-300 hover:scale-[1.02]"
              aria-label="Luxora Villa Home"
            >
              <LuxoraLogo variant="horizontal" size="sm" />
            </Link>

            {/* Desktop Multi-Page Navigation */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6 text-xs xl:text-[12.5px] tracking-[0.1em] uppercase shrink-0 flex-nowrap font-sans font-medium">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                if (link.isSpecial) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative py-1 px-3 rounded-full text-[11px] xl:text-xs transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${isActive
                        ? "bg-[#C5A880] text-[#080B0E] font-bold shadow-md shadow-[#C5A880]/20"
                        : "bg-[#C5A880]/10 hover:bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30 hover:border-[#C5A880]/60"
                        }`}
                    >
                      <span>{link.label}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 px-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#C5A880] ${isActive ? "text-[#C5A880] font-semibold" : "text-[#E2DDD5]"
                      }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#C5A880] rounded-full shadow-[0_0_8px_rgba(197,168,128,0.7)] animate-fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-nowrap">
              {/* Primary Reserve Button */}
              <Link
                href="/book"
                className="hidden sm:inline-flex items-center gap-2 px-4 xl:px-5 py-2 rounded-full bg-[#C5A880] hover:bg-[#D4BC9B] text-[#080B0E] text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-200 whitespace-nowrap shrink-0 shadow-md hover:shadow-lg hover:shadow-[#C5A880]/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Check Availability</span>
              </Link>

              {/* Mobile Menu Drawer Trigger (Hidden on Desktop) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-[#C5A880]/20 border border-white/10 hover:border-[#C5A880]/40 text-[#F3EFE6] hover:text-[#C5A880] transition-all"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-[#C5A880]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Universal Luxury Full-Screen Navigation Menu */}
      <div
        className={`fixed inset-0 z-[80] transition-all duration-300 ${mobileMenuOpen
          ? "opacity-100 pointer-events-auto visible"
          : "opacity-0 pointer-events-none invisible"
          }`}
      >
        {/* Full-Screen Menu Panel */}
        <div
          className={`fixed inset-0 w-full h-full bg-[#080B0E] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="max-w-lg mx-auto w-full flex flex-col justify-between min-h-full">
              {/* Top Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#C5A880]/20">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center focus:outline-none"
                >
                  <LuxoraLogo variant="horizontal" size="sm" />
                </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-[#C5A880]/20 border border-white/10 hover:border-[#C5A880] text-white hover:text-[#C5A880] transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold"
                aria-label="Close Menu"
              >
                <span className="hidden sm:inline">Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

                  {/* Navigation Links (Matching Desktop Typography, No Numbers) */ }
            <div className="py-6 space-y-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold px-3">
                Explore Luxora Estate
              </p>
              <nav className="flex flex-col gap-1 text-left">
                {[
                  { label: "Home", href: "/" },
                  { label: "Rooms", href: "/rooms" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Experiences", href: "/experiences" },
                  { label: "Dining Menu", href: "/menu" },
                  { label: "Book Dining", href: "/book-dining", isHighlight: true },
                  { label: "Contact", href: "/contact" },
                ].map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-sans text-sm sm:text-base uppercase tracking-[0.12em] font-medium transition-all duration-200 flex items-center justify-between group py-3 px-3.5 rounded-xl ${isActive
                          ? "text-[#C5A880] font-semibold bg-[#C5A880]/10 border border-[#C5A880]/20"
                          : link.isHighlight
                            ? "text-[#F3EFE6] hover:text-[#C5A880] hover:bg-white/[0.03]"
                            : "text-[#E2DDD5] hover:text-[#C5A880] hover:bg-white/[0.03]"
                        }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shadow-[0_0_8px_rgba(197,168,128,0.8)]" />
                        )}
                        <span>{link.label}</span>
                        {link.isHighlight && (
                          <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 tracking-wider">
                            New
                          </span>
                        )}
                      </span>
                    </Link>
              );
                })}
            </nav>
          </div>

                  {/* Bottom Address & Quick Action Buttons */}
                  <div className="border-t border-[#C5A880]/15 pt-5 space-y-4">
                    {/* Property Address Card */}
                    <div className="p-3.5 rounded-2xl bg-[#12161D] border border-[#C5A880]/25 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] font-sans text-[#C5A880] uppercase tracking-wider font-semibold">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Villa Address</span>
                        </div>
                        <a
                          href={villaData.location.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-[#C5A880] font-semibold flex items-center gap-1 hover:underline"
                        >
                          <span>GPS Directions</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                      <p className="text-white text-xs font-medium leading-snug">
                        Godach, Ghoda Ghati Road
                      </p>
                      <p className="text-[11px] text-[#A69E92] leading-snug">
                        Udaipur – Nathdwara Route, Rajsamand – 313011
                      </p>
                    </div>

                    {/* Social Links */}
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

                  {/* Dual Action CTA Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <Link
                      href="/book-dining"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 rounded-full bg-[#1A202C] hover:bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] text-center text-xs font-semibold tracking-wider uppercase transition-colors"
                    >
                      Book Lunch / Dinner
                    </Link>

                      <Link
                        href="/book"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3 rounded-full bg-[#C5A880] hover:bg-[#D4BC9B] text-[#080B0E] text-center text-xs font-semibold tracking-wider uppercase transition-colors shadow-md"
                      >
                        Check Stay Availability
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          );
}
