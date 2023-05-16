import React, { useState, useEffect } from "react";

const PopUpOferta = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [arcilla, setMiArcilla] = useState(0);
  const [roca, setMiRoca] = useState(0);
  const [oveja, setMiOveja] = useState(0);
  const [trigo, setMiTrigo] = useState(0);
  const [madera, setMiMadera] = useState(0);

  // lista para el map
  const items = [
    { src: "ovejas.png", alt: "oveja", value: oveja },
    { src: "madera.png", alt: "troncos", value: madera },
    { src: "trigo.png", alt: "cebada", value: trigo },
    { src: "roca.png", alt: "piedras", value: roca },
    { src: "arcilla.png", alt: "arcilla", value: arcilla },
  ];

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
      setShouldShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [shouldShowPopup]);

  useEffect(() => {
    if (props.show) {
      setShowPopup(true);
      setShouldShowPopup(true);
      setMiArcilla(props.jugador_datos.hand.clay);
      setMiRoca(props.jugador_datos.hand.rock);
      setMiOveja(props.jugador_datos.hand.sheep);
      setMiTrigo(props.jugador_datos.hand.wheat);
      setMiMadera(props.jugador_datos.hand.wood);
      console.log(props.oferta);
    } else {
      setShowPopup(false);
    }
  }, [props.show]);

  return (
    <>
      {showPopup && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleBackgroundClick}
        >
          <div
            className="relative bg-gray-400 rounded-lg p-4 inline-flex flex-col items-center h-4/5 "
            style={{ minHeight: "640px", minWidth: "1290px" }}
          >
            <h1 className="text-3xl mt-2">OFERTA DE {props.oferta.sender}</h1>
            

            <div
              className="absolute inset-y-0 left-0 w-1/4 bg-gray-900 mt-5 ml-7 rounded-lg"
              style={{ maxHeight: "745px", maxWidth: "200px" }}
            >
              {items.map((resource, index) => (
                <div
                  className="flex items-center"
                  style={{ marginTop: "70px", marginLeft: "45px" }}
                  key={index}
                >
                  <div className="mr-2">
                    <img
                      src={`${process.env.REACT_APP_URL_FRONTED}/recursos/${resource.src}`}
                      alt={resource.alt}
                      style={{ width: "65px", height: "65px" }}
                    />
                  </div>
                  <h1 className="text-4xl text-white ml-2">{resource.value}</h1>
                </div>
              ))}
            </div>

            <div
              class="w-1/2 h-20 bg-gray-800 rounded-lg flex flex-col"
              style={{
                marginTop: "40px",
                marginLeft: "150px",
                width: "900px",
                height: "450px",
              }}
            >
              <h1 className="text-4xl text-white ml-5 mb-4 mt-5">
                Recursos que damos:
              </h1>

              <div class="flex">
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/oveja.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">{props.oferta.resource2[2]}</h1>
                </div>
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/troncos.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">{props.oferta.resource2[1]}</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/cebada.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">{props.oferta.resource2[4]}</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/piedras.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">{props.oferta.resource2[3]}</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/arcilla.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">{props.oferta.resource2[0]}</h1>
                </div>
              </div>

              <h1 className="text-4xl text-white ml-5 mb-4 mt-5">
                Recursos que dan:
              </h1>

              <div class="flex">
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/oveja.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">{props.oferta.resource1[2]}</h1>
                </div>
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/troncos.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">{props.oferta.resource1[1]}</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/cebada.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">{props.oferta.resource1[4]}</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/piedras.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">{props.oferta.resource1[3]}</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/arcilla.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">{props.oferta.resource1[0]}</h1>
                </div>
              </div>
            </div>

            <div class=" mt-20">
              <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                style={{ fontSize: "30px", marginLeft: "10px" }}
                onClick={() => {
                  // Ejemplo url:
                  // http://localhost:8000/game_phases/reject_trade?lobby_id=1234&player2_id=1234
                  const url_rechazar_intercambio =
                    `${process.env.REACT_APP_URL_BACKEND}/game_phases/reject_trade?lobby_id=${props.lobby}&player2_id=${props.oferta.sender}`;

                  // Petición get para rechazar el intercambio
                  fetch(url_rechazar_intercambio, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization: `Bearer ${props.token}`,
                    },
                  }).then((res_2) => {
                    res_2
                      .json()
                      .then((data) => {
                        console.log("datos del rechazar:", data);
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                      });
                  });
                }
                }
              >
                Rechazar
              </button>
              <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                style={{ fontSize: "30px", marginLeft: "20px" }}
                onClick={() => {
                  // Ejemplo url:
                  // http://localhost:8000/game_phases/accept_trade?lobby_id=1234&player2_id=1234

                  const url_aceptar_intercambio =
                    `${process.env.REACT_APP_URL_BACKEND}/game_phases/accept_trade?lobby_id=` +
                    props.lobby +
                    "&player2_id=" +
                    props.oferta.sender;
                  
                  // Petición get para aceptar el intercambio
                  fetch(url_aceptar_intercambio, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization: `Bearer ${props.token}`,
                    },
                  }).then((res_2) => {
                    res_2
                      .json()
                      .then((data) => {
                        console.log("datos del aceptar", data);
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                      });
                  }
                  );

                }}
              >
                Aceptar
              </button>
            </div>

            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpOferta;
