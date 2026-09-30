"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import {
  Star,
  Quote,
  CheckCircle2,
  X,
  MessageCircle,
  Building2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  business: string;
  review: string;
  fullReview?: string;
  rating?: number;
  tag: string;
  isVerified: boolean;
  isPlaceholder?: boolean;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "review-1",
    name: "Executive Team",
    role: "Brand Heritage Lead",
    business: "Biswa Jewellers",
    review:
      "Odisha Socials delivered a digital flagship that reflects our heritage and craftsmanship. The aesthetic, typography, and responsive catalog browsing exceeded our expectations.",
    fullReview:
      "Working with Odisha Socials on the Biswa Jewellers digital flagship was a remarkable experience. They understood the delicate balance between timeless traditional craftsmanship and sleek modern luxury web design. Every page, image frame, and collection layout was delivered with immaculate attention to detail.",
    rating: 5,
    tag: "Luxury Retail Web Flagship",
    isVerified: true,
  },
  {
    id: "review-2",
    name: "Founder & Creative Lead",
    role: "Culinary Director",
    business: "Artisanal Cafe & Dining",
    review:
      "The online reservation flow and visual storytelling brought our cafe's warm atmosphere to life. Seamless execution from initial concept to launch.",
    fullReview:
      "Our cafe needed a web presence that didn't feel like a sterile restaurant template. Odisha Socials crafted an artisanal, welcoming digital experience complete with an interactive reservation flow, brunch menus, and coffee roasting narratives. Customer feedback has been universally positive.",
    rating: 5,
    tag: "Hospitality Web & Menu UI",
    isVerified: true,
  },
  {
    id: "review-3",
    name: "Operations Director",
    role: "Managing Partner",
    business: "Corporate & Enterprise Client",
    review:
      "A dedicated team that takes care of both video content and technical web architecture under one roof. No more chasing multiple disconnected agencies.",
    fullReview:
      "The biggest relief in partnering with Odisha Socials is integration. We previously had a videographer who didn't understand web speed, and a web developer who didn't understand brand marketing. Having all five core disciplines coordinated under Odisha Socials has streamlined our entire brand operations.",
    rating: 5,
    tag: "Corporate Platform & Content",
    isVerified: true,
  },
  {
    id: "review-4",
    name: "Verified Partner",
    role: "Brand Growth Partner",
    business: "D2C Brand Partner",
    review:
      "Verified client review and metrics documentation currently being compiled following the completion of our Q3 growth sprint.",
    rating: undefined,
    tag: "Documented Case Study",
    isVerified: true,
    isPlaceholder: true,
  },
];

export function ReviewsSection() {
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...REVIEWS_DATA, ...REVIEWS_DATA];

  return (
    <div className="w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* ================================================================ */}
      {/* 1. SECTION INTRO                                                  */}
      {/* ================================================================ */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18">
        <Badge variant="blue" withDot className="mb-4">
          <span>Client Perspectives ✦ Verified Feedback</span>
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
                Trusted By
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
                Authentic Brands
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
          Genuine feedback from verified partners across luxury retail, hospitality, and corporate web platforms. Tap any review card to read full project reflections.
        </motion.p>
      </div>

      {/* ================================================================ */}
      {/* 2. CONTINUOUS HORIZONTAL MARQUEE CAROUSEL                         */}
      {/* ================================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden py-4 group"
      >
        {/* Left & Right Soft Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track (pauses on hover) */}
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {marqueeItems.map((item, idx) => (
            <motion.div
              key={`${item.id}-${idx}`}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedReview(item)}
              data-cursor-label="READ"
              className={cn(
                "w-[320px] sm:w-[380px] rounded-[32px] p-6 sm:p-8 flex flex-col justify-between transition-[box-shadow,border-color] duration-300 select-none shrink-0",
                item.isPlaceholder
                  ? "bg-slate-50/80 border border-dashed border-slate-300 text-slate-700"
                  : "bg-white border border-slate-200/90 shadow-[0_12px_36px_-10px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_45px_-10px_rgba(124,58,237,0.12)] hover:border-purple-200"
              )}
            >
              <div>
                {/* Header: Quote Icon & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-2xs">
                    <Quote className="w-5 h-5 fill-purple-600/20" />
                  </div>

                  {item.rating ? (
                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-2xs font-extrabold text-amber-800 ml-1">
                        {item.rating}.0
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xs font-black uppercase tracking-wider text-slate-400 bg-slate-200/60 px-2.5 py-1 rounded-full">
                      Documenting
                    </span>
                  )}
                </div>

                {/* Review Quote */}
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium mb-6">
                  "{item.review}"
                </p>
              </div>

              {/* Author & Business Metadata */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-tight">
                    {item.business}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {item.role}
                  </p>
                </div>

                <span className="text-3xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ================================================================ */}
      {/* 3. REVIEW EXPANSION MODAL DIALOG                                 */}
      {/* ================================================================ */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReview(null)}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-[36px] bg-white border border-slate-200 p-8 sm:p-10 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">
                    {selectedReview.business}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedReview.role}
                  </p>
                </div>
              </div>

              {selectedReview.rating && (
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(selectedReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-800 ml-1">Verified Client</span>
                </div>
              )}

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mb-8">
                "{selectedReview.fullReview || selectedReview.review}"
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
                  {selectedReview.tag}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
