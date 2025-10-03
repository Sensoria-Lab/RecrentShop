/**
 * Application-wide constants and configuration
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000, // 30 seconds
  USE_STATIC_DATA: process.env.NODE_ENV === 'production' && !process.env.REACT_APP_API_URL,
} as const;

// GitHub Pages Configuration
export const GITHUB_PAGES_URL = 'https://sensoria-lab.github.io/RecrentShop';

// Route paths
export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  PRODUCT: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  CONTACTS: '/contacts',
  INFO: '/info',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  NOT_FOUND: '*',
} as const;

// Auth Configuration
export const AUTH_CONFIG = {
  TOKEN_KEY: 'authToken',
  USER_KEY: 'currentUser',
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
} as const;

// UI Configuration
export const UI_CONFIG = {
  PRODUCTS_PER_PAGE: 12,
  MAX_CART_ITEMS: 99,
  CURRENCY: 'р.',
} as const;
