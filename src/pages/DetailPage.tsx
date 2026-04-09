import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { phoneService } from '../services/phoneService';
import { useCart } from '../context/CartContext';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/ProductCard';

interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

interface StorageOption {
  capacity: string;
  price: number;
}

interface Specs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  specs: Specs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: {
    id: string;
    brand: string;
    name: string;
    basePrice: number;
    imageUrl: string;
  }[];
}

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

  const handleAddToCart = (e: React.MouseEvent) => {
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
                {selectedStorage?.price.toLocaleString('es-ES', {
                  minimumFractionDigits: 2,
                })}{' '}
                EUR
              </p>
            </header>

            {/* Selector de Storage */}
            <div className="space-y-6">
              <p className="text-xs font-extralight uppercase tracking-widest text-[#000000]">
                STORAGE. ¿HOW MUCH SPACE DO YOU NEED?
              </p>
              <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Select storage capacity">
                {product.storageOptions.map((opt) => (
                  <button
                    key={opt.capacity}
                    onClick={() => setSelectedStorage(opt)}
                    aria-checked={selectedStorage?.capacity === opt.capacity}
                    role="radio"
                    aria-label={`${opt.capacity} of storage`}
                    className={`border px-4 py-8 text-xs uppercase tracking-widest transition-colors font-extralight ${
                      selectedStorage?.capacity === opt.capacity
                        ? 'border-[#000000] border-[1.5px]'
                        : 'border-gray-100 hover:border-gray-400'
                    }`}
                  >
                    {opt.capacity}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Color */}
            <div className="space-y-6">
              <p className="text-xs font-extralight uppercase tracking-widest text-[#000000]">
                PICK YOUR FAVOURITE COLOR.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4" role="radiogroup" aria-label="Select product color">
                  {product.colorOptions.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      role="radio"
                      aria-checked={color.name === selectedColor?.name}
                      aria-label={`Color ${color.name}`}
                      className={`w-8 h-8 rounded-full border p-1 transition-colors ${
                        color.name === selectedColor?.name
                          ? 'border-[#000000]'
                          : 'border-transparent hover:border-gray-200'
                      }`}
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: color.hexCode }}
                      />
                    </button>
                  ))}
                </div>
                {/* Nombre del color seleccionado - Única negrita permitida */}
                <span className="text-xs text-[#000000] font-light uppercase tracking-widest block">
                  {selectedColor?.name}
                </span>
              </div>
            </div>

            {/* Botón Añadir */}
            <div className="relative">
              <button
                onClick={handleAddToCart}
                disabled={addedFeedback}
                className={`w-full py-6 uppercase text-xs tracking-widest transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-black outline-none ${
                  addedFeedback 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-[#000000] text-white hover:bg-neutral-900'
                }`}
                aria-label={addedFeedback ? "Item added to bag" : `Add ${product.name} ${selectedColor?.name} ${selectedStorage?.capacity} to cart`}
              >
                {addedFeedback ? 'Added!' : 'Add to cart'}
              </button>
              
              {/* Region aria-live para lectores de pantalla */}
              <div className="sr-only" aria-live="polite">
                {addedFeedback ? `${product.name} has been added to your bag.` : ''}
              </div>
            </div>

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
              <div
                key={spec.label}
                className={`flex py-3 md:py-5 border-t-[0.5px] border-gray-300 ${spec.label === 'DESCRIPTION' ? 'items-start' : 'items-center'}`}
              >
                <div className="w-1/3 text-xs font-light uppercase text-black">
                  {spec.label}
                </div>
                <div className="flex-1 text-xs font-light text-gray-800">
                  {spec.value || '-'}
                </div>
              </div>
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
