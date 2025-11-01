import React from 'react';

interface OrganizationStructuredDataProps {
  baseUrl?: string;
}

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
