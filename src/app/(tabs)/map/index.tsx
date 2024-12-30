import * as React from "react"
import { View } from "react-native"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAuth } from "@/lib/auth/AuthContext"
import { TopNav, TopNavSettingsButton } from "@/components/TopNav"
import { dummyCache, dummyCache2, dummyCache3, dummyUser } from "@/lib/dummyUser"
import { CacheSearchBar } from "@/components/tabs/map/CacheSearchBar"
import { Button } from "@/components/ui/button"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Compass } from "@/lib/icons/Compass"
import { MapPinPlus } from "@/lib/icons/MapPinPlus"
import { Play } from "@/lib/icons/Play"
import { Pause } from "@/lib/icons/Pause"
import { Badge } from "@/components/ui/badge"
import { Text } from "@/components/ui/text"
import { formatDistance } from "@/utils/formatDistance"
import { ThemeToggle } from "@/components/ThemeToggle"
import AsyncStorage from "@react-native-async-storage/async-storage"

// TODO: Add map
// TODO: Remove temporary theme toggle
// * Save selectedCacheId to AsyncStorage (local storage) when walk is started/stopped

export default function MapScreen() {
  const insets = useSafeAreaInsets()
  const { user, logout } = useAuth()
  const [walkActive, setWalkActive] = React.useState(false)

  React.useEffect(() => {
    AsyncStorage.getItem("selectedCacheId").then((cacheId) => {
      if (cacheId) {
        // TODO: Start walk
        setWalkActive(true)
      }
    })
  }, [])

  // TODO: Get all caches witin min and max range
  // TODO: Use geolib to get distance
  const caches = [dummyCache, dummyCache2, dummyCache3]
  const data = caches.map((cache) => ({
    label: cache.name,
    value: cache.id,
    distance: 12000,
    // distance: getDistance(cache.coordinates, dummyUser.coordinates),
    // distance: getPreciseDistance(cache.coordinates, dummyUser.coordinates), // slower but more accurate
  }))

  return (
    <View className="flex-1 bg-secondary/30" style={useSafeAreaInsetsStyle(["top"])}>
      <TopNav className="absolute gap-2" style={{ top: insets.top }}>
        <CacheSearchBar data={data} />
        <TopNavSettingsButton variant="outline" className="static" />
      </TopNav>

      <View className="absolute inset-0 items-center justify-center">
        <ThemeToggle />
      </View>

      <View className="absolute bottom-4 items-center justify-center gap-2 self-center">
        {walkActive && (
          <Badge variant="outline">
            <Text>{formatDistance(120)}</Text>
          </Badge>
        )}
        <Button
          className="items-center justify-center self-center rounded-full !px-[16px] !py-8"
          onPress={() => {
            if (walkActive) {
              // TODO: Start walk
              setWalkActive(false)
              AsyncStorage.setItem("selectedCacheId", "")
            } else {
              // TODO: Stop walk
              if (dummyUser.settings.discoveryMode) {
                // TODO: Select random walk
                AsyncStorage.setItem("selectedCacheId", dummyCache.id)
              }
              setWalkActive(true)
            }
          }}
          disabled={!walkActive && !dummyUser.settings.discoveryMode}
        >
          {walkActive ? (
            <Pause
              size={24}
              strokeWidth={1.25}
              className="fill-primary-foreground text-primary-foreground"
            />
          ) : (
            <Play
              size={24}
              strokeWidth={1.25}
              className="fill-primary-foreground text-primary-foreground"
            />
          )}
        </Button>
      </View>

      <View className="absolute bottom-4 right-4 gap-2">
        <Button
          variant="outline"
          size="icon"
          onPress={() => {
            // TODO: Toggle map compass thing if possible
          }}
        >
          <Compass size={16} strokeWidth={1.25} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onPress={() => {
            // TODO: Open new cache dialog
          }}
        >
          <MapPinPlus size={16} strokeWidth={1.25} />
        </Button>
      </View>
    </View>
  )
}
