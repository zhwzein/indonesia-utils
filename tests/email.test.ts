import { describe, test, expect } from 'vitest';
import { validateEmail, maskEmail } from '../src/email/index.js';

describe('Email Utilities', () => {
  describe('validateEmail', () => {
    test('should return true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.id')).toBe(true);
    });

    test('should return false for invalid emails', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
    });
  });

  describe('maskEmail', () => {
    test('should mask standard emails', () => {
      expect(maskEmail('john.doe@example.com')).toBe('j******e@example.com');
      expect(maskEmail('abc@domain.com')).toBe('a*c@domain.com');
    });

    test('should mask short username emails', () => {
      expect(maskEmail('ab@domain.com')).toBe('a*@domain.com');
      expect(maskEmail('a@domain.com')).toBe('a@domain.com');
    });

    test('should return original if invalid email', () => {
      expect(maskEmail('invalid-email')).toBe('invalid-email');
    });
  });
});
