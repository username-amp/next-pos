import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customGray: '#292929',
        loginColor: '#5A5A5A',
        backColor: '#1e1e1e',
        okButton: '#4f4f4f',
        displayBack: '#383838',
        inputColor: '#626262',
      },

      fontFamily: {
        advent: ['Advent Pro', 'san-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
