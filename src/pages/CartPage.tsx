import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '@/components/molecules/CartItem';
import { CartSummary } from '@/components/organisms/CartSummary';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white pb-32">
      {/* Spacer for fixed header */}
      <div className="h-24 md:h-32" />

      <main className="max-w-screen-xl mx-auto px-4 md:px-6">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="text-xl font-light uppercase tracking-widest text-black">
            Your Bag ({cartCount})
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Products List */}
          <div className="lg:col-span-8">
            {cartItems.length === 0 ? (
              <div className="py-32 flex flex-col items-center justify-center border-t-[0.5px] border-gray-200">
                <p className="text-xs uppercase tracking-[0.5em] text-gray-500 font-light mb-12">
                  YOUR BAG IS EMPTY
                </p>
                <Link
                  to="/"
                  className="text-xs uppercase tracking-widest font-light border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
                >
                  Browse Collection
                </Link>
              </div>
            ) : (
              <div className="border-t-[0.5px] border-gray-200">
                {cartItems.map((item, index) => (
                  <CartItem
                    key={`${item.id}-${item.colorName}-${item.capacity}-${index}`}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <CartSummary total={total} />
        </div>
      </main>
    </div>
  );
}
