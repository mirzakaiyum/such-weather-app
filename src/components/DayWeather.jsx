export default function DayWeather({ next }) {
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
        <div className="flex flex-row text-xs font-medium gap-x-1 text-gray-400">
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