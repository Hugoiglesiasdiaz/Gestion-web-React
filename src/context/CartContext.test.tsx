import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CartProvider, useCart } from './CartContext';

// Componente de prueba detallado
const TestComponent = () => {
  const { cartItems, addToCart } = useCart();
  return (
    <div>
      <div data-testid="count">{cartItems.length}</div>
      <div data-testid="total-qty">
        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      </div>
      <button
        onClick={() =>
          addToCart({
            id: '1',
            name: 'Phone',
            brand: 'Brand',
            imageUrl: 'img',
            colorName: 'Black',
            capacity: '128GB',
            price: 500,
          })
        }
      >
        Add Item
      </button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('adds an item correctly and does not duplicate if same specs', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    const addButton = screen.getByText('Add Item');

    // Primera vez
    act(() => {
      fireEvent.click(addButton);
    });

    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('total-qty').textContent).toBe('1');

    // Segunda vez (mismo producto, misma capacidad, mismo color)
    act(() => {
      fireEvent.click(addButton);
    });

    // No debería haber 2 items en el array, sino 1 item con cantidad 2
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('total-qty').textContent).toBe('2');
  });
});
