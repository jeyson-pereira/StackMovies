import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import gStyles from '../utils/GlobalStyles';

export default function Movie({ navigation, route }) {
    const itemInfo = route.params.item;
    const poster = route.params.item_poster;
    const trailer_id = "D4YzM4ivSBk";

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={gStyles.styles.goBack}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name='arrow-back' size={36} color='white' />
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', alignItems: 'center', marginHorizontal: 20 }}>
                <Image source={{ uri: `${poster}` }} style={gStyles.movie.posterImage} />
                <Text style={gStyles.movie.title}>{itemInfo.title}</Text>
            </View>
            <ScrollView style={{ marginBottom: 10 }}>
                <View style={[gStyles.styles.container, { marginHorizontal: 20 }]}>
                    <Text style={gStyles.movie.genre}>Género: genre_name</Text>
                    <Text style={gStyles.movie.release_date}>Fecha de estreno: {itemInfo.release_date}</Text>
                    <Text style={gStyles.movie.overview}>{itemInfo.overview}</Text>
                    <Text style={gStyles.movie.overview}>{itemInfo.overview}</Text>
                </View>
            </ScrollView>
            <View style={gStyles.movie.btnsWrapper}>
                <TouchableOpacity style={[gStyles.movie.trailerBtn, gStyles.movie.btn]} onPress={() => navigation.push('Trailer', { trailer_id: trailer_id })}>
                    <Ionicons name='film-outline' size={24} style={gStyles.movie.icon} />
                    <Text style={gStyles.movie.btnText}>Ver Trailer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[gStyles.movie.scheduleBtn, gStyles.movie.btn]} onPress={() => navigation.push('Cinema'/* , { title: itemInfo.title, schedule: schedule } */)}>
                    <MaterialCommunityIcons name='calendar-clock' size={24} style={gStyles.movie.icon} />
                    <Text style={gStyles.movie.btnText}>Ver Horarios</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

//Deconstruct object
/* const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne',
  address: {
    city: 'Gotham'
  }
};
// Object destructuring:
const { address: { city } } = hero;
*/