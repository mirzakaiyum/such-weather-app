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

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartLine({ currentWeather }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Weather Report",
      },
    },
  };

  const label = currentWeather?.map((next) => {
    return new Date(next.dt * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  });

  const data = {
    labels: label,
    datasets: [
      {
        label: "Temperature",
        data: currentWeather?.map((next) => next.temp.day),
        backgroundColor: "#fff",
        borderColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col grow border-0 bg-gray-100 rounded-xl px-8 py-6 gap-2">
      <div className="text-lg font-medium">Daily Temperature</div>
      <div className="flex flex-col items-center gap-3">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
