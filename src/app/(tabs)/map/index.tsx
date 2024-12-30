import React, { useState } from 'react';
import MapScreen from '@/components/GoogleMaps';

const temp_marker_data = [
  {
    coordinates: { latitude: 62.918161, longitude: 18.643501},
    data: {
      label: 'A',
      name: 'Cache A',
      id: '13238gej3lk34',
      rating: 3.6,
      views: 421,
      type: "Scenic View",
      info: {
        pictures: [],
        description: 'Description of Cache A',
        comments: []
      },
    },
  },
  {
    coordinates: { latitude: 63.318161, longitude: 18.643901},
    data: {
      label: 'C',
      name: 'Cache C',
      id: '13238fej3lkhh',
      rating: 5.0,
      views: 5043,
      type: "Scenic View",
      info: {
        pictures: [],
        description: 'This is a very detailed description of marker C. Marker C has truly been a special marker to me and my friend as we often travel to this location to think of old memories, that is why this desctiption is so long. It is also to test the size limit of the containers scroll feature, that is also the reason for this additional repeating segment: This is a very detailed description of marker C. Marker C has truly been a special marker to me and my friend as we often travel to this location to think of old memories, that is why this desctiption is so long. It is also to test the size limit of the containers scroll feature: This is a very detailed description of marker C. Marker C has truly been a special marker to me and my friend as we often travel to this location to think of old memories, that is why this desctiption is so long. It is also to test the size limit of the containers scroll feature: This is a very detailed description of marker C. Marker C has truly been a special marker to me and my friend as we often travel to this location to think of old memories, that is why this desctiption is so long. It is also to test the size limit of the containers scroll featureThis is a very detailed description of marker C. Marker C has truly been a special marker to me and my friend as we often travel to this location to think of old memories, that is why this desctiption is so long. It is also to test the size limit of the containers scroll feature, that is also the reason for this additional repeating segment: This is a very detailed description of marker C. Marker C has truly been a special marker to me and my friend as we often travel to this location to think of old memories, that is why this desctiption is so long. It is also to test the size limit of the containers scroll feature: This is a very detailed description of marker C. Marker C has truly been a special marker to me and my friend as we often travel to this location to think of old memories, that is why this desctiption is so long. It is also to test the size limit of the containers scroll feature: This is a very detailed description of marker C. Marker C has truly been a special marker to me and my friend as we often travel to this location to think of old memories, that is why this desctiption is so long. It is also to test the size limit of the containers scroll feature',
        comments: []
      },
    },
  },
  {
    coordinates: { latitude: 37.7849, longitude: -122.4294 },
    data: {
      label: 'B',
      name: 'Cache B',
      id: '29832u3hfu444',
      rating: 0.4,
      views: 321,
      type: "Scenic View",
      info: {
        pictures: [],
        description: 'This is a very detailed description of marker B. Marker B has truly been a special marker to me and friend and we often travel to this location to think of old memories, that is why this desctiption is so long. It is also to test the size limit of the containers scroll feature',
        comments: []
      },
    },
  },
];

export default function App() {
  const [selectedCache, setSelectedCache] = useState<string>('');
  const [goalReached, setGoalReached] = useState<boolean>(false);
  const displayCaches = temp_marker_data.map((cache) => cache.data.id);

  return (
    <MapScreen
      allCaches={temp_marker_data}
      displayCaches={["13238gej3lk34", "29832u3hfu444", "13238fej3lkhh"]}
      selectedGoToCache={selectedCache}
      setSelectedGoToCache={setSelectedCache}
      setGoalReached={setGoalReached}
      goalReached={goalReached}
    />
  );
}
