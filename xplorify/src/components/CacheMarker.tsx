// CacheMarker.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import { Marker } from 'react-native-maps';

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

interface CacheMarkerProps {
  cache: Cache;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

const CacheMarker: React.FC<CacheMarkerProps> = ({
  cache,
  isSelected,
  onSelect,
  onToggleFavorite,
  isFavorite,
}) => {
  // State to manage whether the pin is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine marker styles based on selection
  const markerStyles = [
    styles.markerBase,
    isSelected ? styles.markerSelected : styles.markerNormal,
  ];
  const pinTipStyles = [
    styles.pinTipBase,
    isSelected ? styles.pinTipSelected : styles.pinTipNormal,
  ];

  function transformPin() {
    // Transforms the pin to the expanded view
    setIsExpanded(true);
  }

  function collapsePin() {
    // Collapse the expanded view back to pin
    setIsExpanded(false);
  }

  return (
    <Marker coordinate={cache.coordinates} onPress={transformPin}>
      {/* Custom Marker Icon or Expanded View */}
      {isExpanded ? (
        <TouchableWithoutFeedback onPress={collapsePin}>
          <View style={styles.expandedContainer}>
            <Text style={styles.markerTitle}>{cache.data.name}</Text>
            <Text style={styles.markerDescription}>
              {cache.data.info.description}
            </Text>
            <View style={styles.markerButtons}>
              <Button title="Start Walk" onPress={() => onSelect(cache.data.id)} />
              <Button
                title={isFavorite ? 'Unfavorite' : 'Favorite'}
                onPress={() => onToggleFavorite(cache.data.id)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={styles.markerContainer}>
          <View style={markerStyles}>
            <Text style={styles.markerText}>{cache.data.label}</Text>
          </View>
          <View style={pinTipStyles} />
        </View>
      )}
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  // Base style for the marker
  markerBase: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  // Marker styles based on selection
  markerNormal: {
    backgroundColor: '#FF6568',
    borderColor: '#AB2014',
  },
  markerSelected: {
    backgroundColor: '#8DDF1F',
    borderColor: '#5DAF00',
  },
  markerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Base style for the pin tip
  pinTipBase: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderLeftColor: 'transparent',
    borderRightWidth: 7,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    marginTop: -1,
  },
  // Pin tip styles based on selection
  pinTipNormal: {
    borderTopColor: '#FF6568',
  },
  pinTipSelected: {
    borderTopColor: '#5DAF00',
  },
  expandedContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  markerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  markerDescription: {
    marginBottom: 5,
    textAlign: 'center',
  },
  markerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default CacheMarker;
