import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // 🔑 Replace with your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (lat: number, lon: number, units: string = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, units, appid: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
};

export const getForecast = async (lat: number, lon: number, units: string = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { lat, lon, units, appid: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error('Forecast API Error:', error);
    return null;
  }
};
