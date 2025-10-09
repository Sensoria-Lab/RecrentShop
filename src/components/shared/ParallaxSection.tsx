import React, { useEffect, useState, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // 0.1 = slow, 1 = normal, 2 = fast
  direction?: 'up' | 'down';
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const windowHeight = window.innerHeight;

      // Calculate parallax offset only when element is in viewport
      if (elementTop < windowHeight && elementTop > -rect.height) {
        const scrollProgress = (windowHeight - elementTop) / (windowHeight + rect.height);
        const offset = scrollProgress * 100 * speed;
        setOffsetY(direction === 'up' ? -offset : offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div ref={elementRef} className={className}>
      <div
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
