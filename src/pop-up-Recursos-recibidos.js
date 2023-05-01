import React, { useState, useEffect } from "react";

const PopUpRecursosRecibidos = (props) => {
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

  const imageStyle = {
    width: "100%",
    height: "auto",
    marginBottom: "10px",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  };

  return (
    <>
      <button onClick={handleOpen}>Mostrar Popup</button>
      {showPopup && (
        <div
          className="fixed z-50 inset-0 bg-black bg-opacity-0 flex items-center justify-center"
          onClick={handleBackgroundClick}
        >
          <div
            className="relative bg-black rounded-lg p-4 bg-opacity-70 inline-flex flex-col items-center h-4/5 "
            style={{ height: "550px", width: "1000px" }}
          >
            <h1
              className="text-5xl mt-2"
              style={{ color: "white", fontWeight: "700" , marginTop: "50px"}}
            >
              RECURSOS RECIBIDOS
            </h1>{" "}
            <img
              src="http://localhost:3000/white_cross.png"
              alt="close"
              className="absolute top-0 right-0 cursor-pointer mt-3 mr-3"
              style={{ width: "50px", height: "50px" }}
              onClick={handleClose}
            />
            <div style={containerStyle}>
              <div style={{ display: "flex", alignItems: "center" , marginTop: "20px"}}>
                <img
                  src="http://localhost:3000/oveja.png"
                  alt="Imagen 1"
                  style={{ height: "150px", width: "150px" }}
                />
                <h1
                  className="text-3xl mt-2"
                  style={{
                    color: "white",
                    fontWeight: "700",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  X2
                </h1>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                <img
                  src="http://localhost:3000/troncos.png"
                  alt="Imagen 1"
                  style={{ height: "150px", width: "150px" }}
                />
                <h1
                  className="text-3xl mt-2"
                  style={{
                    color: "white",
                    fontWeight: "700",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  X2
                </h1>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                <img
                  src="http://localhost:3000/cebada.png"
                  alt="Imagen 1"
                  style={{ height: "150px", width: "150px" }}
                />
                <h1
                  className="text-3xl mt-2"
                  style={{
                    color: "white",
                    fontWeight: "700",
                    marginLeft: "20px",
                  }}
                >
                  X2
                </h1>
              </div>
            </div>

            <div style={containerStyle}>
              <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                <img
                  src="http://localhost:3000/arcilla.png"
                  alt="Imagen 1"
                  style={{ height: "150px", width: "150px" }}
                />
                <h1
                  className="text-3xl mt-2"
                  style={{
                    color: "white",
                    fontWeight: "700",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  X2
                </h1>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                <img
                  src="http://localhost:3000/piedras.png"
                  alt="Imagen 1"
                  style={{ height: "150px", width: "150px" }}
                />
                <h1
                  className="text-3xl mt-2"
                  style={{
                    color: "white",
                    fontWeight: "700",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  X2
                </h1>
              </div>

            </div>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpRecursosRecibidos;
