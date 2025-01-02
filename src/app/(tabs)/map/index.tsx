import React, { useState } from 'react';
import MapScreen from '@/components/GoogleMaps';

const temp_marker_data = [
  {
    coordinates: { latitude: 62.918161, longitude: 18.643501 },
    data: {
      label: "A",
      id: "13238gej3lk34",
      name: "Cache A",
      rating: 3.6,
      views: 421,
      type: "Scenic View",
      date: new Date("2024-01-01"),
      info: {
        pictures: [
          "https://picsum.photos/300/200?random=1",
          "https://picsum.photos/300/200?random=2",
        ],
        description: "A beautiful scenic view at Cache A with breathtaking landscapes.",
        comments: [
          {
            creatorID: "user123",
            userName: "Explorer1",
            titel: "Amazing View",
            avatarURL: "https://i.pravatar.cc/150?img=1",
            description: "Absolutely stunning spot. Worth the trip!",
            date: new Date("2024-01-15"),
            raiting: 4.5,
            picture: "https://picsum.photos/300/200?random=3",
          },
        ],
      },
    },
  },
  {
    coordinates: { latitude: 63.318161, longitude: 18.643901 },
    data: {
      label: "C",
      id: "13238fej3lkhh",
      name: "Cache C",
      rating: 5.0,
      views: 5043,
      type: "Scenic View",
      date: new Date("2024-02-10"),
      info: {
        pictures: [
          "https://picsum.photos/300/200?random=4",
          "https://picsum.photos/300/200?random=5",
          "https://picsum.photos/300/200?random=7",
        ],
        description: `This is a very detailed description of marker C. Marker C has truly been a special marker to me and my friend as we often travel to this location to think of old memories. It is also to test the size limit of the container's scroll feature.`,
        comments: [
          {
            creatorID: "user456",
            userName: "NatureLover",
            titel: "Breathtaking Experience",
            avatarURL: "https://i.pravatar.cc/150?img=2",
            description: "This spot offers the best sunset view ever!",
            date: new Date("2024-02-18"),
            raiting: 5.0,
            picture: "https://picsum.photos/300/200?random=6",
          },
        ],
      },
    },
  },
  {
    coordinates: { latitude: 37.7849, longitude: -122.4294 },
    data: {
      label: "B",
      id: "29832u3hfu444",
      name: "Cache B",
      rating: 0.4,
      views: 321,
      type: "Scenic View",
      date: new Date("2024-03-05"),
      info: {
        pictures: [
          "https://picsum.photos/300/200?random=7",
          "https://picsum.photos/300/200?random=8",
        ],
        description: "Cache B offers a peaceful retreat away from the city noise.",
        comments: [
          {
            creatorID: "user789",
            userName: "PeaceSeeker",
            titel: "Hidden Gem",
            avatarURL: "https://i.pravatar.cc/150?img=3",
            description: "A tranquil spot to relax and recharge.",
            date: new Date("2024-03-12"),
            raiting: 4.0,
            picture: "https://picsum.photos/300/200?random=9",
          },
        ],
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
      allCachesInit={temp_marker_data}
      displayCaches={["13238gej3lk34", "29832u3hfu444", "13238fej3lkhh"]}
      selectedGoToCache={selectedCache}
      setSelectedGoToCache={setSelectedCache}
      setGoalReached={setGoalReached}
      goalReached={goalReached}
    />
  );
}
