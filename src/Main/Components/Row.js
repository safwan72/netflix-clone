import axios from "../../Utils/axios";
import Loader from "../../Utils/Loader";
import React from "react";
import './CSS/row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import RowPopUp from "./RowPopUp";
import { toast } from 'react-toastify';
const Row = ({ title, fettchurl, isLargeRow, searchquery }) => {
    const baseURL = process.env.REACT_APP_TMDB_IMAGE_URL;
    const [movie, setmovie] = React.useState([]);
    const [TrailerURL, setTrailerURL] = React.useState("")
    const [openpopup, setopenpopup] = React.useState(false);
    const [selectedmovie, setselectedmovie] = React.useState("");
    const refContainer = React.useRef(null);
    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fettchurl);
            setmovie(request.data.results);
            return request;
        }
        fetchData();
    }, [fettchurl]);
    const opts = {
        height: '450',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };
    const handlepopup = (movie) => {
        setopenpopup(!openpopup);
        setselectedmovie(movie)
    }
    const handleClick = () => {
        document.body.style.overflow = 'unset';
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
                    toast.dark("Temporary Unavailable!!!", {
                        progressClassName: 'toast_error_class_progress'
                    });
                    setTrailerURL("");
                })
        }
    }
    // const items = movie.filter((data) => {
    //     if (searchquery == null)
    //         return data
    //     else if (data.name.toLowerCase().includes(searchquery.toLowerCase()) || data.original_name.toLowerCase().includes(searchquery.toLowerCase()) || data.overview.toLowerCase().includes(searchquery.toLowerCase()) || data.title.toLowerCase().includes(searchquery.toLowerCase()) || data.original_title.toLowerCase().includes(searchquery.toLowerCase())) {
    //         return data
    //     }
    // }).map(data => {

    // })
    return (
        <div className='row__row' onClick={() => {
            openpopup && setopenpopup(false);
            document.body.style.overflow = 'unset';
        }}>
            {movie ? (
                <>
                    <h2 className='row__title'>{title}</h2>
                    <div className="row__div">
                        <div className="row__images" ref={refContainer}>
                            <div className={`fas__arr fa-2x slider-arrow-right ${isLargeRow && "fas__arr_large"}`}>
                                <i className="fas fa-arrow-right"
                                    onClick={() => {
                                        refContainer.current.scrollTo({ behavior: 'smooth', left: refContainer.current.scrollLeft + 50 })
                                    }}
                                ></i>
                            </div>
                            <div className={`fas__arr fa-2x slider-arrow-left ${isLargeRow && "fas__arr_large"}`}>
                                <i className="fas fa-arrow-left"
                                    onClick={() => {
                                        refContainer.current.scrollTo({ behavior: 'smooth', left: refContainer.current.scrollLeft - 50 })
                                    }}></i>
                            </div>

                            {movie.map((move) => (
                                <img key={move.id} onClick={() => handlepopup(move)} className={`row__image ${isLargeRow && "row__imageLarge"}`} src={`${baseURL}${isLargeRow ? move?.poster_path : move?.backdrop_path}`} alt={title} />
                            ))}
                        </div>
                    </div>
                    {openpopup && <RowPopUp openpopup={openpopup} handlepopup={handlepopup}
                        selectedmovie={selectedmovie} setselectedmovie={setselectedmovie} handleClick={handleClick} />}

                    {TrailerURL && <YouTube videoId={TrailerURL} opts={opts} style={{ marginTop: "15px" }} />}
                </>
            ) : (
                <Loader />
            )}

        </div>
    );
};

export default Row;
