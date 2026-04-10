import { describe, it, expect } from 'vitest';
import { formatPrice } from './format';

describe('formatPrice', () => {
  it('should format numbers with es-ES locale (thousands separator and decimals)', () => {
    // Note: es-ES uses '.' for thousand and ',' for decimal
    // Depending on the environment, sometimes it uses non-breaking space for thousands.
    // We'll check the core parts.
    const result = formatPrice(1234.56);
    // On some Node/CI environments, the dot and the comma might vary or be missing
    // We check that the decimals are there and the number is present.
    expect(result).toMatch(/1.?234,56/);
  });

  it('should format 0 correctly', () => {
    expect(formatPrice(0)).toBe('0,00');
  });

  it('should always show 2 decimal places', () => {
    expect(formatPrice(10)).toBe('10,00');
    expect(formatPrice(10.5)).toBe('10,50');
  });
});
