"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { BRAND_CONFIG } from "@/constants/brand";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingPackage {
  id: string;
  name: string;
  price: string;
  period?: string;
  badge?: string;
  isPopular?: boolean;
  tagline: string;
  features: string[];
  ctaLabel: string;
  whatsappMessage: string;
}

const SOCIAL_PACKAGES: PricingPackage[] = [
  {
    id: "social-basic",
    name: "Basic Plan",
    price: "₹10,000",
    period: "/ month",
    tagline: "Essential consistency and organic reach for emerging local brands.",
    features: [
      "8 Viral Reels with dynamic captions",
      "4 High-converting feed posts",
      "Interactive Stories 3–4 times/week",
      "Dedicated creative hashtag & audio strategy",
      "Monthly performance telemetry report",
    ],
    ctaLabel: "Get Started with Basic",
    whatsappMessage: "Hi Odisha Socials! I am interested in the Basic Social Media Package (₹10,000/month).",
  },
  {
    id: "social-growth",
    name: "Popular Plan",
    price: "₹15,000",
    period: "/ month",
    badge: "Most Popular ✦ Recommended",
    isPopular: true,
    tagline: "Accelerated presence with on-location video shoots and Google local discoverability.",
    features: [
      "12 High-retention cinematic Reels",
      "2 On-location 4K professional shoots",
      "Weekly story sequencing & audience polls",
      "Google Business Profile optimization suggestions",
      "Competitor gap & viral hook reverse-engineering",
      "Priority creative direction & fast delivery",
    ],
    ctaLabel: "Choose Growth Package",
    whatsappMessage: "Hi Odisha Socials! I want to scale my brand with the Growth Package (₹15,000/month).",
  },
  {
    id: "social-premium",
    name: "Pro Plan",
    price: "₹20,000",
    period: "/ month",
    badge: "Maximum Impact",
    tagline: "Comprehensive content coverage, creative direction, and competitor supremacy.",
    features: [
      "16 Studio & on-location Reels",
      "2 Dedicated 4K production shoots",
      "Complete ambience & brand culture coverage",
      "In-depth competitor and audience research",
      "Multi-platform publishing distribution",
      "24/7 Priority creative WhatsApp line",
    ],
    ctaLabel: "Choose Premium Package",
    whatsappMessage: "Hi Odisha Socials! I am interested in the Premium Social Media Package (₹20,000/month).",
  },
];

const WEBSITE_PACKAGES: PricingPackage[] = [
  {
    id: "web-basic",
    name: "Basic Plan",
    price: "₹8,000",
    period: "one-time",
    tagline: "Sleek, responsive digital brochure engineered with modern mobile-first design.",
    features: [
      "Clean modern responsive website",
      "Mobile-first design architecture",
      "Essential business sections & services",
      "Direct WhatsApp & click-to-call integration",
      "Fast page load & SEO foundation",
    ],
    ctaLabel: "Build Basic Website",
    whatsappMessage: "Hi Odisha Socials! I would like to build a Basic Website (₹8,000).",
  },
  {
    id: "web-premium",
    name: "Popular Plan",
    price: "₹14,000",
    period: "one-time",
    badge: "Recommended Web",
    isPopular: true,
    tagline: "High-performance multi-page web platform engineered for brand authority and conversion.",
    features: [
      "High-performance multi-page platform",
      "Custom UI/UX brand design system",
      "Google SEO setup & search indexing",
      "Conversion-focused lead capture layout",
      "Sub-second speed & Core Web Vitals optimization",
      "Custom interactive animations & micro-motion",
    ],
    ctaLabel: "Build Premium Website",
    whatsappMessage: "Hi Odisha Socials! I want to build a Premium Website (₹14,000).",
  },
  {
    id: "web-premium-max",
    name: "Pro Plan",
    price: "₹20,000",
    period: "one-time",
    badge: "Next-Gen 3D & WebGL",
    tagline: "Immersive spatial 3D experience with cutting-edge interactive WebGL and scroll storytelling.",
    features: [
      "Three.js & WebGL spatial 3D elements",
      "Immersive scroll-driven storytelling interactions",
      "Fluid custom cursor physics & tactile micro-interactions",
      "Interactive product / portfolio showcases",
      "Next.js 16 full-stack architecture with enterprise security",
      "Lifetime Core Web Vitals performance guarantee",
    ],
    ctaLabel: "Build Premium Max 3D Site",
    whatsappMessage: "Hi Odisha Socials! I am interested in the Premium Max 3D Website (₹20,000).",
  },
];

export function PackagesSection() {
  const [activeTab, setActiveTab] = useState<"website" | "social">("website");

  const currentPackages = activeTab === "website" ? WEBSITE_PACKAGES : SOCIAL_PACKAGES;

  return (
    <div className="w-full py-12 sm:py-20 lg:py-24 px-3 sm:px-8 lg:px-12">
      {/* ================================================================ */}
      {/* LANDZY DARK PURPLE PRICING WRAPPER WITH RADIAL RADAR GLOWS       */}
      {/* Looks hyper-premium on both Mobile Touch and Desktop displays    */}
      {/* ================================================================ */}
      <div className="relative w-full rounded-[32px] sm:rounded-[44px] lg:rounded-[48px] bg-gradient-to-b from-[#0b0518] via-[#120827] to-[#090314] text-white p-6 sm:p-12 lg:p-16 border border-purple-500/20 shadow-[0_30px_90px_-20px_rgba(76,29,149,0.45)] overflow-hidden">
        {/* -------------------------------------------------------------- */}
        {/* CONCENTRIC RADAR RINGS & AMBIENT HOTSPOTS (Exact Landzy Theme) */}
        {/* -------------------------------------------------------------- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          {/* Central Radial Violet Glow */}
          <div className="absolute w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-purple-600/20 blur-[130px]" />
          <div className="absolute -top-32 w-[400px] h-[400px] rounded-full bg-fuchsia-600/15 blur-[120px]" />

          {/* Concentric Sonic / Radar Rings */}
          <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-purple-500/15" />
          <div className="absolute w-[600px] h-[600px] sm:w-[780px] sm:h-[780px] rounded-full border border-purple-500/10" />
          <div className="absolute w-[860px] h-[860px] sm:w-[1100px] sm:h-[1100px] rounded-full border border-purple-500/8" />
          <div className="absolute w-[1140px] h-[1140px] sm:w-[1450px] sm:h-[1450px] rounded-full border border-purple-500/5" />
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 1. SECTION HEADER                                              */}
        {/* -------------------------------------------------------------- */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge
            variant="purple"
            withDot
            className="mb-4 bg-purple-950/80 border-purple-500/40 text-purple-200 px-4 py-1.5 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
          >
            <span>Transparent Pricing ✦ No Hidden Charges</span>
          </Badge>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-purple-200 drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)]">
              Simple, straightforward pricing
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-purple-200/75 leading-relaxed font-normal max-w-2xl">
            Join ambitious brands that use Odisha Socials to dominate their digital presence. Pick the plan that fits your growth stage.
          </p>

          {/* Plan Switcher Toggle (Landzy Pill Capsule) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            role="tablist"
            aria-label="Package category selection"
            className="mt-7 sm:mt-9 p-1 rounded-full bg-[#180d32]/90 border border-purple-500/30 backdrop-blur-md inline-flex items-center gap-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)] max-w-full"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "website"}
              aria-label="Website Packages"
              onClick={() => setActiveTab("website")}
              className={cn(
                "px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer select-none min-h-[44px] flex items-center justify-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-400 active:scale-95",
                activeTab === "website"
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_24px_rgba(192,38,211,0.55)] border border-fuchsia-400/40"
                  : "text-purple-300/70 hover:text-white"
              )}
            >
              <span>Website Packages</span>
              <span className="text-3xs px-2 py-0.5 rounded-full bg-white/10 hidden sm:inline-block">₹8k / ₹14k / ₹20k</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "social"}
              aria-label="Social Media Packages"
              onClick={() => setActiveTab("social")}
              className={cn(
                "px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer select-none min-h-[44px] flex items-center justify-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-400 active:scale-95",
                activeTab === "social"
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_24px_rgba(192,38,211,0.55)] border border-fuchsia-400/40"
                  : "text-purple-300/70 hover:text-white"
              )}
            >
              <span>Social Media Packages</span>
              <span className="text-3xs px-2 py-0.5 rounded-full bg-white/10 hidden sm:inline-block">₹10k–₹20k/mo</span>
            </button>
          </motion.div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 2. PACKAGES GRID (EXACT LANDZY CARDS THEME)                    */}
        {/* -------------------------------------------------------------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-6xl mx-auto items-stretch"
          >
            {currentPackages.map((pkg, idx) => {
              const isPopular = pkg.isPopular;
              const pedestalDelay = 0.08 + idx * 0.1;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: isPopular ? 40 : 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: pedestalDelay, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: isPopular ? -10 : -6, scale: 1.015 }}
                  className={cn(
                    "relative rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 flex flex-col justify-between transition-[box-shadow,border-color] duration-300 backdrop-blur-2xl select-none overflow-hidden",
                    isPopular
                      ? "bg-gradient-to-b from-[#2a0e54]/95 via-[#1a0833]/95 to-[#100524]/98 border-2 border-purple-400/60 shadow-[0_0_60px_-10px_rgba(168,85,247,0.45)] lg:-translate-y-2 ring-1 ring-purple-300/30"
                      : "bg-[#130b24]/75 border border-purple-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:border-purple-400/40 hover:shadow-[0_20px_50px_rgba(124,58,237,0.2)]"
                  )}
                >
                  {/* Subtle Top Inner Sheen for the Popular Card */}
                  {isPopular && (
                    <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-purple-500/25 via-fuchsia-500/10 to-transparent rounded-t-[34px] pointer-events-none" />
                  )}

                  <div className="relative z-10">
                    {/* Top Plan Tag Pill (Landzy Style) */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={cn(
                          "px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                          isPopular
                            ? "bg-fuchsia-950/80 text-fuchsia-200 border border-fuchsia-400/50 shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                            : "bg-purple-950/70 text-purple-300 border border-purple-500/30"
                        )}
                      >
                        {pkg.name}
                      </span>

                      {isPopular && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-3xs font-extrabold uppercase tracking-widest bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-xs">
                          <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
                          <span>POPULAR</span>
                        </span>
                      )}
                    </div>

                    {/* Price Typography */}
                    <div className="flex items-baseline gap-1.5 mb-3">
                      <span
                        className={cn(
                          "text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white",
                          isPopular && "drop-shadow-[0_2px_15px_rgba(255,255,255,0.25)]"
                        )}
                      >
                        {pkg.price}
                      </span>
                      {pkg.period && (
                        <span className="text-xs sm:text-sm font-medium text-purple-300/70">
                          {pkg.period}
                        </span>
                      )}
                    </div>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm text-purple-200/70 font-normal leading-relaxed mb-6">
                      {pkg.tagline}
                    </p>

                    {/* Subtle Divider */}
                    <div className="w-full h-px bg-purple-500/15 mb-6" />

                    {/* Features List */}
                    <div className="mb-8">
                      <span className="text-3xs uppercase tracking-widest font-bold text-purple-400/80 block mb-3.5">
                        WHAT'S INCLUDED:
                      </span>
                      <ul className="flex flex-col gap-3">
                        {pkg.features.map((feature, fIdx) => (
                          <motion.li
                            key={fIdx}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: pedestalDelay + 0.1 + fIdx * 0.03 }}
                            className="flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-snug"
                          >
                            <CheckCircle2
                              className={cn(
                                "w-4 h-4 shrink-0 mt-0.5",
                                isPopular ? "text-fuchsia-400" : "text-purple-400"
                              )}
                            />
                            <span className={isPopular ? "text-white" : "text-purple-100/90"}>
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card CTA Button (Luminous Landzy Gradient on Popular, Sleek Frosted Glass on Standard) */}
                  <div className="relative z-10 pt-4">
                    <a
                      href={`https://wa.me/919040834651?text=${encodeURIComponent(
                        pkg.whatsappMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      {isPopular ? (
                        <button
                          type="button"
                          className="w-full justify-center min-h-[46px] py-3 px-6 rounded-full font-black text-xs sm:text-sm bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 hover:brightness-110 active:scale-[0.98] text-white border border-fuchsia-300/40 shadow-[0_0_30px_rgba(217,70,239,0.55)] transition-all flex items-center gap-2 group cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 text-white" />
                          <span>{pkg.ctaLabel}</span>
                          <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="w-full justify-center min-h-[46px] py-3 px-6 rounded-full font-bold text-xs sm:text-sm bg-white/5 hover:bg-white/10 active:scale-[0.98] text-purple-100 border border-purple-500/30 hover:border-purple-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all flex items-center gap-2 group cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 text-purple-400" />
                          <span>{pkg.ctaLabel}</span>
                          <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform text-purple-300" />
                        </button>
                      )}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* -------------------------------------------------------------- */}
        {/* 3. TRANSPARENT PAYMENT TERMS NOTE (Dark Glass Landzy Style)    */}
        {/* -------------------------------------------------------------- */}
        <div className="relative z-10 max-w-4xl mx-auto mt-12 sm:mt-16 bg-[#130b24]/80 border border-purple-500/25 rounded-2xl sm:rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-300">
              <ShieldCheck className="w-5 h-5 text-fuchsia-400" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-white block">
                Payment Terms & Guarantee
              </span>
              <p className="text-xs text-purple-300/80 mt-0.5">
                50% advance to initiate production + remaining balance upon milestone completion.
              </p>
            </div>
          </div>

          <a
            href={BRAND_CONFIG.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-fuchsia-300 hover:text-white shrink-0 flex items-center gap-1.5 transition-colors group"
          >
            <span>Need a customized plan? Chat with us</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
