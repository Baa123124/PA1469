  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input, InputRef } from "@/components/ui/input"
  import { Text } from "@/components/ui/text"
  import { MapPin } from "@/lib/icons/MapPin"
  import { Search } from "@/lib/icons/Search"
  import { X } from "@/lib/icons/X"
  import { cn } from "@/lib/utils"
  import { formatDistance } from "@/utils/formatDistance"
  import { Link } from "expo-router"
  import { ChevronRight } from "lucide-react-native"
  import React, { useState, useEffect } from "react";
  import { TextInputProps, LayoutChangeEvent, View } from "react-native"

  // TODO: Link dropdown item to cache details
  // ? Make X button take precedence over dropdown menu closing (not sure how to do this)
  // ? Realised I could have probably just used a select instead of a dropdown menu, but whatever

  type CacheSearchBarProps = TextInputProps & {
    onUpdate: (searchInput: string) => void
    data: { label: string; value: string; distance: number }[]
  }

  const CacheSearchBar = React.forwardRef<InputRef, CacheSearchBarProps>(
    ({ className, onUpdate, data, ...props }, ref) => {
      const [inputWidth, setInputWidth] = React.useState<number | undefined>(undefined)
      const [value, setValue] = React.useState<string>("")

      useEffect(() => {
        onUpdate(value)
      }, [value])

      function onInputLayout(event: LayoutChangeEvent) {
        const { width } = event.nativeEvent.layout
        setInputWidth(width)
      }

      return (
        <DropdownMenu className="flex-1">
          <View className="relative w-full flex-row items-center">
            <DropdownMenuTrigger asChild>
              <Input
                ref={ref}
                placeholder="Search caches..."
                className={cn("w-full", className)}
                inputMode="text"
                style={{ paddingLeft: 36 }}
                onLayout={onInputLayout}
                value={value}
                onChangeText={(v) => setValue(v)}
                {...props}
              />
            </DropdownMenuTrigger>
            <Search
              size={16}
              strokeWidth={1.25}
              className="absolute text-muted-foreground"
              style={{ left: 12 }}
            />
            {value.length !== 0 && (
              <X
                size={16}
                strokeWidth={1.25}
                className="absolute"
                style={{ right: 12 }}
                onPress={() => setValue("")}
              />
            )}
          </View>
          <DropdownMenuContent style={{ width: inputWidth }}>
            {data
              .filter((item) => item.label.toLowerCase().includes(value.toLowerCase()))
              .map((item, index) => (
                <Link href="/" asChild key={index}>
                  <DropdownMenuItem>
                    <View className="items-center gap-1">
                      <MapPin size={16} strokeWidth={1.25} />
                      <Text className="!text-xs">{formatDistance(item.distance)}</Text>
                    </View>
                    <Text className="pl-4">{item.label}</Text>
                    <ChevronRight size={16} strokeWidth={1.25} style={{ marginLeft: "auto" }} />
                  </DropdownMenuItem>
                </Link>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  )
  CacheSearchBar.displayName = "CacheSearchBar"

  export { CacheSearchBar }
