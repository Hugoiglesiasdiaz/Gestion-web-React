import type { FC } from 'react';

import type { ListProduct } from '@/types';
import { formatPrice } from '@/lib/format';

// Support both API structures (imageUrl from Detail/Similar vs imgUrl from List)
interface ProductCardProps {
  phone:
    | ListProduct
    | {
        id: string;
        brand: string;
        name: string;
        basePrice: number;
        imageUrl: string;
      };
  onClick?: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ phone, onClick }) => {
  const displayImage = 'imgUrl' in phone ? phone.imgUrl : phone.imageUrl;

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      className="group relative overflow-hidden bg-white border-[0.5px] border-gray-100 flex flex-col cursor-pointer h-full px-5 pt-5 pb-6 transition-colors duration-500"
    >
      {/* Div de fondo que sube */}
      <div className="absolute inset-0 bg-black transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0 z-0" />

      {/* Contenido (Forzado por encima con z-10) */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        {/* Contenedor de Imagen */}
        <div className="aspect-square w-full relative overflow-hidden mb-6">
          <img
            src={displayImage || ''}
            alt={`${phone.brand} ${phone.name}`}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Textos en la parte inferior */}
        <div className="flex justify-between items-end w-full mt-auto">
          <div className="flex flex-col">
            <span className="text-xs tracking-wider text-gray-500 group-hover:text-gray-400 transition-colors duration-500 uppercase font-light">
              {phone.brand}
            </span>
            <span className="text-sm text-black group-hover:text-white transition-colors duration-500 uppercase font-light tracking-widest">
              {phone.name}
            </span>
          </div>
          <span className="text-sm text-black group-hover:text-white transition-colors duration-500 font-light tabular-nums tracking-widest">
            {formatPrice(phone.basePrice)} EUR
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
