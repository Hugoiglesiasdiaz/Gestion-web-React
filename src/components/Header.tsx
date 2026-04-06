import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-100 h-20">
      <div className="max-w-[1440px] mx-auto h-full px-10 flex justify-between items-center">
        {/* Logo Inicio */}
        <Link 
          to="/" 
          className="text-3xl font-black tracking-tighter uppercase select-none text-black hover:opacity-70 transition-opacity"
        >
          MBST
        </Link>

        {/* Icono Carrito */}
        <Link 
          to="/cart" 
          className="relative group cursor-pointer hover:opacity-70 transition-opacity"
        >
          <ShoppingBag className="w-6 h-6 text-black stroke-[1.5px]" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
