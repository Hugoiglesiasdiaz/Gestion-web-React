import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

interface CartItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  colorName: string;
  capacity: string;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
        return [];
      }
    }
    return [];
  });

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const newCart = [...prev, item];
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount: cartItems.length, addToCart }}
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
