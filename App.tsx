import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import MobileNumberScreen from './screens/MobileNumberScreen';
import OTPScreen from './screens/OTPScreen';
import ProfileInfoScreen from './screens/ProfileInfoScreen';
import TrueValueLandingScreen from './screens/TrueValueLandingScreen'
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        'PermanentMarker': require('./assets/fonts/PermanentMarker-Regular.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
         'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      });
    if (!fontsLoaded) {
        return null;
    }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="MobileNumber" component={MobileNumberScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
         <Stack.Screen name="LandingPage" component={TrueValueLandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
