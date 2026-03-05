'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hook for detecting device type and screen size
 * Provides responsive breakpoints and device information
 * 
 * @returns {Object} Device detection information
 * @returns {boolean} isMobile - True if viewport width < 768px
 * @returns {boolean} isTablet - True if viewport width between 768px and 1024px
 * @returns {boolean} isDesktop - True if viewport width >= 1024px
 * @returns {boolean} isTouchDevice - True if device supports touch events
 * @returns {number} width - Current viewport width
 * @returns {number} height - Current viewport height
 */
export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    // Check if device supports touch events
    const checkTouchDevice = () => {
      const nav = navigator as Navigator & { msMaxTouchPoints?: number };
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (nav.msMaxTouchPoints ?? 0) > 0
      );
    };

    // Update device info based on window size
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouchDevice = checkTouchDevice();

      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isTouchDevice,
        width,
        height,
      });
    };

    // Initial check
    updateDeviceInfo();

    // Add resize listener with debouncing for performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceInfo, 150);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return deviceInfo;
};

/**
 * Hook for mobile-first redirect from home to catalog
 * Automatically redirects mobile users from home page to catalog
 * Uses sessionStorage to prevent redirect loop
 * 
 * @param {boolean} isHomePage - True if current page is home page
 */
export const useMobileRedirect = (
  isHomePage: boolean
) => {
  const { isMobile } = useDeviceDetection();
  const router = useRouter();

  useEffect(() => {
    // Only redirect on mobile devices from home page
    if (!isMobile || !isHomePage) return;

    // Check if user has already been redirected in this session safely
    if (typeof window !== 'undefined') {
      const hasRedirected = sessionStorage.getItem('mobileHomeVisited');

      if (!hasRedirected) {
        // Mark as visited for this session
        sessionStorage.setItem('mobileHomeVisited', 'true');

        // Redirect to catalog with a small delay for smooth transition
        setTimeout(() => {
          router.push('/catalog');
        }, 100);
      }
    }
  }, [isMobile, isHomePage, router]);
};


