import React from 'react';
import { Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  description: string;
  url: string;
}

const NewsCard: React.FC<Props> = ({ title, description, url }) => (
  <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(url)}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { padding: 15, margin: 10, borderRadius: 10, backgroundColor: '#e0e0e0' },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14 },
});

export default NewsCard;
