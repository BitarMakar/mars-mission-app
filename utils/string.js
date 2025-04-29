/**
 * Checks if a string is empty/contains only whitespace.
 *
 * @param value - The string to check.
 * @returns `true` if the string is empty or contains only whitespace, `false` otherwise.
 *
 * @example
 * isStringEmpty(""); // true
 * isStringEmpty("   "); // true
 * isStringEmpty("hello"); // false
 */
const isStringEmpty = (value) => {
  return !value || value.trim().length === 0;
};

module.exports = { isStringEmpty };
