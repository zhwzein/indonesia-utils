import { describe, test, expect } from 'vitest';
import {
  isEmpty,
  isNumeric,
  isAlphabet,
  isURL,
  isJSON,
  isUUID,
  validateEmail,
} from '../src/validation/index.js';

describe('Validation Utilities', () => {
  describe('isEmpty', () => {
    test('should return true for empty values', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    test('should return false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });

  describe('isNumeric', () => {
    test('should return true for numeric inputs', () => {
      expect(isNumeric(123)).toBe(true);
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('12.34')).toBe(true);
      expect(isNumeric(0)).toBe(true);
    });

    test('should return false for non-numeric inputs', () => {
      expect(isNumeric('123a')).toBe(false);
      expect(isNumeric('')).toBe(false);
      expect(isNumeric(null)).toBe(false);
      expect(isNumeric(undefined)).toBe(false);
      expect(isNumeric(NaN)).toBe(false);
    });
  });

  describe('isAlphabet', () => {
    test('should return true for alphabetic strings', () => {
      expect(isAlphabet('Indonesia')).toBe(true);
      expect(isAlphabet('abc')).toBe(true);
    });

    test('should return false for non-alphabetic inputs', () => {
      expect(isAlphabet('Indonesia2026')).toBe(false);
      expect(isAlphabet('abc def')).toBe(false); // contains space
      expect(isAlphabet('')).toBe(false);
    });
  });

  describe('isURL', () => {
    test('should return true for valid URLs', () => {
      expect(isURL('https://github.com')).toBe(true);
      expect(isURL('http://localhost:3000/path')).toBe(true);
    });

    test('should return false for invalid URLs', () => {
      expect(isURL('invalid-url')).toBe(false);
      expect(isURL('www.google.com')).toBe(false); // missing protocol
    });
  });

  describe('isJSON', () => {
    test('should return true for valid JSON strings', () => {
      expect(isJSON('{"a": 1}')).toBe(true);
      // Let's check: our isJSON code: `typeof parsed === 'object' && parsed !== null`. In JS, array typeof is 'object'. So '[]' should be true.
      expect(isJSON('[]')).toBe(true);
      expect(isJSON('"string"')).toBe(false);
    });

    test('should return false for invalid JSON strings', () => {
      expect(isJSON('{invalid}')).toBe(false);
      expect(isJSON('123')).toBe(false);
    });
  });

  describe('isUUID', () => {
    test('should return true for valid UUIDs', () => {
      expect(isUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
    });

    test('should return false for invalid UUIDs', () => {
      expect(isUUID('invalid-uuid')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    test('should return true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    test('should return false for invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
    });
  });
});
