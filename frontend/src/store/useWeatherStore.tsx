import { create } from "zustand";
import axios from "axios";

const API_URL = "https://api.open-meteo.com/v1/"

interface WeatherData {
    hourly: {
        time: string[];
        temperature_2m: number[];
      };
      daily: {
        time: string[];
        uv_index_max: number[];
      };
}

interface WeatherStore {
    weatherData: WeatherData | null;
    fetchWeather: (latitude: number, longitude: number) => Promise<void>;
}

export const useWeatherStore = create<WeatherStore>((set, _get) => ({
    weatherData: null,
    fetchWeather: async (latitude, longitude) => {
        try {
            const response = await axios.get(`${API_URL}forecast`, {
                params: {
                    latitude,
                    longitude,
                    daily: "uv_index_max",
                    hourly: "temperature_2m",
                    forecast_days: 1,
                    timezone: "auto",
                },
            });
    
            const { hourly, daily } = response.data;
    
            set({ weatherData: { hourly, daily } });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    },
}));