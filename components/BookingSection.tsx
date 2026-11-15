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

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "4 Guests",
    occasion: "Private Vacation",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate customized WhatsApp prefilled message matching owner booking flow
  const generateWhatsAppUrl = () => {
    const text = `Hello Luxora Villa, Udaipur!%0A%0AI would like to enquire about bookings & availability:%0A• Check-in Date: ${encodeURIComponent(
      formData.checkIn || "Please specify"
    )}%0A• Check-out Date: ${encodeURIComponent(
      formData.checkOut || "Please specify"
    )}%0A• Number of Guests: ${encodeURIComponent(formData.guests)}%0A• Guest Name: ${encodeURIComponent(
      formData.name || "Guest"
    )}%0A• Phone: ${encodeURIComponent(
      formData.phone || "Not specified"
    )}%0A• Stay Type: ${encodeURIComponent(formData.occasion)}%0A• Message: ${encodeURIComponent(
      formData.message || "Please let me know the best available options."
    )}`;
    return `https://wa.me/${villaData.contact.whatsappNumber}?text=${text}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate enquiry registration (ready for backend API or webhook)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="booking" className="relative py-24 sm:py-32 bg-[#080B0E] text-[#F3EFE6] overflow-hidden">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-[90vw] h-[700px] bg-[#C5A880]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A880] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Private Reservation</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F8F5EE]">
            Your Escape <br />
            <span className="italic font-serif gold-text-gradient">Is Waiting.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base text-[#A69E92] font-light leading-relaxed">
            Reserve the entire villa for your exclusive use. Submit your dates below for direct priority confirmation with our estate host.
          </p>
        </div>

        {/* Enquiry Form Card */}
        <div className="rounded-3xl glass-panel border border-[#C5A880]/25 p-6 sm:p-10 lg:p-12 shadow-2xl relative">
          {isSubmitted ? (
            /* Success Confirmation Screen */
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880] mb-6 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F8F5EE] mb-3">
                Enquiry Received with Pleasure
              </h3>
              <p className="text-sm sm:text-base text-[#D2CBC1] font-light max-w-lg mb-8 leading-relaxed">
                Thank you, <span className="text-[#C5A880] font-medium">{formData.name || "Guest"}</span>. Our estate concierge will review your preferred dates ({formData.checkIn || "Upcoming"} to {formData.checkOut || "Upcoming"}) and contact you promptly via phone/WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#25D366] text-black font-semibold text-xs tracking-wider uppercase hover:bg-white transition-all flex items-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Follow-Up</span>
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 rounded-full glass-panel border border-white/20 text-xs tracking-wider uppercase text-[#D2CBC1] hover:text-white"
                >
                  Submit Another Enquiry
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
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors [color-scheme:dark]"
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
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors [color-scheme:dark]"
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
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer [color-scheme:dark]"
                    >
                      <option value="2 Guests (Couples Retreat)">2 Guests (Couples Retreat)</option>
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
                    <Sparkles className="w-4 h-4 text-[#C5A880]/70 absolute left-3.5 pointer-events-none" />
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer [color-scheme:dark]"
                    >
                      <option value="Private Vacation">Private Vacation</option>
                      <option value="Romantic Anniversary">Romantic Anniversary</option>
                      <option value="Family Holiday">Family Holiday</option>
                      <option value="Milestone Birthday">Milestone Birthday</option>
                      <option value="Friends Getaway">Friends Getaway</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 2: Name, Phone, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      placeholder="e.g. Jordan Hayes"
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
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-medium">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-[#C5A880]/70 absolute left-3.5 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      placeholder="jordan@example.com"
                      value={formData.email}
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
                    placeholder="Mention any dining preferences, private chef requirements, early check-in requests, or special celebrations..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#0F1318] border border-[#C5A880]/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#F3EFE6] focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Actions & WhatsApp Direct CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#C5A880]/15">
                {/* Direct WhatsApp Enquiry Button */}
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire via WhatsApp Direct</span>
                </a>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#D4BC9B] to-[#AD8F6F] text-[#080B0E] font-bold text-xs tracking-[0.2em] uppercase shadow-xl shadow-[#C5A880]/20 hover:shadow-[#C5A880]/35 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Registering Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Private Stay Enquiry</span>
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
