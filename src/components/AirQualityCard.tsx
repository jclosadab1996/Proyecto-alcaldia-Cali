import React from "react";
import { MapPin, Wind, Droplets, Sun, Thermometer, Bell } from "lucide-react";
import node1Data from "../data/nodo1.json";
import node2Data from "../data/nodo2.json";
import node3Data from "../data/nodo3.json";
import node4Data from "../data/nodo4.json";
import node5Data from "../data/nodo5.json";
import node6Data from "../data/nodo6.json";
import node7Data from "../data/nodo7.json";
import node8Data from "../data/nodo8.json";
import node10Data from "../data/nodo10.json";
import node11Data from "../data/nodo11.json";
import node12Data from "../data/nodo12.json";
import node13Data from "../data/nodo13.json";
import node14Data from "../data/nodo14.json";
import node15Data from "../data/nodo15.json";
import node16Data from "../data/nodo16.json";
import node17Data from "../data/nodo17.json";
import node18Data from "../data/nodo18.json";

interface AirQualityCardProps {
  nodeId: string;
}

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

const ICALevels = [
  {
    range: "0-50",
    color: "bg-green-500",
    category: "Buena",
    pm10: "0-54",
    pm25: "0-12",
  },
  {
    range: "51-100",
    color: "bg-yellow-500",
    category: "Moderada",
    pm10: "55-154",
    pm25: "13-37",
  },
  {
    range: "101-150",
    color: "bg-orange-500",
    category: "Dañina a grupos sensibles",
    pm10: "155-254",
    pm25: "38-55",
  },
  {
    range: "151-200",
    color: "bg-red-500",
    category: "Dañina",
    pm10: "255-354",
    pm25: "56-150",
  },
  {
    range: "201-300",
    color: "bg-purple-500",
    category: "Muy dañina",
    pm10: "355-424",
    pm25: "151-250",
  },
  {
    range: "301-500",
    color: "bg-red-900",
    category: "Peligrosa",
    pm10: "425-604",
    pm25: "251-500",
  },
];

const getAirQualityCategory = (pm25: number, pm10: number) => {
  if (pm25 <= 12)
    return {
      category: "Buena",
      color: "bg-green-500",
      textColor: "text-green-500",
      badge: "notification-good",
      alertBorder: "border-green-500",
    };
  if (pm25 <= 37)
    return {
      category: "Moderada",
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      badge: "notification-moderate",
      alertBorder: "border-yellow-500",
    };
  if (pm25 <= 55)
    return {
      category: "Dañina para grupos sensibles",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      badge: "notification-sensitive",
      alertBorder: "border-orange-500",
    };
  if (pm25 <= 150)
    return {
      category: "Dañina",
      color: "bg-red-500",
      textColor: "text-red-500",
      badge: "notification-unhealthy",
      alertBorder: "border-red-500",
    };
  if (pm25 <= 250)
    return {
      category: "Muy dañina",
      color: "bg-purple-500",
      textColor: "text-purple-500",
      badge: "notification-very-unhealthy",
      alertBorder: "border-purple-500",
    };
  return {
    category: "Peligrosa",
    color: "bg-red-900",
    textColor: "text-red-900",
    badge: "notification-hazardous",
    alertBorder: "border-red-900",
  };
};

const getRecommendation = (category: string): string => {
  switch (category) {
    case "Buena":
      return "Condiciones ideales para actividades al aire libre";
    case "Moderada":
      return "Considere reducir actividades al aire libre prolongadas";
    case "Dañina para grupos sensibles":
      return "Grupos sensibles deben evitar actividades al aire libre";
    case "Dañina":
      return "Evite actividades al aire libre prolongadas";
    case "Muy dañina":
    case "Peligrosa":
      return "Evite todas las actividades al aire libre";
    default:
      return "No hay recomendaciones disponibles";
  }
};

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ nodeId }) => {
  const allNodesData = {
    N1: node1Data.node1[0],
    N2: node2Data["node 2"][0],
    N3: node3Data.node3[0],
    N4: node4Data.node4[0],
    N5: node5Data.node5[0],
    N6: node6Data.node6[0],
    N7: node7Data.node7[0],
    N8: node8Data.node8[0],
    N10: node10Data.node10[0],
    N11: node11Data.node11[0],
    N12: node12Data.node12[0],
    N13: node13Data.node13[0],
    N14: node14Data.node14[0],
    N15: node15Data.node15[0],
    N16: node16Data.node16[0],
    N17: node17Data.node17[0],
    N18: node18Data.node18[0],
  };

  const nodeData = allNodesData[nodeId];
  const airQualityStatus = getAirQualityCategory(
    nodeData["pm2.5"],
    nodeData["pm10"]
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* ICA Table */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">{nodeId}</h2>
          <p className="text-gray-600">{nodeInstitutions[nodeId]}</p>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-400" />
          <span className={`notification-badge ${airQualityStatus.badge}`}>
            {Math.round(nodeData["pm2.5"])}
          </span>
        </div>
      </div>

      <div
        className={`${airQualityStatus.color} rounded-xl p-6 text-white mb-6`}
      >
        <div className="text-center">
          <p className="text-lg mb-2">Índice de Calidad del Aire</p>
          <div className="text-4xl font-bold mb-2">
            PM2.5: {nodeData["pm2.5"]} µg/m³
          </div>
          <div className="text-2xl">PM10: {nodeData["pm10"]} µg/m³</div>
          <div className="mt-4 text-xl font-semibold">
            {airQualityStatus.category}
          </div>
        </div>
      </div>

      <div
        className={`recommendation-alert ${airQualityStatus.alertBorder} bg-opacity-10 ${airQualityStatus.textColor}`}
      >
        <h3 className="font-semibold mb-2">Recomendación:</h3>
        <p>{getRecommendation(airQualityStatus.category)}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Viento</span>
          </div>
          <p className="text-xl font-semibold">
            {nodeData.velocidadViento} m/s
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-green-500" />
            <span className="font-medium">Humedad</span>
          </div>
          <p className="text-xl font-semibold">{nodeData.humedad}%</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">UV</span>
          </div>
          <p className="text-xl font-semibold">{nodeData.indiceUV}</p>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-5 h-5 text-red-500" />
            <span className="font-medium">Temperatura</span>
          </div>
          <p className="text-xl font-semibold">{nodeData.temperatura}°C</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="font-semibold mb-3">
          Notificaciones de Calidad del Aire
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${airQualityStatus.color}`}
              ></div>
              <span>PM2.5</span>
            </div>
            <span className={`font-semibold ${airQualityStatus.textColor}`}>
              {nodeData["pm2.5"]} µg/m³
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${airQualityStatus.color}`}
              ></div>
              <span>PM10</span>
            </div>
            <span className={`font-semibold ${airQualityStatus.textColor}`}>
              {nodeData["pm10"]} µg/m³
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${airQualityStatus.color}`}
              ></div>
              <span>Estado</span>
            </div>
            <span className={`font-semibold ${airQualityStatus.textColor}`}>
              {airQualityStatus.category}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8 p-4">
        <h3 className="text-lg font-semibold mb-4">
          Índice de Calidad del Aire (ICA)
        </h3>
        <table className="ica-table">
          <thead>
            <tr>
              <th>ICA</th>
              <th>Color</th>
              <th>Categoría</th>
              <th>PM10 µg/m³</th>
              <th>PM2.5 µg/m³</th>
            </tr>
          </thead>
          <tbody>
            {ICALevels.map((level, index) => (
              <tr key={index}>
                <td>{level.range}</td>
                <td>
                  <div className={`ica-color-indicator ${level.color}`}></div>
                </td>
                <td>{level.category}</td>
                <td>{level.pm10}</td>
                <td>{level.pm25}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
