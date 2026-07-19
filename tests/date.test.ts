import { describe, test, expect } from 'vitest';
import {
  getNamaBulan,
  getNamaHari,
  formatTanggalIndonesia,
  formatHariIndonesia,
  formatDateTimeIndonesia,
} from '../src/date/index.js';

describe('Date Utilities', () => {
  describe('getNamaBulan', () => {
    test('should return correct month name', () => {
      expect(getNamaBulan(0)).toBe('Januari');
      expect(getNamaBulan(7)).toBe('Agustus');
      expect(getNamaBulan(11)).toBe('Desember');
    });

    test('should return correct short month name', () => {
      expect(getNamaBulan(0, { short: true })).toBe('Jan');
      expect(getNamaBulan(7, { short: true })).toBe('Agu');
    });

    test('should throw error for invalid index', () => {
      expect(() => getNamaBulan(-1)).toThrow();
      expect(() => getNamaBulan(12)).toThrow();
    });
  });

  describe('getNamaHari', () => {
    test('should return correct day name', () => {
      expect(getNamaHari(0)).toBe('Minggu');
      expect(getNamaHari(1)).toBe('Senin');
      expect(getNamaHari(5)).toBe('Jumat');
    });

    test('should return correct short day name', () => {
      expect(getNamaHari(0, { short: true })).toBe('Min');
      expect(getNamaHari(1, { short: true })).toBe('Sen');
    });

    test('should throw error for invalid index', () => {
      expect(() => getNamaHari(-1)).toThrow();
      expect(() => getNamaHari(7)).toThrow();
    });
  });

  describe('formatTanggalIndonesia', () => {
    const testDate = new Date('1945-08-17T10:00:00');

    test('should format date correctly', () => {
      expect(formatTanggalIndonesia(testDate)).toBe('17 Agustus 1945');
    });

    test('should format date with day name', () => {
      expect(formatTanggalIndonesia(testDate, { day: true })).toBe('Jumat, 17 Agustus 1945');
    });

    test('should format date with short month', () => {
      expect(formatTanggalIndonesia(testDate, { monthFormat: 'short' })).toBe('17 Agu 1945');
    });

    test('should format date with time', () => {
      expect(formatTanggalIndonesia(testDate, { time: true })).toBe('17 Agustus 1945 10:00');
    });

    test('should handle string and number input', () => {
      expect(formatTanggalIndonesia('1945-08-17T10:00:00')).toBe('17 Agustus 1945');
      expect(formatTanggalIndonesia(testDate.getTime())).toBe('17 Agustus 1945');
    });

    test('should throw error for invalid date input', () => {
      expect(() => formatTanggalIndonesia('invalid-date')).toThrow();
    });
  });

  describe('formatHariIndonesia', () => {
    test('should return correct day name of a date', () => {
      expect(formatHariIndonesia('1945-08-17')).toBe('Jumat');
      expect(formatHariIndonesia(new Date('2026-07-19'))).toBe('Minggu'); // 2026-07-19 is Sunday
    });
  });

  describe('formatDateTimeIndonesia', () => {
    const testDate = new Date('1945-08-17T10:00:05');

    test('should format date and time with seconds by default', () => {
      expect(formatDateTimeIndonesia(testDate)).toBe('17 Agustus 1945 10:00:05');
    });

    test('should format date and time without seconds if specified', () => {
      expect(formatDateTimeIndonesia(testDate, { second: false })).toBe('17 Agustus 1945 10:00');
    });
  });
});
