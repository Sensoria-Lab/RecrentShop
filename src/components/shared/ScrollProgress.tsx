import React, { useState, useEffect } from 'react';

/**
 * Scroll Progress Bar Component
 * Shows a progress bar at the top of the page indicating scroll position
 */
const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / totalScrollableHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 z-[10001] pointer-events-none"
      style={{ 
        background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
      }}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Animated shine effect */}
        <div 
          className="h-full w-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            animation: 'shine 2s ease-in-out infinite'
          }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;
