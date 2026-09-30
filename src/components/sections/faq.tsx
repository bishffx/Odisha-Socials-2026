"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SparkDoodle } from "@/components/ui/spark-doodle";
import { BRAND_CONFIG } from "@/constants/brand";
import {
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Mail,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What does Odisha Socials do?",
    answer:
      "Odisha Socials is a full-spectrum digital presence and creative growth agency. We discover your brand, build high-retention video reels, modern UI/UX design, interactive and 3D websites, and execute Google SEO dominance to make your business widely recognized.",
  },
  {
    id: "faq-2",
    question: "Do you manage social media accounts?",
    answer:
      "Yes. We provide complete end-to-end social media management. This includes viral hook scripting, on-location video shooting, dynamic editing, feed curation, story posting (3–4 times/week), and active community engagement to turn passive scrollers into customers.",
  },
  {
    id: "faq-3",
    question: "Do you create websites?",
    answer:
      "Yes. We build everything from clean mobile-first business sites (Basic at ₹8,000) and high-performance corporate platforms (Premium at ₹14,000) to next-generation spatial 3D interactive web experiences powered by Next.js 16, Three.js, and WebGL (Premium Max at ₹20,000).",
  },
  {
    id: "faq-4",
    question: "How long does a website take?",
    answer:
      "A Basic business website is typically delivered within 5 to 7 business days. A Premium multi-page platform takes 10 to 14 business days. Advanced Premium Max 3D experiences with custom spatial interactions generally take 2 to 3 weeks.",
  },
  {
    id: "faq-5",
    question: "Do you provide content creation?",
    answer:
      "Yes. Content creation is one of our primary core disciplines. We provide professional camera shoots, creative direction, cinematic 4K video recording, high-converting copy, graphics, and trend-adapted social content.",
  },
  {
    id: "faq-6",
    question: "How does payment work?",
    answer:
      "We operate with 100% transparency: 50% advance to initiate production, and the remaining 50% balance upon final milestone approval and deployment. No hidden charges, setup fees, or surprise surcharges.",
  },
  {
    id: "faq-7",
    question: "Can you work with local businesses?",
    answer:
      "Absolutely. We have established experience working with local jewellery brands like Biswa Jewellers, cafes and culinary restaurants, retail showrooms, and corporate enterprises across Odisha and nationwide.",
  },
  {
    id: "faq-8",
    question: "Can you work with creators and personal brands?",
    answer:
      "Yes. We specialize in building authoritative digital presence for creators, consultants, and founders — amplifying personal voice through cinematic short-form video reels, bespoke portfolio websites, and audience conversion funnels.",
  },
];

export function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [inquiryText, setInquiryText] = useState("");

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inquiryText.trim()
      ? encodeURIComponent(`Hi Odisha Socials! I have a question: ${inquiryText}`)
      : encodeURIComponent("Hi Odisha Socials! I have a question about your services.");
    window.open(`https://wa.me/919040834651?text=${query}`, "_blank");
  };

  return (
    <div className="w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* ================================================================ */}
        {/* TWO-COLUMN ACCORDION & INQUIRY HOOK (REF VIDEO COMPOSITION)      */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* -------------------------------------------------------------- */}
          {/* LEFT COLUMN: INQUIRY HOOK & QUICK DIRECT CONTACT               */}
          {/* -------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col items-start text-left lg:sticky lg:top-28">
            <Badge variant="purple" withDot className="mb-4">
              <span>Frequently Asked Questions</span>
            </Badge>

            <div className="relative mb-5">
              <SparkDoodle
                variant="burst"
                className="absolute -top-7 -right-8 w-8 h-8 text-amber-500 hidden sm:block animate-pulse-soft"
              />
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-slate-900 leading-[1.15]">
                <div className="overflow-hidden py-0.5">
                  <motion.span
                    initial={{ opacity: 0, y: "105%" }}
                    whileInView={{ opacity: 1, y: "0%" }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    Got A Question
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
                    For Odisha Socials?
                  </motion.span>
                </div>
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8"
            >
              If there are questions you want to ask, we will answer all of them directly. Reach out anytime or send us your inquiry right here.
            </motion.p>

            {/* Direct Quick WhatsApp Inquiry Pill Input Form */}
            <form
              onSubmit={handleConsultSubmit}
              className="w-full relative flex items-center bg-white border border-slate-200/90 rounded-full p-1.5 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.08)] mb-8"
            >
              <input
                type="text"
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="Ask us anything..."
                className="w-full px-5 py-3 text-xs sm:text-sm text-slate-800 bg-transparent rounded-full focus:outline-hidden placeholder:text-slate-400"
              />
              <Button
                type="submit"
                variant="dark"
                size="sm"
                className="h-10 px-5 shrink-0 shadow-sm"
              >
                <span>Ask</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </form>

            {/* Direct Official Contact Cards */}
            <div className="w-full flex flex-col gap-3 pt-2">
              <a
                href={BRAND_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-200 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Chat on WhatsApp
                    </span>
                    <span className="text-3xs text-slate-500 font-medium">
                      9040834651 (Instant Response)
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-200 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Email Inquiries
                    </span>
                    <span className="text-3xs text-slate-500 font-medium">
                      {BRAND_CONFIG.contact.email}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* RIGHT COLUMN: ELEGANT EXPANDABLE ACCORDION LIST                */}
          {/* -------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 w-full">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "rounded-[26px] border transition-all duration-300 overflow-hidden",
                    isOpen
                      ? "bg-purple-50/50 border-purple-200 shadow-sm"
                      : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-black text-slate-900 pr-4 leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        isOpen
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-purple-100/60 pt-3.5 font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
