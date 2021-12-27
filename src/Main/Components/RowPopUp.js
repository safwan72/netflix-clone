import React from 'react'
import './CSS/rowpopup.css';

const RowPopUp = ({ openpopup, handlepopup, selectedmovie, setselectedmovie, handleClick }) => {
    console.log("From POPUP", selectedmovie);
    const baseURL = "https://image.tmdb.org/t/p/original";
    const handleclose = () => {
        handlepopup();
        setselectedmovie("");
    }
    React.useEffect(() => {
        if (openpopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [openpopup]);
    return (
        <>
            {openpopup &&
                <div className="modalBackground">
                    <div className="modalContainer">
                        <div className="body">
                            <img src={`${baseURL}${selectedmovie?.backdrop_path}`} alt='Poster' />
                        </div>
                        <div className='modalContent'>
                            <h2>{selectedmovie?.title || selectedmovie?.name || selectedmovie?.original_name}</h2>
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
                    </div>
                </div>
            }
            {/* <Modal setOpenModal={handleclose}
                isOpen={openpopup} > */}



            {/* </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleclose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleclose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            {/* </Modal> */}
        </>
    );
}

export default RowPopUp
