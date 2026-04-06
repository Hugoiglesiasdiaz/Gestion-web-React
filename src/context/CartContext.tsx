import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface CartContextType {
  cartCount: number;
  addToCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState<number>(0);

  // Initialize from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('cartCount');
    if (savedCount) {
      setCartCount(parseInt(savedCount, 10));
    }
  }, []);

  const addToCart = () => {
    setCartCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem('cartCount', newCount.toString());
      return newCount;
    });
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
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
