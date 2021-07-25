import React, { Component } from 'react'
import { Text, View } from 'react-native'
import gStyle from '../utils/GlobalStyles';

export default class Home extends Component {
    render() {
        return (
            <View style={{marginTop: 50,marginHorizontal: 40}}>
                <Text style={gStyle.Title}> Home CinesApp </Text>
                <Text style={gStyle.Title} onPress={() => this.props.navigation.navigate('Movie')}> Go to Movie </Text>
            </View>
        )
    }
}
