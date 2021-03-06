import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, Linking } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getCinemas } from '../api';
import Loading from '../components/Loading';
import TryAgain from '../components/TryAgain';

import { mainStyles, cinemaStyles } from '../utils/GlobalStyles';
import Colors from '../constants/Colors';

import { adTestAndroid, androidBanner, adTestIOS, iosBanner } from '@env';
import { AdMobBanner } from 'expo-ads-admob';
//adUnitID
const androidUnitID = !__DEV__ ? androidBanner : adTestAndroid;
const iosUnitID = !__DEV__ ? iosBanner : adTestIOS;
const bannerAdId = (Platform.OS === 'ios' ? iosUnitID : androidUnitID);

//Cities: Bquilla, Bgta, Cali, Ctgna, Mde, V/cio
const city_id = ['_2', '_3', '_5', '_6', '_9', '_19'];

//Schedules View return
const Schedules = (cinemas) => {
    //Movie hasn't schedules
    if (cinemas.length === 0) {
        return (
            <View style={cinemaStyles.noSchedules}>
                <MaterialCommunityIcons name='emoticon-sad-outline' size={40} color={Colors.textTransparent} />
                <Text allowFontScaling={false} style={{ fontFamily: 'SFPro-Bold', color: Colors.textTransparent, textAlign: 'center' }}>
                    Lo siento, esta película no se encuentra en tu ciudad o no hay horarios disponibles el día de hoy.
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
                    <View key={index} style={[cinemaStyles.containerItem, { marginTop: (index === 0 ? 0 : 20) }]}>
                        <Text allowFontScaling={false} style={cinemaStyles.cinema}>{item.cinema}</Text>
                        <TouchableOpacity
                            onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=Cine%20${item.cinema.toLowerCase()}`)}
                            style={cinemaStyles.itemInfoWrapper}>
                            <MaterialCommunityIcons name="google-maps" size={16} color={Colors.text} />
                            <Text allowFontScaling={false} style={cinemaStyles.location}>
                                {item.location}
                            </Text>
                        </TouchableOpacity>
                        {item.format !== '' &&
                            <View style={cinemaStyles.itemInfoWrapper}>
                                <MaterialCommunityIcons name="ticket" size={16} color={Colors.text} />
                                <Text allowFontScaling={false} style={cinemaStyles.format}>{item.format}</Text>
                            </View>
                        }
                        <View style={cinemaStyles.schedulesWrapper}>
                            {
                                item.schedules.map((schedule, index) => {
                                    return (
                                        <View key={index} style={cinemaStyles.scheduleItem}>
                                            <Text allowFontScaling={false} style={cinemaStyles.schedule}>{schedule}</Text>
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

    //Picker States
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Barranquilla', value: 'barranquilla' },
        { label: 'Bogotá', value: 'bogota' },
        { label: 'Cali', value: 'cali' },
        { label: 'Cartagena', value: 'cartagena' },
        { label: 'Medellín', value: 'medellin' },
        { label: 'Villavicencio', value: 'villavicencio' }
    ]);

    //Loading state
    const [isLoading, setIsLoading] = useState(false);
    const [isDisconnected, setIsDisconnected] = useState(false);
    //Cinemas and schedules state
    const [cinemasSchedules, setCinemasSchedules] = useState(null);
    //Selected city state
    const [selectedCity, setSelectedCity] = useState({
        city: null,
        movie_inCity: null
    });

    const setFilterCity = () => {
        let index = items.findIndex((item) => item.value === value);
        setSelectedCity({ city: value, movie_inCity: `${movie_id}${city_id[index]}` });
        setIsDisconnected(false);
    }

    useEffect(() => {
        //Get Cinemas and Schedules when Select City in Picker
        if (selectedCity.city !== null && isDisconnected === false) {
            const fetchData = async () => {
                setIsLoading(true);
                let data = await getCinemas(selectedCity.city, selectedCity.movie_inCity);
                data !== null ? setCinemasSchedules(data) : (setIsDisconnected(true), setCinemasSchedules(null));
                setIsLoading(false);
            };
            fetchData(cinemasSchedules);
        }
    }, [selectedCity, isDisconnected]);

    if (isLoading) {
        return <Loading />
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <TouchableOpacity style={mainStyles.goBack}
                    onPress={() => navigation.pop()}
                >
                    <Ionicons name='arrow-back' size={36} color='white' />
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <View>
                    <Text allowFontScaling={false} style={cinemaStyles.Title}>{movie_title}</Text>
                    <View style={cinemaStyles.Picker}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            zIndex={1000}
                            onChangeValue={setFilterCity}
                            placeholder="Selecciona tu ciudad"
                            placeholderStyle={{ fontFamily: 'SFPro-Bold', fontSize: 16, color: Colors.text }}
                            itemSeparator
                            listItemLabelStyle={{ fontFamily: 'SFPro-Bold', fontSize: 16, color: Colors.text, marginHorizontal: 10 }}
                            labelStyle={{ fontFamily: 'SFPro-Bold', fontSize: 16, color: Colors.text }}
                            selectedItemContainerStyle={{backgroundColor: Colors.bg }}
                            itemSeparatorStyle={{ backgroundColor: Colors.bgEnd, opacity: 0.5 }}
                            style={{ borderColor: Colors.bgEnd }}
                            listMode="MODAL"
                            theme="DARK"
                            labelProps={{allowFontScaling: false}}
                        />
                    </View>
                </View>
            </View>
            {cinemasSchedules !== null && Schedules(cinemasSchedules)}
            {isDisconnected && <TryAgain reload={setIsDisconnected} />}
            <View style={[mainStyles.banner, { flex: cinemasSchedules === null ? 1 : 0 }]}>
                <AdMobBanner
                    bannerSize="banner"
                    adUnitID={bannerAdId}
                />
            </View>
        </SafeAreaView>
    )
}