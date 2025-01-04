import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator, Platform } from "react-native"

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  UserLocationChangeEvent,
  LatLng,
  Region,
} from "react-native-maps"

import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import { getDistance } from "geolib"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { useColorScheme } from "@/lib/useColorScheme"
import CacheInfoModal from "@/components/CacheInfoModal"
import { RotateCw } from "@/lib/icons/RotateCw"
import { Button } from "./ui/button"

/** ---------- Types ---------- **/
type Review = {
  id: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  createdAt: Date
  photo: string
  userName: string
}

type CacheData = {
  creatorId: string
  name: string
  description: string
  photos: string[]
  tags: string[] // exclude
  rating: number
  views: number
  reviews: Review[]
}

interface Cache {
  id: string
  coordinates: {
    latitude: number
    longitude: number
  }
  data: CacheData
}

interface MapScreenProps {
  allCaches: Cache[]
  displayCaches: string[]
  selectedGoToCacheId: string
  setSelectedGoToCacheId: React.Dispatch<React.SetStateAction<string>>
  goalReached: boolean
  setGoalReached: React.Dispatch<React.SetStateAction<boolean>>
  setDistanceToGoal?: React.Dispatch<React.SetStateAction<number | null>>
  addingCache: boolean
  getNewCacheCoord: (coord: LatLng) => void
}

/** ---------- Constants ---------- **/
const darkModeMap = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64779e" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [{ color: "#334e87" }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#283d6a" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6f9ba5" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3C7680" }],
  },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2c6675" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#255763" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#b0d5ce" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#023e58" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [{ color: "#283d6a" }],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#3a4762" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4e6d70" }],
  },
]

const DEFAULT_REGION: Region = {
  latitude: 62.918161,
  longitude: 18.643501,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
}

const STORAGE_KEY = "mapRegion"

/** ---------- Component ---------- **/
const MapScreen: React.FC<MapScreenProps> = ({
  allCaches,
  displayCaches,
  selectedGoToCacheId,
  setSelectedGoToCacheId,
  goalReached,
  setGoalReached,
  setDistanceToGoal,
  addingCache,
  getNewCacheCoord,
}) => {
  /** ---------- Location / Region State ---------- **/
  const [region, setRegion] = useState<Region | null>(null)
  const [loadingMapRegion, setLoadingMapRegion] = useState(true)
  const [currentUserLocation, setCurrentUserLocation] = useState<LatLng | null>(null)

  /** ---------- Map Behavior / Data State ---------- **/
  const [mapKey, setMapKey] = useState(0)
  const [mapReady, setMapReady] = useState<boolean>(false)

  /** ---------- Cache States ---------- **/
  const [newMarkerPosition, setNewMarkerPosition] = useState<LatLng>({
    latitude: DEFAULT_REGION.latitude,
    longitude: DEFAULT_REGION.longitude,
  })
  const [selectedGoToCache, setSelectedGoToCache] = useState<Cache | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCache, setSelectedCache] = useState<Cache | null>(null)

  /** ---------- Permissions State ---------- **/
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false)

  /** ---------- Dark Mode ---------- **/
  const { isDarkColorScheme } = useColorScheme()

  /**
   * Load region from AsyncStorage or set default.
   * Runs only once on mount.
   */
  useEffect(() => {
    const initMapRegion = async () => {
      try {
        const savedRegionString = await AsyncStorage.getItem(STORAGE_KEY)
        if (savedRegionString) {
          const savedRegion: Region = JSON.parse(savedRegionString)
          setRegion(savedRegion)
        } else {
          setRegion(DEFAULT_REGION)
        }
      } catch (error) {
        console.log("Failed to load region from storage", error)
        setRegion(DEFAULT_REGION)
      } finally {
        setLoadingMapRegion(false)
      }
    }
    initMapRegion()
  }, [])

  /**
   * Whenever the user drags / zooms the map, update region and save to AsyncStorage.
   */
  const handleRegionChangeComplete = async (updatedRegion: Region) => {
    setRegion(updatedRegion)
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRegion))
    } catch (error) {
      console.log("Error saving region to AsyncStorage", error)
    }
  }

  /**
   * Watch for "addingCache" changes to set the position of the new marker
   * at either the user’s current location or default region.
   */
  useEffect(() => {
    if (addingCache) {
      setNewMarkerPosition(
        currentUserLocation || {
          latitude: DEFAULT_REGION.latitude,
          longitude: DEFAULT_REGION.longitude,
        },
      )
    }
  }, [addingCache])

  /**
   * Request (or check) location permission on mount.
   */
  useEffect(() => {
    ;(async () => {
      let granted = false
      if (Platform.OS === "android") {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          granted = true
        } else if (result === RESULTS.DENIED) {
          const requestResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
          granted = requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED
        }
      } else {
        // For iOS or other platforms
        const iosResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        granted = iosResult === RESULTS.GRANTED || iosResult === RESULTS.LIMITED
      }
      setLocationPermissionGranted(granted)
    })()
  }, [])

  /**
   * Log changes to permission state.
   */
  useEffect(() => {
    if (locationPermissionGranted) {
      console.log("Permission is granted, attempting to get position...")
    } else {
      console.log("Permission is not granted yet")
    }
  }, [locationPermissionGranted])

  /**
   * Handle real-time user location changes.
   * Update user location and check distance to selected cache.
   */
  const handleUserLocationChange = (event: UserLocationChangeEvent) => {
    const { coordinate } = event.nativeEvent
    setCurrentUserLocation(
      coordinate ? { latitude: coordinate.latitude, longitude: coordinate.longitude } : null,
    )
  }

  /**
   * Calculate distance to the goal and check if it is reached.
   */
  useEffect(() => {
    setGoalReached(false)
    if (!selectedGoToCache && setDistanceToGoal) {
      setDistanceToGoal(null)
    }
    if (!currentUserLocation || !selectedGoToCache) return

    const distanceInMeters = getDistance(currentUserLocation, {
      latitude: selectedGoToCache.coordinates.latitude,
      longitude: selectedGoToCache.coordinates.longitude,
    })

    if (setDistanceToGoal) {
      setDistanceToGoal(distanceInMeters)
    }

    // If within 50 meters, goal is reached
    if (distanceInMeters <= 50) {
      setGoalReached(true)
    }
  }, [currentUserLocation, selectedGoToCache, setDistanceToGoal, setGoalReached])

  /**
   * Update "selectedGoToCache" whenever "selectedGoToCacheId" changes.
   */
  useEffect(() => {
    const found = allCaches.find((cache) => cache.id === selectedGoToCacheId)
    setSelectedGoToCache(found || null)
  }, [selectedGoToCacheId, allCaches])

  /**
   * Callback to handle toggling favorites.
   */
  const toggleFavorite = (cacheId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(cacheId)
        ? prevFavorites.filter((id) => id !== cacheId)
        : [...prevFavorites, cacheId],
    )
  }

  /**
   * Returns distance from user to a given coordinate, or null if unknown.
   */
  const getDistanceFromUser = (coord: LatLng) => {
    if (!currentUserLocation) return null
    return getDistance(currentUserLocation, coord)
  }

  /**
   * Handle user dragging a new marker (for adding cache).
   */
  const handleMarkerDragEnd = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate
    setNewMarkerPosition({ latitude, longitude })
  }

  /**
   * Pass newMarkerPosition to the parent whenever it changes.
   */
  useEffect(() => {
    getNewCacheCoord(newMarkerPosition)
  }, [newMarkerPosition, getNewCacheCoord])

  /**
   * Fallback to refresh map if it gets stuck loading.
   */
  useEffect(() => {
    if (!mapReady) {
      setTimeout(() => {
        if (!mapReady) {
          setMapKey(mapKey + 1)
        }
      }, 3000)
    }
  }, [mapReady])

  /**
   * Filter caches to display.
   */
  const cachesToDisplay = allCaches?.filter((cache) => displayCaches.includes(cache.id))

  /**
   * Handle user pressing on an existing cache marker to open the modal.
   */
  const handleMarkerPress = (cache: Cache) => {
    setSelectedCache(cache)
    setModalVisible(true)
  }

  /**
   * Close the modal, reset selected cache.
   */
  const handleCloseModal = () => {
    setModalVisible(false)
    setSelectedCache(null)
  }

  /**
   * Decide whether to show loading overlay.
   */
  const showLoadingOverlay = !mapReady || loadingMapRegion || !region

  /** ---------- Render ---------- **/
  return (
    <View style={styles.container}>
      {/** Only render map if we have region and permission */}
      {locationPermissionGranted && region && (
        <MapView
          key={mapKey}
          toolbarEnabled={false}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={handleRegionChangeComplete}
          customMapStyle={isDarkColorScheme ? darkModeMap : []}
          showsUserLocation
          onUserLocationChange={handleUserLocationChange}
          onMapReady={() => setMapReady(true)}
        >
          {mapReady &&
            (!addingCache ? (
              cachesToDisplay?.map((cache) => {
                const isSelected = selectedGoToCacheId === cache.id
                return (
                  <Marker
                    stopPropagation
                    key={cache.id}
                    coordinate={cache.coordinates}
                    pinColor={favorites.includes(cache.id) ? "#FFD700" : "#00FF00"}
                    style={{
                      opacity: selectedGoToCacheId !== "" ? (isSelected ? 1 : 0.2) : 1,
                      transform: [
                        {
                          scale: selectedGoToCacheId !== "" ? (isSelected ? 1.5 : 0.8) : 1,
                        },
                      ],
                    }}
                    onPress={
                      selectedGoToCacheId === "" || isSelected
                        ? () => handleMarkerPress(cache)
                        : () => {}
                    }
                  />
                )
              })
            ) : (
              <Marker
                stopPropagation
                coordinate={newMarkerPosition}
                draggable
                onDragEnd={handleMarkerDragEnd}
              />
            ))}
        </MapView>
      )}

      {/** Loading Overlay */}
      {showLoadingOverlay && (
        <View style={styles.loadingOverlay} className="gap-2">
          <ActivityIndicator size="large" color="#4285F4" />
          <Text>Loading map data...</Text>
          <Button
            variant="outline"
            className="flex-row items-center gap-2"
            onPress={() => setMapKey(mapKey + 1)}
          >
            <RotateCw size={16} strokeWidth={1.25} />
            <Text>Retry</Text>
          </Button>
        </View>
      )}

      {/** Cache Info Modal */}
      {selectedCache && (
        <CacheInfoModal
          modalVisible={modalVisible}
          selectedCacheData={{
            ...selectedCache.data,
            cacheId: selectedCache.id,
          }}
          distance={getDistanceFromUser(selectedCache.coordinates)}
          closeModal={handleCloseModal}
          selectedGoToCache={selectedGoToCacheId}
          setSelectedGoToCache={setSelectedGoToCacheId}
        />
      )}
    </View>
  )
}

/** ---------- Styles ---------- **/
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default MapScreen
