import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface CartItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  price: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load from localStorage
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      // Check if item already exists
      const existingIndex = prevItems.findIndex((i) => 
        i.id === item.id && 
        i.selectedSize === item.selectedSize && 
        i.selectedColor === item.selectedColor
      );

      if (existingIndex > -1) {
        // Update quantity
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += 1;
        return newItems;
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d]/g, ''));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
