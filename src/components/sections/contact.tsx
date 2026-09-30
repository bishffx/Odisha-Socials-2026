"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import { BRAND_CONFIG } from "@/constants/brand";
import { InstagramIcon } from "@/components/ui/social-icons";
import {
  MessageCircle,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Sparkles,
  Send,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
  botcheck: string; // Honeypot field
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
    botcheck: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = (): string | null => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return "Please enter your name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      return "Please enter a valid phone or WhatsApp number.";
    }
    if (!formData.business.trim() || formData.business.trim().length < 2) {
      return "Please enter your business or brand name.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      return "Please tell us a little about your project goals.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const clientError = validate();
    if (clientError) {
      setStatus("error");
      setErrorMessage(clientError);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        business: "",
        message: "",
        botcheck: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err.message || "Something went wrong. Please connect with us directly on WhatsApp."
      );
    }
  };

  return (
    <div className="w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ============================================================== */}
          {/* LEFT COLUMN: ANIMATED HEADLINE & CONTACT METADATA              */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <Badge variant="purple" withDot className="mb-5">
              <span>Let's Connect ✦ Start Your Growth</span>
            </Badge>

            <div className="relative mb-6">
              <SparkDoodle
                variant="burst"
                className="absolute -top-7 -right-8 w-8 h-8 text-amber-500 hidden sm:block animate-pulse-soft"
              />
              <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-slate-900 leading-[1.08]">
                <div className="overflow-hidden py-0.5">
                  <motion.span
                    initial={{ opacity: 0, y: "105%" }}
                    whileInView={{ opacity: 1, y: "0%" }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    LET'S BUILD SOMETHING
                  </motion.span>
                </div>
                <div className="overflow-hidden py-0.5">
                  <motion.span
                    initial={{ opacity: 0, y: "105%" }}
                    whileInView={{ opacity: 1, y: "0%" }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-purple-600 underline decoration-purple-300 decoration-wavy decoration-3 underline-offset-4"
                  >
                    YOUR BRAND DESERVES.
                  </motion.span>
                </div>
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8"
            >
              Whether you need high-retention video reels, an interactive 3D web platform, or full digital presence scaling, our team is ready to collaborate.
            </motion.p>

            {/* Direct Instant Action: WhatsApp CTA */}
            <div className="w-full p-6 rounded-[28px] bg-gradient-to-br from-emerald-50 via-white to-purple-50/40 border border-emerald-200/80 shadow-xs mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                    Instant WhatsApp Support
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    +91 {BRAND_CONFIG.contact.whatsapp}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 mb-4 font-normal">
                Prefer a quick conversation? Speak directly with our creative growth team.
              </p>

              <a
                href={BRAND_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                <MagneticButton
                  variant="dark"
                  maxMovement={10}
                  className="w-full justify-center text-xs font-bold uppercase tracking-wider gap-2 py-3.5 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>CHAT WITH US</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </a>
            </div>

            {/* Channels & Guarantee Badges */}
            <div className="flex flex-col gap-3 w-full text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                <span>
                  Official Email: <strong>{BRAND_CONFIG.contact.email}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-pink-600 shrink-0" />
                <span>
                  Official Instagram: <strong>{BRAND_CONFIG.contact.instagram}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1 text-slate-500">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Average response time: Under 2 hours during business hours.</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: PREMIUM ROUNDED CONTACT FORM CARD                */}
          {/* ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full"
          >
            <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200/90 p-7 sm:p-10 lg:p-12 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.08)] relative">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Project Inquiry Form
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                    Tell us about your brand and what you want to achieve.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  /* Success State View */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-2">
                      Inquiry Received!
                    </h4>
                    <p className="text-sm text-slate-600 max-w-sm mb-6 leading-relaxed">
                      Thank you for reaching out to Odisha Socials. Our team has received your project details and will contact you via WhatsApp / Email shortly.
                    </p>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setStatus("idle")}
                    >
                      <span>Send Another Inquiry</span>
                    </Button>
                  </motion.div>
                ) : (
                  /* Contact Form View */
                  <form key="form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Error Banner */}
                    {status === "error" && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 font-medium"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    {/* Hidden Honeypot Field */}
                    <input
                      type="text"
                      name="botcheck"
                      value={formData.botcheck}
                      onChange={handleChange}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Aditya Mohapatra"
                          required
                          className="w-full px-4 py-3 min-h-[48px] rounded-2xl border border-slate-200 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="aditya@example.com"
                          required
                          className="w-full px-4 py-3 min-h-[48px] rounded-2xl border border-slate-200 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Business */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="contact-phone" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. 9040834651"
                          required
                          className="w-full px-4 py-3 min-h-[48px] rounded-2xl border border-slate-200 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label htmlFor="contact-business" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Business / Brand Name *
                        </label>
                        <input
                          id="contact-business"
                          type="text"
                          name="business"
                          value={formData.business}
                          onChange={handleChange}
                          placeholder="e.g. Urban Crave / Biswa"
                          required
                          className="w-full px-4 py-3 min-h-[48px] rounded-2xl border border-slate-200 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50"
                        />
                      </div>
                    </div>

                    {/* Row 3: Message */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Project Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your brand goals, expected timeline, and what services you are interested in..."
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all bg-slate-50/50 resize-none"
                      />
                    </div>

                    {/* Submit Button with Loading State */}
                    <Button
                      type="submit"
                      variant="dark"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full justify-center mt-2 shadow-lg group cursor-pointer"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Transmitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Inquiry</span>
                          <Send className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    <p className="text-3xs text-slate-400 text-center mt-1">
                      Directly sent to <strong>odishasocials@gmail.com</strong>. Your details are never shared with third parties.
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
