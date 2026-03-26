import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceTimerRef = useRef(null);
  const searchErrorTimerRef = useRef(null);

  // Carga inicial de todos los productos
  useEffect(() => {
    let mounted = true;

    const fetchPhones = async () => {
      try {
        setLoading(true);
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

    return () => {
      mounted = false;
    };
  }, []);

  // Búsqueda en tiempo real con debounce (filtrado por API)
  const performSearch = useCallback(async (query) => {
    try {
      setSearching(true);
      setSearchError(null); // Limpiar error previo al intentar de nuevo
      let data;
      if (query.trim() === '') {
        data = await phoneService.getProducts();
      } else {
        data = await phoneService.searchProducts(query.trim());
      }
      setProducts(data || []);
    } catch (err) {
      // Si la búsqueda falla, mantenemos los productos anteriores (persistencia)
      // y mostramos un error discreto al usuario
      setSearchError(err.message || 'Error al buscar. Inténtalo de nuevo.');

      // Auto-limpiar el error después de 5 segundos
      if (searchErrorTimerRef.current) {
        clearTimeout(searchErrorTimerRef.current);
      }
      searchErrorTimerRef.current = setTimeout(() => {
        setSearchError(null);
      }, 5000);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Limpiar el timer anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Nuevo timer con debounce de 300ms
    debounceTimerRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Limpiar los timers al desmontar
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (searchErrorTimerRef.current) {
        clearTimeout(searchErrorTimerRef.current);
      }
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

        {/* Search con filtrado en tiempo real */}
        <div className="mb-4 relative">
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="SEARCH BY NAME OR BRAND..."
            className="w-full border-t-0 border-x-0 border-b border-gray-200 bg-transparent rounded-none px-0 py-2 pr-8 shadow-none focus:outline-none focus:ring-0 focus:border-black text-sm uppercase placeholder:text-gray-400 placeholder:tracking-widest transition-colors"
          />
          {/* Indicador de búsqueda en curso */}
          {searching && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Aviso de error de búsqueda — discreto pero visible */}
        {searchError && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-red-50 border border-red-200 rounded transition-all duration-300">
            <span className="text-[10px] uppercase tracking-widest text-red-600 font-medium">
              ⚠ {searchError}
            </span>
            <button
              onClick={() => setSearchError(null)}
              className="ml-auto text-red-400 hover:text-red-600 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Indicador de resultados */}
        <div className="flex items-center gap-2 pb-2">
          <span className="text-[10px] uppercase tracking-widest text-gray-900">
            {products.length} {products.length === 1 ? 'RESULT' : 'RESULTS'}
          </span>
          {searchQuery.trim() !== '' && (
            <span className="text-[10px] uppercase tracking-widest text-gray-400">
              — FOR "{searchQuery.trim()}"
            </span>
          )}
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-200" />

      {/* Main Container - Grid */}
      <div className="px-4 md:px-8 mx-auto w-full">
        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm uppercase tracking-widest text-gray-400 font-sans">
              NO RESULTS FOUND FOR "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border-t border-l border-gray-200 mt-0">
            {products.map((product, index) => (
              <PhoneCard key={`${product.id}-${index}`} product={product} />
            ))}

            {/* Fill all remaining cells in the last row for consistent borders */}
            {products.length % 5 !== 0 && 
              Array.from({ length: 5 - (products.length % 5) }).map((_, i) => (
                <div key={`fill-${i}`} className="hidden md:block col-span-1 border-b border-r border-gray-200 h-full"></div>
              ))
            }
          </div>
        )}
      </div>
      
      {/* Optional padding at the bottom */}
      <div className="h-24"></div>
    </div>
  );
}