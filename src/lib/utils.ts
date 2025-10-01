/**
 * Utility function to get the correct public URL for assets
 * Handles both development and production (GitHub Pages) environments
 */
export const getPublicUrl = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development, PUBLIC_URL is usually empty or '/'
  // In production (GitHub Pages), it's '/RecrentShop'
  const publicUrl = process.env.PUBLIC_URL || '';
  
  // If publicUrl is empty or just '/', return path as is
  if (!publicUrl || publicUrl === '/') {
    return `/${cleanPath}`;
  }
  
  return `${publicUrl}/${cleanPath}`;
};

/**
 * Get image URL with proper public URL prefix
 */
export const getImageUrl = (imagePath: string): string => {
  return getPublicUrl(imagePath);
};

/**
 * Fix image paths for GitHub Pages deployment
 * This function is used to automatically fix all image paths in the app
 */
export const fixImagePath = (path: string): string => {
  if (!path) return path;
  
  // If path already includes PUBLIC_URL, return as is
  if (path.includes(process.env.PUBLIC_URL || '')) {
    return path;
  }
  
  // If path starts with /, it's an absolute path
  if (path.startsWith('/')) {
    return getPublicUrl(path);
  }
  
  return path;
};
