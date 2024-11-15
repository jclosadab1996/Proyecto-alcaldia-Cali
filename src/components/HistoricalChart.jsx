import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function HistoricalChart({ data, timeRange }) {
  const formatData = () => {
    let values = [];
    let labels = [];

    if (data.forecast && data.forecast.daily) {
      const { pm25, pm10, o3 } = data.forecast.daily;

      // Get the appropriate number of days based on timeRange
      const daysToShow =
        timeRange === "day" ? 1 : timeRange === "week" ? 7 : 30;

      values = pm25.slice(0, daysToShow).map((item) => item.avg);
      labels = pm25
        .slice(0, daysToShow)
        .map((item) => new Date(item.day).toLocaleDateString());
    }

    return {
      labels,
      datasets: [
        {
          label: "AQI Promedio",
          data: values,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tendencia de Calidad del Aire",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Índice de Calidad del Aire (AQI)",
        },
      },
    },
  };

  return (
    <div className="historical-chart">
      <Line data={formatData()} options={options} />
    </div>
  );
}

export default HistoricalChart;
