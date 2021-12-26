import React from "react";
import "./modal.css";

function Modal({ setOpenModal, children }) {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal();
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="body">
                    <p>{children}</p>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal();
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Modal;