import { apiURL } from '@env';
import {ToastAndroid} from 'react-native';

//Get Movies Listed on Cinemas
export const getMovies = async () => {
    let movies = null;
    await fetch(`${apiURL}movies`)
        .then(response => movies = response.json())
        .catch((error) => {
            if(error == 'TypeError: Network request failed'){
                ToastAndroid.show('Error de conexión!', ToastAndroid.LONG);
            }
           });

    return movies;
}

//Get Info Movie Selected
export const getMovieInfo = async (movie_id) => {
    let movieInfo = null;
    await fetch(`${apiURL}movies/${movie_id}`)
        .then(response => movieInfo = response.json())
        .catch((error) => {
            if(error == 'TypeError: Network request failed'){
                ToastAndroid.show('Error de conexión!', ToastAndroid.LONG);
            }
           });

    return movieInfo;
}

//Get Cinemas Info and Movie Schedules 
export const getCinemas = async (city, movie_inCity,) => {
    let cinemas = null
    await fetch(`${apiURL}movies/schedule/${city}/${movie_inCity}`)
        .then(response => cinemas = response.json())
        .catch((error) => {
            if(error == 'TypeError: Network request failed'){
                ToastAndroid.show('Error de conexión!', ToastAndroid.LONG);
            }
           });

    return cinemas;
}