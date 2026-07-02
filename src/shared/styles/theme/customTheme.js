import { createTheme, virtualColor } from "@mantine/core";
import radioCheck from "../../../assets/shared/radiobox.svg";

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
      // minHeight: "auto",
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
  styles: (theme, params) => {
    const { variant = "inputBgColor", size = "sm" } = params;

    const inputStyles = {
      fontSize: size ? theme.fontSizes?.[size] : theme.fontSizes.md,
      color: theme.white,
      backgroundColor: theme.colors?.[params.variant]
        ? theme.colors?.[params.variant]?.[0]
        : theme.colors.inputBgColor[0],
      padding: `${theme.spacing?.[size]}`,
      borderRadius: theme.radius.md,
      height: "auto",
      lineHeight: "normal",
      // minHeight: "auto",
      "::placeholder": {
        color: theme.colors.white[0],
      },
    };
    const innerInputStyles = {
      padding: `calc(${theme.spacing.md} / 2) ${theme.spacing.md}`,
    };
    return {
      input: inputStyles,
      innerInput: innerInputStyles,
    };
  },
};

// Custom Checkbox styles
const checkboxStyles = {
  styles: (theme, params) => ({
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: theme.spacing.xs,
      cursor: params.disabled ? "not-allowed" : "pointer",
    },
    input: {
      border: `1px solid ${theme.colors.body[0]}`,
      backgroundColor: theme.colors.inputBgColor[0],
      borderRadius: theme.radius.sm,
      transition: "border-color 0.12s, box-shadow 0.12s",
      cursor: "pointer",
      "&[data-checked]": {
        backgroundColor: theme.colors.secondary[0],
        borderColor: theme.colors.primary[0],
        backgroundImage: "none !important",
        boxShadow: "0 0 0 1.5px " + theme.colors.primary[0] + " !important",
      },
      "&:hover": {
        borderColor: theme.colors.primary[5] || theme.colors.primary[0],
      },
      "&:focus": {
        outline: `2px solid ${
          theme.colors.primary[5] || theme.colors.primary[0]
        }`,
        outlineOffset: "2px",
      },
      "&[dataDisabled]": {
        backgroundColor: theme.colors.grey[0],
        borderColor: theme.colors.grey[3] || theme.colors.grey[0],
        cursor: "not-allowed",
        opacity: 0.5,
        color: "theme.colors.body[0]",
      },
    },
    label: {
      color: theme.colors.text[0],
      fontSize: theme.fontSizes.sm,
      userSelect: "none",
      cursor: params.disabled ? "not-allowed" : "pointer",
    },
    icon: {
      color: theme.colors.primary[0],
      background: theme.colors.primary[0],
      fontWeight: "bold",
      width: '0.625rem',
      height: '0.625rem',
      borderRadius: '0.1rem'
    },
  }),
};

const radioStyles = {
  styles: (theme) => ({
    radio: {
      backgroundColor: theme.colors.inputBgColor[0],
      borderColor: theme.colors.inputBgColor[0],
      borderRadius: theme.radius.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    icon: {
      color: theme.colors.primary[0],
      background: theme.colors.primary[0],
      transform: "scale(1.4)",
      borderRadius: '0.1rem'
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
      minWidth: 0,
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

const carouselStyles = {
  styles: (theme) => ({
    indicators: {
      gap: " 0.2rem",
    },
    indicator: {
      backgroundColor: theme.colors.primary[0],
      "&:not([data-active])": {
        backgroundColor: theme.colors.secondary[0],
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
    textSecondary: Array(10).fill("#33363A"),
    grey: Array(10).fill("#3C4044"),
    darkGrey: Array(10).fill("#34373C"),
    secondaryGrey: Array(10).fill("#363A3E"),
    white: Array(10).fill("#fff"),
    black: Array(10).fill("#000"),
    inputBgColor: Array(10).fill("#50565a"),
    yellow: Array(10).fill("#dbd162"),
    skyblue: Array(10).fill("#69B3E7"),
    accordionBg: Array(10).fill("#3B3F43"),
    hoverGrey: Array(10).fill("#80848A"),
    hoverRed: Array(10).fill("#EA7171"),
    bannerGrey: Array(10).fill("#2F3134"),
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
    xxl: "1.25em",
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
    FileInput: {
      styles: (theme, params) => {
        const { variant = "inputBgColor", size = "sm" } = params || {};
        return {
          input: {
            fontSize: size ? theme.fontSizes?.[size] : theme.fontSizes.md,
            color: theme.white,
            backgroundColor:
              theme.colors?.[variant]?.[0] ?? theme.colors.inputBgColor[0],
            padding: `${theme.spacing?.[size]}`,
            borderRadius: theme.radius.md,
            height: "auto",
            lineHeight: "normal",
            "::placeholder": {
              color: theme.colors.white[0],
            },
          },
        };
      },
    },
    Grid: gridStyles,
    Table: tableStyles,
    Checkbox: checkboxStyles,
    Carousel: carouselStyles,
    Radio: radioStyles,
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
