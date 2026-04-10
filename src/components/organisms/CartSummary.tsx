import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/format';

interface CartSummaryProps {
  total: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ total }) => {
  const formattedTotal = formatPrice(total);

  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
      <div className="space-y-10">
        <div className="border-t-[0.5px] border-gray-200 pt-10">
          <h3 className="text-xs uppercase tracking-widest font-light text-black mb-10">
            Summary
          </h3>

          <div className="space-y-6">
            <div className="flex justify-between text-xs uppercase tracking-widest font-light">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-black tabular-nums">
                {formattedTotal} EUR
              </span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest font-light">
              <span className="text-gray-600">Shipping</span>
              <span className="text-black uppercase">Complementary</span>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-10 pt-8 flex justify-between items-end">
            <span className="text-xs uppercase tracking-widest font-light">
              Total
            </span>
            <span className="text-xl font-light tabular-nums tracking-widest">
              {formattedTotal} EUR
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-black text-white py-5 uppercase text-xs tracking-widest font-light hover:bg-neutral-800 transition-colors flex items-center justify-center group overflow-hidden">
            <span className="relative group-hover:translate-x-1 transition-transform inline-flex items-center">
              Purchase
              <ArrowRight className="w-4 h-4 ml-3 stroke-[1.5px]" />
            </span>
          </button>

          <Link
            to="/"
            className="w-full border border-gray-200 text-black py-4 uppercase text-xs tracking-widest font-light hover:border-black transition-colors flex items-center justify-center"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="pt-8 border-t border-gray-50">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-light leading-relaxed">
            Support available from Mon–Fri 9am–6pm. <br />
            Secure checkout powered by Stripe.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default CartSummary;
