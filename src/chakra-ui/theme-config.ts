import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {},
  theme: {
    breakpoints: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1268px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
    tokens: {
      gradients: {},
      colors: {
        primary: { value: "#2c3e50" },
        secondary: { value: "#2e84bf" },
        primaryHover: { value: "rgba(44, 62, 80, 0.8)" },
        secondaryHover: { value: "rgba(46, 132, 191, 0.75)" },
        neutral: {
          50: { value: "#F1F1F3" },
          100: { value: "#E4E4E7" },
          300: { value: "#ADAEB8" },
          600: { value: "#5F606D" },
          750: { value: "#3B3C45" },
          800: { value: "#2F3037" },
          900: { value: "#1F1F23" },
        },
      },
      fontSizes: {
        xs: { value: "12px" },
        sm: { value: "14px" },
        base: { value: "16px" },
        md: { value: "18px" },
        lg: { value: "20px" },
        xl: { value: "24px" },
        "2xl": { value: "28px" },
      },
      spacing: {
        "15": { value: "3.375rem" },
        "17": { value: "4.25rem" },
        "18": { value: "4.625rem" },
      },
      shadows: {
        card: { value: "0px 3px 28px 0px rgba(0,0,0,0.5)" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
