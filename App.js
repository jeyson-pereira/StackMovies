import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from './constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import useCacheResources from './hooks/useCacheResources';
import Navigation from './navigation/Navigation';


export default function App() {
  const isLoadingComplete = useCacheResources();

  if (!isLoadingComplete) {
    return (
      <SafeAreaProvider>
        <LinearGradient
            colors={[Colors.bg, Colors.bgEnd]}
            style={{ flex: 1 }}>
        </LinearGradient>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        style='light'
        backgroundColor={Colors.bg}
      />
      <Navigation />
    </SafeAreaProvider >
  );
}
