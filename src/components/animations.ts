/**
 * GSAP animation configurations
 * Centralised easing and timing constants for consistent motion across the site.
 */

// ─── Easing constants ─────────────────────────────────────────────────────────
export const EASE_OUT_EXPO = 'expo.out';
export const EASE_OUT_POWER3 = 'power3.out';
export const EASE_IN_POWER3 = 'power3.in';
export const EASE_SPRING = 'back.out(1.4)';
export const EASE_BOUNCE = 'elastic.out(1, 0.5)';

// ─── Duration constants ───────────────────────────────────────────────────────
export const DUR_FAST = 0.2;
export const DUR_DEFAULT = 0.4;
export const DUR_SLOW = 0.65;

// ─── Common tween configs ─────────────────────────────────────────────────────

/** Fade + slide from below (page entrance) */
export const FADE_UP_FROM = { opacity: 0, y: 28 };
export const FADE_UP_TO = { opacity: 1, y: 0, duration: DUR_SLOW, ease: EASE_OUT_EXPO };

/** Fade + slide from below (subtle) */
export const FADE_UP_SUBTLE_FROM = { opacity: 0, y: 16 };
export const FADE_UP_SUBTLE_TO = { opacity: 1, y: 0, duration: DUR_DEFAULT, ease: EASE_OUT_EXPO };

/** Pure fade in */
export const FADE_IN_FROM = { opacity: 0 };
export const FADE_IN_TO = { opacity: 1, duration: DUR_SLOW, ease: EASE_OUT_POWER3 };

/** Slide in from right (sidebar) */
export const SLIDE_FROM_RIGHT_HIDDEN = { x: '100%' };
export const SLIDE_FROM_RIGHT_VISIBLE = { x: '0%', duration: 0.45, ease: EASE_OUT_EXPO };
export const SLIDE_TO_RIGHT_EXIT = { x: '100%', duration: 0.35, ease: EASE_IN_POWER3 };

/** Slide in from left (mobile menu) */
export const SLIDE_FROM_LEFT_HIDDEN = { x: '-100%' };
export const SLIDE_FROM_LEFT_VISIBLE = { x: '0%', duration: 0.38, ease: EASE_OUT_EXPO };
export const SLIDE_TO_LEFT_EXIT = { x: '-100%', duration: 0.28, ease: EASE_IN_POWER3 };

/** Slide in from bottom (bottom sheet) */
export const SLIDE_FROM_BOTTOM_HIDDEN = { y: '100%' };
export const SLIDE_FROM_BOTTOM_VISIBLE = { y: '0%', duration: 0.42, ease: EASE_OUT_EXPO };
export const SLIDE_TO_BOTTOM_EXIT = { y: '100%', duration: 0.3, ease: EASE_IN_POWER3 };

/** Stagger delay helper */
export const getStaggerDelay = (index: number) => index * 0.08;

/** Scale-in for cards */
export const SCALE_FROM = { opacity: 0, scale: 0.94 };
export const SCALE_TO = { opacity: 1, scale: 1, duration: DUR_DEFAULT, ease: EASE_SPRING };

/** Product grid scroll-reveal */
export const SCROLL_REVEAL_FROM = { opacity: 0, y: 20 };
export const SCROLL_REVEAL_TO = { opacity: 1, y: 0, duration: 0.5, ease: EASE_OUT_EXPO };

// ─── Magnetic card helper ─────────────────────────────────────────────────────
export const MAGNETIC_STRENGTH = 0.08;
export const MAGNETIC_SPRING = { duration: 0.4, ease: EASE_OUT_POWER3 };
export const MAGNETIC_RETURN = { x: 0, y: 0, duration: 0.5, ease: EASE_OUT_EXPO };

export const calculateMagneticOffset = (e: React.MouseEvent<HTMLElement>, strength = MAGNETIC_STRENGTH) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  return { x: x * strength, y: y * strength };
};

// ─── Badge animation configs ──────────────────────────────────────────────────
export const BADGE_PULSE_CONFIG = {
  keyframes: { scale: [1, 1.05, 1] },
  duration: 2,
  repeat: -1,
  ease: 'sine.inOut',
};

export const BADGE_HOVER_CONFIG = {
  scale: 1.06,
  duration: 0.2,
  ease: EASE_SPRING,
};

export const BADGE_HOVER_OUT_CONFIG = {
  scale: 1,
  duration: 0.25,
  ease: EASE_OUT_POWER3,
};

// ─── Shimmer keyframe (CSS, not GSAP) ─────────────────────────────────────────
// Used in ProductBadge as a CSS animation class
export const SHIMMER_CSS = `
  @keyframes shimmer {
    from { transform: translateX(-100%); }
    to   { transform: translateX(200%);  }
  }
  .badge-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
    animation: shimmer 1.6s linear infinite;
  }
`;


