import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import MapScreen from "@/components/GoogleMaps" // <-- Your Google Maps component

import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { useAuth } from "@/lib/auth/AuthContext"
import { TopNav, TopNavSettingsButton } from "@/components/TopNav"
import { dummyCache, dummyCache2, dummyCache3, dummyUser } from "@/lib/dummyUser"
import { CacheSearchBar } from "@/components/tabs/map/CacheSearchBar"
import { Button } from "@/components/ui/button"
import { Compass } from "@/lib/icons/Compass"
import { MapPinPlus } from "@/lib/icons/MapPinPlus"
import { Play } from "@/lib/icons/Play"
import { Pause } from "@/lib/icons/Pause"
import { Badge } from "@/components/ui/badge"
import { Text } from "@/components/ui/text"
import { formatDistance } from "@/utils/formatDistance"
import { ThemeToggle } from "@/components/ThemeToggle"
import { CacheReachedDialog } from "@/components/tabs/map/CacheReachedDialog"
import { ReviewCacheDialog } from "@/components/tabs/map/ReviewCacheDialog"
import { SaveCacheDialog } from "@/components/tabs/map/SaveCacheDialog"
import { NewCacheDialog } from "@/components/tabs/map/NewCacheDialog"

import { LatLng } from "react-native-maps"

export default function MergedMapScreen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuth()

  const [selectedCacheId, setSelectedCacheId] = useState<string>("")
  const [goalReached, setGoalReached] = useState<boolean>(false)
  const [distanceToGoal, setDistanceToGoal] = useState<number | null>(null)

  // ----- State for the overlay UI -----
  const [walkActive, setWalkActive] = useState(false)
  const [cacheReachedOpen, setCacheReachedOpen] = useState(false)
  const [saveCacheOpen, setSaveCacheOpen] = useState(false)
  const [reviewCacheOpen, setReviewCacheOpen] = useState(false)
  const [newCacheOpen, setNewCacheOpen] = useState(false)
  const [addingCache, setAddingCache] = useState(false)
  const [newCacheCoord, setNewCacheCoord] = useState<LatLng | null>(null)

  useEffect(() => {
    AsyncStorage.getItem("selectedCacheId").then((cacheId) => {
      if (cacheId) {
        setWalkActive(true)
        setSelectedCacheId(cacheId)
      }
    })
  }, [])

  useEffect(() => {
    if (goalReached) {
      setCacheReachedOpen(true)
    }
  }, [goalReached])

  /**
   * Replace the old mock data with the new dummy caches.
   * Each dummyCache has its own coordinates and properties;
   */
  const allCachesInit = [dummyCache, dummyCache2, dummyCache3]

  // List of cache IDs to display
  const displayCaches = allCachesInit.map((cache) => cache.id)

  const cachesForSearch = [dummyCache, dummyCache2, dummyCache3]
  const data = cachesForSearch.map((c) => ({
    label: c.data.name,
    value: c.id,
    distance: 12000,
  }))

  const newMarkerCoord = (coord: LatLng) => {
    setNewCacheCoord(coord)
  }

  return (
    <View style={styles.root}>
      <View style={StyleSheet.absoluteFill}>
        <MapScreen
          allCaches={allCachesInit}
          displayCaches={displayCaches}
          selectedGoToCacheId={selectedCacheId}
          setSelectedGoToCacheId={setSelectedCacheId}
          goalReached={goalReached}
          setGoalReached={setGoalReached}
          setDistanceToGoal={setDistanceToGoal}
          addingCache={addingCache}
          getNewCacheCoord={newMarkerCoord}
        />
      </View>


      {/*
        2) Overlays on top
           Absolute-positioned elements and dialogs
      */}
      <View className="flex-1" style={useSafeAreaInsetsStyle(["top"])} pointerEvents="box-none">
        {/* Top Nav + Settings Button + Search */}
        {!addingCache && (
          <TopNav className="absolute gap-2" style={{ top: insets.top }}>
            <CacheSearchBar data={data} />
            <TopNavSettingsButton variant="outline" className="static" />
          </TopNav>
        )}

        {/* Bottom Center: Walk Start/Stop Button */}
        {!addingCache && (
          <View className="absolute bottom-4 items-center justify-center gap-2 self-center">
            {walkActive && distanceToGoal && (
              <Badge variant="secondary">
                <Text>{formatDistance(distanceToGoal)}</Text>
              </Badge>
            )}
            <Button
              className="items-center justify-center self-center rounded-full !px-[16px] !py-8"
              onPress={() => {
                if (walkActive) {
                  // Stop walk
                  setWalkActive(false)
                  AsyncStorage.setItem("selectedCacheId", "")
                } else {
                  // Start walk
                  {
                    /* Selects random cache within specified distance */
                  }
                  if (dummyUser.settings.discoveryMode) {
                    AsyncStorage.setItem("selectedCacheId", dummyCache.id)
                    setSelectedCacheId(dummyCache.id)
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
        )}

        {/* Bottom Right: Compass + New Cache Button */}
        <View className="absolute bottom-4 right-4 gap-2">
          {!addingCache ? (
            <>
              <Button
                variant="outline"
                size="icon"
                onPress={() => {
                  /* Toggle map compass? */
                }}
              >
                <Compass size={16} strokeWidth={1.25} />
              </Button>
              <Button variant="outline" size="icon" onPress={() => setAddingCache(true)}>
                <MapPinPlus size={16} strokeWidth={1.25} />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="icon"
                onPress={() => {
                  setAddingCache(false)
                  setNewCacheOpen(true)
                }}
              >
                <Text style={{ color: "white" }}>Add</Text>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onPress={() => {
                  setAddingCache(false)
                }}
              >
                <Text style={{ color: "white" }}>Exit</Text>
              </Button>
            </>
          )}
        </View>

        {/* New Cache Dialog */}
        <NewCacheDialog open={newCacheOpen} setOpen={setNewCacheOpen} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
