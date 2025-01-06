import { DarkTheme, DefaultTheme } from "@react-navigation/native"

const theme = {
  light: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(240 10% 3.9%)",
    card: "hsl(0 0% 100%)",
    cardForeground: "hsl(240 10% 3.9%)",
    popover: "hsl(0 0% 100%)",
    popoverForeground: "hsl(240 10% 3.9%)",
    primary: "hsl(157.45 82.09% 39.41%)",
    primaryShadcn: "hsl(240 5.9% 10%)",
    primaryForeground: "hsl(0 0% 98%)",
    secondary: "hsl(240 4.8% 95.9%)",
    secondaryForeground: "hsl(240 5.9% 10%)",
    muted: "hsl(240 4.8% 95.9%)",
    mutedForeground: "hsl(240 3.8% 46.1%)",
    accent: "hsl(240 4.8% 95.9%)",
    accentForeground: "hsl(240 5.9% 10%)",
    destructive: "hsl(0 84.2% 60.2%)",
    destructiveForeground: "hsl(0 0% 98%)",
    border: "hsl(240 5.9% 90%)",
    input: "hsl(240 5.9% 90%)",
    ring: "hsl(240 5.9% 10%)",
  },
  dark: {
    background: "hsl(240 10% 3.9%)",
    foreground: "hsl(0 0% 98%)",
    card: "hsl(240 10% 3.9%)",
    cardForeground: "hsl(0 0% 98%)",
    popover: "hsl(240 10% 3.9%)",
    popoverForeground: "hsl(0 0% 98%)",
    primary: "hsl(155.61 62.75% 51.57%)",
    primaryShadcn: "hsl(0 0% 98%)",
    primaryForeground: "hsl(240 5.9% 10%)",
    secondary: "hsl(240 3.7% 15.9%)",
    secondaryForeground: "hsl(0 0% 98%)",
    muted: "hsl(240 3.7% 15.9%)",
    mutedForeground: "hsl(240 5% 64.9%)",
    accent: "hsl(240 3.7% 15.9%)",
    accentForeground: "hsl(0 0% 98%)",
    destructive: "hsl(0 72% 51%)",
    destructiveForeground: "hsl(0 0% 98%)",
    border: "hsl(240 3.7% 15.9%)",
    input: "hsl(240 3.7% 15.9%)",
    ring: "hsl(240 4.9% 83.9%)",
  },
}

const navTheme = {
  light: {
    background: theme.light.background,
    border: theme.light.border,
    card: theme.light.card,
    notification: theme.light.destructive,
    primary: theme.light.primary,
    text: theme.light.foreground,
  },
  dark: {
    background: theme.dark.background,
    border: theme.dark.border,
    card: theme.dark.card,
    notification: theme.dark.destructive,
    primary: theme.dark.primary,
    text: theme.dark.foreground,
  },
}

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...navTheme.light,
    ...theme.light,
  },
}

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...navTheme.dark,
    ...theme.dark,
  },
}

export { theme, lightTheme, darkTheme, navTheme }
export type Theme = typeof lightTheme & typeof darkTheme
export type LightTheme = typeof lightTheme
export type DarkTheme = typeof darkTheme
export type NavTheme = typeof navTheme
