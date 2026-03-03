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
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  USE_STATIC_DATA: !process.env.NEXT_PUBLIC_API_URL && !process.env.REACT_APP_API_URL
} as const;

// ROUTES moved to routes.ts to avoid duplication

