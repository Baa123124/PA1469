import { Platform, View } from "react-native"
import { Button } from "./ui/button"
import { router } from "expo-router"
import { ArrowLeft } from "@/lib/icons/ArrowLeft"
import { cn } from "@/lib/utils"

type TopNavProps = {
  className?: string
  children?: React.ReactNode
}

export function TopNav({ className, children }: TopNavProps) {
  return (
    <View className={cn("flex-row justify-between items-center p-2", className)}>
      <Button
        variant="ghost"
        size="icon"
        onPress={() => {
          if (Platform.OS === "web") {
            window.history.back()
          } else {
            router.back()
          }
        }}
      >
        <ArrowLeft size={16} strokeWidth={1.25} />
      </Button>
      {children}
    </View>
  )
}
