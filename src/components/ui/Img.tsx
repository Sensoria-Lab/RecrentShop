/* eslint-disable @next/next/no-img-element */
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
const Img: React.FC<ImgProps & { priority?: boolean }> = ({ src, alt = '', loading, decoding, className, srcSet, priority = false, ...props }) => {
  const getFixedSrc = (path: string): string => {
    if (!path) return path;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    if (basePath && path.startsWith(basePath)) return path;
    if (path.startsWith('/')) {
      return basePath ? `${basePath}${path}` : path;
    }
    return path;
  };

  const finalLoading = priority ? 'eager' : (loading || 'lazy');
  const finalDecoding = priority ? 'sync' : (decoding || 'async');

  const isReviewImage = src.includes('/reviews/');
  const isPreviewImage = src.includes('/preview.');
  const isRaster = /\.(jpg|jpeg|png|webp)$/i.test(src);
  const webpSrc = (isRaster && !isReviewImage && !isPreviewImage) ? getFixedSrc(src).replace(/\.(jpg|jpeg|png)$/i, '.webp') : null;

  const fixedSrc = getFixedSrc(src);
  const fixedWebp = webpSrc ? webpSrc : undefined;

  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> & { fetchPriority?: 'high' | 'low' | 'auto' } = {
    src: fixedSrc,
    alt: alt || '',
    loading: finalLoading,
    decoding: finalDecoding,
    className: className ? className : 'w-full h-full block',
    fetchPriority: priority ? 'high' : undefined,
    ...props
  };

  if (srcSet) {
    imgProps.srcSet = srcSet;
  }

  if (fixedWebp) {
    const { alt: _alt, fetchPriority: _fp, ...imgSpread } = imgProps;
    return (
      <picture className="block w-full h-full">
        <source srcSet={fixedWebp} type="image/webp" />
        <img alt={_alt} fetchPriority={_fp} {...imgSpread} />
      </picture>
    );
  }
  const { alt: _alt2, fetchPriority: _fp2, ...imgSpread2 } = imgProps;
  return <img alt={_alt2} fetchPriority={_fp2} {...imgSpread2} />;
};

export default Img;

