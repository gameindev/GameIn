const COMPACT_SUFFIXES = [
    { value: 1_000_000_000, suffix: "B" },
    { value: 1_000_000, suffix: "M" },
    { value: 1_000, suffix: "K" },
];

const trimTrailingZero = (value) => value.replace(/\.0$/, "");

/**
 * Format large counts with K / M / B suffixes for compact UI display.
 * @param {number|string|null|undefined} value
 * @param {{ empty?: string, zero?: string }} options
 */
export function formatCompactNumber(value, options = {}) {
    const { empty = "—", zero = "0" } = options;

    if (value == null || value === "") {
        return empty;
    }

    const num = typeof value === "number" ? value : Number(value);
    if (Number.isNaN(num)) {
        return empty;
    }

    if (num === 0) {
        return zero;
    }

    const sign = num < 0 ? "-" : "";
    const abs = Math.abs(num);

    for (const { value: threshold, suffix } of COMPACT_SUFFIXES) {
        if (abs >= threshold) {
            const scaled = abs / threshold;
            const decimals = scaled >= 100 ? 0 : 1;
            return `${sign}${trimTrailingZero(scaled.toFixed(decimals))}${suffix}`;
        }
    }

    return `${sign}${Math.round(abs).toLocaleString("en-US")}`;
}

/**
 * USD display with $ symbol only (no locale currency prefix) and K/M/B for large amounts.
 */
export function formatCompactCurrency(value, options = {}) {
    const { empty = "—", zero = "0.00", symbol = "$" } = options;

    if (value == null || value === "") {
        return empty;
    }

    const num = typeof value === "number" ? value : Number(value);
    if (Number.isNaN(num)) {
        return empty;
    }

    const sign = num < 0 ? "-" : "";
    const abs = Math.abs(num);

    if (abs === 0) {
        return `${symbol}${zero}`;
    }

    if (abs >= 1000) {
        return `${sign}${symbol}${formatCompactNumber(abs, { empty: "0", zero: "0" })}`;
    }

    return `${sign}${symbol}${abs.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}
