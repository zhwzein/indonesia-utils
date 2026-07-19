import { describe, test, expect } from 'vitest';
import {
  removeAccents,
  slugify,
  capitalize,
  titleCase,
  camelCase,
  snakeCase,
  kebabCase,
  truncate,
} from '../src/string/index.js';

describe('String Utilities', () => {
  describe('removeAccents', () => {
    test('should remove accents correctly', () => {
      expect(removeAccents('Café')).toBe('Cafe');
      expect(removeAccents('Mêncoba')).toBe('Mencoba');
      expect(removeAccents('crème brûlée')).toBe('creme brulee');
    });
  });

  describe('slugify', () => {
    test('should slugify standard strings', () => {
      expect(slugify('Halo Dunia!')).toBe('halo-dunia');
      expect(slugify('  Selamat   Pagi-- ')).toBe('selamat-pagi');
      expect(slugify('Café Luwak Enak')).toBe('cafe-luwak-enak');
    });
  });

  describe('capitalize', () => {
    test('should capitalize first letter', () => {
      expect(capitalize('indonesia')).toBe('Indonesia');
      expect(capitalize('iNDONESIA')).toBe('INDONESIA');
      expect(capitalize('')).toBe('');
    });
  });

  describe('titleCase', () => {
    test('should convert string to title case', () => {
      expect(titleCase('republik indonesia')).toBe('Republik Indonesia');
      expect(titleCase('HALO DUNIA')).toBe('Halo Dunia');
    });
  });

  describe('camelCase', () => {
    test('should convert strings to camelCase', () => {
      expect(camelCase('halo dunia')).toBe('haloDunia');
      expect(camelCase('kebab-case-string')).toBe('kebabCaseString');
      expect(camelCase('snake_case_string')).toBe('snakeCaseString');
      expect(camelCase('AlreadyCamelCase')).toBe('alreadyCamelCase');
    });
  });

  describe('snakeCase', () => {
    test('should convert strings to snake_case', () => {
      expect(snakeCase('halo dunia')).toBe('halo_dunia');
      expect(snakeCase('kebab-case-string')).toBe('kebab_case_string');
      expect(snakeCase('camelCaseString')).toBe('camel_case_string');
    });
  });

  describe('kebabCase', () => {
    test('should convert strings to kebab-case', () => {
      expect(kebabCase('halo dunia')).toBe('halo-dunia');
      expect(kebabCase('snake_case_string')).toBe('snake-case-string');
      expect(kebabCase('camelCaseString')).toBe('camel-case-string');
    });
  });

  describe('truncate', () => {
    test('should truncate string and add omission', () => {
      expect(truncate('Indonesia Raya', 9)).toBe('Indone...');
      expect(truncate('Indonesia Raya', 20)).toBe('Indonesia Raya');
      expect(truncate('Indonesia Raya', 9, '---')).toBe('Indone---');
    });
  });
});
