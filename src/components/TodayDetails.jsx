import { ArrowUpCircleIcon, ArrowDownCircleIcon } from "@heroicons/react/24/outline";

export default function TodayDetails({ currentWeather }) {
  if (!currentWeather) return;
  const iconUrl = `http://openweathermap.org/img/wn/${currentWeather[0].weather[0].icon}@2x.png`;

  return (
    <div className="flex flex-col grow border-0 bg-gray-100 rounded-xl px-8 py-6 gap-2">
      <div className="text-lg font-medium">Today's Weather</div>
      <div className="font-medium text-xs -mt-2 text-gray-400">More interesting than Twilight</div>
      <div className="flex flex-col items-center gap-3">
        <img
          className="max-w-[150px] brightness-50 saturate-0"
          src={iconUrl}
          alt={currentWeather[0].dt}
        />
        <div className=" text-3xl -mt-6">
          {currentWeather[0].weather[0].main}
        </div>
        <div className="text-center text-sm">{currentWeather[0].summary}</div>

        <div className="flex flex-row text-xs font-medium gap-x-1 text-gray-500">
          <span className="flex items-center gap-1">
            <ArrowUpCircleIcon className="h-4 w-4 " />
            Max: {Math.round(currentWeather[0].temp.max)}°C
          </span> · 
          <span className="flex items-center gap-1">
            <ArrowDownCircleIcon className="h-4 w-4 " />
            Min: {Math.round(currentWeather[0].temp.min)}°C
          </span>
        </div>
        <div className="flex flex-row flex-wrap gap-x-2 text-xs">
            <span>Humidity: {currentWeather[0].humidity}%</span>
            <span>Wind: {currentWeather[0].wind_speed}m/s</span>
            <span>Pressure: {currentWeather[0].pressure}hPa</span>
        </div>
      </div>
    </div>
  );
}
