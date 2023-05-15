import React from "react";
import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Creando_partida_privada() {
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

  const navigate = useNavigate();
  const [nombre, set_nombre] = React.useState(null);
  const [codigo, set_codigo] = React.useState(null);
  const [imagen, set_imagen] = React.useState(null);
  const [cookies, setCookie] = useCookies(["token"]); // Agregamos removeCookie
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [codigo_partida, setCodigo_partida] = useState(null);

  // Nombres de los jugadores en la sala por defecto
  const [nombre_jugador_1, setTexto_jugador1] = useState(
    "Usa el código de la partida para invitar a más jugadores"
  );
  const [nombre_jugador_2, setTexto_jugador2] = useState(
    "Usa el código de la partida para invitar a más jugadores"
  );
  const [nombre_jugador_3, setTexto_jugador3] = useState(
    "Usa el código de la partida para invitar a más jugadores"
  );
  const [nombre_jugador_4, setTexto_jugador4] = useState(
    "Usa el código de la partida para invitar a más jugadores"
  );

  // Tamaño del texto de los nombers de los jugadores
  const [tamano_texto_jugador_1, setTamano_texto_jugador_1] = useState("19px");
  const [tamano_texto_jugador_2, setTamano_texto_jugador_2] = useState("19px");
  const [tamano_texto_jugador_3, setTamano_texto_jugador_3] = useState("19px");
  const [tamano_texto_jugador_4, setTamano_texto_jugador_4] = useState("19px");

  // Opción de mostrar o no la imagen del jugador
  const [mostrar_img_jugador_1, setMostrar_img_jugador_1] = useState(false);
  const [mostrar_img_jugador_2, setMostrar_img_jugador_2] = useState(false);
  const [mostrar_img_jugador_3, setMostrar_img_jugador_3] = useState(false);
  const [mostrar_img_jugador_4, setMostrar_img_jugador_4] = useState(false);

  const [jugadores, setJugadores] = useState([
    {
      img: `${process.env.REACT_APP_URL_FRONTED}/jugadores.png`,
      nombre: "Ayelen#1234",
    },
    {
      img: `${process.env.REACT_APP_URL_FRONTED}/jugadores.png`,
      nombre: "Loreto#1234",
    },
    { img: null, nombre: null },
    { img: null, nombre: null },
  ]);

  // variables de la configuración
  const [puntos_de_victoria, setPuntos_de_victoria] = useState(10);
  const [tiempo_de_turno, setTiempo_de_turno] = useState(15);
  const [numero_de_jugadores, setNumero_de_jugadores] = useState(4);
  const [ladron, setLadron] = useState(false);
  const [tablero_aleatorio, setTablero_aleatorio] = useState(false);
  const [lobby, setLobby] = useState(0);
  const [lobbyCreado, setLobbyCreado] = useState(false);

  // ----------------------- creamos un lobby si no esta creado -----------------------------------
  const { } = useQuery(
    ["get-create-lobby"],
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
      if (data.detail === "Player not in any lobby") {
        // no hay lobby asi que lo creamos
        fetch(`${process.env.REACT_APP_URL_BACKEND}/create-lobby`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            //Authorization: `Bearer ${Token}`,
          },
        })
          .then((res) => {
            res.json().then((data) => {
              console.log(data);
              console.log(data.lobby_id);
              setLobby(data.lobby_id);
              // ya tenemos el lobby asi que ahora entramos en el
              setLobbyCreado(true);
              fetch(
                `${process.env.REACT_APP_URL_BACKEND}/join-lobby?lobby_id=${data.lobby_id}`,
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
                    console.log("------------------------------------------------");
                    console.log(data.detail);
                  });
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        console.log("no hay lobby");
      } else {
        // ya existe el lobby paramos
        console.log("si hay lobby");
        setLobbyCreado(true);
      }
      return data;
    },
    {
      refetchInterval: 1000,
      enabled: !lobbyCreado,
    }
  );

  // Cada segundo, hago un fetch al backend para obtener el estado de la partida

  // ------------------------------------------- obtener el estado de la partida -----------------------------------
  useQuery(
    ["get-state-game"],
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
      )
        .then((res) => {
          res.json().then((data) => {
            console.log("JSON de la partida: ", data);
            setJugadores(data.game.jugadores);
            setLobby(data.id);
            actualizar_jugadores();
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return 0;
    },
    {
      refetchInterval: 2000,

      // codigo debe ser distinto de 0
      enabled: codigo !== 0,
    }
  );

  function unirseSalaPrivada(e) {
    console.log(e);
    console.log("nos unimos al lobby: ",e);
    fetch(`${process.env.REACT_APP_URL_BACKEND}/join-lobby?lobby_id=${e}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        res.json().then((data) => {
          if (res.status === 404) {
            // error al entrar en el lobby
            toast.error("No existe el lobby introducido");
          } else if (data.detail === "Lobby joined") {
            console.log("partida aceptada");
          
            // Me redirijo a la partida con href
            window.location.href = `${process.env.REACT_APP_URL_FRONTED}/partida`;
          } else {
            toast.error("ya estas en un lobby :(");
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // ------------------------------------------- actualizamos a los jugadores ------------------------

  function actualizar_jugadores() {
    // Recorro los jugadores que hay y actualizo todo
    for (let i = 0; i < jugadores.length; i++) {
      if (i == 0) {
        setTexto_jugador1("#" + jugadores[0].id.toString());
        setTamano_texto_jugador_1("");
        setMostrar_img_jugador_1(true);
      }
      if (i == 1) {
        setTexto_jugador2("#" + jugadores[1].id.toString());
        setTamano_texto_jugador_2("");
        setMostrar_img_jugador_2(true);
      }
      if (i == 2) {
        setTexto_jugador3("#" + jugadores[2].id.toString());
        setTamano_texto_jugador_3("");
        setMostrar_img_jugador_3(true);
      }
      if (i == 3) {
        setTexto_jugador4("#" + jugadores[3].id.toString());
        setTamano_texto_jugador_4("");
        setMostrar_img_jugador_4(true);
      }
    }

    for (let i = jugadores.length; i < 4; i++) {
      if (i == 0) {
        setTexto_jugador1("Usa el código de la partida para invitar a más jugadores");
        setTamano_texto_jugador_1("19px");
        setMostrar_img_jugador_1(false);
      }
      if (i == 1) {
        setTexto_jugador2("Usa el código de la partida para invitar a más jugadores");
        setTamano_texto_jugador_2("19px");
        setMostrar_img_jugador_2(false);
      }
      if (i == 2) {
        setTexto_jugador3("Usa el código de la partida para invitar a más jugadores");
        setTamano_texto_jugador_3("19px");
        setMostrar_img_jugador_3(false);
      }
      if (i == 3) {
        setTexto_jugador4("Usa el código de la partida para invitar a más jugadores");
        setTamano_texto_jugador_4("19px");
        setMostrar_img_jugador_4(false);
      }
    }
  }
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
  /* --------------------------- calculamos el tamaño de la ventana --------------------------- */

  // Llamamos cada segundo a actualizar_jugadores
  useEffect(() => {
    const interval = setInterval(() => {
      // Si el codigo de la partida no es null, actualizo los jugadores
      if (codigo_partida !== null) {
        // Ejemplo url:
        // http://localhost:8000/get-lobby-from-id?lobby_id=1253

        const url = `${process.env.REACT_APP_URL_BACKEND}/get-lobby-from-id?lobby_id=${codigo_partida}`;
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
          .then((res) => {
            res.json().then((data) => {
              console.log(data);
              // Actualizo los jugadores
              setJugadores(data.game.jugadores);
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------  para que se actualicen los valores  ------------------------------------
  useEffect(() => {
    if (ladron) {
      console.log(lobby);
      fetch(
        `${process.env.REACT_APP_URL_BACKEND}/enable-thief?Lobyb_id=${lobby}`,
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
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    } else {
      // ponemos el ladron a false 
      fetch(
        `${process.env.REACT_APP_URL_BACKEND}/disable-thief?Lobyb_id=${lobby}`,
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
            console.log(data.detail);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    }
  }, [
    ladron,
  ]);

  // ---------------------------------------  para que se actualice el tiempo de turno  ------------------------------------

  // Actualizamos el valor del tiempo cuando cambia
  useEffect(() => {
    if (tiempo_de_turno !== null) {

      // Ejemplo de url: 
      // `${process.env.REACT_APP_URL_BACKEND}/set-time-per-turn?Lobyb_id=${lobby}&time=${tiempo_de_turno}`

      console.log("tiempo de turno ", tiempo_de_turno);
      fetch(
        `${process.env.REACT_APP_URL_BACKEND}/set-time-per-turn?Lobyb_id=${lobby}&time=${tiempo_de_turno}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization: `Bearer ${Token}`,
          },
        }
      )
        .then((res) => {
          res.json().then((data) => {
            console.log(data.detail);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [tiempo_de_turno]);

  // ---------------------------------------  para que se actualicen los puntos de victoria  ------------------------------------

  // Actualizamos el valor de los puntos de victoria cuando cambia
  useEffect(() => {
    if (tiempo_de_turno !== null) {

      // Ejemplo de url: 
      // `${process.env.REACT_APP_URL_BACKEND}/set-time-per-turn?Lobyb_id=${lobby}&time=${puntos_de_victoria}`

      fetch(
        `${process.env.REACT_APP_URL_BACKEND}/set-points-to-win?Lobyb_id=${lobby}&points=${puntos_de_victoria}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization: `Bearer ${Token}`,
          },
        }
      )
        .then((res) => {
          res.json().then((data) => {
            console.log(data.detail);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [puntos_de_victoria]);

  // ---------------------------------------  para que se actualicen el numerp de jugadores  ------------------------------------

  // Actualizamos el número de jugadores cuando cambia

  useEffect(() => {
    if (numero_de_jugadores !== null) {
      console.log("numero de jugadores ", numero_de_jugadores);

      // Ejemplo de url:
      // http://localhost:8000/set-max-players?Lobyb_id=1234&max_players=1234

      fetch(
        `${process.env.REACT_APP_URL_BACKEND}/set-max-players?Lobyb_id=${lobby}&max_players=${numero_de_jugadores}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization: `Bearer ${Token}`,
          },
        }
      )
        .then((res) => {
          res.json().then((data) => {
            console.log(data.detail);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [numero_de_jugadores]);

  // ---------------------------------------  para que se actualicen el mapa ------------------------------------


  useEffect(() => {
    console.log("El nuevo valor del tablero_aleatorio es: ", tablero_aleatorio);

    // Ejemplo de url:
    // http://localhost:8000/set-board?Lobyb_id=1234&board=default

    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/set-board?Lobyb_id=${lobby}&board=${tablero_aleatorio ? "random" : "default"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Authorization: `Bearer ${Token}`,
        },
      }
    )
      .then((res) => {
        res.json().then((data) => {
          console.log(data.detail);
        });
      }
      )
      .catch((error) => {
        console.error("Error:", error);
      }
      );
  }, [
    tablero_aleatorio,
    lobby,
  ]);

  // -------------------------------------- estado de la sidebar ---------------------------------------------

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
              ? `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/skin1.png`
              : `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/${data.profile_picture}.png`;

          set_codigo(data.id);
          set_nombre(data.username);
          set_imagen(img);
          console.log(img);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [json_token.id]);

  // ---------------------- si el lider sala del crear borramos la sala ----------------------------------
  function borrarSala() {
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/delete-lobby?lobby_id=${lobby
      }`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          //Authorization: `Bearer ${Token}`,
        },
      }
    )
      .then((res) => {
        res.json().then((data) => {
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
          className={`hover:cursor-pointer ${screenSize < 720 && desplegado ? styleCruzOn : styleCruzOff
            }`}
          onClick={() => {
            setDesplegado(false);
          }}
        />
        {/*  */}
        <h1
          href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
          variant={Link}
          className={` w-full p-2 text-white origin-center content-center font-medium text-xl border-solid border-transparent border-b-2 border-white`}
        >
          CONFIGURAR PARTIDA
        </h1>
        <br />
        {/* ---------------------------  Puntos de Victoria  --------------------------- */}
        <div
          className="flex flex-row"
          style={{
            // Alineo los elementos verticalmente
            alignItems: "center",

            // Hago que los elementos se distribuyan horizontalmente
            justifyContent: "space-around",
          }}
        >
          <h1
            href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
            style={{
              // Pego el elemento a la izquierda
              marginLeft: "0",
            }}
          >
            Puntos de Victoria
          </h1>
          {/* <img src=`${process.env.REACT_APP_URL_FRONTED}/oveja.png` className=" w-14 h-14"></img> */}
          <input
            type="number"
            defaultValue={10}
            min={3}
            max={10}
            className=" mt-2 w-16 h-12 rounded-full"
            style={{
              // Pego el elemento a la derecha
              marginRight: "0",
            }}
            onChange={(event) => {
              setPuntos_de_victoria(event.target.value);
            }}
          ></input>
        </div>
        <br />
        <br />
        {/* ---------------------------  Tiempo de turno  --------------------------- */}
        <div
          className="flex flex-row"
          style={{
            // Alineo los elementos verticalmente
            alignItems: "center",

            // Hago que los elementos se distribuyan horizontalmente
            justifyContent: "space-around",
          }}
        >
          <h1
            href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
          >
            Tiempo de turno
          </h1>
          {/* <img src=`${process.env.REACT_APP_URL_FRONTED}/oveja.png` className=" w-14 h-14"></img> */}
          <input
            type="number"
            defaultValue={15}
            min={5}
            max={60}
            className=" mt-2 w-16 h-12 rounded-full"
            onChange={(event) => {
              setTiempo_de_turno(event.target.value);
            }}
          ></input>
        </div>
        <br />
        <br />
        {/* ---------------------------  Número de jugadores  --------------------------- */}
        <div
          className="flex flex-row"
          style={{
            // Alineo los elementos verticalmente
            alignItems: "center",

            // Hago que los elementos se distribuyan horizontalmente
            justifyContent: "space-around",
          }}
        >
          <h1
            href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
          >
            Número de jugadores
          </h1>
          {/* <img src=`${process.env.REACT_APP_URL_FRONTED}/oveja.png` className=" w-14 h-14"></img> */}
          <input
            type="number"
            defaultValue={4}
            min={2}
            max={4}
            className=" mt-2 w-16 h-12 rounded-full"
            onChange={(event) => {
              setNumero_de_jugadores(event.target.value);
            }}
          ></input>
        </div>
        <br />
        <br />
        {/* ---------------------------  Ladrón  --------------------------- */}
        <div
          className="flex flex-row"
          style={{
            // Alineo los elementos verticalmente
            alignItems: "center",

            // Hago que los elementos se distribuyan horizontalmente
            justifyContent: "space-around",
          }}
        >
          <h1
            href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
          >
            Ladrón
          </h1>
          <label
            for="toggleFour1"
            className="flex cursor-pointer select-none items-center"
          >
            <div class="relative">
              <input
                type="checkbox"
                id="toggleFour1"
                class="sr-only"
                onClick={(event) => {
                  setLadron(!ladron);
                }}
              />
              <div className="box bg-dark block h-8 w-14 rounded-full"></div>
              <div className="dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition"></div>
            </div>
          </label>
        </div>
        <br />
        <br />
        {/* ---------------------------  Tablero Aleatorio  --------------------------- */}
        <div
          className="flex flex-row"
          style={{
            // Alineo los elementos verticalmente
            alignItems: "center",

            // Hago que los elementos se distribuyan horizontalmente
            justifyContent: "space-around",
          }}
        >
          <h1
            href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
          >
            Tablero aleatorio
          </h1>
          <label
            for="toggleTablero"
            className="flex cursor-pointer select-none items-center"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="toggleTablero"
                class="sr-only"
                onClick={(event) => {
                  setTablero_aleatorio(!tablero_aleatorio);
                }}
              />
              <div className="box bg-dark block h-8 w-14 rounded-full"></div>
              <div className="dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition"></div>
            </div>
          </label>
        </div>
        <br />
        <br />
        {/* --------------------------- volver al home --------------------------- */}
        <a
          href={`${process.env.REACT_APP_URL_FRONTED}/home`}
          className={`absolute bottom-0 left-0 right-0 md:static md:w-auto md:h-auto`}
        >
          <h1
            href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
            onClick={borrarSala}
          >
            ❌ Cancelar partida privada
          </h1>
        </a>

        {/* --------------------------- menu plegado --------------------------- */}
        <img
          src={`${process.env.REACT_APP_URL_FRONTED}/menu.png`}
          alt="menu desplegable, clicka aqui para desplegarlo"
          className={`hover:cursor-pointer w-8 h-8 m-4 ${screenSize < 720 && !desplegado ? styleMenuOn : styleMenuOff
            }`}
          onClick={() => {
            setDesplegado(true);
          }}
        />
        {/* --------------------------- botones centrales ---------------------------*/}
      </div>
      {/* mostramos el id de la sala */}
      <h1 className="flex my-8 mx-auto text-6xl">
        Id de la sala: <b> {lobby} </b>
      </h1>

      <div className="flex m-auto">
        {numero_de_jugadores >= 1 && <a className="jugador_1" style={{ fontSize: tamano_texto_jugador_1 }}>
          <div className="flex m-auto gap-8 ml-4">
            {mostrar_img_jugador_1 && (
              <img
                src={`${process.env.REACT_APP_URL_FRONTED}/dragones/shocked.png`}
                style={{
                  width: "65px",
                  height: "65px",
                }}
                alt="icono_jugadores"
                className="rounded-full bg-white"
              />
            )}
            {nombre_jugador_1}
          </div>
        </a>}

        {numero_de_jugadores >= 2 && <a className="jugador_2" style={{ fontSize: tamano_texto_jugador_2 }}>

          {mostrar_img_jugador_2 && (
            <img
            src={`${process.env.REACT_APP_URL_FRONTED}/dragones/hello.png`}
              alt="icono_jugadores"
              style={{
                width: "65px",
                height: "65px",
              }}
              className="rounded-full bg-white"
            />
          )}
          <span className="mt-6">
          {nombre_jugador_2}
          </span>

        </a>}

        {numero_de_jugadores >= 3 && <a className="jugador_3" style={{ fontSize: tamano_texto_jugador_3 }}>

          {mostrar_img_jugador_3 && (
            <img
            src={`${process.env.REACT_APP_URL_FRONTED}/dragones/peace.png`}
              style={{
                width: "65px",
                height: "65px",
              }}
              alt="icono_jugadores"
              className="rounded-full bg-white"
            />
          )}
          {nombre_jugador_3}

        </a>}

        {numero_de_jugadores >= 4 && <a className="jugador_4" style={{ fontSize: tamano_texto_jugador_4 }}>

          {mostrar_img_jugador_4 && (
            <img
            src={`${process.env.REACT_APP_URL_FRONTED}/dragones/boring.png`}
              style={{
                width: "65px",
                height: "65px",
              }}
              alt="icono_jugadores"
              className="rounded-full bg-white"
            />
          )}
          {nombre_jugador_4}

        </a>}
      </div>

      {/* Boton para iniciar la partida */}
      {jugadores.length == numero_de_jugadores && <button
        className="flex text-6xl m-auto bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-4 px-4 rounded-full absolute left-0 right-0 bottom-10 w-[440px]"
        onClick={() => {
          unirseSalaPrivada(codigo);
        }}
      >
        Iniciar partida
      </button>}
    </div>
  );
}
