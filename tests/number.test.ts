import { describe, test, expect } from 'vitest';
import { clamp, between, padNumber, formatNumber } from '../src/number/index.js';

describe('Number Utilities', () => {
  describe('clamp', () => {
    test('should clamp values correctly', () => {
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(5, 0, 10)).toBe(5);
    });

    test('should throw error if min > max', () => {
      expect(() => clamp(5, 10, 0)).toThrow();
    });
  });

  describe('between', () => {
    test('should check bounds inclusively by default', () => {
      expect(between(5, 1, 10)).toBe(true);
      expect(between(1, 1, 10)).toBe(true);
      expect(between(10, 1, 10)).toBe(true);
      expect(between(11, 1, 10)).toBe(false);
    });

    test('should check bounds exclusively if specified', () => {
      expect(between(5, 1, 10, false)).toBe(true);
      expect(between(1, 1, 10, false)).toBe(false);
      expect(between(10, 1, 10, false)).toBe(false);
    });

    test('should throw error if min > max', () => {
      expect(() => between(5, 10, 0)).toThrow();
    });
  });

  describe('padNumber', () => {
    test('should pad positive numbers with zeros', () => {
      expect(padNumber(7, 3)).toBe('007');
      expect(padNumber(12, 5)).toBe('00012');
      expect(padNumber(123, 2)).toBe('123');
    });

    test('should pad negative numbers and keep minus sign', () => {
      expect(padNumber(-7, 3)).toBe('-007');
      expect(padNumber(-123, 2)).toBe('-123');
    });
  });

  describe('formatNumber', () => {
    test('should format with Indonesian standards (id-ID)', () => {
      expect(formatNumber(1250000)).toBe('1.250.000');
    });

    test('should accept standard format options', () => {
      const formatted = formatNumber(1250000.5, { minimumFractionDigits: 2 });
      expect(formatted).toBe('1.250.000,50');
    });
  });
});
