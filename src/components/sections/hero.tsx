"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import { BRAND_CONFIG, HERO_METRICS } from "@/constants/brand";
import { gsap, ScrollTrigger } from "@/lib/motion";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Globe,
  Star,
  Layers,
  MousePointer2,
} from "lucide-react";
import {
  LivingVisual,
  CinematicCameraIllustration,
  PhoneReelsIllustration,
  AbstractGeometricIllustration,
} from "@/components/illustrations/living-assets";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const cursorChipRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  // ===========================================================================
  // 1. JITTER-FREE MOUSE PARALLAX (GSAP quickTo INTERPOLATION)
  // ===========================================================================
  useEffect(() => {
    if (shouldReduceMotion || typeof window === "undefined") return;

    // On mobile devices under 640px, skip mouse tracking
    const isSmallMobile = window.innerWidth < 640;
    if (isSmallMobile) return;

    const container = containerRef.current;
    if (!container) return;

    // Setup high-performance hardware-accelerated quickTo setters
    const glowX = glowRef.current ? gsap.quickTo(glowRef.current, "x", { duration: 0.8, ease: "power3.out" }) : null;
    const glowY = glowRef.current ? gsap.quickTo(glowRef.current, "y", { duration: 0.8, ease: "power3.out" }) : null;

    const phoneX = phoneRef.current ? gsap.quickTo(phoneRef.current, "x", { duration: 0.7, ease: "power3.out" }) : null;
    const phoneY = phoneRef.current ? gsap.quickTo(phoneRef.current, "y", { duration: 0.7, ease: "power3.out" }) : null;

    const browserX = browserRef.current ? gsap.quickTo(browserRef.current, "x", { duration: 0.65, ease: "power3.out" }) : null;
    const browserY = browserRef.current ? gsap.quickTo(browserRef.current, "y", { duration: 0.65, ease: "power3.out" }) : null;

    const analyticsX = analyticsRef.current ? gsap.quickTo(analyticsRef.current, "x", { duration: 0.75, ease: "power3.out" }) : null;
    const analyticsY = analyticsRef.current ? gsap.quickTo(analyticsRef.current, "y", { duration: 0.75, ease: "power3.out" }) : null;

    const cameraX = cameraRef.current ? gsap.quickTo(cameraRef.current, "x", { duration: 0.7, ease: "power3.out" }) : null;
    const cameraY = cameraRef.current ? gsap.quickTo(cameraRef.current, "y", { duration: 0.7, ease: "power3.out" }) : null;

    const cursorChipX = cursorChipRef.current ? gsap.quickTo(cursorChipRef.current, "x", { duration: 0.6, ease: "power3.out" }) : null;
    const cursorChipY = cursorChipRef.current ? gsap.quickTo(cursorChipRef.current, "y", { duration: 0.6, ease: "power3.out" }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      // Sensitivity tuning per depth layer
      glowX?.(normX * 22);
      glowY?.(normY * 18);

      phoneX?.(normX * -20);
      phoneY?.(normY * -16);

      browserX?.(normX * 36);
      browserY?.(normY * 28);

      analyticsX?.(normX * -38);
      analyticsY?.(normY * -30);

      cameraX?.(normX * -28);
      cameraY?.(normY * 34);

      cursorChipX?.(normX * 46);
      cursorChipY?.(normY * -24);
    };

    const handleMouseLeave = () => {
      // Smooth spring return to rest coordinates
      glowX?.(0);
      glowY?.(0);
      phoneX?.(0);
      phoneY?.(0);
      browserX?.(0);
      browserY?.(0);
      analyticsX?.(0);
      analyticsY?.(0);
      cameraX?.(0);
      cameraY?.(0);
      cursorChipX?.(0);
      cursorChipY?.(0);
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  // ===========================================================================
  // 2. SCROLL DEPTH PARALLAX SCRUBBING
  // ===========================================================================
  useEffect(() => {
    if (shouldReduceMotion || typeof window === "undefined") return;

    const isSmallMobile = window.innerWidth < 640;

    const ctx = gsap.context(() => {
      // Headline subtly scales down and eases upward as user scrolls away
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          y: isSmallMobile ? -15 : -35,
          scale: isSmallMobile ? 0.99 : 0.94,
          opacity: isSmallMobile ? 0.95 : 0.86,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Visual ecosystem depth shifts at distinct velocities
      if (!isSmallMobile) {
        if (browserRef.current) {
          gsap.to(browserRef.current, {
            y: -75,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        if (analyticsRef.current) {
          gsap.to(analyticsRef.current, {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        if (cursorChipRef.current) {
          gsap.to(cursorChipRef.current, {
            y: -90,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden pt-4 sm:pt-10 pb-10 sm:pb-16 px-3 sm:px-8 lg:px-12"
    >
      {/* ==================================================================== */}
      {/* 1. HERO MAIN STAGE (TWO-COLUMN INTERACTIVE ECOSYSTEM)                */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center max-w-7xl mx-auto">
        {/* ------------------------------------------------------------------ */}
        {/* LEFT COLUMN: BRAND HEADLINE & POSITIONING                          */}
        {/* ------------------------------------------------------------------ */}
        <div ref={headlineRef} className="lg:col-span-6 flex flex-col items-start text-left z-20 will-change-transform">
          {/* STEP 4A: Animated Kicker Badge (t = 0.35s) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 sm:mb-6"
          >
            <Badge variant="purple" withDot className="px-3.5 py-1.5 text-xs sm:text-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Full-Stack Digital Growth Studio</span>
            </Badge>
          </motion.div>

          {/* Primary Staggered Headline (t = 0.40s - 0.54s) */}
          <div className="relative mb-5 sm:mb-6 w-full">
            {/* Playful Decorative Doodle Spark (t = 1.25s) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.25, type: "spring", damping: 14, stiffness: 220 }}
              className="absolute -top-7 -left-4 sm:-left-6 hidden sm:block pointer-events-none"
            >
              <SparkDoodle variant="burst" className="w-8 h-8 text-amber-500 animate-pulse-soft" />
            </motion.div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              {/* STEP 4B: Line Reveal 1: "WE BUILD" */}
              <div className="overflow-hidden py-0.5 sm:py-1">
                <motion.span
                  initial={{ opacity: 0, y: "115%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-slate-900"
                >
                  WE BUILD
                </motion.span>
              </div>

              {/* STEP 4C: Line Reveal 2: "DIGITAL PRESENCE." */}
              <div className="overflow-hidden py-0.5 sm:py-1">
                <motion.span
                  initial={{ opacity: 0, y: "115%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{ duration: 0.7, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
                  className="relative inline-block text-purple-600 underline decoration-purple-300 decoration-wavy decoration-2 sm:decoration-3 underline-offset-4"
                >
                  DIGITAL PRESENCE.
                </motion.span>
              </div>
            </h1>

            {/* Subtle loop doodle (t = 1.25s) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="absolute -bottom-8 right-6 hidden md:block pointer-events-none"
            >
              <SparkDoodle variant="loop" className="w-12 h-8 text-purple-400" />
            </motion.div>
          </div>

          {/* STEP 5: Supporting Text Reveals (t = 0.65s & 0.75s) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl font-medium text-slate-800 leading-snug mb-2.5 max-w-xl"
          >
            {BRAND_CONFIG.description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-10 max-w-lg font-normal"
          >
            Social media, content, websites, design and digital growth — brought together to make your brand impossible to ignore.
          </motion.p>

          {/* STEP 6: Interactive CTA Buttons Reveal (t = 0.85s) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto"
          >
            {/* WORK WITH US Button */}
            <a
              href={BRAND_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <MagneticButton
                variant="dark"
                className="w-full sm:w-auto min-h-[48px] justify-center shadow-[0_12px_28px_rgba(15,23,42,0.25)] text-sm"
              >
                <span>WORK WITH US</span>
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              </MagneticButton>
            </a>

            {/* EXPLORE OUR WORK Button */}
            <a href="#work" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-h-[48px] justify-center border-2 border-slate-200 hover:border-slate-300 group shadow-xs hover:bg-slate-50 text-sm"
              >
                <span>EXPLORE OUR WORK</span>
                <ArrowRight className="w-4 h-4 ml-1 text-slate-700 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
            </a>
          </motion.div>

          {/* Social Proof Avatars & Metric Rating (t = 0.95s) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="flex items-center gap-3 pt-1"
          >
            <div className="flex -space-x-2.5 overflow-hidden">
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-purple-500 text-white text-xs font-bold flex items-center justify-center">
                BJ
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                UC
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-pink-500 text-white text-xs font-bold flex items-center justify-center">
                RS
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                SP
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-800 ml-1">4.9/5</span>
              </div>
              <span className="text-2xs text-slate-500 font-medium">
                100+ Brands Scaled & Growing
              </span>
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* RIGHT COLUMN: RICH INTERACTIVE VISUAL ECOSYSTEM                     */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:col-span-6 relative flex items-center justify-center py-6 sm:py-8 lg:py-0 min-h-[380px] xs:min-h-[440px] sm:min-h-[560px] overflow-hidden lg:overflow-visible">
          {/* STEP 1: Ambient Radial Glow (t = 0.05s) */}
          <div
            ref={glowRef}
            data-camera-depth="background"
            className="absolute w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-gradient-to-tr from-purple-200/40 via-blue-200/30 to-pink-200/40 blur-3xl pointer-events-none -z-10 will-change-transform animate-pulse-soft"
          />

          {/* ================================================================ */}
          {/* STEP 3 & STEP 8: CENTRAL CORE (PHONE + REEL SHOWCASE) (t = 0.25s)  */}
          {/* ================================================================ */}
          <div ref={phoneRef} className="relative z-10 w-full max-w-[240px] xs:max-w-[270px] sm:max-w-[310px] will-change-transform">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Calm organic ambient floating loop for phone */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                className="relative rounded-[34px] sm:rounded-[38px] p-2 bg-gradient-to-b from-slate-800 via-slate-900 to-black shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)] border border-slate-700/60"
              >
                {/* Phone Screen Container */}
                <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden aspect-[9/18] bg-slate-950">
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-2 inset-x-0 mx-auto w-20 sm:w-24 h-4 sm:h-5 bg-black rounded-full z-30 flex items-center justify-between px-2 sm:px-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-800" />
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-500/80 animate-pulse" />
                  </div>

                  {/* Status Bar */}
                  <div className="absolute top-1.5 inset-x-3 sm:inset-x-4 flex justify-between items-center text-3xs text-white/80 font-bold z-20">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2 bg-white/80 rounded-xs" />
                    </div>
                  </div>

                  {/* Reel Image Showcase */}
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hero_reel_showcase.jpg"
                      alt="Odisha Socials Viral Reel Production"
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 320px"
                    />

                    {/* Overlaid UI Badges on Screen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 flex flex-col justify-end p-3 sm:p-4 text-white z-10 pointer-events-none">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-ping" />
                        <span className="text-3xs sm:text-2xs font-extrabold uppercase tracking-wider bg-red-600/90 px-1.5 py-0.5 rounded-full">
                          Trending Reel
                        </span>
                        <span className="text-3xs sm:text-2xs text-slate-300 font-medium">124K Views</span>
                      </div>

                      <p className="text-2xs sm:text-xs font-bold leading-snug text-white">
                        Odisha Socials — Viral Content That Converts
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ================================================================ */}
          {/* STEP 7A: FLOATING SATELLITE 1: WEBSITE BROWSER WINDOW (t = 0.90s) */}
          {/* ================================================================ */}
          <div
            ref={browserRef}
            data-camera-depth="foreground"
            className="absolute top-0 sm:-top-8 right-1 sm:-right-8 z-20 w-40 xs:w-48 sm:w-60 will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 25, y: -15 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.65, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Independent calm floating & gentle rotation */}
              <motion.div
                animate={shouldReduceMotion ? undefined : {
                  y: [0, -10, 0],
                  rotate: [-1.2, 1.2, -1.2],
                }}
                transition={{
                  duration: 6.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="bg-white/95 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3 shadow-[0_16px_36px_-8px_rgba(15,23,42,0.14)] border border-slate-200/90 select-none"
              >
                {/* Browser Header Bar */}
                <div className="flex items-center gap-1 pb-1.5 sm:pb-2 border-b border-slate-100">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-400" />
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400" />
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400" />
                  <div className="ml-1 sm:ml-2 flex-1 bg-slate-100 rounded-full px-1.5 py-0.5 text-3xs text-slate-500 font-medium flex items-center justify-between">
                    <span className="truncate">odishasocials.com</span>
                    <Globe className="w-2 h-2 text-slate-400 shrink-0 ml-1" />
                  </div>
                </div>

                {/* Browser Body Mockup */}
                <div className="mt-1.5 sm:mt-2 flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                    <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xs sm:text-xs font-bold text-slate-900 leading-tight">
                      Interactive 3D Web
                    </span>
                    <span className="text-3xs text-emerald-600 font-semibold mt-0.5">
                      ✦ 99.8% Speed Score
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ================================================================ */}
          {/* STEP 7B: FLOATING SATELLITE 2: ANALYTICS GROWTH CARD (t = 1.00s)   */}
          {/* ================================================================ */}
          <div
            ref={analyticsRef}
            data-camera-depth="foreground"
            className="absolute bottom-0 sm:-bottom-8 left-1 sm:-left-10 z-20 w-44 xs:w-52 sm:w-64 will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -25, y: 15 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.65, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Independent vertical float with soft scale pulse */}
              <motion.div
                animate={shouldReduceMotion ? undefined : {
                  y: [0, 8, 0],
                  scale: [1, 1.015, 1],
                }}
                transition={{
                  duration: 5.6,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="bg-white/95 backdrop-blur-xs rounded-2xl p-2.5 sm:p-4 shadow-[0_18px_40px_-10px_rgba(15,23,42,0.16)] border border-slate-200/90 select-none"
              >
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                    </div>
                    <span className="text-2xs sm:text-xs font-bold text-slate-800">Growth Velocity</span>
                  </div>
                  <span className="text-3xs sm:text-2xs font-extrabold text-emerald-600 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-200/50">
                    +340%
                  </span>
                </div>

                {/* Simulated Vector Trend Curve */}
                <svg
                  className="w-full h-7 sm:h-10 text-emerald-500 overflow-visible"
                  viewBox="0 0 100 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 25 C20 22, 35 18, 50 14 C65 10, 80 4, 100 2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="2" r="3" fill="#10b981" />
                </svg>

                <div className="flex items-center justify-between text-3xs text-slate-400 font-medium mt-0.5 sm:mt-1">
                  <span>Follower Reach</span>
                  <span>Conversion Funnel</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ================================================================ */}
          {/* STEP 7C: FLOATING SATELLITE 3: 3D CAMERA CHIP (t = 1.10s)         */}
          {/* ================================================================ */}
          <div
            ref={cameraRef}
            data-camera-depth="foreground"
            className="absolute top-10 sm:top-14 -left-2 sm:-left-8 z-20 hidden xs:block will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.75, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Independent slow tilt & float */}
              <motion.div
                animate={shouldReduceMotion ? undefined : {
                  y: [0, -8, 0],
                  rotate: [2, -2, 2],
                }}
                transition={{
                  duration: 6.8,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 1.2,
                }}
                className="flex items-center gap-2 bg-white/95 backdrop-blur-xs rounded-2xl p-2 sm:p-2.5 pr-3 sm:pr-4 shadow-[0_12px_30px_rgba(15,23,42,0.12)] border border-slate-200 select-none"
              >
                <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-xs border border-purple-100 bg-purple-50">
                  <Image
                    src="/images/hero_3d_camera.jpg"
                    alt="4K Reel Camera Studio"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 36px, 44px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xs sm:text-xs font-bold text-slate-900 leading-tight">
                    Cinematic Reels
                  </span>
                  <span className="text-3xs text-purple-600 font-semibold">
                    Studio Quality
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ================================================================ */}
          {/* STEP 7D: FLOATING SATELLITE 4: CURSOR LAUNCH CHIP (t = 1.20s)     */}
          {/* ================================================================ */}
          <div
            ref={cursorChipRef}
            data-camera-depth="foreground"
            className="absolute bottom-6 sm:bottom-12 -right-2 sm:-right-6 z-20 hidden xs:block will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.75, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Independent quick floating and pinging radar pulse */}
              <motion.div
                animate={shouldReduceMotion ? undefined : {
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4.4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="flex items-center gap-1.5 sm:gap-2 bg-slate-900 text-white rounded-full py-1.5 sm:py-2 px-3 sm:px-3.5 shadow-xl select-none"
              >
                <MousePointer2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400 fill-purple-400" />
                <span className="text-3xs sm:text-xs font-bold tracking-wide">Brand Launching...</span>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
              </motion.div>
            </motion.div>
          </div>

          {/* Living Visual Ambient Animated Suite (Different durations, delays, amplitudes & subtle rotation) */}
          <div className="absolute -top-6 -right-6 pointer-events-none hidden xl:block z-15">
            <LivingVisual
              duration={7.2}
              amplitude={12}
              rotation={4.2}
              delay={0.3}
              parallaxSpeed={0.35}
              mouseStrength={14}
            >
              <CinematicCameraIllustration className="w-20 h-20 opacity-90 drop-shadow-xl" />
            </LivingVisual>
          </div>

          <div className="absolute -bottom-8 -right-8 pointer-events-none hidden lg:block z-15">
            <LivingVisual
              duration={8.4}
              amplitude={10}
              rotation={-3.5}
              delay={1.1}
              parallaxSpeed={0.25}
              mouseStrength={10}
            >
              <AbstractGeometricIllustration variant="torus" className="w-14 h-14 opacity-80" />
            </LivingVisual>
          </div>

          <div className="absolute top-2 right-1/4 pointer-events-none hidden sm:block">
            <LivingVisual
              duration={5.6}
              amplitude={8}
              rotation={3.0}
              delay={0.8}
              parallaxSpeed={0.15}
            >
              <AbstractGeometricIllustration variant="star" className="w-7 h-7 text-amber-400 opacity-80" />
            </LivingVisual>
          </div>

          <div className="absolute bottom-4 left-1/3 pointer-events-none hidden sm:block">
            <LivingVisual
              duration={6.7}
              amplitude={7}
              rotation={-2.8}
              delay={1.6}
              parallaxSpeed={0.2}
            >
              <SparkDoodle variant="loop" className="w-10 h-6 text-purple-400 opacity-60" />
            </LivingVisual>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. DOCKED HERO METRICS BANNER (RESPONSIVE 2X2 ON MOBILE, 4X1 DESKTOP) */}
      {/* ==================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 sm:mt-16 lg:mt-20 max-w-6xl mx-auto"
      >
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white p-4 sm:p-8 shadow-[0_20px_50px_-12px_rgba(29,78,216,0.35)] border border-white/15">
          {/* Subtle Ambient Banner Glows */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {HERO_METRICS.map((metric, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center justify-center text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 group cursor-default"
              >
                <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white group-hover:text-purple-200 transition-colors">
                  {metric.value}
                </span>
                <span className="text-2xs sm:text-xs font-semibold text-blue-100/90 mt-1 max-w-[140px] leading-tight">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
