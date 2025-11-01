/**
 * API Service Layer
 * Централизованный слой для всех запросов к бэкенду
 *
 * ВАЖНО: Сейчас использует моки данных из siteContent.ts
 * После создания бэкенда заменить моки на реальные HTTP запросы
 */

import {
  ApiResponse,
  ProductsApiResponse,
  ContentApiResponse,
  ProductApiResponse,
  ProductCreateRequest,
  ProductUpdateRequest
} from '../../shared/types/content';
import {
  ALL_PRODUCTS,
  getSortedMousepads
} from '../data/products';

// Локальные функции для замены удаленных из siteContent.ts
const getAllProducts = () => ALL_PRODUCTS;

const getProductById = (id: number | string) => {
  return ALL_PRODUCTS.find(product => product.id === id || product.id === Number(id));
};

// Минимальный контент сайта
const SITE_CONTENT = {
  hero: {
    title: "Коврики и одежда для геймеров",
    ctaButton: "Смотреть товары"
  },
  products: ALL_PRODUCTS,
  info: [
    {
      id: "about",
      title: "О нас",
      content: "Магазин качественных игровых аксессуаров"
    }
  ],
  contacts: [
    {
      id: "email",
      title: "Email",
      url: "mailto:info@recrentshop.ru",
      description: "Связаться с нами"
    }
  ],
  navigation: {
    main: [
      { path: "/", label: "Главная" },
      { path: "/catalog", label: "Каталог" },
      { path: "/support", label: "Поддержка" }
    ],
    mobile: [
      { path: "/", label: "Главная" },
      { path: "/catalog", label: "Каталог" },
      { path: "/support", label: "Поддержка" }
    ]
  }
};

// Конфигурация API
const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * Базовый HTTP клиент (для будущего использования)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: API_CONFIG.headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: API_CONFIG.headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: API_CONFIG.headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// apiClient is reserved for future real HTTP requests (kept for reference)
// const apiClient = new ApiClient(API_CONFIG.baseUrl);

/**
 * Products API
 */
export const ProductsApi = {
  /**
   * Получить все товары
   * TODO: Заменить на apiClient.get<Product[]>('/products')
   */
  async getAll(): Promise<ProductsApiResponse> {
    // МОК: Возвращаем данные из siteContent
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: getAllProducts()
        });
      }, 100); // Имитация задержки сети
    });
  },

  /**
   * Получить товар по ID
   * TODO: Заменить на apiClient.get<Product>(`/products/${id}`)
   */
  async getById(id: number | string): Promise<ProductApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = getProductById(id);
        if (product) {
          resolve({ success: true, data: product });
        } else {
          resolve({ success: false, error: 'Product not found' });
        }
      }, 100);
    });
  },

  /**
   * Создать новый товар
   * TODO: Заменить на apiClient.post<Product>('/products', data)
   */
  async create(data: ProductCreateRequest): Promise<ProductApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // В реальности это будет POST запрос к API
        resolve({
          success: false,
          error: 'API not implemented yet'
        });
      }, 100);
    });
  },

  /**
   * Обновить товар
   * TODO: Заменить на apiClient.put<Product>(`/products/${data.id}`, data)
   */
  async update(data: ProductUpdateRequest): Promise<ProductApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: false,
          error: 'API not implemented yet'
        });
      }, 100);
    });
  },

  /**
   * Удалить товар
   * TODO: Заменить на apiClient.delete(`/products/${id}`)
   */
  async delete(id: number | string): Promise<ApiResponse<void>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: false,
          error: 'API not implemented yet'
        });
      }, 100);
    });
  },

  /**
   * Фильтровать товары по категории
   */
  async getByCategory(category: 'mousepads' | 'clothing'): Promise<ProductsApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getAllProducts().filter(p => p.category === category);
        resolve({ success: true, data: products });
      }, 100);
    });
  }
};

/**
 * Content API (для информационных блоков, контактов и т.д.)
 */
export const ContentApi = {
  /**
   * Получить весь контент сайта
   * TODO: Заменить на apiClient.get('/content')
   */
  async getAll(): Promise<ContentApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: SITE_CONTENT });
      }, 100);
    });
  },

  /**
   * Обновить секцию контента
   * TODO: Заменить на apiClient.put(`/content/${section}`, data)
   */
  async updateSection(section: string, data: any): Promise<ApiResponse<any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: false,
          error: 'API not implemented yet'
        });
      }, 100);
    });
  }
};

/**
 * Images API (для загрузки изображений)
 */
export const ImagesApi = {
  /**
   * Загрузить изображение
   * TODO: Реализовать загрузку на S3/CDN
   */
  async upload(file: File): Promise<ApiResponse<{ url: string }>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: false,
          error: 'API not implemented yet'
        });
      }, 100);
    });
  },

  /**
   * Удалить изображение
   */
  async delete(url: string): Promise<ApiResponse<void>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: false,
          error: 'API not implemented yet'
        });
      }, 100);
    });
  }
};

/**
 * Экспорт всех API сервисов
 */
export const API = {
  products: ProductsApi,
  content: ContentApi,
  images: ImagesApi
};

export default API;
