/**
 * Validates an Indonesian NIK (Nomor Induk Kependudukan - National Identity Number).
 * NIK is a 16-digit number containing code of province, regency, subdistrict, date of birth, and sequence number.
 *
 * @param nik - The NIK string to validate
 * @returns True if the NIK is valid
 *
 * @example
 * ```ts
 * validateNIK("3171011708450001") // true
 * validateNIK("12345") // false
 * ```
 */
export function validateNIK(nik: string): boolean {
  const clean = nik.replace(/\s/g, '');
  if (!/^\d{16}$/.test(clean)) {
    return false;
  }

  const prov = parseInt(clean.substring(0, 2), 10);
  const kab = parseInt(clean.substring(2, 4), 10);
  const kec = parseInt(clean.substring(4, 6), 10);
  const ddStr = clean.substring(6, 8);
  const mmStr = clean.substring(8, 10);
  const yyStr = clean.substring(10, 12);
  const seq = parseInt(clean.substring(12, 16), 10);

  // Region checks
  if (prov < 11 || prov > 94) return false; // valid provinces currently 11-94
  if (kab < 1 || kab > 99) return false;
  if (kec < 1 || kec > 99) return false;
  if (seq === 0) return false; // sequence starts from 0001

  // Parse birth date
  let day = parseInt(ddStr, 10);
  if (day > 40) {
    day -= 40; // Female NIK birth day is added by 40
  }

  const month = parseInt(mmStr, 10) - 1; // Date month is 0-indexed
  const year = parseInt(yyStr, 10);

  if (month < 0 || month > 11) return false;
  if (day < 1 || day > 31) return false;

  // Validate actual date existence (e.g. Feb 30)
  const currentYear = new Date().getFullYear();
  const currentYearShort = currentYear % 100;
  const fullYear = year <= currentYearShort ? 2000 + year : 1900 + year;

  const birthDate = new Date(fullYear, month, day);
  if (
    birthDate.getFullYear() !== fullYear ||
    birthDate.getMonth() !== month ||
    birthDate.getDate() !== day
  ) {
    return false;
  }

  return true;
}

/**
 * Formats a raw NIK string into a dotted readable format (XX.XXXX.XXXXXX.XXXX).
 *
 * @param nik - The raw NIK string
 * @returns Formatted NIK string. Returns original input if it is not a 16-digit string.
 *
 * @example
 * ```ts
 * formatNIK("3171011708450001") // "31.71.01.170845.0001"
 * ```
 */
export function formatNIK(nik: string): string {
  const clean = nik.replace(/\D/g, '');
  if (clean.length !== 16) {
    return nik;
  }
  return `${clean.slice(0, 2)}.${clean.slice(2, 4)}.${clean.slice(4, 6)}.${clean.slice(6, 12)}.${clean.slice(12)}`;
}

/**
 * Validates an Indonesian NPWP (Nomor Pokok Wajib Pajak - Taxpayer Identification Number).
 * Supports both traditional 15-digit format and new 16-digit format (NIK).
 *
 * @param npwp - The NPWP string to validate
 * @returns True if the NPWP is valid
 *
 * @example
 * ```ts
 * validateNPWP("092542943407000") // true (depends on valid checksum)
 * validateNPWP("3171011708450001") // true if valid NIK
 * ```
 */
export function validateNPWP(npwp: string): boolean {
  const clean = npwp.replace(/\D/g, '');

  if (clean.length === 16) {
    // New NPWP for individuals is NIK
    return validateNIK(clean);
  }

  if (clean.length !== 15) {
    return false;
  }

  const digits = clean.split('').map(Number);
  const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5];

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * weights[i];
  }

  const rem = sum % 11;
  const checksum = rem === 0 || rem === 1 ? 0 : 11 - rem;

  return checksum === digits[9];
}

/**
 * Formats a raw NPWP string into the standard format.
 * Formats 15-digit NPWP as "XX.XXX.XXX.X-XXX.XXX".
 * Formats 16-digit NPWP (NIK) as "XX.XXXX.XXXXXX.XXXX".
 *
 * @param npwp - The raw NPWP string
 * @returns Formatted NPWP string. Returns original input if length is neither 15 nor 16.
 *
 * @example
 * ```ts
 * formatNPWP("092542943407000") // "09.254.294.3-407.000"
 * formatNPWP("3171011708450001") // "31.71.01.170845.0001"
 * ```
 */
export function formatNPWP(npwp: string): string {
  const clean = npwp.replace(/\D/g, '');

  if (clean.length === 15) {
    return `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5, 8)}.${clean.slice(8, 9)}-${clean.slice(9, 12)}.${clean.slice(12)}`;
  }

  if (clean.length === 16) {
    return formatNIK(clean);
  }

  return npwp;
}
