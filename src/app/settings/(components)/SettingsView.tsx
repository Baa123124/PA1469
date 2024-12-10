import React, { useState } from "react"
import { LucideProps } from "lucide-react-native"
import { Platform, View } from "react-native"
import { ChevronRight } from "@/lib/icons/ChevronRight"
import { cn } from "@/lib/utils"
import { Href, Link } from "expo-router"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Switch } from "@/components/ui/switch"

type SettingsLabelProps = {
  className?: string
  icon: React.FC<LucideProps>
  name: string
  text?: string
  href?: Href | string
  switchProps?: React.ComponentPropsWithoutRef<typeof Switch>
}

function SettingsLabel({ className, icon, name, text, href, switchProps }: SettingsLabelProps) {
  const Icon = icon
  const _href = (href as Href) ?? "/"
  const isText = text !== undefined
  const [checked, setChecked] = useState(switchProps?.checked ?? false)

  return isText ? (
    <Link href={_href} asChild>
      <Button variant="ghost" className={cn("flex-row justify-between w-full px-6", className)}>
        <View className="flex-row gap-2 items-center">
          <Icon size={16} strokeWidth={1.25} />
          <Text>{name}</Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <Text className="text-muted-foreground text-sm group-active:text-muted-foreground">
            {text}
          </Text>
          <ChevronRight size={16} strokeWidth={1.25} className="text-muted-foreground" />
        </View>
      </Button>
    </Link>
  ) : (
    <Button
      variant="ghost"
      className={cn("flex-row justify-between w-full px-6", className)}
      onPress={() => setChecked(!checked)}
    >
      <View className="flex-row gap-2 items-center">
        <Icon size={16} strokeWidth={1.25} />
        <Text>{name}</Text>
      </View>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </Button>
  )
}

type SettingsViewProps = {
  className?: string
  name: string
  children: React.ReactNode
}

function SettingsView({ className, name, children }: SettingsViewProps) {
  return (
    <View className={cn("gap-2 items-center", className)}>
      <Text
        className={`text-primary text-sm font-semibold w-full ${Platform.OS === "web" ? "pl-6" : "pl-5"}`}
      >
        {name}
      </Text>
      <View className="w-full">{children}</View>
    </View>
  )
}

export { SettingsView, SettingsLabel }
