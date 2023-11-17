import { useState, useRef, useEffect } from "react";

import Navigation from "./components/Navigation";
import TodayWeather from "./components/TodayWeather";
import Search from "./components/Search";
import FiveDayForecast from "./components/FiveDayForecast";
import DetailedWeather from "./components/DetailedWeather";
import TodayDetails from "./components/TodayDetails";
import ChartLine from "./components/ChartLine";
import ChartDoughnut from "./components/ChartDoughnut";

const WEATHER_API = import.meta.env.VITE_WEATHER_API;

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [query, setQuery] = useState(null);

  const inputRef = useRef(null);

  async function locationConverter() {
    const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${inputRef.current.value}&limit=1&appid=${WEATHER_API}`;
    const res = await fetch(URL);

    if (!res.ok) {
      // Handle error
      console.log("Error:", res.status);
      return;
    }
    const data = await res.json();

    const newQuery = { lat: data[0].lat, lon: data[0].lon };
    setQuery(newQuery);

    fetchWeather(newQuery);
  }

  async function fetchWeather(query) {
    if (!query || !query.lat || !query.lon) {
      console.error("Invalid query:", query);
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

    setForecast(data.daily?.filter((_, index) => index > 0 && index < 6));
    setCurrentWeather(data.daily);
  }

  useEffect(() => {
    if (query) {
      fetchWeather(query);
    }
  }, [query]);

  function handleSearch(event) {
    event.preventDefault();
    locationConverter();
  }

  return (
    <>
      <Navigation />
      <TodayWeather currentWeather={currentWeather} />
      <Search handleSearch={handleSearch} inputRef={inputRef} />
      <DetailedWeather query={query} forecast={forecast}>
        <TodayDetails currentWeather={currentWeather} />
        <FiveDayForecast forecast={forecast} />
        <ChartLine currentWeather={currentWeather} />
        <ChartDoughnut currentWeather={currentWeather} />
      </DetailedWeather>
    </>
  );
}

export default App;
