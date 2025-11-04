import React from "react";
import PropTypes from "prop-types";
import "flag-icons/css/flag-icons.min.css";

/**
 * Reusable CountryFlag component using flag-icons.
 * 
 * @param {string} countryCode - ISO 3166-1 alpha-2 code (e.g., 'US', 'IN', 'GB')
 * @param {number|string} size - Pixel size or CSS size value (e.g., 24 or '2em')
 * @param {boolean} squared - Use squared version of the flag
 * @param {string} title - Optional accessible label for screen readers
 */
const CountryFlag = ({ countryCode, size = 24, squared = false, title }) => {
    if (!countryCode) return null;

    const code = countryCode.toLowerCase();
    const classes = `fi fi-${code}${squared ? " fis" : ""}`;

    const style = {
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${(size * 3) / 4}px` : "auto",
        display: "inline-block",
        verticalAlign: "middle",
    };

    return (
        <span
            className={classes}
            style={style}
            title={title || countryCode.toUpperCase()}
            aria-label={title || countryCode.toUpperCase()}
        />
    );
};

CountryFlag.propTypes = {
    countryCode: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    squared: PropTypes.bool,
    title: PropTypes.string,
};

export default CountryFlag;
