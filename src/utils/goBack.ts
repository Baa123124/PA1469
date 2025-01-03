import { router } from "expo-router"
import { Platform } from "react-native"

/**
 * Return to the previous screen.
 */
export function goBack(): void {
  Platform.OS === "web" ? window.history.back() : router.back()
}
