import React, { useState, useEffect } from 'react';
import { phoneService } from '../services/phoneService';

export const PhoneCard = ({ product }) => {
  return (
    <div className="flex flex-col justify-between h-full border-b border-r border-gray-200 relative group cursor-pointer hover:bg-gray-50 transition-colors p-4 md:p-6">
      {/* Product Image */}
      <div className="w-full flex-grow flex items-center justify-center p-4">
        <div className="w-[80%] max-w-[200px]">
          <div className="aspect-square flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={`${product.brand} ${product.name}`}
              className="object-contain w-full h-full mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Product Info / Footer */}
      <div className="w-full mt-6 py-2 flex justify-between items-start">
        <div className="flex flex-col text-left">
          <span className="uppercase text-[10px] font-sans font-semibold text-gray-900 tracking-wider leading-tight">
            {product.brand}
          </span>
          <span className="uppercase text-[10px] font-sans text-gray-500 tracking-widest leading-tight mt-0.5">
            {product.name}
          </span>
        </div>
        <span className="uppercase text-[10px] font-sans font-medium text-gray-900 tracking-wider leading-tight">
          {product.basePrice}€
        </span>
      </div>
    </div>
  );
};

export default function ListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchPhones = async () => {
      try {
        setLoading(true);
        // Llama al servicio que usa Axios
        const data = await phoneService.getProducts();
        if (mounted) {
          setProducts(data || []);
        }
      } catch (err) {
        if (mounted) {
          setError('Error al cargar los teléfonos');
          console.error(err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPhones();

    // Limpieza al desmontar el componente
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div className="text-sm uppercase tracking-widest text-gray-400 animate-pulse font-sans">CARGANDO...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center flex-col">
        <div className="text-sm uppercase tracking-widest text-red-500 mb-6 font-sans">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 border border-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
        >
          REINTENTAR
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Header Container */}
      <div className="px-4 md:px-8 pt-8 pb-4">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tighter">MBST</h1>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="SEARCH"
            className="w-full border-t-0 border-x-0 border-b border-gray-200 bg-transparent rounded-none px-0 py-2 shadow-none focus:outline-none focus:ring-0 focus:border-black text-sm uppercase placeholder:text-gray-400 placeholder:tracking-widest transition-colors"
          />
        </div>

        {/* Counter area */}
        <div className="flex flex-col pb-2">
          <span className="text-[10px] uppercase tracking-widest text-gray-900">
            {products.length} RESULTS
          </span>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-200" />

      {/* Main Container - Grid */}
      <div className="px-4 md:px-8 mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border-t border-l border-gray-200 mt-0">
          {products.map((product) => (
            <PhoneCard key={product.id} product={product} />
          ))}

          {/* Fill empty cells if needed for borders in last row */}
          {products.length % 5 !== 0 && (
            <div className="hidden md:block col-span-1 border-b border-r border-gray-200 h-full"></div>
          )}
        </div>
      </div>
      
      {/* Optional padding at the bottom */}
      <div className="h-24"></div>
    </div>
  );
}
