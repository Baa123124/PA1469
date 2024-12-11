import { router } from "expo-router"
import { Platform } from "react-native"

export function goBack(): void {
  Platform.OS === "web" ? window.history.back() : router.back()
}
