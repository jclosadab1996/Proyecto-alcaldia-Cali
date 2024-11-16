import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { AirQualityData } from '../types';
import 'leaflet/dist/leaflet.css';

interface AirQualityMapProps {
  data: AirQualityData[];
  selectedStation: AirQualityData | null;
  onSelectStation: (station: AirQualityData | null) => void;
}

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getMarkerColor = (aqi: number): string => {
  if (aqi <= 50) return '#10B981';
  if (aqi <= 100) return '#F59E0B';
  if (aqi <= 150) return '#F97316';
  if (aqi <= 200) return '#EF4444';
  return '#8B5CF6';
};

function WaqiLayer() {
  const map = useMap();

  useEffect(() => {
    const waqiLayer = L.tileLayer(
      'https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=' + import.meta.env.VITE_WAQI_API_TOKEN,
      {
        attribution: 'Air Quality Tiles &copy; WAQI.info',
        opacity: 0.6,
      }
    );

    waqiLayer.addTo(map);

    return () => {
      map.removeLayer(waqiLayer);
    };
  }, [map]);

  return null;
}

export const AirQualityMap: React.FC<AirQualityMapProps> = ({
  data,
  selectedStation,
  onSelectStation,
}) => {
  const createCustomIcon = (aqi: number) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${getMarkerColor(aqi)}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
      iconSize: [24, 24],
    });
  };

  return (
    <MapContainer
      center={[3.4516, -76.5320]}
      zoom={11}
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
      className="rounded-xl overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <WaqiLayer />
      
      {data.map((station) => (
        <Marker
          key={`${station.city.geo[0]}-${station.city.geo[1]}`}
          position={[station.city.geo[0], station.city.geo[1]]}
          icon={createCustomIcon(station.aqi)}
          eventHandlers={{
            click: () => onSelectStation(station),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{station.city.name}</h3>
              <p className="mt-1">AQI: <span className="font-semibold">{station.aqi}</span></p>
              <p className="text-sm text-gray-600">
                Última actualización: {new Date(station.time.iso).toLocaleString()}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};