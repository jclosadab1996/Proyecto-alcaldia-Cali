import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Node coordinates
const nodeLocations = {
  N1: [3.3484827086060296, -76.55180176662421], // Ecoparque Corazón de Pance
  N2: [3.3355547766262883, -76.53700812144801], // Ecoparque Las Garzas
  N3: [3.3467738263920306, 76.544451082069], // Universidad San Buenaventura
  N4: [3.3436520525415, -76.53061067329503], // Universidad ICESI
  N5: [3.3560637207112607, -76.5193962735406], // Universidad Autónoma de Occidente
  N6: [3.350747812072691, -76.53182916793524], // Universidad Javeriana
  N7: [3.344158894211956, -76.5216750459335], // Fundación Universitaria San Martin
  N8: [3.362999099560962, -76.52662148417696], // Universidad Libre
  N10: [3.3406958800550868, -76.53769476696355], // Colegio Nuevo Cambridge
  N11: [3.370749374214043, -76.54211953307869], // Club Campestre Cali
  N12: [3.376747109543067, -76.54443696169362], // Universidad Católica Meléndez
  N13: [3.373078428450869, -76.53940454926517], // Holguines Trade Center
  N14: [3.4107407152378997, -76.55804112589104], // Universidad Santiago de Cali
  N15: [3.3304740772817034, -76.52137042227346], // Zonamérica
  N16: [3.373725721233702, -76.52560254420617], // Fundación Valle del Lili
  N17: [3.340610997019242, -76.5275644366945], // Colegio Nuestra Señora del Rosario
  N18: [3.3655882949213893, -76.54042348923598], // Condominio Bagatelle
};

const nodeInstitutions = {
  N1: "Ecoparque Corazón de Pance",
  N2: "Ecoparque Las Garzas",
  N3: "Universidad San Buenaventura",
  N4: "Universidad ICESI",
  N5: "Universidad Autónoma de Occidente",
  N6: "Universidad Javeriana",
  N7: "Fundación Universitaria San Martin",
  N8: "Universidad Libre",
  N10: "Colegio Nuevo Cambridge",
  N11: "Club Campestre Cali",
  N12: "Universidad Católica Meléndez",
  N13: "Holguines Trade Center",
  N14: "Universidad Santiago de Cali",
  N15: "Zonamérica",
  N16: "Fundación Valle del Lili",
  N17: "Colegio Nuestra Señora del Rosario",
  N18: "Condominio Bagatelle",
};

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapProps {
  selectedNode?: string;
  onNodeSelect?: (nodeId: string) => void;
}

export const AirQualityMap: React.FC<MapProps> = ({
  selectedNode,
  onNodeSelect,
}) => {
  const createCustomIcon = (nodeId: string) => {
    const isSelected = selectedNode === nodeId;
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="
        background-color: ${isSelected ? "#3B82F6" : "#10B981"};
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
      ">${nodeId.replace("N", "")}</div>`,
      iconSize: [24, 24],
    });
  };

  return (
    <MapContainer
      center={[3.4516, -76.532]}
      zoom={12}
      style={{ width: "100%", height: "100%", minHeight: "600px" }}
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
