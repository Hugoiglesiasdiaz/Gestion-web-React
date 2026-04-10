import type { FC, MouseEvent } from 'react';

interface ProductPurchaseActionsProps {
  onAddToCart: (e: MouseEvent) => void;
  isAdded: boolean;
  productName: string;
  selectedColor?: string;
  selectedStorage?: string;
}

export const ProductPurchaseActions: FC<ProductPurchaseActionsProps> = ({
  onAddToCart,
  isAdded,
  productName,
  selectedColor,
  selectedStorage,
}) => {
  return (
    <div className="relative">
      <button
        onClick={onAddToCart}
        disabled={isAdded}
        className={`w-full py-6 uppercase text-xs tracking-widest transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-black outline-none ${
          isAdded
            ? 'bg-green-600 text-white cursor-default'
            : 'bg-[#000000] text-white hover:bg-neutral-900'
        }`}
        aria-label={
          isAdded
            ? 'Item added to bag'
            : `Add ${productName} ${selectedColor || ''} ${selectedStorage || ''} to cart`
        }
      >
        {isAdded ? 'Added!' : 'Add to cart'}
      </button>

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite">
        {isAdded ? `${productName} has been added to your bag.` : ''}
      </div>
    </div>
  );
};

export default ProductPurchaseActions;
