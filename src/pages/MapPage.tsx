// src/pages/MapPage.tsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLat } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationContext } from '../components/Location_det/LocationContext';

// mapboxgl.accessToken = `${import.meta.env.mapboxgl}`; 
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtemF6YWlkaSIsImEiOiJja3ZtY3RodzgwNGdlMzBwaWdjNWx5cTQ3In0.2s32bZnlSY-Qg5PFmoLrJw'; // Replace with your Mapbox access token

const MapPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  const { state } = useLocation<{ from: 'pickup' | 'destination' }>();
  const { setPickupLocation, setDestinationLocation } = useContext(LocationContext);

  useEffect(() => {
    if (!map.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const lngLat = new mapboxgl.LngLat(longitude, latitude);
          fetchAddress(lngLat, setCurrentLocation);

          map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 12,
          });

          markerRef.current = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

          markerRef.current.on('dragend', () => {
            const lngLat = markerRef.current!.getLngLat();
            fetchAddress(lngLat, setSelectedAddress);
          });

          map.current.on('moveend', () => {
            if (markerRef.current) {
              const center = map.current!.getCenter();
              markerRef.current.setLngLat(center);
              fetchAddress(center, setSelectedAddress);
            }
          });

          fetchAddress(new mapboxgl.LngLat(longitude, latitude), setSelectedAddress);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }
  }, []);

  const fetchAddress = (lngLat: LngLat, setAddress: (address: string) => void) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          setAddress(data.features[0].place_name);
        }
      })
      .catch(error => console.error('Error fetching address:', error));
  };



  const handleSearch = () => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxgl.accessToken}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const center = data.features[0].center;
          map.current!.flyTo({ center, zoom: 14 });
          markerRef.current!.setLngLat(center);
          setSelectedAddress(data.features[0].place_name);
        } else {
          alert('No results found.');
        }
      })
      .catch(error => console.error('Error fetching search results:', error));
  };
  const handleConfirmLocation = () => {
    if (selectedAddress) {
      if (state?.from === 'pickup') {
        setPickupLocation(selectedAddress);
      } else if (state?.from === 'destination') {
        setDestinationLocation(selectedAddress);
      }
      navigate('/dashboard');
    } else {
      alert('No location selected.');
    }
  };

  return (
    <div>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          {currentLocation && (
            <p>Your current location: {currentLocation}</p>
          )}
        </div>
        <div>
          <button onClick={() => map.current?.flyTo({ center: map.current!.getCenter(), zoom: 14 })}>
            Zoom to Current Location
          </button>
        </div>
      </div> */}

      <div style={{ marginBottom: '10px' , }}>
        <Input 
          type="text" 
          placeholder="Search location" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ width: '75%', padding: '10px',marginTop:'10px',marginLeft:'10px',marginRight:'10px',fontSize:'20px' }} 
        />
        <Button onClick={handleSearch}style={{ width: '20%', height:'50px',marginLeft:'10px',marginRight:'10px', fontSize:'20px'}}>Search</Button>
      </div>

      <div ref={mapContainer} style={{ width: '100%', height: '500px', position: 'relative' }} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button onClick={handleConfirmLocation} style={{fontSize:'20px'}}>Confirm Location</Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', color:'white' }}>
        <p>{selectedAddress ? `Selected address: ${selectedAddress}` : 'Drag the marker or search to select an address'}</p>
      </div>
    </div>
  );
};

export default MapPage;
