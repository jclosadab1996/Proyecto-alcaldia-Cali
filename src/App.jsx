import { useState, useEffect } from "react";
import Map from "./components/Map";
import AirQualityInfo from "./components/AirQualityInfo";
import AirQualityAlert from "./components/AirQualityAlert";
import Dashboard from "./components/Dashboard";
import { endpoints } from "./config/api";
import "./styles/App.scss";

function App() {
  const [airQualityData, setAirQualityData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get current location data on initial load
    const getCurrentLocationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoints.here);
        const data = await response.json();
        if (data.status === "ok") {
          setAirQualityData(data.data);
          setSelectedLocation({
            lat: data.data.city.geo[0],
            lng: data.data.city.geo[1],
          });
          if (data.data.idx) {
            await fetchHistoricalData(data.data.idx);
          }
        }
      } catch (error) {
        console.error("Error fetching current location data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentLocationData();
  }, []);

  const fetchHistoricalData = async (station) => {
    try {
      const response = await fetch(endpoints.getByStation(station));
      const data = await response.json();
      if (data.status === "ok") {
        setHistoricalData(data.data);
      }
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  const handleLocationSelect = async (location) => {
    setLoading(true);
    setSelectedLocation(location);
    try {
      const response = await fetch(
        endpoints.getByGeo(location.lat, location.lng)
      );
      const data = await response.json();
      if (data.status === "ok") {
        setAirQualityData(data.data);
        if (data.data.idx) {
          await fetchHistoricalData(data.data.idx);
        }
      }
    } catch (error) {
      console.error("Error fetching air quality data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Monitor Mundial de Calidad del Aire</h1>
        <p className="header-subtitle">
          Información en tiempo real y análisis histórico
        </p>
      </header>
      <main className="main-content">
        <div className="map-section">
          {selectedLocation && (
            <Map
              center={selectedLocation}
              onLocationSelect={handleLocationSelect}
              airQualityData={airQualityData}
            />
          )}
        </div>
        <div className="info-panel">
          <AirQualityInfo />
          {airQualityData && airQualityData.aqi > 150 && (
            <AirQualityAlert aqi={airQualityData.aqi} />
          )}
        </div>
      </main>
      {airQualityData && historicalData && !loading && (
        <section className="dashboard-section">
          <Dashboard
            currentData={airQualityData}
            historicalData={historicalData}
            loading={loading}
          />
        </section>
      )}
      {loading && (
        <div className="global-loading">
          <div className="loader"></div>
          <p>Cargando datos de calidad del aire...</p>
        </div>
      )}
    </div>
  );
}

export default App;
