function AirQualityAlert({ aqi }) {
  const getAlertMessage = () => {
    if (aqi > 300) {
      return {
        severity: "Peligroso",
        message:
          "¡ALERTA! Condiciones de aire extremadamente peligrosas. Evite cualquier actividad al aire libre.",
      };
    } else if (aqi > 200) {
      return {
        severity: "Muy Insalubre",
        message:
          "Condiciones de aire muy insalubres. Se recomienda permanecer en interiores.",
      };
    } else {
      return {
        severity: "Insalubre",
        message:
          "La calidad del aire es insalubre. Limite las actividades al aire libre.",
      };
    }
  };

  const alert = getAlertMessage();

  return (
    <div className="air-quality-alert">
      <h3>{alert.severity}</h3>
      <p>{alert.message}</p>
      <div className="recommendations">
        <h4>Recomendaciones:</h4>
        <ul>
          <li>Use mascarilla al salir</li>
          <li>Mantenga las ventanas cerradas</li>
          <li>Evite ejercicio al aire libre</li>
          <li>Use purificador de aire si es posible</li>
        </ul>
      </div>
    </div>
  );
}

export default AirQualityAlert;
