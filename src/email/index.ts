import { validateEmail } from '../validation/index.js';

export { validateEmail };

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
export function maskEmail(email: string): string {
  if (!validateEmail(email)) {
    return email;
  }

  const [username, domain] = email.split('@');
  if (!username || !domain) {
    return email;
  }

  if (username.length <= 2) {
    return `${username[0]}${'*'.repeat(username.length - 1)}@${domain}`;
  }

  const start = username[0];
  const end = username[username.length - 1];
  const mask = '*'.repeat(username.length - 2);

  return `${start}${mask}${end}@${domain}`;
}
