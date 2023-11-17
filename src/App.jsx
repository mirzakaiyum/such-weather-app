import { useState, useRef, useEffect } from "react";

import Navigation from "./components/Navigation";
import TodayWeather from "./components/TodayWeather";
import Search from "./components/Search";
import DetailedWeather from "./components/DetailedWeather";
import TodayDetails from "./components/TodayDetails";

const WEATHER_API = import.meta.env.VITE_WEATHER_API;

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [query, setQuery] = useState(null);

  const inputRef = useRef(null);

  async function locationConverter() {
    const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputRef.current.value}&limit=1&appid=${WEATHER_API}`
    const res = await fetch(URL);
    
    if (!res.ok) {
      // Handle error
      console.log("Error:", res.status);
      return;
    }
    const data = await res.json();

  const newQuery = {lat: data[0].lat, lon: data[0].lon};
  setQuery(newQuery);

  fetchWeather(newQuery);
  }



  async function fetchWeather(query) {
    if (!query || !query.lat || !query.lon) {
      console.error('Invalid query:', query);
      return;
    }

    const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${query.lat}&lon=${query.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${WEATHER_API}`;
    const res = await fetch(URL);
    if (!res.ok) {
      // Handle error
      console.log("Error:", res.status);
      return;
    }
    const data = await res.json();

    setForecast(data.daily?.filter((_, index) => index > 0 && index < 6 ))
    setCurrentWeather(data.daily);
  }

  useEffect(() => {
    if (query) {
      fetchWeather(query);
    }
  }, [query]);

  // function forecastWeather() {
  //   setForecast(currentWeather?.filter((_, index) => index < 6 ))
  // }


  function handleSearch(event) {
    event.preventDefault();
    locationConverter();

  }

  function FiveDayForecast({ forecast }) {
    return (
      <div className="flex flex-col grow border-0 bg-gray-100 rounded-xl px-8 py-6 gap-2">
        <div className="text-lg font-medium">5 days Forecast</div>
        <div className="flex flex-row flex-wrap gap-4">
          {forecast?.map(next => (
            <DayWeather key={next.dt} next={next} />
          ))}
        </div>
      </div>
    );
  }

  function DayWeather({ next }) {
    function DateConverter(date) {
      const newDate = new Date(date * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
  
      return newDate;
    }
    const iconUrl = `http://openweathermap.org/img/wn/${next.weather[0].icon}@2x.png`
    return (
      <div className="flex flex-col grow items-center bg-white shadow-sm p-3 border rounded-lg">
        <div>{Math.round(next.temp.day)}°C</div>
        <div className="flex flex-row text-xs font-medium gap-x-1 text-gray-500">
          <span className="flex items-center gap-1">
            Max: {Math.round(next.temp.max)}°C
          </span> · 
          <span className="flex items-center gap-1">
            Min: {Math.round(next.temp.min)}°C
          </span>
        </div>
        <img className="brightness-50 saturate-0" src={iconUrl} alt={next.dt} />
        <div>{DateConverter(next.dt)}</div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <TodayWeather currentWeather={currentWeather} />
      <Search
        handleSearch={handleSearch}
        inputRef={inputRef}
      />
      <DetailedWeather query={query} forecast={forecast}>
        <TodayDetails currentWeather={currentWeather} />
        <FiveDayForecast forecast={forecast} /> 
      </DetailedWeather>
    </>
  );
}

export default App;
