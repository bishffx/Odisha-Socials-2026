"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import { BRAND_CONFIG } from "@/constants/brand";
import {
  Sparkles,
  Palette,
  Code2,
  Compass,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Layers,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LivingVisual,
  CreatorCharacterIllustration,
  DesignerCharacterIllustration,
  DeveloperCharacterIllustration,
} from "@/components/illustrations/living-assets";

interface CapabilityNode {
  id: string;
  name: string;
  tagline: string;
  color: "purple" | "pink" | "blue" | "amber" | "emerald";
  icon: typeof Sparkles;
  deliverables: string[];
}

const CAPABILITIES: CapabilityNode[] = [
  {
    id: "content",
    name: "CONTENT",
    tagline: "Viral Reels, Cinematic Video, & Magnetic Visual Narratives",
    color: "purple",
    icon: Sparkles,
    deliverables: ["High-retention Reels", "Visual Storytelling", "Brand Scripts"],
  },
  {
    id: "design",
    name: "DESIGN",
    tagline: "Human-Centric UI/UX & Cohesive Visual Identity",
    color: "pink",
    icon: Palette,
    deliverables: ["Modern Design Systems", "Tactile Micro-Interactions", "Motion Prototypes"],
  },
  {
    id: "web",
    name: "WEB",
    tagline: "Ultra-Fast Interactive & Spatial 3D Platforms",
    color: "blue",
    icon: Code2,
    deliverables: ["Next.js 16 Web Apps", "3D Web Experiences", "Sub-Second Edge Speed"],
  },
  {
    id: "strategy",
    name: "STRATEGY",
    tagline: "Market Positioning, Competitor Audits, & Funnel Architecture",
    color: "amber",
    icon: Compass,
    deliverables: ["Audience Intelligence", "Channel Roadmaps", "Data Analytics"],
  },
  {
    id: "growth",
    name: "GROWTH",
    tagline: "Predictable Scaling, Google SEO Dominance, & Brand Authority",
    color: "emerald",
    icon: TrendingUp,
    deliverables: ["Google SEO #1 Rankings", "Conversion Funnels", "Social Community Scaling"],
  },
];

export function BrandStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const convergenceRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeCapability, setActiveCapability] = useState<string>("content");

  // Scroll tracking across the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Dynamic progress transforms for the convergence effect
  const convergenceProgress = useTransform(scrollYProgress, [0.25, 0.65], [0, 1]);
  const nodeScale = useTransform(convergenceProgress, [0, 0.7, 1], [0.95, 1.05, 1]);
  const beamOpacity = useTransform(convergenceProgress, [0.1, 0.5], [0.2, 0.9]);
  const nexusGlow = useTransform(convergenceProgress, [0.3, 0.8], [0.4, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 bg-[#faf9fe] rounded-[36px] sm:rounded-[44px] my-10 border border-purple-100/60 overflow-hidden"
    >
      {/* Soft Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-blue-200/25 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* ================================================================ */}
        {/* 1. SECTION HEADER & MANIFESTO HEADLINE                            */}
        {/* ================================================================ */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <Badge variant="purple" withDot className="mb-5">
            <span>The Odisha Socials Philosophy</span>
          </Badge>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] mb-6">
            <div className="overflow-hidden py-0.5">
              <motion.span
                initial={{ opacity: 0, y: "110%" }}
                whileInView={{ opacity: 1, y: "0%" }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block text-slate-900"
              >
                YOUR BRAND.
              </motion.span>
            </div>
            <div className="overflow-hidden py-0.5">
              <motion.span
                initial={{ opacity: 0, y: "110%" }}
                whileInView={{ opacity: 1, y: "0%" }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="block text-slate-800"
              >
                YOUR STORY.
              </motion.span>
            </div>
            <div className="overflow-hidden py-0.5">
              <motion.span
                initial={{ opacity: 0, y: "110%" }}
                whileInView={{ opacity: 1, y: "0%" }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="relative inline-block text-purple-600"
              >
                YOUR DIGITAL PRESENCE.
                <SparkDoodle
                  variant="burst"
                  className="absolute -top-6 -right-7 w-7 h-7 text-amber-500 hidden sm:block animate-pulse-soft"
                />
              </motion.span>
            </div>
          </h2>

          <p className="text-lg sm:text-xl text-slate-700 font-medium max-w-2xl mx-auto mb-4 leading-relaxed">
            {BRAND_CONFIG.description}
          </p>

          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-normal">
            Most agencies operate in silos — separating content from websites, and design from conversion. At Odisha Socials, every touchpoint works in absolute unison.
          </p>
        </div>

        {/* ================================================================ */}
        {/* 2. THE 3-STAGE BRAND EVOLUTION ENGINE                            */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {/* Stage 1: Discover */}
          <Card
            variant="white"
            hoverEffect
            className="flex flex-col justify-between p-7 sm:p-8 rounded-[30px] border-purple-100 shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-purple-600/90 tracking-tighter">
                  01
                </span>
                <span className="text-2xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
                  Discovery
                </span>
              </div>

              {/* Ambient Living Creator Illustration */}
              <div className="flex justify-center my-2">
                <LivingVisual
                  duration={6.8}
                  amplitude={9}
                  rotation={3.2}
                  delay={0.2}
                  parallaxSpeed={0.2}
                >
                  <CreatorCharacterIllustration className="w-24 h-24" />
                </LivingVisual>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-3 text-center sm:text-left">
                We Discover Your Brand
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                We dissect your market, analyze competitor gaps, and unearth the unique voice and visual hooks that will captivate your dream audience.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-purple-700">
              <span>Audience Psychology & Research</span>
            </div>
          </Card>

          {/* Stage 2: Build */}
          <Card
            variant="white"
            hoverEffect
            className="flex flex-col justify-between p-7 sm:p-8 rounded-[30px] border-blue-100 shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-blue-600/90 tracking-tighter">
                  02
                </span>
                <span className="text-2xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                  Creation
                </span>
              </div>

              {/* Ambient Living Designer Illustration */}
              <div className="flex justify-center my-2">
                <LivingVisual
                  duration={7.6}
                  amplitude={10}
                  rotation={-3.8}
                  delay={0.8}
                  parallaxSpeed={0.25}
                >
                  <DesignerCharacterIllustration className="w-24 h-24" />
                </LivingVisual>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-3 text-center sm:text-left">
                We Build Your Ecosystem
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                We craft high-retention video reels, tactile UI/UX designs, sub-second interactive websites, and high-conversion landing pages that convert attention into equity.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-700">
              <span>Reels, 3D Web, & Systems</span>
            </div>
          </Card>

          {/* Stage 3: Recognise */}
          <Card
            variant="white"
            hoverEffect
            className="flex flex-col justify-between p-7 sm:p-8 rounded-[30px] border-emerald-100 shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-emerald-600/90 tracking-tighter">
                  03
                </span>
                <span className="text-2xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                  Scale
                </span>
              </div>

              {/* Ambient Living Developer & Growth Illustration */}
              <div className="flex justify-center my-2">
                <LivingVisual
                  duration={8.4}
                  amplitude={8}
                  rotation={2.6}
                  delay={1.4}
                  parallaxSpeed={0.2}
                >
                  <DeveloperCharacterIllustration className="w-24 h-24" />
                </LivingVisual>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-3 text-center sm:text-left">
                We Make It Recognised
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Through Google SEO supremacy, organic distribution, and loyal community building, we transform your brand from an option into the definitive choice.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700">
              <span>Dominant Reach & Retention</span>
            </div>
          </Card>
        </div>

        {/* ================================================================ */}
        {/* 3. CAPABILITY CONVERGENCE STAGE (SCROLL-TRIGGERED FUSION)          */}
        {/* ================================================================ */}
        <div
          ref={convergenceRef}
          className="relative rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.06)]"
        >
          {/* Stage Title */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-caption-badge text-purple-600 block mb-2">
              The Convergence Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              5 Disciplines. 1 Unified Powerhouse.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal">
              Scroll through or tap any pillar below to see how each capability channels into your brand's overarching Digital Presence.
            </p>
          </div>

          {/* Interactive Capability Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {CAPABILITIES.map((node) => {
              const Icon = node.icon;
              const isActive = activeCapability === node.id;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveCapability(node.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer select-none",
                    isActive
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{node.name}</span>
                </button>
              );
            })}
          </div>

          {/* Convergence Visual Diagram / Stage */}
          <div className="relative min-h-[360px] sm:min-h-[420px] rounded-[28px] bg-[#fbfaff] border border-purple-100/80 p-6 sm:p-8 flex flex-col items-center justify-between overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

            {/* Top Row: 5 Core Capability Nodes */}
            <div className="relative z-10 w-full grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-2">
              {CAPABILITIES.map((cap) => {
                const Icon = cap.icon;
                const isSelected = activeCapability === cap.id;

                const colorThemes = {
                  purple: "border-purple-200 bg-purple-50 text-purple-700",
                  pink: "border-pink-200 bg-pink-50 text-pink-700",
                  blue: "border-blue-200 bg-blue-50 text-blue-700",
                  amber: "border-amber-200 bg-amber-50 text-amber-700",
                  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
                };

                return (
                  <motion.div
                    key={cap.id}
                    animate={{
                      scale: isSelected ? 1.05 : 1,
                      y: isSelected ? -4 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    onClick={() => setActiveCapability(cap.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer",
                      colorThemes[cap.color],
                      isSelected
                        ? "shadow-md ring-2 ring-purple-400/50 bg-white"
                        : "opacity-85 hover:opacity-100 bg-white/70"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-2xs mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black tracking-wide">{cap.name}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Connecting Convergence Energy Beams (SVG Visual Lines) */}
            <div className="relative w-full h-24 sm:h-32 my-2 pointer-events-none flex items-center justify-center">
              <svg
                className="w-full h-full text-purple-400/60 overflow-visible"
                viewBox="0 0 500 120"
                preserveAspectRatio="none"
              >
                {/* 5 Converging Curve Beams */}
                <path
                  d="M50 0 C 50 60, 250 40, 250 120"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                  className="animate-pulse-soft opacity-70"
                />
                <path
                  d="M150 0 C 150 60, 250 50, 250 120"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  className="opacity-80"
                />
                <path
                  d="M250 0 L 250 120"
                  stroke="#7c3aed"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M350 0 C 350 60, 250 50, 250 120"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  className="opacity-80"
                />
                <path
                  d="M450 0 C 450 60, 250 40, 250 120"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                  className="animate-pulse-soft opacity-70"
                />
              </svg>
            </div>

            {/* Center Focal Nexus: "DIGITAL PRESENCE" */}
            <motion.div
              style={{ scale: nodeScale }}
              className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center"
            >
              {/* Converged Glowing Badge */}
              <div className="relative group">
                {/* Ambient Halo Pulse */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-soft" />

                <div className="relative flex items-center gap-2.5 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full bg-slate-950 text-white shadow-2xl border border-white/20">
                  <Zap className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce-gentle" />
                  <span className="text-base sm:text-xl font-black tracking-wider uppercase">
                    DIGITAL PRESENCE
                  </span>
                  <Sparkles className="w-4 h-4 text-purple-300" />
                </div>
              </div>

              {/* Dynamic Narrative of the active capability */}
              {(() => {
                const current =
                  CAPABILITIES.find((c) => c.id === activeCapability) || CAPABILITIES[0];
                return (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 flex flex-col items-center"
                  >
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mb-3 max-w-md">
                      {current.tagline}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2">
                      {current.deliverables.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-3xs sm:text-2xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
