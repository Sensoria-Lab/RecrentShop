/* Application Configuration (clean file without BOM) */
export const SITE_CONFIG = {
  name: 'RECRENT SHOP',
  description: 'Коврики для мыши и одежда премиум качества',
  url: 'https://sensoria-lab.github.io/RecrentShop/',
  email: 'info@recrentshop.ru',
  phone: '+7 (999) 999-99-99'
} as const;

export const SOCIAL_LINKS = {
  vk: 'https://vk.com/recrent',
  telegram: 'https://t.me/recrent',
  whatsapp: 'https://wa.me/79999999999',
  instagram: 'https://instagram.com/recrentshop',
  twitch: 'https://twitch.tv/recrent',
  tiktok: 'https://www.tiktok.com/@recrent.twitch',
  youtube: 'https://www.youtube.com/c/recrentchannel',
  discord: 'https://discord.com/invite/recrent'
} as const;

export const COMPANY_INFO = {
  name: 'ИП Осинцев Юрий Витальевич',
  inn: '450100470595',
  ogrnip: '321774600455545',
  description: 'Индивидуальный предприниматель, зарегистрированный в Российской Федерации'
} as const;

export const TEXTS = {
  emailResponse: 'Мы отвечаем на все письма в течение 24 часов в рабочие дни.',
  emailPrompt: 'По всем вопросам пишите на нашу электронную почту:',
  socialsPrompt: 'Следите за новостями и обновлениями в наших социальных сетях:',
  subscribePrompt: 'Подпишитесь на наши аккаунты',
  supportHours: 'Часы работы и время ответа'
} as const;

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  USE_STATIC_DATA: process.env.NODE_ENV === 'production' && !process.env.REACT_APP_API_URL
} as const;

// ROUTES moved to routes.ts to avoid duplication

export const AUTH_CONFIG = {
  TOKEN_KEY: 'authToken',
  USER_KEY: 'currentUser',
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000
} as const;

export const PRODUCT_CONFIG = {
  categories: ['mousepads', 'clothing'] as const,
  defaultSort: 'rating',
  itemsPerPage: 12,
  carouselItemsPerView: 3
} as const;

export const CART_CONFIG = {
  maxQuantity: 99,
  minQuantity: 1,
  storageKey: 'recrent-cart'
} as const;

export const UI_CONFIG = {
  headerHideScrollThreshold: 100,
  headerShowMouseY: 120,
  toastDuration: 3000,
  modalZIndex: 10000,
  headerZIndex: 9999
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000
} as const;

export const SCROLL_CONFIG = {
  snapDuration: 600,
  smoothBehavior: 'smooth' as ScrollBehavior
} as const;

export const IMAGE_CONFIG = {
  cdnUrl: process.env.REACT_APP_CDN_URL || '',
  placeholderColor: '#1a1a1a',
  lazyLoadThreshold: 0.1
} as const;

export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  minNameLength: 2,
  maxNameLength: 50,
  minAddressLength: 10,
  maxAddressLength: 200
} as const;
