/**
 * Normalizes an Indonesian phone number into a standard E.164 format (+628xxxxxxxx).
 * Supports cleaning non-digit characters and converting prefixes (08..., 628..., 8...).
 *
 * @param phone - The raw phone number string
 * @returns Normalized phone number string in international format (+628xxxx)
 *
 * @example
 * ```ts
 * normalizePhone("0812-3456-7890") // "+6281234567890"
 * normalizePhone("6281234567890") // "+6281234567890"
 * normalizePhone("+62 812 3456 7890") // "+6281234567890"
 * ```
 */
export function normalizePhone(phone: string): string {
  // Remove all non-digit and non-plus characters
  const clean = phone.replace(/[^\d+]/g, '');

  if (clean.startsWith('+62')) {
    return clean;
  }
  if (clean.startsWith('62')) {
    return '+' + clean;
  }
  if (clean.startsWith('08')) {
    return '+62' + clean.slice(1);
  }
  if (clean.startsWith('8')) {
    return '+62' + clean;
  }
  return clean;
}

/**
 * Validates whether the given phone number is a valid Indonesian mobile phone number.
 * A valid Indonesian mobile phone number starts with +628, 628, or 08 and has 9-13 digits after the prefix.
 *
 * @param phone - The phone number string to validate
 * @returns True if the phone number is valid
 *
 * @example
 * ```ts
 * validatePhone("081234567890") // true
 * validatePhone("+62812345678") // true
 * validatePhone("12345") // false
 * ```
 */
export function validatePhone(phone: string): boolean {
  const normalized = normalizePhone(phone);
  // Indonesian mobile numbers: prefix +628, then 9 to 13 digits.
  // In total: + (1) + 62 (2) + 8 (1) + 8 to 12 digits = 12 to 16 characters.
  return /^\+628[1-9]\d{7,11}$/.test(normalized);
}

/**
 * Formats an Indonesian phone number into a readable local, international, or spaced format.
 *
 * @param phone - The phone number to format
 * @param format - The target format: 'local' (0812...), 'international' (+62812...), or 'spaced' (+62 812-xxxx-xxxx)
 * @returns Formatted phone number string. Returns original input if the phone number is invalid.
 *
 * @example
 * ```ts
 * formatPhone("+6281234567890", "local") // "081234567890"
 * formatPhone("081234567890", "spaced") // "+62 812-3456-7890"
 * ```
 */
export function formatPhone(
  phone: string,
  format: 'local' | 'international' | 'spaced' = 'international',
): string {
  if (!validatePhone(phone)) {
    return phone;
  }

  const normalized = normalizePhone(phone);
  const rawDigits = normalized.slice(3); // Remove "+62"

  if (format === 'local') {
    return `0${rawDigits}`;
  }

  if (format === 'international') {
    return normalized;
  }

  if (format === 'spaced') {
    const parts: string[] = [];
    parts.push(rawDigits.slice(0, 3)); // Usually 8xx
    const rest = rawDigits.slice(3);

    if (rest.length <= 4) {
      parts.push(rest);
    } else if (rest.length <= 8) {
      parts.push(rest.slice(0, 4), rest.slice(4));
    } else {
      parts.push(rest.slice(0, 4), rest.slice(4, 8), rest.slice(8));
    }

    return `+62 ${parts.join('-')}`;
  }

  return normalized;
}

/**
 * Masks a phone number for privacy, leaving a specified number of characters visible at start and end.
 *
 * @param phone - The phone number to mask
 * @param options - Masking options
 * @param options.maskChar - The character to use for masking. Default is "*".
 * @param options.visibleStart - Number of visible characters at the start. Default is 4.
 * @param options.visibleEnd - Number of visible characters at the end. Default is 4.
 * @returns Masked phone number string
 *
 * @example
 * ```ts
 * maskPhone("081234567890") // "0812****7890"
 * maskPhone("+6281234567890", { visibleStart: 3, visibleEnd: 2 }) // "+62**********90"
 * ```
 */
export function maskPhone(
  phone: string,
  options: { maskChar?: string; visibleStart?: number; visibleEnd?: number } = {},
): string {
  const { maskChar = '*', visibleStart = 4, visibleEnd = 4 } = options;

  if (phone.length <= visibleStart + visibleEnd) {
    return phone;
  }

  const start = phone.slice(0, visibleStart);
  const end = phone.slice(phone.length - visibleEnd);
  const maskedLength = phone.length - visibleStart - visibleEnd;
  const mask = maskChar.repeat(maskedLength);

  return `${start}${mask}${end}`;
}
