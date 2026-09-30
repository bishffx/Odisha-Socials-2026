import { ContactInfo, FAQItem, MetricItem, NavItem, ServiceItem, TestimonialItem } from "@/types";

export const BRAND_CONFIG = {
  name: "ODISHA SOCIALS",
  headline: "WE DON'T JUST MANAGE SOCIAL MEDIA.",
  headlineHighlight: "WE BUILD DIGITAL PRESENCE.",
  tagline: "GROW YOUR BRAND IN THE BEST WAYS.",
  description: "Odisha Socials discovers your brand, builds it, and makes it recognised.",
  contact: {
    email: "odishasocials@gmail.com",
    whatsapp: "9040834651",
    whatsappUrl: "https://wa.me/919040834651",
    instagram: "@odisha_socials",
    instagramUrl: "https://instagram.com/odisha_socials",
  } satisfies ContactInfo & { whatsappUrl: string; instagramUrl: string },
};

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Packages", href: "#packages" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const HERO_METRICS: MetricItem[] = [
  { value: "50M+", label: "Organic Views Delivered" },
  { value: "100+", label: "Brands Scaled" },
  { value: "4.9/5", label: "Client Satisfaction" },
  { value: "15+", label: "Digital Capabilities" },
];

export const BRAND_SERVICES: ServiceItem[] = [
  {
    id: "social-media-management",
    title: "Social Media Management",
    category: "Social & Content",
    description: "End-to-end strategic curation, scheduling, and community engagement to keep your audience hooked.",
    iconName: "Share2",
    badge: "Core Service",
  },
  {
    id: "reels-production",
    title: "Reels",
    category: "Social & Content",
    description: "High-retention short-form video scripting, cinematic shooting, dynamic editing, and trend-jacking.",
    iconName: "PlayCircle",
    highlight: "Viral Reach",
  },
  {
    id: "content-creation",
    title: "Content Creation",
    category: "Social & Content",
    description: "Visual storytelling, bespoke graphics, photography, and brand narratives that spark conversations.",
    iconName: "Sparkles",
  },
  {
    id: "brand-growth",
    title: "Brand Growth",
    category: "Growth & Strategy",
    description: "Holistic multi-channel scaling blueprints turning passive scrollers into passionate brand advocates.",
    iconName: "TrendingUp",
    badge: "High ROI",
  },
  {
    id: "website-development",
    title: "Website Development",
    category: "Web & 3D",
    description: "Blazing-fast, responsive web platforms built with modern technology, precision code, and high conversion flow.",
    iconName: "Code2",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    category: "Web & 3D",
    description: "Human-centric interfaces, intuitive user journeys, and tactile interactions tailored to your audience.",
    iconName: "Palette",
  },
  {
    id: "interactive-websites",
    title: "Interactive Websites",
    category: "Web & 3D",
    description: "Immersive micro-interactions, scroll-driven narratives, and bespoke animations that leave memorable impressions.",
    iconName: "Layers",
  },
  {
    id: "3d-websites",
    title: "3D Websites",
    category: "Web & 3D",
    description: "Cutting-edge spatial 3D elements, Three.js product showcases, and interactive 3D web environments.",
    iconName: "Box",
    badge: "Next Gen",
  },
  {
    id: "google-seo-analysis",
    title: "Google SEO Analysis",
    category: "Growth & Strategy",
    description: "Deep technical audits, keyword dominance strategies, and on-page optimizations to rank at the top.",
    iconName: "SearchCheck",
  },
  {
    id: "digital-strategy",
    title: "Digital Strategy",
    category: "Growth & Strategy",
    description: "Roadmaps engineered with market intelligence, positioning models, and data-backed milestones.",
    iconName: "Compass",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    category: "Growth & Strategy",
    description: "Real-time metrics, conversion funnels, audience telemetry, and transparent ROI reporting.",
    iconName: "BarChart3",
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    category: "Web & 3D",
    description: "24/7 uptime monitoring, continuous software updates, routine health checks, and effortless upkeep.",
    iconName: "ShieldAlert",
  },
  {
    id: "website-security",
    title: "Website Security",
    category: "Web & 3D",
    description: "Enterprise SSL standards, vulnerability patching, spam shielding, and robust data protection.",
    iconName: "ShieldCheck",
  },
  {
    id: "website-performance",
    title: "Website Performance",
    category: "Web & 3D",
    description: "Sub-second load times, Core Web Vitals optimization, asset compression, and edge caching.",
    iconName: "Zap",
  },
  {
    id: "competitor-research",
    title: "Competitor Research",
    category: "Growth & Strategy",
    description: "Exhaustive industry intelligence uncover untapped market gaps and strategic advantages.",
    iconName: "Radar",
  },
];

export const BRAND_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    quote: "Odisha Socials completely revolutionized our digital presence. Our Reels went from hundreds to hundreds of thousands of engaged views.",
    author: "Aditya Mohapatra",
    role: "Founder, Urban Crave",
    avatar: "/avatars/avatar-1.png",
    rating: 5,
  },
  {
    id: "2",
    quote: "They don't just post content; they engineered our entire brand identity and built our interactive website. True partners in growth.",
    author: "Priyanka Jena",
    role: "Marketing Director, Kalinga Luxe",
    avatar: "/avatars/avatar-2.png",
    rating: 5,
  },
  {
    id: "3",
    quote: "The visual aesthetic, speed, and creative energy Odisha Socials brings is unmatched. Our conversion rate tripled in two months.",
    author: "Rohan Senapati",
    role: "CEO, NexaVibe Studios",
    avatar: "/avatars/avatar-3.png",
    rating: 5,
  },
  {
    id: "4",
    quote: "Remarkable execution on both our 3D website and viral content strategy. Working with them was the best decision for our brand.",
    author: "Shreya Pattnaik",
    role: "Creative Lead, Bloom & Co",
    avatar: "/avatars/avatar-4.png",
    rating: 5,
  },
];

export const BRAND_FAQS: FAQItem[] = [
  {
    question: "What is Odisha Socials?",
    answer: "Odisha Socials is a full-spectrum digital presence and creative growth agency. We discover your brand's unique identity, build it through viral social media, high-retention reels, and high-performance interactive websites, and make it widely recognised.",
    category: "General",
  },
  {
    question: "What do you mean by 'We don't just manage social media. We build digital presence'?",
    answer: "Most agencies stop at posting generic graphics. We build a cohesive digital ecosystem—from viral short-form storytelling and brand positioning to interactive websites, 3D web experiences, SEO, and deep analytics that convert attention into sustainable brand equity.",
    category: "Strategy",
  },
  {
    question: "What digital services do you provide?",
    answer: "Our capabilities span 15 core services across three pillars: Social & Content (Social Media Management, Reels, Content Creation), Web & 3D (Website Development, UI/UX Design, Interactive Websites, 3D Websites, Maintenance, Security, Performance), and Growth & Strategy (Brand Growth, Google SEO Analysis, Digital Strategy, Data Analytics, Competitor Research).",
    category: "Services",
  },
  {
    question: "How do I get started with Odisha Socials?",
    answer: "You can reach out directly via WhatsApp at 9040834651, email us at odishasocials@gmail.com, or send a DM on Instagram @odisha_socials. We'll set up a brand discovery session to map your growth plan.",
    category: "Onboarding",
  },
  {
    question: "Do you build custom interactive & 3D websites?",
    answer: "Yes! We specialize in modern web experiences utilizing Next.js, interactive micro-animations, fluid layout transitions, and 3D web technologies to make your brand stand out from conventional static templates.",
    category: "Web & Tech",
  },
];
