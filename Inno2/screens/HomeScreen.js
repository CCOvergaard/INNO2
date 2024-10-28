import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

// Komponent for startsiden
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Titel på startsiden */}
      <Text style={styles.title}>Velkommen til Tutormatch!</Text>

      {/* Knap til at navigere til TutorSignUp-skærmen */}
      <Button
        title="Tilmeld dig som Tutor"
        onPress={() => navigation.navigate("TutorSignUp")}
      />

      {/* Knap til at navigere til StudentSearch-skærmen */}
      <Button
        title="Find en Tutor"
        onPress={() => navigation.navigate("StudentSearch")}
      />

      {/* Knap til at navigere til TutorProfile-skærmen */}
      <Button
        title="Din Tutorprofil"
        onPress={() => navigation.navigate("TutorProfile")}
      />

      {/* Knap til at navigere til Settings-skærmen */}
      <Button
        title="Indstillinger"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}

//css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});
