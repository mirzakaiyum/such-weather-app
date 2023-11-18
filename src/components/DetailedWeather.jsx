export default function DetailedWeather({ children, forecast }) {
  return (
    <div className="flex justify-center mx-auto max-w-7xl px-4 sm:px-4 lg:px-4">
      <div className="flex grow flex-col py-6">
        <div className={`${forecast ? "" : "hidden"} flex flex-row flex-wrap gap-4`}>
          {children}
        </div>
      </div>
    </div>
  );
}
