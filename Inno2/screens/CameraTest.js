import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CameraTest({ navigation }) {
  // Kamera tilladelser
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Kamera reference og state variabler
  const cameraRef = useRef();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [imagesArr, setImagesArr] = useState([]); // Array til at gemme billeder
  const [gallery, setGallery] = useState(false); // Viser eller skjuler galleriet

  // Tjekker om tilladelse til kamera er givet
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Beder om tilladelse, hvis den ikke er givet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Vi har brug for din tilladelse til at vise kameraet</Text>
        <Button onPress={requestPermission} title="Giv tilladelse" />
      </View>
    );
  }

  // Funktion til at tage et billede
  const snap = async () => {
    if (!cameraRef.current) {
      console.log("Ingen kamera reference");
      return;
    }
    setLoading(true);
    const result = await cameraRef.current.takePictureAsync();
    setImagesArr([...imagesArr, result]); // Tilføjer det nye billede til arrayet
    setLoading(false);
  };

  // Skifter mellem front- og bagkamera
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  // Viser eller skjuler galleriet
  function toggleGallery() {
    setGallery(current => !current);
  }

  // Komponent til at vise taget billeder i et galleri
  const CameraGallery = () => {
    return (
      <View style={styles.gallery}>
        <Text style={styles.buttonGallery}>Billeder taget: {imagesArr.length}</Text>
        <ScrollView horizontal={true}>
          {imagesArr.length > 0 ? (
            imagesArr.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={{ paddingHorizontal: 10 }}
                onPress={() => navigation.navigate('ImageScreen', { image: image.uri })}
              >
                <Image source={{ uri: image.uri }} style={{ width: 80, height: 80, borderRadius: 10 }} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: "white" }}>Ingen billeder taget</Text>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
              {/* Knap til at skifte mellem front- og bagkamera */}
              <TouchableOpacity style={styles.flipbtn} onPress={toggleCameraType}>
                <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
              {/* Knap til at tage et billede */}
              <TouchableOpacity style={styles.snapbtn} onPress={snap}>
                <Text style={styles.text}>{loading ? "Indlæser..." : ""}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
              {/* Knap til at vise eller skjule galleriet */}
              <TouchableOpacity style={styles.gallerybtn} onPress={toggleGallery}>
                <Ionicons name="copy-outline" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
        {gallery ? <CameraGallery /> : null}
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    marginTop: 0,
    borderRadius: 20,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
  buttonGallery: {
    fontSize: 15,
    color: "white",
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  gallery: {
    flex: 0.2,
    paddingTop: 10,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  safeview: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
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
  gallerybtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 100,
    padding: 5,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
});
