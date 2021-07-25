import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
//Import Screens
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import { SafeAreaView } from 'react-native-safe-area-context';


const mainTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
};

//Export App Nav Container
export default function Navigation() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                colors={[Colors.bg, Colors.bgGradient]}
                style={{ flex: 1 }}>
                <NavigationContainer theme={mainTheme}>
                    <RootNavigator />
                </NavigationContainer>
            </LinearGradient>
        </SafeAreaView>
    )
}

//Root Stack Navigator
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Movie" component={Movie} />
        </Stack.Navigator>
    );
}