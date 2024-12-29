import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../tailwind.css';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

import { useEffect, Platform } from 'react';
import 'react-native-reanimated';

import { useFonts } from 'expo-font';

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
    <>
      <StatusBar 
        style={colorScheme === 'dark' ? "dark" : "light"}
        backgroundColor="#F3F4F6" 
        translucent={true}
        hidden={true}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
