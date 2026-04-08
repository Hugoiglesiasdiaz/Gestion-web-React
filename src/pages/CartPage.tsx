import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  }, [cartItems]);

  const formattedTotal = total.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white pb-32">
      {/* Spacer for fixed header */}
      <div className="h-24 md:h-32" />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="text-xl font-light uppercase tracking-widest text-black">
            Your Bag ({cartItems.length})
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Products List */}
          <div className="lg:col-span-8">
            {cartItems.length === 0 ? (
              <div className="py-32 flex flex-col items-center justify-center border-t-[0.5px] border-gray-200">
                <p className="text-[11px] uppercase tracking-[0.5em] text-gray-400 font-light mb-12">
                  YOUR BAG IS EMPTY
                </p>
                <Link
                  to="/"
                  className="text-[11px] uppercase tracking-widest font-light border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
                >
                  Browse Collection
                </Link>
              </div>
            ) : (
              <div className="border-t-[0.5px] border-gray-200">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.colorName}-${item.capacity}-${index}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center py-10 border-b-[0.5px] border-gray-200 group"
                  >
                    {/* Image Container */}
                    <div className="w-full sm:w-32 aspect-square shrink-0 bg-white mb-6 sm:mb-0 sm:mr-10">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="grow flex flex-col sm:flex-row justify-between w-full items-start sm:items-center">
                      <div className="space-y-1 mb-6 sm:mb-0">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-light">
                          {item.brand}
                        </p>
                        <h2 className="text-[13px] font-light uppercase tracking-[0.2em] text-black">
                          {item.name}
                        </h2>
                        <div className="flex flex-col space-y-0.5 pt-1">
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-light">
                            {item.colorName} / {item.capacity}
                          </span>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto mt-4 sm:mt-0">
                        <span className="text-[13px] font-light tracking-widest text-black tabular-nums">
                          {item.price.toLocaleString('es-ES', {
                            minimumFractionDigits: 2,
                          })}{' '}
                          EUR
                        </span>
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.id,
                              item.colorName,
                              item.capacity,
                            )
                          }
                          className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-black mt-0 sm:mt-4 transition-colors flex items-center"
                        >
                          <X className="w-3 h-3 mr-1 stroke-[1.5px]" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="space-y-10">
              <div className="border-t-[0.5px] border-gray-200 pt-10">
                <h3 className="text-[11px] uppercase tracking-widest font-light text-black mb-10">
                  Summary
                </h3>

                <div className="space-y-6">
                  <div className="flex justify-between text-[11px] uppercase tracking-widest font-light">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-black tabular-nums">
                      {formattedTotal} EUR
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase tracking-widest font-light">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-black uppercase">Complementary</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 mt-10 pt-8 flex justify-between items-end">
                  <span className="text-[11px] uppercase tracking-widest font-light">
                    Total
                  </span>
                  <span className="text-xl font-light tabular-nums tracking-widest">
                    {formattedTotal} EUR
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-black text-white py-5 uppercase text-[11px] tracking-widest font-light hover:bg-neutral-800 transition-colors flex items-center justify-center group overflow-hidden">
                  <span className="relative group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Purchase
                    <ArrowRight className="w-4 h-4 ml-3 stroke-[1.5px]" />
                  </span>
                </button>

                <Link
                  to="/"
                  className="w-full border border-gray-200 text-black py-4 uppercase text-[10px] tracking-widest font-light hover:border-black transition-colors flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="pt-8 border-t border-gray-50">
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-light leading-relaxed">
                  Support available from Mon–Fri 9am–6pm. <br />
                  Secure checkout powered by Stripe.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
