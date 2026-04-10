/**
 * Formats a number as a price string in EUR with es-ES locale.
 * @param price - The numeric value to format
 * @returns Formatted string (e.g., "1.234,56")
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
