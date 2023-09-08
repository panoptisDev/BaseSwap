import { Colors } from "./types";

export const baseColors = {
  failure: "#0154FE",
  primary: "#0154FE",
  primaryBright: "#53DEE9",
  primaryDark: "#0098A1",
  secondary: "#333",
  success: "#0154FE",
  warning: "#FFB237",
  orange: "#FC8A17",

};

export const additionalColors = {
  binance: "#F0B90B",
  overlay: "#452a7a",
  gold: "#FFC700",
  silver: "#B2B2B2",
  bronze: "#E7974D",
};

export const lightColors: Colors = {
  ...baseColors,
  ...additionalColors,
  background: "#FAF9FA",
  backgroundDisabled: "#E9EAEB",
  backgroundAlt: "#FFFFFF",
  backgroundAlt2: "rgba(255, 255, 255, 0.7)",
  cardBorder: "#E7E3EB",
  contrast: "#191326",
  dropdown: "#F6F6F6",
  dropdownDeep: "#EEEEEE",
  invertedContrast: "#FFFFFF",
  input: "#eeeaf4",
  inputSecondary: "#d7caec",
  tertiary: "#EFF4F5",
  text: "#280D5F",
  textDisabled: "#BDC2C4",
  textSubtle: "#7A6EAA",
  disabled: "#E9EAEB",
  gradients: {
    basedsex: "linear-gradient(to bottom,  #020079 0%, #0154FD 100%)",
    basedsexdark: "linear-gradient(#020079 0%, #0154FD 100%)",
    basedsexgray: "linear-gradient(to bottom, #000, #222)",
    basedsexgrayflip: "linear-gradient(to top, #000, #222)",
    pagebg: "linear-gradient(to bottom, #000, #222)",
    basedsex1: "linear-gradient(270deg, #111, #0154FD)",

    bubblegum: "linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)",
    inverseBubblegum: "linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)",
    cardHeader: "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
    blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
    violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
    violetAlt: "linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
};

export const darkColors: Colors = {
  ...baseColors,
  ...additionalColors,
  secondary: "#ccc",
  background: "#0154FE",
  backgroundDisabled: "#333",
  backgroundAlt: "#111",
  backgroundAlt2: "#020079",
  cardBorder: "#0154FE",
  contrast: "#FFFFFF",
  dropdown: "#111",
  dropdownDeep: "#1E2025",
  invertedContrast: "#191326",
  input: "#333",
  inputSecondary: "#262130",
  primaryDark: "#0098A1",
  tertiary: "#0154FE",
  text: "#fff",
  textDisabled: "#666171",
  textSubtle: "#fff",
  disabled: "#333",
  gradients: {
    basedsex: "linear-gradient(to bottom,  #020079 0%, #0154FD, 90%, #ccc 100%)",
    basedsex1: "linear-gradient(to bottom, #111 90%, #0154FD)",

    basedsexdark: "conic-gradient(from 270deg, #0154FD90, #ffffff90 )",
    basedsexgray: "linear-gradient(to bottom, #000 20%, #111)",
    pagebg: "linear-gradient( to right, #000, #111)",

    basedsexgrayflip: "linear-gradient(to top, #000, #222)",

    bubblegum: "linear-gradient(to bottom,  #020079 0%, #0154FD, #ccc 100%)",
    inverseBubblegum: "linear-gradient(139.73deg, #0154FD 0%, #ccc 100%)",
    cardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
    blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
    violet: "linear-gradient(180deg, #0154FD 0%, #ccc 100%)",
    violetAlt: "linear-gradient(180deg, #0154FD 0%, #ccc 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
};
