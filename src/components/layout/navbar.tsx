"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { BRAND_CONFIG, NAV_LINKS } from "@/constants/brand";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);

          // Active section detection based on scroll position
          const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
          const scrollPosition = window.scrollY + 180;

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open and close on Escape key
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-2.5 sm:top-5 inset-x-0 z-50 flex justify-center px-2.5 sm:px-6 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "pointer-events-auto flex items-center justify-between w-full max-w-5xl rounded-full transition-all duration-300",
            isScrolled
              ? "py-2 px-3 sm:py-2.5 sm:px-6 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.12)]"
              : "py-2.5 px-3.5 sm:py-3 sm:px-7 bg-white/85 backdrop-blur-sm border border-slate-200/70 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.06)]"
          )}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#hero");
            }}
            className="flex items-center gap-2 group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-600 rounded-full p-1 -m-1"
            aria-label="Odisha Socials Home"
          >
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-black shadow-xs group-hover:scale-105 transition-transform">
              OS
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 leading-tight">
                ODISHA SOCIALS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Clear Hover & Scroll Micro-Interactions */}
          <nav
            aria-label="Primary Navigation"
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden md:flex items-center gap-1 lg:gap-1.5"
          >
            {NAV_LINKS.map((link) => {
              const linkId = link.href.replace("#", "");
              const isActive = activeSection === linkId;
              const isHovered = hoveredNav === linkId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(linkId)}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-colors duration-200 cursor-pointer select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-600",
                    isActive
                      ? "text-purple-700 font-bold"
                      : isHovered
                      ? "text-slate-950 font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && !hoveredNav && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-purple-100/80 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isHovered && (
                    <motion.div
                      layoutId="hoverNavPill"
                      className="absolute inset-0 rounded-full bg-slate-100/90 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA (Desktop) with Magnetic Micro-Interaction (LET'S TALK) */}
          <div className="hidden sm:flex items-center gap-2">
            <MagneticButton
              variant="none"
              maxMovement={10}
              onClick={() => scrollTo("#contact")}
            >
              <Button
                variant="dark"
                size="sm"
                className="h-9 px-5 text-xs font-semibold shadow-xs"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button with 44px Accessible Touch Target */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-600 cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-18 sm:top-20 inset-x-3 sm:inset-x-4 bg-white rounded-[28px] p-5 sm:p-6 shadow-2xl border border-slate-200/90 flex flex-col max-h-[calc(100vh-100px)] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xs font-black">
                    OS
                  </div>
                  <span className="font-extrabold text-sm tracking-tight text-slate-900">
                    Menu
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav aria-label="Mobile Navigation Links" className="flex flex-col gap-1.5">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className={cn(
                        "flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-colors min-h-[48px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-600",
                        isActive
                          ? "bg-purple-50 text-purple-700"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="text-base">{link.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </a>
                  );
                })}
              </nav>

              {/* Mobile Menu Action Triggers */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact");
                  }}
                  className="w-full"
                >
                  <Button variant="dark" size="lg" className="w-full justify-center min-h-[48px] text-sm">
                    <span>Let's Talk</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </a>

                <a
                  href={BRAND_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" size="lg" className="w-full justify-center min-h-[48px] text-sm">
                    <MessageCircle className="w-4 h-4 text-emerald-600 mr-1.5" />
                    <span>WhatsApp (+91 {BRAND_CONFIG.contact.whatsapp})</span>
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
