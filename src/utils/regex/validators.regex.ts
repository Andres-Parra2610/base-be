/**
 * Email Regex (HTML5 W3C Standard)
 *
 * Validates standard email formats, supporting subdomains and long TLDs.
 * It prevents special characters at the start or end.
 *
 * @example 'user@example.com'
 */
export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/**
 * Strong Password Regex
 *
 * Requirements:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character (@$!%*?&)
 *
 * @example 'StrongPass1!'
 */
export const passwordStrongRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Username Regex
 *
 * Alphanumeric, allows underscores and hyphens.
 * Length: 3 to 16 characters.
 *
 * @example 'user_name-123'
 */
export const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

/**
 * Full Name Regex (People)
 *
 * Allows letters, spaces, accents (tildes), and 'ñ'.
 * Prevents numbers and special symbols.
 *
 * @example 'Juan Pérez'
 */
export const fullNameRegex =
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

/**
 * URL Regex (Robust)
 *
 * Supports http/https, www, subdomains, ports, and query params.
 *
 * @example 'https://www.example.com/path?query=1'
 */
export const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?$/;

/**
 * UUID v4 Regex
 *
 * Standard format: 8-4-4-4-12 hexadecimal characters.
 *
 * @example '123e4567-e89b-12d3-a456-426614174000'
 */
export const uuidV4Regex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

/**
 * Date Regex (ISO 8601)
 *
 * Validates the strict YYYY-MM-DD format commonly used in APIs.
 *
 * @example '2023-10-25'
 */
export const dateIsoRegex = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Hex Color Regex (CSS)
 *
 * Validates #RGB and #RRGGBB formats (with or without the hash).
 *
 * @example '#ff0000'
 * @example 'f00'
 */
export const hexColorRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * Slug Regex (Friendly URLs)
 *
 * Only lowercase letters, numbers, and hyphens.
 *
 * @example 'my-article-title'
 */
export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * IPv4 Address Regex
 *
 * Validates 4 groups of numbers between 0 and 255.
 *
 * @example '192.168.1.1'
 */
export const ipv4Regex =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/**
 * Currency / Price Regex (Decimals)
 *
 * Allows positive numbers with up to 2 optional decimal places.
 *
 * @example '10'
 * @example '10.5'
 * @example '10.99'
 */
export const currencyRegex = /^\d+(\.\d{1,2})?$/;

/**
 * Credit Card Regex (Simple Format)
 *
 * Validates groups of 13 to 19 digits.
 * NOTE: For real validation, use the Luhn algorithm after the regex check.
 *
 * @example '1234567812345678'
 */
export const creditCardSimpleRegex = /^[0-9]{13,19}$/;
