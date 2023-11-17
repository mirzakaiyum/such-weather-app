import DayWeather from "./DayWeather";

export default function FiveDayForecast({ forecast }) {
    return (
      <div className="flex flex-col grow border-0 bg-gray-100 rounded-xl px-8 py-6 gap-2">
        <div className="text-lg font-medium">5-days Forecast Wisdom</div>
        <div className="font-medium text-xs -mt-2 mb-2 text-gray-400">Mother Nature's Daily Mood Swing</div>
        <div className="flex flex-row flex-wrap gap-4">
          {forecast?.map(next => (
            <DayWeather key={next.dt} next={next} />
          ))}
        </div>
      </div>
    );
  }