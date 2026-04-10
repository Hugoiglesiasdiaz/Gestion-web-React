import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

import type { CartItem } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (
    productId: string,
    colorName: string,
    capacity: string,
  ) => void;
  updateQuantity: (
    productId: string,
    colorName: string,
    capacity: string,
    delta: number,
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage', error);
      return [];
    }
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage', error);
    }
  }, [cartItems]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevCart) => {
      const itemExists = prevCart.find(
        (item) =>
          item.id === newItem.id &&
          item.colorName === newItem.colorName &&
          item.capacity === newItem.capacity,
      );

      if (itemExists) {
        return prevCart.map((item) =>
          item === itemExists ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (
    productId: string,
    colorName: string,
    capacity: string,
    delta: number,
  ) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (
            item.id === productId &&
            item.colorName === colorName &&
            item.capacity === capacity
          ) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (
    productId: string,
    colorName: string,
    capacity: string,
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === productId &&
            item.colorName === colorName &&
            item.capacity === capacity
          ),
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
