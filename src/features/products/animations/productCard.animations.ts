/**
 * Framer Motion Animation Variants for Product Cards
 * 
 * Performance considerations:
 * - Only animate transform and opacity (GPU-accelerated properties)
 * - Use spring physics for natural feel
 * - Keep durations short (<400ms) for snappy UX
 * - All animations target 60 FPS
 */

/**
 * Type definitions for Motion v12 animations
 */
type AnimationVariant = {
  [key: string]: any;
  transition?: TransitionConfig;
};

type Variants = {
  [key: string]: AnimationVariant;
};

type TransitionConfig = {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  type?: 'spring' | 'tween' | 'inertia';
  stiffness?: number;
  damping?: number;
  mass?: number;
  repeat?: number | typeof Infinity;
  repeatType?: 'loop' | 'reverse' | 'mirror';
  [key: string]: any;
};

type Transition = TransitionConfig;

/**
 * Spring configuration for natural, physics-based animations
 * stiffness: How "tight" the spring is (higher = faster)
 * damping: How quickly the spring settles (higher = less bounce)
 * mass: Weight of the animated object (higher = more momentum)
 */
export const SPRING_CONFIG = {
  soft: { stiffness: 120, damping: 14, mass: 0.8 },
  medium: { stiffness: 260, damping: 20, mass: 1 },
  snappy: { stiffness: 400, damping: 25, mass: 0.5 },
  bouncy: { stiffness: 300, damping: 10, mass: 0.8 },
} as const;

/**
 * Main product card animation
 * Features:
 * - Subtle lift on hover (y-axis translation)
 * - Gentle scale increase
 * - Entry animation handled by Tailwind CSS classes
 */
export const cardVariants: Variants = {
  hover: {
    y: -12,
    scale: 1.03,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      mass: 0.8,
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  },
};

/**
 * Product image animation with parallax effect
 * - Scales up on hover for zoom effect
 * - Brightness/contrast increase for visual pop
 * - Smooth spring transition
 */
export const imageVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.08,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 1,
    },
  },
};

/**
 * Badge pulse animation for availability indicator
 * Creates attention-grabbing effect without being annoying
 */
export const badgePulseVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  pulse: {
    scale: [1, 1.08, 1],
    opacity: [1, 0.8, 1],
    transition: {
      type: 'tween',
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

/**
 * Shimmer effect for discount badges
 * Draws attention to deals/offers
 */
export const badgeShimmerVariants: Variants = {
  initial: {
    backgroundPosition: '-200% 0',
  },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
    },
  },
};

/**
 * Price highlight animation
 * Subtle glow effect when hovering over card
 */
export const priceVariants: Variants = {
  initial: {
    scale: 1,
  },
  highlight: {
    scale: 1.03,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
};

/**
 * Text overlay animation for product info
 * Slides up smoothly on hover
 */
export const overlayVariants: Variants = {
  initial: {
    opacity: 0.9,
    y: 0,
  },
  hover: {
    opacity: 1,
    y: -2,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Add to cart button specific animation
 * More pronounced than regular buttons to encourage action
 */
export const addToCartVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      ...SPRING_CONFIG.snappy,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: 'spring',
      ...SPRING_CONFIG.bouncy,
    },
  },
  success: {
    scale: [1, 1.2, 1],
    transition: {
      type: 'tween',
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

/**
 * Stagger configuration for grid animations
 * Creates wave effect as cards appear
 */
export const gridStaggerConfig = {
  staggerChildren: 0.06,
  delayChildren: 0.1,
};

/**
 * Container variant for grid stagger effect
 */
export const gridContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ...gridStaggerConfig,
    },
  },
};

/**
 * Individual grid item variant
 */
export const gridItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      ...SPRING_CONFIG.medium,
    },
  },
};

/**
 * Icon animation for hover effects on buttons
 */
export const iconVariants: Variants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.15,
    rotate: 0,
    transition: {
      type: 'spring',
      ...SPRING_CONFIG.bouncy,
    },
  },
};

/**
 * Ripple effect transition
 * Used for click feedback on interactive elements
 */
export const rippleTransition: Transition = {
  duration: 0.6,
  ease: 'easeOut',
};

/**
 * Utility: Create custom stagger delay based on index
 * Useful for non-linear stagger patterns (e.g., wave effect)
 * 
 * @param index - Item position in grid
 * @param baseDelay - Base delay in seconds
 * @param pattern - 'linear' | 'wave' | 'center-out'
 */
export const getStaggerDelay = (
  index: number,
  baseDelay: number = 0.05,
  pattern: 'linear' | 'wave' | 'center-out' = 'linear'
): number => {
  switch (pattern) {
    case 'wave':
      // Sine wave pattern for organic feel
      return baseDelay * index + Math.sin(index * 0.5) * 0.1;
    case 'center-out':
      // Items appear from center outward
      return baseDelay * Math.abs(index - Math.floor(index / 2));
    case 'linear':
    default:
      return baseDelay * index;
  }
};

/**
 * Utility: Magnetic effect calculation
 * Makes elements subtly follow cursor position
 * 
 * @param mouseX - Mouse X position relative to element
 * @param mouseY - Mouse Y position relative to element
 * @param strength - How strong the magnetic effect is (0-1)
 */
export const calculateMagneticOffset = (
  mouseX: number,
  mouseY: number,
  elementRect: DOMRect,
  strength: number = 0.2
): { x: number; y: number } => {
  const centerX = elementRect.width / 2;
  const centerY = elementRect.height / 2;
  
  const offsetX = (mouseX - centerX) * strength;
  const offsetY = (mouseY - centerY) * strength;
  
  return { x: offsetX, y: offsetY };
};
