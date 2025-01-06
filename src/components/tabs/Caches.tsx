import * as React from "react"
import { View, ViewProps } from "react-native"
import { cn } from "@/lib/utils"
import { Text } from "@/components/ui/text"
import { ViewRef } from "@rn-primitives/types"
import { ScrollView } from "react-native-gesture-handler"
import { AutoImage, AutoImageProps } from "@/components/AutoImage"
import { Badge } from "@/components/ui/badge"
import { Href, Link } from "expo-router"

/**
 * A container component for stacking multiple `CacheGroup` components.
 *
 * @child CacheGroup
 * @param {ViewProps} props - Props passed to a `View` component.
 */
const Caches = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("gap-8", className)} {...props} />
))
Caches.displayName = "Caches"

type CacheGroupProps = ViewProps & {
  name: string
}
/**
 * A container component for a group of cache items.
 *
 * This component is used to group cache items with a title and a horizontal scrollable list of cache elements.
 *
 * @parent Caches
 * @child CacheImage
 * @param {string} name - The name of the cache group.
 * @param {CacheGroupProps} props - Props passed to a `View` component.
 */
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
/**
 * A component that renders an image with a link and displaying a badge with the cache item's name.
 *
 * @param {CacheImageProps} props - Props passed to the `AutoImage` component.
 * @param {string} name - The name of the cache item.
 * @param {Href} href - The link destination for the cache item.
 * @param {number} maxHeight - Optional maximum height for the image.
 */
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
