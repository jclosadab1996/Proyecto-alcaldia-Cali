import React from 'react';
import { MapPin, Eye, Cloud, Activity, MessageCircle, AlertTriangle } from 'lucide-react';

interface AirQualityCardProps {
  city: string;
  aqi: number;
  reports: Array<{
    type: string;
    time: string;
    likes: number;
  }>;
}

const AQI_LEVELS = [
  { max: 50, label: 'Buena', color: 'bg-green-500', description: 'La calidad del aire es satisfactoria y la contaminación del aire representa poco o ningún riesgo.' },
  { max: 100, label: 'Moderada', color: 'bg-yellow-500', description: 'La calidad del aire es aceptable. Sin embargo, puede haber un riesgo moderado para algunas personas.' },
  { max: 150, label: 'Dañina para grupos sensibles', color: 'bg-orange-500', description: 'Los miembros de grupos sensibles pueden experimentar efectos en la salud. El público en general no suele verse afectado.' },
  { max: 200, label: 'Dañina', color: 'bg-red-500', description: 'Todo el mundo puede comenzar a experimentar efectos en la salud. Los miembros de grupos sensibles pueden experimentar efectos más graves.' },
  { max: 300, label: 'Muy dañina', color: 'bg-purple-500', description: 'Advertencias sanitarias de condiciones de emergencia. Toda la población tiene más probabilidades de verse afectada.' },
  { max: 500, label: 'Peligrosa', color: 'bg-rose-900', description: 'Alerta sanitaria: todo el mundo puede experimentar efectos de salud más graves.' },
];

const getAqiInfo = (aqi: number) => {
  return AQI_LEVELS.find((level, index) => 
    aqi <= level.max || index === AQI_LEVELS.length - 1
  ) || AQI_LEVELS[AQI_LEVELS.length - 1];
};

const getRecommendation = (aqi: number): string => {
  if (aqi <= 50) return 'Condiciones ideales para actividades al aire libre';
  if (aqi <= 100) return 'Considere reducir actividades al aire libre prolongadas';
  if (aqi <= 150) return 'Grupos sensibles deben evitar actividades al aire libre';
  if (aqi <= 200) return 'Evite actividades al aire libre prolongadas';
  return 'Evite todas las actividades al aire libre';
};

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ city, aqi, reports }) => {
  const aqiInfo = getAqiInfo(aqi);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Calidad del Aire {city}</h2>
        <MapPin className="w-6 h-6" />
      </div>

      <div className={`${aqiInfo.color} rounded-xl p-8 text-center text-white mb-6`}>
        <div className="text-6xl font-bold mb-2">{aqi}</div>
        <div className="text-xl">{aqiInfo.label}</div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">{getRecommendation(aqi)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{aqiInfo.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">¿Cómo está el aire ahora?</h3>
          <a href="#" className="text-blue-500">Ver todos</a>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <Eye className="w-6 h-6 mb-1" />
            <span className="text-sm">Visible</span>
          </div>
          <div className="flex flex-col items-center">
            <Cloud className="w-6 h-6 mb-1" />
            <span className="text-sm">Humo</span>
          </div>
          <div className="flex flex-col items-center">
            <Activity className="w-6 h-6 mb-1" />
            <span className="text-sm">Olores</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="w-6 h-6 mb-1" />
            <span className="text-sm">Otro</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Reportes recientes</h3>
        {reports.map((report, index) => (
          <div key={index} className="py-3 border-b last:border-b-0">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{report.type}</p>
                <p className="text-sm text-gray-500">{report.time}</p>
              </div>
              <div className="flex items-center gap-1">
                <span>👍</span>
                <span>{report.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};