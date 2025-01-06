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
  import { Keyboard, TextInputProps, LayoutChangeEvent, View } from "react-native"
  import {Cache} from "@/lib/dummyUser"

  // TODO: Link dropdown item to cache details
  // ? Make X button take precedence over dropdown menu closing (not sure how to do this)
  // ? Realised I could have probably just used a select instead of a dropdown menu, but whatever

  type CacheSearchBarProps = TextInputProps & {
    onUpdate: (searchInput: string) => void
    setSelectedCache: React.Dispatch<React.SetStateAction<Cache | null>>
    caches: Cache[]
  }

  const CacheSearchBar = React.forwardRef<InputRef, CacheSearchBarProps>(
    ({ className, onUpdate, setSelectedCache, caches, ...props }, ref) => {
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
          {caches
            .filter((item) => item.data.name.toLowerCase().includes(value.toLowerCase()))
            .map((item) => (
              <DropdownMenuItem
                key={item.id}
                  onPress={() => {
                  setSelectedCache(item);
                  setValue(item.data.name);
                  Keyboard.dismiss();
                }}
              >
                <Text className="pl-4">{item.data.name}</Text>
                <ChevronRight size={16} strokeWidth={1.25} style={{ marginLeft: "auto" }} />
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  )
  CacheSearchBar.displayName = "CacheSearchBar"

  export { CacheSearchBar }
