import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook for Intersection Observer API
 * Useful for lazy loading components, images, and animations
 *
 * @param options - Intersection Observer options
 * @returns [ref, isIntersecting, entry]
 *
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
 *
 * return (
 *   <div ref={ref}>
 *     {isVisible && <HeavyComponent />}
 *   </div>
 * );
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean, IntersectionObserverEntry | null] {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;

  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If freezeOnceVisible is enabled and element is already visible, don't observe
    if (freezeOnceVisible && isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  return [ref, isIntersecting, entry];
}

/**
 * Simplified hook that only returns visibility status
 * Useful when you don't need the ref or entry
 */
export function useIsVisible<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const [ref, isVisible] = useIntersectionObserver<T>(options);
  return [ref, isVisible];
}
