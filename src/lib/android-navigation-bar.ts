import * as NavigationBar from "expo-navigation-bar"
import { Platform } from "react-native"
import { navTheme } from "@/lib/constants"

/**
 * Sets the Android navigation bar color and button style.
 *
 * @param theme - The color scheme to set the navigation bar to.
 */
export async function setAndroidNavigationBar(theme: "light" | "dark") {
  if (Platform.OS !== "android") return
  await NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark")
  await NavigationBar.setBackgroundColorAsync(
    theme === "dark" ? navTheme.dark.background : navTheme.light.background,
  )
}
