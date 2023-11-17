import { useState, useEffect } from "react";
import { weatherConditions } from "./weatherConditions";


export default function TodayWeather({ currentWeather }) {
  const [currentCondition, setCurrentCondition] = useState(null);
  const [joke, setJoke] = useState(null);
  const [weatherColor, setWeatherColor] = useState('bg-gray-700/5');

  const todayWeather = currentWeather ? currentWeather[0] : null;

  useEffect(() => {
    if(currentWeather) {
      const condition = currentWeather[0].weather[0].main;
      setCurrentCondition(condition);
  
      const matchingCondition = weatherConditions.find(weather => weather.condition === condition);
      if (matchingCondition) {
        setJoke(matchingCondition.joke);
        setWeatherColor(matchingCondition.color);
      }
    }
  }, [currentWeather]);

  function timeConverter(time) {
    const newTime = new Date(time * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    return newTime;
  }

  function todayDate() {
    const newDate = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    return newDate;
  }

  return (
    <div className={`${weatherColor} bg-contain bg-center bg-repeat py-6 transition ease-in-out duration-[3s] flex min-h-[40vh]`}>
      <div className={`flex flex-grow items-center justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}>
        <div className="flex flex-col items-center justify-center gap-3">
          <div>
            <div className="font-semibold">{todayDate()}</div>
          </div>
          <div className="text-7xl font-thin -mt-2">
            {currentWeather
              ? `${Math.round(todayWeather.temp.day)}°C`
              : "Such Weather"}
          </div>
          <div className="opacity-40">
            {currentWeather ? (
              <div>
                Feels like {Math.round(todayWeather.feels_like.day)} °C · Sunset{" "}
                {timeConverter(todayWeather.sunset)}
              </div>
            ) : (
              "A weather app with humor"
            )}
          </div>

          <div className={`${joke ? "" : "hidden"} mt-4 border-0 p-4 bg-gray-900/5 rounded-xl font-normal`}>{joke} 😆</div>
        </div>
      </div>
    </div>
  );
}
