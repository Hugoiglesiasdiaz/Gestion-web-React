import type { FC } from 'react';

interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export const QuantityControl: FC<QuantityControlProps> = ({
  quantity,
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="flex items-center border border-gray-100 px-2 py-1 space-x-4">
      <button
        onClick={onDecrease}
        className="text-gray-400 hover:text-black transition-colors p-1"
        aria-label="Decrease quantity"
      >
        <span className="text-lg font-extralight">−</span>
      </button>
      <span className="text-xs font-light w-4 text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="text-gray-400 hover:text-black transition-colors p-1"
        aria-label="Increase quantity"
      >
        <span className="text-lg font-extralight">+</span>
      </button>
    </div>
  );
};

export default QuantityControl;
