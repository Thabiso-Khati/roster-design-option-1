/**
 * ROSTER Design Tokens — Single Source of Truth
 *
 * This file is the canonical reference for all brand colours, typography,
 * spacing, shadows, and animation values used across the codebase.
 *
 * ── How values flow ──────────────────────────────────────────────────────────
 *
 *   design-tokens.ts   ←  YOU ARE HERE (edit here first)
 *         │
 *         ├──▶  tailwind.config.js        (imported as JS-compatible object)
 *         │
 *         └──▶  app/globals.css           (CSS custom properties — keep in sync
 *                                          manually; values here are the source)
 *
 * ── Figma sync ───────────────────────────────────────────────────────────────
 *   Export via Tokens Studio or Figma Variables using the `colors` object below.
 *   Token names map 1-to-1 with CSS variable names (e.g. `brand` → `--brand`).
 *
 * ── Adding a new token ───────────────────────────────────────────────────────
 *   1. Add to this file (dark value in `colors.dark`, light in `colors.light`)
 *   2. Add CSS var to app/globals.css :root / [data-theme="light"] blocks
 *   3. Add Tailwind alias to tailwind.config.js colors section
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Colour Palette ── Studio OS: Graphite + Citron ───────────────────────────

export const palette = {
  // Graphite surfaces (dark theme)
  graphiteDeep:  "#0A0B0D",
  graphiteDark:  "#101216",
  graphiteMid:   "#181B22",
  graphiteEdge:  "#22262E",

  // Ink & mute (dark theme text)
  inkBright: "#E8EAED",
  inkMute:   "#7A808A",

  // Citron accent — oklch(0.88 0.18 125)
  // Hex approx for Tailwind opacity modifiers:
  citron:    "#C2E147",
  citronOn:  "#0A0C08",  // text-on-accent

  // Semantic
  emerald:    "#10B981",
  emeraldDim: "#059669",
  crimson:    "#EF4444",
  crimsonDim: "#DC2626",
  amber:      "#F59E0B",
  info:       "#06B6D4",

  // Paper (light theme)
  paperBg:       "#F4F2EC",
  paperSurface:  "#FBFAF6",
  paperSurface2: "#EEEBE2",
  paperLine:     "#D9D5C8",
  paperInk:      "#0E0F12",
  paperMute:     "#6D6A60",
} as const;

// ── Semantic Tokens (Dark theme — Graphite, default) ─────────────────────────

export const dark = {
  // New token names (Studio OS)
  bg:        palette.graphiteDeep,
  surface:   palette.graphiteDark,
  "surface-2": palette.graphiteMid,
  line:      palette.graphiteEdge,
  ink:       palette.inkBright,
  mute:      palette.inkMute,
  accent:    palette.citron,          // hex approx; CSS var uses oklch()
  "accent-on": palette.citronOn,

  // Legacy aliases (keep for backward-compat with existing components)
  background:   palette.graphiteDeep,
  border:       palette.graphiteEdge,
  brand:        palette.citron,
  "brand-rgb":  "194 225 71",
  "brand-light":palette.citron,
  "brand-muted":"#9AB530",

  "text-primary": palette.inkBright,
  "text-muted":   palette.inkMute,
  "text-subtle":  palette.graphiteEdge,

  success:      palette.emerald,
  "success-rgb":"16 185 129",
  error:        palette.crimson,
  "error-rgb":  "239 68 68",
} as const;

// ── Semantic Tokens (Light theme — Paper) ────────────────────────────────────

export const light = {
  bg:        palette.paperBg,
  surface:   palette.paperSurface,
  "surface-2": palette.paperSurface2,
  line:      palette.paperLine,
  ink:       palette.paperInk,
  mute:      palette.paperMute,
  accent:    palette.citron,
  "accent-on": palette.citronOn,

  // Legacy aliases
  background:   palette.paperBg,
  border:       palette.paperLine,
  brand:        "#5A7A10",  // darker citron for light bg
  "brand-rgb":  "90 122 16",
  "brand-light":palette.citron,
  "brand-muted":"#4A6610",

  "text-primary": palette.paperInk,
  "text-muted":   palette.paperMute,
  "text-subtle":  palette.paperLine,

  success:      palette.emeraldDim,
  "success-rgb":"5 150 105",
  error:        palette.crimsonDim,
  "error-rgb":  "220 38 38",
} as const;

// ── Typography ────────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    sans:    ["Inter", "system-ui", "sans-serif"],
    display: ["Inter", "system-ui", "sans-serif"],
    mono:    ["JetBrains Mono", "Fira Code", "monospace"],
  },
  fontSize: {
    xs:   "0.75rem",   // 12px
    sm:   "0.875rem",  // 14px
    base: "1rem",      // 16px
    lg:   "1.125rem",  // 18px
    xl:   "1.25rem",   // 20px
    "2xl":"1.5rem",    // 24px
    "3xl":"1.875rem",  // 30px
    "4xl":"2.25rem",   // 36px
  },
} as const;

// ── Gradients ─────────────────────────────────────────────────────────────────

export const gradients = {
  accent: `linear-gradient(135deg, ${palette.citron} 0%, #D4EF5A 100%)`,
  gold:   `linear-gradient(135deg, ${palette.citron} 0%, #D4EF5A 100%)`,  // legacy alias
  dark:   `linear-gradient(180deg, ${palette.graphiteDeep} 0%, ${palette.graphiteDark} 100%)`,
  hero:   `radial-gradient(ellipse at 50% 0%, rgba(194,225,71,0.10) 0%, rgba(10,11,13,0) 70%)`,
} as const;

// ── Shadows ───────────────────────────────────────────────────────────────────

export const shadows = {
  sm:    "0 1px 2px rgba(0,0,0,0.4)",
  md:    "0 4px 12px rgba(0,0,0,0.4)",
  lg:    "0 8px 24px rgba(0,0,0,0.5)",
  brand: `0 0 0 1.5px rgba(194,225,71,0.4)`,
  glow:  `0 0 20px rgba(194,225,71,0.15)`,
} as const;

// ── Animation ─────────────────────────────────────────────────────────────────

export const animation = {
  duration: {
    fast:   "150ms",
    base:   "200ms",
    slow:   "300ms",
    slower: "500ms",
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    enter:    "cubic-bezier(0, 0, 0.2, 1)",
    exit:     "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

// ── Tailwind-compatible colour map ────────────────────────────────────────────
// Used by tailwind.config.js. Hardcoded hex required for Tailwind opacity
// modifier support (bg-brand/50 etc). CSS vars cannot be used here directly.
// NOTE: accent/brand now uses citron hex; globals.css overrides with oklch().

export const tailwindColors = {
  // New Studio OS token names
  bg:         dark.bg,
  line:       dark.line,
  ink:        dark.ink,
  mute:       dark.mute,
  accent:     dark.accent,

  // Existing names (backward-compat)
  background: dark.background,
  surface:    dark.surface,
  "surface-2":dark["surface-2"],
  border:     dark.border,
  brand: {
    DEFAULT: dark.brand,
    light:   dark["brand-light"],
    muted:   dark["brand-muted"],
  },
  text: {
    primary: dark["text-primary"],
    muted:   dark["text-muted"],
    subtle:  dark["text-subtle"],
  },
  success: dark.success,
  error:   dark.error,
} as const;

// ── Default export (full token set) ──────────────────────────────────────────

const tokens = {
  palette,
  dark,
  light,
  typography,
  gradients,
  shadows,
  animation,
  tailwindColors,
} as const;

export default tokens;
