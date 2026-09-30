import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import { BRAND_CONFIG } from "@/constants/brand";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

interface CtaBannerProps {
  headline?: string;
  subheadline?: string;
  className?: string;
  extraAction?: ReactNode;
}

export function CtaBanner({
  headline = "Ready To Build A Recognised Brand?",
  subheadline = "Let's turn your social media and digital presence into your strongest growth asset.",
  className,
}: CtaBannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 text-white p-8 sm:p-12 lg:p-16 shadow-2xl",
        className
      )}
    >
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Playful vector doodles */}
      <SparkDoodle
        variant="burst"
        className="absolute top-8 left-10 w-8 h-8 text-amber-300 hidden sm:block animate-pulse-soft"
      />
      <SparkDoodle
        variant="loop"
        className="absolute bottom-8 right-12 w-14 h-10 text-purple-200/50 hidden md:block"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] mb-4">
          {headline}
        </h2>
        <p className="text-base sm:text-lg text-purple-100 max-w-xl mb-8 leading-relaxed font-normal">
          {subheadline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={BRAND_CONFIG.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="dark"
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
              <span>Let's Talk on WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>

          <a href={`mailto:${BRAND_CONFIG.contact.email}`}>
            <Button
              variant="outline"
              size="lg"
              className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs"
            >
              <span>Email Us</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
