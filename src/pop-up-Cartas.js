import React, { useState, useEffect } from "react";

const PopupCartas = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);

  const handleClose = () => {
    setShouldShowPopup(false);
    props.onClose();
  };

  const handleOpen = () => {
    setShouldShowPopup(true);
    setShowPopup(true);
  };

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (shouldShowPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [shouldShowPopup]);

  return (
    <>
      <button onClick={handleOpen}>Mostrar Popup</button>
      {showPopup && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleBackgroundClick}
        >
          <div
            className="relative bg-gray-400 rounded-lg p-4 inline-flex flex-col items-center h-4/5 "
            style={{ minHeight: "640px", minWidth: "1290px" }}
          >
            <img
              src="http://localhost:3000/white_cross.png"
              alt="close"
              className="absolute top-0 right-0 cursor-pointer mt-3 mr-3 pointer-events-auto"
              style={{ width: "50px", height: "50px" }}
              onClick={handleClose}
            />
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopupCartas;
