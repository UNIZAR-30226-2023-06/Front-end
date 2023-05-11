import React, { useState, useEffect } from "react";

const PopupTablaCostes = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [bgImage, setBgImage] = useState(null);

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
  const loadImage = () => {
    const img = new Image();
    img.src = "http://localhost:3000/tabla-de-costes.png";
    img.onload = () => {
      setBgImage(`url(${img.src})`);
    };
  };

  useEffect(() => {
    if (shouldShowPopup) {
      setShowPopup(true);
      loadImage();
    } else {
      setShowPopup(false);
    }
  }, [shouldShowPopup]);

  return (
    <>
      <img
        src="http://localhost:3000/tabla-de-costes.png"
        alt="Abrir Popup"
        className="cursor-pointer"
        onClick={handleOpen}
        style={{
          transform: "scale(0.15)",
          position: "fixed", right: "-330px", bottom: "-380px"
        }}
      />
      {showPopup && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          // style={{
          //   //backgroundImage: bgImage,
          //   backgroundSize: "contain",
          //   backgroundRepeat: "no-repeat",
          //   backgroundPosition: "center",
          //   minHeight: "640px",
          //   minWidth: "1290px",
          // }}
          onClick={handleBackgroundClick}
        >
          <img
            src="http://localhost:3000/tabla-de-costes.png"
            alt="close"
            className="absolute cursor-pointer my-auto mx-auto "
            style={{ maxWidth: "720px", maxHeight: "1290px" }}
            onClick={handleClose}
          />
          {/*   cruz para cerrar la pop-up*/}
          <img
            src="http://localhost:3000/black_cross.png"
            alt="close"
            className="absolute top-14 cursor-pointer mt-3 mr-8 pointer-events-auto"
            style={{ width: "50px", height: "50px", left: "1250px" }}
            onClick={handleClose}
          />
          {props.children}
        </div>
      )}
    </>
  );
};

export default PopupTablaCostes;
