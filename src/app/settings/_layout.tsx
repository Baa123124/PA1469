import ProtectedScreen from "@/lib/auth/ProtectedScreen"
import { Stack } from "expo-router"

export default function SettingsLayout() {
  return (
    <ProtectedScreen>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="cache-range" />
        <Stack.Screen name="theme" />
        <Stack.Screen name="email" />
        <Stack.Screen name="password" />
      </Stack>
    </ProtectedScreen>
  )
}
