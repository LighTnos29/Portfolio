## Portfolio Client – Design & Implementation Plan

### 1. Project Overview

- **Tech stack**: React + Vite, Tailwind-style utility classes (via `className`) and inline styles, GSAP for animations.
- **Layout so far**: Global background with animated gradient "blobs", fixed glassmorphism navbar, techy glass hero section as main above-the-fold content.

### 2. Implemented Features (Till Now)

- **BackgroundGradient component**
  - Three animated blurred balls using **GSAP timelines** for continuous motion, scaling, and opacity pulsing.
  - Responsiveness: animation ranges adapt to screen width (mobile / tablet / small desktop / large desktop).
  - Positioned as `fixed` elements behind content to create a soft ambient glow.
- **Navbar component**
  - Fixed at top (`fixed top-0 left-0 right-0 z-50`) over of animated background.
  - **Desktop navigation**: section links (`#work`, `#experience`, `#about`, `#skills`, `#projects`) and a primary **Contact Me** button.
  - **Mobile navigation**:
    - Glassmorphism circular toggle button with animated hamburger / close icon.
    - Full-height right-side **glass side-drawer** with blurred background and section links.
    - Animated open/close using GSAP (fade + slide, staggered menu item entrance).
- **App layout**
  - Root background set to **solid black** (`backgroundColor: '#000000'`).
  - `BackgroundGradient`, `Navbar`, and `Hero` are composed in `App.jsx`.
  - `Hero` component is a tech-focused glass hero section introducing the developer and CTAs.

- **Hero component**
  - Full-width section below navbar (`id="home"`) aligned with the dark + glassmorphism theme.
  - Left side (minimal copy):
    - Status pill ("Technology geek · Frontend") inside a glass chip (`bg-white/5`, `border-white/10`, `backdrop-blur-md`).
    - Main heading with gradient text span using soft blue/cyan shades (`from-sky-400 via-sky-300 to-cyan-300`) that match the existing glow theme.
    - Short single-sentence description focused on fast, clean, animated web experiences.
    - Primary CTA button "View Projects" (glass button with cyan/sky glow) and secondary "Contact Me" button.
  - Right side:
    - Techy glass "system panel" card with glow border, status dots, and system text (Tech Geek · Frontend Engineer).
    - Two stat cards showing "Focus" (Frontend Systems) and "Currently exploring" (Web performance), each with glassmorphism styling.
      - Skill bar for "Frontend signal" using a blue/cyan gradient.
  - Hero entrance and motion:
    - Uses **GSAP** to animate in the left content, status pill, CTA buttons, and right glass panel on mount.
    - Right glass panel has a subtle, continuous float animation (`y` oscillation with `sine.inOut`) to reinforce the techy/animated feel.

- **Tech Stack Marquee**
  - Animated scrolling logos from right to left with fade effect
  - Glassmorphism backgrounds for all logo containers
  - Current logos: React, Node.js, Three.js, Python, JavaScript, GitHub, Tailwind CSS, Next.js, Postman
  - Seamless looping with duplicate logo sets
  - Responsive sizing and object-contain for proper logo display

### 3. Visual Design System

#### 3.1 Theme Type

- **Base theme**: Dark, minimal, neon-accent portfolio.
- **Effects**:
  - **Glassmorphism** for navigation and key UI surfaces:
    - `backdrop-blur-md` / `backdrop-blur-xl`
    - Semi-transparent backgrounds: `bg-white/5`, `bg-white/10`, `bg-white/20`
    - Light borders: `border border-white/10`, `border-white/20`, `border-white/40`
  - **Soft glow gradients** via blurred colored circles behind content.

#### 3.2 Core Colors

- **Background**
  - `#000000` – main page background.
- **Primary text**
  - `#FFFFFF` – main headings and logo.
  - `#D1DAE0` – body/navigation text (set via inline style on navbar links).
  - `text-white/70` – slightly muted portion of logo and secondary text.
  - `text-white/50` – subtle section labels in mobile menu.
- **Accents & Surfaces (Glassmorphism)**
  - `bg-white/5`, `bg-white/10`, `bg-white/20` – translucent panels and buttons.
  - Borders: `border-white/10`, `border-white/20`, `border-white/30`, `border-white/40`.
  - Hover states generally increase background opacity and border contrast (e.g. `hover:bg-white/20`, `hover:border-white/40`).

#### 3.3 Gradient / Glow Colors (Background Balls)

- **Ball 1 (left / top)**
  - Color: `#93C5FD` (light blue).
  - Size: 300–600px depending on breakpoint.
  - Opacity: ~0.25 with heavy blur (`filter: 'blur(80px)'`).
- **Ball 2 (right / top)**
  - Color: `#8B5CF6` (purple).
  - Size: 250–550px.
  - Opacity: ~0.20 with blur (`filter: 'blur(70px)'`).
- **Ball 3 (center / bottom)**
  - Color: `#0AD3F5` (teal / cyan).
  - Size: 200–500px.
  - Opacity: ~0.18 with blur (`filter: 'blur(60px)'`).

#### 3.4 Typography

- **Primary font**: `'Poppins, sans-serif'` (set inline on logo and nav/menu text).
- **Logo**:
  - Text: `Lightnos.dev`
  - Styles: `text-white` for "Lightnos", `text-white/70` for `.dev`, tracking tighter, responsive font sizes (`text-xl` to `text-3xl`).
- **Nav text & buttons**:
  - Font weight: `font-medium` or `font-bold` for emphasis.
  - Sizes: `text-sm` to `text-lg` depending on breakpoint.

### 4. Animation & Interaction Details

- **BackgroundGradient**
  - Uses multiple GSAP timelines for each ball:
    - Smooth elliptical / figure-8 / orbital paths with `sine.inOut` and `power2.inOut` easing.
    - Infinite loops (`repeat: -1`), yoyo scaling, and opacity pulsing for a living background.
    - Responsive motion ranges based on `window.innerWidth`:
    - Mobile: smaller X/Y ranges.
    - Desktop: larger ranges, creating more dramatic movement.
    - Window resize listener recalculates ranges (currently just clears props; can be improved later to restart timelines).
- **Navbar (Desktop)**
  - Hover transitions on links: `transition-colors duration-300`, hover to full white text.
  - Contact button: glass button with background, border, and text color transitions.
- **Navbar (Mobile)**
  - **Hamburger icon** transforms into an "X" using `rotate-45`, `-rotate-45`, and `opacity-0` on middle bar.
  - **Side drawer**:
    - Opens with GSAP: from `opacity: 0, x: 300` to `opacity: 1, x: 0`.
    - Menu items animate in with staggered entrance from the right (`x: 30` → `0`).
    - Backdrop: `fixed inset-0 bg-black/50 backdrop-blur-sm` for dimming/blur behind menu, closes on click.

- **Hero Component**
  - Entrance animations using GSAP for left content, status pill, CTA buttons, and right glass panel
  - Floating animation for right glass panel using sine.inOut easing
  - Tech stack marquee animation:
    - Continuous horizontal scrolling from right to left
    - Fade effect using CSS mask-image for smooth entry/exit
    - Seamless looping with duplicate logo sets

### 5. Component-Level Notes

- **`App.jsx`**
  - Wraps everything in a `div` with `min-h-screen` and black background.
  - Composition order (top to bottom): `BackgroundGradient` → `Navbar` → `Hero`.
  - `Hero` is expected to occupy the main viewport area under the navbar.
- **`BackgroundGradient.jsx`**
  - Should always be mounted near the top of the tree so its `fixed` elements sit underneath main content.
  - Z-index is `0`; ensure primary content uses a higher z-index if needed.
- **`Navbar.jsx`**
  - Fixed + high `z-index` (`z-50`) to float above gradients and content.
  - Mobile menu uses React state + refs to coordinate GSAP animations.
  - All nav items use `href` with hash IDs; corresponding sections must use matching `id` attributes.
- **`Hero.jsx`**
  - **Typography**: Poppins font family throughout for consistency
  - **CTA Buttons**: "Full Stack" and "Problem Solver" with glassmorphism styling
  - **Tech Stack Display**: Animated marquee with glassmorphic logo containers
  - **Logo Assets**: Uses actual image files from assets/images folder
  - **Responsive Design**: Mobile-first approach with proper breakpoints

### 6. Guidelines for Future Development

- **General**
  - Keep the **dark + neon glow + glassmorphism** identity consistent.
  - Prefer **utility classes** + small inline style overrides (for colors like `#D1DAE0`) over large custom CSS when possible.
  - When adding new sections (Work, Experience, About, Skills, Projects, Contact), ensure:
    - The section `id` matches navbar `href`.
    - Section background respects the glass/gradient layers (avoid full-bleed opaque panels everywhere).
- **Colors**
  - Reuse existing accents (`#93C5FD`, `#8B5CF6`, `#0AD3F5`, `#D1DAE0`, white with opacity) for buttons, highlights, and borders.
  - If new colors are introduced, document them here with:
    - Hex value
    - Usage (e.g., primary button, warning, badge)
    - Accessibility considerations (contrast vs background).
- **Components**
  - For new glass components (cards, modals, etc.), follow this pattern:
    - Background: `bg-white/5`–`bg-white/15`
    - Blur: `backdrop-blur-md` or higher
    - Border: `border-white/10`–`border-white/30`
    - Hover: slightly increase opacity and border contrast.
- **Animations**
  - Use GSAP for complex or continuous animations; for simple hover/fade/slide, rely on CSS transitions.
  - Keep animation durations moderate (0.3–0.5s for UI, multi-second loops for background).
  - Avoid over-animating content that may distract from reading.

### 7. Maintenance Notes (For Current & Future Devs)

- **When changing theme/colors**
  - Update both:
    - The `BackgroundGradient` color props.
    - Navbar text/button colors and glass backgrounds.
    - Then document any changes in this `plan.md` under **Visual Design System**.
- **When adding new pages/sections**
  - Add navigation links in `Navbar.jsx` (desktop + mobile).
  - Ensure section anchors (`id`) and link `href`s remain in sync.
  - Consider whether each new section needs its own subtle glass surface or can sit directly on the gradient background.
- **When refactoring**
  - If pulling styles into dedicated CSS/Tailwind config, keep this file as a source-of-truth description of the design language.
  - Note here if any major structural changes occur (e.g., new layout system, different animation approach, light theme toggle, etc.).

> Keep this file up to date whenever you:
> - Change colors or theme style.
> - Add major sections or components.
> - Introduce new animation patterns or layout systems.
