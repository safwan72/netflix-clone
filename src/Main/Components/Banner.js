
import axios from "../../Utils/axios";
import React from "react";
import reqs from "../../Utils/requests";
import Loader from "../../Utils/Loader";
import './CSS/banner.css';
const Banner = () => {
    const [movie, setmovie] = React.useState([]);
    const baseURL = `${process.env.REACT_APP_TMDB_IMAGE_URL}`;

    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(reqs.fetchNetflixOriginals);

            setmovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
            return request;
        }
        fetchData();
    }, []);
    function truncate(str, n) {
        return str?.length > n ? str?.substr(0, n - 1) + "..............................." : str;
    }
    return (
        <>
            <header className='banner__component'
                style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${movie?.backdrop_path && baseURL + movie?.backdrop_path})`,
                    backgroundPosition: "center center",
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                }}>
                {movie ? (
                    <div className="header__contents">
                        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                        <div className='banner__buttons'>
                            <button className="banner__button">Play</button>
                            <button className="banner__button">My List</button>
                        </div>
                        <div className="banner__desc">

                            <h3>{truncate(movie?.overview, 150)}</h3>
                        </div>

                    </div>
                ) : (
                    <Loader />
                )}
                <div className="banner__fadebottom" />
            </header>

        </>
    )
}

export default Banner
