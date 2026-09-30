"use client";

import dynamic from "next/dynamic";
import { CanvasContainer } from "@/components/layout/canvas-container";
import { CinematicScene } from "@/components/layout/cinematic-scene";
import { HeroSection } from "@/components/sections/hero";
import { BrandStorySection } from "@/components/sections/brand-story";
import { WhyOdishaSocialsSection } from "@/components/sections/why-odisha-socials";
import { ServicesSection } from "@/components/sections/services";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlobalBackground } from "@/components/layout/global-background";

// Performance code-splitting: Below-the-fold sections are lazy-loaded with SSR enabled for SEO
const ProcessSection = dynamic(
  () => import("@/components/sections/process").then((mod) => mod.ProcessSection),
  { ssr: true }
);

const PortfolioSection = dynamic(
  () => import("@/components/sections/portfolio").then((mod) => mod.PortfolioSection),
  { ssr: true }
);

const PackagesSection = dynamic(
  () => import("@/components/sections/packages").then((mod) => mod.PackagesSection),
  { ssr: true }
);

const ReviewsSection = dynamic(
  () => import("@/components/sections/reviews").then((mod) => mod.ReviewsSection),
  { ssr: true }
);

const FaqSection = dynamic(
  () => import("@/components/sections/faq").then((mod) => mod.FaqSection),
  { ssr: true }
);

const ContactSection = dynamic(
  () => import("@/components/sections/contact").then((mod) => mod.ContactSection),
  { ssr: true }
);

const FinalCtaSection = dynamic(
  () => import("@/components/sections/final-cta").then((mod) => mod.FinalCtaSection),
  { ssr: true }
);

function SectionDivider({ accent = false }: { accent?: boolean }) {
  return (
    <div className="w-full px-6 sm:px-12 py-2">
      <div
        className={`w-full max-w-5xl mx-auto h-px ${
          accent
            ? "bg-gradient-to-r from-transparent via-purple-200 to-transparent"
            : "bg-gradient-to-r from-transparent via-slate-200/80 to-transparent"
        }`}
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Global Ambient Background Layer */}
      <GlobalBackground />

      {/* Floating Pill Global Navbar */}
      <Navbar />

      {/* Main Page Canvas Container */}
      <div className="pt-20 sm:pt-24 pb-8">
        <CanvasContainer>
          {/* ================================================================ */}
          {/* SCENE 01: HERO (#hero)                                           */}
          {/* ================================================================ */}
          <CinematicScene
            id="hero"
            sceneNumber="SCENE 01"
            sceneLabel="HERO"
            isFirstScene
            recedeScale={0.96}
          >
            <HeroSection />
          </CinematicScene>

          <SectionDivider accent />

          {/* ================================================================ */}
          {/* SCENE 02: BRAND STORY & WHY ODISHA SOCIALS (#about)              */}
          {/* ================================================================ */}
          <CinematicScene
            id="about"
            sceneNumber="SCENE 02"
            sceneLabel="BRAND STORY"
            enterScale={0.97}
            recedeScale={0.96}
          >
            <BrandStorySection />
            <WhyOdishaSocialsSection />
          </CinematicScene>

          <SectionDivider />

          {/* ================================================================ */}
          {/* SCENE 03: SERVICES (#services)                                   */}
          {/* ================================================================ */}
          <CinematicScene
            id="services"
            sceneNumber="SCENE 03"
            sceneLabel="SERVICES"
            enterScale={0.97}
            recedeScale={0.96}
          >
            <ServicesSection />
          </CinematicScene>

          <SectionDivider accent />

          {/* ================================================================ */}
          {/* SCENE 04: PROCESS — HOW WE WORK (#process)                       */}
          {/* ================================================================ */}
          <CinematicScene
            id="process"
            sceneNumber="SCENE 04"
            sceneLabel="PROCESS"
            enterScale={0.97}
            recedeScale={0.96}
          >
            <ProcessSection />
          </CinematicScene>

          <SectionDivider />

          {/* ================================================================ */}
          {/* SCENE 05: PORTFOLIO — SELECTED WORK (#work)                      */}
          {/* ================================================================ */}
          <CinematicScene
            id="work"
            sceneNumber="SCENE 05"
            sceneLabel="PORTFOLIO"
            enterScale={0.97}
            recedeScale={0.96}
          >
            <PortfolioSection />
          </CinematicScene>

          <SectionDivider accent />

          {/* ================================================================ */}
          {/* SCENE 06: PACKAGES (#packages)                                   */}
          {/* ================================================================ */}
          <CinematicScene
            id="packages"
            sceneNumber="SCENE 06"
            sceneLabel="PACKAGES"
            enterScale={0.97}
            recedeScale={0.96}
          >
            <PackagesSection />
          </CinematicScene>

          <SectionDivider />

          {/* ================================================================ */}
          {/* SCENE 07: REVIEWS & PERSPECTIVES (#reviews)                      */}
          {/* ================================================================ */}
          <CinematicScene
            id="reviews"
            sceneNumber="SCENE 07"
            sceneLabel="REVIEWS"
            enterScale={0.97}
            recedeScale={0.96}
          >
            <ReviewsSection />
          </CinematicScene>

          <SectionDivider />

          {/* ================================================================ */}
          {/* SCENE 08: FREQUENTLY ASKED QUESTIONS (#faq)                      */}
          {/* ================================================================ */}
          <CinematicScene
            id="faq"
            sceneNumber="SCENE 08"
            sceneLabel="FAQ"
            enterScale={0.97}
            recedeScale={0.96}
          >
            <FaqSection />
          </CinematicScene>

          <SectionDivider accent />

          {/* ================================================================ */}
          {/* SCENE 09: CONTACT & CONSULTATION (#contact)                      */}
          {/* ================================================================ */}
          <CinematicScene
            id="contact"
            sceneNumber="SCENE 09"
            sceneLabel="CONTACT"
            enterScale={0.97}
            recedeScale={0.96}
          >
            <ContactSection />
          </CinematicScene>

          {/* ================================================================ */}
          {/* SCENE 10: FINAL CTA (CLIMAX)                                     */}
          {/* ================================================================ */}
          <CinematicScene
            id="cta"
            sceneNumber="SCENE 10"
            sceneLabel="FINAL CLIMAX"
            isLastScene
            enterScale={0.97}
          >
            <FinalCtaSection />
          </CinematicScene>

          {/* ================================================================ */}
          {/* 11. GLOBAL FOOTER                                                */}
          {/* ================================================================ */}
          <Footer />
        </CanvasContainer>
      </div>
    </>
  );
}
