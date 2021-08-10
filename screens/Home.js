import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, Animated, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { getMovies } from '../api';
import Loading from '../components/Loading';
import Colors from '../constants/Colors';
import { mainStyles, homeStyles } from '../utils/GlobalStyles';
import { AdMobBanner } from 'expo-ads-admob';
import { adTestAndroid, androidBanner, adTestIOS, iosBanner } from '@env';

const width = Dimensions.get('window').width;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const SPACING = 10;

//adUnitID
const androidUnitID = !__DEV__ ? androidBanner : adTestAndroid;
const iosUnitID = !__DEV__ ? iosBanner : adTestIOS;
const bannerAdId = (Platform.OS === 'ios' ? iosUnitID : androidUnitID);


export default Home = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [movies, setMovies] = useState([]);

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
                    fontSize: 40,
                    color: Colors.text,
                    marginHorizontal: 10
                }}>StackMovies</Text>
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
                                    style={[homeStyles.posterImage, { height: ITEM_SIZE * 1.2 }]}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate('Movie', {
                                    movie: item,
                                })}
                                    style={homeStyles.buttonContainer}
                                >
                                    <LinearGradient
                                        colors={[Colors.bg, Colors.bgEnd]}
                                        style={homeStyles.button}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                                    >
                                        <Text style={homeStyles.Title}>{item.title}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    )
                }}
            />
            <View style={mainStyles.banner}>
                <AdMobBanner
                    bannerSize="banner"
                    adUnitID={bannerAdId}
                />
            </View>
        </SafeAreaView>
    )
}
