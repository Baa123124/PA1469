import { TextProps, View, ViewProps } from "react-native"
import { Button, ButtonProps, ButtonRef } from "./ui/button"
import { ArrowLeft } from "@/lib/icons/ArrowLeft"
import { cn } from "@/lib/utils"
import { goBack } from "@/utils/goBack"
import * as React from "react"
import { TextRef, ViewRef } from "@rn-primitives/types"
import { Text } from "./ui/text"
import { Link } from "expo-router"
import { Settings } from "@/lib/icons/Settings"

const TopNav = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("w-full flex-row items-center gap-4 p-2", className)} {...props} />
))
TopNav.displayName = "TopNav"

const TopNavBackButton = React.forwardRef<ButtonRef, ButtonProps>(({ ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="icon"
    onPress={() => {
      goBack()
    }}
    {...props}
  >
    <ArrowLeft size={16} strokeWidth={1.25} />
  </Button>
))
TopNavBackButton.displayName = "TopNavBackButton"

const TopNavSettingsButton = React.forwardRef<ButtonRef, ButtonProps>(({ ...props }, ref) => (
  <Link href="/settings" asChild>
    <Button ref={ref} variant="ghost" size="icon" {...props}>
      <Settings size={16} strokeWidth={1.25} />
    </Button>
  </Link>
))
TopNavSettingsButton.displayName = "TopNavSettingsButton"

const TopNavRoute = React.forwardRef<TextRef, TextProps>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn("text-xl font-semibold", className)} {...props} />
))
TopNavRoute.displayName = "TopNavRoute"

export { TopNav, TopNavRoute, TopNavBackButton, TopNavSettingsButton }
