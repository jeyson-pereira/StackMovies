import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mainStyles } from '../utils/GlobalStyles';
import LottieView from 'lottie-react-native';

export default function TryAgain({ reload }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20 }}>
            <LottieView
                autoPlay
                loop
                style={{
                    width: 300,
                }}
                source={require('../assets/animations/lonely-404.json')}
            />
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'SFPro-Regular' }}>
                Oops! Algo salió mal.{'\n'}Por favor, compruebe si el dispositivo está
                conectado a un plan de datos móviles estable o WiFi.
            </Text>
            <TouchableOpacity
                style={mainStyles.reload}
                onPress={() => reload(false)}>
                <Ionicons name="reload" size={24} color="white" />
                <Text style={{ color: 'white', fontFamily: 'SFPro-Bold', marginLeft: 10 }}>Intentar de nuevo</Text>
            </TouchableOpacity>
        </View>
    )
}