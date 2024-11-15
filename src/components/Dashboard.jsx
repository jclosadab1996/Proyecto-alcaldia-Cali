import { useState } from "react";
import HistoricalChart from "./HistoricalChart";
import RecommendationsPanel from "./RecommendationsPanel";
import PollutantInfo from "./PollutantInfo";

function Dashboard({ currentData, historicalData, loading }) {
  const [timeRange, setTimeRange] = useState("week");

  if (loading) {
    return <div className="dashboard-loading">Cargando datos...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard de Calidad del Aire - {currentData.city.name}</h2>
        <div className="time-range-selector">
          <button
            className={timeRange === "day" ? "active" : ""}
            onClick={() => setTimeRange("day")}
          >
            24 Horas
          </button>
          <button
            className={timeRange === "week" ? "active" : ""}
            onClick={() => setTimeRange("week")}
          >
            Semana
          </button>
          <button
            className={timeRange === "month" ? "active" : ""}
            onClick={() => setTimeRange("month")}
          >
            Mes
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-item current-conditions">
          <h3>Condiciones Actuales</h3>
          <div className="conditions-grid">
            <div className="condition-value">
              <span className="label">AQI</span>
              <span className={`value aqi-${getAQICategory(currentData.aqi)}`}>
                {currentData.aqi}
              </span>
            </div>
            {currentData.iaqi &&
              Object.entries(currentData.iaqi).map(([key, value]) => (
                <div key={key} className="condition-value">
                  <span className="label">{getPollutantName(key)}</span>
                  <span className="value">{value.v}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="dashboard-item chart-container">
          <h3>Histórico de AQI - {getTimeRangeText(timeRange)}</h3>
          <HistoricalChart data={historicalData} timeRange={timeRange} />
        </div>

        <div className="dashboard-item pollutant-info">
          <PollutantInfo data={currentData} />
        </div>

        <div className="dashboard-item recommendations">
          <RecommendationsPanel aqi={currentData.aqi} />
        </div>
      </div>
    </div>
  );
}

function getAQICategory(aqi) {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "sensitive";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "very-unhealthy";
  return "hazardous";
}

function getPollutantName(key) {
  const pollutants = {
    pm25: "PM2.5",
    pm10: "PM10",
    o3: "Ozono",
    no2: "NO₂",
    so2: "SO₂",
    co: "CO",
  };
  return pollutants[key] || key.toUpperCase();
}

function getTimeRangeText(range) {
  switch (range) {
    case "day":
      return "Últimas 24 horas";
    case "week":
      return "Última semana";
    case "month":
      return "Último mes";
    default:
      return "";
  }
}

export default Dashboard;
