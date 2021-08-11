import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          'SFPro-Regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
          'SFPro-Light': require('../assets/fonts/SF-Pro-Display-Light.otf'),
          'SFPro-Medium': require('../assets/fonts/SF-Pro-Display-Medium.otf'),
          'SFPro-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
          'SFPro-Heavy': require('../assets/fonts/SF-Pro-Display-Heavy.otf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}