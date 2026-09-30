# Odisha Socials 2026

> Full-Stack Digital Growth Studio — Social Media, Viral Content, High-Performance Web & Spatial 3D Experiences.

Updated version of the **Odisha Socials** brand with high-end UI/UX architecture, cinematic motion design, interactive Three.js 3D camera layer, and conversion-engineered digital experiences.

---

## Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Core Library**: React 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion & Kinematics**:
  - [GSAP](https://greensock.com/gsap/) + ScrollTrigger
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth Inertial Scrolling)
  - [Motion](https://motion.dev/) (Framer Motion)
- **3D & WebGL**: [Three.js](https://threejs.org/) (Procedural low-poly ambient spatial camera)
- **Icons**: Lucide React
- **Deployment**: [Vercel](https://vercel.com)

---

## Key Features

1. **Cinematic Camera Scroll System**
   - Multi-scene spatial viewport choreography with progressive enter, focus, and recede transitions.
   - Parallax depth layering across background, midground, and foreground planes.
   - 100% stable during rapid scroll, trackpad gestures, and reverse direction changes.

2. **Landzy Dark Purple Pricing Architecture**
   - Cosmic obsidian glassmorphism (`backdrop-blur-2xl`) with concentric radar rings and ambient violet/fuchsia glow.
   - Dual package switchers: **Website Packages** (₹8k, ₹14k, ₹20k) and **Social Media Packages** (₹10k, ₹15k, ₹20k/mo).
   - Fully optimized for mobile screens (iPhone, Android) with high-contrast legibility and native touch feedback (`active:scale-[0.98]`).

3. **Lightweight Ambient 3D Scene**
   - Procedural WebGL objects: floating smartphone slate, glass browser frame with traffic-light indicators, camera lens barrel, and brand geometric toruses.
   - Spring-damped `lerp` camera tracking across scroll sections with subtle cursor parallax.
   - Automatic mobile bypass: skips WebGL on mobile devices to preserve 60fps performance and battery life.

4. **Tactile Micro-Interactions**
   - **Magnetic Buttons**: Clamped strictly to 8–12px with spring physics on major CTAs (*WORK WITH US*, *CHAT WITH US*, *LET'S TALK*).
   - **Custom Desktop Cursor**: 6 contextual states (`default`, `link`, `button`, `image`, `project`, `drag`), automatically disabled on touch devices.
   - **Gliding Navbar Pill**: Animated layout pill following active scroll progress and hover state.

5. **Performance & Vercel Production Ready**
   - Sub-second Core Web Vitals optimization.
   - Zero layout thrashing: cached layout metrics and RAF-throttled scroll listeners.
   - Dedicated GPU compositor layers for marquee tracks.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## Production Build & Verification

```bash
# Create an optimized production build
npm run build

# Start the production server locally
npm run start
```

---

## Deploy to Vercel

1. Push this repository to GitHub: `https://github.com/bishffx/odisha-socials-2026.git`
2. Import the project in [Vercel Dashboard](https://vercel.com/new).
3. Framework Preset: **Next.js**
4. Build Command: `npm run build`
5. Output Directory: `.next`
6. Click **Deploy**.

---

© 2026 Odisha Socials. All rights reserved.
