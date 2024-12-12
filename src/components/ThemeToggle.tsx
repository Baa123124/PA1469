import AsyncStorage from "@react-native-async-storage/async-storage"
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar"
import { MoonStar } from "@/lib/icons/MoonStar"
import { Sun } from "@/lib/icons/Sun"
import { useColorScheme } from "@/lib/useColorScheme"
import { Button, ButtonProps, ButtonRef } from "./ui/button"
import * as React from "react"

const ThemeToggle = React.forwardRef<ButtonRef, ButtonProps>(({ ...props }, ref) => {
  const { isDarkColorScheme, setColorScheme } = useColorScheme()
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onPress={() => {
        const newTheme = isDarkColorScheme ? "light" : "dark"
        setColorScheme(newTheme)
        setAndroidNavigationBar(newTheme)
        AsyncStorage.setItem("theme", newTheme)
      }}
      {...props}
    >
      {isDarkColorScheme ? (
        <MoonStar size={16} strokeWidth={1.25} />
      ) : (
        <Sun size={16} strokeWidth={1.25} />
      )}
    </Button>
  )
})
ThemeToggle.displayName = "ThemeToggle"

export { ThemeToggle }