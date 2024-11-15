function PollutantInfo({ data }) {
  const pollutantDescriptions = {
    pm25: {
      name: "PM2.5",
      description:
        "Partículas finas con diámetro menor a 2.5 micrómetros. Pueden penetrar profundamente en los pulmones.",
      effects:
        "Problemas respiratorios, cardiovasculares y agravamiento de asma.",
    },
    pm10: {
      name: "PM10",
      description: "Partículas gruesas con diámetro menor a 10 micrómetros.",
      effects: "Irritación de vías respiratorias y agravamiento de alergias.",
    },
    o3: {
      name: "Ozono",
      description:
        "Gas formado por reacciones químicas entre óxidos de nitrógeno y compuestos orgánicos volátiles.",
      effects: "Problemas respiratorios, reducción de función pulmonar y asma.",
    },
    no2: {
      name: "Dióxido de Nitrógeno",
      description:
        "Gas tóxico producido principalmente por vehículos y procesos industriales.",
      effects:
        "Inflamación de vías respiratorias y reducción de función pulmonar.",
    },
  };

  return (
    <div className="pollutant-info-container">
      <h3>Información de Contaminantes</h3>
      <div className="pollutants-grid">
        {Object.entries(data.iaqi || {}).map(([key, value]) => {
          const pollutant = pollutantDescriptions[key];
          if (!pollutant) return null;

          return (
            <div key={key} className="pollutant-card">
              <h4>{pollutant.name}</h4>
              <div className="pollutant-value">
                Valor actual: <span className="value">{value.v}</span>
              </div>
              <p className="description">{pollutant.description}</p>
              <p className="effects">
                <strong>Efectos en la salud:</strong>
                <br />
                {pollutant.effects}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PollutantInfo;
