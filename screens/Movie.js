import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getMovieInfo } from '../api';
import gStyles from '../utils/GlobalStyles';
import Loading from '../components/Loading';

export default Movie = ({ navigation, route }) => {
    const { id, title, cover } = route.params.movie;

    const [movieInfo, setMovieInfo] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMovieInfo(id);
            setMovieInfo(data);
        };
        if (movieInfo === null) {
            fetchData(movieInfo);
        }

    }, []);

    if (movieInfo === null) {
        return <Loading />;
    }
    return (
        <SafeAreaView style={{ flex: 1}}>
            <TouchableOpacity style={gStyles.styles.goBack}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name='arrow-back' size={36} color='white' />
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', alignItems: 'center'}}>
                <Image source={{ uri: `${cover}` }} style={gStyles.movie.posterImage} />
                <Text style={gStyles.movie.title}>{title}</Text>
            </View>
            <ScrollView style={{ marginBottom: 10 }}>
                <View style={{ flex: 1 , marginHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={gStyles.movie.info}>Género: {movieInfo.genre}</Text>
                        <Text style={gStyles.movie.info}>Clasificación: {movieInfo.clasification}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={gStyles.movie.extraInfo}>Duración: {movieInfo.duration}.</Text>
                        <Text style={gStyles.movie.extraInfo}>Director: {movieInfo.director}.</Text>
                    </View>
                    {movieInfo.actores !== '' &&
                        <View style={gStyles.styles.hr}>
                            <Text style={gStyles.movie.people}>Actores: {movieInfo.actores}.</Text>
                        </View>
                    }
                    <View style={gStyles.styles.hr}>
                        <Text style={gStyles.movie.overview}>{movieInfo.synopsis}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={gStyles.movie.btnsWrapper}>
                <TouchableOpacity style={[gStyles.movie.trailerBtn, gStyles.movie.btn]} onPress={() => navigation.push('Trailer', { trailer_id: movieInfo.trailer })}>
                    <Ionicons name='film-outline' size={24} style={gStyles.movie.icon} />
                    <Text style={gStyles.movie.btnText}>Ver Trailer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[gStyles.movie.scheduleBtn, gStyles.movie.btn]} onPress={() => navigation.push('Cinema', { movie_id: id, movie_title: title })}>
                    <MaterialCommunityIcons name='calendar-clock' size={24} style={gStyles.movie.icon} />
                    <Text style={gStyles.movie.btnText}>Ver Horarios</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}