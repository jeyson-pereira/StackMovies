import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AdMobInterstitial } from 'expo-ads-admob';
import gStyles from '../utils/GlobalStyles';

export default function Cinema({ navigation, route }) {
    //const schedule= route.params.schedule;
    const interstitialAdId = (
        Platform.OS === 'ios' ? 'ca-app-pub-3940256099942544/4411468910' :
            'ca-app-pub-3940256099942544/1033173712'
    );

    useEffect(() => {
        async function showAd() {
            AdMobInterstitial.setAdUnitID(interstitialAdId);
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
            await AdMobInterstitial.showAdAsync();
        }
        showAd();
    }, [interstitialAdId]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <TouchableOpacity style={gStyles.styles.goBack}
                    onPress={() => navigation.pop()}
                >
                    <Ionicons name='arrow-back' size={36} color='white' />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={gStyles.styles.Title}>Gracias por ver mis anuncios</Text>
            </View>
        </SafeAreaView>
    )
}
