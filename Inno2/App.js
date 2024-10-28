import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import TutorSignUp from "./screens/TutorSignup";
import StudentSearch from "./screens/StudentSearch";
import CameraTest from "./screens/CameraTest";
import ImageScreen from "./screens/ImageScreen";
import TutorProfile from "./screens/TutorProfile"; // Sørg for, at denne er kun inkluderet én gang
import TutorDetails from "./screens/TutorDetails";
import Settings from "./screens/Settings";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TutorSignUp" component={TutorSignUp} />
        <Stack.Screen name="StudentSearch" component={StudentSearch} />
        <Stack.Screen name="CameraTest" component={CameraTest} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
        <Stack.Screen name="TutorProfile" component={TutorProfile} />  {/* Sørg for kun at have én 'TutorProfile' */}
        <Stack.Screen name="TutorDetails" component={TutorDetails} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
