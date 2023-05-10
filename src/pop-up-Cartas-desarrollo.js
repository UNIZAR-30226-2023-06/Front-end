import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { useNavigate } from "react-router-dom";

// 1-- Importamos useCookies y jwt_decode
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

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

  // Dinero del jugador
  const [dinero, set_dinero] = React.useState(null);

  const [fotos_perfil_compradas, set_fotos_perfil_compradas] = React.useState(
    []
  );

  const fotos_perfil = [
    "skin1",
    "skin2",
    "skin3",
    "skin4",
    "skin5",
    "skin6",
    "skin7",
    "skin8",
    "skin9",
    "skin10",
    "skin11",
    "skin12",
    "skin13",
    "skin14",
  ];

  // 2-- Creamos la estructura de las cookies
  const [cookies] = useCookies(["token"]);

  // 3-- Obtenemos el token de las cookies
  const Token = cookies.token;

  // 4-- Obtenemos la información del token
  const json_token = jwt_decode(Token);

  // Función para acceder a la historia de navegación
  const navigate = useNavigate();

  // Función para volver a la página anterior
  const handleBack = () => {
    navigate(-1);
  };

  const handleDragStart = (e) => e.preventDefault();

  const precio_foto_perfil = "10 $";

  const precio_foto_perfil_int = 10;

  const responsive = {
    0: { items: 1 },
    1: { items: 2 },
    2: { items: 3 },
    3: { items: 4 },
    4: { items: 5 },
    5: { items: 6 },
  };

  const [compra_realizada, set_compra_realizada] = React.useState(false);

  ////////////////////////////////////////////////////////////////////////////
  /////////////////////// FETCHS INICIALES NECESARIOS ////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    // 5-- Hacemos el fetch para obtener la información del usuario
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/get-user-from-id/${parseInt(
        json_token.id
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Token}`,
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        set_dinero(data.coins);
      });
    });

    // Fetch para obtener qué skins tiene compradas el usuario
    fetch(`${process.env.REACT_APP_URL_BACKEND}/list-piece-skins`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${Token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log("Skins compradas:");
        console.log(data);
        set_fotos_perfil_compradas(data.piece_skins);
      });
    });
  }, []);

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// FUNCIONES /////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  function comprar(precio, nombre_producto) {
    const url_1 = `${process.env.REACT_APP_URL_BACKEND}/buy_piece_skin?piece_skin_name=${nombre_producto}`;

    fetch(url_1, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${Token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log("Respuesta del servidor:");
        console.log(data);

        if (data.detail === "Piece skin bought successfully") {
          set_dinero(dinero - precio);

          set_fotos_perfil_compradas([
            ...fotos_perfil_compradas,
            nombre_producto,
          ]);
        }
      });
    });
  }

  ////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// COMPONENTES ////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  // CARRUSEL DE FOTOS DE PERFIL
  const items_fotos_perfil = fotos_perfil.map((foto, i) => (
    <div className="slide_tienda">
      {
        <Popup
          trigger={
            fotos_perfil_compradas.includes("skin" + (i + 1)) ? (
              <div>
                <img
                  src={
                    "http://localhost:3000/fotos_perfil/skin" + (i + 1) + ".png"
                  }
                  onDragStart={handleDragStart}
                  role="presentation"
                  className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                />

                <img
                  src="http://localhost:3000/fotos_perfil/comprado.png"
                  onDragStart={handleDragStart}
                  role="presentation"
                  className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 19,
                    zIndex: 9999,
                  }}
                />
              </div>
            ) : (
              <img
                src={
                  "http://localhost:3000/fotos_perfil/skin" + (i + 1) + ".png"
                }
                onDragStart={handleDragStart}
                role="presentation"
                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"
              />
            )
          }
          modal
          nested
          arrow={false}
          contentStyle={{
            width: "30%",
            height: "40%",

            border: "5px solid black",
            borderRadius: "10px",
          }}
        >
          {(close) => (
            <div className="modal_tienda">
              {/* Botón para cerrar el pop-up */}
              <button className="close" onClick={close}>
                &times;
              </button>
              {/* Imagen del objeto */}
              <img
                src={
                  "http://localhost:3000/fotos_perfil/skin" + (i + 1) + ".png"
                }
                onDragStart={handleDragStart}
                role="presentation"
                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"
              />
              {/* Texto de "¿Estás seguro?" en el centro */}
              <div className="text-center">
                <br />
                <br />
                <div>
                  {fotos_perfil_compradas.includes("skin" + (i + 1)) ? (
                    <img
                      src={"http://localhost:3000/green_check.png"}
                      alt="Icono"
                      className="icono_tienda"
                    />
                  ) : (
                    <div>
                      {dinero >= precio_foto_perfil_int ? (
                        <p className="text-2xl font-bold">
                          ¿Deseas usar esta carta?
                        </p>
                      ) : (
                        <img
                          src={"http://localhost:3000/red_cross.png"}
                          alt="Icono"
                          className="icono_tienda"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Boton de comprar */}
              <br /> <br />
              <div className="flex justify-center">
                {fotos_perfil_compradas.includes("skin" + (i + 1)) ? (
                  // Texto verde de "compra realizada", en
                  // tamaño de letra mediano y centrado
                  <p className="compra_realizada_tienda">Compra realizada</p>
                ) : (
                  <div>
                    <button
                      className="boton_comprar_tienda"
                      onClick={() => {
                        comprar(10, "skin" + (i + 1));
                        set_compra_realizada(true);
                      }}
                    >
                      Usar carta
                      <br />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Popup>
      }
    </div>
  ));


  return (
    <>
      <div
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
          left: "1650px",
          top:"300px",
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
<div style={{ display: "flex", justifyContent: "center" }}>
  <div style={{ display: "flex", flexWrap: "wrap", width: "500px" }}>
    {[1, 2, 3, 4, 5].map((number) => (
      <div
        key={number}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <img
          src={`http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-${number}.png`}
          alt={`Imagen ${number}`}
          style={{ width: "150px", height: "190px", borderRadius: "20px" }}

        />
        <div
          style={{
            background: "white",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <span>{number}</span>
        </div>
      </div>
    ))}
  </div>
  <div style={{ display: "flex", flexWrap: "wrap", width: "500px" }}>
    {[6, 7, 8, 9].map((number) => (
      <div
        key={number}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <img
          src={`http://localhost:3000/cartas-desarrollo/carta-de-desarrollo-${number}.png`}
          alt={`Imagen ${number}`}
          style={{ width: "150px", height: "150px", borderRadius: "20px" }}
        />
        <div
          style={{
            background: "white",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5px",
            
          }}
        >
          <span>{number}</span>
        </div>
      </div>
    ))}
  </div>
</div>


            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpCartasDesarrollo;
