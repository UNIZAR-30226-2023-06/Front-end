import React, { useState, useEffect } from "react";

const PopUpFaseTirada = (props) => {
  const [showPopup, setShowPopup] = useState(true);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [showDiceImage, setShowDiceImage] = useState(true);
  const [showExitButton, setShowExitButton] = useState(true);
  const [dado1, setDado1] = useState(null);
  const [dado2, setDado2] = useState(null);
  const [oveja, setOveja] = useState(0);
  const [madera] = useState(0);
  const [trigo, setTrigo] = useState(0);
  const [arcilla, setArcilla] = useState(0);
  const [piedra, setPiedra] = useState(0);

  const handleClose = () => {
    setShowPopup(false);
  };

  // const handleOpen = () => {
  //   setShowPopup(true);
  // };

  const Dados = [
    "http://localhost:3000/dados/dado_1.png",
    "http://localhost:3000/dados/dado_2.png",
    "http://localhost:3000/dados/dado_3.png",
    "http://localhost:3000/dados/dado_4.png",
    "http://localhost:3000/dados/dado_5.png",
    "http://localhost:3000/dados/dado_6.png",
  ];

  useEffect(() => {
    if (props.show) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [props.show]);

  const handleRollDice = () => {
    setShowDiceImage(false);
    setShowExitButton(false);
    console.log(props.lobby);
    ObtenerDados();
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

  function ObtenerDados() {
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/game_phases/resource_production?lobby_id=${props.lobby}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setDado1(data.die1 - 1);
          setDado2(data.die2 - 1);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Callback de setDado1
  const handleSetDado1 = (newDado1) => {
    setDado1(newDado1);
    console.log(`Nuevo valor de dado1: ${newDado1}`);
  };

  // Callback de setDado2
  const handleSetDado2 = (newDado2) => {
    setDado2(newDado2);
    console.log(`Nuevo valor de dado2: ${newDado2}`);
  };

  // Efecto que se activa cada vez que cambia dado1
  useEffect(() => {
    console.log(`Nuevo valor de dado1: ${dado1}`);
  }, [dado1]);

  // Efecto que se activa cada vez que cambia dado2
  useEffect(() => {
    console.log(`Nuevo valor de dado2: ${dado2}`);
  }, [dado2]);

  return (
    <>
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
                    <img src={Dados[dado1]} alt="Imagen 1" />
                  </div>
                  <div style={{ width: "35%", marginTop: "20px" }}>
                    <img src={Dados[dado2]} alt="Imagen 2" />
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
                  // (
                  //   <button
                  //     onClick={handleClose}
                  //     class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                  //     style={{ fontSize: "30px", marginLeft: "20px" }}
                  //   >
                  //     Salir
                  //   </button>
                  // )
                  <>
                    <h1
                      className="text-4xl"
                      style={{
                        color: "white",
                        fontWeight: "700",
                        marginTop: "50px",
                      }}
                    >
                      RECURSOS RECIBIDOS
                    </h1>
                    <div className="flex flex-row">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <img
                          src="http://localhost:3000/oveja.png"
                          alt="Imagen 1"
                          style={{ height: "50px", width: "50px" }}
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <img
                          src="http://localhost:3000/troncos.png"
                          alt="Imagen 1"
                          style={{ height: "50px", width: "50px" }}
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <img
                          src="http://localhost:3000/cebada.png"
                          alt="Imagen 1"
                          style={{ height: "50px", width: "50px" }}
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
                    <div className="flex flex-row justify-center">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <img
                          src="http://localhost:3000/arcilla.png"
                          alt="Imagen 1"
                          style={{ height: "50px", width: "50px" }}
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <img
                          src="http://localhost:3000/piedras.png"
                          alt="Imagen 1"
                          style={{ height: "50px", width: "50px" }}
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
                  </>
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
