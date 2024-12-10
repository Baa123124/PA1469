import AsyncStorage from "@react-native-async-storage/async-storage"
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar"
import { MoonStar } from "@/lib/icons/MoonStar"
import { Sun } from "@/lib/icons/Sun"
import { useColorScheme } from "@/lib/useColorScheme"
import { Button } from "./ui/button"

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onPress={() => {
        const newTheme = isDarkColorScheme ? "light" : "dark"
        setColorScheme(newTheme)
        setAndroidNavigationBar(newTheme)
        AsyncStorage.setItem("theme", newTheme)
      }}
    >
      {isDarkColorScheme ? (
        <MoonStar size={16} strokeWidth={1.25} />
      ) : (
        <Sun size={16} strokeWidth={1.25} />
      )}
    </Button>
  )
}
