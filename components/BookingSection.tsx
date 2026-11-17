"use client";

import React, { useState } from "react";
import {
  Calendar,
  Users,
  User,
  Phone,
  Mail,
  MessageSquare,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Send,
} from "lucide-react";
import { villaData } from "@/data/villaData";

interface BookingSectionProps {
  embedded?: boolean;
  showHeading?: boolean;
}

export default function BookingSection({
  embedded = false,
  showHeading = true,
}: BookingSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "4 Guests",
    occasion: "Private Vacation",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [minDate, setMinDate] = useState("");

  React.useEffect(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "checkIn") {
      setFormData((prev) => ({
        ...prev,
        checkIn: value,
        checkOut: prev.checkOut && prev.checkOut < value ? value : prev.checkOut,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Generate cleanly formatted WhatsApp text with availability check & stay inquiry details
  const buildWhatsAppMessage = () => {
    const lines = [
      `*Check Availability & Stay Enquiry — Luxora Villa, Udaipur*`,
      ``,
      `Hello Luxora Villa! I would like to check availability and enquire about booking for a private stay:`,
      ``,
      `*Guest Name:* ${formData.name.trim() || "Guest"}`,
      `*Phone Number:* ${formData.phone.trim() || "Not specified"}`,
      `*Check-In Date:* ${formData.checkIn || "Flexible / Not selected"}`,
      `*Check-Out Date:* ${formData.checkOut || "Flexible / Not selected"}`,
      `*Number of Guests:* ${formData.guests}`,
      `*Stay Occasion:* ${formData.occasion}`,
      formData.message.trim() ? `*Special Requests / Notes:* ${formData.message.trim()}` : null,
      ``,
      `Please let me know if the villa is available for these dates and share the best booking rates. Thank you!`,
    ].filter((line) => line !== null);

    return encodeURIComponent(lines.join("\n"));
  };

  const generateWhatsAppUrl = () => {
    const encoded = buildWhatsAppMessage();
    return `https://wa.me/${villaData.contact.whatsappNumber}?text=${encoded}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const waUrl = generateWhatsAppUrl();

    // Open WhatsApp directly with prefilled booking message
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <section
      id="booking"
      className={`relative text-[#F3EFE6] overflow-hidden ${
        embedded ? "py-2 sm:py-4" : "py-24 sm:py-32 bg-[#080B0E]"
      }`}
    >
      {/* Decorative ambient backdrop */}
      {!embedded && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-[90vw] h-[700px] bg-[#C5A880]/10 rounded-full blur-[180px] pointer-events-none" />
      )}

      <div className={`relative z-10 max-w-5xl mx-auto ${embedded ? "px-0" : "px-4 sm:px-6 lg:px-8"}`}>
        {/* Section Header */}
        {showHeading && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#C5A880] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span>Check Availability & Enquire</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F5EE]">
              Check Availability & <br />
              <span className="italic font-serif gold-text-gradient">Enquire for Stay</span>
            </h2>
            <p className="mt-4 text-xs sm:text-base text-[#A69E92] font-light leading-relaxed">
              Check your preferred dates and enquire directly with the property host on WhatsApp (+91 86909 55700). Get live availability, buyout rates, and complete details for your group stay.
            </p>
          </div>
        )}

        {/* Enquiry Form Card */}
        <div className={`rounded-3xl glass-panel border border-[#C5A880]/25 shadow-2xl relative ${embedded ? "p-6 sm:p-8 lg:p-10" : "p-6 sm:p-10 lg:p-12"}`}>
          {isSubmitted ? (
            /* Success Confirmation Screen */
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center text-[#25D366] mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F8F5EE] mb-3">
                Enquiry Ready on WhatsApp
              </h3>
              <p className="text-sm sm:text-base text-[#D2CBC1] font-light max-w-lg mb-8 leading-relaxed">
                Thank you, <span className="text-[#C5A880] font-medium">{formData.name || "Guest"}</span>! Your availability check and inquiry for <span className="text-white font-medium">{formData.checkIn || "Dates"}</span> to <span className="text-white font-medium">{formData.checkOut || "Dates"}</span> ({formData.guests}) has been prepared for host <span className="text-white font-medium">+91 86909 55700</span>.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2.5 shadow-xl shadow-[#25D366]/25"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Click to Open WhatsApp Message</span>
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3.5 rounded-full glass-panel border border-white/20 text-xs tracking-wider uppercase text-[#D2CBC1] hover:text-white transition-colors"
                >
                  Edit Dates / Check Another
                </button>
              </div>
            </div>
          ) : (
            /* Main Interactive Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Check-in, Check-out, Guests, Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Check In */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium">
                    Check-In Date
                  </label>
                  <div className="relative flex items-center">
                    <Calendar className="w-4 h-4 text-[#C5A880]/70 absolute left-3.5 pointer-events-none" />
                    <input
                      type="date"
                      name="checkIn"
                      required
                      min={minDate}
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-3 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Check Out */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium">
                    Check-Out Date
                  </label>
                  <div className="relative flex items-center">
                    <Calendar className="w-4 h-4 text-[#C5A880]/70 absolute left-3.5 pointer-events-none" />
                    <input
                      type="date"
                      name="checkOut"
                      required
                      min={formData.checkIn || minDate}
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-3 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Number of Guests */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium">
                    Number of Guests
                  </label>
                  <div className="relative flex items-center">
                    <Users className="w-4 h-4 text-[#C5A880]/70 absolute left-3.5 pointer-events-none" />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-3 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer [color-scheme:dark]"
                    >
                      <option value="2 Guests (Couples Retreat)">2 Guests (Couples)</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="6 Guests">6 Guests</option>
                      <option value="8 Guests (Family)">8 Guests (Family)</option>
                      <option value="10-12 Guests (Full Estate Buyout)">
                        10–12 Guests (Full Buyout)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Occasion */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium">
                    Stay Type
                  </label>
                  <div className="relative flex items-center">
                    <Calendar className="w-4 h-4 text-[#C5A880]/70 absolute left-3.5 pointer-events-none" />
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-3 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer [color-scheme:dark]"
                    >
                      <option value="Private Vacation">Private Vacation</option>
                      <option value="Romantic Anniversary">Romantic Getaway</option>
                      <option value="Family Holiday">Family Holiday</option>
                      <option value="Milestone Birthday">Birthday / Celebration</option>
                      <option value="Friends Getaway">Friends Getaway</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 2: Name & Phone (No Email needed) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-[#C5A880]/70 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-[#C5A880]/70 absolute left-3.5 pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Special Requests / Message */}
              <div className="space-y-1.5">
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium">
                  Special Requests or Questions (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#C5A880]/70 absolute left-3.5 top-3 pointer-events-none" />
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Any special requests or food preferences (optional)"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Actions & WhatsApp Direct CTA - Perfectly Equal & Symmetrical */}
              <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#C5A880]/15">
                {/* Direct Call Host Option */}
                <a
                  href={`tel:${villaData.contact.phone.replace(/\s+/g, "")}`}
                  className="h-14 w-full px-4 sm:px-6 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-[#C5A880]/40 hover:border-[#C5A880] text-[#F3EFE6] hover:text-white text-xs sm:text-[13px] lg:text-sm font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 whitespace-nowrap shadow-sm text-center"
                >
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Call: {villaData.contact.phone}</span>
                </a>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-14 w-full px-4 sm:px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs sm:text-[13px] lg:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 whitespace-nowrap shadow-md cursor-pointer text-center"
                >
                  {isLoading ? (
                    <span>Checking Availability...</span>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 fill-black text-black shrink-0" />
                      <span className="hidden sm:inline">Check Availability & Enquire on WhatsApp</span>
                      <span className="sm:hidden">Enquire on WhatsApp</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reservation Policy Note */}
              <div className="pt-2 flex items-center justify-center gap-2 text-center text-[11px] text-[#A69E92]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Enquiry-based booking. Direct property confirmation with no third-party booking commissions.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
