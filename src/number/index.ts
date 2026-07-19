/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param val - The number to clamp
 * @param min - The lower bound
 * @param max - The upper bound
 * @returns Clamped number
 *
 * @example
 * ```ts
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10) // 5
 * ```
 */
export function clamp(val: number, min: number, max: number): number {
  if (min > max) {
    throw new Error('min cannot be greater than max');
  }
  return Math.min(Math.max(val, min), max);
}

/**
 * Checks if a number is between a minimum and maximum value.
 *
 * @param val - The number to check
 * @param min - The lower bound
 * @param max - The upper bound
 * @param inclusive - If true, bounds are inclusive. Default is true.
 * @returns True if the number is between the bounds
 *
 * @example
 * ```ts
 * between(5, 1, 10) // true
 * between(10, 1, 10, false) // false
 * ```
 */
export function between(val: number, min: number, max: number, inclusive: boolean = true): boolean {
  if (min > max) {
    throw new Error('min cannot be greater than max');
  }
  return inclusive ? val >= min && val <= max : val > min && val < max;
}

/**
 * Pads a number with leading zeros to reach a target string length.
 *
 * @param val - The number to pad
 * @param size - The target string length
 * @returns Zero-padded string representation of the number
 *
 * @example
 * ```ts
 * padNumber(7, 3) // "007"
 * padNumber(1234, 2) // "1234"
 * ```
 */
export function padNumber(val: number, size: number): string {
  const isNegative = val < 0;
  const absVal = Math.abs(val);
  let str = String(absVal).padStart(size, '0');
  return isNegative ? `-${str}` : str;
}

/**
 * Formats a number according to the Indonesian locale formatting rules, with optional customization.
 *
 * @param val - The number to format
 * @param options - Custom Intl.NumberFormatOptions
 * @returns Formatted number string
 *
 * @example
 * ```ts
 * formatNumber(1250000) // "1.250.000"
 * formatNumber(1250000.5, { minimumFractionDigits: 2 }) // "1.250.000,50"
 * ```
 */
export function formatNumber(val: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('id-ID', options).format(val);
}
