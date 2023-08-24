import axios from 'axios';


export const searchMovies = async({searchQuery, pages})=>{
const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie',
  params: {include_adult: 'false', language: 'en-US', page: pages, query:searchQuery},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDhhNWJjNGE5NzY0ZGQyYzYyODU5ZTM3NWRlZTAyYiIsInN1YiI6IjY0ZTA5MTg0MzcxMDk3MDBlMjI5YTBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g-bCoPoM0MyKecC5WVZSkfUBuWYiN7qkymQ5XguYDg8'
  }
};
      const movies = await axios
      .request(options)
    return movies.data
    
}

export const trendingMovies = async()=>{
const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/day',
  params: {language: 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDhhNWJjNGE5NzY0ZGQyYzYyODU5ZTM3NWRlZTAyYiIsInN1YiI6IjY0ZTA5MTg0MzcxMDk3MDBlMjI5YTBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g-bCoPoM0MyKecC5WVZSkfUBuWYiN7qkymQ5XguYDg8'
  }
};
const trending = await axios
  .request(options)
  return trending.data
}

export const moviesDeteils = async({movieId})=>{
const options = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/movie/${movieId}`,
  params: {language: 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDhhNWJjNGE5NzY0ZGQyYzYyODU5ZTM3NWRlZTAyYiIsInN1YiI6IjY0ZTA5MTg0MzcxMDk3MDBlMjI5YTBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g-bCoPoM0MyKecC5WVZSkfUBuWYiN7qkymQ5XguYDg8'
  }
};
const informations = await axios
  .request(options)
  return informations.data
}

export const movieCredits = async({movieId})=>{
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    params: {language: 'en-US'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDhhNWJjNGE5NzY0ZGQyYzYyODU5ZTM3NWRlZTAyYiIsInN1YiI6IjY0ZTA5MTg0MzcxMDk3MDBlMjI5YTBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g-bCoPoM0MyKecC5WVZSkfUBuWYiN7qkymQ5XguYDg8'
    }
  };
  const casts = await axios
    .request(options)
    return casts.data
    }

export const movieReviews = async({movieId})=>{
const options = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
  params: {language: 'en-US', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDhhNWJjNGE5NzY0ZGQyYzYyODU5ZTM3NWRlZTAyYiIsInN1YiI6IjY0ZTA5MTg0MzcxMDk3MDBlMjI5YTBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g-bCoPoM0MyKecC5WVZSkfUBuWYiN7qkymQ5XguYDg8'
  }
};
const reviews = await axios
  .request(options)
return reviews.data
}