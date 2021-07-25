import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCacheResources from './hooks/useCacheResources';
import Navigation from './navigation/Navigation';
import Colors from './constants/Colors';

export default function App() {
  const isLoadingComplete = useCacheResources();

  if (!isLoadingComplete) {
    return (null);
  }

  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar
        animated={true}
        style='light'
        backgroundColor={Colors.primary}
      />
    </SafeAreaProvider>
  );
}