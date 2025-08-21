// screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, Linking, TouchableOpacity, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { OPENWEATHER_API_KEY, NEWS_API_KEY } from "@env";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- Get user location --- //
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Location permission denied.");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;

        // --- Fetch weather data --- //
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData);

        // --- Fetch news data --- //
        const newsRes = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
        );
        const newsData = await newsRes.json();

        setNews(newsData.articles || []);
      } catch (err: any) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {weather && (
        <View style={styles.card}>
          <Text style={styles.title}>Weather in {weather.name}</Text>
          <Text>🌡 {weather.main.temp}°C</Text>
          <Text>🌥 {weather.weather[0].description}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>News Headlines</Text>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
            <View style={styles.card}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  newsTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default HomeScreen;
