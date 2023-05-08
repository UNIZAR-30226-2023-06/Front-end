import React, { useState, useEffect } from "react";
const PopUpFaseTirada = (props) => {
  const [showPopup, setShowPopup] = useState(true);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [showDiceImage, setShowDiceImage] = useState(true);
  const [showExitButton, setShowExitButton] = useState(true); 

  const handleClose = () => {
    setShouldShowPopup(false);
    props.onClose();
  };

  const handleOpen = () => {
    setShouldShowPopup(true);
    setShowPopup(true);
  };

  const Dados = [
    "http://localhost:3000/dados/dado_1.png",
    "http://localhost:3000/dados/dado_2.png",
    "http://localhost:3000/dados/dado_3.png",
    "http://localhost:3000/dados/dado_4.png",
    "http://localhost:3000/dados/dado_5.png",
    "http://localhost:3000/dados/dado_6.png",
  ];

  useEffect(() => {
    if (shouldShowPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [shouldShowPopup]);

  const handleRollDice = () => {
    setShowDiceImage(false);
    setShowExitButton(false);
    // Aquí podrías agregar el código para tirar los dados y mostrar el resultado
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    marginBottom: "10px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column", //agregar esta propiedad para cambiar la dirección de los elementos
    alignItems: "center", // agregar esta propiedad para centrar los elementos horizontalmente
    marginTop: "20px",
  };

  return (
    <>
      <img
        src="http://localhost:3000/tabla-de-costes.png"
        alt="Abrir Popup"
        className="cursor-pointer"
        onClick={handleOpen}
        style={{
          transform: "scale(0.15)",
          position: "fixed",
          right: "-500px",
          bottom: "-380px",
        }}
      />{" "}
      {showPopup && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-0 flex items-center justify-center">
          <div
            className="relative bg-black rounded-lg p-4 bg-opacity-70 inline-flex flex-col items-center h-4/5 "
            style={{ height: "700px", width: "500px" }}
          >
            <h1
              className="text-5xl mt-2"
              style={{ color: "white", fontWeight: "700", marginTop: "50px" }}
            >
              FASE DE TIRADA
            </h1>{" "}
            <div style={containerStyle}>
              {showDiceImage ? (
                <img
                  src="http://localhost:3000/dados.png"
                  alt="Imagen 1"
                  style={{ height: "200px", width: "200px", marginTop: "70px" }}
                />
              ) : (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "35%",
                      marginRight: "10px",
                      marginLeft: "67px",
                      marginTop: "20px",
                    }}
                  >
                    <img src={Dados[4]} alt="Imagen 1" />
                  </div>
                  <div style={{ width: "35%", marginTop: "20px" }}>
                    <img src={Dados[4]} alt="Imagen 2" />
                  </div>
                </div>
              )}
              <div class="mt-20">
                {showExitButton ? (
                  <button
                    onClick={handleRollDice}
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                    style={{ fontSize: "30px", marginLeft: "20px" }}
                  >
                    Tirar Dados
                  </button>
                ) : (
                  <button
                    onClick={handleClose}
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                    style={{ fontSize: "30px", marginLeft: "20px" }}
                  >
                    Salir
                  </button>
                )}
              </div>
            </div>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpFaseTirada;
