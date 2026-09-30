"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger } from "./gsap-setup";
import { useReducedMotion } from "./hooks";

export interface CinematicCameraOptions {
  /** Explicitly marks this scene as the first scene (hero) */
  isFirstScene?: boolean;
  /** Explicitly marks this scene as the last scene (climax / footer) */
  isLastScene?: boolean;
  /** Base scale when the scene recedes into distance (desktop default: 0.94) */
  recedeScale?: number;
  /** Initial scale when scene enters viewport (desktop default: 0.95) */
  enterScale?: number;
  /** Whether to apply subtle perspective depth tilt */
  enablePerspective?: boolean;
  /** Whether to look for [data-camera-depth] children and apply 3D parallax */
  enableDepthLayers?: boolean;
  /** Custom trigger element if different from the target ref */
  triggerRef?: RefObject<HTMLElement | null>;
}

/**
 * useCinematicScene:
 * Powers the Cinematic Camera Viewport system.
 * As the user scrolls through the page, the viewport acts like a camera:
 * - Next scene enters smoothly with scale 0.95 -> 1.0 and opacity 0.85 -> 1.0
 * - Current scene sits at scale 1.0 in prime focus
 * - Previous scene recedes smoothly into the background at scale 1.0 -> 0.94, opacity 1.0 -> 0.86
 * - Parallax depth layers (background, midground, foreground) scrub at different relative velocities
 */
export function useCinematicScene<T extends HTMLElement = HTMLElement>(
  options: CinematicCameraOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || typeof window === "undefined") return;

    const isSmallMobile = window.innerWidth < 640;

    // Visible, elegant studio-grade scale depths
    const recedeScale = isSmallMobile ? 0.98 : (options.recedeScale ?? 0.94);
    const enterScale = isSmallMobile ? 0.98 : (options.enterScale ?? 0.95);
    const exitOpacity = isSmallMobile ? 0.96 : 0.86;
    const exitY = isSmallMobile ? -14 : -36;

    const isFirst = options.isFirstScene ?? (el.offsetTop < 120);
    const isLast = options.isLastScene ?? false;

    const ctx = gsap.context(() => {
      // 1. SCENE VIEWPORT CAMERA TIMELINE (SCRUBBED WITH SCROLL)
      if (isFirst) {
        // FIRST SCENE (Hero): Starts fully visible and scaled at 1.0. Recedes as scroll advances.
        gsap.fromTo(
          el,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            transformOrigin: "center bottom",
          },
          {
            scale: recedeScale,
            opacity: exitOpacity,
            y: exitY,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          }
        );
      } else if (isLast) {
        // LAST SCENE (Climax/CTA): Enters into prime focus and stays anchored.
        gsap.fromTo(
          el,
          {
            scale: enterScale,
            opacity: 0.86,
            y: isSmallMobile ? 14 : 36,
            transformOrigin: "center top",
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "center center",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          }
        );
      } else {
        // INTERMEDIATE SCENES (Scene 02 through Scene 09):
        // Camera moves through: Enter (scale 0.95 -> 1.0) -> Focus (1.0) -> Recede (1.0 -> 0.94)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });

        // 1. Enter into camera view
        tl.fromTo(
          el,
          {
            scale: enterScale,
            opacity: 0.86,
            y: isSmallMobile ? 14 : 32,
            transformOrigin: "center top",
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          }
        );

        // 2. Prime focus window
        tl.to(el, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "none",
        });

        // 3. Recede into depth as camera advances past
        tl.to(el, {
          scale: recedeScale,
          opacity: exitOpacity,
          y: exitY,
          duration: 0.35,
          ease: "power2.in",
        });
      }

      // 2. MULTI-LAYER DEPTH PARALLAX (BACKGROUND / FOREGROUND)
      if (options.enableDepthLayers !== false && !isSmallMobile) {
        // Background layer: slow movement (drifts upward slower than scroll)
        const bgLayers = el.querySelectorAll<HTMLElement>('[data-camera-depth="background"]');
        if (bgLayers.length > 0) {
          gsap.fromTo(
            bgLayers,
            { y: 40 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Foreground layer: fast movement (floats forward slightly faster than scroll)
        const fgLayers = el.querySelectorAll<HTMLElement>('[data-camera-depth="foreground"]');
        if (fgLayers.length > 0) {
          gsap.fromTo(
            fgLayers,
            { y: -30, scale: 0.96 },
            {
              y: 40,
              scale: 1.03,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      }
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, options]);

  return ref;
}
