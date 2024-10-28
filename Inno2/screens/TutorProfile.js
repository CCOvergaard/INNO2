import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function TutorProfile({ route }) {
  // Brug en tom objekt som fallback, hvis `route.params` eller `route.params.tutor` er undefined
  const tutor = route?.params?.tutor || { name: 'Ukendt tutor', subjects: 'Ingen data', rate: 'Ukendt', profileImage: null };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tutor.name}</Text>
      {tutor.profileImage ? (
        <Image source={{ uri: tutor.profileImage }} style={styles.profileImage} />
      ) : (
        <Text style={styles.noImageText}>Ingen profilbillede tilgængeligt</Text>
      )}
      <Text style={styles.info}>Fag: {tutor.subjects}</Text>
      <Text style={styles.info}>Pris: {tutor.rate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});
