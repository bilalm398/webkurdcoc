const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

/**
 * Convert Western digits in a number/string to Eastern Arabic numerals.
 * @param {number|string} value
 * @returns {string}
 */
export function toArabicNumerals(value) {
    return String(value).replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)]);
}
