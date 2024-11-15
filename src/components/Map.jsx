import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

function Map({ center, onLocationSelect, airQualityData }) {
  const getAQICategory = (aqi) => {
    if (aqi <= 50) return "good";
    if (aqi <= 100) return "moderate";
    if (aqi <= 150) return "sensitive";
    if (aqi <= 200) return "unhealthy";
    if (aqi <= 300) return "very-unhealthy";
    return "hazardous";
  };

  const createMarkerIcon = (aqi) => {
    const category = getAQICategory(aqi);
    return divIcon({
      className: `aqi-marker ${category}`,
      html: `<div>${aqi}</div>`,
      iconSize: [30, 30],
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      onClick={(e) =>
        onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng })
      }
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {airQualityData && (
        <Marker position={center} icon={createMarkerIcon(airQualityData.aqi)}>
          <Popup>
            <div>
              <h3>Calidad del Aire: {airQualityData.aqi}</h3>
              <p>Estación: {airQualityData.city.name}</p>
              <p>Estado: {getAQICategory(airQualityData.aqi).toUpperCase()}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
