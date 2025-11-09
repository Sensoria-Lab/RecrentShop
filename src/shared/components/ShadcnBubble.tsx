import React, { useEffect, useRef } from 'react';

type BubbleConfig = {
  className?: string;
  // per-bubble colors: [primary, secondary]
  colors?: { [k: string]: [string, string] };
  // global parallax strength multiplier (0 = off)
  parallaxStrength?: number;
  // enable or disable movement
  enableParallax?: boolean;
};

const ShadcnBubble: React.FC<BubbleConfig> = ({ className, colors, parallaxStrength = 1, enableParallax = true }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // apply CSS variables for colors if provided
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    // Only set custom colors if provided, otherwise CSS will use its fallback values
    if (!colors) return;

    Object.keys(colors).forEach(key => {
      const pair = colors[key];
      if (!pair || pair.length < 2) return;
      c.style.setProperty(`--${key}-color`, `rgba(${pair[0]},0.9)`);
      c.style.setProperty(`--${key}-color-2`, `rgba(${pair[1]},0.4)`);
    });
  }, [colors]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !enableParallax) return;

    const bubbles = Array.from(container.querySelectorAll<HTMLElement>('.bg-bubble'));
    let pointer = { x: 0, y: 0 };
    let last = { x: 0, y: 0 };

    const onMove = (e: any) => {
      const rect = container.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      if (e && 'touches' in e && e.touches && e.touches.length) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if (e && 'clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      pointer.x = (clientX - rect.left) / rect.width - 0.5;
      pointer.y = (clientY - rect.top) / rect.height - 0.5;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });

    let rafId = 0;
    const animate = () => {
      last.x += (pointer.x - last.x) * 0.08;
      last.y += (pointer.y - last.y) * 0.08;

      bubbles.forEach((b, i) => {
        const depth = (i + 1) / bubbles.length;
        const tx = last.x * 80 * depth * parallaxStrength;
        const ty = last.y * 60 * depth * parallaxStrength;
        // write CSS variables instead of directly updating transform so CSS animations and transforms combine
        b.style.setProperty('--tx', `${tx}px`);
        b.style.setProperty('--ty', `${ty}px`);
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [parallaxStrength, enableParallax]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 bg-black ${className ?? ''}`}>
      {/* Gaming-style mesh gradient background */}
      <div className="app-bg-dots absolute inset-0" />
      
      {/* Subtle square pattern overlay with radial fade */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1) 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1) 100%)',
          opacity: 1
        }}
      />
      
      {/* Parallax bubbles overlay */}
      <div className="bg-bubbles" ref={containerRef} aria-hidden="true">
        <div className="bg-bubble bubble-1" />
        <div className="bg-bubble bubble-2" />
        <div className="bg-bubble bubble-3" />
        <div className="bg-bubble bubble-4" />
        <div className="bg-bubble bubble-5" />
        <div className="bg-bubble bubble-6" />
        <div className="bg-bubble bubble-7" />
        <div className="bg-bubble bubble-8" />
        <div className="bg-bubble bubble-9" />
        <div className="bg-bubble bubble-10" />
        <div className="bg-bubble bubble-11" />
        <div className="bg-bubble bubble-12" />
      </div>
    </div>
  );
};

ShadcnBubble.displayName = 'ShadcnBubble';

export default ShadcnBubble;
