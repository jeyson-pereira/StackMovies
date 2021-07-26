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
    },
    goBack: {
        marginLeft: 10,
        width: 36
    },
});

const movie = StyleSheet.create({
    posterImage: {
        width: 100,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
    },
    title: {
        fontFamily: 'SFPro-Bold',
        fontSize: 28,
        color: Colors.text,
        textAlign: 'center'
    },
    genre: {
        alignSelf: 'flex-start',
        color: Colors.text,
        fontFamily: 'SFPro-Bold',
        fontSize: 20,
        textTransform: 'capitalize'
    },
    release_date:{
        alignSelf: 'flex-start',
        color: Colors.text,
        fontFamily: 'SFPro-Medium',
        textTransform: 'uppercase'
    },
    overview:{
        fontFamily: 'SFPro-Regular',
        fontSize: 14,
        color: Colors.text,
        textAlign: 'justify',
        marginTop: 10,
    },
    scheduleBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        padding: 10,
        width: '90%',
        backgroundColor: Colors.btn,
        borderRadius: 15,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
    },
    btnText: {
        color: Colors.text,
        fontFamily: 'SFPro-Bold',
        fontSize: 16,
        textShadowColor: 'black',
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 2 },
    }

});


export default {styles, movie};