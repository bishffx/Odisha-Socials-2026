import type { Metadata, Viewport } from "next";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import "./globals.css";

const siteUrl = "https://odishasocials.com";

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Odisha Socials — Digital Presence, Social Media & Web Development",
  description:
    "Odisha Socials builds digital presence through social media, content creation, websites, UI/UX, SEO and digital growth strategies.",
  keywords: [
    "Odisha Socials",
    "digital presence",
    "social media management",
    "reels production",
    "content creation",
    "website development",
    "UI/UX design",
    "SEO growth",
    "Odisha digital agency",
  ],
  authors: [{ name: "Odisha Socials", url: siteUrl }],
  creator: "Odisha Socials",
  publisher: "Odisha Socials",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Odisha Socials",
    title: "Odisha Socials — Digital Presence, Social Media & Web Development",
    description:
      "Odisha Socials builds digital presence through social media, content creation, websites, UI/UX, SEO and digital growth strategies.",
    images: [
      {
        url: "/images/hero_reel_showcase.jpg",
        width: 1200,
        height: 630,
        alt: "Odisha Socials — We Build Digital Presence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Odisha Socials — Digital Presence, Social Media & Web Development",
    description:
      "Odisha Socials builds digital presence through social media, content creation, websites, UI/UX, SEO and digital growth strategies.",
    creator: "@odisha_socials",
    images: ["/images/hero_reel_showcase.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Odisha Socials",
  url: siteUrl,
  logo: `${siteUrl}/images/hero_3d_camera.jpg`,
  image: `${siteUrl}/images/hero_reel_showcase.jpg`,
  description:
    "Odisha Socials builds digital presence through social media, content creation, websites, UI/UX, SEO and digital growth strategies.",
  telephone: "+919040834651",
  email: "odishasocials@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Odisha",
    addressCountry: "IN",
  },
  sameAs: ["https://instagram.com/odisha_socials"],
  priceRange: "₹₹",
  knowsAbout: [
    "Social Media Management",
    "Viral Reels Production",
    "Website Development",
    "UI/UX Design",
    "Search Engine Optimization (SEO)",
    "Digital Brand Growth",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#f2f3f8] text-slate-900 antialiased selection:bg-purple-200 selection:text-purple-900">
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
