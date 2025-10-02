import { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';

/**
 * Hook for managing add to cart animation
 */
export const useAddToCart = () => {
  const { addItem } = useCart();
  const [flyingToCart, setFlyingToCart] = useState(false);

  const handleAddToCart = useCallback((productData: any, quantity: number) => {
    // Start animation
    setFlyingToCart(true);
    
    // Create flying image copy
    const productImageElement = document.getElementById('product-main-image');
    const cartIcon = document.getElementById('cart-button');
    
    if (productImageElement && cartIcon) {
      const imageRect = productImageElement.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();
      
      // Create image clone
      const flyingImage = document.createElement('img');
      flyingImage.src = (productImageElement as HTMLImageElement).src;
      flyingImage.style.cssText = `
        position: fixed;
        left: ${imageRect.left}px;
        top: ${imageRect.top}px;
        width: ${imageRect.width}px;
        height: ${imageRect.height}px;
        z-index: 10000;
        pointer-events: none;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        object-fit: contain;
      `;
      
      document.body.appendChild(flyingImage);
      
      // Start animation
      setTimeout(() => {
        flyingImage.style.left = `${cartRect.left}px`;
        flyingImage.style.top = `${cartRect.top}px`;
        flyingImage.style.width = '50px';
        flyingImage.style.height = '50px';
        flyingImage.style.opacity = '0';
      }, 10);
      
      // Clean up and add to cart
      setTimeout(() => {
        document.body.removeChild(flyingImage);
        for (let i = 0; i < quantity; i++) {
          addItem({
            id: productData.id,
            title: productData.title,
            subtitle: productData.subtitle,
            price: productData.price,
            image: productData.image
          });
        }
        setFlyingToCart(false);
      }, 800);
    } else {
      // If elements not found, just add to cart
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: productData.id,
          title: productData.title,
          subtitle: productData.subtitle,
          price: productData.price,
          image: productData.image
        });
      }
      setFlyingToCart(false);
    }
  }, [addItem]);

  return {
    flyingToCart,
    handleAddToCart
  };
};
