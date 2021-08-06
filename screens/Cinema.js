import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getCinemas } from '../api';
import gStyles from '../utils/GlobalStyles';
import Colors from '../constants/Colors';
import Loading from '../components/Loading';

import { adTestAndroid, androidBanner, adTestIOS, iosBanner } from '@env';
import { AdMobBanner } from 'expo-ads-admob';
//adUnitID
const androidUnitID = !__DEV__ ? androidBanner : adTestAndroid;
const iosUnitID = !__DEV__ ? iosBanner : adTestIOS;
const bannerAdId = (Platform.OS === 'ios' ? iosUnitID : androidUnitID);

import { AdMobRewarded } from 'expo-ads-admob';
const rewardedAdId = (
    Platform.OS === 'ios' ? 'ca-app-pub-3940256099942544/1712485313' :
        'ca-app-pub-3940256099942544/5224354917'
);

// Cities: V/cio, Bquilla, Bgta, Cali, Ctgna, Mde
const city_id = ['', '_2', '_3', '_5', '_6', '_9', '_19'];


//Schedules View return
const Schedules = (cinemas) => {
    //Movie hasn't schedules
    if (cinemas.length === 0) {
        return (
            <View style={gStyles.cinema.noSchedules}>
                <MaterialCommunityIcons name='emoticon-sad-outline' size={40} color={Colors.textTransparent} />
                <Text style={{ fontFamily: 'SFPro-Bold', color: Colors.textTransparent }}>
                    Lo siento, no hay horarios disponibles el día de hoy.
                </Text>
            </View>
        )
    }
    //Movie has schedules
    return (
        <FlatList
            style={{ marginVertical: 20 }}
            data={cinemas}
            keyExtractor={(item) => item.cinema}
            renderItem={({ item, index }) => {
                return (
                    <View key={index} style={[gStyles.cinema.containerItem, { marginTop: (index === 0 ? 0 : 20) }]}>
                        <Text style={gStyles.cinema.cinema}>{item.cinema}</Text>
                        <Text style={gStyles.cinema.location}>{item.location}</Text>
                        {item.format !== '' &&
                            <View style={gStyles.cinema.formatWrapper}>
                                <MaterialCommunityIcons name="ticket" size={16} color={Colors.text} />
                                <Text style={gStyles.cinema.format}>{item.format}</Text>
                            </View>
                        }
                        <View style={gStyles.cinema.schedulesWrapper}>
                            {
                                item.schedules.map((schedule, index) => {
                                    return (
                                        <View key={index} style={gStyles.cinema.scheduleItem}>
                                            <Text style={gStyles.cinema.schedule}>{schedule}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                )
            }}
        />
    )
}

export default Cinema = ({ navigation, route }) => {
    //movie props
    const movie_title = route.params.movie_title;
    const movie_id = route.params.movie_id;

    //Loading state
    const [isLoading, setIsLoading] = useState(false)
    //Cinemas and schedules state
    const [cinemasSchedules, setCinemasSchedules] = useState(null)
    //Selected city state
    const [selectedCity, setSelectedCity] = useState({
        city: null,
        movie_inCity: null
    });

    const setFilterCity = (value, index) => {
        if (value !== null) {
            setIsLoading(true);
            setSelectedCity({ city: value, movie_inCity: `${movie_id}${city_id[index]}` });
        }
    }

    useEffect(() => {
        //Open ad once at open this screen
        if (selectedCity.city === null) {
            const showAd = async () => {
                AdMobRewarded.setAdUnitID(rewardedAdId);
                await AdMobRewarded.requestAdAsync();
                await AdMobRewarded.showAdAsync();
            }
            showAd();
        }
        //Get Cinemas and Schedules when Select City in Picker
        if (selectedCity.city !== null) {
            const fetchData = async () => {
                const data = await getCinemas(selectedCity.city, selectedCity.movie_inCity);
                setCinemasSchedules(data);
                setIsLoading(false);
            };
            fetchData(cinemasSchedules);
        }
    }, [selectedCity]);


    if (isLoading) {
        return <Loading />
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <TouchableOpacity style={gStyles.styles.goBack}
                    onPress={() => navigation.pop()}
                >
                    <Ionicons name='arrow-back' size={36} color='white' />
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <View>
                    <Text style={gStyles.cinema.Title}>{movie_title}</Text>
                    <View style={gStyles.cinema.Picker}>
                        <Picker
                            style={{ color: Colors.text }}
                            selectedValue={selectedCity.city}
                            onValueChange={(itemValue, itemIndex) => setFilterCity(itemValue, itemIndex)}
                            dropdownIconColor={Colors.text}
                            mode='dropdown'
                        >
                            <Picker.Item label="Selecciona tú ciudad:" color={Colors.bg} value={null} />
                            <Picker.Item label="Barranquilla" value="barranquilla" />
                            <Picker.Item label="Bogotá" value="bogota" />
                            <Picker.Item label="Cali" value="cali" />
                            <Picker.Item label="Cartagena" value="cartagena" />
                            <Picker.Item label="Medellín" value="medellin" />
                            <Picker.Item label="Villavicencio" value="villavicencio" />
                        </Picker>
                    </View>
                </View>
            </View>
            {cinemasSchedules !== null && Schedules(cinemasSchedules)}
            <View style={[gStyles.styles.banner, { flex: cinemasSchedules === null ? 1 : 0 }]}>
                <AdMobBanner
                    bannerSize="banner"
                    adUnitID={bannerAdId}
                />
            </View>
        </SafeAreaView>
    )
}