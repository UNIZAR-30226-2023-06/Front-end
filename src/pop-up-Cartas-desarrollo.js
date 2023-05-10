import React, { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

// 1-- Importamos useCookies y jwt_decode
import { useCookies } from "react-cookie";

const PopUpCartasDesarrollo = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [numeros, setNumeros] = useState([]); // Estado para almacenar los números
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResourceSelection, setShowResourceSelection] = useState(false);

  const handleClose = () => {
    setShouldShowPopup(false);
    props.onClose();
  };

  const handleOpen = () => {
    GetNumCartas();
    setShouldShowPopup(true);
    setShowPopup(true);
  };

  const popUp2 = (index) => {
    setSelectedCardIndex(index);
    setShowConfirmation(true);
  };

  const handleConfirm = (index) => {
    console.log(numeros);
    console.log(selectedCardIndex);
    if (numeros[selectedCardIndex] === 0) {
      toast.error("No tienes los recursos suficientes");
      setShowConfirmation(false);
    } else {
      if (selectedCardIndex === 6) {
        console.log("hola");
        setShowResourceSelection(true);
        setShowConfirmation(false);
      } else {
        // Lógica adicional si el índice no es 6
      }
    }
  };

  const handleCancel = () => {
    // Lógica para cuando se selecciona "No"
    setShowConfirmation(false);
  };

  const handleResourceSelectionClose = () => {
    setShowResourceSelection(false);
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

  // 2-- Creamos la estructura de las cookies
  const [cookies] = useCookies(["token"]);

  // 3-- Obtenemos el token de las cookies
  const Token = cookies.token;

  function GetNumCartas() {
    console.log(props.lobby);
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/game_phases/get_player_state?lobby_id=${props.lobby}`,
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
          console.log("----Informacion del usuario----");
          console.log(data);
          const newNumeros = [
            data.hand.dev_cards.library,
            data.hand.dev_cards.market,
            data.hand.dev_cards.university,
            data.hand.dev_cards.town_hall,
            data.hand.dev_cards.church,
            data.hand.dev_cards.knight,
            data.hand.dev_cards.monopoly_progress,
            data.hand.dev_cards.road_progress,
            data.hand.dev_cards.invention_progress,
          ];
          setNumeros(newNumeros); // Actualizar el estado con los números obtenidos

          console.log(numeros);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const cartas = [
    {
      src: "http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-1.png",
      alt: "Imagen 1",
    },
    {
      src: "http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-2.png",
      alt: "Imagen 2",
    },
    {
      src: "http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-3.png",
      alt: "Imagen 3",
    },
    {
      src: "http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-4.png",
      alt: "Imagen 4",
    },
    {
      src: "http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-5.png",
      alt: "Imagen 5",
    },
    {
      src: "http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-6.png",
      alt: "Imagen 6",
    },
    {
      src: "http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-7.png",
      alt: "Imagen 7",
    },
    {
      src: "http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-8.png",
      alt: "Imagen 8",
    },
    {
      src: "http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-9.png",
      alt: "Imagen 9",
    },
  ];

  const recursos = [
    {
      src: "http://localhost:3000/recursos/arcilla.png",
      text: "arcilla",
    },
    {
      src: "http://localhost:3000/recursos/madera.png",
      text: "madera",
    },
    {
      src: "http://localhost:3000/recursos/ovejas.png",
      text: "ovejas",
    },
    {
      src: "http://localhost:3000/recursos/roca.png",
      text: "roca",
    },
    {
      src: "http://localhost:3000/recursos/trigo.png",
      text: "trigo",
    },
  ];

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
          left: "1650px",
          top: "300px",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <img
          src="http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-oculta.png"
          alt="Imagen"
          style={{ width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: "160px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "10px",
            textAlign: "center",
            width: "150px",
            borderRadius: "5px",
          }}
        >
          Ver cartas de desarrollo
        </div>
      </div>
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
            <div className="grid grid-cols-5 gap-4">
              {/* Cartas arriba */}
              {cartas.slice(0, 5).map((carta, index) => (
                <div
                  key={index}
                  className="p-2 relative"
                  onClick={() => popUp2(index)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={carta.src}
                    alt={carta.alt}
                    className="w-full h-auto"
                    style={{ borderRadius: "15%" }}
                  />
                  <div className="absolute bottom-2 right-2 bg-white border border-black rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-black">{numeros[index]}</span>
                  </div>
                </div>
              ))}

              {/* Cartas abajo */}
              {cartas.slice(5, 9).map((carta, index) => (
                <div
                  key={index}
                  className="p-2 relative"
                  onClick={() => popUp2(index + 5)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={carta.src}
                    alt={carta.alt}
                    className="w-full h-auto"
                    style={{ borderRadius: "15%" }}
                  />
                  <div className="absolute bottom-2 right-2 bg-white border border-black rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-black">{numeros[index + 5]}</span>
                  </div>
                </div>
              ))}
            </div>
            {showConfirmation && (
              <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="relative bg-gray-400 rounded-lg p-4 inline-flex flex-col items-center">
                  <h1 className="text-3xl font-bold">Confirmación</h1>
                  <p>¿Deseas usar esta carta?</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded"
                      onClick={handleConfirm}
                    >
                      Sí
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={handleCancel}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showResourceSelection && (
              <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="relative bg-gray-400 rounded-lg p-4 inline-flex flex-col items-center">
                  <h1 className="text-3xl font-bold">
                    Elige un recurso para robar
                  </h1>
                  <div className="flex gap-4 mt-4">
                    {recursos.map((recurso, index) => (
                      <div
                        key={index}
                        className="p-2 relative flex flex-col items-center"
                        onClick={() => handleResourceSelectionClose()}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={recurso.src}
                          alt={recurso.text}
                          className="w-20 h-auto"
                          style={{ borderRadius: "15%" }}
                        />
                        <div className="bg-white border border-black rounded mt-2 p-2">
                          <span className="text-black">{recurso.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpCartasDesarrollo;
