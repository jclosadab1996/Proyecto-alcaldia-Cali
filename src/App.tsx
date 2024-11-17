import React, { useState } from 'react';
import { AirQualityCard } from './components/AirQualityCard';
import { AirQualityMap } from './components/Map';
import { Dashboard } from './components/Dashboard';

function App() {
  const [selectedNode, setSelectedNode] = useState<string>('N1');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Monitor de Calidad del Aire - Cali</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: '700px' }}>
              <AirQualityMap
                selectedNode={selectedNode}
                onNodeSelect={setSelectedNode}
              />
            </div>
          </div>
          
          <div>
            <AirQualityCard
              nodeId={selectedNode}
            />
          </div>
        </div>

        <Dashboard />
      </div>
    </div>
  );
}

export default App;