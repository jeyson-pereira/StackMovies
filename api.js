import { apiURL } from '@env';

//Get Movies Listed on Cinemas
export const getMovies = async () => {
    const movies = await fetch(`${apiURL}movies`)
        .then(response => response.json());

    return movies;
}

//Get Info Movie Selected
export const getMovieInfo = async (movie_id) => {
    const movieInfo = await fetch(`${apiURL}movies/${movie_id}`)
        .then(response => response.json());

    return movieInfo;
}

//Get Cinemas Info and Movie Schedules 
export const getCinemas = async (city, movie_inCity,) => {
    const cinemas = await fetch(`${apiURL}movies/schedule/${city}/${movie_inCity}`)
        .then(response => response.json());

    return cinemas;
}