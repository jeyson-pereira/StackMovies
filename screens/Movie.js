import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import gStyles from '../utils/GlobalStyles';

export default function Movie({ navigation, route }) {
    const itemInfo = route.params.item;
    const schedule = itemInfo.title;
    const poster = route.params.item_poster;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={gStyles.styles.goBack}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name='arrow-back' size={36} color='white' />
            </TouchableOpacity>
            <View style={{alignSelf: 'center', alignItems: 'center'}}>
                <Image source={{ uri: `${poster}` }} style={gStyles.movie.posterImage} />
                <Text style={gStyles.movie.title}>{itemInfo.title}</Text>
            </View>
            <ScrollView style={{marginVertical: 10}}>
                <View style={[gStyles.styles.container, { marginHorizontal: 20 }]}>
                    <Text style={gStyles.movie.genre}>Género: item.genre</Text>
                    <Text style={gStyles.movie.release_date}>Fecha de estreno: {itemInfo.release_date}</Text>
                    <Text style={gStyles.movie.overview}>{itemInfo.overview}</Text>
                    <Text style={gStyles.movie.overview}>{itemInfo.overview}</Text>
                    <Text style={gStyles.movie.overview}>{itemInfo.overview}</Text>
                </View>
            </ScrollView>
            <TouchableOpacity style={gStyles.movie.scheduleBtn} onPress={() => navigation.push('Cinema', { schedule: schedule })}>
                <Text style={gStyles.movie.btnText}>Go Schedule Screen</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

