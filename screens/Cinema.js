import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, Linking } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
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

//Cities: Bquilla, Bgta, Cali, Ctgna, Mde, V/cio
const city_id = ['_2', '_3', '_5', '_6', '_9', '_19'];

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
                        <TouchableOpacity
                            onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=Cine%20${item.cinema.toLowerCase()}`)}
                            style={gStyles.cinema.itemInfoWrapper}>
                            <MaterialCommunityIcons name="google-maps" size={16} color={Colors.text} />
                            <Text style={gStyles.cinema.location}>
                                {item.location}
                            </Text>
                        </TouchableOpacity>
                        {item.format !== '' &&
                            <View style={gStyles.cinema.itemInfoWrapper}>
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
    const [isLoading, setIsLoading] = useState(false)
    //Cinemas and schedules state
    const [cinemasSchedules, setCinemasSchedules] = useState(null)
    //Selected city state
    const [selectedCity, setSelectedCity] = useState({
        city: null,
        movie_inCity: null
    });

    const setFilterCity = () => {
        let index = items.findIndex((item) => item.value === value);
        setIsLoading(true);
        setSelectedCity({ city: value, movie_inCity: `${movie_id}${city_id[index]}` });
    }

    useEffect(() => {
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
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            onChangeValue={setFilterCity}
                            placeholder="Selecciona tu ciudad"
                            placeholderStyle={{ fontFamily: 'SFPro-Bold', fontSize: 16, color: Colors.bgEnd }}
                            itemSeparator
                            listItemLabelStyle={{ fontFamily: 'SFPro-Bold', fontSize: 14, color: Colors.bg }}
                            labelStyle={{ fontFamily: 'SFPro-Bold', fontSize: 16, color: Colors.bgEnd }}
                            selectedItemLabelStyle={{ color: Colors.bgEnd }}
                            itemSeparatorStyle={{ backgroundColor: Colors.bgEnd, opacity: 0.5 }}
                            dropDownContainerStyle={{ borderColor: Colors.bgEnd }}
                            style={{ borderColor: Colors.bgEnd }}
                        />
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