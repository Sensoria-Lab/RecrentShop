import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  price?: string;
  currency?: string;
  availability?: 'in stock' | 'out of stock' | 'preorder';
}

/**
 * SEO Component for meta tags and Open Graph optimization
 *
 * Features:
 * - Dynamic title, description, keywords
 * - Open Graph tags for social media sharing
 * - Twitter Card support
 * - Product-specific meta tags (price, availability)
 * - Automatic canonical URL generation
 *
 * @example
 * <SEO
 *   title="Коврик для мыши XL Черный"
 *   description="Игровой коврик для мыши размера XL с уникальным дизайном"
 *   image="/images/products/mousepad-xl.webp"
 *   type="product"
 *   price="2500"
 *   currency="RUB"
 * />
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  price,
  currency = 'RUB',
  availability = 'in stock',
}) => {
  const location = useLocation();

  // Default SEO values
  const defaultTitle = 'RECRENT SHOP - Игровые коврики для мыши и одежда';
  const defaultDescription =
    'Премиальные игровые коврики для мыши и стильная одежда от RECRENT. Высокое качество, уникальный дизайн, быстрая доставка по России.';
  const defaultKeywords =
    'коврик для мыши, gaming mousepad, игровой коврик, коврик xl, коврик l, recrent, одежда, худи, футболки';
  const defaultImage = '/images/og-image.webp'; // You should create this image

  // Get the full URL
  const baseUrl = 'https://sensoria-lab.github.io/RecrentShop';
  const currentUrl = url || `${baseUrl}${location.pathname}`;

  // Final meta values
  const metaTitle = title ? `${title} | RECRENT SHOP` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image ? `${baseUrl}${image}` : `${baseUrl}${defaultImage}`;

  useEffect(() => {
    // Update document title
    document.title = metaTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (attribute === 'property') {
          element.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        } else {
          element.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('meta[name="description"]', 'name', metaDescription);
    updateMetaTag('meta[name="keywords"]', 'name', metaKeywords);

    // Open Graph tags (for Facebook, LinkedIn, etc.)
    updateMetaTag('meta[property="og:title"]', 'property', metaTitle);
    updateMetaTag('meta[property="og:description"]', 'property', metaDescription);
    updateMetaTag('meta[property="og:image"]', 'property', metaImage);
    updateMetaTag('meta[property="og:url"]', 'property', currentUrl);
    updateMetaTag('meta[property="og:type"]', 'property', type);
    updateMetaTag('meta[property="og:site_name"]', 'property', 'RECRENT SHOP');
    updateMetaTag('meta[property="og:locale"]', 'property', 'ru_RU');

    // Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', metaTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', metaDescription);
    updateMetaTag('meta[name="twitter:image"]', 'name', metaImage);

    // Product-specific tags
    if (type === 'product' && price) {
      updateMetaTag('meta[property="product:price:amount"]', 'property', price);
      updateMetaTag('meta[property="product:price:currency"]', 'property', currency);
      updateMetaTag('meta[property="product:availability"]', 'property', availability);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

    // Additional meta tags for better SEO
    updateMetaTag('meta[name="robots"]', 'name', 'index, follow');
    updateMetaTag('meta[name="author"]', 'name', 'Sensoria Lab');
    updateMetaTag('meta[name="viewport"]', 'name', 'width=device-width, initial-scale=1.0');
    updateMetaTag('meta[name="theme-color"]', 'name', '#000000');
  }, [metaTitle, metaDescription, metaKeywords, metaImage, currentUrl, type, price, currency, availability]);

  return null; // This component doesn't render anything
};

export default SEO;
