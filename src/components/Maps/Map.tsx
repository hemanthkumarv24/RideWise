// Map.tsx
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  onLocationSelect: (location: google.maps.LatLngLiteral) => void;
}

const Map: React.FC<MapProps> = ({ onLocationSelect }) => {
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);

  const handleClick = (event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng;
    if (latLng) {
      const location = {
        lat: latLng.lat(),
        lng: latLng.lng()
      };
      setMarker(location);
      onLocationSelect(location);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyACbXQoqPUUp3rOIm3vKS_pQxbHzUQfuJo">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 0, lng: 0 }}
        zoom={2}
        onClick={handleClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
