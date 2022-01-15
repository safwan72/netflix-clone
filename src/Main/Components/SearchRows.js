import Loader from "../../Utils/Loader";
import React from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import RowPopUp from "./RowPopUp";
import { toast } from 'react-toastify';
const SearchRows = ({ movie }) => {
    const baseURL = `${process.env.REACT_APP_TMDB_IMAGE_URL}`;
    const [TrailerURL, setTrailerURL] = React.useState("")
    const [openpopup, setopenpopup] = React.useState(false);
    const [selectedmovie, setselectedmovie] = React.useState("");
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

    return (
        <div onClick={() => {
            openpopup && setopenpopup(false);
            document.body.style.overflow = 'unset';
        }}>
            {movie ? (
                <>
                    <div className="row__row__search__div">
                        <div className="row__row__search__image">
                            <img key={movie?.id} onClick={() => handlepopup(movie)} className={`row_search_image`} src={`${baseURL}${movie?.backdrop_path}`} alt={movie?.id} />
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

export default SearchRows;
