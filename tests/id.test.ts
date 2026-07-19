import { describe, test, expect } from 'vitest';
import { validateNIK, formatNIK, validateNPWP, formatNPWP } from '../src/id/index.js';

describe('Indonesian Identity Utilities', () => {
  describe('NIK Validation and Formatting', () => {
    test('should validate correct NIK (male)', () => {
      // 31: DKI Jakarta, 71: Jakarta Pusat, 01: Menteng
      // 170845: 17 Aug 1945 (male)
      expect(validateNIK('3171011708450001')).toBe(true);
    });

    test('should validate correct NIK (female)', () => {
      // 570845: 17 Aug 1945 (female, 17 + 40 = 57)
      expect(validateNIK('3171015708450001')).toBe(true);
    });

    test('should reject invalid NIK structures and values', () => {
      expect(validateNIK('12345')).toBe(false); // too short
      expect(validateNIK('3171011708450000')).toBe(false); // sequence 0000 is invalid
      expect(validateNIK('9971011708450001')).toBe(false); // invalid prov 99
      expect(validateNIK('3171013208450001')).toBe(false); // day 32 is invalid for male
      expect(validateNIK('3171017208450001')).toBe(false); // day 72 (32 + 40) is invalid for female
      expect(validateNIK('3171013002450001')).toBe(false); // Feb 30 1945 does not exist
    });

    test('should format NIK correctly', () => {
      expect(formatNIK('3171011708450001')).toBe('31.71.01.170845.0001');
      expect(formatNIK('12345')).toBe('12345'); // invalid returns original
    });
  });

  describe('NPWP Validation and Formatting', () => {
    // 092542943407000 is a valid mock NPWP
    // Let's verify checksum of "092542943"
    // Digits: 0, 9, 2, 5, 4, 2, 9, 4, 3
    // Weights: 5, 4, 3, 2, 9, 8, 7, 6, 5
    // Sum: 0*5 + 9*4 + 2*3 + 5*2 + 4*9 + 2*8 + 9*7 + 4*6 + 3*5
    // = 0 + 36 + 6 + 10 + 36 + 16 + 63 + 24 + 15 = 206
    // 206 % 11 = 8
    // 11 - 8 = 3. Checksum digit should be 3 (10th digit index 9).
    // Let's construct a valid NPWP: 09.254.294.3-407.000 -> raw "092542943407000" (Wait, 10th digit is 4 here, which doesn't match checksum 3. Let's find a valid checksum one).
    // Wait, let's look at another valid NPWP:
    // "09.254.294.3-407.000"
    // Let's compute: 0, 9, 2, 5, 4, 2, 9, 4, 3
    // Sum = 206. 206 % 11 = 8. Checksum = 11 - 8 = 3.
    // So "092542943307000" (with 3 at index 9) should be valid!
    // Let's check:
    // If the 10th digit is 3:
    // "092542943307000" -> true!

    test('should validate 15-digit NPWP', () => {
      // Valid NPWP using calculated checksum 3
      expect(validateNPWP('092542943307000')).toBe(true);
      expect(validateNPWP('09.254.294.3-307.000')).toBe(true);
    });

    test('should validate 16-digit NPWP (matches NIK)', () => {
      expect(validateNPWP('3171011708450001')).toBe(true);
    });

    test('should reject invalid NPWP', () => {
      expect(validateNPWP('12345')).toBe(false);
      expect(validateNPWP('092542943407000')).toBe(false); // invalid checksum (4 instead of 3)
    });

    test('should format NPWP correctly', () => {
      expect(formatNPWP('092542943307000')).toBe('09.254.294.3-307.000');
      expect(formatNPWP('3171011708450001')).toBe('31.71.01.170845.0001');
      expect(formatNPWP('123')).toBe('123'); // returns original if invalid length
    });
  });
});
