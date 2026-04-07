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
    <div className="bg-white border-[0.5px] border-gray-100 flex flex-col relative group cursor-pointer transition-colors duration-300 h-full">
      {/* Contenedor de Imagen (Cuadrado Perfecto) */}
      <div className="aspect-square w-full relative overflow-hidden bg-white">
        <img
          src={displayImage || ''}
          alt={`${phone.brand} ${phone.name}`}
          className="absolute inset-0 w-full h-full object-contain p-10"
          loading="lazy"
        />
      </div>

      {/* Textos en la parte inferior */}
      <div className="flex justify-between items-end w-full px-2 pb-4 mt-auto">
        <div className="flex flex-col">
          <span className="text-gray-400 text-[10px] uppercase tracking-widest font-extralight">
            {phone.brand}
          </span>
          <span className="text-black text-[12px] uppercase tracking-widest font-extralight">
            {phone.name}
          </span>
        </div>
        <span className="text-black text-[12px] whitespace-nowrap font-extralight tabular-nums tracking-widest">
          {phone.basePrice.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
          })}{' '}
          EUR
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
