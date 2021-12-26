const API_KEY='6dd684d94a7ec829e0e1085bf900ded4';


export const baseURL="https://api.themoviedb.org/3";

const reqs={

fetchTrending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
fetchNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
fetchTopRated:`movie/top_rated?api_key=${API_KEY}&language=en-US`,
fetchUpComing:`movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
fetchActionMovies:`/discover/movie?api_key=${API_KEY}&with_genres=28`,
fetchComedyMovies:`/discover/movie?api_key=${API_KEY}&with_genres=35`,
fetchHorrorMovies:`/discover/movie?api_key=${API_KEY}&with_genres=27`,
fetchRomanceMovies:`/discover/movie?api_key=${API_KEY}&with_genres=10749`,
fetchDocumentries:`/discover/movie?api_key=${API_KEY}&with_genres=99`,

}

export default reqs;