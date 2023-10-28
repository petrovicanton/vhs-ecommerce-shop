import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
      },
      backgroundImage: {
        "primary-gradient":
          "radial-gradient(circle, rgba(51,51,51,1) 0%, rgba(0,0,0,1) 100%)",
      },
      colors: {
        primary: {
          light: "#FCC182",
          DEFAULT: "#333333",
          dark: "#AF5B04",
        },
        VHSred: {
          light: "#FF0000",
          DEFAULT: "#FF0000",
          dark: "#FF0000",
        },
        buttons: {
          light: "",
          DEFAULT: "",
          dark: "",
        },
        elements_Icons: {
          light: "",
          DEFAULT: "",
          dark: "",
        },
      },
    },
  },
  plugins: [],
};
export default config;
