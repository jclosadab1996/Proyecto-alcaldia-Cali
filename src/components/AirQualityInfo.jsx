function AirQualityInfo() {
  return (
    <div className="air-quality-info">
      <h2>Índice de Calidad del Aire (AQI)</h2>
      <div className="quality-levels">
        <div className="level good">
          <h3>Bueno (0-50)</h3>
          <p>
            La calidad del aire es satisfactoria y la contaminación del aire
            representa poco o ningún riesgo.
          </p>
        </div>
        <div className="level moderate">
          <h3>Moderado (51-100)</h3>
          <p>
            La calidad del aire es aceptable, aunque puede haber preocupación
            para un número muy pequeño de personas.
          </p>
        </div>
        <div className="level unhealthy-sensitive">
          <h3>Insalubre para Grupos Sensibles (101-150)</h3>
          <p>
            Los miembros de grupos sensibles pueden experimentar efectos en la
            salud.
          </p>
        </div>
        <div className="level unhealthy">
          <h3>Insalubre (151-200)</h3>
          <p>Todos pueden comenzar a experimentar efectos en la salud.</p>
        </div>
        <div className="level very-unhealthy">
          <h3>Muy Insalubre (201-300)</h3>
          <p>Advertencias sanitarias de condiciones de emergencia.</p>
        </div>
        <div className="level hazardous">
          <h3>Peligroso (301+)</h3>
          <p>
            Alerta sanitaria: todos pueden experimentar efectos de salud más
            graves.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AirQualityInfo;
