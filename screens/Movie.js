import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import gStyle from '../utils/GlobalStyles';

export default class Home extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <Text style={gStyle.Title} onPress={() => this.props.navigation.goBack()}>
                        Backt to Home
                    </Text>
                </View>
            </SafeAreaView>
        )
    }
}