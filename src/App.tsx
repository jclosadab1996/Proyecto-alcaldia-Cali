import React, { useState } from "react";
import { AirQualityCard } from "./components/AirQualityCard";
import { AirQualityMap } from "./components/Map";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [selectedNode, setSelectedNode] = useState<string>("N1");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Monitor de Calidad del Aire - Cali
        </h1>

        <div className="space-y-8">
          {/* Map Section */}
          <div
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            style={{ height: "600px" }}
          >
            <AirQualityMap
              selectedNode={selectedNode}
              onNodeSelect={setSelectedNode}
            />
          </div>

          {/* Air Quality Card */}
          <div className="max-w-4xl mx-auto">
            <AirQualityCard nodeId={selectedNode} />
          </div>

          {/* Dashboard */}
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
