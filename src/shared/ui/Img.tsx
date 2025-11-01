import React from 'react';

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  /** Optional srcSet for responsive images */
  srcSet?: string;
}

/**
 * Image component that automatically handles PUBLIC_URL for GitHub Pages
 * Use this instead of regular <img> tags to ensure images work on GitHub Pages
 */
const Img: React.FC<ImgProps> = ({ src, alt = '', loading, decoding, className, srcSet, ...props }) => {
  const getFixedSrc = (path: string): string => {
    if (!path) return path;
    
    // If path already includes PUBLIC_URL, return as is
    const publicUrl = process.env.PUBLIC_URL || '';
    if (path.includes(publicUrl) && publicUrl) {
      return path;
    }
    
    // If path starts with /, prepend PUBLIC_URL
    if (path.startsWith('/')) {
      const cleanPath = path.slice(1);
      return publicUrl ? `${publicUrl}/${cleanPath}` : `/${cleanPath}`;
    }
    
    return path;
  };

  // Default to lazy loading for non-critical images and async decoding to improve performance
  const finalLoading = loading || 'lazy';
  const finalDecoding = decoding || 'async';

  // If developer provided srcSet, pass through. Also provide a webp source when appropriate.
  // Disable webp conversion for review images (they don't have webp versions)
  const isReviewImage = src.includes('/reviews/');
  const isRaster = /\.(jpg|jpeg|png|webp)$/i.test(src);
  const webpSrc = (isRaster && !isReviewImage) ? getFixedSrc(src).replace(/\.(jpg|jpeg|png)$/i, '.webp') : null;

  const fixedSrc = getFixedSrc(src);
  const fixedWebp = webpSrc ? webpSrc : undefined;

  // Prefer object-fit: cover in parent container; allow consumer to control via className
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: fixedSrc,
    alt: alt || '',
    loading: finalLoading,
    decoding: finalDecoding,
    className: className ? className : 'w-full h-full block',
    ...props
  };

  if (srcSet) {
    imgProps.srcSet = srcSet;
  }

  if (fixedWebp) {
    const { alt: _alt, ...imgSpread } = imgProps;
    return (
      <picture className="block w-full h-full">
        <source srcSet={fixedWebp} type="image/webp" />
        <img alt={_alt} {...imgSpread} />
      </picture>
    );
  }
  const { alt: _alt2, ...imgSpread2 } = imgProps;
  return <img alt={_alt2} {...imgSpread2} />;
};

export default Img;
