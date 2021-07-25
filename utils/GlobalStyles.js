import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    Title: {
        fontFamily: 'SFPro-Bold',
        fontSize: 24,
        color: Colors.text
    },
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: Colors.bg,
    },
})

export default styles;