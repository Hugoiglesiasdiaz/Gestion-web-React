import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';

/**
 * Mock Data para previsualización del Carrito
 */
const MOCK_CART_ITEMS = [
  {
    id: 'iphone-15-pro-1',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    color: 'Natural Titanium',
    storage: '256GB',
    price: 1399,
    imgUrl:
      'https://cdn.pixabay.com/photo/2016/11/29/12/30/android-1869510_1280.jpg',
  },
  {
    id: 's24-ultra-1',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    color: 'Titanium Black',
    storage: '512GB',
    price: 1459,
    imgUrl:
      'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_1280.png',
  },
];

export default function CartPage() {
  const total = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white pb-32">
      {/* Espaciado para el Header fijo */}
      <div className="h-20" />

      <main className="max-w-[1440px] mx-auto px-10 lg:px-24 pt-16">
        {/* Header de la página */}
        <header className="mb-16 border-b border-gray-100 pb-8">
          <h1 className="text-2xl font-light uppercase tracking-[0.3em] text-black">
            Cart ({MOCK_CART_ITEMS.length} Items)
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Columna Izquierda: Lista de Productos (8/12) */}
          <div className="lg:col-span-8 space-y-0">
            {MOCK_CART_ITEMS.length === 0 ? (
              <div className="py-20 text-center border-t border-gray-50">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gray-300 font-extralight mb-10">
                  Your cart is currently empty
                </p>
                <Link
                  to="/"
                  className="text-[10px] uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors"
                >
                  Browse Collection
                </Link>
              </div>
            ) : (
              MOCK_CART_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center border-t-[0.5px] border-gray-100 py-10 group"
                >
                  {/* Miniatura */}
                  <div className="w-32 aspect-square relative overflow-hidden bg-white mb-6 md:mb-0 md:mr-10">
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>

                  {/* Info del Producto */}
                  <div className="flex-grow flex flex-col md:flex-row justify-between w-full">
                    <div className="space-y-1 text-center md:text-left mb-6 md:mb-0">
                      <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-light">
                        {item.brand}
                      </p>
                      <h2 className="text-[14px] font-extralight uppercase tracking-widest text-black">
                        {item.name}
                      </h2>
                      <div className="flex flex-col space-y-0.5 pt-2">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-light">
                          Color:{' '}
                          <span className="text-gray-600">{item.color}</span>
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-light">
                          Storage:{' '}
                          <span className="text-gray-600">{item.storage}</span>
                        </span>
                      </div>
                    </div>

                    {/* Precio y Acción */}
                    <div className="flex flex-row md:flex-col justify-between items-center md:items-end md:ml-10">
                      <span className="text-[14px] font-light tabular-nums tracking-widest text-black">
                        {item.price} EUR
                      </span>
                      <button className="text-[10px] uppercase tracking-[0.3em] text-gray-300 hover:text-black mt-0 md:mt-auto transition-colors flex items-center group/btn">
                        <X className="w-3 h-3 mr-2 stroke-[1.5px] group-hover/btn:rotate-90 transition-transform" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Columna Derecha: Resumen de Pedido (4/12) */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-white border-[0.5px] border-gray-100 p-10 space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black border-b border-gray-50 pb-4">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-light">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-black tabular-nums">{total} EUR</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-light">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-black uppercase">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
                  Total
                </span>
                <span className="text-2xl font-light tabular-nums tracking-widest">
                  {total} EUR
                </span>
              </div>

              <div className="pt-4 space-y-4">
                <button className="w-full bg-black text-white py-5 uppercase text-[12px] tracking-[0.5em] font-light hover:bg-gray-900 transition-colors flex items-center justify-center group">
                  Checkout
                  <ArrowRight className="w-4 h-4 ml-3 stroke-[1.5px] group-hover:translate-x-2 transition-transform" />
                </button>

                <Link
                  to="/"
                  className="w-full border border-gray-100 text-black py-4 uppercase text-[10px] tracking-[0.4em] font-light hover:border-black transition-colors flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Banner Opcional de Ayuda */}
            <div className="px-4 text-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-gray-300 font-light">
                Secure payment & Free worldwide returns
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
