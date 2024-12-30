import React, { useEffect, useState, useRef } from 'react';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  Animated,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, UserLocationChangeEvent } from 'react-native-maps';
import { useColorScheme } from "@/lib/useColorScheme"
import CacheInfoModal from "@/components/CacheInfoModal";
import { getDistance } from 'geolib';


interface Comment {
  creatorID: string;
  name: string;
  description: string;
  date: Date;
  raiting: number;
}

interface CacheData {
  label: string;
  id: string;
  name: string;
  rating: number;
  views: number;
  type: string;
  date: Date;
  info: {
    pictures: string[];
    description: string;
    comments: Comment[];
  };
}

interface Cache {
  coordinates: { latitude: number; longitude: number };
  data: CacheData;
}

interface MapScreenProps {
  allCaches: Cache[];
  displayCaches: string[];
  selectedGoToCache: string;
  setSelectedGoToCache: React.Dispatch<React.SetStateAction<string>>;
  goalReached: boolean; // Represents whether a goal has been reached.
  setGoalReached: React.Dispatch<React.SetStateAction<boolean>>; // Setter for goalReached.
}

const darkModeMap = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]



const initialRegion = {
  latitude: 62.918161,
  longitude: 18.643501,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

const MapScreen: React.FC<MapScreenProps> = ({
  allCaches,
  displayCaches,
  selectedGoToCache,
  setSelectedGoToCache,
  goalReached,
  setGoalReached
  
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCache, setSelectedCache] = useState<Cache | null>(null);
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

  function UsrDistCheck(event: UserLocationChangeEvent) {
    const { coordinate } = event.nativeEvent;
    console.log(coordinate, coordinate?.timestamp);
  
    if (!coordinate || !selectedCache) return;
  
    // Calculate the distance
    const distanceInMeters = getDistance(
      {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
      {
        latitude: selectedCache.coordinates.latitude,
        longitude: selectedCache.coordinates.longitude,
      }
    );
  
    // Check if within 50 meters
    if (distanceInMeters <= 50) {
      setGoalReached(true);
    }
  }

  useEffect(() => {
    (async () => {
      let granted = false;
      if (Platform.OS === 'android') {
        // Check if permission is already granted or needs to be requested
        const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          granted = true;
        } else if (result === RESULTS.DENIED) {
          // If it's denied, we request the permission.
          const requestResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          granted = (requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED);
        } else {
          // If it's BLOCKED or unavailable, granted stays false.
          granted = false;
        }
  
      } else {
        // some iOS logic just in case
        const iosResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        granted = (iosResult === RESULTS.GRANTED || iosResult === RESULTS.LIMITED);
      }
  
      setLocationPermissionGranted(granted);
    })();
  }, []);
  
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
    heading: number | null;
  } | null>(null);

  const {isDarkColorScheme} = useColorScheme()

  useEffect(() => {
    if (allCaches.length > 0 && displayCaches.length > 0) {
      setLoading(false);
    }
  }, [allCaches, displayCaches]);

  useEffect(() => {
    if (locationPermissionGranted) {
      console.log("Permission is granted, attempting to get position...");
    } else {
      console.warn("Permission is not granted yet");
    }
  }, [locationPermissionGranted]);
  

  const toggleFavorite = (cacheId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(cacheId)
        ? prevFavorites.filter((id) => id !== cacheId)
        : [...prevFavorites, cacheId]
    );
  };

  const cachesToDisplay = allCaches.filter((cache) =>
    displayCaches.includes(cache.data.id)
  );

  const handleMarkerPress = (cache: Cache) => {
    setSelectedCache(cache);
    setModalVisible(true);
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(backgroundOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedCache(null);
    });
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
      <MapView 
      provider={PROVIDER_GOOGLE} 
      style={styles.map} 
      initialRegion={initialRegion}
      customMapStyle={isDarkColorScheme ? darkModeMap : []}
      showsUserLocation={true}
      onUserLocationChange={UsrDistCheck}
      >
        {cachesToDisplay.map((cache) => {
          // Render all markers
          const isSelected = selectedGoToCache === cache.data.id;
          return (
            <Marker
              key={cache.data.id}
              coordinate={cache.coordinates}
              pinColor={favorites.includes(cache.data.id) ? "#FFD700" : "#00FF00"}
              style={{
                opacity: selectedGoToCache !== '' ? (isSelected ? 1 : 0.5) : 1,
                transform: [
                  { scale: selectedGoToCache !== '' ? (isSelected ? 1.5 : 0.8) : 1 },
                ],
              }}
              onPress={selectedGoToCache === '' || isSelected ? () => handleMarkerPress(cache): () => {}}
            />
          );
        })}
      </MapView>

      {/* Animated Background */}
      <Animated.View
        style={[
          styles.animatedBackground,
          { opacity: backgroundOpacity, display: modalVisible ? 'flex' : 'none' },
        ]}
      />

      {/* Modal for Cache Details */}
      {selectedCache && (
        <CacheInfoModal
          modalVisible={modalVisible}
          selectedCacheData={selectedCache.data}
          closeModal={closeModal}
          selectedGoToCache={selectedGoToCache}
          setSelectedGoToCache={setSelectedGoToCache}
        />
      )}
    </View>
  );
};

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
  animatedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
});


export default MapScreen;
