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
  // Tech colors
  neon: "#00ff41",
  neonGlow: "rgba(0, 255, 65, 0.15)",
  cyber: "#00d9ff",
  cyberGlow: "rgba(0, 217, 255, 0.15)",
  purple: "#b744ff",
  purpleGlow: "rgba(183, 68, 255, 0.15)",
}

export const darkColors = {
  gray1: "#0a0a0b",
  gray2: "#0f0f12",
  gray3: "#18181b",
  gray4: "#1f1f24",
  gray5: "#27272e",
  gray6: "#3f3f46",
  gray7: "#52525b",
  gray8: "#71717a",
  gray9: "#a1a1aa",
  gray10: "#d4d4d8",
  gray11: "#e4e4e7",
  gray12: "#fafafa",
  // Tech accent colors - toned down
  primary: "#00ff41",
  primaryHover: "#00cc33",
  secondary: "#b744ff",
  accent: "#00d9ff",
  success: "#4ade80",
  warning: "#fbbf24",
  error: "#ff2e63",
  // Tech colors with reduced glow
  neon: "#00ff41",
  neonGlow: "rgba(0, 255, 65, 0.15)",
  cyber: "#00d9ff",
  cyberGlow: "rgba(0, 217, 255, 0.12)",
  purple: "#b744ff",
  purpleGlow: "rgba(183, 68, 255, 0.12)",
  // Background gradients
  bgGradientStart: "#0a0a0b",
  bgGradientEnd: "#1a0a2e",
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
