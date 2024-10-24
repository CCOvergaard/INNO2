import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import TutorSignUp from "./screens/TutorSignup";
import StudentSearch from "./screens/StudentSearch";
import CameraTest from "./screens/CameraTest";
import ImageScreen from "./screens/ImageScreen";

// Opret en staknavigator
const Stack = createStackNavigator();

// Hovedkomponenten App, der indeholder navigationen
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="TutorSignUp" component={TutorSignUp} />
        <Stack.Screen name="StudentSearch" component={StudentSearch} />
        <Stack.Screen name="CameraTest" component={CameraTest} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
