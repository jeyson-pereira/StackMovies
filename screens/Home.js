import * as React from 'react';
import { StyleSheet, Text, View, Image, Animated, Platform, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdMobBanner } from 'expo-ads-admob';

import Colors from '../constants/Colors';
import Data from '../static/data.json'
const imgAPI = 'https://image.tmdb.org/t/p/original'

const width = Dimensions.get('window').width;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const SPACING = 10;

const Loading = () => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator color='white' size='large' />
        <Text style={styles.paragraph}>Cargando...</Text>
    </View>
);

export default function Home({ navigation }) {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [movies, setMovies] = React.useState([]);

    const bannerAdId = (
        Platform.OS === 'ios' ? 'ca-app-pub-3940256099942544/2934735716' :
            'ca-app-pub-3940256099942544/6300978111');

    const bannerError = () => {
        console.log("An error");
        return;
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const movies = Data.results;
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
        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                <Text style={styles.Header}>cines-app</Text>
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
                    if (!item.poster_path) {
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

                    const poster = `${imgAPI}${item.poster_path}`;

                    return (
                        <View style={{ width: ITEM_SIZE }}>
                            <Animated.View
                                style={{
                                    marginHorizontal: SPACING * 2,
                                    padding: SPACING,
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: 34,
                                    transform: [{ translateY }],
                                }}
                            >
                                <Image source={{
                                    uri: `${poster}`
                                }}
                                    style={styles.posterImage}
                                />
                                <TouchableOpacity onPress={() => navigation.navigate('Movie', {
                                    item: item,
                                    item_poster: poster,
                                })}
                                    style={styles.infoContainer}
                                >
                                    <Text style={styles.Title}>{item.title}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    )
                }
                }
            />
            <View style={styles.banner}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    banner:{
        width:'100%',
        justifyContent: "center",
        alignItems: "center",
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontFamily: 'SFPro-Medium',
        textAlign: 'center',
        color: 'white'
    },
    posterImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
    infoContainer: {
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: Colors.btnMain,
        width: '100%',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 4,
    },
    Title: {
        fontFamily: 'SFPro-Bold',
        textAlign: 'center',
        fontSize: 16,
        color: Colors.text,
        margin: 2,
    },
    Header: {
        fontFamily: 'SFPro-Bold',
        textAlign: 'center',
        fontSize: 30,
        color: Colors.text,
        marginHorizontal: 10,
    }
})

