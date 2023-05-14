import React, { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import toast from "react-hot-toast";

import { global_info } from "./Partida";

import { useNavigate } from "react-router-dom";

// 1-- Importamos useCookies y jwt_decode
import { useCookies } from "react-cookie";

const PopUpCartasDesarrollo = (params) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [numeros, setNumeros] = useState([]); // Estado para almacenar los números
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResourceSelection, setShowResourceSelection] = useState(false);
  const [showResourceSelection2, setShowResourceSelection2] = useState(false);
  const [selectedResources, setSelectedResources] = useState([]);
  const handleClose = () => {
    setShouldShowPopup(false);
    // params.onClose();
  };

  const handleOpen = () => {
    GetNumCartas();
    setShouldShowPopup(true);
    setShowPopup(true);
  };

  const popUp2 = (index) => {
    if (params.turno === params.mi_id && params.fase === "TRADING") {
      setSelectedCardIndex(index);
      setShowConfirmation(true);
    }
    else {
      // Aviso con una toast que solo se pueden usar las cartas en la fase de trading
      // durante el turno del jugador
      toast.error("Solo se pueden usar las cartas en la fase de trading durante el turno del jugador");
    }
  };

  const handleConfirm = (index) => {
    console.log(numeros);
    console.log(selectedCardIndex);
    if (numeros[selectedCardIndex] === 0) {
      toast.error("No dispones de esta carta de desarrollo");
      setShowConfirmation(false);
    } else {

      if (
        selectedCardIndex === 0 ||
        selectedCardIndex === 1 ||
        selectedCardIndex === 2 ||
        selectedCardIndex === 3 ||
        selectedCardIndex === 4
      ) {
        // Hago una petición get al backend para usar la carta de desarrollo

        // Ejemplo url:
        // http://localhost:8000/game_phases/use_victory_point_progress_card?lobby_id=65

        fetch(
          `${process.env.REACT_APP_URL_BACKEND}/game_phases/use_victory_point_progress_card?lobby_id=${params.lobby}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${params.token}`,
            },
          }
        )
          .then((res) => {
            res.json().then((data) => {
              console.log("----Informacion del usuario----");
              console.log(data);
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });

      } else if (selectedCardIndex === 5) {
        // Log
        console.log("Se ha seleccionado la carta de caballero");

        // Avisamos al backend de que nos reste la carta de desarrollo

        // Ejemplo url;
        // http://localhost:8000/game_phases/substract_knight_card?lobby_id=654

        fetch(
          `${process.env.REACT_APP_URL_BACKEND}/game_phases/substract_knight_card?lobby_id=${params.lobby}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${params.token}`,
            },
          }
        )
          .then((res) => {
            res.json().then((data) => {
              console.log("---- se supone que baja un caballero ----");
              console.log(data);
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        global_info.colocando_ladron = true;

        toast.success(' ¡Selecciona a que casilla quieres mover el ladrón!', {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });

      } else if (selectedCardIndex === 6) {
        console.log("hola");
        setShowResourceSelection(true);
        setShowConfirmation(false);
      } else if (selectedCardIndex === 7) {
        // TODO: construcción de carreteras
      } else if (selectedCardIndex === 8) {
        setShowResourceSelection2(true);
        setShowConfirmation(false);
      }

      // Cierro la popup
      setShowPopup(false);
      setShouldShowPopup(false);
    }
    handleCancel();
  };

  const handleCancel = () => {
    // Lógica para cuando se selecciona "No"
    setShowConfirmation(false);
  };

  const handleResourceSelectionClose = () => {
    UsarDescubrimiento();
    setShowResourceSelection2(false);
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

  const handleResourceSelection = (resource) => {
    if (selectedResources.length < 2) {
      setSelectedResources((prevSelectedResources) => [
        ...prevSelectedResources,
        resource,
      ]);
    }
  };

  function ComprarCartaDesarrollo() {
    // Ejemplo de url:
    // http://localhost:8000/game_phases/buy_development_card?lobby_id=654

    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/game_phases/buy_development_card?lobby_id=${params.lobby}`,
      {
        method: "GET",
        headers: {
          //"Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${params.token}`,
        },
      }
    )
      .then((res) => {
        res.json().then((data) => {
          console.log("----Informacion del usuario----");
          console.log(data);
          if (data.detail === "No se pueden construir edificios en esta fase del turno") {
            toast.error("solo se puede comprar en la fase de construcción de tu turnoo!!");
          }
          else if (data.detail === "Error: No tienes los recursos suficientes para comprar la carta de desarrollo") {
            toast.error("No tienes recursos suficientes :(");
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function GetNumCartas() {
    console.log(params.lobby);
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/game_phases/get_player_state?lobby_id=${params.lobby}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${params.token}`,
        },
      }
    )
      .then((res) => {
        res.json().then((data) => {
          console.log("----Informacion del usuario----");
          console.log(data);
          // aqui se toman los números de las cartas que tenemos
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

  function UsarMonopolio(resource) {
    console.log(params.lobby);
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/game_phases/use_monopoly_progress_card?lobby_id=${params.lobby}&resource=${resource}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${params.token}`,
        },
      }
    )
      .then((res) => {
        res.json().then((data) => {
          console.log("----Informacion del usuario----");
          console.log(data);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function UsarDescubrimiento() {
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}//game_phases/use_invention_card?lobby_id=${params.lobby}&resource1=${selectedResources[0]}&resource2=${selectedResources[1]}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${params.token}`,
        },
      }
    )
      .then((res) => {
        setSelectedResources([]);
        res.json().then((data) => {
          console.log("----Informacion del usuario----");
          console.log(data);
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
          //position: "relative",
          width: "150px",
          height: "150px",
          //left: "1650px",
          //top: "300px",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <img
          src="http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-oculta.png"
          alt="Imagen"
          style={{ width: "100%", height: "100%" }}
        />
        {/* <div
          style={{
            //position: "absolute",
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
        </div> */}
      </div>
      {showPopup && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleBackgroundClick}
        >
          <div
            className="relative bg-gray-400 rounded-lg p-4 inline-flex flex-col items-center h-4/5 "
            style={{
              minHeight: "800px",
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
              <div className="p-2 relative" style={{ cursor: "pointer" }}>
                <button
                  className=" mt-4 px-4 py-2 rounded-lg text-white w-full h-auto"
                  onClick={ComprarCartaDesarrollo}
                >
                  <h1 className="text-lg text-white absolute top-8 left-12 w-full h-full flex">
                    COMPRAR CARTA
                  </h1>
                  <img src="http://localhost:3000/cartas-desarrollo/comprar-cartas-desarrollo.png"></img>
                </button>
              </div>
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
                          onClick={UsarMonopolio(recurso.text)}
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
            {showResourceSelection2 && (
              <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="relative bg-gray-400 rounded-lg p-4 inline-flex flex-col items-center">
                  <h1 className="text-3xl font-bold">
                    Elige dos recursos para robar
                  </h1>
                  <div className="flex gap-4 mt-4">
                    {recursos.map((recurso, index) => (
                      <div
                        key={index}
                        className="p-2 relative flex flex-col items-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleResourceSelection(recurso.text)}
                      >
                        <img
                          src={recurso.src}
                          alt={recurso.text}
                          className="w-20 h-auto"
                          style={{ borderRadius: "15%" }}
                        />
                        <div className="bg-white border border-black rounded mt-2 p-2">
                          <span
                            className={`text-black ${selectedResources.includes(recurso.text)
                              ? "text-green-500"
                              : ""
                              }`}
                          >
                            {recurso.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedResources.length === 2 && (
                    <button
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleResourceSelectionClose()}
                    >
                      Usar
                    </button>
                  )}
                </div>
              </div>
            )}
            {params.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpCartasDesarrollo;
