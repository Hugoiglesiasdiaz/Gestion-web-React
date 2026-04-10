import { useState, useEffect, type MouseEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { phoneService } from '../services/phoneService';
import { useCart } from '../context/CartContext';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/ProductCard';

import type { Product, ColorOption, StorageOption } from '@/types';
import { formatPrice } from '@/lib/format';
import { SpecRow } from '@/components/atoms/SpecRow';
import { VariantSelector } from '@/components/molecules/VariantSelector';
import { ProductPurchaseActions } from '@/components/organisms/ProductPurchaseActions';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(
    null,
  );

  // Reset scroll on ID change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await phoneService.getProductById(id);
        if ('error' in data) {
          console.error(data.message);
        } else {
          setProduct(data as Product);
          if (data.colorOptions.length > 0)
            setSelectedColor(data.colorOptions[0]);
          if (data.storageOptions.length > 0)
            setSelectedStorage(data.storageOptions[0]);
        }
      } catch (err) {
        console.error('Failed to fetch product', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product && selectedColor && selectedStorage) {
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        imageUrl: selectedColor.imageUrl,
        colorName: selectedColor.name,
        capacity: selectedStorage.capacity,
        price: selectedStorage.price,
      });
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pb-32 pt-20">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 mb-40">
            <div className="lg:col-span-7 aspect-square bg-gray-50 flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="lg:col-span-5 space-y-12">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <div className="space-y-4 pt-10">
                <Skeleton className="h-4 w-1/3" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-24" />
                  <Skeleton className="h-12 w-24" />
                  <Skeleton className="h-12 w-24" />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <Skeleton className="h-4 w-1/3" />
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Similar Items Skeleton */}
          <div className="space-y-16">
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square border-[0.5px] border-gray-100 p-10"
                >
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="p-20 text-center uppercase tracking-widest font-thin">
        Product not found
      </div>
    );

  const specsList = [
    { label: 'BRAND', value: product.brand },
    { label: 'NAME', value: product.name },
    { label: 'DESCRIPTION', value: product.description },
    { label: 'SCREEN', value: product.specs.screen || '-' },
    { label: 'RESOLUTION', value: product.specs.resolution || '-' },
    { label: 'PROCESSOR', value: product.specs.processor || '-' },
    { label: 'MAIN CAMERA', value: product.specs.mainCamera || '-' },
    { label: 'SELFIE CAMERA', value: product.specs.selfieCamera || '-' },
    { label: 'BATTERY', value: product.specs.battery || '-' },
    { label: 'OS', value: product.specs.os || '-' },
    {
      label: 'SCREEN REFRESH RATE',
      value: product.specs.screenRefreshRate || '-',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white pb-32 pt-20">
      {/* Botón Atrás - Top Left */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 pt-10 pb-6">
        <Link
          to="/"
          className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center group font-thin"
          aria-label="Back to catalog"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 stroke-[1px] group-hover:-translate-x-1 transition-transform" />
          BACK
        </Link>
      </div>

      <main className="max-w-screen-xl mx-auto px-4 md:px-6">
        {/* Bloque de Compra (Imagen + Info) */}
        <div className="flex flex-col md:flex-row gap-16 lg:gap-32 items-start mb-40">
          {/* Imagen Central */}
          <div className="w-full md:w-7/12 flex items-center justify-center bg-white aspect-square h-auto lg:h-[700px] overflow-hidden p-6 md:p-20">
            <img
              src={selectedColor?.imageUrl || ''}
              alt={`Smartphone ${product.brand} ${product.name} in color ${selectedColor?.name || ''}`}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Columna Info */}
          <div className="w-full md:w-5/12 space-y-12">
            {/* Título y Precio */}
            <header className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-extralight uppercase tracking-widest text-[#000000]">
                {product.name}
              </h1>
              <p className="text-xl font-extralight text-[#000000] tracking-widest tabular-nums">
                {formatPrice(selectedStorage?.price || 0)} EUR
              </p>
            </header>

            {/* Selector de Storage */}
            <VariantSelector
              title="STORAGE. ¿HOW MUCH SPACE DO YOU NEED?"
              type="grid"
              options={product.storageOptions.map((opt) => ({
                id: opt.capacity,
                label: opt.capacity,
              }))}
              selectedId={selectedStorage?.capacity || ''}
              onSelect={(id) => {
                const opt = product.storageOptions.find(
                  (o) => o.capacity === id,
                );
                if (opt) setSelectedStorage(opt);
              }}
            />

            {/* Selector de Color */}
            <VariantSelector
              title="PICK YOUR FAVOURITE COLOR."
              type="rounded"
              options={product.colorOptions.map((color) => ({
                id: color.name,
                color: color.hexCode,
              }))}
              selectedId={selectedColor?.name || ''}
              onSelect={(id) => {
                const color = product.colorOptions.find((c) => c.name === id);
                if (color) setSelectedColor(color);
              }}
            />

            {/* Botón Añadir */}
            <ProductPurchaseActions
              onAddToCart={handleAddToCart}
              isAdded={addedFeedback}
              productName={product.name}
              selectedColor={selectedColor?.name}
              selectedStorage={selectedStorage?.capacity}
            />

            {/* Descripción suave abajo */}
            <p className="text-xs font-extralight leading-relaxed text-gray-600 uppercase tracking-widest pt-4">
              {product.description}
            </p>
          </div>
        </div>

        {/* Sección de Especificaciones */}
        <section className="mb-40 pt-20">
          <h2 className="text-xl font-extralight uppercase tracking-widest text-[#000000] mb-20">
            SPECIFICATIONS
          </h2>
          <div className="w-full space-y-0">
            {specsList.map((spec) => (
              <SpecRow key={spec.label} label={spec.label} value={spec.value} />
            ))}
            <div className="border-t-[0.5px] border-gray-300"></div>
          </div>
        </section>

        {/* Productos Similares */}
        <section className="mb-20">
          <h2 className="text-xs font-light uppercase tracking-widest text-[#000000] mb-16">
            SIMILAR ITEMS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 border-t border-gray-100">
            {product.similarProducts.slice(0, 6).map((item, idx) => (
              <Link
                to={`/${item.id}`} // Route to root /:id to match ListPage convention
                key={`${item.id}-${idx}`}
                className="block"
              >
                <ProductCard phone={{ ...item, imgUrl: item.imageUrl }} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
