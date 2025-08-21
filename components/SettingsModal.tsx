import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from "react-native";
import { useSettings } from "../context/SettingsContext";

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useSettings();
  const [owmKey, setOwmKey] = useState(state.owmApiKey);
  const [newsKey, setNewsKey] = useState(state.newsApiKey);

  const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>Settings ⚙️</Text>

        {/* Units */}
        <Text style={{ marginBottom: 8 }}>Temperature Units</Text>
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          <TouchableOpacity onPress={() => dispatch({ type: "SET_UNITS", units: "metric" })} style={{ marginRight: 20 }}>
            <Text>{state.units === "metric" ? "✅" : "⬜"} Celsius</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch({ type: "SET_UNITS", units: "imperial" })}>
            <Text>{state.units === "imperial" ? "✅" : "⬜"} Fahrenheit</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Text style={{ marginBottom: 8 }}>News Categories</Text>
        {categories.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => dispatch({ type: "TOGGLE_CATEGORY", category: c })}
            style={{ marginBottom: 4 }}
          >
            <Text>{state.categories.includes(c) ? "✅" : "⬜"} {c}</Text>
          </TouchableOpacity>
        ))}

        {/* API Keys */}
        <Text style={{ marginTop: 16 }}>OpenWeatherMap API Key</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 8, borderRadius: 8, marginBottom: 12 }}
          value={owmKey}
          onChangeText={setOwmKey}
        />

        <Text>NewsAPI Key</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 8, borderRadius: 8, marginBottom: 20 }}
          value={newsKey}
          onChangeText={setNewsKey}
        />

        <TouchableOpacity
          onPress={() => {
            dispatch({ type: "SET_API_KEYS", owmApiKey: owmKey, newsApiKey: newsKey });
            onClose();
          }}
          style={{ backgroundColor: "#007bff", padding: 12, borderRadius: 8, marginBottom: 10 }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} style={{ backgroundColor: "gray", padding: 12, borderRadius: 8 }}>
          <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
