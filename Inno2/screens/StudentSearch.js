
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database'; // Firebase funktioner til Realtime Database
import { db } from '../Firebase'; // Firebase konfiguration

// StudentSearch-komponent
export default function StudentSearch() {
  const [exam, setExam] = useState(''); // State-variabel til at gemme den eksamen, der søges på
  const [tutors, setTutors] = useState([]); // State-variabel til at gemme de fundne tutorer

  // Håndterer søgningen efter tutorer baseret på eksamen
  const handleSearch = () => {
    const examQuery = query(ref(db, 'tutors'), orderByChild('subjects'), equalTo(exam)); // Opretter forespørgsel i databasen på baggrund af den "sti" som ref funktion der blev oprettede i "tutorSignup.js" 

    // Udfører forespørgslen og opdaterer state med resultaterne
    onValue(examQuery, (tutor) => {
      const results = [];
      tutor.forEach((tut) => {
        results.push(tut.val());
      });
      setTutors(results);
    }, {
      onlyOnce: true, // Søger kun én gang
    });
  };

  // Returnerer komponenten
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find a Tutor</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter exam"
        value={exam} // Værdien af inputfeltet
        onChangeText={setExam} // Funktionen, der opdaterer state med inputværdien fra brugeren
      />
      <Button title="Search" onPress={handleSearch} /> 
      {/* Søge-knap */}
      {tutors.length > 0 ? ( // Ternary operator, der viser tutorer, hvis der er nogen på det givet fag der er indtastet, ellers vises en besked
        tutors.map((tutor, index) => (
          <View key={index} style={styles.tutorCard}>
            <Text style={styles.tutorText}>{tutor.name} </Text>
            <Text style={styles.tutorText}>{tutor.subjects}</Text>
            <Text style={styles.tutorText}>Rate: {tutor.rate}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noResults}>No tutors found</Text>
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
  },
  tutorText: {
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
});