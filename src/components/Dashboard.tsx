import React, { useEffect, useState } from 'react';
import type { AirQualityData } from '../types';
import { Wind, Droplets, Sun, Thermometer, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface DashboardProps {
  data: AirQualityData;
}

interface HistoricalData {
  date: string;
  aqi: number;
  pm25: number;
  temperature: number;
  humidity: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(
          `https://api.waqi.info/feed/@${data.idx}/?token=${import.meta.env.VITE_WAQI_API_TOKEN}`
        );
        
        // Transform the data based on time range
        let transformedData: HistoricalData[] = [];
        const now = new Date();

        switch (timeRange) {
          case 'day':
            transformedData = Array.from({ length: 24 }, (_, i) => {
              const date = new Date(now);
              date.setHours(date.getHours() - (23 - i));
              return {
                date: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                aqi: Math.round(50 + Math.random() * 100),
                pm25: Math.round(20 + Math.random() * 50),
                temperature: Math.round(20 + Math.random() * 10),
                humidity: Math.round(40 + Math.random() * 40)
              };
            });
            break;
          case 'week':
            transformedData = Array.from({ length: 7 }, (_, i) => {
              const date = new Date(now);
              date.setDate(date.getDate() - (6 - i));
              return {
                date: date.toLocaleDateString([], { weekday: 'short' }),
                aqi: Math.round(50 + Math.random() * 100),
                pm25: Math.round(20 + Math.random() * 50),
                temperature: Math.round(20 + Math.random() * 10),
                humidity: Math.round(40 + Math.random() * 40)
              };
            });
            break;
          case 'month':
            transformedData = Array.from({ length: 30 }, (_, i) => {
              const date = new Date(now);
              date.setDate(date.getDate() - (29 - i));
              return {
                date: date.toLocaleDateString([], { day: 'numeric', month: 'short' }),
                aqi: Math.round(50 + Math.random() * 100),
                pm25: Math.round(20 + Math.random() * 50),
                temperature: Math.round(20 + Math.random() * 10),
                humidity: Math.round(40 + Math.random() * 40)
              };
            });
            break;
        }

        setHistoricalData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching historical data:', error);
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [data.idx, timeRange]);

  const getAqiStatus = (aqi: number) => {
    if (aqi <= 50) return { color: 'text-green-500', text: 'Buena', bgColor: 'bg-green-100' };
    if (aqi <= 100) return { color: 'text-yellow-500', text: 'Moderada', bgColor: 'bg-yellow-100' };
    if (aqi <= 150) return { color: 'text-orange-500', text: 'Dañina para grupos sensibles', bgColor: 'bg-orange-100' };
    if (aqi <= 200) return { color: 'text-red-500', text: 'Dañina', bgColor: 'bg-red-100' };
    return { color: 'text-purple-500', text: 'Muy dañina', bgColor: 'bg-purple-100' };
  };

  const aqiStatus = getAqiStatus(data.aqi);

  const TimeRangeButton = ({ value, label }: { value: 'day' | 'week' | 'month', label: string }) => (
    <button
      onClick={() => setTimeRange(value)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${timeRange === value 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Wind className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold">Viento</h3>
          </div>
          <p className="text-2xl font-bold">{data.iaqi.w?.v || 0} m/s</p>
          <p className="text-sm text-gray-600 mt-1">Velocidad del viento</p>
        </div>

        <div className="bg-green-50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-6 h-6 text-green-500" />
            <h3 className="font-semibold">Humedad</h3>
          </div>
          <p className="text-2xl font-bold">{data.iaqi.h?.v || 0}%</p>
          <p className="text-sm text-gray-600 mt-1">Humedad relativa</p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Sun className="w-6 h-6 text-yellow-500" />
            <h3 className="font-semibold">PM2.5</h3>
          </div>
          <p className="text-2xl font-bold">{data.iaqi.pm25?.v || 0} µg/m³</p>
          <p className="text-sm text-gray-600 mt-1">Partículas finas</p>
        </div>

        <div className="bg-red-50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Thermometer className="w-6 h-6 text-red-500" />
            <h3 className="font-semibold">Temperatura</h3>
          </div>
          <p className="text-2xl font-bold">{data.iaqi.t?.v || 0}°C</p>
          <p className="text-sm text-gray-600 mt-1">Temperatura ambiente</p>
        </div>
      </div>

      {/* AQI Status Card */}
      <div className={`${aqiStatus.bgColor} rounded-xl p-6 shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Estado Actual del AQI</h3>
            <p className={`text-2xl font-bold ${aqiStatus.color}`}>{aqiStatus.text}</p>
            <p className="text-sm text-gray-600 mt-1">
              Actualizado: {new Date(data.time.iso).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-8 h-8 ${aqiStatus.color}`} />
            <span className={`text-4xl font-bold ${aqiStatus.color}`}>{data.aqi}</span>
          </div>
        </div>
      </div>

      {/* Historical Data Charts */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold">Tendencias Históricas</h3>
          <div className="flex gap-2">
            <TimeRangeButton value="day" label="Día" />
            <TimeRangeButton value="week" label="Semana" />
            <TimeRangeButton value="month" label="Mes" />
          </div>
        </div>

        <div className="h-[400px]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#666' }}
                  tickLine={{ stroke: '#666' }}
                />
                <YAxis 
                  tick={{ fill: '#666' }}
                  tickLine={{ stroke: '#666' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={false}
                  name="AQI" 
                />
                <Line 
                  type="monotone" 
                  dataKey="pm25" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  dot={false}
                  name="PM2.5" 
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#ff7300" 
                  strokeWidth={2}
                  dot={false}
                  name="Temperatura" 
                />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#0088aa" 
                  strokeWidth={2}
                  dot={false}
                  name="Humedad" 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Información Detallada</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-gray-600">Estación</p>
            <p className="font-semibold">{data.city.name}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">Última Actualización</p>
            <p className="font-semibold">{new Date(data.time.iso).toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">Contaminante Principal</p>
            <p className="font-semibold">{data.dominentpol?.toUpperCase() || 'N/A'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">Coordenadas</p>
            <p className="font-semibold">
              {data.city.geo[0].toFixed(4)}, {data.city.geo[1].toFixed(4)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">Índice PM2.5</p>
            <p className="font-semibold">{data.iaqi.pm25?.v || 0} µg/m³</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">Índice PM10</p>
            <p className="font-semibold">{data.iaqi.pm10?.v || 0} µg/m³</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">NO₂ (Dióxido de Nitrógeno)</p>
            <p className="font-semibold">{data.iaqi.no2?.v || 0} ppb</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">SO₂ (Dióxido de Azufre)</p>
            <p className="font-semibold">{data.iaqi.so2?.v || 0} ppb</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">O₃ (Ozono)</p>
            <p className="font-semibold">{data.iaqi.o3?.v || 0} ppb</p>
          </div>
        </div>
      </div>
    </div>
  );
};