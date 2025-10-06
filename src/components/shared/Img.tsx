import React from 'react';

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

/**
 * Image component that automatically handles PUBLIC_URL for GitHub Pages
 * Use this instead of regular <img> tags to ensure images work on GitHub Pages
 */
const Img: React.FC<ImgProps> = ({ src, alt = '', loading, decoding, ...props }) => {
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

  return <img src={getFixedSrc(src)} alt={alt} loading={finalLoading} decoding={finalDecoding} {...props} />;
};

export default Img;
