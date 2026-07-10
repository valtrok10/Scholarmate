---
name: Vivid Lumina
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 20px
  margin-sm: 16px
  margin-md: 32px
  margin-lg: 64px
---

## Brand & Style

The design system is a high-fidelity fusion of **Futuristic Minimalism** and **Sophisticated Glassmorphism**. It is engineered to evoke a sense of "premium speed" and intellectual energy, specifically targeting a high-performance demographic that values both aesthetics and technical precision.

The visual narrative is built on deep-space foundations interrupted by high-frequency light. By leveraging translucency and vibrant "electric" accents, the UI feels lightweight yet structurally sound. The atmosphere is nocturnal, professional, and forward-leaning—shifting away from static flat design toward a living, breathing digital environment that reacts to user interaction with luminous depth.

## Colors

The palette is anchored in a multi-layered dark mode. The background uses a rich, desaturated navy (`#0F172A`), providing the necessary contrast for the "Indigo Pulse."

- **Primary (Electric Indigo):** Used for core actions and active states.
- **Secondary (Deep Violet):** Used for depth, branding, and secondary highlights.
- **Tertiary (Neon Cyan):** Reserved for success states, technical metrics, and precise highlights.
- **Neutral Surface:** A series of semi-transparent blacks (Glass) and deep grays to define container hierarchy without breaking the dark-mode immersion.

Gradients should be used sparingly but impactfully on primary buttons, progress bars, and high-level data visualizations to maintain a "high-class" energetic feel.

## Typography

**Plus Jakarta Sans** is the exclusive typeface for this design system. It is chosen for its modern, geometric construction and high legibility in dark environments. 

- **Display & Headlines:** Utilize tighter letter-spacing and heavier weights (Bold/ExtraBold) to create a commanding presence.
- **Body Text:** Use Regular weight for optimal readability against dark backgrounds. Ensure line heights are generous to prevent visual "crushing" in glass containers.
- **Labels:** Small labels should use Medium or SemiBold weights with slight tracking (letter-spacing) to ensure clarity at small scales.

## Layout & Spacing

This design system utilizes a **12-column Fluid Grid** for desktop, transitioning to a **4-column grid** for mobile. The layout philosophy emphasizes "breathing room" to let the glassmorphic effects shine without feeling cluttered.

- **Desktop:** 12 columns, 24px gutters, 80px side margins.
- **Tablet:** 8 columns, 20px gutters, 40px side margins.
- **Mobile:** 4 columns, 16px gutters, 20px side margins.

Internal spacing follows an 8px base unit. Components should use generous internal padding (min 16px) to maintain the "airy" feel required for sophisticated glassmorphism.

## Elevation & Depth

Depth is not communicated through traditional drop shadows but through **Layered Translucency**.

1.  **Level 0 (Base):** Solid dark background (`#0F172A`).
2.  **Level 1 (Cards/Panels):** Background blur (20px-40px) with a semi-transparent fill (`rgba(30, 41, 59, 0.5)`).
3.  **Level 2 (Modals/Popovers):** Higher blur (60px) and a slightly lighter fill.

**The Glass Edge:** Every glass container must have a 1px "inner" border. Use a linear gradient for this border (top-left to bottom-right) from `rgba(255, 255, 255, 0.15)` to `rgba(255, 255, 255, 0.05)`. This mimics light catching the edge of a physical glass pane.

## Shapes

The shape language is consistently "Rounded" to soften the futuristic aesthetic and make it feel more approachable. 

- **Standard Containers:** 16px (`1rem`) corner radius.
- **Buttons & Inputs:** 12px (`0.75rem`) radius for a modern, tactile feel.
- **Avatars & Icons:** Use circles or high-radius "squiggles" to contrast against the structural grid.

## Components

- **Buttons:** Primary buttons use the "Pulse" gradient with a subtle outer glow (indigo tint). Ghost buttons use the 1px white-to-transparent glass border.
- **Chips:** Highly translucent (`rgba(255, 255, 255, 0.08)`) with `label-sm` typography and a 32px corner radius (pill).
- **Cards:** The hallmark of the system. They must feature backdrop-filter blur and the 1px stroke. Avoid heavy shadows; use a "bloom" effect (large, very soft indigo shadow) only for the active/focused card.
- **Input Fields:** Dark, recessed backgrounds with a 1px border that glows "Electric Indigo" on focus.
- **Progress Bars:** Use the "Cyan Glow" gradient for a technical, high-performance look.
- **Sidebar:** A vertical blur pane that subtly reveals the background colors behind it, keeping navigation secondary to the content dashboard.