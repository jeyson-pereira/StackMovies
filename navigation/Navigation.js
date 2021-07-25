import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

//Import Screens
import Home from '../screens/Home';
import Movie from '../screens/MovieSelected';

//Export App Nav Container
export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

//Root Stack Navigator
const Stack = createStackNavigator();

const TransitionPreset = {
    open: TransitionPresets.ScaleFromCenterAndroid,
    close: TransitionPresets.ScaleFromCenterAndroid,
}

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home}
                options={{ transitionSpec: TransitionPreset }} />
            <Stack.Screen name="Movie" component={Movie}
                options={{ transitionSpec: TransitionPreset }} />
        </Stack.Navigator>
    );
}
