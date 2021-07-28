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
        margin: 16,
        width: 36
    },
});

const movie = StyleSheet.create({
    posterImage: {
        width: 120,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
    },
    title: {
        marginTop: 10,
        marginHorizontal: 20,
        fontFamily: 'SFPro-Bold',
        fontSize: 28,
        color: Colors.text,
        textAlign: 'center'
    },
    genre: {
        alignSelf: 'flex-start',
        color: Colors.text,
        fontFamily: 'SFPro-Bold',
        fontSize: 18,
        textTransform: 'capitalize'
    },
    release_date:{
        alignSelf: 'flex-start',
        color: Colors.text,
        fontFamily: 'SFPro-Bold',
        fontSize: 16,
    },
    overview:{
        alignSelf: 'flex-start',
        fontFamily: 'SFPro-Regular',
        fontSize: 14,
        color: Colors.text,
        textAlign: 'justify',
        marginTop: 10,
    },
    btnsWrapper:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    btn:{
        width: '50%',
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
    },
    trailerBtn: {
        backgroundColor: Colors.btnTrailer,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15
    },
    scheduleBtn: {
        backgroundColor: Colors.btnSchedule,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },
    icon: {
        textShadowColor: 'black',
        textShadowRadius: 5,
        textShadowOffset: { width: 0, height: 1 },
        color: Colors.text,
    },
    btnText: {
        color: Colors.text,
        fontFamily: 'SFPro-Bold',
        marginLeft: 4,
        fontSize: 16,
        textShadowColor: 'black',
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 2 },
    }

});


export default {styles, movie};