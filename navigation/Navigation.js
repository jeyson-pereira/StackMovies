import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
//Import Screens
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import Cinema from '../screens/Cinema';
import Trailer from '../screens/Trailer';

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
        <LinearGradient
            colors={[Colors.bg, Colors.bgEnd]}
            style={{ flex: 1 }}>
            <NavigationContainer theme={mainTheme}>
                <RootNavigator />
            </NavigationContainer>
        </LinearGradient>
    )
}

//Root Stack Navigator
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Movie" component={Movie} />
            <Stack.Screen name="Cinema" component={Cinema} />
            <Stack.Screen name="Trailer" component={Trailer} />
        </Stack.Navigator>
    );
}