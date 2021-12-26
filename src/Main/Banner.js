
import axios from "../axios";
import React from "react";
import reqs from "../requests";
import './banner.css';
const Banner = () => {
    const [movie, setmovie] = React.useState([]);
    const baseURL = "https://image.tmdb.org/t/p/original";

    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(reqs.fetchNetflixOriginals);

            setmovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
            return request;
        }
        fetchData();
    }, []);
    function truncate(str, n) {
        return str.length > n ? str.substr(0, n - 1) + "..............................." : str;
    }
    return (
        <>
            <header className='banner__component'
                style={{
                    backgroundImage: `url(${baseURL}${movie?.backdrop_path})`,
                    backgroundPosition: "center center",
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                }}>
                <div className="header__contents">
                    <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                    <div className='banner__buttons'>
                        <button className="banner__button">Play</button>
                        <button className="banner__button">My List</button>
                    </div>
                    <div className="banner__desc">

                        <h3>{(movie?.overview)}</h3>
                    </div>

                </div>
                <div className="banner__fadebottom" />
            </header>
        </>
    )
}

export default Banner
