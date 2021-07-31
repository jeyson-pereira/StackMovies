import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';
import gStyles from '../utils/GlobalStyles';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Trailer({ navigation, route }) {
    const trailer_id = route.params.trailer_id;
    //Function change Orientation to Landscape and hide StatusBar on fullscreen video
    const changeOrientation = (value) => {
        value ? ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE) :
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        StatusBar.setHidden(value)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View>
                <TouchableOpacity style={gStyles.styles.goBack}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name='close' size={36} color='white' />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <YoutubePlayer
                    height={300}
                    videoId={trailer_id}
                    style={{ backgroundColor: 'black' }}
                    onFullScreenChange={(value) => changeOrientation(value)}
                />
            </View>
        </SafeAreaView>
    )
}
