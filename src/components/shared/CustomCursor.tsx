import React, { useEffect, useState } from 'react';

/**
 * Custom Cursor Component
 * Minimal dot cursor with subtle glow effect
 * Only enabled on desktop devices (not touch screens)
 */
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if device has touch screen
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
  }, []);

  useEffect(() => {
    // Don't add cursor on touch devices
    if (isTouchDevice) return;
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, [isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isPointer ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)',
        }}
      />
      
      {/* Glow effect */}
      <div
        className="custom-cursor-glow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isPointer ? 0.6 : 0.3,
        }}
      />
    </>
  );
};

export default CustomCursor;
