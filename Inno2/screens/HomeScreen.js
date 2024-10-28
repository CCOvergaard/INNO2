import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen til Tutormatch!</Text>
      
      <Button
        title="Tilmeld dig som Tutor"
        onPress={() => navigation.navigate("TutorSignUp")}
      />
      
      <Button
        title="Find en Tutor"
        onPress={() => navigation.navigate("StudentSearch")}
      />
      
      <Button
        title="Profilvisning"
        onPress={() => navigation.navigate("TutorProfile", { tutor: { name: 'Eksempel Tutor', subjects: 'Matematik', rate: '200kr/t' } })} // eksemple på nuværende tidspunkt, skal fetche fra databasen når app er færdig udviklet 
      />
      
      <Button
        title="Tutor Detaljer"
        onPress={() => navigation.navigate("TutorDetails", { tutor: { name: 'Eksempel Tutor', subjects: 'Matematik', rate: '200kr/t' } })} // eksemple på nuværende tidspunkt, skal fetche fra databasen når app er færdig udviklet 
      />
      
      <Button
        title="Indstillinger"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}

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
