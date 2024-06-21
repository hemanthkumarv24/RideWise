// src/pages/MapPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLat } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtemF6YWlkaSIsImEiOiJja3ZtY3RodzgwNGdlMzBwaWdjNWx5cTQ3In0.2s32bZnlSY-Qg5PFmoLrJw'; // Replace with your Mapbox access token

const MapPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LngLat | null>(null);
  const [pickupLocation, setPickupLocation] = useState<LngLat | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<LngLat | null>(null);
  const pickupMarker = useRef<mapboxgl.Marker | null>(null);
  const destinationMarker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(new mapboxgl.LngLat(longitude, latitude));

          map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 12,
          });

          const currentLocationMarker = new mapboxgl.Marker({
            color: 'blue',
          })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

          pickupMarker.current = new mapboxgl.Marker({
            color: 'black',
            draggable: true,
          })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

          pickupMarker.current.on('dragend', () => {
            const lngLat = pickupMarker.current!.getLngLat();
            setPickupLocation(lngLat);
          });

        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (pickupLocation && !destinationMarker.current) {
      destinationMarker.current = new mapboxgl.Marker({
        color: 'red',
        draggable: true,
      })
        .setLngLat([pickupLocation.lng + 0.01, pickupLocation.lat + 0.01]) // Initialize near the pickup location
        .addTo(map.current!);

      destinationMarker.current.on('dragend', () => {
        const lngLat = destinationMarker.current!.getLngLat();
        setDestinationLocation(lngLat);
      });
    }
  }, [pickupLocation]);

  const handleConfirm = () => {
    if (pickupLocation && destinationLocation) {
      alert(`Pickup location: ${pickupLocation.lat}, ${pickupLocation.lng}\nDestination location: ${destinationLocation.lat}, ${destinationLocation.lng}`);
    } else {
      alert('Please select both pickup and destination locations.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          {currentLocation && (
            <p>Your current location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}</p>
          )}
        </div>
        <div>
          <button onClick={() => map.current?.flyTo({ center: currentLocation!, zoom: 14 })}>
            Zoom to Current Location
          </button>
        </div>
      </div>

      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {!pickupLocation && (
          <button disabled>Select Pickup Location</button>
        )}
        {pickupLocation && !destinationLocation && (
          <button onClick={handleConfirm}>
            Confirm Pickup Location
          </button>
        )}
        {destinationLocation && (
          <button onClick={handleConfirm}>
            Confirm Locations
          </button>
        )}
      </div>
    </div>
  );
};

export default MapPage;
