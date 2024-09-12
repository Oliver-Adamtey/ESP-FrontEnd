/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jost: ['"Jost"', 'sans-serif'],
      },

      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        primary: {
          orange: "#e60000",
          neutral: "#474D66"
        },
        secondary: {
          green: "#52BD94",
          yellow: "#FFB020",
          red: "#e60000",
          heading:'#344054'
        },
        tertiary: {
          blue: "#3366FF",
          violet: "#897AE3",
          teal: "#25CBD6",
          pink: "#ED55C2"
        },
        neutral: {
          N900: "#101840",
          N800: "#474D66",
          N700: "#696F8C",
          N600: "#8F95B2",
          N500: "#C1C4D6",
          N400: "#D8DAE5",
          N300: "#E6E8F0",
          N200: "#EDEFF5",
          N100: "#F4F6FA",
          N75: "#F9FAFC",
          N50: "#FAFBFF"
        },
        orange: {
          O50: "#FFF0EA",
          O100: "#F2BEAB",
          O200: "#EB9C7F",
          O300: "#E47A53",
          O400: "#e60000",
          O500: "#B5461D",
          O600: "#e60000"
        },
        yellow: {
          Y600: "#66460D",
          Y500: "#996A13",
          Y400: "#FFB020",
          Y300: "#FFD079",
          Y200: "#FFDFA6",
          Y100: "#FFEFD2",
          Y50: "#FFFAF1"
        },
        green: {
          G600: "#317159",
          G500: "#429777",
          G400: "#52BD94",
          G300: "#FFD079",
          G200: "#DCF2EA",
          G100: "#FFEFD2",
          G50: "#DCFCE7"
        },
        red: {
          R600: "#7D2828",
          R500: "#A73636",
          R400: "#e60000",
          R300: "#e60000",
          R200: "#F4B6B6",
          R100: "#F9DADA",
          R50: "#FDF4F4"
        },
        blue: {
          B600: "#1F3D99",
          B500: "#2952CC",
          B400: "#3366FF",
          B300: "#9DB5FF",
          B200: "#D6E0FF",
          B100: "#EBF0FF",
          B50: "#F3F6FF"
        },
        violet: {
          V600: "#524988",
          V500: "#6E62B6",
          V400: "#897AE3",
          V300: "#B8AFEE",
          V200: "#D0CAF4",
          V100: "#E7E4F9",
          V50: "#F8F7FD"
        },
        teal: {
          T600: "#0F5156",
          T500: "#10899E",
          T400: "#25CBD6",
          T300: "#7CE0E6",
          T200: "#A8EAEF",
          T100: "#D3F5F7",
          T50: "#F2FCFD"
        },
        pink: {
          P600: "#8E3374",
          P500: "#BE449B",
          P400: "#ED55C2",
          P300: "#F499DA",
          P200: "#F8BBE7",
          P100: "#FBDDF3",
          P50: "#FEF5FB"
        }
      },

    },
  },
  plugins: [],
};
