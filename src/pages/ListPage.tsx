import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { phoneService } from '@/services/phoneService';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, RefreshCcw } from 'lucide-react';

import ProductCard from '@/components/ProductCard';

export interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imgUrl: string;
}

/**
 * Grid de Skeletons refinado
 */
const LoadingGrid: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="bg-white border-[0.5px] border-gray-100 aspect-square flex items-center justify-center p-10"
      >
        <Skeleton className="w-full h-full bg-gray-50 rounded-none" />
      </div>
    ))}
  </div>
);

export default function ListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const debounceTimerRef = useRef<number | null>(null);
  const searchErrorTimerRef = useRef<number | null>(null);

  // Initial Fetch (Limited to 20 by Service)
  const fetchPhones = useCallback(async (mounted: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const data = await phoneService.getProducts();
      if (mounted) setProducts(data || []);
    } catch (err: unknown) {
      if (mounted) {
        setError(
          err instanceof Error
            ? err.message
            : 'The product catalog is currently unreachable.',
        );
      }
    } finally {
      if (mounted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchPhones(mounted);
    return () => {
      mounted = false;
    };
  }, [fetchPhones]);

  // Real-time Search
  const performSearch = useCallback(async (query: string) => {
    try {
      setSearching(true);
      setSearchError(null);
      let data;
      if (query.trim() === '') {
        data = await phoneService.getProducts();
      } else {
        data = await phoneService.searchProducts(query.trim());
      }
      setProducts(data || []);
    } catch (err: unknown) {
      setSearchError(
        err instanceof Error ? err.message : 'Search service is unstable.',
      );
      if (searchErrorTimerRef.current)
        window.clearTimeout(searchErrorTimerRef.current);
      searchErrorTimerRef.current = window.setTimeout(
        () => setSearchError(null),
        5000,
      );
    } finally {
      setSearching(false);
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(
      () => performSearch(value),
      400,
    );
  };

  // Error State Template
  if (error) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center px-4 font-sans">
        <Alert
          variant="destructive"
          className="max-w-md rounded-none border-2 border-red-500 bg-white"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="uppercase tracking-widest text-xs font-light">
            System Failure
          </AlertTitle>
          <AlertDescription className="text-gray-600 text-xs mt-2 mb-4">
            {error} Please check your connection to the mobile inventory API.
          </AlertDescription>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="rounded-none border-red-500 text-red-500 hover:bg-red-50 tracking-widest text-xs h-10 w-full font-light"
          >
            <RefreshCcw className="w-3 h-3 mr-2" /> RE-SYNC COLLECTION
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full selection:bg-black selection:text-white pb-40 font-sans">
      {/* 1440px Max-Width Wrapper Container */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        {/* Luxury Navigation Header - Identity Exacta Foto 2 */}
        <nav className="pt-24 pb-16 flex flex-col bg-transparent">
          <h1 className="sr-only">MBST - Mobile Store Catalog</h1>
          {/* High Clarity Search Bar - Exact Identity Foto 2 */}
          <div className="w-full relative group my-6">
            <div className="relative w-full">
              <label htmlFor="search-input" className="sr-only">Search products</label>
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for a smartphone..."
                aria-label="Search for a smartphone"
                className="w-full bg-transparent border-t-0 border-x-0 border-b border-gray-200 py-6 text-2xl md:text-4xl font-thin placeholder:text-gray-300 focus:ring-0 focus:border-black outline-none rounded-none px-0"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                {searching && (
                  <Loader2 className="w-6 h-6 animate-spin text-gray-200" />
                )}
              </div>
            </div>

            {/* Contador de resultados */}
            <div className="flex mt-4" aria-live="polite">
              <span className="text-xs text-black font-light uppercase tracking-widest">
                {products.length} RESULTS
              </span>
              {searchError && (
                <span className="text-red-500 text-xs animate-pulse ml-4" role="alert">
                  {searchError}
                </span>
              )}
            </div>
          </div>
        </nav>

        {/* Global Catalog Area */}
        <main className="w-full">
          {loading ? (
            <LoadingGrid />
          ) : products.length === 0 ? (
            <div className="py-60 text-center flex flex-col items-center justify-center space-y-4">
              <p className="text-xs uppercase tracking-[0.5em] text-gray-500 font-extralight">
                NO MATCHING MODELS AVAILABLE
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 bg-white border-t border-gray-100">
              {products.map((product, index) => (
                <Link
                  key={`${product.id}-${index}`}
                  to={`/${product.id}`}
                  className="block"
                >
                  <ProductCard phone={product} />
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
