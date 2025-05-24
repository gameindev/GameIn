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
      fontSize: theme.fontSizes[size],
      lineHeight: "normal",
    };

    if (variant === "primary") {
      return {
        root: {
          ...baseStyles,
          color: theme.colors.darkText[0],
          backgroundColor: theme.colors.primary[0],
        },
      };
    }

    if (variant === "secondary") {
      return {
        root: {
          ...baseStyles,
          color: theme.colors.textSecondary[0],
          backgroundColor: theme.colors.secondary[0],
        },
      };
    }

    if (variant === "grey") {
      return {
        root: {
          ...baseStyles,
          color: theme.colors.white[0],
          backgroundColor: theme.colors.grey[0],
        },
      };
    }

    if (variant === "darkGrey") {
      return {
        root: {
          ...baseStyles,
          color: theme.colors.white[0],
          backgroundColor: theme.colors.darkGrey[0],
        },
      };
    }

    // Default button style
    return {
      root: {
        ...baseStyles,
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
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      backgroundColor: theme.colors.inputColor[0],
      padding: "0.45rem 1.375rem",
      height: "auto",
      "::placeholder": {
        color: theme.colors.white[0],
        opacity: 0.7,
      },
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
    md: "0.875rem",
    lg: "1.25rem",
    xl: "1.5rem",
  },
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
    white: Array(10).fill("#fff"),
    black: Array(10).fill("#000"),
    inputColor: Array(10).fill("#50565a"),
    textWhite: virtualColor({
      name: "textWhite",
      light: "black",
      dark: "white",
    }),
  },

  components: {
    Button: buttonStyles,
    Text: textStyles,
    Input: textInputStyles,
  },
  other: {
    lightBg: "#f5f5f5",
    darkBg: "#1e1e1e",
  },
  ...fonts,
});
