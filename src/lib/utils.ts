
/**
 * Conditionally join classNames together
 * Filters out falsy values and joins with space
 *
 * @example
 * cn('btn', isActive && 'active', 'text-white') // 'btn active text-white'
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}


