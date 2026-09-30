# ODISHA SOCIALS — DESIGN SYSTEM & ARCHITECTURE SPECIFICATION

## 1. Reference Video Analysis & Deconstruction

Based on thorough frame-by-frame analysis of the reference video (`928aca8b8e476ade2d17a603c7e62015_720w.mp4`):

### A. Layout System & Viewport Architecture
- **Canvas-in-Canvas Presentation**: The site sits on an outer pastel lavender-neutral viewport (`#f2f3f8`), housing a central rounded canvas (`max-w-7xl`, `rounded-[36px]` to `rounded-[40px]`) with soft ambient drop-shadow. This establishes an approachable, premium, studio-grade aesthetic.
- **Vertical Rhythm**: Generous vertical breathability (`py-16` to `py-24` per section) preventing cognitive overload.
- **Section Breaks & Color Blocking**: High-contrast contrast bands (e.g. hero metric banner and footer block) ground the design and create natural resting points for the eyes.

### B. Color System
- **Canvas & Backgrounds**: Soft Lavender (`#f2f3f8`, `#f8f7ff`), Pure White (`#ffffff`), Warm Ivory (`#fcfbfe`).
- **Brand Primaries**:
  - Royal / Electric Blue: `#1d4ed8`, `#2563eb`, `#3b82f6`
  - Creative Violet / Purple: `#6d28d9`, `#7c3aed`, `#8b5cf6`
- **Soft Pastels (Pill & Icon Bubbles)**:
  - Lavender Tint: `#ede9fe`
  - Sky Blue Tint: `#dbeafe`
  - Subtle Pink Tint: `#fce7f3`
- **Warm & Energetic Accents**:
  - Star & Spark Amber: `#f59e0b`
  - Growth Emerald: `#10b981`
- **Typography & Ink**:
  - Primary Ink: `#0f172a` (deep slate/charcoal, avoiding harsh pure black)
  - Secondary Ink: `#475569`
  - Muted Ink: `#94a3b8`

### C. Typography Proportions & Scale
- **Display / Hero H1**: `font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-[56px] leading-[1.12]`
- **Section Headings H2**: `font-bold tracking-tight text-3xl sm:text-4xl text-slate-900 leading-[1.2]`
- **Card Titles H3**: `font-semibold text-lg sm:text-xl text-slate-900`
- **Body Text**: `text-base sm:text-lg text-slate-600 leading-relaxed font-normal`
- **Micro-Copy & Badges**: `text-xs sm:text-sm font-semibold tracking-wide uppercase`

### D. Border Radius Hierarchy
- **Pill Radius (`rounded-full`)**: Buttons, badges, search bars, email input fields.
- **Card Radius (`rounded-3xl` / `28px`)**: Service cards, testimonial cards, interactive preview cards.
- **Hero Metric Banner (`rounded-2xl` / `24px`)**: Docked contrast bar.
- **Outer Canvas (`rounded-[36px]` / `rounded-[40px]`)**: Main website container.

### E. Card & Elevation System
- **Base Cards**: White background, 1px subtle slate border (`border-slate-200/80`), soft shadow (`0 12px 32px -8px rgba(15, 23, 42, 0.06)`).
- **Hover State**: `-translate-y-1.5`, elevation shadow bloom with subtle violet undertone (`0 20px 40px -10px rgba(124, 58, 237, 0.12)`).

### F. Animation & Micro-Interaction Rhythm
- **Smooth Momentum Scrolling**: Lenis inertial scrolling provider configured for 60fps buttery fluidity.
- **Spring Physics**: Button hover (`scale: 1.025`), tap (`scale: 0.96`), spring stiffness 400, damping 20.
- **Floating Decorative Elements**: Hand-drawn SVG sparkles, squiggles, bursts, and badge chips floating with gentle sine-wave offsets.
- **Interactive Map / Showcase**: Hoverable interactive pins with glowing pulse rings and thumbnail popups.
- **Community Avatar Network**: Floating 3D-styled avatar chips with social badges (Instagram, TikTok, X, YouTube) and conversation speech bubbles.

---

## 2. Component Architecture Blueprint

```
src/
├── app/
│   ├── layout.tsx              # Root HTML, fonts, metadata, Lenis provider
│   ├── page.tsx                # Composition of sections inside CanvasContainer
│   └── globals.css             # Tailwind v4 theme, design tokens, keyframes
├── components/
│   ├── layout/
│   │   ├── canvas-container.tsx # Main rounded presentation canvas
│   │   ├── navbar.tsx           # Floating pill navigation with mobile menu
│   │   └── footer.tsx           # Rich curved brand footer with contact info
│   ├── ui/
│   │   ├── button.tsx           # Spring-animated pill button (5 variants)
│   │   ├── badge.tsx            # Pill badge with soft tint themes
│   │   ├── card.tsx             # Rounded-3xl card with hover elevation
│   │   └── spark-doodle.tsx     # Custom SVG squiggles, bursts, and loops
│   ├── sections/
│   │   ├── hero.tsx             # Hero with headline, CTA, floating phone/mockup
│   │   ├── metrics-banner.tsx   # Contrasting royal banner with key metrics
│   │   ├── services-grid.tsx    # 4-col service overview & detailed cards
│   │   ├── brand-presence.tsx   # Interactive map/grid with location & project pins
│   │   ├── community.tsx        # Floating social avatar network & speech bubbles
│   │   ├── testimonials.tsx     # Sliding carousel with rating stars & quotes
│   │   └── faq-newsletter.tsx   # 2-col accordion FAQs + sleek email pill input
│   └── animations/
│       └── smooth-scroll.tsx    # Lenis smooth scroll provider
├── constants/
│   └── brand.ts                 # Odisha Socials official copy, services, metrics
├── types/
│   └── index.ts                 # TypeScript interfaces
└── lib/
    └── utils.ts                 # Class merger utility (clsx + tailwind-merge)
```

---

## 3. Brand Information Integration

- **Brand**: ODISHA SOCIALS
- **Core Positioning**:
  - "WE DON'T JUST MANAGE SOCIAL MEDIA. WE BUILD DIGITAL PRESENCE."
  - "GROW YOUR BRAND IN THE BEST WAYS."
- **Description**: Odisha Socials discovers your brand, builds it, and makes it recognised.
- **Full Capabilities (15 Services)**:
  1. Social Media Management
  2. Reels
  3. Content Creation
  4. Brand Growth
  5. Website Development
  6. UI/UX Design
  7. Interactive Websites
  8. 3D Websites
  9. Google SEO Analysis
  10. Digital Strategy
  11. Data Analytics
  12. Website Maintenance
  13. Website Security
  14. Website Performance
  15. Competitor Research
- **Official Contact**:
  - Email: `odishasocials@gmail.com`
  - WhatsApp: `9040834651`
  - Instagram: `@odisha_socials`
