import { createTheme, virtualColor } from "@mantine/core";

// Custom Button styles using props
const buttonStyles = {
  styles: (theme, params) => {
    const { variant, padding, width, size, height } = params;

    const baseStyles = {
      padding: padding ?? "0.5em 1em",
      width: width ?? "auto",
      height: height ?? "auto",
      borderRadius: theme.radius.sm,
      fontSize: theme.fontSizes?.[size],
      backgroundColor: theme.colors?.[variant]?.[0],
      lineHeight: "normal",
    };

    const variantStylesMap = {
      primary: {
        color: theme.colors.secondaryGrey[0],
      },
      secondary: {
        color: theme.colors.textSecondary[0],
      },
      grey: {
        color: theme.colors.white[0],
      },
      darkGrey: {
        color: theme.colors.white[0],
      },
    };

    // Default button style
    return {
      root: {
        ...baseStyles,
        ...(variantStylesMap[variant] || {}),
      },
    };
  },
};

// Custom Text component styles
const textStyles = {
  styles: (theme) => ({
    root: {
      color: theme.colors.text[0],
      lineHeight: "normal",
    },
  }),
};

// Custom TextInput component styles
const textInputStyles = {
  styles: (theme, params) => {
    // root: {
    //   color: theme.colors.text[0],
    // },

    const { variant = "inputBgColor", size = "sm" } = params;

    const inputStyles = {
      fontSize: size ? theme.fontSizes?.[size] : theme.fontSizes.md,
      color: theme.white,
      backgroundColor: theme.colors?.[variant]?.[0],
      padding: `${theme.spacing?.[size]}`,
      borderRadius: theme.radius.md,
      height: "auto",
      lineHeight: "normal",
      minHeight: "auto",
      "::placeholder": {
        color: theme.colors.white[0],
      },
    };

    return {
      input: inputStyles,
    };
  },
};

const textLabelStyles = {
  styles: (theme) => ({
    label: {
      fontSize: theme.fontSizes.default,
      color: theme.colors.text[0],
      fontWeight: 500,
      marginBottom: "0.75em",
      textTransform: "uppercase",
      letterSpacing: "0.07em",
    },
    input: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.text[0],
      backgroundColor: theme.colors.inputBgColor[0],
      padding: "0.45em 1.375em",
      borderRadius: theme.radius.md,
      height: "auto",
      "::placeholder": {
        color: theme.colors.white[0],
        // opacity: 0.7,
      },
    },
  }),
};

const PasswordInputStyles = {
  styles: (theme, params) => ({
    input: {
      fontSize: theme.fontSizes.md,
      padding: `calc(${theme.spacing.md} / 2) ${theme.spacing.md}`,
      backgroundColor: theme.colors?.[params.variant]
        ? theme.colors?.[params.variant]?.[0]
        : theme.colors.inputBgColor[0],
      height: `calc(${theme.spacing.md} * 3.25)`,
    },
    innerInput: {
      padding: `calc(${theme.spacing.md} / 2) ${theme.spacing.md}`,
    },
  }),
};

// Font definitions
const fonts = {
  fontFamily: "Exo2, sans-serif",
  fontFamilyMonospace: "MyriadPro-Bold, sans-serif",
  fontSizes: {
    xs: "0.75em",
    sm: "0.85em",
    md: "1em",
    lg: "1.25em",
    xl: "1.5em",
    default: "1em",
  },
};

const gridStyles = {
  styles: () => ({
    root: {
      width: "100%",
    },
    col: {
      width: "25em",
      minHeight: "25em",
      Box: {
        minHeight: "25em",
      },
    },
  }),
};

const tableStyles = {
  styles: (theme) => ({
    table: {
      backgroundColor: theme.colors.secondaryGrey[0],
    },
  }),
};

// Final Mantine theme object
export const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: Array(10).fill("#5ce5b0"),
    secondary: Array(10).fill("#9D7FEF"),
    text: Array(10).fill("#C2C6CC"),
    textSecondary: Array(10).fill("#33363A"),
    grey: Array(10).fill("#3C4044"),
    darkGrey: Array(10).fill("#34373C"),
    secondaryGrey: Array(10).fill("#363A3E"),
    white: Array(10).fill("#fff"),
    black: Array(10).fill("#000"),
    inputBgColor: Array(10).fill("#50565a"),
    iconHover: Array(10).fill("#dbd162"),
    skyblue: Array(10).fill("#69B3E7"),
    accordionBg: Array(10).fill("#3B3F43"),
    textWhite: virtualColor({
      name: "textWhite",
      light: "black",
      dark: "white",
    }),
    body: virtualColor({
      name: "body",
      light: "white",
      dark: "grey",
    }),
  },

  radius: {
    xs: "0.125em",
    sm: "0.25em",
    md: "0.375em",
    lg: "0.5em",
    xl: "0.75em",
    default: "0.375em",
  },

  gap: {
    xxs: "0.25em", // Extra Extra Small gap
    xs: "0.5em",
    sm: "0.75em",
    md: "1.25em",
    lg: "1.5em",
    xl: "2em",
    default: "1em",
  },

  spacing: {
    xs: "0.75em",
    sm: "0.85em",
    md: "1em",
    lg: "1.25em",
    xl: "1.5em",
    default: "1em",
  },

  components: {
    Button: buttonStyles,
    Text: textStyles,
    Input: textInputStyles,
    InputWrapper: textLabelStyles,
    PasswordInput: PasswordInputStyles,
    Grid: gridStyles,
    Table: tableStyles,
    SegmentedControl: {
      styles: () => ({
        root: {
          backgroundColor: "transparent",
        },
      }),
    },
  },
  other: {
    lightBg: "#f5f5f5",
    darkBg: "#1e1e1e",
  },
  ...fonts,
});
