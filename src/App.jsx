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
    setSearchTerm(inputRef.current.value);
  }

  useEffect(function (){
    async function fetchWeather() {
      setLoading(true);
      setError("");
  
      try {
        if (!searchTerm) {
          return;
        }
  
        const locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${WEATHER_API}`;
        const locationRes = await fetch(locationURL);
  
        if (!locationRes.ok) {
          throw new Error(`Error: ${locationRes.status}`);
        }
  
        const locationData = await locationRes.json();
        const query = { lat: locationData[0].lat, lon: locationData[0].lon };
  
        const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${query.lat}&lon=${query.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${WEATHER_API}`;
        const weatherRes = await fetch(weatherURL);
  
        if (!weatherRes.ok) {
          throw new Error(`Error: ${weatherRes.status}`);
        }
  
        const weatherData = await weatherRes.json();
        setForecast(weatherData.daily?.filter((_, index) => index > 0 && index < 6));
        setCurrentWeather(weatherData.daily);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  
    fetchWeather();
  }, [searchTerm]);

  return (
    <>
      <Navigation />
      <TodayWeather currentWeather={currentWeather} />
      <Search handleSearch={handleSearch} inputRef={inputRef} />
      <DetailedWeather forecast={forecast}>
        {loading && <p >Loading...</p>}
        {!loading && !error && (
          <>
            <TodayDetails currentWeather={currentWeather} />
            <FiveDayForecast forecast={forecast} />
            <ChartLine currentWeather={currentWeather} />
            <ChartDoughnut currentWeather={currentWeather} />
          </>
        )}
      </DetailedWeather>
    </>
  );
}

export default App;
