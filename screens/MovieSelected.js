import React, { Component } from 'react'
import { Text, View } from 'react-native'
import gStyle from '../utils/GlobalStyles';

export default class Home extends Component {
    render() {
        return (
            <View style={{ marginTop: 50, marginHorizontal: 40 }}>
                <Text style={gStyle.Title} onPress={() => this.props.navigation.goBack()}>
                    Backt to Home
                </Text>
            </View>
        )
    }
}