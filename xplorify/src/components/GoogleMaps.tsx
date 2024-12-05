// MapScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

interface CacheData {
  label: string;
  id: string;
  name: string;
  info: {
    pictures: string[];
    description: string;
  };
}

interface Cache {
  coordinates: { latitude: number; longitude: number };
  data: CacheData;
}

interface MapScreenProps {
  allCaches: Cache[];
  displayCaches: string[];
  selectedCache: string;
  setSelectedCache: React.Dispatch<React.SetStateAction<string>>;
}

const MapScreen: React.FC<MapScreenProps> = ({
  allCaches,
  displayCaches,
  selectedCache,
  setSelectedCache,
}) => {
  const initialRegion = {
    latitude: 62.918161,
    longitude: 18.643501,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  const [favorites, setFavorites] = useState<string[]>([]);
  const [expandedCacheId, setExpandedCacheId] = useState<string | null>(null);

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

  const onMarkerPress = (cacheId: string) => {
    setSelectedCache(cacheId);
    setExpandedCacheId(cacheId);
  };

  const onClosePress = () => {
    setExpandedCacheId(null);
  };

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={initialRegion}>
        {cachesToDisplay.map((cache) => {
          const isExpanded = expandedCacheId === cache.data.id;
          const isFavorite = favorites.includes(cache.data.id);

          return (
            <Marker
              key={cache.data.id}
              coordinate={cache.coordinates}
              onPress={() => onMarkerPress(cache.data.id)}
            >
              {isExpanded && (
                // Expanded view
                <View style={styles.expandedMarkerContainer}>
                  <View style={styles.expandedMarker}>
                    <Text style={styles.markerTitle}>{cache.data.name}</Text>
                    <Text style={styles.markerDescription}>
                      {cache.data.info.description}
                    </Text>
                    <View style={styles.markerButtons}>
                      <Button
                        title="Start Walk"
                        onPress={() => setSelectedCache(cache.data.id)}
                      />
                      <Button
                        title={isFavorite ? 'Unfavorite' : 'Favorite'}
                        onPress={() => toggleFavorite(cache.data.id)}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={onClosePress}
                    >
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.expandedMarkerArrow} />
                </View>
              )}
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  expandedMarkerContainer: {
    alignItems: 'center',
    width: 250,
  },
  expandedMarker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderColor: '#4285F4', // Matches the blue color of the default Google marker
    borderWidth: 1,
  },
  expandedMarkerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderLeftColor: 'transparent',
    borderRightWidth: 12,
    borderRightColor: 'transparent',
    borderTopWidth: 12,
    borderTopColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: -1,
  },
  markerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  markerDescription: {
    marginBottom: 5,
  },
  markerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: 'blue',
  },
});

export default MapScreen;
