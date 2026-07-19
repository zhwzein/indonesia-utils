/**
 * Formats a number into Rupiah (IDR) currency format.
 *
 * @param value - The number to format
 * @param options - Formatting options
 * @param options.formal - If true, adds a space between the symbol and the value (e.g., "Rp 1.500.000"). Default is false (e.g., "Rp1.500.000").
 * @param options.symbol - The currency symbol to use. Default is "Rp".
 * @param options.decimalDigits - The number of decimal digits to display. Default is 0.
 * @returns Formatted Rupiah string
 *
 * @example
 * ```ts
 * formatRupiah(1500000) // "Rp1.500.000"
 * formatRupiah(1500000, { formal: true }) // "Rp 1.500.000"
 * formatRupiah(1500000.5, { decimalDigits: 2 }) // "Rp1.500.000,50"
 * ```
 */
declare function formatRupiah(value: number, options?: {
    formal?: boolean;
    symbol?: string;
    decimalDigits?: number;
}): string;
/**
 * Parses a Rupiah formatted string back to a number.
 * Supports negative values and decimal parts.
 *
 * @param value - The Rupiah string to parse
 * @returns Parsed number, or 0 if invalid
 *
 * @example
 * ```ts
 * parseRupiah("Rp1.500.000") // 1500000
 * parseRupiah("Rp 1.500.000,50") // 1500000.5
 * ```
 */
declare function parseRupiah(value: string): number;
/**
 * Formats a number into a standard currency format for a specified locale and currency.
 *
 * @param value - The number to format
 * @param currencyCode - The ISO 4217 currency code. Default is "IDR".
 * @param locale - The locale to use. Default is "id-ID".
 * @returns Formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1500000, "USD", "en-US") // "$1,500,000.00"
 * formatCurrency(1500000) // "Rp1.500.000,00"
 * ```
 */
declare function formatCurrency(value: number, currencyCode?: string, locale?: string): string;

/**
 * Gets the Indonesian name of a month by index (0-11).
 *
 * @param monthIndex - The month index (0 for January, 11 for December)
 * @param options - Formatting options
 * @param options.short - If true, returns the short month name (e.g., "Jan", "Agu"). Default is false.
 * @returns Month name
 *
 * @example
 * ```ts
 * getNamaBulan(0) // "Januari"
 * getNamaBulan(7, { short: true }) // "Agu"
 * ```
 */
declare function getNamaBulan(monthIndex: number, options?: {
    short?: boolean;
}): string;
/**
 * Gets the Indonesian name of a day by index (0-6).
 *
 * @param dayIndex - The day index (0 for Sunday, 6 for Saturday)
 * @param options - Formatting options
 * @param options.short - If true, returns the short day name (e.g., "Min", "Sen"). Default is false.
 * @returns Day name
 *
 * @example
 * ```ts
 * getNamaHari(0) // "Minggu"
 * getNamaHari(1, { short: true }) // "Sen"
 * ```
 */
declare function getNamaHari(dayIndex: number, options?: {
    short?: boolean;
}): string;
/**
 * Formats a date into a standard Indonesian date format.
 *
 * @param date - Date object, ISO string, or timestamp
 * @param options - Formatting options
 * @param options.day - If true, includes the day name (e.g., "Jumat, 17 Agustus 1945"). Default is false.
 * @param options.monthFormat - Format of the month name ("long" | "short"). Default is "long".
 * @param options.time - If true, includes the time. Default is false.
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatTanggalIndonesia(new Date("1945-08-17T10:00:00Z")) // "17 Agustus 1945"
 * formatTanggalIndonesia("1945-08-17", { day: true }) // "Jumat, 17 Agustus 1945"
 * formatTanggalIndonesia("1945-08-17T10:00:00", { time: true }) // "17 Agustus 1945 10:00"
 * ```
 */
declare function formatTanggalIndonesia(date: Date | string | number, options?: {
    day?: boolean;
    monthFormat?: 'long' | 'short';
    time?: boolean;
}): string;
/**
 * Gets the Indonesian day name of a given date.
 *
 * @param date - Date object, ISO string, or timestamp
 * @returns Day name in Indonesian
 *
 * @example
 * ```ts
 * formatHariIndonesia(new Date("1945-08-17")) // "Jumat"
 * ```
 */
declare function formatHariIndonesia(date: Date | string | number): string;
/**
 * Formats a date into a standard Indonesian date and time format (with seconds support).
 *
 * @param date - Date object, ISO string, or timestamp
 * @param options - Formatting options
 * @param options.second - If true, includes seconds (e.g., "17 Agustus 1945 10:00:00"). Default is true.
 * @returns Formatted date-time string
 *
 * @example
 * ```ts
 * formatDateTimeIndonesia("1945-08-17T10:00:00") // "17 Agustus 1945 10:00:00"
 * formatDateTimeIndonesia("1945-08-17T10:00:00", { second: false }) // "17 Agustus 1945 10:00"
 * ```
 */
declare function formatDateTimeIndonesia(date: Date | string | number, options?: {
    second?: boolean;
}): string;

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
declare function normalizePhone(phone: string): string;
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
declare function validatePhone(phone: string): boolean;
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
declare function formatPhone(phone: string, format?: 'local' | 'international' | 'spaced'): string;
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
declare function maskPhone(phone: string, options?: {
    maskChar?: string;
    visibleStart?: number;
    visibleEnd?: number;
}): string;

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
declare function isEmpty(value: any): boolean;
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
declare function isNumeric(value: any): boolean;
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
declare function isAlphabet(value: string): boolean;
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
declare function isURL(value: string): boolean;
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
declare function isJSON(value: string): boolean;
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
declare function isUUID(value: string): boolean;
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
declare function validateEmail(value: string): boolean;

/**
 * Masks an email address for privacy (e.g., "john.doe@example.com" -> "j******e@example.com").
 *
 * @param email - The email address to mask
 * @returns Masked email address string
 *
 * @example
 * ```ts
 * maskEmail("john.doe@example.com") // "j*******e@example.com"
 * maskEmail("hi@example.com") // "h*@example.com"
 * ```
 */
declare function maskEmail(email: string): string;

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
declare function validateNIK(nik: string): boolean;
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
declare function formatNIK(nik: string): string;
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
declare function validateNPWP(npwp: string): boolean;
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
declare function formatNPWP(npwp: string): string;

/**
 * Removes accents/diacritics from a string (e.g., "Café" -> "Cafe").
 *
 * @param str - The input string
 * @returns Cleaned string without accents
 *
 * @example
 * ```ts
 * removeAccents("Mêncoba") // "Mencoba"
 * ```
 */
declare function removeAccents(str: string): string;
/**
 * Converts a string into a URL-friendly slug.
 *
 * @param str - The input string
 * @returns URL-safe slug string
 *
 * @example
 * ```ts
 * slugify("Halo Dunia! Selamat Pagi") // "halo-dunia-selamat-pagi"
 * ```
 */
declare function slugify(str: string): string;
/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The input string
 * @returns Capitalized string
 *
 * @example
 * ```ts
 * capitalize("indonesia") // "Indonesia"
 * ```
 */
declare function capitalize(str: string): string;
/**
 * Converts a string to Title Case (capitalizes first letter of each word).
 *
 * @param str - The input string
 * @returns Title-cased string
 *
 * @example
 * ```ts
 * titleCase("republik indonesia") // "Republik Indonesia"
 * ```
 */
declare function titleCase(str: string): string;
/**
 * Converts a string to camelCase.
 *
 * @param str - The input string
 * @returns Camel-cased string
 *
 * @example
 * ```ts
 * camelCase("halo dunia") // "haloDunia"
 * camelCase("kebab-case-string") // "kebabCaseString"
 * ```
 */
declare function camelCase(str: string): string;
/**
 * Converts a string to snake_case.
 *
 * @param str - The input string
 * @returns Snake-cased string
 *
 * @example
 * ```ts
 * snakeCase("Halo Dunia") // "halo_dunia"
 * ```
 */
declare function snakeCase(str: string): string;
/**
 * Converts a string to kebab-case.
 *
 * @param str - The input string
 * @returns Kebab-cased string
 *
 * @example
 * ```ts
 * kebabCase("Halo Dunia") // "halo-dunia"
 * ```
 */
declare function kebabCase(str: string): string;
/**
 * Truncates a string to a specified length, appending an omission string.
 *
 * @param str - The input string
 * @param length - Maximum length of the output string (including the omission string)
 * @param omission - String to append (e.g., "..."). Default is "...".
 * @returns Truncated string
 *
 * @example
 * ```ts
 * truncate("Indonesia Raya", 9) // "Indone..."
 * ```
 */
declare function truncate(str: string, length: number, omission?: string): string;

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
declare function randomString(length: number, options?: {
    numeric?: boolean;
    alphabetic?: boolean;
    uppercase?: boolean;
    lowercase?: boolean;
}): string;
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
declare function randomNumber(min: number, max: number): number;
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
declare function generateUUID(): string;
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
declare function generateOTP(length?: number, options?: {
    numericOnly?: boolean;
}): string;

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
declare function clamp(val: number, min: number, max: number): number;
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
declare function between(val: number, min: number, max: number, inclusive?: boolean): boolean;
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
declare function padNumber(val: number, size: number): string;
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
declare function formatNumber(val: number, options?: Intl.NumberFormatOptions): string;

export { between, camelCase, capitalize, clamp, formatCurrency, formatDateTimeIndonesia, formatHariIndonesia, formatNIK, formatNPWP, formatNumber, formatPhone, formatRupiah, formatTanggalIndonesia, generateOTP, generateUUID, getNamaBulan, getNamaHari, isAlphabet, isEmpty, isJSON, isNumeric, isURL, isUUID, kebabCase, maskEmail, maskPhone, normalizePhone, padNumber, parseRupiah, randomNumber, randomString, removeAccents, slugify, snakeCase, titleCase, truncate, validateEmail, validateNIK, validateNPWP, validatePhone };
