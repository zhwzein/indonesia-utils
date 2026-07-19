import { describe, test, expect } from 'vitest';
import { formatRupiah, parseRupiah, formatCurrency } from '../src/currency/index.js';

describe('Currency Utilities', () => {
  describe('formatRupiah', () => {
    test('should format with default options', () => {
      expect(formatRupiah(1500000)).toBe('Rp1.500.000');
      expect(formatRupiah(0)).toBe('Rp0');
      expect(formatRupiah(-5000)).toBe('Rp-5.000');
    });

    test('should format in formal style (with space)', () => {
      expect(formatRupiah(1500000, { formal: true })).toBe('Rp 1.500.000');
    });

    test('should format with custom symbol', () => {
      expect(formatRupiah(1000, { symbol: 'IDR' })).toBe('IDR1.000');
    });

    test('should format with decimal digits', () => {
      expect(formatRupiah(1500000.5, { decimalDigits: 2 })).toBe('Rp1.500.000,50');
      expect(formatRupiah(1500000, { decimalDigits: 2 })).toBe('Rp1.500.000,00');
    });
  });

  describe('parseRupiah', () => {
    test('should parse standard Rupiah strings', () => {
      expect(parseRupiah('Rp1.500.000')).toBe(1500000);
      expect(parseRupiah('Rp 1.500.000')).toBe(1500000);
      expect(parseRupiah('1.500.000')).toBe(1500000);
    });

    test('should parse Rupiah strings with decimals', () => {
      expect(parseRupiah('Rp 1.500.000,50')).toBe(1500000.5);
      expect(parseRupiah('Rp1.500.000,05')).toBe(1500000.05);
    });

    test('should parse negative Rupiah strings', () => {
      expect(parseRupiah('Rp-1.500.000')).toBe(-1500000);
      expect(parseRupiah('-Rp 1.500.000,50')).toBe(-1500000.5);
    });

    test('should return 0 for invalid inputs', () => {
      expect(parseRupiah('')).toBe(0);
      expect(parseRupiah('abc')).toBe(0);
    });
  });

  describe('formatCurrency', () => {
    test('should format with default (IDR / id-ID)', () => {
      // Intl format can contain non-breaking spaces depending on environment, so we check for digits
      const formatted = formatCurrency(1500000);
      expect(formatted).toContain('1.500.000');
      expect(formatted).toContain('Rp');
    });

    test('should format with USD and en-US', () => {
      const formatted = formatCurrency(1500, 'USD', 'en-US');
      expect(formatted).toBe('$1,500.00');
    });
  });
});
