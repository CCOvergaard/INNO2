import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

// Komponent for startsiden
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Titel på hjemmeskærmen */}
      <Text style={styles.title}>Welcome to Tutormatch!</Text>

      {/* Knappen for at navigere til TutorSignUp-skærmen */}
      <Button
        title="Sign Up as Tutor"
        onPress={() => navigation.navigate("TutorSignUp")}
      />

      {/* Knappen for at navigere til StudentSearch-skærmen */}
      <Button
        title="Find a Tutor"
        onPress={() => navigation.navigate("StudentSearch")}
      />

      <Button
        title="Open Camera"
        onPress={() => navigation.navigate("CameraTest")}
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
