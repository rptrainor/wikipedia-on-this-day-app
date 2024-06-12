import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "brand_primary": "#5C53DC",
        "brand_primary_light": "#B4AEEB",
        "brand_primary_dark": "#4D49C3",
        "brand_secondary": "#B61BA9",
        "brand_secondary_light": "#F15FE1",
        "brand_secondary_dark": "#7D0074",
        "brand_gray": "#E5E5EA",
        "brand_gray_light": "#A9A9A9",
        "brand_gray_dark": "#7A7A7B",
        "brand_background": "#F5F5F5",
        "brand_prose": "#333333",
      },
      screens: {
        "xs": "320px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
      },
    },
  },
  plugins: [],
} satisfies Config;
