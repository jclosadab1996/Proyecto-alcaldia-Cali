import React, { useState, useEffect } from 'react';
import { Wind, Droplets, Sun, Thermometer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import node1Data from '../data/nodo1.json';
import node2Data from '../data/nodo2.json';
import node3Data from '../data/nodo3.json';
import node4Data from '../data/nodo4.json';
import node5Data from '../data/nodo5.json';
import node6Data from '../data/nodo6.json';
import node7Data from '../data/nodo7.json';
import node8Data from '../data/nodo8.json';
import node10Data from '../data/nodo10.json';
import node11Data from '../data/nodo11.json';
import node12Data from '../data/nodo12.json';
import node13Data from '../data/nodo13.json';
import node14Data from '../data/nodo14.json';
import node15Data from '../data/nodo15.json';
import node16Data from '../data/nodo16.json';
import node17Data from '../data/nodo17.json';
import node18Data from '../data/nodo18.json';

const nodeInstitutions = {
  'N1': 'Ecoparque Corazón de Pance',
  'N2': 'Ecoparque Las Garzas',
  'N3': 'Universidad San Buenaventura',
  'N4': 'Universidad ICESI',
  'N5': 'Universidad Autónoma de Occidente',
  'N6': 'Universidad Javeriana',
  'N7': 'Fundación Universitaria San Martin',
  'N8': 'Universidad Libre',
  'N10': 'Colegio Nuevo Cambridge',
  'N11': 'Club Campestre Cali',
  'N12': 'Universidad Católica Meléndez',
  'N13': 'Holguines Trade Center',
  'N14': 'Universidad Santiago de Cali',
  'N15': 'Zonamérica',
  'N16': 'Fundación Valle del Lili',
  'N17': 'Colegio Nuestra Señora del Rosario',
  'N18': 'Condominio Bagatelle'
};

const getAirQualityCategory = (pm25: number, pm10: number) => {
  // PM2.5 ranges
  if (pm25 <= 12) return { category: 'Buena', color: 'bg-green-500', textColor: 'text-green-500' };
  if (pm25 <= 37) return { category: 'Moderada', color: 'bg-yellow-500', textColor: 'text-yellow-500' };
  if (pm25 <= 55) return { category: 'Dañina para grupos sensibles', color: 'bg-orange-500', textColor: 'text-orange-500' };
  if (pm25 <= 150) return { category: 'Dañina', color: 'bg-red-500', textColor: 'text-red-500' };
  if (pm25 <= 250) return { category: 'Muy dañina', color: 'bg-purple-500', textColor: 'text-purple-500' };
  return { category: 'Peligrosa', color: 'bg-red-900', textColor: 'text-red-900' };
};

export const Dashboard = () => {
  const [selectedNode, setSelectedNode] = useState('N1');
  const [timeRange, setTimeRange] = useState('month');

  const allNodesData = {
    'N1': node1Data.node1,
    'N2': node2Data['node 2'],
    'N3': node3Data.node3,
    'N4': node4Data.node4,
    'N5': node5Data.node5,
    'N6': node6Data.node6,
    'N7': node7Data.node7,
    'N8': node8Data.node8,
    'N10': node10Data.node10,
    'N11': node11Data.node11,
    'N12': node12Data.node12,
    'N13': node13Data.node13,
    'N14': node14Data.node14,
    'N15': node15Data.node15,
    'N16': node16Data.node16,
    'N17': node17Data.node17,
    'N18': node18Data.node18
  };

  const currentNodeData = allNodesData[selectedNode]?.[0] || {};
  const airQualityStatus = getAirQualityCategory(currentNodeData['pm2.5'], currentNodeData['pm10']);

  return (
    <div className="space-y-6">
      {/* Node Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Seleccionar Nodo</h3>
        <select
          value={selectedNode}
          onChange={(e) => setSelectedNode(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          {Object.entries(nodeInstitutions).map(([node, institution]) => (
            <option key={node} value={node}>
              {node} - {institution}
            </option>
          ))}
        </select>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Wind className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold">Viento</h3>
          </div>
          <p className="text-2xl font-bold">{currentNodeData.velocidadViento} m/s</p>
          <p className="text-sm text-gray-600 mt-1">Velocidad del viento</p>
        </div>

        <div className="bg-green-50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-6 h-6 text-green-500" />
            <h3 className="font-semibold">Humedad</h3>
          </div>
          <p className="text-2xl font-bold">{currentNodeData.humedad}%</p>
          <p className="text-sm text-gray-600 mt-1">Humedad relativa</p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Sun className="w-6 h-6 text-yellow-500" />
            <h3 className="font-semibold">Radiación Solar</h3>
          </div>
          <p className="text-2xl font-bold">{currentNodeData.radiacionSolar} W/m²</p>
          <p className="text-sm text-gray-600 mt-1">Índice UV: {currentNodeData.indiceUV}</p>
        </div>

        <div className="bg-red-50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Thermometer className="w-6 h-6 text-red-500" />
            <h3 className="font-semibold">Temperatura</h3>
          </div>
          <p className="text-2xl font-bold">{currentNodeData.temperatura}°C</p>
          <p className="text-sm text-gray-600 mt-1">Temperatura ambiente</p>
        </div>
      </div>

      {/* Air Quality Status */}
      <div className={`${airQualityStatus.color} bg-opacity-10 rounded-xl p-6 shadow-sm`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Calidad del Aire</h3>
            <p className={`text-2xl font-bold ${airQualityStatus.textColor}`}>
              {airQualityStatus.category}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">PM2.5</p>
            <p className="text-xl font-bold">{currentNodeData['pm2.5']} µg/m³</p>
            <p className="text-sm text-gray-600 mt-2">PM10</p>
            <p className="text-xl font-bold">{currentNodeData['pm10']} µg/m³</p>
          </div>
        </div>
      </div>

      {/* Historical Data */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Datos Históricos</h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="month">Último Mes</option>
            <option value="week">Última Semana</option>
            <option value="day">Último Día</option>
          </select>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={allNodesData[selectedNode]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pm2.5" stroke="#8884d8" name="PM2.5" />
              <Line type="monotone" dataKey="pm10" stroke="#82ca9d" name="PM10" />
              <Line type="monotone" dataKey="temperatura" stroke="#ff7300" name="Temperatura" />
              <Line type="monotone" dataKey="humedad" stroke="#0088aa" name="Humedad" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};