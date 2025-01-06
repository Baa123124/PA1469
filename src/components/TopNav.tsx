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

/**
 * A container component for the top navigation bar.
 *
 * This component serves as a wrapper for other elements in the top navigation bar,
 * providing a layout with spacing and alignment for the navigation buttons and route text.
 *
 * @child TopNavBackButton
 * @child TopNavSettingsButton
 * @child TopNavRoute
 * @param {ViewProps} props - Props passed to a `View` component.
 */
const TopNav = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("w-full flex-row items-center gap-4 p-2", className)} {...props} />
))
TopNav.displayName = "TopNav"

/**
 * A button component for navigating back in the application.
 *
 * @parent TopNav
 * @param {ButtonProps} props - Props passed to a `Button` component.
 */
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

/**
 * A button component that links to the settings page.
 *
 * @parent TopNav
 * @param {ButtonProps} props - Props passed to a `Button` component.
 */
const TopNavSettingsButton = React.forwardRef<ButtonRef, ButtonProps>(({ ...props }, ref) => (
  <Link href="/settings" asChild>
    <Button ref={ref} variant="ghost" size="icon" {...props}>
      <Settings size={16} strokeWidth={1.25} />
    </Button>
  </Link>
))
TopNavSettingsButton.displayName = "TopNavSettingsButton"

/**
 * A text component to display the current route or screen title in the top navigation.
 *
 * @parent TopNav
 * @param {TextProps} props - Props passed to a `Text` component.
 */
const TopNavRoute = React.forwardRef<TextRef, TextProps>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn("text-xl font-semibold", className)} {...props} />
))
TopNavRoute.displayName = "TopNavRoute"

export { TopNav, TopNavRoute, TopNavBackButton, TopNavSettingsButton }
