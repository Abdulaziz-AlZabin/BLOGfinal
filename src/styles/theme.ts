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
  // Professional accent colors
  primary: "#3b82f6",
  primaryHover: "#2563eb",
  secondary: "#8b5cf6",
  accent: "#06b6d4",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  // Muted tech colors
  neon: "#10b981",
  neonGlow: "rgba(16, 185, 129, 0.08)",
  cyber: "#3b82f6",
  cyberGlow: "rgba(59, 130, 246, 0.08)",
  purple: "#8b5cf6",
  purpleGlow: "rgba(139, 92, 246, 0.08)",
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
  // Professional muted colors
  primary: "#10b981",
  primaryHover: "#059669",
  secondary: "#8b5cf6",
  accent: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  // Subtle professional accents
  neon: "#10b981",
  neonGlow: "rgba(16, 185, 129, 0.08)",
  cyber: "#3b82f6",
  cyberGlow: "rgba(59, 130, 246, 0.08)",
  purple: "#8b5cf6",
  purpleGlow: "rgba(139, 92, 246, 0.08)",
  // Background
  bgGradientStart: "#0a0a0b",
  bgGradientEnd: "#111113",
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
