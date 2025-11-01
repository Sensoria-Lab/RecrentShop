/**
 * Haptic Feedback Utility
 * 
 * Provides haptic vibration feedback on mobile devices
 * Enhances UX with tactile responses to user actions
 * 
 * Supports:
 * - Vibration API (most Android devices)
 * - Taptic Engine hint via pattern (iOS may support basic patterns)
 */

export type HapticType = 
  | 'light'      // Subtle feedback (10ms)
  | 'medium'     // Standard feedback (20ms)
  | 'heavy'      // Strong feedback (40ms)
  | 'success'    // Success pattern
  | 'warning'    // Warning pattern
  | 'error'      // Error pattern
  | 'selection'; // Selection change

const HAPTIC_PATTERNS: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 40,
  success: [10, 50, 10], // Double tap
  warning: [20, 100, 20, 100, 20], // Triple tap
  error: [40, 100, 40], // Strong double tap
  selection: 5, // Very light tap
};

/**
 * Trigger haptic feedback
 * 
 * @param type - Type of haptic feedback
 * @returns boolean - true if vibration was triggered successfully
 * 
 * @example
 * // Light tap on button press
 * triggerHaptic('light');
 * 
 * // Success feedback after adding to cart
 * triggerHaptic('success');
 * 
 * // Error feedback on validation failure
 * triggerHaptic('error');
 */
export const triggerHaptic = (type: HapticType = 'light'): boolean => {
  // Check if Vibration API is available
  if (!navigator.vibrate) {
    return false;
  }

  try {
    const pattern = HAPTIC_PATTERNS[type];
    navigator.vibrate(pattern);
    return true;
  } catch (error) {
    console.warn('Haptic feedback failed:', error);
    return false;
  }
};

/**
 * Cancel any ongoing vibration
 */
export const cancelHaptic = (): void => {
  if (navigator.vibrate) {
    navigator.vibrate(0);
  }
};

/**
 * Check if device supports haptic feedback
 */
export const isHapticSupported = (): boolean => {
  return 'vibrate' in navigator;
};

/**
 * React Hook for haptic feedback
 * 
 * @example
 * const handleClick = useHaptic('medium', () => {
 *   // Your click handler logic
 * });
 */
export const useHapticFeedback = () => {
  const trigger = (type: HapticType = 'light') => {
    return triggerHaptic(type);
  };

  return {
    trigger,
    isSupported: isHapticSupported(),
    cancel: cancelHaptic
  };
};

// Specific haptic helper functions
export const hapticLight = () => triggerHaptic('light');
export const hapticMedium = () => triggerHaptic('medium');
export const hapticHeavy = () => triggerHaptic('heavy');
export const hapticSuccess = () => triggerHaptic('success');
export const hapticWarning = () => triggerHaptic('warning');
export const hapticError = () => triggerHaptic('error');
export const hapticSelection = () => triggerHaptic('selection');

export default {
  trigger: triggerHaptic,
  cancel: cancelHaptic,
  isSupported: isHapticSupported,
  light: hapticLight,
  medium: hapticMedium,
  heavy: hapticHeavy,
  success: hapticSuccess,
  warning: hapticWarning,
  error: hapticError,
  selection: hapticSelection,
};
