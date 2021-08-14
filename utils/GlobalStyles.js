import { StyleSheet, Platform } from 'react-native';
import Colors from '../constants/Colors';

//General Styles
export const mainStyles = StyleSheet.create({
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
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    loadText: {
        fontFamily: 'SFPro-Bold',
        fontSize: 24,
        color: Colors.text
    },
    reload: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.bg,
        padding: 8,
        borderRadius: 15,
        marginTop: 10,
        elevation: 2
    }
});

//Styles Home Screen
export const homeStyles = StyleSheet.create({
    header:{
        marginHorizontal: 20,
        height: '10%',
    },
    logo: {
        width: '100%',
        resizeMode: 'contain'
    },
    posterImage: {
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
        margin: 0,
    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 15,
        width: '100%',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
    },
    button: {
        borderRadius: 15,
        height: 35,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Title: {
        fontFamily: 'SFPro-Bold',
        textAlign: 'center',
        color: Colors.text,
        fontSize: 12,
        marginHorizontal: 20
    }
})

//Styles Movie Screen
export const movieStyles = StyleSheet.create({
    posterImage: {
        width: 120,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20,
        margin: 0
    },
    title: {
        marginVertical: 10,
        fontFamily: 'SFPro-Bold',
        fontSize: 20,
        marginHorizontal: 20,
        color: Colors.text,
        textAlign: 'center'
    },
    info: {
        color: Colors.text,
        fontFamily: 'SFPro-Medium',
        fontSize: 14,
        textTransform: 'capitalize'
    },
    extraInfo: {
        color: Colors.text,
        fontFamily: 'SFPro-Regular',
        fontSize: 13
    },
    people: {
        fontFamily: 'SFPro-Light',
        fontSize: 12,
        color: Colors.text,
        marginTop: 10
    },
    overview: {
        fontFamily: 'SFPro-Regular',
        fontSize: 16,
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
    btnContainer: {
        width: '50%',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10
    },
    button: {
        borderRadius: Platform.OS === 'ios' ? 15: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    trailerBtn: {
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        marginRight: Platform.OS === 'ios' ? 2 : 1
    },
    scheduleBtn: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        marginLeft: Platform.OS === 'ios' ? 2 : 1
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
export const cinemaStyles = StyleSheet.create({
    Title: {
        fontFamily: 'SFPro-Bold',
        fontSize: 24,
        color: Colors.text,
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 10
    },
    Picker: {
        alignSelf: 'center',
        marginHorizontal: 20
    },
    noSchedules: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    itemInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
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
        margin: 5
    },
    schedule: {
        fontFamily: 'SFPro-Bold',
        color: Colors.bg
    }
});