"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import { BRAND_CONFIG } from "@/constants/brand";
import {
  Share2,
  Code2,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Search,
  ChevronDown,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceFamily {
  id: string;
  familyTitle: string;
  badge: string;
  badgeVariant: "purple" | "blue" | "emerald";
  tagline: string;
  description: string;
  icon: typeof Share2;
  imageSrc: string;
  imageAlt: string;
  services: string[];
  secondaryInfo: {
    heading: string;
    metrics: string;
    deliverables: string[];
  };
  theme: {
    cardBg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    accentGlow: string;
  };
}

const SERVICE_FAMILIES: ServiceFamily[] = [
  {
    id: "social-content",
    familyTitle: "Social Media & Content",
    badge: "Viral Engagement & Storytelling",
    badgeVariant: "purple",
    tagline: "High-retention video reels, cinematic visuals, and community obsession.",
    description:
      "We turn casual scrollers into loyal brand evangelists. From viral hook scripting to multi-platform publishing and creator partnerships, your feed becomes a cultural magnet.",
    icon: Share2,
    imageSrc: "/images/hero_reel_showcase.jpg",
    imageAlt: "Odisha Socials Social Media & Content Production",
    services: [
      "Social Media Management",
      "Reels",
      "Posts",
      "Stories",
      "Content Creation",
      "Content Strategy",
      "Brand Content",
      "Creator Management",
    ],
    secondaryInfo: {
      heading: "Production & Distribution Standard",
      metrics: "Average 4.8x organic reach increase within 60 days",
      deliverables: [
        "4K Cinematic Video Production",
        "Viral Scripting & Trend Analysis",
        "Daily Community Engagement & DM Funneling",
        "Consistent Visual Brand Identity",
      ],
    },
    theme: {
      cardBg: "hover:bg-gradient-to-br hover:from-purple-50/90 hover:via-white hover:to-pink-50/60",
      border: "border-purple-200/70 hover:border-purple-300",
      iconBg: "bg-purple-100 group-hover:bg-purple-600",
      iconColor: "text-purple-600 group-hover:text-white",
      accentGlow: "rgba(124, 58, 237, 0.15)",
    },
  },
  {
    id: "website-digital-experience",
    familyTitle: "Website & Digital Experience",
    badge: "High-Performance Modern Web",
    badgeVariant: "blue",
    tagline: "Sub-second load speeds, tactile micro-interactions, and 3D web environments.",
    description:
      "We engineer web platforms that mesmerize your visitors and convert traffic with clockwork precision. Built with Next.js 16, TypeScript, and immersive spatial 3D elements.",
    icon: Code2,
    imageSrc: "/images/service_web_mockup.jpg",
    imageAlt: "Odisha Socials Interactive Website Development",
    services: [
      "Website Development",
      "UI/UX Design",
      "Interactive Websites",
      "3D Websites",
      "Landing Pages",
      "Digital Experiences",
    ],
    secondaryInfo: {
      heading: "Engineering & Speed Architecture",
      metrics: "99.8% Core Web Vitals score with sub-second edge response",
      deliverables: [
        "Custom Next.js & React 19 Architecture",
        "Three.js & Interactive 3D Canvas",
        "Tactile Motion & Micro-Interactions",
        "Mobile-First Responsive Conversion Flow",
      ],
    },
    theme: {
      cardBg: "hover:bg-gradient-to-br hover:from-blue-50/90 hover:via-white hover:to-indigo-50/60",
      border: "border-blue-200/70 hover:border-blue-300",
      iconBg: "bg-blue-100 group-hover:bg-blue-600",
      iconColor: "text-blue-600 group-hover:text-white",
      accentGlow: "rgba(37, 99, 235, 0.15)",
    },
  },
  {
    id: "digital-growth",
    familyTitle: "Digital Growth",
    badge: "Data-Driven Market Dominance",
    badgeVariant: "emerald",
    tagline: "Google dominance, actionable market intelligence, and predictable ROI.",
    description:
      "We replace guesswork with ruthless algorithmic precision. Rank at the top of Google Search, out-position competitors, and track every lead to revenue with live telemetry.",
    icon: TrendingUp,
    imageSrc: "/images/service_growth_mockup.jpg",
    imageAlt: "Odisha Socials Digital Growth & SEO Analytics",
    services: [
      "Google SEO Analysis",
      "Google Business Profile",
      "Competitor Research",
      "Analytics",
      "Digital Strategy",
      "Brand Growth",
    ],
    secondaryInfo: {
      heading: "Growth Telemetry & Positioning",
      metrics: "Top 3 Google search rankings & +340% organic discovery",
      deliverables: [
        "Exhaustive Technical & On-Page SEO Audits",
        "Google Business Dominance & Local Citation Setup",
        "Competitor Reverse-Engineering & Market Gaps",
        "Transparent Real-Time ROI Analytics Dashboards",
      ],
    },
    theme: {
      cardBg: "hover:bg-gradient-to-br hover:from-emerald-50/90 hover:via-white hover:to-amber-50/60",
      border: "border-emerald-200/70 hover:border-emerald-300",
      iconBg: "bg-emerald-100 group-hover:bg-emerald-600",
      iconColor: "text-emerald-600 group-hover:text-white",
      accentGlow: "rgba(16, 185, 129, 0.15)",
    },
  },
];

interface InteractiveServiceCardProps {
  family: ServiceFamily;
  idx: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function InteractiveServiceCard({
  family,
  idx,
  isExpanded,
  onToggle,
}: InteractiveServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isReversed = idx % 2 === 1;
  const Icon = family.icon;

  // Normalized mouse coordinates for subtle card tilt (strictly clamped within 2-3 degrees)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural mass and interpolation
  const springConfig = { damping: 26, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.4, -2.4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.4, 2.4]), springConfig);

  // Radial illumination coordinates for background gradient movement
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const smoothGlowX = useSpring(glowX, springConfig);
  const smoothGlowY = useSpring(glowY, springConfig);

  const backgroundGlow = useTransform(
    [smoothGlowX, smoothGlowY],
    ([gx, gy]) =>
      `radial-gradient(620px circle at ${gx}% ${gy}%, ${family.theme.accentGlow}, transparent 70%)`
  );

  const cachedRectRef = useRef<DOMRect | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || typeof window === "undefined" || window.innerWidth < 640) return;
    const rect = cachedRectRef.current || cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      cachedRectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    cachedRectRef.current = null;
    mouseX.set(0);
    mouseY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isReversed ? 36 : -36, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${family.familyTitle} service card. Tap to ${isExpanded ? "collapse" : "expand"} outcomes.`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      animate={{
        y: isHovered ? -6 : 0,
        scale: isHovered ? 1.015 : 1,
      }}
      className={cn(
        "group relative rounded-[32px] sm:rounded-[40px] bg-white border p-5 sm:p-10 lg:p-12 cursor-pointer overflow-hidden select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-600 transition-[box-shadow,border-color] duration-500",
        isHovered
          ? "shadow-[0_24px_50px_-12px_rgba(15,23,42,0.12)] border-purple-300/90"
          : "shadow-[0_12px_36px_-10px_rgba(15,23,42,0.06)] border-slate-200/80",
        family.theme.border,
        isExpanded && "ring-1 ring-purple-500/20"
      )}
    >
      {/* Background Subtle Gradient Movement (Radial Light Mesh) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] sm:rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
        style={{ background: backgroundGlow }}
      />

      <div
        className={cn(
          "relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center",
          isReversed && "lg:flex-row-reverse"
        )}
      >
        {/* Content Side */}
        <div
          className={cn(
            "lg:col-span-7 flex flex-col items-start text-left",
            isReversed ? "lg:order-2" : "lg:order-1"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            {/* Animated Icon Bubble */}
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:-rotate-3 shadow-xs",
                family.theme.iconBg,
                family.theme.iconColor
              )}
            >
              <Icon className="w-6 h-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" />
            </div>

            <Badge variant={family.badgeVariant} withDot>
              {family.badge}
            </Badge>
          </div>

          {/* Large Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-3 transition-colors duration-300 group-hover:text-purple-950">
            {family.familyTitle}
          </h3>

          {/* Supporting Tagline */}
          <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed mb-3">
            {family.tagline}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
            {family.description}
          </p>

          {/* Service Items Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {family.services.map((service, sIdx) => (
              <span
                key={sIdx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/95 border border-slate-200/90 text-slate-700 shadow-2xs group-hover:border-purple-200 transition-colors duration-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>{service}</span>
              </span>
            ))}
          </div>

          {/* Interactive Expansion Prompt */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-300">
            <span>{isExpanded ? "Collapse Details" : "Tap / Click to View Full Scope"}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isExpanded ? "rotate-180 text-purple-600" : "group-hover:translate-x-1"
              )}
            />
          </div>
        </div>

        {/* Visual Showcase Side */}
        <div
          className={cn(
            "lg:col-span-5 relative w-full",
            isReversed ? "lg:order-1" : "lg:order-2"
          )}
        >
          <motion.div
            initial={{
              clipPath: "inset(12% 0% 12% 0% round 28px)",
              scale: 1.08,
              opacity: 0,
            }}
            whileInView={{
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              scale: 1,
              opacity: 1,
            }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden border border-slate-200/80 shadow-md group-hover:shadow-xl transition-all duration-500 bg-slate-100"
          >
            <Image
              src={family.imageSrc}
              alt={family.imageAlt}
              fill
              className="object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 450px"
            />

            {/* Subtle Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

            {/* Floating Overlay Badge on Visual */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
              <span className="text-2xs font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                {family.badge}
              </span>
              <span className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-slate-900 group-hover:shadow-sm">
                <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Secondary Expandable Information Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              scale: 0.98,
              clipPath: "inset(0% 0% 100% 0% round 24px)",
            }}
            animate={{
              opacity: 1,
              height: "auto",
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 24px)",
            }}
            exit={{
              opacity: 0,
              height: 0,
              scale: 0.98,
              clipPath: "inset(0% 0% 100% 0% round 24px)",
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8 pt-8 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/70 backdrop-blur-xs p-6 sm:p-8 rounded-[24px]">
              <div>
                <span className="text-caption-badge text-purple-600 block mb-1">
                  Key Business Impact
                </span>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {family.secondaryInfo.heading}
                </h4>
                <p className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl inline-block border border-emerald-200/60">
                  ✦ {family.secondaryInfo.metrics}
                </p>
              </div>

              <div>
                <span className="text-caption-badge text-slate-400 block mb-2">
                  Scope & Execution
                </span>
                <ul className="flex flex-col gap-2">
                  {family.secondaryInfo.deliverables.map((d, dIdx) => (
                    <li
                      key={dIdx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium"
                    >
                      <Zap className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ServicesSection() {
  // Mobile tap or desktop click expansion state
  const [expandedId, setExpandedId] = useState<string>("social-content");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12">
      {/* ================================================================ */}
      {/* 1. SECTION INTRO                                                  */}
      {/* ================================================================ */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <Badge variant="purple" withDot className="mb-4">
          <span>Our Capabilities ✦ What We Do</span>
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
              Three Pillars of Complete Digital Mastery
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
          Everything your brand needs to capture attention, build technical authority, and scale revenue — engineered under one cohesive roof.
        </motion.p>
      </div>

      {/* ================================================================ */}
      {/* 2. THE THREE DISTINCT SERVICE FAMILIES                           */}
      {/* ================================================================ */}
      <div className="flex flex-col gap-10 sm:gap-14 max-w-6xl mx-auto">
        {SERVICE_FAMILIES.map((family, idx) => (
          <InteractiveServiceCard
            key={family.id}
            family={family}
            idx={idx}
            isExpanded={expandedId === family.id}
            onToggle={() => toggleExpand(family.id)}
          />
        ))}
      </div>

      {/* Bottom Direct CTA */}
      <div className="mt-14 sm:mt-18 text-center flex flex-col items-center">
        <p className="text-sm text-slate-500 mb-4 font-medium">
          Need a custom bundle across social, web, and growth?
        </p>
        <a href={BRAND_CONFIG.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="dark" size="lg" className="shadow-lg">
            <span>Consult With Our Growth Team</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </a>
      </div>
    </div>
  );
}
