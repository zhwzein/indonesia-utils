/**
 * Formats a number into Rupiah (IDR) currency format.
 *
 * @param value - The number to format
 * @param options - Formatting options
 * @param options.formal - If true, adds a space between the symbol and the value (e.g., "Rp 1.500.000"). Default is false (e.g., "Rp1.500.000").
 * @param options.symbol - The currency symbol to use. Default is "Rp".
 * @param options.decimalDigits - The number of decimal digits to display. Default is 0.
 * @returns Formatted Rupiah string
 *
 * @example
 * ```ts
 * formatRupiah(1500000) // "Rp1.500.000"
 * formatRupiah(1500000, { formal: true }) // "Rp 1.500.000"
 * formatRupiah(1500000.5, { decimalDigits: 2 }) // "Rp1.500.000,50"
 * ```
 */
export function formatRupiah(
  value: number,
  options: { formal?: boolean; symbol?: string; decimalDigits?: number } = {},
): string {
  const { formal = false, symbol = 'Rp', decimalDigits = 0 } = options;
  const space = formal ? ' ' : '';
  const formattedNumber = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits,
  }).format(value);
  return `${symbol}${space}${formattedNumber}`;
}

/**
 * Parses a Rupiah formatted string back to a number.
 * Supports negative values and decimal parts.
 *
 * @param value - The Rupiah string to parse
 * @returns Parsed number, or 0 if invalid
 *
 * @example
 * ```ts
 * parseRupiah("Rp1.500.000") // 1500000
 * parseRupiah("Rp 1.500.000,50") // 1500000.5
 * ```
 */
export function parseRupiah(value: string): number {
  if (!value) return 0;
  // Remove everything except digits, minus sign, and comma (decimal separator in ID locale)
  let cleaned = value.replace(/[^0-9,-]/g, '');
  // Convert Indonesian comma decimal separator to dot for standard floating point parsing
  cleaned = cleaned.replace(',', '.');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Formats a number into a standard currency format for a specified locale and currency.
 *
 * @param value - The number to format
 * @param currencyCode - The ISO 4217 currency code. Default is "IDR".
 * @param locale - The locale to use. Default is "id-ID".
 * @returns Formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1500000, "USD", "en-US") // "$1,500,000.00"
 * formatCurrency(1500000) // "Rp1.500.000,00"
 * ```
 */
export function formatCurrency(
  value: number,
  currencyCode: string = 'IDR',
  locale: string = 'id-ID',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(value);
}
