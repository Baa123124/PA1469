import { Button } from "./ui/button"
import React, { useState } from "react"
import { LucideProps } from "lucide-react-native"
import { Platform, Pressable } from "react-native"
import { Href, router } from "expo-router"

type TabBarButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & {
  Icon: React.FC<LucideProps>
  focused?: boolean
  route: Href
}

export function TabBarButton({ Icon, focused, route, ...props }: TabBarButtonProps) {
  const [iconText, setIconText] = useState("text-foreground")
  const [btnBg, setBtnBg] = useState("")

  return (
    <Button
      variant="ghost"
      className={`
        rounded-full
        web:hover:bg-primary/10
        active:bg-primary/10
        ${focused ? "bg-primary/10" : ""}
        ${btnBg}
      `}
      onPress={() => router.push(route)}
      onHoverIn={() => setIconText("text-primary")}
      onHoverOut={() => setIconText("text-foreground")}
      onTouchStart={() => {
        setBtnBg("bg-primary/10")
        setIconText("text-primary")
      }}
      onTouchEnd={() => {
        setBtnBg("")
        setIconText("text-foreground")
      }}
      {...props}
    >
      <Icon
        size={24}
        className={`
          w-6
          h-6
          active:text-primary
          ${focused ? "text-primary" : ""}
          ${iconText}
        `}
        strokeWidth={1.25}
        {...(Platform.OS !== "web" ? { onPress: () => router.push(route) } : {})}
      />
    </Button>
  )
}
