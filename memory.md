# Project Memory: Personal Portfolio Website

This document serves as the long-term memory for this portfolio project. It details the project overview, tech stack, architecture, folder structure, conventions, styling, animations, reusable components, and development notes, enabling future developers or AI sessions to immediately understand the project state.

---

## 1. Project Overview & Architecture

The project is a premium, single-page interactive personal portfolio website designed for **Ahmed Raza**, a Full Stack Developer / IT Technician. It is built to offer a highly smooth, responsive user experience utilizing modern frontend technologies and scroll-based web animations.

### High-Level Architecture
- **Single-Page Landing Page (`Home.jsx`)**: The entire website acts as a single scrolling view composed of modular section components (`Hero`, `Marquee`, `Services`, `LogoLoop`, `Projects`, `Testimonials`, `About`, `CTA`, `Footer`).
- **Initial Loading Sequence (`Loader.jsx` & `App.jsx`)**:
  - On mount, `App.jsx` renders a visual `<Loader />` that covers the screen.
  - The loader provides an initial intro effect. After 2.5 seconds, the loader fades out, and at 3.0 seconds it is removed.
  - Upon loader removal, `AppReadyContext` broadcasts `appReady = true` to all child components. This prevents animations (specifically GSAP ScrollTrigger and entrance timelines) from running while the loader is still covering the page, avoiding layout shifts or flash of unstyled content (FOUC).
- **Smooth Scrolling (`lenis`)**: Lenis is integrated (instantiated globally) to manage scroll physics, giving the scroll-based animations a sleek, premium feel.

---

## 2. Tech Stack & Dependencies

The application relies on the following key tools and libraries:

### Core Framework
- **React 18.2.0**: Handles the component hierarchy and UI rendering.
- **Vite 8.0.1**: Acts as the build tool/bundler, providing fast Hot Module Replacement (HMR).
- **React Router DOM 7.13.2**: Provides lightweight routing structure mapping `/` and `/home` to the landing page.

### Styling & Theming
- **Tailwind CSS v4.2.2**: The main CSS framework, using utility classes for styling.
- **Autoprefixer / PostCSS**: Standard CSS post-processing pipeline.

### Animation Engine
- **GSAP 3.14.2 & @gsap/react 2.1.2**: Power all scroll-triggered transitions, entrance reveals, custom timeline animations, and hover behaviors.
- **Lenis 1.3.23**: Delivers smooth scrolling physics.

### Icons
- **lucide-react 1.8.0** & **react-icons 5.6.0**: Provide standard vector iconography.

---

## 3. Folder Structure & Code Conventions

The workspace is organized as follows:

```text
portfolio/
├── index.html                  # Main HTML entry point
├── tailwind.config.js          # Tailwind CSS settings
├── vite.config.js              # Vite configuration
├── package.json                # Project dependencies and npm scripts
├── memory.md                   # Long-term AI & developer memory (this file)
└── src/
    ├── main.jsx                # React root mount point (renders <App /> inside StrictMode)
    ├── App.jsx                 # Global Layout, Context Providers, Navbar, Widgets, Customizers
    ├── index.css               # Global Tailwind CSS imports, keyframes, and base theme overrides
    ├── App.css                 # Helper classes and legacies
    ├── assets/                 # Image and vector assets
    │   ├── hero.png            # Main portrait of Ahmed Raza
    │   ├── robot.png           # Graphic assets
    │   └── projects/           # Image screenshots of portfolio projects
    │       ├── dental-clinic.png
    │       └── salon.png
    ├── context/
    │   └── AppReadyContext.jsx # Broadcasts app readiness after loader timeout completes
    ├── routes/
    │   └── AppRoutes.jsx       # Simple router configuration
    ├── pages/
    │   └── Home.jsx            # Landing page compiling all home sections and refreshing ScrollTriggers
    └── components/             # Reusable & layout components
        ├── Navbar.jsx          # Custom floating header with scroll-sync and jelly wobble active indicator
        ├── Loader.jsx          # Interactive initial load sequence
        ├── ThemeToggle.jsx     # Modern sliding theme switch between Dark & Light mode
        ├── ThemeCustomizer.jsx # Widget allows users to set accent color presets dynamically
        ├── WhatsAppWidget.jsx  # Floating WhatsApp direct-chat overlay
        └── home/               # Section-specific components
            ├── Hero.jsx        # Top banner with animated profile badges and entrance timeline
            ├── Marquee.jsx     # Double-row infinite text loops
            ├── Services.jsx    # Core expertise grid with scaling gradient cards
            ├── LogoLoop.jsx    # Auto-scrolling infinite tech-stack logo carousel
            ├── Projects.jsx    # Alternating layout project card list (with static preview cards)
            ├── Testimonials.jsx# Interactive customer quote carousel slider with GSAP transitions
            ├── About.jsx       # Story block showing years of experience & counter statistics
            └── CTA.jsx         # Bottom action card leading to email/contact details
```

---

## 4. Theme and Styling Engine

The portfolio includes a fully interactive, custom color palette and theme customization engine.

### Global Design Tokens
The design tokens are defined in [src/index.css](file:///d:/Ahmed%20Raza/Web%20Development/Personal-Project/Raza/portfolio/src/index.css):
- Primary CSS variables for the accent colors are set under `:root`:
  - `--primary-600`: Defaults to Teal (`#0d9488`).
  - `--primary-400`: Defaults to Light Teal (`#2dd4bf`).
  - `--primary-50`: Defaults to Pale Teal (`#f0fdfa`).
  - `--primary-900`: Defaults to Dark Teal (`#134e4a`).
- Under Tailwind's theme config, standard blue color variants (`--color-blue-50` to `--color-blue-950`) are mapped directly to these CSS custom properties. As a result, switching the accent color preset dynamically changes all Tailwind blue utility colors (e.g. `bg-blue-600`, `text-blue-400`) throughout the entire codebase.

### Theme Customizer (`ThemeCustomizer.jsx`)
Allows users to switch between several color presets (Teal, Blue, Indigo, Violet, Rose, Amber). When selected, the customizer writes the corresponding color codes directly to `:root` document styles:
```javascript
document.documentElement.style.setProperty('--primary-600', color[600]);
document.documentElement.style.setProperty('--primary-400', color[400]);
// ... etc
```

### Dark/Light Mode Mode (`ThemeToggle.jsx`)
Provides a premium toggling switch that syncs with `localStorage` and appends the `.dark` class to `document.documentElement` for Tailwind-native dark/light mode rendering.

---

## 5. Reusable Components & Interaction Logic

### Navbar (`Navbar.jsx`)
- **Sticky & Blur Layout**: Stays fixed at the top with a glassmorphism blur background.
- **Scroll Syncing**: Uses GSAP ScrollTriggers on section headings to automatically track scroll progress and mark the current active section inside the navigation menu.
- **Jelly Wobble Active Indicator**: When a navigation item becomes active, it triggers a custom GSAP timeline that applies a horizontal elastic wobble (`scaleX`, `scaleY`, and `x` offsets) to the active pill background for a premium feel.

### Projects List (`Projects.jsx`)
- Displays portfolio projects using an alternating side-by-side design (Image on left/Text on right, switching order on alternating rows).
- **Preview Cards**: Render static project previews. The images scale up gently on hover (`group-hover:scale-105`) with smooth transition timing.
- **Supported Fields**: `title`, `category`, `image`, `isComingSoon`, `liveLink`, `desc`.

### Testimonials Carousel (`Testimonials.jsx`)
- A slide-based review card system.
- **Transitions**: Changing slides triggers a custom GSAP timeline that fades out the current text with a blur filter (`filter: "blur(10px)", opacity: 0, y: -20`), updates the state index, and slides in the new review with a reverse entrance blur fade.
- **Auto-Play**: Automatically cycles through testimonials every 5 seconds.

---

## 6. Key Animations & GSAP Conventions

All animations are localized to their respective components and managed via the `@gsap/react` `useGSAP` hook for safe scoping and clean cleanup on component unmount.

### Common Scroll Animations
- **Header Reveal**: Section headers slide up from `y: 60` or `y: 40` with an opacity fade using ease `power3.out`.
- **Background Parallax Text**: Giant background text sections (like `CORE EXPERTISE` in `Services.jsx` or `DISCOVER THE STORY` in `About.jsx`) move horizontally in response to scroll position via a scrubbed ScrollTrigger.
- **Staggered Cards Grid**: Grid elements slide up sequentially with a `stagger: 0.1` delay.

---

## 7. Developer & Extension Guidelines

### Adding a New Project
To list a new project, edit the `projects` list in `src/components/home/Projects.jsx`:
```javascript
{
  id: 4,
  title: "New Project Title",
  category: "Tech Stack • Tech Stack",
  image: projectImageVariable,
  isComingSoon: false,
  liveLink: "https://yourlink.com",
  desc: "Project details here..."
}
```

### Adding a Home Page Section
1. Build the component in `src/components/home/`.
2. Wrap scroll-based animations inside a `useGSAP` hook using a scoped container reference.
3. Import and place the component in `src/pages/Home.jsx`.
4. Add the section ID (e.g. `id="mysection"`) so the `Navbar` scroll tracker can hook it up.

### Scripts
- `npm run dev`: Boots the local development environment with HMR.
- `npm run build`: Packages and optimizes the build for production.
- `npm run lint`: Performs linting checks with ESLint.
- `npm run preview`: Previews the compiled build locally.
