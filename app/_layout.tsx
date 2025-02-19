import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {KindeAuthProvider} from "@kinde/expo";
import {Linking} from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Linking.addEventListener('url', (e) => console.log("Test12", e));

//scheme:?code..
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <KindeAuthProvider
        config={{
          //todo modify this
          domain: "https://domain.kinde.com", // Required
          clientId: "clientId", // Required
        }}>
        <Stack>
          <Stack.Screen name="index"/>
        </Stack>
        <StatusBar style="auto"/>
      </KindeAuthProvider>
    </ThemeProvider>
  );
}
