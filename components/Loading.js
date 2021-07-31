import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import gStyles from '../utils/GlobalStyles';

export default Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color='white' size='large' />
            <Text style={gStyles.styles.Title}>Cargando...</Text>
        </View>
    )
}

