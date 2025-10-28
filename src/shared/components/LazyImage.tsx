import React, { useState, ImgHTMLAttributes } from 'react';
import { useIntersectionObserver } from '../hooks';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderClassName?: string;
  threshold?: number;
}

/**
 * Optimized lazy-loading image component with Intersection Observer
 * Only loads images when they're about to enter the viewport
 *
 * @example
 * <LazyImage
 *   src="/images/product.webp"
 *   alt="Product"
 *   className="w-full h-full object-cover"
 *   threshold={0.1}
 * />
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  threshold = 0.1,
  ...props
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    freezeOnceVisible: true,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={ref} className="relative w-full h-full">
      {/* Placeholder skeleton */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-white/5 animate-pulse ${placeholderClassName}`}
          aria-hidden="true"
        />
      )}

      {/* Actual image - only load when visible */}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <span className="text-white/50 text-xs">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(LazyImage);
