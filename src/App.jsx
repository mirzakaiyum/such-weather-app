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
  const [searchTerm, setSearchTerm] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  function handleSearch(event) {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    if (inputValue) {
      setSearchTerm(inputValue);
    }
  }

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;
      
      async function fetchWeather() {
        setLoading(true);
        setError("");
        try {
          if (!searchTerm) {
            return;
          }

          const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${WEATHER_API}`;
          const locationRes = await fetch(locationURL, { signal });

          if (!locationRes.ok) {
            throw new Error(`Error: ${locationRes.status}`);
          }

          const locationData = await locationRes.json();

          if (locationData.length === 0) {
            throw new Error("Location not found");
          }

          const query = { lat: locationData[0].lat, lon: locationData[0].lon };

          const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${query.lat}&lon=${query.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${WEATHER_API}`;
          const weatherRes = await fetch(weatherURL, { signal });

          if (!weatherRes.ok) {
            throw new Error(`Error: ${weatherRes.status}`);
          }

          const weatherData = await weatherRes.json();
          setForecast(
            weatherData.daily?.filter((_, index) => index > 0 && index < 6)
          );
          setCurrentWeather(weatherData.daily);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }

      fetchWeather();

      return function () {
        controller.abort();
      };
    },
    [searchTerm]
  );

  return (
    <>
      <Navigation />
      <TodayWeather currentWeather={currentWeather} />
      <Search handleSearch={handleSearch} inputRef={inputRef} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && currentWeather && forecast && (
        <DetailedWeather forecast={forecast}>
          <TodayDetails currentWeather={currentWeather} />
          <FiveDayForecast forecast={forecast} />
          <ChartLine currentWeather={currentWeather} />
          <ChartDoughnut currentWeather={currentWeather} />
        </DetailedWeather>
      )}
    </>
  );
}

export default App;
