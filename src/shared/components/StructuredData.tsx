import React from 'react';
import { Product } from '../types/product';

interface ProductStructuredDataProps {
  product: Product;
  baseUrl?: string;
}

interface OrganizationStructuredDataProps {
  baseUrl?: string;
}

/**
 * Product Structured Data (JSON-LD) for Google Rich Results
 *
 * Adds schema.org Product markup to help Google understand product information
 * and display rich snippets in search results (price, availability, ratings)
 *
 * @example
 * <ProductStructuredData
 *   product={productData}
 *   baseUrl="https://sensoria-lab.github.io/RecrentShop"
 * />
 */
export const ProductStructuredData: React.FC<ProductStructuredDataProps> = ({
  product,
  baseUrl = 'https://sensoria-lab.github.io/RecrentShop',
}) => {
  // Extract numeric price
  const priceMatch = product.price.match(/\d+/);
  const price = priceMatch ? priceMatch[0] : '0';

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.subtitle || product.title,
    image: product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`,
    brand: {
      '@type': 'Brand',
      name: 'RECRENT',
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/product/${product.id}`,
      priceCurrency: 'RUB',
      price: price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'RECRENT SHOP',
      },
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 1,
        bestRating: '5',
        worstRating: '1',
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

/**
 * Organization Structured Data (JSON-LD) for company information
 *
 * Helps Google understand your business and display it in Knowledge Graph
 */
export const OrganizationStructuredData: React.FC<OrganizationStructuredDataProps> = ({
  baseUrl = 'https://sensoria-lab.github.io/RecrentShop',
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RECRENT SHOP',
    alternateName: 'Sensoria Lab',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Russian', 'English'],
    },
    sameAs: [
      // Add your social media links here
      // 'https://vk.com/recrent',
      // 'https://instagram.com/recrent',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

/**
 * Website Structured Data (JSON-LD) for site-wide information
 */
export const WebsiteStructuredData: React.FC<{ baseUrl?: string }> = ({
  baseUrl = 'https://sensoria-lab.github.io/RecrentShop',
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RECRENT SHOP',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/catalog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

/**
 * Breadcrumb Structured Data (JSON-LD) for navigation
 */
export const BreadcrumbStructuredData: React.FC<{
  items: Array<{ name: string; url: string }>;
  baseUrl?: string;
}> = ({ items, baseUrl = 'https://sensoria-lab.github.io/RecrentShop' }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
