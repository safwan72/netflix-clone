import axios from "../axios";
import React from "react";
import './row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useAlert } from 'react-alert'
import RowPopUp from "./RowPopUp";
const Row = ({ title, fettchurl, isLargeRow }) => {
    const baseURL = "https://image.tmdb.org/t/p/original";
    const [movie, setmovie] = React.useState([]);
    const [TrailerURL, setTrailerURL] = React.useState("")
    const [openpopup, setopenpopup] = React.useState(false);
    const [selectedmovie, setselectedmovie] = React.useState("");
    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fettchurl);
            setmovie(request.data.results);
            return request;
        }
        fetchData();
        // effect
        // return () => {
        //     cleanup
        // }
    }, [fettchurl]);
    const alert = useAlert()
    const opts = {
        height: '450',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    const handlepopup = (movie) => {
        setopenpopup(!openpopup);
        setselectedmovie(movie)
    }
    const handleClick = () => {
        setopenpopup(!openpopup);
        if (TrailerURL) {
            setTrailerURL("");
        }
        else {
            movieTrailer(selectedmovie?.title || selectedmovie?.name || selectedmovie?.original_name || "")
                .then(url => {
                    const urlparam = new URLSearchParams(new URL(url).search);
                    setTrailerURL(urlparam.get('v'));
                })
                .catch(err => {
                    alert.show("Temporary Unavailable!!!");
                    setTrailerURL("");
                })
        }
    }
    return (
        <div className='row__row'>
            <h2 className='row__title'>{title}</h2>
            <div className="row__images">
                {movie.map((move) => (
                    <img key={move.id} onClick={() => handlepopup(move)} className={`row__image ${isLargeRow && "row__imageLarge"}`} src={`${baseURL}${isLargeRow ? move?.poster_path : move?.backdrop_path}`} alt={title} />
                ))}
            </div>
            <RowPopUp openpopup={openpopup} handlepopup={handlepopup} selectedmovie={selectedmovie}
                setselectedmovie={setselectedmovie} handleClick={handleClick} />
            {TrailerURL && <YouTube videoId={TrailerURL} opts={opts} />}

        </div>
    );
};

export default Row;
