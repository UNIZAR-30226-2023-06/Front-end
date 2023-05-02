import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const PopUpCartasDesarrollo = (props) => {
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

  const items = [
    <img
      src="http://localhost:3000/cartas-desarrollo/progreso_descubrimiento.png"
      alt="close"
      className="absolute top-0 right-0 cursor-pointer mt-3 mr-3"
      style={{ width: "50px", height: "50px" }}
      onClick={handleClose}
    />,
    <img
      src="http://localhost:3000/cartas-desarrollo/progreso_descubrimiento.png"
      alt="close"
      className="absolute top-0 right-0 cursor-pointer mt-3 mr-3"
      style={{ width: "50px", height: "50px" }}
      onClick={handleClose}
    />,
    <img
      src="http://localhost:3000/cartas-desarrollo/progreso_descubrimiento.png"
      alt="close"
      className="absolute top-0 right-0 cursor-pointer mt-3 mr-3"
      style={{ width: "50px", height: "50px" }}
      onClick={handleClose}
    />,
    <img
      src="http://localhost:3000/cartas-desarrollo/progreso_descubrimiento.png"
      alt="close"
      className="absolute top-0 right-0 cursor-pointer mt-3 mr-3"
      style={{ width: "50px", height: "50px" }}
      onClick={handleClose}
    />,
    <img
      src="http://localhost:3000/cartas-desarrollo/progreso_descubrimiento.png"
      alt="close"
      className="absolute top-0 right-0 cursor-pointer mt-3 mr-3"
      style={{ width: "50px", height: "50px" }}
      onClick={handleClose}
    />,
  ];
  const responsive = {
    0: { items: 1 },
    1: { items: 2 },
    2: { items: 3 },
    3: { items: 4 },
    4: { items: 5 },
  };

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
            style={{
              minHeight: "640px",
              minWidth: "1290px",
              maxWidth: "1290px",
            }}
          >
            <h1
              className="text-5xl mt-2"
              style={{ color: "black", fontWeight: "700", marginTop: "0px" }}
            >
              CARTAS DE DESARROLLO
            </h1>{" "}
            <img
              src="http://localhost:3000/white_cross.png"
              alt="close"
              className="absolute top-0 right-0 cursor-pointer mt-3 mr-3"
              style={{ width: "50px", height: "50px" }}
              onClick={handleClose}
            />
            <div className="slider_cartas_recursos">
              <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
                controlsStrategy="alternate"
              />
            </div>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpCartasDesarrollo;
