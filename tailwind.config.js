/**
 * @type {import('tailwindcss').Config}
 *
 * ── IMPORTANT — colour source of truth ────────────────────────────────────
 * Brand colour values live in lib/design-tokens.ts.
 * Hardcoded hex is required HERE for Tailwind's opacity modifier support
 * (e.g. bg-brand/50). CSS vars cannot carry opacity modifiers.
 *
 * NOTE: `accent` uses oklch(0.88 0.18 125) in CSS vars (globals.css) but
 * the hex approximation #C2E147 is registered here so bg-accent/10 etc work.
 * Hand-rolled color-mix() utilities in globals.css provide the clean tints.
 *
 * When updating a colour:
 *   1. Change the value in lib/design-tokens.ts  ← START HERE
 *   2. Mirror the change in this file (colours section below)
 *   3. Mirror the change in app/globals.css       (:root / [data-theme="light"])
 * ──────────────────────────────────────────────────────────────────────────
 */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Studio OS tokens (new) ──────────────────────────────────────
        bg:      "#0A0B0D",
        line:    "#22262E",
        ink:     "#E8EAED",
        mute:    "#7A808A",
        accent:  "#C2E147",   // oklch(0.88 0.18 125) hex approx — use CSS var in practice

        // ── Legacy aliases (backward-compat with existing components) ───
        // Studio OS values replace the Midnight Gold values.
        background: "#0A0B0D",
        surface:    "#101216",
        "surface-2":"#181B22",
        border:     "#22262E",
        brand: {
          DEFAULT: "#C2E147",
          light:   "#D4EF5A",
          muted:   "#9AB530",
        },
        text: {
          primary: "#E8EAED",
          muted:   "#7A808A",
          subtle:  "#22262E",
        },
        success: "#10B981",
        error:   "#EF4444",
        warning: "#F59E0B",
        info:    "#06B6D4",
      },
      fontFamily: {
        // Inter (Google Fonts, loaded in layout.tsx) + system fallback
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      borderRadius: {
        // Studio OS radius scale — tight and editorial
        sm:  "3px",
        DEFAULT: "4px",
        md:  "4px",
        lg:  "5px",
        xl:  "6px",
        "2xl":"6px",   // cap at 6px per Studio OS rules
        "3xl":"8px",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #C2E147 0%, #D4EF5A 100%)",
        "dark-gradient":   "linear-gradient(180deg, #0A0B0D 0%, #101216 100%)",
        "hero-gradient":   "radial-gradient(ellipse at 50% 0%, rgba(194,225,71,0.10) 0%, rgba(10,11,13,0) 70%)",
        // Keep old name so hero backgrounds don't break
        "gold-gradient":   "linear-gradient(135deg, #C2E147 0%, #D4EF5A 100%)",
      },
      animation: {
        "fade-in":  "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "marquee":  "marquee 60s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
