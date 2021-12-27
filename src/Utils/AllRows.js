import reqs from './requests';


const allrows = [
    {
        title: "Netflix Originals",
        url: reqs.fetchNetflixOriginals,
        isLarge: true,
    },
    {
        title: "Trending Now",
        url: reqs.fetchTrending,
        isLarge: false,
    },
    {
        isLarge: false,
        title: "Top Rated",
        url: reqs.fetchTopRated
    },
    {
        isLarge: false,
        title: "UpComing",
        url: reqs.fetchUpComing
    },
    {
        isLarge: false,
        title: "Horror Movies",
        url: reqs.fetchHorrorMovies
    },
    {
        isLarge: false,
        title: "Comedy Movies",
        url: reqs.fetchComedyMovies
    },
    {
        isLarge: false,
        title: "Action Movies",
        url: reqs.fetchActionMovies
    },
    {
        isLarge: false,
        title: "Romantic Movies",
        url: reqs.fetchRomanceMovies
    },
    {
        isLarge: false,
        title: "Documentries",
        url: reqs.fetchDocumentries
    },
]
export default allrows;