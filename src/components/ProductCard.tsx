import React from 'react';

export interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl?: string;
  imgUrl?: string; // Standardize based on API variety
}

const ProductCard: React.FC<{ phone: Product }> = ({ phone }) => {
  const displayImage = phone.imageUrl || phone.imgUrl;

  return (
    <div className="group relative overflow-hidden bg-white border-[0.5px] border-gray-100 flex flex-col cursor-pointer h-full px-5 pt-5 pb-6 transition-colors duration-500">
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
            {phone.basePrice.toLocaleString('es-ES', {
              minimumFractionDigits: 2,
            })}{' '}
            EUR
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
