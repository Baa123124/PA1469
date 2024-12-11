import { Stack } from "expo-router"

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="cache-range" /> */}
      {/* <Stack.Screen name="theme" /> */}
      <Stack.Screen name="email" />
      {/* <Stack.Screen name="password" /> */}
    </Stack>
  )
}
