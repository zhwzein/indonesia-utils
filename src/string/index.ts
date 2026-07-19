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
export function removeAccents(str: string): string {
  if (typeof str !== 'string') return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Helper to split a string into an array of words, handling spaces, camelCase, snake_case, and kebab-case.
 */
function getWords(str: string): string[] {
  if (typeof str !== 'string') return [];
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase
    .replace(/[^a-zA-Z0-9]/g, ' ') // Replace non-alphanumeric with spaces
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

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
export function slugify(str: string): string {
  if (typeof str !== 'string') return '';
  return removeAccents(str)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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
export function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
export function titleCase(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

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
export function camelCase(str: string): string {
  const words = getWords(str);
  if (words.length === 0) return '';
  return (
    words[0].toLowerCase() +
    words
      .slice(1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
  );
}

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
export function snakeCase(str: string): string {
  return getWords(str)
    .map((word) => word.toLowerCase())
    .join('_');
}

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
export function kebabCase(str: string): string {
  return getWords(str)
    .map((word) => word.toLowerCase())
    .join('-');
}

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
export function truncate(str: string, length: number, omission: string = '...'): string {
  if (typeof str !== 'string') return '';
  if (str.length <= length) return str;
  return str.slice(0, length - omission.length) + omission;
}
