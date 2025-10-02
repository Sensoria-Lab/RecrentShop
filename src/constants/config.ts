/**
 * Application configuration constants
 * Централизованная конфигурация приложения
 */

// Site metadata
export const SITE_CONFIG = {
  name: 'RECRENT SHOP',
  description: 'Коврики для мыши и одежда премиум качества',
  url: 'https://sensoria-lab.github.io/RecrentShop/',
  email: 'info@recrentshop.ru',
  phone: '+7 (999) 999-99-99'
} as const;

// Social links
export const SOCIAL_LINKS = {
  vk: 'https://vk.com/recrentshop',
  telegram: 'https://t.me/recrent',
  whatsapp: 'https://wa.me/79999999999',
  instagram: 'https://instagram.com/recrentshop',
  twitch: 'https://twitch.tv/recrent',
  tiktok: 'https://tiktok.com/@recrent.twitch',
  youtube: 'https://youtube.com/c/RecrentChannel'
} as const;

// Company information
export const COMPANY_INFO = {
  name: 'ИП Осинцев Юрий Витальевич',
  inn: '450100470595',
  ogrnip: '321774600455545',
  description: 'Индивидуальный предприниматель, зарегистрированный в Российской Федерации'
} as const;

// Text constants
export const TEXTS = {
  emailResponse: 'Мы отвечаем на все письма в течение 24 часов в рабочие дни.',
  emailPrompt: 'По всем вопросам пишите на нашу электронную почту:',
  socialsPrompt: 'Следите за новостями и обновлениями в наших социальных сетях:',
  subscribePrompt: 'Подпишитесь на наши аккаунты',
  supportHours: 'Часы работы и время ответа'
} as const;

// Animation durations (ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000
} as const;

// Scroll settings
export const SCROLL_CONFIG = {
  snapDuration: 600, // Main page snap scroll duration
  smoothBehavior: 'smooth' as ScrollBehavior
} as const;

// Products
export const PRODUCT_CONFIG = {
  categories: ['mousepads', 'clothing'] as const,
  defaultSort: 'rating',
  itemsPerPage: 12,
  carouselItemsPerView: 3
} as const;

// Cart
export const CART_CONFIG = {
  maxQuantity: 99,
  minQuantity: 1,
  storageKey: 'recrent-cart'
} as const;

// API
export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000
} as const;

// Images
export const IMAGE_CONFIG = {
  cdnUrl: process.env.REACT_APP_CDN_URL || '',
  placeholderColor: '#1a1a1a',
  lazyLoadThreshold: 0.1 // 10% of viewport
} as const;

// UI
export const UI_CONFIG = {
  headerHideScrollThreshold: 100,
  headerShowMouseY: 120,
  toastDuration: 3000,
  modalZIndex: 10000,
  headerZIndex: 9999
} as const;

// Validation
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  minNameLength: 2,
  maxNameLength: 50,
  minAddressLength: 10,
  maxAddressLength: 200
} as const;
