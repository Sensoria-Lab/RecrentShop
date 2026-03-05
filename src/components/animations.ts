/**
 * GSAP animation configurations
 * Centralised easing and timing constants for consistent motion across the site.
 * 
 * Design System: Industrial Editorial · Monochrome Brutalist
 * Primary easing: cubic-bezier(0.22, 1, 0.36, 1) — fast out, ease to rest
 * Duration: entrance 0.5s, micro 0.2s, hover 0.2s
 * Stagger: 0.08s
 */

// ─── Reduced Motion Check ─────────────────────────────────────────────────────
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ─── Easing constants ─────────────────────────────────────────────────────────
// Primary easing per Design System: fast out, ease to rest
export const EASE_EDITORIAL = 'power2.out'; // cubic-bezier(0.22, 1, 0.36, 1) equivalent



// ─── Common tween configs ─────────────────────────────────────────────────────






