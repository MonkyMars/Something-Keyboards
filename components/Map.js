import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import styles from '../styles/components/Map.module.css';

// Dynamically import MapContainer, TileLayer, Marker, and Popup from react-leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const getCoordinates = async (address) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${address}`);
  const data = await response.json();
  return data.length ? { lat: data[0].lat, lng: data[0].lon } : null;
};

const Map = ({ address, country, zipCode }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const fullAddress = `${address}, ${country}, ${zipCode}`;
      const coords = await getCoordinates(fullAddress);
      if (coords) {
        setPosition([coords.lat, coords.lng]);
      }
    };

    fetchCoordinates();
  }, [address, country, zipCode]);

  useEffect(() => {
    import('leaflet').then(L => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  if (!position) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={position} zoom={14} className={styles.Map}>
      <TileLayer
        attribution='&copy; '
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {address}, {country} {zipCode}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
