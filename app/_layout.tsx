import '../global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from '~/lib/useColorScheme';

// export * as ErrorBoundary from "~/components/FallbackComponent"
// Re-export the default UI
export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  // Capture the NavigationContainer ref and register it with the instrumentation.
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        await AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        await setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, [colorScheme, setColorScheme]);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return <Slot />;
}

export default RootLayout;
