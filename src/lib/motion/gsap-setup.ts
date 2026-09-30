"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

// Guard against SSR / window undefined
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Default GSAP config for silky performance
  gsap.config({
    nullTargetWarn: false,
    autoSleep: 60,
  });
}

/**
 * Binds a Lenis instance to GSAP ScrollTrigger and coordinates the render ticker.
 * This guarantees zero jitter between Lenis virtual scroll and ScrollTrigger scrubbing.
 */
export function bindLenisToScrollTrigger(lenis: Lenis): () => void {
  if (typeof window === "undefined") return () => {};

  // 1. Tell ScrollTrigger to use Lenis's scroll position
  lenis.on("scroll", ScrollTrigger.update);

  // 2. Drive Lenis updates directly through GSAP's central RAF ticker
  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);

  // 3. Disable GSAP lag smoothing so scroll doesn't catch or jump after tab switches
  gsap.ticker.lagSmoothing(0);

  // 4. Return cleanup function
  return () => {
    lenis.off("scroll", ScrollTrigger.update);
    gsap.ticker.remove(tickerCallback);
  };
}

export { gsap, ScrollTrigger };
