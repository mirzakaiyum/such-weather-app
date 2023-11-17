import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default function ChartDoughnut({ currentWeather }) {
    const noOfSunnyDays = currentWeather?.filter((day) => day.weather[0].main === 'Clear').length
    const noOfRainyDays = currentWeather?.filter((day) => day.weather[0].main === 'Rain').length
    const noOfOtherDays = currentWeather?.filter((day) => day.weather[0].main !== 'Rain' && day.weather[0].main !== 'Clear').length
 
    const label = ['Sunny Days', 'Rainy Days', 'Other']
  
    const data = {
      labels: label,
      datasets: [
        {
          label: "Sunny Days vs Rainy Days",
          data: [noOfSunnyDays, noOfRainyDays, noOfOtherDays],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <div className="flex flex-col border-0 bg-gray-100 rounded-xl px-8 py-6 gap-2">
        <div className="text-lg font-medium">Umbrella Alerts</div>
        <div className="font-medium text-xs -mt-2 text-gray-400">Next week's guide to Umbrella Economics</div>
        <div className="flex flex-col flex-wrap items-center gap-3">
          <Doughnut data={data} />
        </div>
      </div>
    );
  }
  