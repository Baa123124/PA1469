import * as React from "react"
import { LucideProps } from "lucide-react-native"
import { Platform, View, ViewProps } from "react-native"
import { ChevronRight } from "@/lib/icons/ChevronRight"
import { cn } from "@/lib/utils"
import { Href, Link } from "expo-router"
import { Button, ButtonProps, ButtonRef } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Switch } from "@/components/ui/switch"
import { ViewRef } from "@rn-primitives/types"

const Settings = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("gap-8", className)} {...props} />
))
Settings.displayName = "Settings"

type SettingsGroupProps = ViewProps & {
  name: string
}

const SettingsGroup = React.forwardRef<ViewRef, SettingsGroupProps>(
  ({ className, name, children, ...props }, ref) => (
    <View ref={ref} className={cn("gap-2 items-center", className)} {...props}>
      <Text
        className={`text-primary text-sm font-semibold w-full ${Platform.OS === "web" ? "pl-6" : "pl-5"}`}
      >
        {name}
      </Text>
      <View className="w-full">{children}</View>
    </View>
  ),
)
SettingsGroup.displayName = "SettingsGroup"

type BaseSettingsFieldProps = ButtonProps & {
  icon: React.FC<LucideProps>
  name: string
  type?: "link" | "switch"
}
type LinkSettingsFieldProps = BaseSettingsFieldProps & {
  type?: "link"
  value?: string
  href: Href
  checked?: never
  setChecked?: never
}
type SwitchSettingsFieldProps = BaseSettingsFieldProps & {
  type: "switch"
  value?: never
  href?: never
  checked: boolean
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
}
type SettingsFieldProps = LinkSettingsFieldProps | SwitchSettingsFieldProps

const SettingsField = React.forwardRef<ButtonRef, SettingsFieldProps>(
  ({ className, icon, name, type = "link", value = "", ...props }, ref) => {
    const Icon = icon

    if (type === "link") {
      const { href } = props as LinkSettingsFieldProps
      return (
        <Link href={href} asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn("flex-row justify-between w-full px-6", className)}
            {...props}
          >
            <View className="flex-row gap-2 items-center">
              <Icon size={16} strokeWidth={1.25} />
              <Text>{name}</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Text className="text-muted-foreground text-sm font-normal group-active:text-muted-foreground">
                {value}
              </Text>
              <ChevronRight size={16} strokeWidth={1.25} className="text-muted-foreground" />
            </View>
          </Button>
        </Link>
      )
    }

    const { checked, setChecked } = props as SwitchSettingsFieldProps
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn("flex-row justify-between w-full px-6", className)}
        onPress={() => setChecked(!checked)}
        {...props}
      >
        <View className="flex-row gap-2 items-center">
          <Icon size={16} strokeWidth={1.25} />
          <Text>{name}</Text>
        </View>
        <Switch checked={checked} onCheckedChange={setChecked} />
      </Button>
    )
  },
)
SettingsField.displayName = "SettingsField"

export { Settings, SettingsGroup, SettingsField }
export {
  type SettingsGroupProps,
  type SettingsFieldProps,
  type BaseSettingsFieldProps,
  type LinkSettingsFieldProps,
  type SwitchSettingsFieldProps,
}
