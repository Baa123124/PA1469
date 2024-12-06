import { Text } from "@/components/ui/text"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { View } from "react-native"

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <Text>Profile</Text>
    </View>
  )
}
