import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import gStyles from '../utils/GlobalStyles';

export default function Cinema({navigation, route}) {
    const schedule= route.params.schedule;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={gStyles.styles.goBack}
                onPress={() => navigation.pop()}
            >
                <Ionicons name='arrow-back' size={36} color='white' />
            </TouchableOpacity>
            <Text>{schedule}</Text>
        </SafeAreaView>
    )
}
