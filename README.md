# AVATAR Advertising Agency

**Premium Creative Advertising Agency Website**

## 🚀 Project Overview

A modern, animated website for AVATAR Advertising Agency (أفتار للدعاية والإعلان) built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

### 🎨 Design
- **Theme**: Deep Navy (#0A1D37) + Gold (#D4AF37)
- **RTL Support**: Full Arabic language support
- **Responsive**: Mobile-first design approach
- **Dark Mode**: Elegant dark theme throughout

### 🎬 Animations
- **Intro Animation**: Frame-based loading sequence with canvas rendering
- **Scroll-triggered Animations**: Parallax effects and reveals
- **3D Transformations**: Diamond logo with 3D rotations
- **Mouse Interactions**: Hover effects and cursor tracking
- **Service Panels**: Elastic expansion with ripple effects
- **Typing Effect**: Animated slogan text

### 📱 Sections
1. **Hero**: 3D diamond logo, animated slogans, floating particles
2. **About**: 3D statue visualization, company values grid
3. **Services**: 9 expandable service panels with unique colors
4. **Portfolio**: Film strip gallery with horizontal scroll
5. **Contact**: 3D form with validation and social links
6. **Footer**: Multi-column layout with animations

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.23.2
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Geist Sans/Mono, Cairo (Arabic)

## 📦 Installation

```bash
# Navigate to project directory
cd avatar-agency

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` and `src/app/globals.css`:
- Primary Gold: `#D4AF37`
- Background Navy: `#0A1D37`
- Secondary: `#152d4a`

### Services
Modify the services array in `src/components/sections/services-section.tsx`:
```typescript
const services = [
  {
    id: 1,
    icon: Globe,
    title: "Your Service Name",
    titleEn: "English Name",
    description: "Service description...",
    cta: "Call to Action",
    bg: "#HEXCOLOR",
    bgExpanded: "linear-gradient(...)",
    accent: "#ACCENTCOLOR",
  },
  // ...more services
];
```

### Portfolio Items
Update portfolio in `src/components/sections/portfolio-section.tsx`:
```typescript
const portfolioItems = [
  { id: 1, title: "Project Title", category: "Category", color: "#HEXCOLOR", year: "2024" },
  // ...more items
];
```

## 📂 Project Structure

```
avatar-agency/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles & animations
│   │   ├── layout.tsx           # Root layout with fonts
│   │   └── page.tsx             # Main page
│   ├── components/
│   │   ├── intro-animation.tsx  # Loading animation
│   │   ├── navigation.tsx       # Header navigation
│   │   ├── footer.tsx           # Footer component
│   │   ├── sections/
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── services-section.tsx
│   │   │   ├── portfolio-section.tsx
│   │   │   └── contact-section.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   └── hooks/
├── public/
│   └── images/                  # Static images
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## 🎯 Animation Details

### Hero Section
- 3D Diamond logo with infinite rotation (25s)
- Pulsing glow effects
- Typing cursor animation for slogans
- Scroll-triggered parallax (opacity, scale, translateY)

### Services Section
- Elastic panel expansion (flex ratio: 1 → 5 → 12)
- Mouse-following glow with spring physics
- Zoom/speed lines effect on hover
- Fabric stretch ripples on panel exit
- 3D card lift on hover

### Portfolio Section
- Horizontal scroll linked to vertical scroll progress
- Film strip perforation effect
- Card hover: scale, translateY, overlay fade-in
- Eye icon rotation animation

### Contact Section
- 3D form tilt on hover (rotateX/Y: ±2°)
- Staggered form field entrance animations
- Loading spinner for submit button
- Success state with checkmark animation

## 🔧 Performance Optimizations

- Predefined particle positions to avoid hydration mismatches
- Canvas-based frame rendering for intro animation
- `will-change` CSS property for animated elements
- RequestAnimationFrame for smooth animations
- Debounced scroll event handling

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Support

For questions or issues, please open an issue on the repository.

---

**Created with ❤️ by AVATAR Advertising Agency**
