import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  temp: number;
  condition: string;
  city: string;
}

const WeatherCard: React.FC<Props> = ({ temp, condition, city }) => (
  <View style={styles.card}>
    <Text style={styles.city}>{city}</Text>
    <Text style={styles.temp}>{temp}°</Text>
    <Text style={styles.condition}>{condition}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 20, margin: 10, borderRadius: 10, backgroundColor: '#f0f0f0', alignItems: 'center' },
  city: { fontSize: 20, fontWeight: 'bold' },
  temp: { fontSize: 36, fontWeight: 'bold', marginVertical: 5 },
  condition: { fontSize: 18 },
});

export default WeatherCard;
