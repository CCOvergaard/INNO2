import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../Firebase';

export default function StudentSearch({ navigation }) {
  const [exam, setExam] = useState('');
  const [tutors, setTutors] = useState([]);

  // Håndterer søgningen efter tutorer baseret på eksamen
  const handleSearch = () => {
    const examQuery = query(ref(db, 'tutors'), orderByChild('subjects'), equalTo(exam));

    onValue(
      examQuery,
      (snapshot) => {
        const results = [];
        snapshot.forEach((tut) => {
          results.push(tut.val());
        });
        setTutors(results);
      },
      {
        onlyOnce: true,
      }
    );
  };

  // Returnerer komponenten
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find en Tutor</Text>
      <TextInput
        style={styles.input}
        placeholder="Indtast eksamen"
        value={exam}
        onChangeText={setExam}
      />
      <Button title="Søg" onPress={handleSearch} />

      {tutors.length > 0 ? (
        tutors.map((tutor, index) => (
          <View key={index} style={styles.tutorCard}>
            {tutor.profileImage ? (
              <Image source={{ uri: tutor.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Ingen billede</Text>
              </View>
            )}
            <Text style={styles.tutorText}>{tutor.name}</Text>
            <Text style={styles.tutorText}>{tutor.subjects}</Text>
            <Text style={styles.tutorText}>Pris: {tutor.rate}</Text>
            
            {/* Knappen til at navigere til TutorProfile-skærmen */}
            <TouchableOpacity
              onPress={() => navigation.navigate("TutorProfile", { tutor })}
              style={styles.profileButton}
            >
              <Text style={styles.profileButtonText}>Vis profil</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noResults}>Ingen tutorer fundet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  tutorCard: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tutorText: {
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 12,
  },
});
