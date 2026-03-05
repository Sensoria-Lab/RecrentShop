'use client';
import { useState, useCallback } from 'react';
import { useCart } from '@/src/context/CartContext';
import { useToast } from '@/src/context/ToastContext';
import { hapticSuccess } from '@/src/lib/haptic';
import type { Product } from '@/src/types/product';

type CartProductInput = Pick<Product, 'id' | 'title' | 'subtitle' | 'price' | 'image'>;

/**
 * Hook for managing add to cart with toast notification
 */
export const useAddToCart = () => {
  const { addItem } = useCart();
  const { success } = useToast();
  const [flyingToCart, setFlyingToCart] = useState(false);

  const handleAddToCart = useCallback((productData: CartProductInput, quantity: number, selectedSize?: string, selectedColor?: string, selectedType?: string) => {
    setFlyingToCart(true);

    // Haptic feedback for success
    hapticSuccess();

    // Add to cart
    const uniqueId = `${productData.id}-${selectedSize || ''}-${selectedColor || ''}-${selectedType || ''}`;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: uniqueId,
        title: productData.title,
        subtitle: productData.subtitle,
        price: productData.price,
        image: productData.image,
        selectedSize,
        selectedColor,
        selectedType
      });
    }

    // Show success toast
    const quantityText = quantity > 1 ? `${quantity} товара` : 'Товар';
    success(`${quantityText} добавлен в корзину! 🎉`, 2500);

    setTimeout(() => {
      setFlyingToCart(false);
    }, 300);
  }, [addItem, success]);

  return {
    flyingToCart,
    handleAddToCart
  };
};

