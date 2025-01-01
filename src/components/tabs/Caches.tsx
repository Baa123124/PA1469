import * as React from "react"
import { View, ViewProps } from "react-native"
import { cn } from "@/lib/utils"
import { Text } from "@/components/ui/text"
import { ViewRef } from "@rn-primitives/types"
import { ScrollView } from "react-native-gesture-handler"
import { AutoImage, AutoImageProps } from "@/components/AutoImage"
import { Badge } from "@/components/ui/badge"
import { Href, Link } from "expo-router"

const Caches = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("gap-8", className)} {...props} />
))
Caches.displayName = "Caches"

type CacheGroupProps = ViewProps & {
  name: string
}
const CacheGroup = React.forwardRef<ViewRef, CacheGroupProps>(
  ({ className, name, children, ...props }, ref) => (
    <View ref={ref} className={cn("gap-2", className)} {...props}>
      <Text className="w-full text-sm font-semibold text-primary">{name}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">{children}</View>
      </ScrollView>
    </View>
  ),
)
CacheGroup.displayName = "CacheGroup"

type CacheImageProps = AutoImageProps & {
  name: string
  href: Href
  maxHeight?: number
  children?: React.ReactNode
}
const CacheImage = React.forwardRef<
  React.ComponentPropsWithoutRef<typeof AutoImage>,
  CacheImageProps
>(({ className, name, href, maxHeight, children, ...props }, ref) => (
  <Link href={href}>
    <View>
      <AutoImage
        ref={ref}
        maxHeight={maxHeight}
        className={cn("max-w-full rounded-md", className)}
        {...props}
      />
      <Badge variant="secondary" className="absolute bottom-2 left-2" asChild>
        <Link href={href}>
          <Text>{name}</Text>
        </Link>
      </Badge>
      {children}
    </View>
  </Link>
))
CacheImage.displayName = "CacheImage"

export { Caches, CacheGroup, CacheImage }
export type { CacheGroupProps, CacheImageProps }
