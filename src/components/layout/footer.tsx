import { BRAND_CONFIG, BRAND_SERVICES, NAV_LINKS } from "@/constants/brand";
import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/social-icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0b1020] text-white rounded-t-[36px] sm:rounded-t-[48px] overflow-hidden pt-16 sm:pt-20 pb-12 px-6 sm:px-12 lg:px-16 mt-20 relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-black">
                OS
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                {BRAND_CONFIG.name}
              </span>
            </div>

            <p className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-2">
              {BRAND_CONFIG.headline} {BRAND_CONFIG.headlineHighlight}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm font-normal">
              {BRAND_CONFIG.description}
            </p>

            {/* Social & Contact Badges */}
            <div className="flex flex-wrap gap-2.5">
              <a
                href={BRAND_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat on WhatsApp at ${BRAND_CONFIG.contact.whatsapp}`}
                className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{BRAND_CONFIG.contact.whatsapp}</span>
              </a>

              <a
                href={BRAND_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow on Instagram at ${BRAND_CONFIG.contact.instagram}`}
                className="flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>{BRAND_CONFIG.contact.instagram}</span>
              </a>
            </div>
          </div>

          {/* Column 1: Navigation Directory */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-300 font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors inline-flex items-center group relative w-fit"
                  >
                    <span>{link.label}</span>
                    <span className="absolute left-0 bottom-[-2px] w-full h-[1.5px] bg-purple-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Core Capabilities */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Capabilities
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-300 font-medium">
              {BRAND_SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors inline-flex items-center group relative w-fit"
                  >
                    <span>{s.title}</span>
                    <span className="absolute left-0 bottom-[-2px] w-full h-[1.5px] bg-purple-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Inquiries */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="hover:text-white transition-colors flex items-center gap-2 group"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-xs break-all">{BRAND_CONFIG.contact.email}</span>
              </a>

              <a
                href={BRAND_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs">Chat on WhatsApp (9040834651)</span>
                <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              </a>

              <p className="text-xs text-slate-500 pt-2 leading-relaxed">
                Direct consultation for brand scaling, viral reels, and interactive 3D web platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {BRAND_CONFIG.name}. All rights reserved.</p>
          <p className="text-slate-400 font-medium">
            {BRAND_CONFIG.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
