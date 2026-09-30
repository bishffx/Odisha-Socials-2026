"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import {
  Sparkles,
  Palette,
  Code2,
  Compass,
  TrendingUp,
  Plus,
  Equal,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LivingVisual,
  CreatorCharacterIllustration,
  DesignerCharacterIllustration,
  DeveloperCharacterIllustration,
  PhoneReelsIllustration,
  AnalyticsSphereIllustration,
} from "@/components/illustrations/living-assets";

interface CapabilityBlock {
  id: string;
  name: string;
  title: string;
  icon: typeof Sparkles;
  role: string;
  color: "purple" | "pink" | "blue" | "amber" | "emerald";
  whyItMatters: string;
}

const CAPABILITY_PILLARS: CapabilityBlock[] = [
  {
    id: "content",
    name: "CONTENT",
    title: "Viral Video & Storytelling",
    icon: Sparkles,
    role: "Attracts Attention",
    color: "purple",
    whyItMatters:
      "Stops the scroll and hooks viewers within the first 3 seconds using proven retention structures.",
  },
  {
    id: "design",
    name: "DESIGN",
    title: "Modern UI/UX & Identity",
    icon: Palette,
    role: "Builds Trust",
    color: "pink",
    whyItMatters:
      "Creates immediate visual credibility. Clean spacing and rounded UI make your brand memorable.",
  },
  {
    id: "web",
    name: "WEB",
    title: "High-Performance Platforms",
    icon: Code2,
    role: "Converts Traffic",
    color: "blue",
    whyItMatters:
      "Sub-second load speeds and frictionless user journeys turn casual curiosity into confirmed inquiries.",
  },
  {
    id: "strategy",
    name: "STRATEGY",
    title: "Market Positioning",
    icon: Compass,
    role: "Directs Resources",
    color: "amber",
    whyItMatters:
      "Ensures every post, page, and campaign serves a clear commercial objective with zero wasted effort.",
  },
  {
    id: "growth",
    name: "GROWTH",
    title: "SEO & Telemetry",
    icon: TrendingUp,
    role: "Compounds Reach",
    color: "emerald",
    whyItMatters:
      "Dominates Google Search and algorithmic distribution to compound organic discovery month over month.",
  },
];

export function WhyOdishaSocialsSection() {
  const [hoveredId, setHoveredId] = useState<string>("content");

  const colorStyles = {
    purple: {
      border: "border-purple-200",
      bg: "bg-purple-50/70",
      text: "text-purple-700",
      pill: "bg-purple-100 text-purple-700",
      ring: "ring-purple-400",
    },
    pink: {
      border: "border-pink-200",
      bg: "bg-pink-50/70",
      text: "text-pink-700",
      pill: "bg-pink-100 text-pink-700",
      ring: "ring-pink-400",
    },
    blue: {
      border: "border-blue-200",
      bg: "bg-blue-50/70",
      text: "text-blue-700",
      pill: "bg-blue-100 text-blue-700",
      ring: "ring-blue-400",
    },
    amber: {
      border: "border-amber-200",
      bg: "bg-amber-50/70",
      text: "text-amber-700",
      pill: "bg-amber-100 text-amber-700",
      ring: "ring-amber-400",
    },
    emerald: {
      border: "border-emerald-200",
      bg: "bg-emerald-50/70",
      text: "text-emerald-700",
      pill: "bg-emerald-100 text-emerald-700",
      ring: "ring-emerald-400",
    },
  };

  const activePillar =
    CAPABILITY_PILLARS.find((p) => p.id === hoveredId) || CAPABILITY_PILLARS[0];

  return (
    <div className="w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 bg-[#faf9fe] rounded-[36px] sm:rounded-[44px] my-10 border border-purple-100/60 overflow-hidden">
      {/* ================================================================ */}
      {/* 1. SECTION INTRO                                                  */}
      {/* ================================================================ */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18">
        <Badge variant="purple" withDot className="mb-4">
          <span>The Integrated Difference ✦ Why Odisha Socials</span>
        </Badge>

        <div className="relative">
          <SparkDoodle
            variant="burst"
            className="absolute -top-7 -right-8 w-8 h-8 text-amber-500 hidden sm:block animate-pulse-soft"
          />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.18]">
            <div className="overflow-hidden py-0.5">
              <motion.span
                initial={{ opacity: 0, y: "105%" }}
                whileInView={{ opacity: 1, y: "0%" }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                One Integrated Ecosystem.
              </motion.span>
            </div>
            <div className="overflow-hidden py-0.5">
              <motion.span
                initial={{ opacity: 0, y: "105%" }}
                whileInView={{ opacity: 1, y: "0%" }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="block text-purple-600"
              >
                Zero Silos.
              </motion.span>
            </div>
          </h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl"
        >
          Most businesses hire a separate videographer, a separate web developer, and a separate SEO freelancer — leaving them with disconnected pieces that fail to convert.
        </motion.p>
      </div>

      {/* ================================================================ */}
      {/* 2. THE VISUAL EQUATION STAGE                                      */}
      {/* ================================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto mb-12 sm:mb-16"
      >
        <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200/90 p-6 sm:p-10 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.06)]">
          {/* Top Equation Row: 5 Pillars Joined By Plus Operators */}
          <div className="flex items-center gap-2 sm:gap-3 pb-6 sm:pb-8 border-b border-slate-100 overflow-x-auto scrollbar-none snap-x py-1 px-1 -mx-2 sm:mx-0 justify-start lg:justify-center">
            {CAPABILITY_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isHovered = hoveredId === pillar.id;
              const style = colorStyles[pillar.color];

              return (
                <div key={pillar.id} className="flex items-center gap-2 sm:gap-3 shrink-0 snap-center">
                  <motion.button
                    type="button"
                    onMouseEnter={() => setHoveredId(pillar.id)}
                    onClick={() => setHoveredId(pillar.id)}
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    aria-pressed={isHovered}
                    className={cn(
                      "flex flex-col items-center justify-center px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border transition-[background-color,border-color,box-shadow,opacity] duration-200 cursor-pointer select-none text-center min-w-[105px] sm:min-w-[125px] min-h-[48px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-600",
                      style.bg,
                      style.border,
                      isHovered
                        ? cn("shadow-md ring-2 bg-white", style.ring)
                        : "opacity-85 hover:opacity-100"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-2xs mb-1.5 sm:mb-2">
                      <Icon className={cn("w-4 h-4", style.text)} />
                    </div>
                    <span className="text-xs font-black tracking-wide text-slate-900">
                      {pillar.name}
                    </span>
                    <span className="text-3xs font-semibold text-slate-500 mt-0.5">
                      {pillar.role}
                    </span>
                  </motion.button>

                  {/* Plus Connector (between elements) */}
                  {idx < CAPABILITY_PILLARS.length - 1 && (
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 select-none" aria-hidden="true">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Nexus: Equal to DIGITAL PRESENCE */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 shadow-xs">
                <Equal className="w-5 h-5" />
              </div>

              <div>
                <span className="text-caption-badge text-purple-600 block">
                  The Resulting Superpower
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    DIGITAL PRESENCE
                  </span>
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Dynamic Card for Active Pillar with Living Visual */}
            <div className="w-full md:max-w-lg bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 overflow-hidden">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                  <span className="text-xs font-bold text-slate-900">
                    {activePillar.name} — {activePillar.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {activePillar.whyItMatters}
                </p>
              </div>

              {/* Living Illustration for Active Pillar */}
              <div className="shrink-0 hidden xs:block">
                <LivingVisual
                  duration={6.5}
                  amplitude={6}
                  rotation={3.0}
                  delay={0.2}
                  parallaxSpeed={0.15}
                >
                  {activePillar.id === "content" && <PhoneReelsIllustration className="w-14 h-18" />}
                  {activePillar.id === "design" && <DesignerCharacterIllustration className="w-16 h-16" />}
                  {activePillar.id === "web" && <DeveloperCharacterIllustration className="w-16 h-16" />}
                  {activePillar.id === "strategy" && <CreatorCharacterIllustration className="w-16 h-16" />}
                  {activePillar.id === "growth" && <AnalyticsSphereIllustration className="w-16 h-16" />}
                </LivingVisual>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================================================================ */}
      {/* 3. THREE GROUNDED CORE PROMISES                                   */}
      {/* ================================================================ */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="rounded-[26px] bg-white border border-slate-200/80 p-6 shadow-xs hover:border-purple-200 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1.5">
            Transparent Milestone Execution
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            No vague promises or opaque invoicing. Every deliverable is mapped to a clear review milestone with 50% advance terms.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="rounded-[26px] bg-white border border-slate-200/80 p-6 shadow-xs hover:border-blue-200 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
            <Code2 className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1.5">
            Production-Grade Engineering
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            We avoid brittle website templates. Our web experiences are built with Next.js 16, TypeScript, and sub-second edge speeds.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="rounded-[26px] bg-white border border-slate-200/80 p-6 shadow-xs hover:border-emerald-200 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1.5">
            End-to-End Creative Ownership
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            From the opening video hook to the final landing page checkout button, we ensure every touchpoint represents your brand at its best.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
