import React from "react";
import jwt_decode from "jwt-decode";
import Popup from "reactjs-popup";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

export default function PrivateHome() {
  /* --------------------------- variables --------------------------- */

  const [desplegado, setDesplegado] = useState(true);
  // true = spinner | false = bboton de aceptar o rechazar partida
  const [spinner_aceptar, set_spinner_aceptar] = useState(true);
  const [buscandoPatida, set_buscandoPartida] = React.useState(false);
  const [partidaEmpezada, set_partidaEmpezada] = React.useState(false);
  const [meSaliYo, set_meSaliYo] = React.useState(false);

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const [dinero, set_dinero] = React.useState(null);
  const [nombre, set_nombre] = React.useState(null);
  const [codigo, set_codigo] = React.useState(null);
  const [imagen, set_imagen] = React.useState(null);
  const [lobby, set_lobby] = React.useState(null);
  const [lobbyPrivado, setLobbyPrivado] = React.useState(0);
  const [nummensajes, set_nummensajes] = React.useState(null);
  const [elo, set_elo] = React.useState(null);
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["token"]); // Agregamos removeCookie

  // comprobamos hasta que entremos en un lobby
  const {} = useQuery(
    ["get-lobby-from-player"],
    async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL_BACKEND}/get-lobby-from-player`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const data = await res.json();
      if (data.detail !== "Player not in any lobby") {
        // si entramos aqui es porque ya se ha encontrado un lobby asi que dejamos de comprobarlo
        set_buscandoPartida(false); // dejamos de consultar todo el tiempo al backend
        set_spinner_aceptar(false); // queremos que se muestren los botones
        set_lobby(data.id); // guardamos el lobby por si el usuario quiere rechazar la partida
        set_partidaEmpezada(true); // empezamos a comprobar el estado del lobby por si alguien rechaza partida antes de que la aceptemos
        console.log("tenemos lobby");
      } else {
        console.log(spinner_aceptar);
        console.log("estoy mirando si hay partida");
        console.log(data.detail);
        set_spinner_aceptar(true);
      }
      return data;
    },
    {
      refetchInterval: 1000,
      refetchUntil: (data) => data !== null,
      enabled: buscandoPatida,
    }
  );

  // ya tenemos lobby y le hemos dado ready a la partida, falta ver si nuestros compañeros
  // le han dado a ready también
  // si todos los jugadores le dan a ready entonces game_started = true
  // si de repente el lobby desaparece es porq alguien a rechazado la partida y tenemos que volver
  // a ponernos a la cola
  const {} = useQuery(
    //console.log("se esta ejecutando el segundo ")
    ["get-lobby-from-player"],
    async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL_BACKEND}/get-lobby-from-player`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      const data2 = await res.json();
      console.log(data2);
      if (data2.game_has_started) {
        // el juego ha empezado asi que vamos al tablero!
        window.location.href = `${process.env.REACT_APP_URL_FRONTED}/partida`;
        set_partidaEmpezada(false);
      } else if (data2.detail === "Player not in any lobby") {
        // alguien ha rechazado la partida
        // volvemos a la cola
        console.log("la partida ha sido rechazada");
        // queremos que se vuelva a poner el spinner
        set_spinner_aceptar(true);
        // y ponernos a la cola
        // ademas dejamos de ver si la partida ha comenzado
        set_partidaEmpezada(false);
        if (meSaliYo) {
          // yo he cancelado la partida después de darle a aceptar
          toast.error("partida rechazada");
        } else {
          // otro jugador ha cancelado la partida por ello nos ponemos a la cola para buscar un lobby
          toast.error("la partida ha sido rechazada por otro jugador");
          unirsePartida();
        }
      }
      return data2;
    },
    {
      refetchInterval: 1000,
      refetchUntil: (data) => data !== null,
      enabled: partidaEmpezada,
    }
  );

  // ¿Tenemos una partida en marcha?

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACKEND}/get-lobby-from-player`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        res.json().then((data) => {
          // Actualizamos el estado de cosas
          // --------------------------------------------------------------------------------------------------------------

          console.log(data.detail);
          if (data.detail !== "Player not in any lobby") {
            toast.custom((t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/skin14.png`}
                        alt=""
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {nombre}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        ¡Tienes una partida en marcha!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200">
                  <button
                    className="bg-cyan-900 hover:bg-cyan-950 w-24 h-12 mt-4 text-white font-bold rounded"
                    onClick={() => {
                      console.log("aqui ira la redirección");
                      navigate("/partida");
                    }}
                  >
                    Regresar a la partida
                  </button>
                </div>
              </div>
            ));
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  /* --------------------------- canimacion spinner --------------------------- */
  const Spinner = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="mt-8 animate-spin rounded-full h-24 w-24 border-t-8 border-b-4 border-gray-900"></div>
      </div>
    );
  };
  /* --------------------------- calculamos el tamaño de la ventana --------------------------- */

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
          const img =
            data.profile_picture === "default"
              ? `/fotos_perfil/skin1.png`
              : `/fotos_perfil/${data.profile_picture}.png`;

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
  }, [json_token.id]);

  /* --------------------------- buscamos partida --------------------------- */

  function cancelar_busqueda() {
    set_buscandoPartida(false);
    fetch(`${process.env.REACT_APP_URL_BACKEND}/leave-lobby`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        res.json().then((data) => {
          console.log("ya no estas en cola para buscar partida");
        });
      })
      .catch((error) => {
        if (error.response.status === 409) {
          console.log("Error 409: ya estas buscando una partida");
        } else {
          console.error("Error:", error);
        }
      });
  }

  function unirsePartida() {
    // lo ponemos a falso aqui para porque se ejecuta siempre pero es para cuando un juador rechace la partida
    set_meSaliYo(false);
    // 1- LLAMAMOS A SEARCH LOBBY para unirnos a la cola de busqueda de partidas
    fetch(`${process.env.REACT_APP_URL_BACKEND}/search-lobby`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }).catch((error) => {
      if (error.response.status === 409) {
        console.log("Error 409: ya estas buscando una partida");
      } else {
        console.error("Error:", error);
      }
    });

    // 2- LLAMAMOS A GET LOBBY FROM PLAYER CADA 1 SEGUNDO HASTA QUE NO NOS
    //    DEVUELVA NULL
    set_buscandoPartida(true);
  }

  // resumen: esta funcion ejecuta set-player-ready
  function onAceptarPartida() {
    fetch(`${process.env.REACT_APP_URL_BACKEND}/set-player-ready`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((response) => {
        toast.success("Esperando confirmación del resto de jugadores");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          console.log("Error 409: ya estas buscando una partida");
        } else {
          console.error("Error:", error);
        }
      });
    // damos permiso para comprobar si la partida se puede empezar
    console.log("vemos el estado de la partida");
  }

  function onRechazarPartida() {
    // lo que tenemos que hacer es borrar el lobby para que los demas jugadores
    // sepan que hemos rechazado la partida
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/delete-lobby?lobby_id=${lobby}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        set_meSaliYo(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // cerramos la pop-up (se hace en la parte de la pop-up que aqui no se puede))
    console.log("has llegado a tu destino ");
  }

  /* ----------------------------- gestion de unirse a una sala privada ------------------------- */
  function unirseSalaPrivada(e) {
    console.log(e);
    fetch(`${process.env.REACT_APP_URL_BACKEND}/join-lobby?lobby_id=${e}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        res.json().then((data) => {
          if ("Lobby joined" !== data.detail) {
            // error al entrar en el lobby 
            toast.error("No existe el lobby introducido");
          }  else if(true) {
              // hay que mirar no hay conflicto que si no se lia 
          }
          else {
            // ya estamos dentro del lobby 
            toast.success(`Código introducido: ${e}`);
            // decimos que estamos listos :)
            onAceptarPartida(); 
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          <a href={`/Instrucciones`} className={styleLinks}>
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
              window.location.href = `${process.env.REACT_APP_URL_FRONTED}`;
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

      <div
        className={`flex justify-center items-center flex-col mx-auto my-auto w-96`}
      >
        <Popup
          trigger={
            <button
              className="w-80 flex h-20 btn_private_home"
              onClick={() => unirsePartida()}
            >
              BUSCAR PARTIDA
            </button>
          }
          modal
          nested
          onOpen={() => unirsePartida()}
          onClose={() => cancelar_busqueda()}
          arrow={false}
          contentClassName="flex items-center justify-center"
          contentStyle={{
            width: "90%",
            height: "auto",
            maxWidth: "500px",
            border: "5px solid black",
            borderRadius: "10px",
            overflow: "auto",
            padding: "20px",
          }}
        >
          {(close) => (
            <div className="w-full h-full max-w-lg p-6 bg-white rounded-lg">
              <button
                className="absolute top-0 right-0 p-2 focus:outline-none"
                onClick={close}
              >
                <svg
                  className={`w-6 h-6 text-gray-800 ${
                    spinner_aceptar ? "" : "hidden"
                  }`}
                  fill="none"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className={`${spinner_aceptar ? "" : "hidden"}`}>
                <h1 className="flex justify-center items-center mt-6 text-2xl">
                  🔎 Buscando partida... 🔍
                </h1>
                <Spinner />
              </div>
              <div className={`${spinner_aceptar ? "hidden" : ""}`}>
                <h1 className="flex justify-center items-center mt-6 text-2xl">
                  ⚔ ¡Partida encontrada! ⚔
                </h1>
                <h1 className="flex justify-center items-center mt-2 text-xl">
                  ¿Aceptas el desafio?
                </h1>
                <div className="flex flex-wrap justify-center mt-6">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mx-2 mt-2 md:mt-0 md:ml-2"
                    onClick={() => {
                      onRechazarPartida();
                      close();
                    }}
                  >
                    Rechazar partida
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mx-2 mt-2 md:mt-0 md:mr-2"
                    onClick={onAceptarPartida}
                  >
                    Aceptar partida
                  </button>
                </div>
              </div>
            </div>
          )}
        </Popup>

        <div className="max-w-screen-md mx-auto">
          <Popup
            trigger={
              <button className="mt-10 sm:mt-20 w-full sm:w-80 flex h-10 sm:h-20 btn_private_home">
                UNIRSE CON CÓDIGO
              </button>
            }
            //onClose={() => cancelar_busqueda()}
            modal
            nested
            arrow={false}
            contentClassName="flex items-center justify-center"
            contentStyle={{
              width: "90%",
              height: "auto",
              maxWidth: "500px",
              border: "5px solid black",
              borderRadius: "10px",
              overflow: "auto",
              padding: "20px",
            }}
          >
            {(close) => (
              <div className="w-full h-full max-w-lg p-6 bg-white rounded-lg">
                <button
                  className="absolute top-0 right-0 p-2 focus:outline-none"
                  onClick={close}
                >
                  <svg
                    className={`w-6 h-6 text-gray-800 ${
                      spinner_aceptar ? "" : "hidden"
                    }`}
                    fill="none"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // comprobamos que la sala existe, y si es asi entonces vamos al lobby privado
                    // en canto entramos en el lobby estamos readis para la partida
                    unirseSalaPrivada(lobbyPrivado);
                  }}
                >
                  <div className="flex flex-col">
                    <input
                      id="idPartidaPrivada"
                      type="text"
                      placeholder="introduzca aqui el código de la sala privada, ej: 2345"
                      className="w-full border border-transparent border-b-black/25 bg-transparent focus:outline-none h-8 sm:h-10"
                      required
                      onChange={(e) => {
                        setLobbyPrivado(e.target.value);
                      }}
                    />
                    <button
                      type="submit"
                      className="w-full py-2 mt-2 bg-cyan-900 text-white font-bold rounded-full hover:bg-slate-900 duration-300 text-sm sm:text-base"
                    >
                      ENTRAR EN SALA
                    </button>
                  </div>
                </form>
              </div>
            )}
          </Popup>
        </div>
        <button
          className="mt-20 w-80 flex h-20 btn_private_home "
          onClick={() => {
            window.location.href = `/Partida_privada`;
          }}
        >
          CREAR PARTIDA CON AMIGOS
        </button>
      </div>
    </div>
  );
}
