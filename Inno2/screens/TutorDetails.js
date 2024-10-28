import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function TutorDetails({ route }) {
  const { tutor } = route.params || {}; // Tilføj en fallback-værdi

  if (!tutor) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Ingen tutor information tilgængelig.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: tutor.profileImage }} style={styles.profileImage} />
      <Text style={styles.name}>{tutor.name}</Text>
      <Text style={styles.subjects}>Fag: {tutor.subjects}</Text>
      <Text style={styles.rate}>Pris pr. time: {tutor.rate}</Text>
      <Text style={styles.description}>Beskrivelse: {tutor.description || 'Ingen beskrivelse'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subjects: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  rate: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
