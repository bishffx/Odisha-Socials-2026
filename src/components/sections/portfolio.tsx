"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import { BRAND_CONFIG } from "@/constants/brand";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  CheckCircle2,
  X,
  MessageCircle,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioProject {
  id: string;
  title: string;
  category: "Websites" | "Hospitality & Retail" | "Upcoming";
  categoryLabel: string;
  description: string;
  imageSrc?: string;
  tags: string[];
  isComingSoon?: boolean;
  featured?: boolean;
}

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "biswa-jewellers",
    title: "Biswa Jewellers — Digital Flagship & Heritage Showcase",
    category: "Hospitality & Retail",
    categoryLabel: "Luxury Retail & Jewellery",
    description:
      "A high-end digital presence built for Biswa Jewellers, merging timeless traditional craftsmanship with modern luxury web design, bespoke typography, and responsive catalog browsing.",
    imageSrc: "/images/portfolio_biswa_jewellers.jpg",
    tags: ["Luxury Web", "Brand Identity", "Catalog Showcase"],
    featured: true,
  },
  {
    id: "cafe-restaurant-web",
    title: "Artisanal Cafe & Restaurant Digital Experience",
    category: "Hospitality & Retail",
    categoryLabel: "Culinary & Dining",
    description:
      "A welcoming, tactile culinary web experience featuring interactive digital reservation menus, specialty coffee roasting stories, and local community branding for an artisanal hospitality venture.",
    imageSrc: "/images/portfolio_cafe_restaurant.jpg",
    tags: ["Cafe & Dining", "Table Booking", "UI/UX Design"],
    featured: true,
  },
  {
    id: "corporate-business-web",
    title: "Full-Stack Corporate Web Platform",
    category: "Websites",
    categoryLabel: "Business & Enterprise",
    description:
      "High-conversion digital platform engineered with Next.js, sub-second speed architecture, Core Web Vitals optimization, and integrated lead generation funnels.",
    imageSrc: "/images/service_web_mockup.jpg",
    tags: ["Corporate Platform", "Next.js 16", "Conversion Flow"],
  },
  {
    id: "creative-3d-studio",
    title: "Interactive 3D Portfolio & Visual Storytelling",
    category: "Websites",
    categoryLabel: "Interactive Web & 3D",
    description:
      "Immersive digital experience featuring fluid cursor interactions, spatial 3D elements, and micro-animated layouts tailored for creative modern brands.",
    imageSrc: "/images/hero_reel_showcase.jpg",
    tags: ["3D Web", "Micro-Interactions", "Creative Direction"],
  },
  {
    id: "d2c-growth-case-study",
    title: "D2C Brand Growth & Viral Social Architecture",
    category: "Upcoming",
    categoryLabel: "Social & Growth",
    description:
      "Full brand discovery, reel production blitz, and omnichannel conversion funnel currently in production. Verified case study dropping soon.",
    tags: ["Viral Reels", "Growth Scaling", "In Production"],
    isComingSoon: true,
  },
  {
    id: "spatial-ecom-platform",
    title: "Next-Gen Spatial E-Commerce Platform",
    category: "Upcoming",
    categoryLabel: "3D & E-Commerce",
    description:
      "Interactive 3D web experience with real-time product customization and WebGL rendering. Scheduled for launch in Q4.",
    tags: ["Three.js", "Interactive 3D", "In Production"],
    isComingSoon: true,
  },
];

interface CinematicProjectSceneProps {
  project: PortfolioProject;
  idx: number;
  total: number;
  onSelect: (project: PortfolioProject) => void;
}

function CinematicProjectScene({
  project,
  idx,
  total,
  onSelect,
}: CinematicProjectSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isReversed = idx % 2 === 1;

  // Track the continuous scroll progress of this project scene
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  // =========================================================================
  // DEPTH LAYER 1: Background Aura & Image Counter-Drift (moves at 0.15x)
  // =========================================================================
  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.1, 0.65, 0.65, 0.1]);

  // =========================================================================
  // DEPTH LAYER 2: Main Project Screen Scene & Camera Focal Transitions
  // Enters -> Focuses -> Scales -> Moves away smoothly as next project dominates
  // =========================================================================
  const sceneScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.93, 1, 1, 0.94]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.25, 1, 1, 0.35]);
  const sceneY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [35, 0, 0, -35]);

  // Image subtle aperture zoom & calibrated angle rotation (1-2 degrees, zero distortion)
  const imgScale = useTransform(scrollYProgress, [0.1, 0.45, 0.85], [1.06, 1, 1.03]);
  const imgRotate = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.7],
    [isReversed ? 1.4 : -1.4, 0, isReversed ? -0.8 : 0.8]
  );

  // =========================================================================
  // DEPTH LAYER 3: Foreground Floating HUD / Badges (moves at 0.5x)
  // =========================================================================
  const fgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={sceneRef}
      className="relative w-full py-8 sm:py-16 lg:py-24 my-4 sm:my-8"
    >
      {/* ------------------------------------------------------------------- */}
      {/* DEPTH LAYER 1: Ambient Background Layer                             */}
      {/* ------------------------------------------------------------------- */}
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        {project.imageSrc ? (
          <div className="relative w-full h-[120%] opacity-15 blur-3xl filter saturate-150 scale-125">
            <Image
              src={project.imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-300/25 via-blue-200/20 to-transparent blur-3xl" />
        )}
      </motion.div>

      {/* ------------------------------------------------------------------- */}
      {/* DEPTH LAYER 2: Main Project Screen Scene Canvas                     */}
      {/* ------------------------------------------------------------------- */}
      <motion.div
        style={{
          scale: sceneScale,
          opacity: sceneOpacity,
          y: sceneY,
        }}
        className="max-w-6xl mx-auto"
      >
        <div
          onClick={() => onSelect(project)}
          data-cursor-label={project.isComingSoon ? "SOON" : "VIEW PROJECT →"}
          className={cn(
            "group relative rounded-[32px] sm:rounded-[44px] bg-white/95 border border-slate-200/90 p-6 sm:p-10 lg:p-14 shadow-[0_24px_70px_-15px_rgba(15,23,42,0.08)] hover:shadow-[0_32px_90px_-15px_rgba(124,58,237,0.15)] hover:border-purple-200 transition-[box-shadow,border-color] duration-500 cursor-pointer overflow-hidden backdrop-blur-sm select-none",
            project.featured && "ring-1 ring-purple-500/20"
          )}
        >
          {/* Subtle Watermark Index */}
          <div className="pointer-events-none absolute -bottom-8 right-6 text-[100px] sm:text-[160px] font-black text-slate-100/90 select-none leading-none z-0">
            {String(idx + 1).padStart(2, "0")}
          </div>

          <div
            className={cn(
              "relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center",
              isReversed && "lg:flex-row-reverse"
            )}
          >
            {/* Story Text Column */}
            <div
              className={cn(
                "lg:col-span-5 flex flex-col items-start text-left",
                isReversed ? "lg:order-2" : "lg:order-1"
              )}
            >
              {/* Camera Scene Index Indicator */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-3xs font-mono font-bold uppercase tracking-widest bg-slate-100 text-slate-700 border border-slate-200">
                  <Camera className="w-3 h-3 text-purple-600" />
                  <span>
                    SCENE {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </span>

                <Badge variant="purple" withDot className="text-3xs">
                  {project.categoryLabel}
                </Badge>
              </div>

              {/* Masked Project Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-4 group-hover:text-purple-600 transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
                {project.description}
              </p>

              {/* Tags Checklist */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs group-hover:border-purple-200 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Contextual Action Button */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-bold tracking-wide shadow-md group-hover:bg-purple-600 transition-all duration-300 group-hover:translate-x-1">
                <span>{project.isComingSoon ? "Production Overview" : "Explore Project Details"}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Visual Showcase Canvas Column */}
            <div
              className={cn(
                "lg:col-span-7 relative w-full",
                isReversed ? "lg:order-1" : "lg:order-2"
              )}
            >
              <motion.div
                style={{
                  rotate: imgRotate,
                }}
                className="relative w-full aspect-[16/10] rounded-[26px] sm:rounded-[36px] overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100 group-hover:border-purple-300/80 transition-colors duration-500"
              >
                {project.imageSrc ? (
                  <motion.div
                    style={{ scale: imgScale }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
                  </motion.div>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50/90 via-white to-blue-50/70">
                    <div className="w-16 h-16 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 mb-4 shadow-sm">
                      <Clock className="w-8 h-8 animate-pulse" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-100 px-4 py-1.5 rounded-full border border-purple-200/60 mb-2">
                      IN PRODUCTION
                    </span>
                    <p className="text-xs sm:text-sm text-slate-500 text-center max-w-sm font-medium">
                      Active client deliverables underway. Verified analytics and live case study publishing shortly.
                    </p>
                  </div>
                )}

                {/* Top Floating Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-2xs font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 border border-white/60 shadow-xs">
                    {project.isComingSoon ? (
                      <>
                        <Clock className="w-3 h-3 text-purple-600" />
                        <span>In Production</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified Project</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Bottom Overlay Pill */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white pointer-events-none">
                  <span className="text-3xs font-mono uppercase tracking-widest bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    FOCAL LENGTH 35MM ✦ 4K PRO
                  </span>
                  <span className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-purple-600" />
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ------------------------------------------------------------------- */}
      {/* DEPTH LAYER 3: Foreground Floating Accent (Parallax Drift)          */}
      {/* ------------------------------------------------------------------- */}
      <motion.div
        style={{ y: fgY }}
        className="pointer-events-none absolute -top-3 right-6 lg:right-16 -z-5 hidden sm:block"
      >
        <SparkDoodle variant="burst" className="w-7 h-7 text-amber-400 opacity-60 animate-pulse-soft" />
      </motion.div>
    </div>
  );
}

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12">
      {/* ================================================================ */}
      {/* 1. SECTION INTRO                                                  */}
      {/* ================================================================ */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <Badge variant="blue" withDot className="mb-4">
          <span>Selected Work ✦ Verified Projects</span>
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
                Crafted With Precision.
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
                Built To Last.
              </motion.span>
            </div>
          </h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl"
        >
          An editorial showcase of digital platforms, luxury retail presence, and hospitality experiences created by Odisha Socials. Browse each visual scene below.
        </motion.p>

        {/* Category Filter Pills (Horizontal swipe on mobile, wrapped on desktop) */}
        <div className="flex items-center gap-2 sm:gap-2.5 mt-6 sm:mt-8 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap justify-start sm:justify-center w-full max-w-full -mx-2 px-2 sm:mx-0 sm:px-0">
          {["All", "Websites", "Hospitality & Retail", "Upcoming"].map((filter) => (
            <Pill
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className="shrink-0 min-h-[44px] text-xs sm:text-sm"
            >
              {filter}
            </Pill>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. CINEMATIC PROJECT SCENES TRACK                                */}
      {/* ================================================================ */}
      <div className="flex flex-col gap-6 sm:gap-12 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <CinematicProjectScene
              key={project.id}
              project={project}
              idx={idx}
              total={filteredProjects.length}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ================================================================ */}
      {/* 3. PROJECT DETAIL INSPECTION MODAL                               */}
      {/* ================================================================ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl rounded-[36px] bg-white border border-slate-200 p-6 sm:p-10 shadow-2xl relative my-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="purple" withDot>
                  {selectedProject.categoryLabel}
                </Badge>
                <span className="text-2xs font-mono font-bold text-slate-400">
                  CASE REF #{selectedProject.id.toUpperCase()}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
                {selectedProject.title}
              </h3>

              {/* Visual Preview */}
              {selectedProject.imageSrc && (
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-slate-200 shadow-sm">
                  <Image
                    src={selectedProject.imageSrc}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Full Narrative */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                <p>{selectedProject.description}</p>
              </div>

              {/* Inclusions */}
              <div className="mb-8">
                <span className="text-caption-badge text-slate-400 block mb-2">
                  Scope & Deliverables:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* WhatsApp Direct Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 text-center sm:text-left">
                  Interested in creating a similar high-impact presence for your business?
                </p>
                <a
                  href={`https://wa.me/919040834651?text=${encodeURIComponent(
                    `Hi Odisha Socials! I was viewing your work on "${selectedProject.title}" and would like to build something similar for my brand.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0"
                >
                  <Button variant="primary" size="md" className="w-full sm:w-auto shadow-md gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Discuss Project on WhatsApp</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Direct Portfolio Inquiries CTA */}
      <div className="mt-14 sm:mt-18 text-center flex flex-col items-center">
        <p className="text-sm text-slate-500 mb-3 font-medium">
          Have an upcoming brand or website project?
        </p>
        <a
          href={BRAND_CONFIG.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 hover:text-purple-900 underline decoration-purple-300 underline-offset-4 cursor-pointer transition-colors"
        >
          <span>Discuss your project with Odisha Socials on WhatsApp</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
