/**
 * Примеры использования API Service
 *
 * Этот файл демонстрирует, как правильно использовать API слой
 * для получения и обновления данных
 */

import React, { useState, useEffect } from 'react';
import { API } from '../services/api';
import { Product } from '../types/product';

/**
 * Пример 1: Загрузка всех товаров
 */
export const ProductsListExample: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await API.products.getAll();

        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          setError(response.error || 'Failed to fetch products');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
};

/**
 * Пример 2: Загрузка товара по ID
 */
export const ProductDetailExample: React.FC<{ productId: number }> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await API.products.getById(productId);

      if (response.success && response.data) {
        setProduct(response.data);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.price}</p>
    </div>
  );
};

/**
 * Пример 3: Фильтрация товаров по категории
 */
export const ProductsByCategoryExample: React.FC = () => {
  const [category, setCategory] = useState<'mousepads' | 'clothing'>('mousepads');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await API.products.getByCategory(category);

      if (response.success && response.data) {
        setProducts(response.data);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <button onClick={() => setCategory('mousepads')}>Mousepads</button>
      <button onClick={() => setCategory('clothing')}>Clothing</button>

      <div>
        {products.map(product => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    </div>
  );
};

/**
 * Пример 4: Загрузка всего контента сайта
 */
export const SiteContentExample: React.FC = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const response = await API.content.getAll();

      if (response.success && response.data) {
        setContent(response.data);
      }
    };

    fetchContent();
  }, []);

  if (!content) return <div>Loading...</div>;

  return (
    <div>
      <h1>{content.hero.title}</h1>
      <h2>Info Sections:</h2>
      {content.info.map((item: any) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

/**
 * Пример 5: Создание товара (для админ-панели)
 *
 * ВАЖНО: Пока API не реализован, этот метод вернет ошибку
 */
export const CreateProductExample: React.FC = () => {
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    setCreating(true);

    const response = await API.products.create({
      title: 'Новый коврик',
      subtitle: 'Test',
      price: '3000 р.',
      priceNumeric: 3000,
      image: '/images/test.webp',
      images: ['/images/test.webp'],
      category: 'mousepads'
    });

    if (response.success) {
      alert('Product created!');
    } else {
      alert('Error: ' + response.error);
    }

    setCreating(false);
  };

  return (
    <button onClick={handleCreate} disabled={creating}>
      {creating ? 'Creating...' : 'Create Product'}
    </button>
  );
};

/**
 * Пример 6: Обработка ошибок с retry логикой
 */
export const ProductsWithRetryExample: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    const fetchWithRetry = async (attempt: number = 0) => {
      try {
        const response = await API.products.getAll();

        if (response.success && response.data) {
          setProducts(response.data);
        } else if (attempt < MAX_RETRIES) {
          // Retry after 1 second
          setTimeout(() => {
            setRetryCount(attempt + 1);
            fetchWithRetry(attempt + 1);
          }, 1000);
        }
      } catch (err) {
        if (attempt < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(attempt + 1);
            fetchWithRetry(attempt + 1);
          }, 1000);
        }
      }
    };

    fetchWithRetry();
  }, []);

  return (
    <div>
      {retryCount > 0 && <div>Retry attempt: {retryCount}</div>}
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
};
