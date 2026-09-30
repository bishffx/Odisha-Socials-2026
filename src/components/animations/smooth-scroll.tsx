"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { bindLenisToScrollTrigger, ScrollTrigger } from "@/lib/motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1. Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 2. High-performance fluid scroll physics (active on all desktop & mobile browsers)
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // Ensures native 120Hz touch momentum on mobile with zero jitter
      infinite: false,
    });

    // 3. Synchronize Lenis with GSAP ScrollTrigger & Ticker (zero jitter scrub)
    const unbindScrollTrigger = bindLenisToScrollTrigger(lenis);

    // 4. Synchronize anchor clicks with Lenis for smooth in-page navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    // Refresh ScrollTrigger once DOM layout stabilizes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      unbindScrollTrigger();
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
