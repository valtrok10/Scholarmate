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
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#a078ff'
  on-tertiary-container: '#340080'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  stack-gap: 16px
  container-max: 1440px
---

## Brand & Style
The brand personality is high-octane, futuristic, and premium. It targets a tech-forward audience that values immersive, sensorial digital experiences. The UI should evoke a sense of "digital craftsmanship" and boundless energy.

The design style is **Hyper-Glassmorphism**. It combines deeply layered translucent surfaces with vibrant, high-energy background blurs. The aesthetic is defined by "glowing edges"—thin, high-contrast strokes that simulate light refracting through glass—and a dark, atmospheric environment where neon accents provide functional cues and visual excitement.

## Colors
The palette is built on a "Deep Space" foundation (Deep Violet and Dark Navy) to allow the neon accents to pop. 

- **Primary (Electric Indigo):** Used for core actions and active states.
- **Secondary (Neon Cyan):** Used for success states, highlights, and secondary interactive elements.
- **Tertiary (Deep Violet):** Used for depth, background glow, and branding accents.
- **Functional Gradients:** Every interactive component uses the `electric-flow` gradient to signify energy and momentum.

Backgrounds are never pure black; they utilize deep indigo-tinted greys to maintain the illusion of layered glass and depth.

## Typography
The typography strategy balances high-impact display faces with ultra-legible technical fonts. 

**Plus Jakarta Sans** is used for headers to provide a friendly yet modern feel. **Hanken Grotesk** handles the body copy for its contemporary, sharp proportions. **Geist** is reserved for labels and technical data, providing a developer-centric, precise aesthetic. 

Headlines should utilize a subtle text-shadow of `0 0 20px rgba(99, 102, 241, 0.3)` when used in hero sections to reinforce the glow effect.

## Layout & Spacing
The layout follows a fluid 12-column grid system. Spacing is generous to allow the "glass" panels room to breathe and showcase their backdrop-blur effects.

**Motion Principles:**
- **Transitions:** Use `ease-in-out-smooth` for all state changes (e.g., hover, modal entry).
- **Pulse Effects:** Active status indicators and critical buttons should have a subtle outer glow pulse.
- **Shimmer Loading:** Skeleton states should use a diagonal `shimmer-gradient` moving from left to right every 1.5 seconds.
- **Parallax:** On desktop, implement subtle mouse-tracking parallax for background glow orbs to enhance the sense of depth.

## Elevation & Depth
Depth is created through "Backdrop Blurs" and "Inner Glows" rather than traditional heavy drop shadows.

1.  **Base Layer:** Solid `#0F172A` with subtle radial gradients of `#1E1B4B` in corners.
2.  **Level 1 (Cards):** 20px Backdrop Blur, 3% White opacity background, 1px solid white stroke at 10% opacity.
3.  **Level 2 (Modals/Popups):** 40px Backdrop Blur, 6% White opacity background, 1px border with a gradient stroke (White 20% to Transparent).
4.  **Floating Elements:** Elements at the highest elevation use a "drop-shadow glow" (`0 20px 40px rgba(0, 0, 0, 0.4)`) combined with a faint outer halo of the Primary color.

## Shapes
The design system uses a consistent "Rounded" approach. 

- **Containers & Cards:** Use `rounded-lg` (1rem) to maintain a soft, approachable feel amidst the sharp technical typography.
- **Interactive Elements:** Buttons and Inputs also use `rounded-lg` for consistency.
- **Secondary UI:** Small tags or status chips should use `rounded-xl` (1.5rem) to differentiate them from functional containers.

## Components

### Buttons
- **Primary:** Background uses the `electric-flow` gradient. On hover, the button scales by 1.02x and the box-shadow intensity increases.
- **Glass (Ghost):** Transparent background with a 1px `border-glass`. On hover, the background fill increases to 10% opacity.

### Cards
- Always feature a `backdrop-filter: blur(20px)`.
- Borders are 1px thick, using a top-down linear gradient from `rgba(255,255,255,0.2)` to `transparent`.

### Inputs
- Background is a dark, desaturated navy.
- The focus state triggers a `1px` Neon Cyan border and a soft Cyan glow (spread 10px).
- Labels use the **Geist** font for a technical look.

### Chips & Badges
- Semi-transparent fills with high-saturation text.
- Example: Success chip is `rgba(6, 182, 212, 0.1)` background with `#06B6D4` text.

### Shimmer States
- For content loading, use a pulse effect on the background layer combined with a 45-degree angled white shimmer overlay that sweeps across the component.