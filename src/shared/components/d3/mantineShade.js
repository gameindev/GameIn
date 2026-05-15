/**
 * Resolve Mantine palette tokens like `violet.5` to a CSS color string.
 * @param {import('@mantine/core').MantineTheme} theme
 * @param {string} token
 */
export function mantineShade(theme, token) {
    if (!token || typeof token !== "string") return token;
    const m = /^([\w]+)\.(\d+)$/.exec(token.trim());
    if (!m) return token;
    const [, name, shade] = m;
    return theme.colors[name]?.[Number(shade)] ?? "#a1a1aa";
}
