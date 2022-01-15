import React from 'react'
import './CSS/rowpopup.css';
import Loader from '../../Utils/Loader';
const RowPopUp = ({ openpopup, handlepopup, selectedmovie, setselectedmovie, handleClick }) => {
    const baseURL = `${process.env.REACT_APP_TMDB_IMAGE_URL}`;
    const handleclose = () => {
        handlepopup();
        setselectedmovie("");
        return document.body.style.overflow = 'unset';
    }
    React.useEffect(() => {
        if (openpopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

    }, [openpopup]);
    const dateform = (d) => {
        let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear() + " "
        return datestring;
    }
    return (
        <>
            {openpopup &&
                <div className="modalBackground">
                    <div className="modalContainer">
                        {selectedmovie ? (
                            <>
                                <div className="body">
                                    <img src={`${baseURL}${selectedmovie?.backdrop_path}`} alt='Poster' />
                                </div>
                                <div className='modalContent'>
                                    <h2>{selectedmovie?.title || selectedmovie?.name || selectedmovie?.original_name}</h2>
                                    <h4>Released at: {dateform(new Date(selectedmovie?.release_date || selectedmovie?.first_air_date)) || "Not Available!!"}</h4>
                                    <h4>Rating: {selectedmovie?.vote_average || "Not Available!!"}</h4>
                                    <p>{selectedmovie?.overview || "No Overview Available!!!!"}</p>
                                </div>
                                <div className="footer">
                                    <button
                                        onClick={() => {
                                            handleclose();
                                        }}
                                        id="cancelBtn"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleClick();
                                        }}
                                        id="trailerBtn"
                                    >
                                        Watch Trailer
                                    </button>
                                </div>
                            </>
                        ) : (<Loader />)}
                    </div>
                </div>


            }

        </>
    );
}

export default RowPopUp
