/**
 * Generates a random string of a specified length based on the options provided.
 *
 * @param length - Length of the generated string
 * @param options - Options to customize the character set
 * @param options.numeric - Include numeric digits (0-9).
 * @param options.alphabetic - Include letters (a-z, A-Z).
 * @param options.uppercase - Include uppercase letters.
 * @param options.lowercase - Include lowercase letters.
 * @returns Random string
 *
 * @example
 * ```ts
 * randomString(8) // "aB3dE5gH" (alphanumeric default)
 * randomString(6, { numeric: true }) // "170845"
 * randomString(5, { alphabetic: true, uppercase: true }) // "JKRTA"
 * ```
 */
export function randomString(
  length: number,
  options: {
    numeric?: boolean;
    alphabetic?: boolean;
    uppercase?: boolean;
    lowercase?: boolean;
  } = {},
): string {
  let chars = '';
  const numChars = '0123456789';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';

  const { numeric, alphabetic, uppercase, lowercase } = options;

  const hasOptions =
    numeric !== undefined ||
    alphabetic !== undefined ||
    uppercase !== undefined ||
    lowercase !== undefined;

  if (!hasOptions) {
    chars = numChars + upperChars + lowerChars;
  } else {
    if (numeric) chars += numChars;
    if (alphabetic) {
      if (uppercase !== false) chars += upperChars;
      if (lowercase !== false) chars += lowerChars;
    } else {
      if (uppercase) chars += upperChars;
      if (lowercase) chars += lowerChars;
    }
  }

  if (chars.length === 0) {
    chars = numChars + upperChars + lowerChars;
  }

  let result = '';
  // Use crypto when available for security, fallback to Math.random
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      result += chars.charAt(randomValues[i] % chars.length);
    }
  } else {
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  return result;
}

/**
 * Generates a random integer between min and max (inclusive).
 *
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer
 *
 * @example
 * ```ts
 * randomNumber(1, 10) // 7
 * ```
 */
export function randomNumber(min: number, max: number): number {
  if (min > max) {
    throw new Error('min cannot be greater than max');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a standard UUID v4.
 *
 * @returns UUID v4 string
 *
 * @example
 * ```ts
 * generateUUID() // "123e4567-e89b-12d3-a456-426614174000"
 * ```
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generates a random OTP (One-Time Password) code.
 *
 * @param length - Length of the OTP code. Default is 6.
 * @param options - Customization options
 * @param options.numericOnly - If true, generates numeric digits only. If false, generates alphanumeric. Default is true.
 * @returns OTP code string
 *
 * @example
 * ```ts
 * generateOTP() // "619283"
 * generateOTP(4, { numericOnly: false }) // "A8G3"
 * ```
 */
export function generateOTP(length: number = 6, options: { numericOnly?: boolean } = {}): string {
  const { numericOnly = true } = options;
  return randomString(length, { numeric: true, alphabetic: !numericOnly });
}
