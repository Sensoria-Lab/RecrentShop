/**
 * Типы для централизованного управления контентом сайта
 * Подготовка для интеграции с бэкендом
 */

import { Product } from './product';

// Главная страница
export interface HeroContent {
  title: string;
  ctaButton: string;
}

// Информационные блоки
export interface InfoItem {
  id: string;
  title: string;
  content: string;
  icon?: string; // SVG path или компонент иконки
}

// Контакты
export interface ContactItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
}

// Навигация
export interface NavItem {
  path: string;
  label: string;
}

// Полная структура контента сайта
export interface SiteContent {
  hero: HeroContent;
  products: Product[];
  info: InfoItem[];
  contacts: ContactItem[];
  navigation: {
    main: NavItem[];
    mobile: NavItem[];
  };
}

// API Response типы для будущей интеграции с бэкендом
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Запросы к API
export interface ProductsApiResponse extends ApiResponse<Product[]> {}
export interface ContentApiResponse extends ApiResponse<SiteContent> {}
export interface ProductApiResponse extends ApiResponse<Product> {}

// Типы для админ-панели (будущее)
export interface ContentUpdateRequest {
  section: keyof SiteContent;
  data: any;
}

export interface ProductCreateRequest {
  title: string;
  subtitle?: string;
  price: string;
  priceNumeric: number;
  image: string;
  images: string[];
  category: 'mousepads' | 'clothing';
  // ... остальные поля Product
}

export interface ProductUpdateRequest extends Partial<ProductCreateRequest> {
  id: number | string;
}
