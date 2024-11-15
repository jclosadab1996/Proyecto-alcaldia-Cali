function RecommendationsPanel({ aqi }) {
  const getRecommendations = () => {
    if (aqi <= 50) {
      return {
        title: "Condiciones Ideales",
        general:
          "La calidad del aire es óptima para realizar actividades al aire libre.",
        activities: [
          "Puede realizar cualquier actividad al aire libre",
          "Ideal para ejercicio y deportes",
          "Perfecto para actividades familiares exteriores",
        ],
      };
    } else if (aqi <= 100) {
      return {
        title: "Precaución Moderada",
        general:
          "La calidad del aire es aceptable, pero algunas personas sensibles podrían tener problemas.",
        activities: [
          "Personas con sensibilidad extrema deben considerar reducir actividad prolongada al aire libre",
          "Buen momento para actividades al aire libre para la mayoría",
          "Mantener ventanas abiertas para ventilación",
        ],
      };
    } else if (aqi <= 150) {
      return {
        title: "Precaución para Grupos Sensibles",
        general:
          "Miembros de grupos sensibles pueden experimentar efectos en la salud.",
        activities: [
          "Personas con problemas respiratorios deben limitar actividades al aire libre",
          "Niños y ancianos deben reducir el ejercicio prolongado al exterior",
          "Considerar actividades en interiores",
        ],
      };
    } else if (aqi <= 200) {
      return {
        title: "Condiciones Insalubres",
        general:
          "Toda la población puede comenzar a experimentar efectos en la salud.",
        activities: [
          "Evitar actividades prolongadas al aire libre",
          "Usar mascarilla en exteriores",
          "Mantener ventanas cerradas",
          "Usar purificadores de aire en interiores",
        ],
      };
    } else if (aqi <= 300) {
      return {
        title: "Muy Insalubre",
        general:
          "¡Advertencia de salud! Todos pueden experimentar efectos más serios.",
        activities: [
          "Evitar todas las actividades al aire libre",
          "Usar mascarilla N95 o superior si es necesario salir",
          "Mantener todas las ventanas cerradas",
          "Activar purificadores de aire",
          "Considerar evacuación si es prolongado",
        ],
      };
    } else {
      return {
        title: "¡Peligro!",
        general:
          "¡Alerta de salud de emergencia! Toda la población está en riesgo.",
        activities: [
          "Permanecer en interiores",
          "Sellar ventanas y puertas",
          "Usar mascarilla en todo momento si debe salir",
          "Contactar autoridades si hay problemas respiratorios",
          "Seguir las indicaciones de evacuación",
        ],
      };
    }
  };

  const recommendations = getRecommendations();

  return (
    <div className="recommendations-panel">
      <h3>{recommendations.title}</h3>
      <p className="general-advice">{recommendations.general}</p>
      <div className="recommendations-list">
        <h4>Recomendaciones:</h4>
        <ul>
          {recommendations.activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
      {aqi > 150 && (
        <div className="emergency-contacts">
          <h4>Contactos de Emergencia</h4>
          <p>Emergencias: 112</p>
          <p>Protección Civil: XXX-XXX-XXX</p>
        </div>
      )}
    </div>
  );
}

export default RecommendationsPanel;
