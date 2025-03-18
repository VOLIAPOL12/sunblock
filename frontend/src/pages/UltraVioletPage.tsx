import { useEffect, useState } from "react";
import { useLocationStore } from "../store/useLocationStore"
import { useWeatherStore } from "../store/useWeatherStore";

import sunExtreme from "../assets/sun_extreme.gif";
import sunVeryHigh from "../assets/sun_very_high.gif";
import sunHigh from "../assets/sun_high.gif";
import sunMedium from "../assets/sun_medium.gif";
import sunLow from "../assets/sun_low.gif";

import { FaWineBottle } from "react-icons/fa";
import { MdWbShade } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { TbSunglassesFilled } from "react-icons/tb";
import { FaRedhat, FaTshirt } from "react-icons/fa";


import { useNavigate } from "react-router-dom";

interface UltraVioletProps {}

const UltraVioletPage: React.FC<UltraVioletProps> = ({}) => {

  const {selectedLocation} = useLocationStore();
  const [noData, setNoData] = useState(false);
  const [uvLevelInformation, setUvLevelInformation] = useState({dangerMessage: "", uvColor: "", uvSeverity: "", uvGif: "", recommendations: [{text: "", icon: <div></div>}]});
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
        setUvLevelInformation({
          dangerMessage: "Avoid direct sun exposure!",
          uvColor: "bg-purple-600 text-white",
          uvSeverity: "EXTREMELY HIGH",
          uvGif: sunExtreme,
          recommendations: [{text: "Wear SPF 50+", icon: <FaWineBottle/>}, { text: "Seek Shade", icon: <MdWbShade /> }, { text: "Avoid Going Out", icon: <FaHome/>}]
        });
      } else if (uvIndex >= 8) {
        setUvLevelInformation({
          dangerMessage: "Seek shade and wear sunscreen.",
          uvColor: "bg-red-500 text-white",
          uvSeverity: "VERY HIGH",
          uvGif: sunVeryHigh,
          recommendations: [{text: "Wear SPF 50+", icon: <FaWineBottle/>}, { text: "Wear Sunglasses", icon: <TbSunglassesFilled />}, { text: "Wear a Hat", icon: <FaRedhat /> }]
        });
      } else if (uvIndex >= 6) {
        setUvLevelInformation({
          dangerMessage: "Protect yourself with sunglasses & a hat.",
          uvColor: "bg-orange-400 text-white",
          uvSeverity: "HIGH",
          uvGif: sunHigh,
          recommendations: [{ text: "Wear Sunglasses", icon: <TbSunglassesFilled />}, { text: "Wear Light Clothing", icon: <FaTshirt />}, {text: "Wear SPF 50+", icon: <FaWineBottle/>} ]
        });
      } else if (uvIndex >= 3) {
        setUvLevelInformation({
          dangerMessage: "Be cautious during peak hours.",
          uvColor: "bg-yellow-400 text-black",
          uvSeverity: "MEDIUM",
          uvGif: sunMedium,
          recommendations: [{text: "Wear SPF 50+", icon: <FaWineBottle/>}]
        });
      } else {
        setUvLevelInformation({
          dangerMessage: "The sun is friendly today! Enjoy the outdoors.",
          uvColor: "bg-green-500 text-white",
          uvSeverity: "LOW",
          uvGif: sunLow,
          recommendations: [{text: "Wear SPF 50+", icon: <FaWineBottle/>}]
        });
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

          {uvIndex !== null && uvLevelInformation.uvGif ? (
            <>
              <div className={`text-center p-2 rounded-md mt-2 ${uvLevelInformation.uvColor}`}>
                <h3 className="text-lg font-bold">{uvLevelInformation.uvSeverity}</h3>
              </div>
              <p className="text-lg mt-2">Max UV index: {uvIndex}</p>
              <img src={uvLevelInformation.uvGif} alt={`UV Index ${uvIndex}`} className="w-64 h-64 mt-4" />
              <p className="text-lg font-semibold mt-2 text-center text-gray-700">
                {uvLevelInformation.dangerMessage}
              </p>

              <div className="grid grid-cols-3 gap-4 mt-4">
                {uvLevelInformation.recommendations.map((rec, index) => (
                    <div key={index} className="flex flex-col items-center rounded-sm border-solid border-4 md:p-8 shadow-md ">
                        <div className="text-3xl md:text-5xl">{rec.icon}</div>
                        <p className="text-sm md:text-lg">{rec.text}</p>
                    </div>
                ))}
            </div>
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
        <div className="md:hidden overflow-x-auto mt-5 mb-24 mx-3">
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