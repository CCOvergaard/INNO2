import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions } from 'react-native';

export default function ImageScreen({ route }) {
  // State for billedets URI
  const [image, setImage] = useState('');

  // Sætter billedet fra route-parametrene, når komponenten mountes
  useEffect(() => {
    setImage(route.params.image);

    return () => {
      setImage(''); // Rydder billedet fra state, når komponenten unmountes
    };
  }, []);

  // Henter skærmens dimensioner for at vise billedet i fuld skærm
  const { width, height } = Dimensions.get('window');

  // Returnerer billedet i fuld skærm
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{ uri: image ? image : null }}
        style={{ width: width, height: height }}
      />
    </View>
  );
}
