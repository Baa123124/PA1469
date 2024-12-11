import { TextProps, View, ViewProps } from "react-native"
import { Button } from "./ui/button"
import { ArrowLeft } from "@/lib/icons/ArrowLeft"
import { cn } from "@/lib/utils"
import { goBack } from "@/lib/goBack"
import * as React from "react"
import { TextRef, ViewRef } from "@rn-primitives/types"
import { Text } from "./ui/text"

const TopNav = React.forwardRef<ViewRef, ViewProps>(({ className, children, ...props }, ref) => (
  <View ref={ref} className={cn("flex-row items-center p-2 gap-4", className)} {...props}>
    <Button
      variant="ghost"
      size="icon"
      onPress={() => {
        goBack()
      }}
    >
      <ArrowLeft size={16} strokeWidth={1.25} />
    </Button>
    {children}
  </View>
))
TopNav.displayName = "TopNav"

const TopNavRoute = React.forwardRef<TextRef, TextProps>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn("font-semibold text-xl", className)} {...props} />
))
TopNavRoute.displayName = "TopNavRoute"

export { TopNav, TopNavRoute }
