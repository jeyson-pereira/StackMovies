import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';
import gStyles from '../utils/GlobalStyles';

export default function Trailer({ navigation, route }) {
    const trailer_id = route.params.trailer_id;
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View>
                <TouchableOpacity style={gStyles.styles.goBack}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name='close' size={36} color='white' />
                </TouchableOpacity>
            </View>
            <View style={{flex:1, justifyContent: 'center'}}>
                <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={trailer_id}
                    onChangeState={onStateChange}
                    style={{ backgroundColor: 'black' }}
                />
            </View>
        </SafeAreaView>
    )
}
