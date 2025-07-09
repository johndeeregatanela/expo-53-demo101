import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import LocationScreen from './screens/LocationScreen';
import SensorsScreen from './screens/SensorsScreen';
import ImagePickerScreen from './screens/ImagePickerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Expo 53 Demo' }} 
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Sensors" component={SensorsScreen} />
        <Stack.Screen name="ImagePicker" component={ImagePickerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
