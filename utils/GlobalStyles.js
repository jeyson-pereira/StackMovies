import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

//General Styles
const styles = StyleSheet.create({
    Title: {
        fontFamily: 'SFPro-Bold',
        fontSize: 24,
        color: Colors.text
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    goBack: {
        marginTop: 16,
        marginLeft: 20,
        width: 36
    },
    hr: {
        borderTopColor: 'rgba(255,255,255,0.3)',
        borderTopWidth: 1,
        marginVertical: 10
    },
    banner: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    }
});

//Styles Home Screen
const home = StyleSheet.create({
    posterImage: {
        width: '100%',
        resizeMode: 'contain',
        borderRadius: 15,
        margin: 0,
        marginBottom: 10
    },
    infoContainer: {
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: Colors.btnMain,
        width: '100%',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 4
    },
    Title: {
        fontFamily: 'SFPro-Bold',
        textAlign: 'center',
        fontSize: 15,
        color: Colors.text,
        marginHorizontal: 10
    }
})

//Styles Movie Screen
const movie = StyleSheet.create({
    posterImage: {
        width: 120,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 24,
        margin: 0
    },
    title: {
        marginBottom: 10,
        fontFamily: 'SFPro-Bold',
        fontSize: 24,
        marginHorizontal: 20,
        color: Colors.text,
        textAlign: 'center'
    },
    info: {
        color: Colors.text,
        fontFamily: 'SFPro-Medium',
        fontSize: 16,
        textTransform: 'capitalize'
    },
    extraInfo: {
        color: Colors.text,
        fontFamily: 'SFPro-Regular',
        fontSize: 14
    },
    people: {
        fontFamily: 'SFPro-Light',
        color: Colors.text,
        marginTop: 10
    },
    overview: {
        fontFamily: 'SFPro-Regular',
        fontSize: 15,
        color: Colors.text,
        textAlign: 'justify',
        marginTop: 10
    },
    //Buttons
    btnsWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20
    },
    btn: {
        width: '50%',
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10
    },
    trailerBtn: {
        backgroundColor: Colors.btnTrailer,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        marginRight: 1
    },
    scheduleBtn: {
        backgroundColor: Colors.btnSchedule,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        marginLeft: 1
    },
    icon: {
        textShadowColor: 'black',
        textShadowRadius: 5,
        textShadowOffset: { width: 0, height: 1 },
        color: Colors.text
    },
    btnText: {
        color: Colors.text,
        fontFamily: 'SFPro-Bold',
        marginLeft: 4,
        fontSize: 16,
        textShadowColor: 'black',
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 2 }
    }

});

//Styles Cinema Screen
const cinema = StyleSheet.create({
    Title: {
        fontFamily: 'SFPro-Bold',
        fontSize: 24,
        color: Colors.text,
        alignSelf: 'center',
        textAlign: 'center'
    },
    Picker: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center',
        width: '80%'
    },
    noSchedules: {
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        padding: 10,
        borderRadius: 5
    },
    containerItem: {
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        padding: 10,
        borderRadius: 5
    },
    cinema: {
        fontFamily: 'SFPro-Bold',
        color: Colors.text
    },
    cinema: {
        fontFamily: 'SFPro-Bold',
        color: Colors.text
    },
    location: {
        fontFamily: 'SFPro-Medium',
        color: Colors.text
    },
    formatWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    format: {
        marginLeft: 4,
        fontFamily: 'SFPro-Regular',
        color: Colors.text
    },
    schedulesWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    scheduleItem: {
        padding: 5,
        backgroundColor: Colors.text,
        borderRadius: 10,
        marginVertical: 5,
        marginRight: 10
    },
    schedule: {
        fontFamily: 'SFPro-Bold',
        color: Colors.bg
    }
});

export default { styles, home, movie, cinema };