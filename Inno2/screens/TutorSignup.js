import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { ref, set, push } from 'firebase/database'; 
import { db, storage } from '../Firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Camera, CameraType } from 'expo-camera/legacy';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

export default function TutorSignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subjects, setSubjects] = useState('');
  const [rate, setRate] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [loading, setLoading] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Vi har brug for din tilladelse til at vise kameraet</Text>
        <Button onPress={requestPermission} title="Giv tilladelse" />
      </View>
    );
  }

  const handleSignUp = async () => {
    const tutorRef = ref(db, 'tutors/');
    const newTutorRef = push(tutorRef);

    let profileImageUrl = '';

    if (profileImage) {
      try {
        // Upload billede til Firebase Storage
        const response = await fetch(profileImage.uri);
        const blob = await response.blob();
        const imageRef = storageRef(storage, `profileImages/${newTutorRef.key}.jpg`);

        await uploadBytes(imageRef, blob);
        profileImageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.error('Fejl under upload af billede:', error);
      }
    }

    // Gem tutorens data i databasen
    set(newTutorRef, {
      name: name,
      email: email,
      subjects: subjects,
      rate: rate,
      profileImage: profileImageUrl,
    })
      .then(() => {
        alert('Tutor tilmeldt succesfuldt!');
        // Nulstil felter (valgfrit)
        setName('');
        setEmail('');
        setSubjects('');
        setRate('');
        setProfileImage(null);
      })
      .catch((error) => {
        alert('Fejl ved tilføjelse af tutor: ' + error.message);
      });
  };

  const snap = async () => {
    if (!cameraRef.current) {
      console.log("Ingen kamera reference");
      return;
    }
    setLoading(true);
    const result = await cameraRef.current.takePictureAsync();
    setProfileImage(result);
    setLoading(false);
  };

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <SafeAreaView style={styles.safeview}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Tutor Tilmelding</Text>
        <TextInput
          style={styles.input}
          placeholder="Navn"
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
          placeholder="Fag/Eksamener"
          value={subjects}
          onChangeText={setSubjects}
        />
        <TextInput
          style={styles.input}
          placeholder="Pris pr. time"
          value={rate}
          onChangeText={setRate}
        />

        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                <TouchableOpacity style={styles.flipbtn} onPress={toggleCameraType}>
                  <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                <TouchableOpacity style={styles.snapbtn} onPress={snap}>
                  <Text style={styles.text}>{loading ? "Indlæser..." : "Tag billede"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        </View>

        {profileImage && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
          </View>
        )}

        <Button title="Tilmeld" onPress={handleSignUp} />
        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
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
  cameraContainer: {
    height: 400,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 32,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
    alignSelf: 'center',
  },
  snapbtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 80,
    width: 80,
    borderRadius: 100,
    padding: 10,
    margin: 5,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
  },
  flipbtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 100,
    padding: 5,
    alignSelf: 'baseline',
    justifyContent: 'center',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  safeview: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
});
