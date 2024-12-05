import React, { useEffect, useRef } from "react";
import { Text } from "react-native";

interface Cache {
  coordinates: { lat: number; lng: number };
  data: {
    label: string;
    info: {
      pictures: string[];
      description: string;
    };
  };
  marker?: google.maps.marker.AdvancedMarkerElement;
}

const CustomGoogleMarker: React.FC<{
  map: google.maps.Map | null;
  cache: Cache;
}> = ({ map, cache }) => {
  const markerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!map || !markerDiv.current) {
      console.error("Map instance or marker content is not available.");
      return;
    }

    if (!google.maps.marker?.AdvancedMarkerElement) {
      console.error("AdvancedMarkerElement is not available.");
      return;
    }

    console.log("Creating marker for cache:", cache);

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: cache.coordinates,
      content: markerDiv.current,
    });

    cache.marker = marker;

    return () => {
      console.log("Removing marker for cache:", cache);
      marker.map = null;
      cache.marker = undefined;
    };
  }, [map, cache]);

  return (
    <div
      ref={markerDiv}
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "50%",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <Text>{cache.data.label}</Text>
    </div>
  );
};

export default CustomGoogleMarker;
