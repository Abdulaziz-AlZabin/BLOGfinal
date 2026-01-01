import { SchemeType } from "src/types"

export const lightColors = {
  gray1: "#fcfcfc",
  gray2: "#f8f8f8",
  gray3: "#f0f0f0",
  gray4: "#e8e8e8",
  gray5: "#e0e0e0",
  gray6: "#d0d0d0",
  gray7: "#b0b0b0",
  gray8: "#909090",
  gray9: "#707070",
  gray10: "#505050",
  gray11: "#303030",
  gray12: "#101010",
  // Accent colors
  primary: "#6366f1",
  primaryHover: "#4f46e5",
  secondary: "#ec4899",
  accent: "#06b6d4",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
}

export const darkColors = {
  gray1: "#0a0a0b",
  gray2: "#111113",
  gray3: "#18181b",
  gray4: "#1f1f23",
  gray5: "#27272a",
  gray6: "#3f3f46",
  gray7: "#52525b",
  gray8: "#71717a",
  gray9: "#a1a1aa",
  gray10: "#d4d4d8",
  gray11: "#e4e4e7",
  gray12: "#fafafa",
  // Accent colors
  primary: "#818cf8",
  primaryHover: "#a5b4fc",
  secondary: "#f472b6",
  accent: "#22d3ee",
  success: "#4ade80",
  warning: "#fbbf24",
  error: "#f87171",
}

export type Colors = typeof lightColors

type Theme = {
  scheme: SchemeType
  colors: Colors
}

export const createTheme = ({ scheme }: { scheme: SchemeType }): Theme => {
  return {
    scheme,
    colors: scheme === "light" ? lightColors : darkColors,
  }
}
