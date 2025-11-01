import { useState, useCallback } from 'react';
import { useCart } from '../../../core/context/CartContext';
import { useToast } from '../../../core/context/ToastContext';
import { hapticSuccess } from '../../../shared/utils/haptic';

/**
 * Hook for managing add to cart with toast notification
 */
export const useAddToCart = () => {
  const { addItem } = useCart();
  const { success } = useToast();
  const [flyingToCart, setFlyingToCart] = useState(false);

  const handleAddToCart = useCallback((productData: any, quantity: number, selectedSize?: string, selectedColor?: string, selectedType?: string) => {
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
