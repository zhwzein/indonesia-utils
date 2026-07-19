import { describe, test, expect } from 'vitest';
import { normalizePhone, validatePhone, formatPhone, maskPhone } from '../src/phone/index.js';

describe('Phone Utilities', () => {
  describe('normalizePhone', () => {
    test('should normalize 08 prefix to +628', () => {
      expect(normalizePhone('081234567890')).toBe('+6281234567890');
      expect(normalizePhone('0812-3456-7890')).toBe('+6281234567890');
    });

    test('should normalize 628 prefix to +628', () => {
      expect(normalizePhone('6281234567890')).toBe('+6281234567890');
    });

    test('should normalize 8 prefix to +628', () => {
      expect(normalizePhone('81234567890')).toBe('+6281234567890');
    });

    test('should keep +628 as is', () => {
      expect(normalizePhone('+6281234567890')).toBe('+6281234567890');
    });

    test('should remove non-numeric chars', () => {
      expect(normalizePhone('+62 (812) 3456 7890')).toBe('+6281234567890');
    });
  });

  describe('validatePhone', () => {
    test('should return true for valid mobile numbers', () => {
      expect(validatePhone('081234567890')).toBe(true);
      expect(validatePhone('+6281234567890')).toBe(true);
      expect(validatePhone('628123456789')).toBe(true);
      expect(validatePhone('0812345678901')).toBe(true); // 13 digits (11 after 08)
    });

    test('should return false for invalid numbers', () => {
      expect(validatePhone('123456')).toBe(false);
      expect(validatePhone('081')).toBe(false);
      expect(validatePhone('081234567890123')).toBe(false); // too long
      expect(validatePhone('0211234567')).toBe(false); // landline starting with 02
    });
  });

  describe('formatPhone', () => {
    test('should format to local', () => {
      expect(formatPhone('+6281234567890', 'local')).toBe('081234567890');
    });

    test('should format to international', () => {
      expect(formatPhone('081234567890', 'international')).toBe('+6281234567890');
    });

    test('should format to spaced', () => {
      expect(formatPhone('081234567890', 'spaced')).toBe('+62 812-3456-7890');
      expect(formatPhone('0812345678', 'spaced')).toBe('+62 812-3456-78');
    });

    test('should return original if invalid', () => {
      expect(formatPhone('12345')).toBe('12345');
    });
  });

  describe('maskPhone', () => {
    test('should mask phone numbers with default options', () => {
      expect(maskPhone('081234567890')).toBe('0812****7890');
    });

    test('should mask phone numbers with custom options', () => {
      expect(maskPhone('081234567890', { maskChar: 'x', visibleStart: 3, visibleEnd: 2 })).toBe(
        '081xxxxxxx90',
      );
    });

    test('should return original if phone length is too short', () => {
      expect(maskPhone('123', { visibleStart: 2, visibleEnd: 2 })).toBe('123');
    });
  });
});
