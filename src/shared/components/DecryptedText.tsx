import React, { useState, useEffect, useCallback } from 'react';

interface DecryptedTextProps {
  text: string;
  duration?: number;
  className?: string;
  delay?: number;
  enableHover?: boolean;
  showAnimation?: boolean;
}

const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  duration = 600,
  className = '',
  delay = 0,
  enableHover = false,
  showAnimation = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Characters to use for the scrambled effect
  const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const runAnimation = useCallback((isHover = false) => {
    if ((!isHover && !isDecrypting) || !showAnimation) return;

    let animationId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (isHover ? duration * 0.6 : duration), 1);

      // Calculate how many characters should be "decrypted"
      const decryptedLength = Math.floor(progress * text.length);

      let newText = '';

      for (let i = 0; i < text.length; i++) {
        if (i < decryptedLength) {
          // Character is fully decrypted
          newText += text[i];
        } else if (i === decryptedLength && progress < 1) {
          // Current character being decrypted - show random chars
          const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          newText += randomChar;
        } else {
          // Future characters - show scrambled
          if (Math.random() > 0.7) {
            const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            newText += randomChar;
          } else {
            newText += text[i] === ' ' ? ' ' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
      }

      setDisplayText(newText);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        if (!isHover) setIsDecrypting(false);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDecrypting, showAnimation, scrambleChars, text, duration]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      runAnimation();
    }, delay + 100);
    return () => clearTimeout(timeoutId);
  }, [text, duration, delay, runAnimation]);

  const handleMouseEnter = () => {
    if (enableHover && !isDecrypting) {
      setIsHovering(true);
      setDisplayText('');
      runAnimation(true);
    }
  };

  const handleMouseLeave = () => {
    if (enableHover) {
      setIsHovering(false);
      setDisplayText(text);
    }
  };

  if (!showAnimation) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`${className} ${isDecrypting || isHovering ? 'animate-pulse' : ''}`}
      style={{
        fontFamily: 'monospace',
        letterSpacing: isDecrypting || isHovering ? '0.1em' : 'normal',
        transition: 'letter-spacing 0.3s ease',
        cursor: enableHover ? 'pointer' : 'default'
      }}
      onMouseEnter={enableHover ? handleMouseEnter : undefined}
      onMouseLeave={enableHover ? handleMouseLeave : undefined}
    >
      {displayText || ' '}
    </span>
  );
};

export default DecryptedText;