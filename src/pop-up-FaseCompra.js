import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const PopUpFaseCompra = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [Detalle, set_detalle] = React.useState(null);
  const [wheat, setWheat] = React.useState(null);
  const [wood, setWood] = React.useState(null);
  const [sheep, setSheep] = React.useState(null);
  const [clay, setClay] = React.useState(null);
  const [rock, setRock] = React.useState(null);

  const handleClose = () => {
    setShouldShowPopup(false);
    props.onClose();
  };

  const handleOpen = () => {
    GetRecursos();
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

  function handleClick() {
    ComprarCartaDesarrolllo();
  }

  function  GetRecursos() {
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
          setWheat(data.hand.wheat);
          setWood(data.hand.wood);
          setClay(data.hand.clay);
          setRock(data.hand.rock);
          setSheep(data.hand.sheep);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleSetWheat = (newWheat) => {
    setWheat(newWheat);
    console.log(`Nuevo valor de dado1: ${newWheat}`);
  };

  function ComprarCartaDesarrolllo() {
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/game_phases/buy_development_card?lobby_id=${props.lobby}`,
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
          // Si el código es correcto, mostrar un mensaje de éxito en el toast
          console.log(data);
          if (
            Detalle ===
            "No se pueden construir edificios en esta fase del turno"
          ) {
            toast.error("No tienes los recursos suficientes");
          } else if (Detalle === null) {
            toast.error("Fallo interno del servidor");
          } else {
            toast.success("Carta de desarrollo comprada");
            console.log(Detalle);
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

        // Efecto que se activa cada vez que cambia dado1


  }

  return (
    <>
      {" "}
      <img
        src={`${process.env.REACT_APP_URL_FRONTED}/tabla-de-costes.png`}
        alt="Abrir Popup"
        className="cursor-pointer"
        onClick={handleOpen}
        style={{
          transform: "scale(0.15)",
          position: "fixed",
          right: "-500px",
          bottom: "-380px",
        }}
      />
      {showPopup && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleBackgroundClick}
        >
          <div
            className="relative bg-gray-400 rounded-lg p-4 inline-flex flex-col items-center h-4/5 "
            style={{ minHeight: "640px", width: "1000px" }}
          >
            <h1 className="text-3xl mt-2">FASE DE COMPRA Y CONSTRUCCION</h1>
            <img
              src={`${process.env.REACT_APP_URL_FRONTED}/white_cross.png`}
              alt="close"
              className="absolute top-0 right-0 cursor-pointer mt-3 mr-3"
              style={{ width: "50px", height: "50px" }}
              onClick={handleClose}
            />

            <div
              className="absolute inset-y-0 left-0 w-1/4 bg-gray-900 mt-5 ml-7 rounded-lg"
              style={{
                maxHeight: "745px",
                maxWidth: "200px",
                marginLeft: "20px",
              }}
            >
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/oveja.png`}
                    alt="oveja"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">{sheep}</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/troncos.png`}
                    alt="troncos"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">{wood}</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/cebada.png`}
                    alt="cebada"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">{wheat}</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/piedras.png`}
                    alt="piedras"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">{rock}</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/arcilla.png`}
                    alt="arcilla"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">{clay}</h1>
              </div>
            </div>
            <div>
              <div class="flex">
                <div
                  class="flex flex-col items-center"
                  style={{ marginBottom: "50px" }}
                >
                  <div class="rounded-lg overflow-hidden">
                    <img
                      src={`${process.env.REACT_APP_URL_FRONTED}/iconos-no-recursos/poblado.png`}
                      alt="Foto 1"
                      style={{ height: "150px", width: "150px" }}
                    />
                  </div>
                  <div class="mt-10">
                    <button
                      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                      style={{
                        fontSize: "20px",
                        marginLeft: "20px",
                        width: "125px",
                      }}
                    >
                      Comprar poblado
                    </button>
                  </div>
                </div>

                <div class="rounded-lg overflow-hidden ml-4">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/iconos-no-recursos/ciudad.png`}
                    alt="Foto 2"
                    style={{ height: "150px", width: "150px" }}
                  />
                  <div class="mt-10">
                    <button
                      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                      style={{
                        fontSize: "20px",
                        marginLeft: "20px",
                        width: "125px",
                      }}
                    >
                      Comprar ciudad
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/iconos-no-recursos/carretera.png`}
                    alt="Foto 3"
                    style={{ height: "150px", width: "150px" }}
                  />
                  <div class="mt-10">
                    <button
                      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                      style={{
                        fontSize: "20px",
                        marginLeft: "20px",
                        width: "125px",
                      }}
                    >
                      Comprar carretera
                    </button>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/iconos-no-recursos/carta-de-desarrollo.png`}
                    alt="Foto 4"
                    style={{
                      height: "150px",
                      width: "150px",
                      marginLeft: "40px",
                    }}
                  />

                  <div class="mt-10">
                    <button
                      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                      style={{
                        fontSize: "20px",
                        marginLeft: "20px",
                        width: "195px",
                      }}
                      onClick={handleClick}
                    >
                      Comprar cartas de desarrollo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {props.children}
          </div>
          <img
            src={`${process.env.REACT_APP_URL_FRONTED}/tabla-de-costes.png`}
            alt="Foto 4"
            style={{
              height: "600px",
              width: "500px",
              right: "200px",
              top: "200px",
              marginLeft: "20px",
            }}
          />
        </div>
      )}
    </>
  );
};

export default PopUpFaseCompra;
