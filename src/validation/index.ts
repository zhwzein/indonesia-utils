/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object).
 *
 * @param value - The value to check
 * @returns True if the value is empty
 *
 * @example
 * ```ts
 * isEmpty("") // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(0) // false
 * ```
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * Checks if a value represents a number (either number type or numeric string).
 *
 * @param value - The value to check
 * @returns True if the value is numeric
 *
 * @example
 * ```ts
 * isNumeric(123) // true
 * isNumeric("123.45") // true
 * isNumeric("123a") // false
 * ```
 */
export function isNumeric(value: any): boolean {
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }
  if (typeof value === 'string') {
    if (value.trim() === '') return false;
    const num = Number(value);
    return !isNaN(num) && isFinite(num);
  }
  return false;
}

/**
 * Checks if a string contains only alphabetic characters (a-z, A-Z).
 *
 * @param value - The string to check
 * @returns True if the string contains only alphabetic characters
 *
 * @example
 * ```ts
 * isAlphabet("Indonesia") // true
 * isAlphabet("Indonesia2026") // false
 * ```
 */
export function isAlphabet(value: string): boolean {
  if (typeof value !== 'string') return false;
  return /^[a-zA-Z]+$/.test(value);
}

/**
 * Checks if a string is a valid URL.
 *
 * @param value - The string to check
 * @returns True if the string is a valid URL
 *
 * @example
 * ```ts
 * isURL("https://github.com") // true
 * isURL("invalid-url") // false
 * ```
 */
export function isURL(value: string): boolean {
  if (typeof value !== 'string') return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a string is a valid JSON.
 *
 * @param value - The string to check
 * @returns True if the string is valid JSON
 *
 * @example
 * ```ts
 * isJSON('{"a":1}') // true
 * isJSON('invalid') // false
 * ```
 */
export function isJSON(value: string): boolean {
  if (typeof value !== 'string') return false;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' && parsed !== null;
  } catch {
    return false;
  }
}

/**
 * Checks if a string is a valid UUID (v1 to v5).
 *
 * @param value - The string to check
 * @returns True if the string is a valid UUID
 *
 * @example
 * ```ts
 * isUUID("123e4567-e89b-12d3-a456-426614174000") // true
 * isUUID("invalid-uuid") // false
 * ```
 */
export function isUUID(value: string): boolean {
  if (typeof value !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Validates whether the given string is a valid email address.
 *
 * @param value - The string to validate
 * @returns True if the email is valid
 *
 * @example
 * ```ts
 * validateEmail("user@domain.com") // true
 * validateEmail("invalid-email") // false
 * ```
 */
export function validateEmail(value: string): boolean {
  if (typeof value !== 'string') return false;
  const emailRegex =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
  return emailRegex.test(value);
}
