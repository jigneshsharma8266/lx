"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Suites & Rooms", href: "/rooms" },
    { label: "Gallery", href: "/gallery" },
    { label: "Experiences", href: "/experiences" },
    { label: "Dining Menu", href: "/menu" },
    // { label: "3D Tour", href: "/3d" }, // Commented out for now
    { label: "Contact & Location", href: "/contact" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b-0 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isScrolled
            ? "bg-[#080B0E]/92 backdrop-blur-xl py-2.5 sm:py-3 shadow-2xl shadow-black/70"
            : "bg-gradient-to-b from-black/80 via-black/35 to-transparent py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-nowrap">
          {/* Brand Logo with Official Transparent Emblem */}
          <Link
            href="/"
            className="group flex items-center focus:outline-none shrink-0 mr-4 lg:mr-8 xl:mr-10 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Luxora Villa Home"
          >
            <LuxoraLogo variant="horizontal" />
          </Link>

          {/* Desktop Multi-Page Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 text-xs xl:text-[13px] tracking-[0.12em] uppercase shrink-0 flex-nowrap font-sans font-medium">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 px-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#C5A880] ${
                    isActive ? "text-[#C5A880] font-semibold" : "text-[#E2DDD5]"
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
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4 shrink-0 ml-4 lg:ml-8 xl:ml-10 flex-nowrap">
            {/* Primary Reserve Button */}
            <Link
              href="/book"
              className="hidden sm:inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#D4BC9B] text-[#080B0E] text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-200 whitespace-nowrap shrink-0 shadow-md hover:shadow-lg hover:shadow-[#C5A880]/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Check Availability</span>
            </Link>

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
        <div className="flex flex-col gap-5 max-w-sm mx-auto w-full pt-2">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880]/70 font-sans border-b border-[#C5A880]/15 pb-2">
            Navigation Menu
          </p>
          <nav className="flex flex-col gap-3 text-left">
            {navLinks.map((link, idx) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif text-2xl transition-colors flex items-center justify-between group ${
                    isActive ? "text-[#C5A880]" : "text-[#F3EFE6] hover:text-[#C5A880]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-sans text-[#C5A880]/50 tracking-widest group-hover:text-[#C5A880]">
                    0{idx + 1}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="max-w-sm mx-auto w-full border-t border-[#C5A880]/15 pt-5 flex flex-col gap-4">
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

          <Link
            href="/book"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3.5 rounded-full bg-[#C5A880] hover:bg-[#D4BC9B] text-[#080B0E] text-center text-xs font-semibold tracking-wider uppercase transition-colors shadow-md"
          >
            Check Availability & Enquire
          </Link>
        </div>
      </div>
    </>
  );
}
