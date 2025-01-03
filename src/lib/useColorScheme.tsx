import { useColorScheme as useNativewindColorScheme } from "nativewind"

/**
 * React hook to get the color scheme from Expo's ColorScheme.
 *
 * @returns {Object} An object containing:
 * - `colorScheme` {string} - The current color scheme, defaults to 'dark' if none is set.
 * - `isDarkColorScheme` {boolean} - A boolean indicating whether the current color scheme is 'dark'.
 * - `setColorScheme` {Function} - A function to explicitly set the color scheme.
 * - `toggleColorScheme` {Function} - A function to toggle between 'light' and 'dark' color schemes.
 */
export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme()
  return {
    colorScheme: colorScheme ?? "dark",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  }
}
