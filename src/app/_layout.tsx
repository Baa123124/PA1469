import "../../global.css"
import { useInitialRootStore } from "@/models"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { lightTheme, darkTheme } from "@/lib/constants"
import { useColorScheme } from "@/lib/useColorScheme"
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar"
import { useEffect, useState } from "react"
import { Slot, SplashScreen } from "expo-router"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { ThemeProvider } from "@react-navigation/native"
import { Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StatusBar } from "expo-status-bar"
import { PortalHost } from "@rn-primitives/portal"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { dummyUser } from "@/lib/dummyUser"
import { AuthProvider } from "@/lib/auth/AuthContext"
import Toast from "react-native-toast-message"
import { toastConfig } from "@/components/ui/toast"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  // Wait for stores to load and render our layout inside of it so we have access
  // to auth info etc
  const { rehydrated } = useInitialRootStore()

  // colorScheme: light | dark = current system color theme
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      loadDateFnsLocale()

      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background")
      }

      // theme: light | dark | system = stored user preference
      const theme = dummyUser.theme // default is system

      // If new user, set theme to system
      if (!theme) {
        AsyncStorage.setItem("theme", "system")
        setColorScheme(colorScheme)
        setAndroidNavigationBar(colorScheme)
        setIsColorSchemeLoaded(true)
        return
      }

      // If recccuring user, set theme to stored user preference
      // User preference takes precedence over system
      const colorTheme = theme === "system" ? colorScheme : theme
      setColorScheme(colorTheme)
      setAndroidNavigationBar(colorTheme)
      setIsColorSchemeLoaded(true)
    })().finally(() => {
      SplashScreen.hideAsync()
    })
  }, [])

  const loaded = rehydrated && isColorSchemeLoaded

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? darkTheme : lightTheme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <AuthProvider>
              <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
              <Slot />
              <PortalHost />
              <Toast config={toastConfig(isDarkColorScheme ? darkTheme : lightTheme)} />
            </AuthProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
