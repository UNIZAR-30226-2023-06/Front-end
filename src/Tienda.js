import React from "react";
import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
export default function Tienda() {
  /* --------------------------- variables --------------------------- */

  const [desplegado, setDesplegado] = useState(true);
  const styleSidebarOn =
    "transition-all duration-900 w-80 h-full opacity-95 p-5 pt-8 border border-solid border-cyan-900 sidebar_PrivateHome";
  const styleSidebarOff = "hidden transition-all duration-900";
  const styleMenuOn =
    "transition-all duration-900 absolute top-0 left-0 w-10 h-10 object-cover";
  const styleMenuOff = "hidden transition-all duration-900";
  const styleCruzOn =
    "hover:cursor-pointer transition-all duration-900 absolute top-0 right-0 w-8 h-8 mr-2 mt-2 object-cover";
  const styleCruzOff = "transition-all duration-900 hidden";
  const styleLinks = "gap-3 mt-2 ml-1 flex flex-grow relative ";
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const [dinero, set_dinero] = React.useState(null);
  const [nombre, set_nombre] = React.useState(null);
  const [codigo, set_codigo] = React.useState(null);
  const [imagen, set_imagen] = React.useState(null);
  const [nummensajes, set_nummensajes] = React.useState(null);
  const [elo, set_elo] = React.useState(null);

  const [precio_foto, set_precioFoto] = React.useState([]);
  const [precio_tablero, set_precioTablero] = React.useState([]);
  const [precio_fichas, set_precioFichas] = React.useState([]);

  const [RespuestaFotoPerfil, set_RespuestaFotoPerfil] = React.useState(null);
  const [RespuestaSkins, set_RespuestaSkins] = React.useState(null);
  const [RespuestaFichas, set_RespuestaFichas] = React.useState(null);

  const [PreciosObtenidosFotos, set_PreciosObtenidosFotos] =
    React.useState(false);
  const [PreciosObtenidosSkins, set_PreciosObtenidosSkins] =
    React.useState(false);
  const [PreciosObtenidosFichas, set_PreciosObtenidosFichas] =
    React.useState(false);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleDragStart = (e) => e.preventDefault();

  const [cookies, setCookie] = useCookies(["token"]); // Agregamos removeCookie
  // Dinero del jugador

  const [fotos_perfil_compradas, set_fotos_perfil_compradas] = React.useState(
    []
  );

  const [skins_compradas, set_skins_compradas] = React.useState([]);

  const [fichas_compradas, set_fichas_compradas] = React.useState([]);

  const fotos_perfil = [
    "skin0",
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
  ];

  const skins_mar = ["skin0", "skin1", "skin2", "skin3"];

  const fichas = ["skin0", "skin1", "skin2", "skin3"];

  /* --------------------------- calculamos el tamaño de la ventana --------------------------- */

  const precio_foto_perfil_int = 10;

  const responsive = {
    0: { items: 1 },
    1: { items: 2 },
    2: { items: 3 },
    3: { items: 4 },
    4: { items: 5 },
    5: { items: 6 },
  };

  const responsive_fotos_fichas = {
    6: { items: 1 },
    7: { items: 2 },
    8: { items: 3 },
    9: { items: 4 },
    10: { items: 5 },
    11: { items: 6 },
  };

  const [compra_realizada, set_compra_realizada] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenSize(newScreenWidth);
      if (newScreenWidth < 720) {
        setDesplegado(false);
      } else {
        setDesplegado(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  /* --------------------------- seguridad  --------------------------- */

  // en caso de que no estemos logueados ve a la página de login
  useEffect(() => {
    if (cookies.token === "") {
      navigate("/login");
    }
  }, [cookies.token, navigate]);

  /* --------------------------- cookies  --------------------------- */

  // cargamos los datos de los usuarios y hacemos decode del token
  const Token = cookies.token;
  const json_token = jwt_decode(Token);
  // console.log(json_token);

  /* --------------------------- obtener datos usuario  --------------------------- */

  useEffect(() => {
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
    )
      .then((res) => {
        res.json().then((data) => {
          // Actualizamos el estado de cosas
          console.log(json_token.id);

          const img =
            data.profile_picture === "default"
              ? `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/skin1.png`
              : `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/${data.profile_picture}.png`;

          set_dinero(data.coins);
          set_codigo(data.id);
          set_nombre(data.username);
          set_imagen(img);
          set_elo(data.elo);
          console.log(img);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Fetch para obtener qué fotos de perfil tiene compradas el usuario
    fetch(`${process.env.REACT_APP_URL_BACKEND}/list-profile-pictures`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${Token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log("Skins compradas:");
        console.log(data);
        set_fotos_perfil_compradas(data.profile_pictures);
      });
    });

        // Fetch para obtener qué skins del tablero tiene compradas el usuario
        fetch(`${process.env.REACT_APP_URL_BACKEND}/list-board-skins`, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${Token}`,
          },
        }).then((res) => {
          res.json().then((data) => {
            console.log("Skins compradas:");
            console.log(data);
            set_skins_compradas(data.board_skins);
          });
        });

            // Fetch para obtener qué fichas tiene compradas el usuario
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
        set_fichas_compradas(data.piece_skins);
      });
    });
  }, [json_token.id]);

  /* --------------------------- miramos si hay mensajes pendientes --------------------------- */

  fetch(`${process.env.REACT_APP_URL_BACKEND}/get_friend_requests`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      response.json().then((data) => {
        //console.log(data.number_of_requests);
        set_nummensajes(data.number_of_requests);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// FUNCIONES /////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  function comprarFotoPerfil(precio, nombre_producto) {
    const url_1 = `${process.env.REACT_APP_URL_BACKEND}/buy_profile_picture?profile_picture_name=${nombre_producto}`;

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
        set_RespuestaFotoPerfil(data.detail);
        if (RespuestaFotoPerfil == "User already has this profile picture") {
          toast.error("Ya tienes esta foto de perfil comprada");
        } else if (data.detail === "Profile picture bought successfully") {
          set_dinero(dinero - precio);
          toast.success("Foto de perfil comprada");
          set_fotos_perfil_compradas([
            ...fotos_perfil_compradas,
            nombre_producto,
          ]);
        }
      });
    });
  }

  function comprar_skin(precio, nombre_producto) {
    const url_1 = `${process.env.REACT_APP_URL_BACKEND}/buy_board_skin?board_skin_name=${nombre_producto}`;

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
        set_RespuestaSkins(data.detail);
        console.log(RespuestaSkins);
        if (RespuestaSkins == "User already has this board skin") {
          toast.error("Ya tienes esta skin comprada");
        } else if (data.detail === "Board skin bought successfully") {
          set_dinero(dinero - precio);
          toast.success("Skin del trablero comprada");

          set_skins_compradas([...skins_compradas, nombre_producto]);
        }
      });
    });
  }

  function comprar_fichas(precio, nombre_producto) {
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
        set_RespuestaFichas(data.detail);
        console.log(RespuestaFichas);
        if (data.detail == "User already has this piece skin") {
          toast.error("Ya tienes estas fichas compradas");
        } else if (data.detail === "Piece skin bought successfully") {
          set_dinero(dinero - precio);
          toast.success("Fichas compradas");

          set_fichas_compradas([...fichas_compradas, nombre_producto]);
        }
      });
    });
  }

  function obtenerPrecio_fotos(nombre_producto, indice) {
    const url_1 = `${process.env.REACT_APP_URL_BACKEND}/get-profile-picture?profile_picture_name=${nombre_producto}`;
    if (!PreciosObtenidosFotos) {
      fetch(url_1, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Token}`,
        },
      }).then((res) => {
        res.json().then((data) => {
          set_precioFoto((prevPrecios) => {
            const nuevosPrecios = [...prevPrecios]; // Copia el array existente
            nuevosPrecios[indice] = data.price; // Actualiza el valor en el índice especificado
            return nuevosPrecios; // Devuelve el nuevo array actualizado
          });
          set_PreciosObtenidosFotos(true);
          return precio_foto;
        });
      });
    }
  }
  function obtenerPrecio_skins(nombre_producto, indice) {
    const url_1 = `${process.env.REACT_APP_URL_BACKEND}/get-board-skin?board_skin_name=${nombre_producto}`;
    if (!PreciosObtenidosSkins) {
      fetch(url_1, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Token}`,
        },
      }).then((res) => {
        res.json().then((data) => {
          set_PreciosObtenidosSkins(true);
          set_precioTablero((prevPrecios) => {
            const nuevosPrecios = [...prevPrecios]; // Copia el array existente
            nuevosPrecios[indice] = data.price; // Actualiza el valor en el índice especificado
            return nuevosPrecios; // Devuelve el nuevo array actualizado
          });
          return precio_tablero;
        });
      });
    }
  }

  function obtenerPrecio_fichas(nombre_producto, indice) {
    const url_1 = `${process.env.REACT_APP_URL_BACKEND}/get-piece-skin?piece_skin_name=${nombre_producto}`;
    if (!PreciosObtenidosSkins) {
      fetch(url_1, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Token}`,
        },
      }).then((res) => {
        res.json().then((data) => {
          set_PreciosObtenidosFichas(true);
          set_precioFichas((prevPrecios) => {
            const nuevosPrecios = [...prevPrecios]; // Copia el array existente
            nuevosPrecios[indice] = data.price; // Actualiza el valor en el índice especificado
            return nuevosPrecios; // Devuelve el nuevo array actualizado
          });
          return precio_fichas;
        });
      });
    }
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
            fotos_perfil_compradas.includes("skin" + i) ? (
              <div>
                <img
                  src={`${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/skin` + i + ".png"}
                  onDragStart={handleDragStart}
                  role="presentation"
                  className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                />

                <img
                  src={`${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/comprado.png`}
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
                src={`${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/skin` + i + ".png"}
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
                src={`${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/skin` + i + ".png"}
                onDragStart={handleDragStart}
                role="presentation"
                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"
              />
              {/* Texto de "¿Estás seguro?" en el centro */}
              <div className="text-center">
                <br />
                <br />
                <div>
                  {fotos_perfil_compradas.includes("skin" + i) ? (
                    <img
                      src={`${process.env.REACT_APP_URL_FRONTED}/green_check.png`}
                      alt="Icono"
                      className="icono_tienda"
                    />
                  ) : (
                    <div>
                      {dinero >= precio_foto[i] ? (
                        <p className="text-2xl font-bold">¿Estás seguro?</p>
                      ) : (
                        <img
                          src={`${process.env.REACT_APP_URL_FRONTED}/red_cross.png`}
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
                {fotos_perfil_compradas.includes("skin" + i) ? (
                  // Texto verde de "compra realizada", en
                  // tamaño de letra mediano y centrado
                  <p className="compra_realizada_tienda">Compra realizada</p>
                ) : (
                  <div>
                    {dinero >= precio_foto[i] ? (
                      <button
                        style={{
                          width: "40%",
                          height: "100px",
                          backgroundColor: "#172135",
                          borderRadius: "30px",
                          right: "165px",
                          textAlign: "center",

                          /* Cosas sobre el texto */
                          color: "white",
                          fontSize: "20px",
                          display: "flex",
                          alignItems: "center",
                          padding: "5%",

                          position: "absolute",

                          textDecoration: "none",
                          overflow: "hidden",
                        }}
                        onClick={() => {
                          comprarFotoPerfil(10, "skin" + i);
                          set_compra_realizada(true);
                        }}
                      >
                        Confirmar compra:
                        <br />
                        {obtenerPrecio_fotos("skin" + i, i)}
                        {precio_foto[i] !== undefined &&
                          `${precio_foto[i]} $`}{" "}
                      </button>
                    ) : (
                      <p className="saldo_insuficiente_tienda">
                        Saldo insuficiente
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </Popup>
      }

      {/* Precio del objeto */}

      {obtenerPrecio_fotos("skin" + i, i)}
      {precio_foto[i] !== undefined && `${precio_foto[i]} $`}
    </div>
  ));

  const items_skins_mar = skins_mar.map((foto, i) => (
    <div className="slide_tienda">
      {
        <Popup
          trigger={
            skins_compradas.includes("skin" + i) ? (
              <div>
                <img
                  src={`${process.env.REACT_APP_URL_FRONTED}/skin_mar/skin` + i + ".png"}
                  onDragStart={handleDragStart}
                  role="presentation"
                  className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                />

                <img
                  src={`${process.env.REACT_APP_URL_FRONTED}/skin_mar/comprado.png`}
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
                src={`${process.env.REACT_APP_URL_FRONTED}/skin_mar/skin` + i + ".png"}
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
                src={`${process.env.REACT_APP_URL_FRONTED}/skin_mar/skin` + i + ".png"}
                onDragStart={handleDragStart}
                role="presentation"
                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"
              />
              {/* Texto de "¿Estás seguro?" en el centro */}
              <div className="text-center">
                <br />
                <br />
                <div>
                  {skins_compradas.includes("skin" + i) ? (
                    <img
                      src={`${process.env.REACT_APP_URL_FRONTED}/green_check.png`}
                      alt="Icono"
                      className="icono_tienda"
                    />
                  ) : (
                    <div>
                      {dinero >= precio_tablero[i] ? (
                        <p className="text-2xl font-bold">¿Estás seguro?</p>
                      ) : (
                        <img
                          src={`${process.env.REACT_APP_URL_FRONTED}/red_cross.png`}
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
                {skins_compradas.includes("skin" + i) ? (
                  // Texto verde de "compra realizada", en
                  // tamaño de letra mediano y centrado
                  <p className="compra_realizada_tienda">Compra realizada</p>
                ) : (
                  <div>
                    {dinero >= precio_tablero[i] ? (
                      <button
                        style={{
                          width: "40%",
                          height: "100px",
                          backgroundColor: "#172135",
                          borderRadius: "30px",
                          right: "165px",
                          textAlign: "center",

                          /* Cosas sobre el texto */
                          color: "white",
                          fontSize: "20px",
                          display: "flex",
                          alignItems: "center",
                          padding: "5%",

                          position: "absolute",

                          textDecoration: "none",
                          overflow: "hidden",
                        }}
                        onClick={() => {
                          comprar_skin(10, "skin" + i);
                          set_compra_realizada(true);
                        }}
                      >
                        Confirmar compra:
                        <br />
                        {obtenerPrecio_skins("skin" + i, i)}
                        {precio_tablero[i] !== undefined &&
                          `${precio_tablero[i]} $`}{" "}
                      </button>
                    ) : (
                      <p className="saldo_insuficiente_tienda">
                        Saldo insuficiente
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </Popup>
      }
      {/* Precio del objeto */}
      {obtenerPrecio_skins("skin" + i, i)}
      {precio_tablero[i] !== undefined && `${precio_tablero[i]} $`}{" "}
    </div>
  ));

  const items_fichas = fichas.map((foto, i) => (
    <div className="slide_tienda">
      {
        <Popup
          trigger={
            fichas_compradas.includes("skin" + i) ? (
              <div>
                <img
                  src={
                    `${process.env.REACT_APP_URL_FRONTED}/fotos-tienda-urbanizacion/skin` +
                    i +
                    ".png"
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
                  src={`${process.env.REACT_APP_URL_FRONTED}/fotos-tienda-urbanizacion/comprado.png`}
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
                  `${process.env.REACT_APP_URL_FRONTED}/fotos-tienda-urbanizacion/skin` +
                  i +
                  ".png"
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
                  `${process.env.REACT_APP_URL_FRONTED}/fotos-tienda-urbanizacion/skin` +
                  i +
                  ".png"
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
                  {fichas_compradas.includes("skin" + i) ? (
                    <img
                      src={`${process.env.REACT_APP_URL_FRONTED}/green_check.png`}
                      alt="Icono"
                      className="icono_tienda"
                    />
                  ) : (
                    <div>
                      {dinero >= precio_fichas[i] ? (
                        <p className="text-2xl font-bold">¿Estás seguro?</p>
                      ) : (
                        <img
                          src={`${process.env.REACT_APP_URL_FRONTED}/red_cross.png`}
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
                {fichas_compradas.includes("skin" + i) ? (
                  // Texto verde de "compra realizada", en
                  // tamaño de letra mediano y centrado
                  <p className="compra_realizada_tienda">Compra realizada</p>
                ) : (
                  <div>
                    {dinero >= precio_fichas[i] ? (
                      <button
                        style={{
                          width: "40%",
                          height: "100px",
                          backgroundColor: "#172135",
                          borderRadius: "30px",
                          right: "165px",
                          textAlign: "center",

                          /* Cosas sobre el texto */
                          color: "white",
                          fontSize: "20px",
                          display: "flex",
                          alignItems: "center",
                          padding: "5%",

                          position: "absolute",

                          textDecoration: "none",
                          overflow: "hidden",
                        }}
                        onClick={() => {
                          comprar_fichas(10, "skin" + i);
                          set_compra_realizada(true);
                        }}
                      >
                        Confirmar compra:
                        <br />
                        {obtenerPrecio_fichas("skin" + i, i)}
                        {precio_fichas[i] !== undefined &&
                          `${precio_fichas[i]} $`}{" "}
                      </button>
                    ) : (
                      <p className="saldo_insuficiente_tienda">
                        Saldo insuficiente
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </Popup>
      }
      {/* Precio del objeto */}
      {obtenerPrecio_fichas("skin" + i, i)}
      {precio_fichas[i] !== undefined && `${precio_fichas[i]} $`}{" "}
    </div>
  ));

  function TextComponent(props) {
    return <a className="dinero_tienda">{props.dinero}</a>;
  }

  return (
    /* --------------------------- fondo de las montañas --------------------------- */
    <div className="w-full h-full flex imagenCustomPrivateHome">
      {/* --------------------------- menu --------------------------- */}
      <div
        className={`over_SideBaar relative h-full ${
          // si la ventana es pequeña o desplegado falso que no se vea
          screenSize < 720 && !desplegado ? styleSidebarOff : styleSidebarOn
        }`}
      >
        {/* --------------------------- cruz de cerrar menu --------------------------- */}
        <img
          src={`${process.env.REACT_APP_URL_FRONTED}/white_cross.png`}
          alt="imagen para cerrar la sidebar"
          className={`hover:cursor-pointer ${
            screenSize < 720 && desplegado ? styleCruzOn : styleCruzOff
          }`}
          onClick={() => {
            setDesplegado(false);
          }}
        />

        {/* --------------------------- datos del usuario --------------------------- */}

        <div className="relative block gap-x-4 mx-auto">
          {/* --------------------------- foto del avatar --------------------------- */}
          <img
            alt="profil"
            src={imagen}
            className={`mx-auto object-cover rounded-full h-28 w-28 mt-9 bg-teal-200`}
          />
          {/* --------------------------- nombre del usuario --------------------------- */}

          <h1
            className={`text-white origin-center content-center font-medium text-xl mt-2`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {nombre}#{codigo}
          </h1>
          <h1
            className={`text-white origin-center content-center font-medium text-lg mt-2`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            ELO: {elo} ⚔
          </h1>
          {/* --------------------------- dinero --------------------------- */}
          <h1
            className={`text-white origin-center content-center font-medium text-lg mt-1`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {dinero}

            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/white_dinero.png`}
              className={`w-6 h-6 ml-2`}
            />
          </h1>
        </div>
        <ul className="flex flex-col w-full items-start py-6 px-4 gap-2">
          {/* --------------------------- volver al home --------------------------- */}
          <a href={`${process.env.REACT_APP_URL_FRONTED}/home`} className={styleLinks}>
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/home.png`}
              className={`object-cover h-7 w-7`}
            />

            <h1
              href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Inicio
            </h1>
          </a>
          {/* --------------------------- editar perfil --------------------------- */}
          <a href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`} className={styleLinks}>
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/editProfile.png`}
              className={`object-cover h-7 w-7`}
            />

            <h1
              href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Editar perfil
            </h1>
          </a>
          {/* --------------------------- amigos ---------------------------*/}
          <a href={`${process.env.REACT_APP_URL_FRONTED}/amigosT`} className={styleLinks}>
            {/* imagen amigos*/}
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/friends.png`}
              className={`object-cover h-7 w-7}`}
            />
            {nummensajes > 0 && (
              <>
                <div
                  className="absolute top-0 right-0 transform translate-x-14 -translate-y-1/4 h-4 w-4 bg-red-800 text-white text-xs flex items-center justify-center rounded-full"
                  style={{ left: "50%" }}
                >
                  {nummensajes}
                </div>
              </>
            )}
            <h1
              href="/login"
              variant={Link}
              className={`text-white font-medium text-xl duration-300`}
            >
              Amigos
            </h1>
          </a>
          {/* --------------------------- tienda --------------------------- */}
          <a href={`${process.env.REACT_APP_URL_FRONTED}/tienda`} className={styleLinks}>
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/shopping-cart.png`}
              className={`object-cover h-7 w-7`}
            />

            <h1
              href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Tienda
            </h1>
          </a>
          {/* --------------------------- Instrucciones --------------------------- */}
          <a href={`${process.env.REACT_APP_URL_FRONTED}/Instrucciones`} className={styleLinks}>
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/libro-abierto.png`}
              className={`object-cover h-7 w-7`}
            />

            <h1
              href={`${process.env.REACT_APP_URL_FRONTED}/Instrucciones`}
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Instrucciones
            </h1>
          </a>
          {/* --------------------------- logout --------------------------- */}

          <div
            className={`hover:cursor-pointer ${styleLinks}`}
            onClick={() => {
              // "borramos" las cookies
              setCookie("token", "", { path: "/" });
              window.location.href=`${process.env.REACT_APP_URL_FRONTED}`;
            }}
          >
            {/* imagen log out*/}
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/logout.png`}
              className={`object-cover h-7 w-7`}
            />

            <h1
              href="/login"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Cerrar sesión
            </h1>
          </div>
          {/* --------------------------- añadir amigos --------------------------- */}

          <form
            className={`flex bottom-0 left-0 mt-72`}
            // `bottom-0 left-0 p-4 w-auto fixed`
            // "absolute left-0 w-full bg-gray-200 p-4">

            onSubmit={(e) => {
              e.preventDefault(); // Agregar esto para evitar que la página se recargue
              fetch(
                `${process.env.REACT_APP_URL_BACKEND}/send_friend_request?friend_id=${e.target.amigo_id.value}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${Token}`,
                  },
                }
              )
                .then((res) => {
                  res.json().then((data) => {
                    if (data.detail === `Friend request already exists`) {
                      toast.error(
                        "este usuario ya tiene una solicitud tuya pendiente"
                      );
                    } else if (data.detail === `User not found`) {
                      toast.error("usuario no encontrado");
                      toast("si quieres enviar una solicitud pon solo el id", {
                        ico: `😉`,
                      });
                    } else if (data.detail === `Friend request sent`) {
                      toast.success("solicitud enviada con éxito");
                    }
                  });
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            <input
              id="amigo_id"
              className={`w-48 p-2 mr-2 border border-transparent border-b-white focus:border focus:border-white bg-transparent text-white`}
              type="text"
              placeholder="Añadir amigo: 2345"
            />
            <button className="px-4 py-2 rounded-full bg-cyan-900 hover:bg-slate-900 text-white w-12 h-10">
              <img
                src={`${process.env.REACT_APP_URL_FRONTED}/add-friend.png`}
                alt="boton de añadir amigos"
              />
            </button>
          </form>
        </ul>
      </div>
      {/* --------------------------- menu plegado --------------------------- */}
      <img
        src={`${process.env.REACT_APP_URL_FRONTED}/menu.png`}
        alt="menu desplegable, clicka aqui para desplegarlo"
        className={`hover:cursor-pointer w-8 h-8 m-4 ${
          screenSize < 720 && !desplegado ? styleMenuOn : styleMenuOff
        }`}
        onClick={() => {
          setDesplegado(true);
        }}
      />
      {/* --------------------------- botones centrales ---------------------------*/}
      <h1 className="m-14">
        <div
          className="bg-cyan-900/60 rounded-lg p-4 inline-flex flex-col items-center h-4/5"
          style={{ minHeight: "800px", minWidth: "1290px" }}
        >
          {/* Flecha de retroceso */}
          <img
            src={`${process.env.REACT_APP_URL_FRONTED}/flecha_retroceso.png`}
            onClick={handleBack}
            alt="flecha_retroceso"
            style={{
              width: "80px",
              height: "80px",
              marginRight: "1100px",
              cursor: "pointer",
            }}
          />
          <div style={{ position: "relative", left: "750px", bottom: "120px" }}>
            <TextComponent dinero={dinero} />
          </div>

          <div className="flex items-center">
            {/* Icono y texto del dinero */}
            <img
              src={`${process.env.REACT_APP_URL_FRONTED}/dinero.png`}
              style={{
                width: "80px",
                height: "80px",
                margin: "50px",
                /* El icono está a la izquierda */
                position: "absolute",
                left: "1500px",
                bottom: " 770px"
              }}
              alt="icono_dinero"
            />
          </div>

          {/*************************** Sliders ****************************/}

          <div
            className="overflow-y-scroll opacity-95 bg-cyan-900 rounded-xl shadow-xl"
            style={{
              width: "1200px",
              height: "calc(100% - 200px)",
              overflow: "auto",
              position: "relative",
              margin: "20px",
            }}
          >
            <div style={{ marginTop: "50px" }}>
              {/* Titulo de "fotos de perfil" */}

              <a
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "20px",
                  position: "absolute",
                  textDecoration: "none",
                  overflow: "hidden",
                  top: "20px",
                  right: "900px",
                }}
              >
                Fotos de perfil
              </a>

              {/* Slider de fotos de perfil */}
              <AliceCarousel
                mouseTracking
                items={items_fotos_perfil}
                responsive={responsive}
                controlsStrategy="alternate"
              />
            </div>

            <div>
              {/* Titulo de "fotos de perfil" */}
              <a
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "20px",
                  position: "absolute",
                  textDecoration: "none",
                  overflow: "hidden",
                  top: "360px",
                  right: "1020px",
                }}
              >
                Skins
              </a>

              {/* Slider de fotos de perfil */}
              <AliceCarousel
                mouseTracking
                items={items_skins_mar}
                responsive={responsive}
                controlsStrategy="alternate"
              />
            </div>

            <div>
              {/* Titulo de "fotos de perfil" */}
              <a
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "20px",
                  position: "absolute",
                  textDecoration: "none",
                  overflow: "hidden",
                  top: "700px",
                  right: "1020px",
                }}
              >
                Fichas
              </a>

              {/* Slider de fotos de perfil */}
              <AliceCarousel
                mouseTracking
                items={items_fichas}
                responsive={responsive}
                controlsStrategy="alternate"
              />
            </div>
          </div>
        </div>
      </h1>
    </div>
  );
}
