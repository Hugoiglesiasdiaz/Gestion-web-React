import React from 'react';
import { X } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/format';
import QuantityControl from '../atoms/QuantityControl';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string, color: string, capacity: string) => void;
  onUpdateQuantity: (
    id: string,
    color: string,
    capacity: string,
    delta: number,
  ) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <div className="flex flex-row items-start py-8 md:py-10 border-b-[0.5px] border-gray-200 group">
      {/* Image Container */}
      <div className="w-24 md:w-32 aspect-square shrink-0 bg-white mr-6 md:mr-10">
        <img
          src={item.imageUrl}
          alt={`${item.brand} ${item.name} in ${item.colorName}`}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Product Info */}
      <div className="grow flex flex-col md:flex-row justify-between w-full items-start md:items-center">
        <div className="space-y-1 mb-4 md:mb-0">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-light">
            {item.brand}
          </p>
          <h2 className="text-sm font-light uppercase tracking-[0.2em] text-black">
            {item.name}
          </h2>
          <div className="flex flex-col space-y-0.5 pt-1">
            <span className="text-xs text-gray-600 uppercase tracking-widest font-light">
              {item.colorName} / {item.capacity}
            </span>
          </div>
        </div>

        {/* Price & Remove */}
        <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto mt-4 md:mt-0">
          <div className="flex flex-col items-end space-y-2">
            <span className="text-sm font-light tracking-widest text-black tabular-nums">
              {formatPrice(item.price * item.quantity)} EUR
              {item.quantity > 1 && (
                <span className="text-xs text-gray-400 font-extralight ml-2">
                  (x{item.quantity})
                </span>
              )}
            </span>

            <QuantityControl
              quantity={item.quantity}
              onDecrease={() =>
                onUpdateQuantity(item.id, item.colorName, item.capacity, -1)
              }
              onIncrease={() =>
                onUpdateQuantity(item.id, item.colorName, item.capacity, 1)
              }
            />
          </div>

          <button
            onClick={() => onRemove(item.id, item.colorName, item.capacity)}
            aria-label={`Remove ${item.name} ${item.colorName} from bag`}
            className="text-xs uppercase tracking-widest text-gray-400 hover:text-black mt-4 transition-colors flex items-center"
          >
            <X className="w-3.5 h-3.5 mr-1 stroke-[1.5px]" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
