import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from './ProductCard';

const mockProduct = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 999,
  imgUrl: 'test.jpg',
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(<ProductCard phone={mockProduct} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    // formatPrice(999) -> "999,00 EUR"
    expect(screen.getByText(/999,00/)).toBeInTheDocument();
  });

  it('triggers onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ProductCard phone={mockProduct} onClick={handleClick} />);

    const card = screen.getByText('iPhone 15').closest('div');
    if (card) fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
