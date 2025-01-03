import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  UserLocationChangeEvent,
  LatLng,
} from 'react-native-maps';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { getDistance } from 'geolib';

import { useColorScheme } from '@/lib/useColorScheme';
import CacheInfoModal from '@/components/CacheInfoModal';

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
  coordinates: { latitude: number; longitude: number }
  data: CacheData
}

interface MapScreenProps {
  allCaches: Cache[];
  displayCaches: string[];
  selectedGoToCacheId: string;
  setSelectedGoToCacheId: React.Dispatch<React.SetStateAction<string>>;
  goalReached: boolean;
  setGoalReached: React.Dispatch<React.SetStateAction<boolean>>;
  setDistanceToGoal?: React.Dispatch<React.SetStateAction<number | null>>;
  addingCache: boolean,
  getNewCacheCoord: (coord: LatLng) => void
}

const darkModeMap = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#1d2c4d' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8ec3b9' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1a3646' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#4b6878' }],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#64779e' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#4b6878' }],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#334e87' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#023e58' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#283d6a' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6f9ba5' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1d2c4d' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#023e58' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3C7680' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#304a7d' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#98a5be' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1d2c4d' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#2c6675' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#255763' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#b0d5ce' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#023e58' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#98a5be' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1d2c4d' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [{ color: '#283d6a' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#3a4762' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0e1626' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4e6d70' }],
  },
];

const initialRegion = {
  latitude: 62.918161,
  longitude: 18.643501,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

const MapScreen: React.FC<MapScreenProps> = ({
  allCaches,
  displayCaches,
  selectedGoToCacheId,
  setSelectedGoToCacheId,
  goalReached,
  setGoalReached,
  setDistanceToGoal,
  addingCache,
  getNewCacheCoord
}) => {
  const [currentUserLocation, setCurrentUserLocation] = useState<LatLng | null>(null);

  const [newMarkerPosition, setNewMarkerPosition] = useState<LatLng>({
    latitude: initialRegion.latitude,
    longitude: initialRegion.longitude,
  });

  useEffect(() => {
    getNewCacheCoord(newMarkerPosition)
  }, [newMarkerPosition])

  const [selectedGoToCache, setSelectedGoToCache] = useState<Cache | null>(null)
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCache, setSelectedCache] = useState<Cache | null>(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

  const { isDarkColorScheme } = useColorScheme();

  useEffect(() => {
    if (addingCache) {
      setNewMarkerPosition(
        currentUserLocation || {
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
        }
      );
    }
  }, [addingCache]);

  /**
   * Request or check location permission on mount.
   */
  useEffect(() => {
    (async () => {
      let granted = false;

      if (Platform.OS === 'android') {
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          granted = true;
        } else if (result === RESULTS.DENIED) {
          const requestResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          );
          granted = requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED;
        }
      } else {
        // iOS or other platforms
        const iosResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        granted = iosResult === RESULTS.GRANTED || iosResult === RESULTS.LIMITED;
      }

      setLocationPermissionGranted(granted);
    })();
  }, []);

  /**
   * Hide the loading indicator once caches have been loaded.
   */
  useEffect(() => {
    if (allCaches) {
      setLoading(false);
    }
  }, [allCaches, displayCaches]);

  /**
   * Basic log to confirm location permission state changes.
   */
  useEffect(() => {
    if (locationPermissionGranted) {
      console.log('Permission is granted, attempting to get position...');
    } else {
      console.warn('Permission is not granted yet');
    }
  }, [locationPermissionGranted]);

  /**
   * Called whenever the user’s location changes on the map.
   * Checks distance to the currently selected cache to see if the goal is reached.
   */
  const handleUserLocationChange = (event: UserLocationChangeEvent) => {
    const { coordinate } = event.nativeEvent;
    console.log(coordinate, coordinate?.timestamp);
    setCurrentUserLocation(
      coordinate
        ? { latitude: coordinate.latitude, longitude: coordinate.longitude }
        : null
    );
  };

  useEffect(() => {

    if(!selectedGoToCache) {
      if(setDistanceToGoal)
        setDistanceToGoal(null);
    }

    if (!currentUserLocation || !selectedGoToCache) return;

    // Calculate distance in meters
    const distanceInMeters = getDistance(
      currentUserLocation,
      {
        latitude: selectedGoToCache.coordinates.latitude,
        longitude: selectedGoToCache.coordinates.longitude,
      }
    );
    if(setDistanceToGoal)
      setDistanceToGoal(distanceInMeters);

    // Check if within 50 meters
    if (distanceInMeters <= 50) {
      setGoalReached(true);
    }
  }, [currentUserLocation, selectedGoToCache])

  useEffect(() => {
    const selectedCache = allCaches.find((cache) => cache.id === selectedGoToCacheId);
    setSelectedGoToCache(selectedCache || null);
    
  }, [selectedGoToCacheId])

  /**
   * Toggle a cache as favorite or remove it from favorites.
   */
  const toggleFavorite = (cacheId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(cacheId)
        ? prevFavorites.filter((id) => id !== cacheId)
        : [...prevFavorites, cacheId]
    );
  };

  const getDistanceFromUser = (coord: LatLng) => {
    if(!currentUserLocation)
      return null
    return getDistance(
      currentUserLocation,
      coord
    )
  }

  /**
   * Called when the user finishes dragging the new marker (if adding a cache).
   */
  const handleMarkerDragEnd = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setNewMarkerPosition({ latitude, longitude });
  };

  /**
   * Filter caches that should be visible on the map.
   */
  const cachesToDisplay = allCaches?.filter((cache) =>
    displayCaches.includes(cache.id)
  );

  /**
   * Handle user pressing on an existing cache marker.
   */
  const handleMarkerPress = (cache: Cache) => {
    setSelectedCache(cache);
    setModalVisible(true);
  };

  /**
   * Close the cache detail modal.
   */
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCache(null);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text>Loading map data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {locationPermissionGranted && !loading && <MapView
        toolbarEnabled={false}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={isDarkColorScheme ? darkModeMap : []}
        showsUserLocation
        onUserLocationChange={handleUserLocationChange}
      >
        {!addingCache ? (
          cachesToDisplay?.map((cache) => {
            const isSelected = selectedGoToCacheId === cache.id;
            return (
              <Marker
                stopPropagation={true}
                key={cache.id}
                coordinate={cache.coordinates}
                pinColor={favorites.includes(cache.id) ? '#FFD700' : '#00FF00'}
                style={{
                  opacity:
                    selectedGoToCacheId !== ''
                      ? isSelected
                        ? 1
                        : 0.2
                      : 1,
                  transform: [
                    {
                      scale:
                        selectedGoToCacheId !== ''
                          ? isSelected
                            ? 1.5
                            : 0.8
                          : 1,
                    },
                  ],
                }}
                onPress={
                  selectedGoToCacheId === '' || isSelected
                    ? () => handleMarkerPress(cache)
                    : () => {}
                }
              />
            );
          })
        ) : (
          <Marker
            stopPropagation={true}
            coordinate={newMarkerPosition}
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </MapView>}

      {selectedCache && (
        <CacheInfoModal
          modalVisible={modalVisible}
          selectedCacheData={{
            ...selectedCache.data,
            cacheId: selectedCache.id
          }}
          distance={getDistanceFromUser(selectedCache.coordinates)}
          closeModal={handleCloseModal}
          selectedGoToCache={selectedGoToCacheId}
          setSelectedGoToCache={setSelectedGoToCacheId}
        />
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
