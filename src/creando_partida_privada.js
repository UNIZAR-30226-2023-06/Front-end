import React from "react";
import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useState } from "react";
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
  const [dinero, set_dinero] = React.useState(null);
  const [nombre, set_nombre] = React.useState(null);
  const [codigo, set_codigo] = React.useState(null);
  const [imagen, set_imagen] = React.useState(null);
  const [cookies, setCookie] = useCookies(["token"]); // Agregamos removeCookie
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [codigo_partida, setCodigo_partida] = useState(null);

  // PARTE DE LO DE LOS USUARIOS ESTO PUEDE ESTAR RELOKO PERO ES LO QUE HAY

  // Nombres de los jugadores en la sala
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
    { img: "http://localhost:3000/jugadores.png", nombre: "Ayelen#1234" },
    { img: "http://localhost:3000/jugadores.png", nombre: "Loreto#1234" },
    { img: null, nombre: null },
    { img: null, nombre: null },
  ]);

  function actualizar_jugadores() {
    // Pongo el nombre de los jugadores en la sala
    if (jugadores[0].nombre === null) {
      setTexto_jugador1(
        "Usa el código de la partida para invitar a más jugadores"
      );
      setTamano_texto_jugador_1("19px");
      setMostrar_img_jugador_1(false);
    } else {
      setTexto_jugador1(jugadores[0].nombre);
      setTamano_texto_jugador_1("");
      setMostrar_img_jugador_1(true);
    }

    if (jugadores[1].nombre === null) {
      setTexto_jugador2(
        "Usa el código de la partida para invitar a más jugadores"
      );
      setTamano_texto_jugador_2("19px");
      setMostrar_img_jugador_2(false);
    } else {
      setTexto_jugador2(jugadores[1].nombre);
      setTamano_texto_jugador_2("");
      setMostrar_img_jugador_2(true);
    }

    if (jugadores[2].nombre === null) {
      setTexto_jugador3(
        "Usa el código de la partida para invitar a más jugadores"
      );
      setTamano_texto_jugador_3("19px");
      setMostrar_img_jugador_3(false);
    } else {
      setTexto_jugador3(jugadores[2].nombre);
      setTamano_texto_jugador_3("");
      setMostrar_img_jugador_3(true);
    }

    if (jugadores[3].nombre === null) {
      setTexto_jugador4(
        "Usa el código de la partida para invitar a más jugadores"
      );
      setTamano_texto_jugador_4("19px");
      setMostrar_img_jugador_4(false);
    } else {
      setTexto_jugador4(jugadores[3].nombre);
      setTamano_texto_jugador_4("");
      setMostrar_img_jugador_4(true);
    }
  }

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
          }
          )
          .catch((error) => {
            console.error("Error:", error);
          }
          );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const url = `${process.env.REACT_APP_URL_BACKEND}/create-lobby`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  })
    .then((res) => {
      res.json().then((data) => {
        console.log(data);
        // Compruebo si la sala se ha creado correctamente
        if (data.detail === "Lobby created") {
          // Guardo el código de la sala
          setCodigo_partida(data.lobby_id);

          // Si se ha creado correctamente, me uno a la partida
          const url = `${process.env.REACT_APP_URL_BACKEND}/join-lobby?lobby_id=${data.lobby_id}`;

          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          })
            .then((res) => {
              res.json().then((data) => {
                console.log(data);
              });
            }
            )
            .catch((error) => {
              console.error("Error:", error);
            }
            );
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

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
              ? "http://localhost:3000/fotos_perfil/skin1.png"
              : `http://localhost:3000/fotos_perfil/${data.profile_picture}.png`;

          set_dinero(data.coins);
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

  return (
    /* --------------------------- fondo de las montañas --------------------------- */
    <div className="w-full h-full flex imagenCustomPrivateHome">
      <div className="estilo">
        <a className="jugador_1" style={{ fontSize: tamano_texto_jugador_1 }}>
          {nombre_jugador_1}
          {mostrar_img_jugador_1 && (
            <img
              src={jugadores[0].img}
              className="icono_jugador"
              alt="icono_jugadores"
            />
          )}
        </a>
        <a className="jugador_2" style={{ fontSize: tamano_texto_jugador_2 }}>
          {nombre_jugador_2}
          {mostrar_img_jugador_2 && (
            <img
              src={jugadores[1].img}
              className="icono_jugador"
              alt="icono_jugadores"
            />
          )}
        </a>
        <a className="jugador_3" style={{ fontSize: tamano_texto_jugador_3 }}>
          {nombre_jugador_3}
          {mostrar_img_jugador_3 && (
            <img
              src={jugadores[2].img}
              className="icono_jugador"
              alt="icono_jugadores"
            />
          )}
        </a>
        <a className="jugador_4" style={{ fontSize: tamano_texto_jugador_4 }}>
          {nombre_jugador_4}
          {mostrar_img_jugador_4 && (
            <img
              src={jugadores[3].img}
              className="icono_jugador"
              alt="icono_jugadores"
            />
          )}
        </a>
      </div>
      {/* --------------------------- menu --------------------------- */}
      <div
        className={`over_SideBaar relative h-full ${
          // si la ventana es pequeña o desplegado falso que no se vea
          screenSize < 720 && !desplegado ? styleSidebarOff : styleSidebarOn
          }`}
      >
        {/* --------------------------- cruz de cerrar menu --------------------------- */}
        <img
          src="http://localhost:3000/white_cross.png"
          alt="imagen para cerrar la sidebar"
          className={`hover:cursor-pointer ${screenSize < 720 && desplegado ? styleCruzOn : styleCruzOff
            }`}
          onClick={() => {
            setDesplegado(false);
          }}
        />
        {/*  */}
        <h1
          href="http://localhost:3000/editarPerfil"
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
            href="http://localhost:3000/editarPerfil"
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
            style={{
              // Pego el elemento a la izquierda
              marginLeft: "0",
            }}
          >
            Puntos de Victoria
          </h1>
          {/* <img src="http://localhost:3000/oveja.png" className=" w-14 h-14"></img> */}
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
            href="http://localhost:3000/editarPerfil"
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
          >
            Tiempo de turno
          </h1>
          {/* <img src="http://localhost:3000/oveja.png" className=" w-14 h-14"></img> */}
          <input
            type="number"
            defaultValue={40}
            min={5}
            max={120}
            className=" mt-2 w-16 h-12 rounded-full"
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
            href="http://localhost:3000/editarPerfil"
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
          >
            Número de jugadores
          </h1>
          {/* <img src="http://localhost:3000/oveja.png" className=" w-14 h-14"></img> */}
          <input
            type="number"
            defaultValue={4}
            min={2}
            max={4}
            className=" mt-2 w-16 h-12 rounded-full"
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
            href="http://localhost:3000/editarPerfil"
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
          >
            Ladrón
          </h1>
          <label
            for="toggleFour1"
            class="flex cursor-pointer select-none items-center"
          >
            <div class="relative">
              <input type="checkbox" id="toggleFour1" class="sr-only" />
              <div class="box bg-dark block h-8 w-14 rounded-full"></div>
              <div class="dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition"></div>
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
            href="http://localhost:3000/editarPerfil"
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
          >
            Tablero aleatorio
          </h1>
          <label
            for="toggleTablero"
            class="flex cursor-pointer select-none items-center"
          >
            <div class="relative">
              <input type="checkbox" id="toggleTablero" class="sr-only" />
              <div class="box bg-dark block h-8 w-14 rounded-full"></div>
              <div class="dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition"></div>
            </div>
          </label>
        </div>
        <br />
        <br />
        {/* --------------------------- volver al home --------------------------- */}
        <a
          href="http://localhost:3000/home"
          className={`absolute bottom-0 left-0 right-0 md:static md:w-auto md:h-auto`}
        >
          <h1
            href="http://localhost:3000/editarPerfil"
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
          >
            ❌ Cancelar partida privada
          </h1>
        </a>

        {/* --------------------------- menu plegado --------------------------- */}
        <img
          src="http://localhost:3000/menu.png"
          alt="menu desplegable, clicka aqui para desplegarlo"
          className={`hover:cursor-pointer w-8 h-8 m-4 ${screenSize < 720 && !desplegado ? styleMenuOn : styleMenuOff
            }`}
          onClick={() => {
            setDesplegado(true);
          }}
        />
        {/* --------------------------- botones centrales ---------------------------*/}
      </div>
    </div>
  );
}
