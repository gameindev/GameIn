const baseTheme = {
  typography: {
    exo2: {
      medium: "Exo2-Medium, sans-serif",
      bold: "Exo2-Bold, sans-serif",
      extraBold: "Exo2-ExtraBold, sans-serif",
      semiBold: "Exo2-SemiBold, sans-serif",
      regular: "Exo2-Regular, sans-serif",
      light: "Exo2-Light, sans-serif",
    },
    helvetica: {
      light: "Helvetica-Neue-Light",
      regular: "Helvetica-Neue-Regular, sans-serif",
      bold: "Helvetica-Neue-Bold, sans-serif",
    },
    myriadPro: {
      bold: "MyriadPro-Bold, sans-serif",
    },
  },
  transitions: {
    default: "all 0.3s ease",
  },
  borderRadius: "0.313rem",
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  fontSize: {
    small: "0.875rem",
    medium: "1.25rem",
    large: "1.5rem",
  },
  baseColors: {
    brandPrimary: "#5CE5B0",
    brandSecondary: "#9D7FEF",
    ctaDarkGray: "#34373C",
    dark: "#000000",
  },
};

export const darkTheme = {
  name: "dark",
  colors: {
    bgPrimary: "#3C4044",
    bgSecondary: "#363A3E",
    bgHeader: "#33363A",
    text: "#FFFFFF",
    textSecondary: "#C2C6CC",
    cardBgGradient:
      "transparent linear-gradient(45deg, #9D7FEF 0%, #5CE5B0 100%) 0% 0% no-repeat padding-box",
    hoverCta: {
      background: "#50565A",
      text: "#FFFFFF",
      hover: "#80848A",
    },
    boxShadow: "0px 0px 10px 10px rgb(56 56 56)",
  },
  ...baseTheme,
};

export const lightTheme = {
  name: "light",
  colors: {
    bgPrimary: "#F5F7FA",
    bgSecondary: "#E9EDF2",
    bgHeader: "#F5F7FA",
    text: "#1A1A1A",
    textSecondary: "#4B4F55",
    cardBgGradient:
      "transparent linear-gradient(45deg, #5CE5B0 0%, #9D7FEF 100%) 0% 0% no-repeat padding-box",
    hoverCta: {
      background: "#D1D5DB",
      text: "#1A1A1A",
      hover: "#B0B6BD",
    },
    boxShadow: "0px 0px 10px 10px rgb(221 221 221)",
  },
  ...baseTheme,
};
