import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, Animated, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdMobBanner } from 'expo-ads-admob';
import { getMovies } from '../api';
import Loading from '../components/Loading';
import Colors from '../constants/Colors';
import gStyles from '../utils/GlobalStyles';

const width = Dimensions.get('window').width;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const SPACING = 10;

export default Home = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [movies, setMovies] = useState([]);

    const bannerAdId = (
        Platform.OS === 'ios' ? 'ca-app-pub-3940256099942544/2934735716' :
            'ca-app-pub-3940256099942544/6300978111');

    const bannerError = () => {
        console.log("An error");
        return;
    }

    useEffect(() => {
        const fetchData = async () => {
            const movies = await getMovies();
            // [empty_item, ...movies, empty_item]
            setMovies([{ id: 'empty-left' }, ...movies, { id: 'empty-right' }]);
        };
        if (movies.length === 0) {
            fetchData(movies);
        }

    }, [movies]);

    if (movies.length === 0) {
        return <Loading />;
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                <Text style={{
                    fontFamily: 'SFPro-Bold',
                    textAlign: 'center',
                    fontSize: 30,
                    color: Colors.text,
                    marginHorizontal: 10
                }}>cines-app</Text>
            </View>
            <Animated.FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                renderToHardwareTextureAndroid
                contentContainerStyle={{ alignItems: 'center' }}
                snapToInterval={ITEM_SIZE}
                snapToAlignment='start'
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    if (!item.cover) {
                        return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                    }

                    const inputRange = [
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                    ];

                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, -50, 0],
                        extrapolate: 'clamp',
                    });

                    return (
                        <View style={{ width: ITEM_SIZE }}>
                            <Animated.View
                                style={{
                                    marginHorizontal: SPACING * 2,
                                    padding: SPACING,
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: 30,
                                    transform: [{ translateY }],
                                }}
                            >
                                <Image source={{
                                    uri: `${item.cover}`
                                }}
                                    style={[gStyles.home.posterImage, { height: ITEM_SIZE * 1.2 }]}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate('Movie', {
                                    movie: item,
                                })}
                                    style={gStyles.home.infoContainer}
                                >
                                    <Text style={gStyles.home.Title}>{item.title}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    )
                }}
            />
            <View style={gStyles.styles.banner}>
                <AdMobBanner
                    bannerSize="banner"
                    adUnitID={bannerAdId} // Test ID, Replace with your-admob-unit-id
                    servePersonalizedAds={false} // true or false
                    didFailToReceiveAdWithError={bannerError}
                />
            </View>
        </SafeAreaView>
    )
}
