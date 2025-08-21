import axios from 'axios';

const API_KEY = 'YOUR_NEWSAPI_KEY'; // 🔑 Replace with your NewsAPI key
const BASE_URL = 'https://newsapi.org/v2';

export const getNews = async (category: string = 'general') => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: { country: 'us', category, apiKey: API_KEY },
    });
    return response.data.articles;
  } catch (error) {
    console.error('News API Error:', error);
    return [];
  }
};
