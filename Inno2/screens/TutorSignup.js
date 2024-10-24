
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { ref, set, push } from 'firebase/database'; 
import { db } from '../Firebase'; 

// TutorSignUp-komponent
export default function TutorSignUp() {
  // State-variabler for at holde styr på brugerens input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subjects, setSubjects] = useState('');
  const [rate, setRate] = useState('');

  // Funktion der håndterer tilmelding af en ny tutor
  const handleSignUp = () => {
    const tutorRef = ref(db, 'tutors/'); // gemmer data på "stien" tutors i Realtime Database
    const newTutorRef = push(tutorRef);  // Opretter en ny post i tutors-databasen

    // Gemmer tutorens data i databasen
    set(newTutorRef, {
      name: name,
      email: email,
      subjects: subjects,
      rate: rate,
    })
      .then(() => {
        alert('Tutor signed up successfully!'); // Viser besked ved succes
      })
      .catch((error) => {
        alert('Error adding tutor: ' + error.message); // Fejlhåndtering
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tutor Sign-Up</Text>
      {/* Inputfelter til brugerens navn, email, fag og rate */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Subjects/Exams"
        value={subjects}
        onChangeText={setSubjects}
      />
      <TextInput
        style={styles.input}
        placeholder="Rate per hour"
        value={rate}
        onChangeText={setRate}
      />
      <Button title="Sign Up" onPress={handleSignUp} /> 
      {/* Tilmeld-knap */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff', // Lys blå baggrund
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});