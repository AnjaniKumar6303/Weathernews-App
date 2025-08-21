import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from "react-native";
import { SettingsContext } from "../context/SettingsContext";

const ALL_CATEGORIES = ["general","business","entertainment","health","science","sports","technology"];

export default function SettingsScreen() {
  const { unit, setUnit, categories, setCategories } = useContext(SettingsContext);
  const [localCats, setLocalCats] = useState<string[]>(categories);

  const toggleCategory = (c: string) => {
    setLocalCats((prev) => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const save = () => {
    setCategories(localCats.length ? localCats : ["general"]);
    alert("Settings saved!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Units */}
      <View style={styles.card}>
        <Text style={styles.label}>Temperature Unit</Text>
        <View style={styles.switchRow}>
          <Text>Celsius</Text>
          <Switch value={unit === "imperial"} onValueChange={(v) => setUnit(v ? "imperial" : "metric")} />
          <Text>Fahrenheit</Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.card}>
        <Text style={styles.label}>News Categories</Text>
        {ALL_CATEGORIES.map((c) => {
          const selected = localCats.includes(c);
          return (
            <TouchableOpacity
              key={c}
              style={[styles.catBtn, selected && styles.catBtnActive]}
              onPress={() => toggleCategory(c)}
            >
              <Text style={{ color: selected ? "#fff" : "#000" }}>
                {c[0].toUpperCase() + c.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={save}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  title: { fontSize: 24, fontWeight: "800" },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 16, elevation: 2 },
  label: { fontWeight: "700", marginBottom: 10 },
  switchRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 180 },
  catBtn: { borderWidth: 1, borderColor: "#007AFF", borderRadius: 10, padding: 10, marginVertical: 6 },
  catBtnActive: { backgroundColor: "#007AFF" },
  saveBtn: { backgroundColor: "#007AFF", borderRadius: 12, alignItems: "center", padding: 14 },
});
