"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import { BRAND_CONFIG } from "@/constants/brand";
import {
  MessageCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  CheckCircle2,
} from "lucide-react";
import {
  LivingVisual,
  CinematicCameraIllustration,
  PhoneReelsIllustration,
  AbstractGeometricIllustration,
} from "@/components/illustrations/living-assets";

export function FinalCtaSection() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      <div className="relative overflow-hidden rounded-[36px] sm:rounded-[48px] bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-14 lg:p-20 shadow-[0_30px_90px_-20px_rgba(76,29,149,0.4)] border border-purple-500/20 text-center flex flex-col items-center">
        {/* ================================================================ */}
        {/* AMBIENT GLOWS & VISUAL CLIMAX PARTICLES                          */}
        {/* ================================================================ */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/25 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-[140px] pointer-events-none" />

        {/* Ambient Living Animated Objects (Different durations, delays, amplitudes & subtle rotation) */}
        <div className="absolute top-6 left-8 hidden sm:block pointer-events-none">
          <LivingVisual
            duration={7.4}
            amplitude={12}
            rotation={3.5}
            delay={0.2}
            parallaxSpeed={0.3}
            mouseStrength={10}
          >
            <CinematicCameraIllustration className="w-18 h-18 opacity-80 drop-shadow-2xl" />
          </LivingVisual>
        </div>

        <div className="absolute bottom-8 right-10 hidden md:block pointer-events-none">
          <LivingVisual
            duration={8.6}
            amplitude={10}
            rotation={-4.0}
            delay={1.0}
            parallaxSpeed={0.25}
            mouseStrength={12}
          >
            <PhoneReelsIllustration className="w-18 h-24 opacity-80 drop-shadow-2xl" />
          </LivingVisual>
        </div>

        <div className="absolute top-10 right-14 hidden lg:block pointer-events-none">
          <LivingVisual
            duration={5.8}
            amplitude={8}
            rotation={5.0}
            delay={0.6}
            parallaxSpeed={0.2}
          >
            <AbstractGeometricIllustration variant="star" className="w-8 h-8 text-amber-300 opacity-75" />
          </LivingVisual>
        </div>

        <div className="absolute bottom-10 left-16 hidden lg:block pointer-events-none">
          <LivingVisual
            duration={6.9}
            amplitude={9}
            rotation={-3.0}
            delay={1.5}
            parallaxSpeed={0.2}
          >
            <AbstractGeometricIllustration variant="torus" className="w-14 h-14 opacity-60" />
          </LivingVisual>
        </div>

        {/* Relative Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Top Pill Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 text-purple-200 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>The Visual Climax ✦ Your Turn To Scale</span>
          </motion.div>

          {/* Giant Climax Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6">
            <div className="overflow-hidden py-0.5">
              <motion.span
                initial={{ opacity: 0, y: "105%" }}
                whileInView={{ opacity: 1, y: "0%" }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                YOUR BRAND
              </motion.span>
            </div>
            <div className="overflow-hidden py-0.5">
              <motion.span
                initial={{ opacity: 0, y: "105%" }}
                whileInView={{ opacity: 1, y: "0%" }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white"
              >
                DESERVES TO BE SEEN.
              </motion.span>
            </div>
            <div className="overflow-hidden py-0.5 mt-2">
              <motion.span
                initial={{ opacity: 0, y: "105%" }}
                whileInView={{ opacity: 1, y: "0%" }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="block text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider text-purple-300/90"
              >
                ODISHA SOCIALS
              </motion.span>
            </div>
          </h2>

          {/* Supporting Manifesto */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-xl text-purple-100/90 font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We don't just manage social media. We build digital presence. Join the growing roster of ambitious brands that refuse to blend in.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 mb-10 sm:mb-12 w-full sm:w-auto"
          >
            {/* WORK WITH US Button */}
            <a href="#contact" className="w-full sm:w-auto">
              <MagneticButton
                variant="none"
                maxMovement={10}
                className="w-full sm:w-auto justify-center min-h-[48px] px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 shadow-[0_12px_32px_rgba(255,255,255,0.25)] font-black tracking-wide"
              >
                <span>WORK WITH US</span>
                <ArrowRight className="w-5 h-5 text-purple-700" />
              </MagneticButton>
            </a>

            {/* CHAT WITH US WhatsApp Button */}
            <a
              href={BRAND_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <MagneticButton
                variant="none"
                maxMovement={10}
                className="w-full sm:w-auto justify-center min-h-[48px] px-8 py-4 border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md font-bold tracking-wide shadow-sm"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400/20 mr-1.5" />
                <span>CHAT WITH US</span>
              </MagneticButton>
            </a>
          </motion.div>

          {/* Trust Footnote */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-purple-200/80 font-medium pt-4 border-t border-white/10 w-full">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp: 9040834651</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official Email: odishasocials@gmail.com</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>50% Advance Transparent Terms</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
