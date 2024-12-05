import React, { useState } from 'react';
import MapScreen from '@/components/GoogleMaps';

const temp_marker_data = [
  {
    coordinates: { latitude: 62.918161, longitude: 18.643501},
    data: {
      label: 'A',
      name: 'Cache A',
      id: '13238gej3lk34',
      info: {
        pictures: [],
        description: 'Description of Cache A',
      },
    },
  },
  {
    coordinates: { latitude: 37.7849, longitude: -122.4294 },
    data: {
      label: 'B',
      name: 'Cache B',
      id: '29832u3hfu444',
      info: {
        pictures: [],
        description: 'Description of Cache B',
      },
    },
  },
];

export default function App() {
  const [selectedCache, setSelectedCache] = useState<string>('');
  const displayCaches = temp_marker_data.map((cache) => cache.data.id);

  return (
    <MapScreen
      allCaches={temp_marker_data}
      displayCaches={["13238gej3lk34", "29832u3hfu444"]}
      selectedCache={selectedCache}
      setSelectedCache={setSelectedCache}
    />
  );
}
