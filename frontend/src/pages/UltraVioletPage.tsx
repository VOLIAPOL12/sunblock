import { useEffect, useState } from "react";
import { useLocationStore } from "../store/useLocationStore"
import { useWeatherStore } from "../store/useWeatherStore";

import sunExtreme from "../assets/sun_extreme.gif";
import sunVeryHigh from "../assets/sun_very_high.gif";
import sunHigh from "../assets/sun_high.gif";
import sunMedium from "../assets/sun_medium.gif";
import sunLow from "../assets/sun_low.gif";
import { useNavigate } from "react-router-dom";

interface UltraVioletProps {}

const UltraVioletPage: React.FC<UltraVioletProps> = ({}) => {

  const {selectedLocation} = useLocationStore();
  const [noData, setNoData] = useState(false);
  const [dangerMessage, setDangerMessage] = useState("");
  const [uvGif, setUvGif] = useState<string | null>(null);
  const navigate = useNavigate();

  const { weatherData, fetchWeather } = useWeatherStore();

  useEffect(() => {
    if(!selectedLocation) {
      setNoData(true);
    } else {
      fetchWeather(selectedLocation.Lat_precise, selectedLocation.Long_precise)
    }
  }, [fetchWeather, selectedLocation])

  useEffect(() => {
    if (weatherData?.daily?.uv_index_max?.[0] !== undefined) {
      const uvIndex = weatherData.daily.uv_index_max[0];

      if (uvIndex >= 11) {
        setDangerMessage("Extremely Dangerous: Avoid direct sun exposure!");
        setUvGif(sunExtreme);
      } else if (uvIndex >= 8) {
        setDangerMessage("UV is Very High: Seek shade and wear sunscreen.");
        setUvGif(sunVeryHigh);
      } else if (uvIndex >= 6) {
        setDangerMessage("UV is High: Protect yourself with sunglasses & a hat.");
        setUvGif(sunHigh);
      } else if (uvIndex >= 3) {
        setDangerMessage("UV is Moderate: Be cautious during peak hours.");
        setUvGif(sunMedium);
      } else {
        setDangerMessage("The sun is friendly today! Enjoy the outdoors.");
        setUvGif(sunLow);
      }
    }
  }, [weatherData]);

  const uvIndex = weatherData?.daily?.uv_index_max?.[0] ?? null;

  const hourlyTimes = weatherData?.hourly?.time ?? [];
  const hourlyTemperatures = weatherData?.hourly?.temperature_2m ?? [];

  const handleGoingHome = () => {
    navigate("/");
  }

  return (
    <>
      <div className="p-6 text-center">
        {noData ?
        (
        <>
          <h1 className="">There is no data</h1>
          <button className="mt-4 px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-purple-700 transition" onClick={handleGoingHome}>
            Go to main page
          </button>
        </>
        
        ) :
        (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">UV Index Forecast</h2>

          {uvIndex !== null ? (
            <>
              <p className="text-lg mt-2">Max Forecast: {uvIndex}</p>
              <img src={uvGif} alt={`UV Index ${uvIndex}`} className="w-64 h-64 mt-4" />
              <p className="text-lg font-semibold mt-2 text-center text-gray-700">
                {dangerMessage}
              </p>
            </>
          ) : (
            <p>Loading UV index...</p>
          )}
        </div>
        )}
      </div>

      <div className="w-full mt-6">
        <h3 className="text-xl font-bold text-center">Hourly Forecast</h3>

        {/* Desktop View (Table Format) */}
        <div className="hidden md:grid grid-cols-6 gap-4 mt-4 px-10">
          {hourlyTimes.map((time, index) => (
            <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 flex flex-col items-center">
              <p className="text-lg font-semibold">{time.split("T")[1]}</p>
              <p className="text-2xl font-bold">{hourlyTemperatures[index]}°</p>
            </div>
          ))}
        </div>

        {/* Mobile View (Horizontally Scrollable) */}
        <div className="md:hidden overflow-x-auto my-4">
          <div className="flex space-x-4">
            {hourlyTimes.map((time, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg p-2 min-w-[80px] flex flex-col items-center"
              >
                <p className="text-sm font-semibold">{time.split("T")[1]}</p>
                <p className="text-lg font-bold">{hourlyTemperatures[index]}°</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default UltraVioletPage