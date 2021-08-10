import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getMovieInfo } from '../api';
import { mainStyles, movieStyles } from '../utils/GlobalStyles';
import Colors from '../constants/Colors';
import Loading from '../components/Loading';
import TryAgain from '../components/TryAgain';

export default Movie = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDisconnected, setIsDisconnected] = useState(false);

    const { id, title, cover } = route.params.movie;
    const [movieInfo, setMovieInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            let data = await getMovieInfo(id);
            data !== null ? setMovieInfo(data) : setIsDisconnected(true);
            setIsLoading(false);
        };
        if (movieInfo === null && isDisconnected === false) {
            fetchData(movieInfo);
        }

    }, [isDisconnected]);

    if (isLoading) {
        return <Loading />;
    }
    if (movieInfo !== null && !isDisconnected) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity style={mainStyles.goBack}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name='arrow-back' size={36} color='white' />
                </TouchableOpacity>
                <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: `${cover}` }} style={movieStyles.posterImage} />
                    <Text style={movieStyles.title}>{title}</Text>
                </View>
                <ScrollView style={{ marginBottom: 10 }}>
                    <View style={{ flex: 1, width: '80%', alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={movieStyles.info}>Género: {movieInfo.genre}</Text>
                            <Text style={movieStyles.info}>Clasificación: {movieInfo.clasification}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={movieStyles.extraInfo}>Duración: {movieInfo.duration}.</Text>
                            <Text style={movieStyles.extraInfo}>Director: {movieInfo.director}.</Text>
                        </View>
                        {movieInfo.actores !== '' &&
                            <View style={mainStyles.hr}>
                                <Text style={movieStyles.people}>Actores: {movieInfo.actores}.</Text>
                            </View>
                        }
                        <View style={mainStyles.hr}>
                            <Text style={movieStyles.overview}>{movieInfo.synopsis}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={movieStyles.btnsWrapper}>
                    <TouchableOpacity style={[movieStyles.btnContainer, movieStyles.trailerBtn]}
                        onPress={() => navigation.push('Trailer', { trailer_id: movieInfo.trailer })}>
                        <LinearGradient
                            colors={[Colors.bg, Colors.bgMid]}
                            style={[movieStyles.button, movieStyles.trailerBtn]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        >
                            <Ionicons name='film-outline' size={24} style={movieStyles.icon} />
                            <Text style={movieStyles.btnText}>Ver Trailer</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={[movieStyles.btnContainer, movieStyles.scheduleBtn]}
                        onPress={() => navigation.push('Cinema', { movie_id: id, movie_title: title })}>
                        <LinearGradient
                            colors={[Colors.bgMid, Colors.bgEndSaturate]}
                            style={[movieStyles.button, movieStyles.scheduleBtn]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        >
                            <MaterialCommunityIcons name='calendar-clock' size={24} style={movieStyles.icon} />
                            <Text style={movieStyles.btnText}>Ver Horarios</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
    return (<TryAgain reload={setIsDisconnected} />)
}