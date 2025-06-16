import { createTheme, virtualColor } from "@mantine/core";

// Custom Button styles using props
const buttonStyles = {
  styles: (theme, params) => {
    const { variant, padding, width, size, height } = params;

    const baseStyles = {
      padding: padding ?? "0.5rem 1rem",
      width: width ?? "auto",
      height: height ?? "auto",
      borderRadius: theme.radius.sm,
      fontSize: theme.fontSizes?.[size],
      backgroundColor: theme.colors?.[variant]?.[0],
      lineHeight: "normal",
    };

    const variantStylesMap = {
      primary: {
        color: theme.colors.darkText[0],
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
    },
  }),
};

// Custom TextInput component styles
const textInputStyles = {
  styles: (theme) => ({
    // root: {
    //   color: theme.colors.text[0],
    // },
    input: {
      fontSize: theme.fontSizes.md,
      color: theme.white,
      backgroundColor: theme.colors.inputBgColor[0],
      padding: "0.45rem 1.375rem",
      borderRadius: theme.radius.md,
      height: "auto",
      "::placeholder": {
        color: theme.colors.white[0],
        // opacity: 0.7,
      },
    },
  }),
};

const textLabelStyles = {
  styles: (theme) => ({
    label: {
      fontSize: theme.fontSizes.default,
      color: theme.colors.text[0],
      fontWeight: 500,
      marginBottom: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "0.07em",
    },
    input: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.text[0],
      backgroundColor: theme.colors.inputBgColor[0],
      padding: "0.45rem 1.375rem",
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
  styles: (theme) => ({
    input: {
      fontSize: theme.fontSizes.md,
      padding: "0.45rem 1.375rem",
      height: "3.125rem",
    },
    innerInput: {
      padding: "0.45rem 1.375rem",
    },
  }),
};

// Font definitions
const fonts = {
  fontFamily: "Exo2, sans-serif",
  fontFamilyMonospace: "MyriadPro-Bold, sans-serif",
  fontSizes: {
    xs: "0.75rem",
    sm: "0.85rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    default: "1rem",
  },
};

const gridStyles = {
  styles: () => ({
    root: {
      width: "100%",
    },
    col: {
      width: "25rem",
      height: "25rem",
      Box: {
        height: "25rem",
      },
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
    darkText: Array(10).fill("#363A3E"),
    textSecondary: Array(10).fill("#33363A"),
    grey: Array(10).fill("#3C4044"),
    darkGrey: Array(10).fill("#34373C"),
    secondaryGrey: Array(10).fill("#363A3E"),
    white: Array(10).fill("#fff"),
    black: Array(10).fill("#000"),
    inputBgColor: Array(10).fill("#50565a"),
    iconHover: Array(10).fill("#dbd162"),
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
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    default: "0.375rem",
  },

  gap: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1.25rem",
    lg: "1.5rem",
    xl: "2rem",
    default: "1rem",
  },

  components: {
    Button: buttonStyles,
    Text: textStyles,
    Input: textInputStyles,
    InputWrapper: textLabelStyles,
    PasswordInput: PasswordInputStyles,
    Grid: gridStyles,
  },
  other: {
    lightBg: "#f5f5f5",
    darkBg: "#1e1e1e",
  },
  ...fonts,
});
