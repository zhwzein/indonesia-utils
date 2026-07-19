import { describe, test, expect } from 'vitest';
import { randomString, randomNumber, generateUUID, generateOTP } from '../src/random/index.js';

describe('Random Utilities', () => {
  describe('randomString', () => {
    test('should generate string with correct length', () => {
      expect(randomString(10).length).toBe(10);
      expect(randomString(0).length).toBe(0);
    });

    test('should support numeric only option', () => {
      const str = randomString(20, { numeric: true });
      expect(/^[0-9]+$/.test(str)).toBe(true);
    });

    test('should support alphabetic only option', () => {
      const str = randomString(20, { alphabetic: true });
      expect(/^[a-zA-Z]+$/.test(str)).toBe(true);
    });

    test('should support uppercase and lowercase options', () => {
      const upper = randomString(20, { alphabetic: true, uppercase: true, lowercase: false });
      expect(/^[A-Z]+$/.test(upper)).toBe(true);

      const lower = randomString(20, { alphabetic: true, uppercase: false, lowercase: true });
      expect(/^[a-z]+$/.test(lower)).toBe(true);
    });
  });

  describe('randomNumber', () => {
    test('should generate number within bounds', () => {
      for (let i = 0; i < 50; i++) {
        const val = randomNumber(5, 10);
        expect(val).toBeGreaterThanOrEqual(5);
        expect(val).toBeLessThanOrEqual(10);
        expect(Number.isInteger(val)).toBe(true);
      }
    });

    test('should throw error if min > max', () => {
      expect(() => randomNumber(10, 5)).toThrow();
    });
  });

  describe('generateUUID', () => {
    test('should generate a valid UUID format', () => {
      const uuid = generateUUID();
      expect(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid),
      ).toBe(true);
    });
  });

  describe('generateOTP', () => {
    test('should generate valid OTP by default (numeric, length 6)', () => {
      const otp = generateOTP();
      expect(otp.length).toBe(6);
      expect(/^[0-9]+$/.test(otp)).toBe(true);
    });

    test('should support custom length and alphanumeric', () => {
      const otp = generateOTP(8, { numericOnly: false });
      expect(otp.length).toBe(8);
    });
  });
});
