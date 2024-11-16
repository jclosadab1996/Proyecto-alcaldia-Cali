import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AirQualityCard } from './components/AirQualityCard';
import { AirQualityMap } from './components/Map';
import { Dashboard } from './components/Dashboard';
import type { AirQualityData } from './types';

function App() {
  const [airData, setAirData] = useState<AirQualityData | null>(null);
  const [selectedStation, setSelectedStation] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.waqi.info/feed/cali/?token=${import.meta.env.VITE_WAQI_API_TOKEN}`
        );
        setAirData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!airData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error al cargar los datos de calidad del aire</p>
      </div>
    );
  }

  const mockReports = [
    { type: 'Olor a quemado en el área', time: '2 min ago', likes: 3 },
    { type: 'Visibilidad reducida', time: '5 min ago', likes: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Monitor de Calidad del Aire - Cali</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: '700px' }}>
              <AirQualityMap
                data={[airData]}
                selectedStation={selectedStation}
                onSelectStation={setSelectedStation}
              />
            </div>
          </div>
          
          <div>
            <AirQualityCard
              city="Cali"
              aqi={airData.aqi}
              reports={mockReports}
            />
          </div>
        </div>

        <Dashboard data={airData} />
      </div>
    </div>
  );
}

export default App;