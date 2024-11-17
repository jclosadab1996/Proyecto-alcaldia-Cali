import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Node coordinates
const nodeLocations = {
  N1: [3.3205, -76.5393], // Ecoparque Corazón de Pance
  N2: [3.4516, -76.5320], // Ecoparque Las Garzas
  N3: [3.3462, -76.5444], // Universidad San Buenaventura
  N4: [3.3419, -76.5300], // Universidad ICESI
  N5: [3.3539, -76.5229], // Universidad Autónoma de Occidente
  N6: [3.3570, -76.5399], // Universidad Javeriana
  N7: [3.4703, -76.5320], // Fundación Universitaria San Martin
  N8: [3.4331, -76.5407], // Universidad Libre
  N10: [3.3723, -76.5390], // Colegio Nuevo Cambridge
  N11: [3.3547, -76.5379], // Club Campestre Cali
  N12: [3.3801, -76.5443], // Universidad Católica Meléndez
  N13: [3.3749, -76.5392], // Holguines Trade Center
  N14: [3.4703, -76.5320], // Universidad Santiago de Cali
  N15: [3.3205, -76.5393], // Zonamérica
  N16: [3.3723, -76.5390], // Fundación Valle del Lili
  N17: [3.4516, -76.5320], // Colegio Nuestra Señora del Rosario
  N18: [3.3462, -76.5444]  // Condominio Bagatelle
};

const nodeInstitutions = {
  N1: 'Ecoparque Corazón de Pance',
  N2: 'Ecoparque Las Garzas',
  N3: 'Universidad San Buenaventura',
  N4: 'Universidad ICESI',
  N5: 'Universidad Autónoma de Occidente',
  N6: 'Universidad Javeriana',
  N7: 'Fundación Universitaria San Martin',
  N8: 'Universidad Libre',
  N10: 'Colegio Nuevo Cambridge',
  N11: 'Club Campestre Cali',
  N12: 'Universidad Católica Meléndez',
  N13: 'Holguines Trade Center',
  N14: 'Universidad Santiago de Cali',
  N15: 'Zonamérica',
  N16: 'Fundación Valle del Lili',
  N17: 'Colegio Nuestra Señora del Rosario',
  N18: 'Condominio Bagatelle'
};

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  selectedNode?: string;
  onNodeSelect?: (nodeId: string) => void;
}

export const AirQualityMap: React.FC<MapProps> = ({ selectedNode, onNodeSelect }) => {
  const createCustomIcon = (nodeId: string) => {
    const isSelected = selectedNode === nodeId;
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${isSelected ? '#3B82F6' : '#10B981'};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
        font-weight: bold;
      ">${nodeId.replace('N', '')}</div>`,
      iconSize: [24, 24],
    });
  };

  return (
    <MapContainer
      center={[3.4516, -76.5320]}
      zoom={12}
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
      className="rounded-xl overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {Object.entries(nodeLocations).map(([nodeId, coordinates]) => (
        <Marker
          key={nodeId}
          position={coordinates as [number, number]}
          icon={createCustomIcon(nodeId)}
          eventHandlers={{
            click: () => onNodeSelect?.(nodeId),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{nodeId}</h3>
              <p className="text-sm">{nodeInstitutions[nodeId]}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};