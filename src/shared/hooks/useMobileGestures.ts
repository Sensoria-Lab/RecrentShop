import { useState, useEffect, useRef, TouchEvent } from 'react';

/**
 * Hook for handling swipe gestures on mobile devices
 * 
 * @param onSwipeLeft - Callback when user swipes left
 * @param onSwipeRight - Callback when user swipes right
 * @param onSwipeUp - Callback when user swipes up
 * @param onSwipeDown - Callback when user swipes down
 * @param minSwipeDistance - Minimum distance in pixels to register as swipe (default: 50)
 * @returns Touch event handlers to attach to element
 * 
 * @example
 * const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeGesture({
 *   onSwipeLeft: () => goToNextImage(),
 *   onSwipeRight: () => goToPreviousImage(),
 *   minSwipeDistance: 75
 * });
 * 
 * <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
 *   Swipeable content
 * </div>
 */
export const useSwipeGesture = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  minSwipeDistance = 50
}: {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  minSwipeDistance?: number;
}) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX);

    // Horizontal swipe
    if (isHorizontalSwipe) {
      if (distanceX > minSwipeDistance && onSwipeLeft) {
        onSwipeLeft();
      }
      if (distanceX < -minSwipeDistance && onSwipeRight) {
        onSwipeRight();
      }
    }

    // Vertical swipe
    if (isVerticalSwipe) {
      if (distanceY > minSwipeDistance && onSwipeUp) {
        onSwipeUp();
      }
      if (distanceY < -minSwipeDistance && onSwipeDown) {
        onSwipeDown();
      }
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};

/**
 * Hook for detecting long press gesture on mobile
 * 
 * @param callback - Function to call on long press
 * @param duration - Duration in ms to hold before triggering (default: 500ms)
 * @returns Touch event handlers
 * 
 * @example
 * const longPressHandlers = useLongPress(() => {
 *   showContextMenu();
 * }, 400);
 * 
 * <button {...longPressHandlers}>Long press me</button>
 */
export const useLongPress = (
  callback: () => void,
  duration: number = 500
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isPressed, setIsPressed] = useState(false);

  const start = () => {
    setIsPressed(true);
    timeoutRef.current = setTimeout(() => {
      callback();
    }, duration);
  };

  const clear = () => {
    setIsPressed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    onTouchStart: start,
    onTouchEnd: clear,
    onTouchCancel: clear,
    onTouchMove: clear,
    isPressed
  };
};

/**
 * Hook for pull-to-refresh gesture
 * 
 * @param onRefresh - Callback when pull-to-refresh is triggered
 * @param threshold - Distance in pixels to trigger refresh (default: 80)
 * @returns Pull distance and touch handlers
 * 
 * @example
 * const { pullDistance, ...handlers } = usePullToRefresh(async () => {
 *   await fetchNewData();
 * });
 * 
 * <div {...handlers} style={{ transform: `translateY(${pullDistance}px)` }}>
 *   Content
 * </div>
 */
export const usePullToRefresh = (
  onRefresh: () => void | Promise<void>,
  threshold: number = 80
) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    // Only start if scrolled to top
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isRefreshing || window.scrollY > 0) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - startY.current;

    if (distance > 0) {
      // Add resistance to pull
      setPullDistance(Math.min(distance * 0.4, threshold * 1.5));
      
      // Prevent default scroll if pulling
      if (distance > 10) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
  };

  return {
    pullDistance,
    isRefreshing,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};

/**
 * Hook for detecting pinch zoom gesture
 * 
 * @param onPinchZoom - Callback with scale value
 * @returns Touch handlers
 * 
 * @example
 * const pinchHandlers = usePinchZoom((scale) => {
 *   setImageZoom(scale);
 * });
 * 
 * <div {...pinchHandlers}>Zoomable image</div>
 */
export const usePinchZoom = (
  onPinchZoom: (scale: number) => void
) => {
  const initialDistanceRef = useRef(0);

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      initialDistanceRef.current = getDistance(e.touches);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2 && initialDistanceRef.current > 0) {
      const currentDistance = getDistance(e.touches);
      const scale = currentDistance / initialDistanceRef.current;
      onPinchZoom(scale);
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    initialDistanceRef.current = 0;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};
