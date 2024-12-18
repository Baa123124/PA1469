import React, { useState } from "react"
import { LucideProps } from "lucide-react-native"
import { Platform } from "react-native"
import { Href, router } from "expo-router"
import { Button, ButtonProps, ButtonRef } from "@/components/ui/button"

type TabBarButtonProps = ButtonProps & {
  icon: React.FC<LucideProps>
  focused?: boolean
  href: Href
}

const TabBarButton = React.forwardRef<ButtonRef, TabBarButtonProps>(
  ({ className, icon, focused, href, ...props }, ref) => {
    const Icon = icon
    const [iconText, setIconText] = useState("text-foreground")
    const [btnBg, setBtnBg] = useState("")

    return (
      <Button
        ref={ref}
        variant="ghost"
        className={`rounded-full active:bg-primary/10 web:hover:bg-primary/10 ${focused ? "bg-primary/10" : ""} ${btnBg} `}
        onPress={() => router.push(href)}
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
          className={`active:text-primary ${focused ? "text-primary" : ""} ${iconText} `}
          strokeWidth={1.25}
          {...(Platform.OS !== "web" ? { onPress: () => router.push(href) } : {})}
        />
      </Button>
    )
  },
)
TabBarButton.displayName = "TabBarButton"

export { TabBarButton, type TabBarButtonProps }
