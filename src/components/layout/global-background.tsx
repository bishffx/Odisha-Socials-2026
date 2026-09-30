"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/lib/motion/hooks";

const Ambient3DScene = dynamic(
  () => import("@/components/canvas/ambient-3d-scene").then((mod) => mod.Ambient3DScene),
  { ssr: false }
);

export function GlobalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion || typeof window === "undefined") return;

    const isSmallMobile = window.innerWidth < 640;
    if (isSmallMobile) return;

    const ctx = gsap.context(() => {
      // Subtle cinematic camera background counter-drift across entire page length
      const orbs = el.querySelectorAll(".ambient-orb");
      gsap.to(orbs, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // Ambient foreground particles drift faster for layered depth
      const particles = el.querySelectorAll(".ambient-particle");
      gsap.to(particles, {
        y: -240,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Soft Ambient Radial Gradients (Depth: Background) */}
      <div className="ambient-orb absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-purple-100/40 blur-[120px] will-change-transform" />
      <div className="ambient-orb absolute top-[35%] -right-40 w-[550px] h-[550px] rounded-full bg-blue-100/40 blur-[130px] will-change-transform" />
      <div className="ambient-orb absolute -bottom-32 left-[20%] w-[650px] h-[650px] rounded-full bg-pink-100/30 blur-[140px] will-change-transform" />

      {/* Subtle Dot Grid in Background */}
      <div className="absolute inset-0 bg-grid-dots opacity-35" />

      {/* Lightweight Ambient 3D Camera Scene (Depth: Midground WebGL) */}
      <Ambient3DScene />

      {/* Delicate floating vector sparkles in the margins (Depth: Foreground) */}
      <div className="ambient-particle absolute top-24 left-8 text-purple-300/40 hidden lg:block animate-float will-change-transform">
        <SparkDoodle variant="burst" className="w-5 h-5 text-purple-300/50" />
      </div>

      <div className="ambient-particle absolute top-96 right-10 text-amber-300/40 hidden lg:block animate-float-reverse will-change-transform">
        <SparkDoodle variant="star" className="w-4 h-4 text-amber-400/50" />
      </div>

      <div className="ambient-particle absolute bottom-48 left-12 text-blue-300/40 hidden xl:block animate-float will-change-transform">
        <SparkDoodle variant="loop" className="w-8 h-6 text-blue-300/40" />
      </div>
    </div>
  );
}
