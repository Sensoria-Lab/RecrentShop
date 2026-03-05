'use client';
/**
 * Lenis smooth scroll provider
 * Integrates Lenis with GSAP's ScrollTrigger for synced scroll-based animations
 */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from './gsap';

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

const useLenis = () => useContext(LenisContext);

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      // Disable Lenis's own rAF loop — GSAP ticker drives it instead
      autoRaf: false,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Sync Lenis with GSAP ScrollTrigger
    instance.on('scroll', ScrollTrigger.update);

    // CRITICAL: GSAP ticker time is in SECONDS; Lenis.raf() expects MILLISECONDS.
    // Passing `time` without * 1000 makes Lenis think 1/1000th the real time has
    // elapsed per frame, so a 1.2s scroll takes ~1200s ("very long" scroll bug).
    const raf = (time: number) => {
      instance.raf(time * 1000);
    };

    // Use GSAP's ticker to drive Lenis for perfectly synced animations
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // On every Next.js route change, immediately reset Lenis's internal scroll
  // position to 0. Without this, Lenis animates from the previous page's scroll
  // offset to 0 on every navigation — causing the "autoscroll" bug on all pages.
  useEffect(() => {
    const instance = lenisRef.current;
    if (!instance) return;
    // immediate: true skips the smooth animation and snaps to top instantly
    instance.scrollTo(0, { immediate: true });
    // Also refresh ScrollTrigger so pinned elements recalculate correctly
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}
