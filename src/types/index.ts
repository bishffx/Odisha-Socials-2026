export interface ServiceItem {
  id: string;
  title: string;
  category: "Social & Content" | "Web & 3D" | "Growth & Strategy";
  description: string;
  iconName: string;
  highlight?: string;
  badge?: string;
}

export interface MetricItem {
  value: string;
  label: string;
  suffix?: string;
  sublabel?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  instagram: string;
}
