"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import {
  Search,
  Compass,
  Sparkles,
  Rocket,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStep {
  step: string;
  title: string;
  shortSummary: string;
  description: string;
  icon: typeof Search;
  color: "purple" | "blue" | "pink" | "amber" | "emerald";
  deliverables: string[];
  keyOutcome: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "DISCOVER",
    shortSummary: "Understand the brand.",
    description:
      "We dissect your brand's core DNA, authentic voice, audience psychology, and competitor landscape. We identify untapped market opportunities before writing a single word or line of code.",
    icon: Search,
    color: "purple",
    deliverables: [
      "Audience Persona Mapping",
      "Competitor Gap Analysis",
      "Brand Voice & Core Identity Extraction",
    ],
    keyOutcome: "A crystal-clear foundation and distinct market positioning.",
  },
  {
    step: "02",
    title: "STRATEGISE",
    shortSummary: "Find the right digital direction.",
    description:
      "We map an actionable multi-channel blueprint. From viral video reel content calendars to interactive website architecture and conversion funnels, every move is engineered for impact.",
    icon: Compass,
    color: "blue",
    deliverables: [
      "Content & Reel Pillar Roadmaps",
      "Information Architecture & Wireframes",
      "Omnichannel Distribution Strategy",
    ],
    keyOutcome: "A comprehensive roadmap eliminating guesswork and wasted budget.",
  },
  {
    step: "03",
    title: "CREATE",
    shortSummary: "Build content, visuals and experiences.",
    description:
      "Our creative and engineering studios swing into high gear. We write magnetic scripts, film high-retention 4K reels, design tactile modern interfaces, and develop sub-second interactive web apps.",
    icon: Sparkles,
    color: "pink",
    deliverables: [
      "Cinematic Video & Reel Production",
      "Modern UI/UX Design System",
      "Next.js 16 & 3D Interactive Development",
    ],
    keyOutcome: "Production-grade digital assets that command immediate attention.",
  },
  {
    step: "04",
    title: "LAUNCH",
    shortSummary: "Put everything into the world.",
    description:
      "We execute a synchronized rollout. Platforms go live with sub-second response times, Google SEO indexing kicks off, and viral content campaigns launch across target feeds.",
    icon: Rocket,
    color: "amber",
    deliverables: [
      "Google Search Console & SEO Deployment",
      "Multi-Platform Publishing Blitz",
      "Conversion Tracking & Analytics Live-Hook",
    ],
    keyOutcome: "Flawless deployment with zero downtime and instant reach.",
  },
  {
    step: "05",
    title: "GROW",
    shortSummary: "Measure, improve and scale.",
    description:
      "Digital presence is never static. We continuously analyze real-time viewer telemetry, optimize conversion funnels, run SEO keyword dominance audits, and scale your brand authority month over month.",
    icon: TrendingUp,
    color: "emerald",
    deliverables: [
      "Real-Time Telemetry & Funnel Audits",
      "Retention & Algorithm Adaptation",
      "Scalable Audience Community Building",
    ],
    keyOutcome: "Predictable, compounding revenue and sustained category leadership.",
  },
];

export function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll storytelling: As the user scrolls across the process section,
  // stages 01 -> 02 -> 03 -> 04 -> 05 activate smoothly in sequence
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 35%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(4, Math.max(0, Math.floor(latest * 5)));
    setActiveStepIndex(step);
  });

  const currentStep = PROCESS_STEPS[activeStepIndex];
  const IconComponent = currentStep.icon;

  const colorThemes = {
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
      activeTab: "bg-purple-600 text-white shadow-purple-500/25",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
      activeTab: "bg-blue-600 text-white shadow-blue-500/25",
    },
    pink: {
      bg: "bg-pink-100",
      text: "text-pink-600",
      border: "border-pink-200",
      activeTab: "bg-pink-600 text-white shadow-pink-500/25",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      border: "border-amber-200",
      activeTab: "bg-amber-600 text-white shadow-amber-500/25",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-200",
      activeTab: "bg-emerald-600 text-white shadow-emerald-500/25",
    },
  };

  return (
    <div
      ref={sectionRef}
      className="w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 bg-[#faf9fe] rounded-[36px] sm:rounded-[44px] my-10 border border-purple-100/60 overflow-hidden"
    >
      {/* ================================================================ */}
      {/* 1. SECTION INTRO                                                  */}
      {/* ================================================================ */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
        <Badge variant="purple" withDot className="mb-4">
          <span>How We Work ✦ 5-Step Process</span>
        </Badge>

        <div className="relative">
          <SparkDoodle
            variant="burst"
            className="absolute -top-7 -right-8 w-8 h-8 text-amber-500 hidden sm:block animate-pulse-soft"
          />
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.18]"
            >
              A Structured Creative Journey
            </motion.h2>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl"
        >
          We don't rely on random viral luck. Our 5-stage framework ensures every brand we touch transitions smoothly from raw idea to market authority.
        </motion.p>
      </div>

      {/* ================================================================ */}
      {/* 2. INTERACTIVE HORIZONTAL TIMELINE BAR                           */}
      {/* ================================================================ */}
      <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
        <div className="relative flex items-center justify-between">
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full" />

          {/* Active Filled Progress Line (GPU-accelerated scaleX transform) */}
          <motion.div
            className="absolute top-1/2 left-4 right-4 h-1 bg-purple-600 -translate-y-1/2 z-0 rounded-full origin-left will-change-transform"
            animate={{
              scaleX: activeStepIndex / (PROCESS_STEPS.length - 1),
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* 5 Step Indicator Nodes */}
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const isCompleted = activeStepIndex > idx;

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                aria-label={`Step ${step.step}: ${step.title}`}
                aria-current={isActive ? "step" : undefined}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-600 rounded-full p-1 -m-1 min-w-[44px] min-h-[44px] justify-center"
              >
                <div
                  className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 border-2 select-none",
                    isActive
                      ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/30 scale-110"
                      : isCompleted
                      ? "bg-purple-100 text-purple-700 border-purple-300"
                      : "bg-white text-slate-500 border-slate-300 hover:border-purple-300 hover:text-slate-800"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  ) : (
                    <span>{step.step}</span>
                  )}
                </div>

                <span
                  className={cn(
                    "hidden sm:block text-xs font-bold mt-2 uppercase tracking-wider transition-colors",
                    isActive
                      ? "text-purple-700"
                      : "text-slate-500 group-hover:text-slate-800"
                  )}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================================================================ */}
      {/* 3. DYNAMIC STAGE CARD SHOWCASE                                   */}
      {/* ================================================================ */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.step}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="rounded-[32px] sm:rounded-[38px] bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.08)] relative overflow-hidden"
          >
            {/* Giant Background Number Outline */}
            <span className="absolute -bottom-6 -right-6 text-9xl font-black text-slate-100/70 select-none pointer-events-none tracking-tighter">
              {currentStep.step}
            </span>

            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8 sm:gap-10">
              <div className="flex-1">
                {/* Step Kicker */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border",
                      colorThemes[currentStep.color].bg,
                      colorThemes[currentStep.color].text,
                      colorThemes[currentStep.color].border
                    )}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-caption-badge text-purple-600 block">
                      STAGE {currentStep.step}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {currentStep.title}
                    </h3>
                  </div>
                </div>

                {/* Short Summary & Description */}
                <p className="text-base sm:text-lg font-bold text-slate-800 mb-3">
                  {currentStep.shortSummary}
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-8">
                  {currentStep.description}
                </p>

                {/* Key Outcome */}
                <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 mb-6">
                  <span className="text-2xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Definitive Milestone
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{currentStep.keyOutcome}</span>
                  </p>
                </div>
              </div>

              {/* Deliverables Checklist Column */}
              <div className="md:w-72 bg-[#fcfbfe] border border-purple-100/80 rounded-2xl p-6 shrink-0 flex flex-col justify-between">
                <div>
                  <span className="text-caption-badge text-purple-700 block mb-3">
                    Deliverables Included
                  </span>
                  <ul className="flex flex-col gap-3">
                    {currentStep.deliverables.map((item, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium leading-snug"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Advance Button */}
                <div className="mt-8 pt-4 border-t border-purple-100/60 flex items-center justify-between">
                  {activeStepIndex < PROCESS_STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setActiveStepIndex((prev) => prev + 1)}
                      className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Next: {PROCESS_STEPS[activeStepIndex + 1].title}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <span>Ready to Launch</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
