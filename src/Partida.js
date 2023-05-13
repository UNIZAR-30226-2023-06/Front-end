import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Tabs from "./Components/TabComponent/Tabs";
import PopUpFaseTirada from "./pop-up-Fase-tirada";
import PopupTablaCostes from "./pop-up-TablaCostes";
import PopUpFaseCompra from "./pop-up-FaseCompra";
import PopUpFinPartida from "./pop-up-partida-terminada";
import PopUpCartasDesarrollo from "./pop-up-Cartas-desarrollo";
import PopUpFaseNegociacion from "./pop-up-FaseNegociacion";
// 1-- Importamos useCookies y jwt_decode
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";

function Partida() {
  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// CONSTANTES ////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  // 2-- Creamos la estructura de las cookies
  const [cookies] = useCookies(["token"]);

  // 3-- Obtenemos el token de las cookies
  const Token = cookies.token;

  // 4-- Obtenemos la información del token
  const json_token = jwt_decode(Token);

  const [mi_id] = useState(json_token.id);
  const [mi_indice, setMi_indice] = useState(0);

  const [partidaTerminada, setPartidaTerminada] = useState(false);
  const [nombreGanador, setNombreGanador] = useState("");
  const [idGanador, setIdGanador] = useState(0);
  const [imgGanador, setImgGanador] = useState("");

  const [id_to_img] = useState({});

  const [idsOponentes, setIdsOponentes] = useState([]);
  const [imgs_oponentes, setImgs_oponentes] = useState([]);
  const [puntos_victoria_oponentes, setPuntos_victoria_oponentes] = useState(
    []
  );
  const [bono_caballeros_oponentes, setBono_caballeros_oponentes] = useState(
    []
  );
  const [bono_carreteras_oponentes, setBono_carreteras_oponentes] = useState(
    []
  );

  const [estado_jugador, setEstado_jugador] = useState(null);

  // Aquí va el id del jugador que tiene el turno
  const [turno, setTurno] = useState(0);

  const [codigo_partida, setCodigo_partida] = useState(0);

  // Recordatorio de fases:
  // 0: Obtención de recursos
  // 1: Uso de cartas de desarrollo
  // 2: Negociación
  // 3: Construcción
  const [tiempo, setTiempo] = useState(0);
  const [tiempo_maximo, setTiempo_maximo] = useState(30);
  // pop up de las fases
  const [ShowPopupFaseTirada, setShowPopupFaseTirada] = useState(false);
  const [ShowPopupFaseNegociacion, setShowPopupFaseNegociacion] =
    useState(false);
  const [jugadores, setJugadores] = useState([]);

  const [board, setBoard] = useState({});

  const [partida_empezada, setPartida_empezada] = useState(false);
  const [fase_actual, setFase_actual] = useState("");

  const [usandoCartaCarreteras, setUsandoCartaCarreteras] = useState(false);
  const [cartasCarreteraColocadas, setCartasCarreteraColocadas] = useState(0);

  const [skins_jugadores_poblados, setSkins_jugadores_poblados] = useState([]);
  const [skins_jugadores_carreteras, setSkins_jugadores_carreteras] = useState(
    []
  );
  const [skins_jugadores_ciudades, setSkins_jugadores_ciudades] = useState([]);

  const [colores_oponentes, setColores_oponentes] = useState([]);
  const [mi_color, setMi_color] = useState("");

  const [aldeas_iniciales_colocadas, setAldeas_iniciales_colocadas] =
    useState(false);
  const [puedo_colocar_aldea, setPuedo_colocar_aldea] = useState(false);
  const [puedo_colocar_carretera, setPuedo_colocar_carretera] = useState(false);
  const [aldea_que_puedo_construir, setAldea_que_puedo_construir] = useState(1);
  const [ultima_aldea_construida, setUltima_aldea_construida] = useState(0);

  const [img_dado_1, setImg_dado_1] = useState(
    "http://localhost:3000/dados/dado_1.png"
  );

  const [img_dado_2, setImg_dado_2] = useState(
    "http://localhost:3000/dados/dado_2.png"
  );

  const [casas_legales, setCasas_legales] = useState([]);
  const [carretera_legales, setCarretera_legales] = useState([]);

  const ficha_con_id = [
    null,
    "http://localhost:3000/casillas/madera.jpg",
    "http://localhost:3000/casillas/arcilla.jpg",
    "http://localhost:3000/casillas/ovejas.jpg",
    "http://localhost:3000/casillas/roca.jpg",
    "http://localhost:3000/casillas/trigo.jpg",
    "http://localhost:3000/casillas/desierto.jpg",
  ];

  const init_top_board = 340;
  const init_left_board = -100;

  const top_variation_board = [
    0, 1, 2, -1, 0, 1, 2, -2, -1, 0, 1, 2, -2, -1, 0, 1, -2, -1, 0,
  ];
  const top_variation_unit = 135;

  const left_variation_board = [
    -4, -3, -2, -3, -2, -1, 0, -2, -1, 0, 1, 2, 0, 1, 2, 3, 2, 3, 4,
  ];
  const left_variation_unit = 80;

  const [posicion_ladron, setPosicion_ladron] = useState(87);
  const [nuevaPosicionLadron, setNuevaPosicionLadron] = useState(87);
  const [colocando_ladron, setColocando_ladron] = useState(false);
  const [ladronYaColocado, setLadronYaColocado] = useState(true);
  const [eligiendoJugadorRobar, setEligiendoJugadorRobar] = useState(false);
  const top_variation_ladron = 27;
  const left_variation_ladron = 27;

  const [road, setRoad] = useState({});

  // Variable que gestiona si se está colocando el ladrón

  // 0 para las verticales, 1 para las ascendentes, 2 para las descendentes
  const type_road = [
    0, 1, 0, 1, 0, 1, 2, 2, 2, 2, 0, 1, 0, 1, 0, 1, 0, 1, 2, 2, 2, 2, 2, 0, 1,
    0, 1, 0, 1, 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2,
    2, 2, 2, 2, 1, 0, 1, 0, 1, 0, 1, 0, 2, 2, 2, 2, 1, 0, 1, 0, 1, 0,
  ];

  const init_top_road_relative_vertical = 70;
  const init_top_road_relative_ascend = 2;
  const init_top_road_relative_descend = 138;

  const init_left_road_relative_vertical = -368;
  const init_left_road_relative_ascend = -328;
  const init_left_road_relative_descend = -328;

  const top_variation_road = [
    0, 0, 1, 1, 2, 2, 0, 1, 2, 3, -1, -1, 0, 0, 1, 1, 2, 2, -1, 0, 1, 2, 3, -2,
    -2, -1, -1, 0, 0, 1, 1, 2, 2, -2, -1, 0, 1, 2, 3, -3, -2, -2, -1, -1, 0, 0,
    1, 1, 2, -2, -1, 0, 1, 2, -3, -2, -2, -1, -1, 0, 0, 1, -2, -1, 0, 1, -3, -2,
    -2, -1, -1, 0,
  ];

  const left_variation_road = [
    0, 0, 1, 1, 2, 2, 0, 1, 2, 3, 1, 1, 2, 2, 3, 3, 4, 4, 1, 2, 3, 4, 5, 2, 2,
    3, 3, 4, 4, 5, 5, 6, 6, 2, 3, 4, 5, 6, 7, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 4,
    5, 6, 7, 8, 5, 6, 6, 7, 7, 8, 8, 9, 6, 7, 8, 9, 7, 8, 8, 9, 9, 10,
  ];

  // Asumo que [0] equivale al color y [1] al tipo de edificio
  // tipo 0 = casa, tipo 1 = castillo
  const [building, setBuilding] = useState({});

  const top_variation_building = [
    0, 1, 2, -0.7, 0.3, 1.3, 2.3, -1, 0, 1, 2, -1.7, -0.7, 0.3, 1.3, 2.3, -2,
    -1, 0, 1, 2, -2.7, -1.7, -0.7, 0.3, 1.3, 2.3, -3, -2, -1, 0, 1, 2, -2.7,
    -1.7, -0.7, 0.3, 1.3, -3, -2, -1, 0, 1, -2.7, -1.7, -0.7, 0.3, -3, -2, -1,
    0, -2.7, -1.7, -0.7,
  ];

  const left_variation_building = [
    0, 1, 2, 0, 1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, 3, 4, 5, 6, 2, 3, 4, 5,
    6, 7, 3, 4, 5, 6, 7, 8, 4, 5, 6, 7, 8, 5, 6, 7, 8, 9, 6, 7, 8, 9, 7, 8, 9,
    10, 8, 9, 10,
  ];

  const init_top_building_relative_vertical = 10;
  const init_left_building_relative_vertical = -348;

  const img_salir = "http://localhost:3000/salir.png";
  const img_corona = "http://localhost:3000/corona.png";
  const img_caballero_negro = "http://localhost:3000/caballero_negro.png";
  const img_caballero_gris = "http://localhost:3000/caballero_gris.png";
  const img_camino_negro = "http://localhost:3000/camino_negro.png";
  const img_camino_gris = "http://localhost:3000/camino_gris.png";

  // sacamos los datos para saber si hay actualizaciones
  useQuery(
    ["get-state-game"],
    async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL_BACKEND}/game_phases/get_game_state?lobby_id=${codigo_partida}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${Token}`,
          },
        }
      ).then((res_2) => {
        res_2
          .json()
          .then((data) => {
            console.log("JSON de la partida:", data);

            // Si un jugador ya ha conseguido 10 puntos, detengo las iteraciones
            if (data.player_0.victory_points >= 10) {
              setPartidaTerminada(true);
              setNombreGanador(data.player_0.name);
              setIdGanador(data.player_0.id);
              setImgGanador(id_to_img[data.player_0.id]);
            } else if (data.player_1.victory_points >= 10) {
              setPartidaTerminada(true);
              setNombreGanador(data.player_1.name);
              setIdGanador(data.player_1.id);
              setImgGanador(id_to_img[data.player_1.id]);
            } else if (data.player_2.victory_points >= 10) {
              setPartidaTerminada(true);
              setNombreGanador(data.player_2.name);
              setIdGanador(data.player_2.id);
              setImgGanador(id_to_img[data.player_2.id]);
            } else if (data.player_3.victory_points >= 10) {
              setPartidaTerminada(true);
              setNombreGanador(data.player_3.name);
              setIdGanador(data.player_3.id);
              setImgGanador(id_to_img[data.player_3.id]);
            }

            const nuevos_jugadores = [
              data.player_0,
              data.player_1,
              data.player_2,
              data.player_3,
            ];
            setJugadores(nuevos_jugadores);

            // De todos los jugadores saco el que tiene mi mismo id
            const yo = nuevos_jugadores.filter(
              (jugador) => jugador.id === mi_id
            );

            // añadir parametros al json
            const yoyo = {
              ...yo[0],
              codigo_partida: codigo_partida,
              Token: Token,
            };

            setEstado_jugador(yoyo);

            setBoard(data.board.tiles);
            setRoad(data.board.edges);
            setBuilding(data.board.nodes);

            // setTiempo_maximo(data.turn_time);
            setTiempo_maximo(9999999);

            detectar_cambio_fase(data.turn_phase, data.player_turn);
            setTurno(data.player_turn);

            // Si la suma de los dos dados es 7, activo el booleano de colocando_ladron
            // También debe ser mi turno, la fase de RESOURCE_PRODUCTION y que el ladron
            // no haya sido colocado ya
            if (
              data.die_1 + data.die_2 === 7 &&
              data.player_turn === mi_id &&
              data.turn_phase === "RESOURCE_PRODUCTION" &&
              !ladronYaColocado
            ) {
              setColocando_ladron(true);
            }

            // Si recibo del global_info que se está colocando el ladron, lo pongo a true
            if (
              global_info.colocando_ladron &&
              !ladronYaColocado
            ) {
              setColocando_ladron(true);
            }

            // Log de colocando_ladron
            console.log("Colocando ladron:", colocando_ladron);
            console.log("Global info colocando ladron:", global_info.colocando_ladron);

            actualizar_dados(data.die_1, data.die_2);

            // Si la fase no es la de trading o no es mi turno, pongo el booleano
            // realizando_intercambio a false
            if (data.turn_phase !== "TRADING" || data.player_turn !== mi_id) {
              global_info.realizando_intercambio = false;
              global_info.cantidad_ofrecida = 0;
              global_info.fase_intercambio = 0;
            }

            // Si el turno coincide con mi id y tengo ambos permisos a
            // false, activo el permiso de construir aldeas
            if (
              data.player_turn === mi_id &&
              !puedo_colocar_aldea &&
              !puedo_colocar_carretera &&
              (data.turn_phase === "INITIAL_TURN1" ||
                data.turn_phase === "INITIAL_TURN2")
            ) {
              setPuedo_colocar_aldea(true);
            }

            // Si no es mi turno, desactivo los permisos de construir
            // aldeas y carreteras
            if (data.player_turn !== mi_id) {
              setPuedo_colocar_aldea(false);
              setPuedo_colocar_carretera(false);
            }

            // Si la fase ya no es "INITIAL_TURN2" o "INITIAL_TURN2", pongo
            // el booleano de aldeas_iniciales_colocadas a true
            if (
              data.turn_phase !== "INITIAL_TURN1" &&
              data.turn_phase !== "INITIAL_TURN2"
            ) {
              setAldeas_iniciales_colocadas(true);
            }

            setPosicion_ladron(data.thief_position);

            // comprobamos si estamos en la fase 0 del juego ? casas vacias false : true
            setFase_actual(data.turn_phase);
            if (
              data.turn_phase === "INITIAL_TURN1" ||
              data.turn_phase === "INITIAL_TURN2"
            ) {
              setAldeas_iniciales_colocadas(false);
            } else {
              setAldeas_iniciales_colocadas(true);
            }

            // sacamos los datos de los distintos jugadores que hay en la partida
            // quitamos nuestro usuario de la lista
            const lista_oponentes = jugadores.filter(
              (jugador) => jugador.id != mi_id
            );

            let nueva_lista_imgs_oponentes = [];
            let nueva_lista_puntos_victoria_oponentes = [];
            let nueva_lista_bono_caballeros_oponentes = [];
            let nueva_lista_bono_carreteras_oponentes = [];
            let nuevos_colores_oponentes = [];
            let nuevos_ids_oponentes = [];

            for (let i = 0; i < lista_oponentes.length; i++) {
              const nueva_img_oponente =
                lista_oponentes[i].profile_pic === "default"
                  ? "http://localhost:3000/fotos_perfil/skin1.png"
                  : `http://localhost:3000/fotos_perfil/${lista_oponentes[i].profile_pic}.png`;

              nueva_lista_imgs_oponentes = [
                ...nueva_lista_imgs_oponentes,
                nueva_img_oponente,
              ];

              nueva_lista_puntos_victoria_oponentes = [
                ...nueva_lista_puntos_victoria_oponentes,
                lista_oponentes[i].victory_points,
              ];
              nueva_lista_bono_caballeros_oponentes = [
                ...nueva_lista_bono_caballeros_oponentes,
                lista_oponentes[i].has_knights_bonus,
              ];
              nueva_lista_bono_carreteras_oponentes = [
                ...nueva_lista_bono_carreteras_oponentes,
                lista_oponentes[i].has_longest_road_bonus,
              ];

              nuevos_colores_oponentes = [
                ...nuevos_colores_oponentes,
                lista_oponentes[i].color,
              ];

              nuevos_ids_oponentes = [
                ...nuevos_ids_oponentes,
                lista_oponentes[i].id,
              ];
            }

            setImgs_oponentes(nueva_lista_imgs_oponentes);
            setPuntos_victoria_oponentes(nueva_lista_puntos_victoria_oponentes);
            setBono_caballeros_oponentes(nueva_lista_bono_caballeros_oponentes);
            setBono_carreteras_oponentes(nueva_lista_bono_carreteras_oponentes);
            setColores_oponentes(nuevos_colores_oponentes);
            setIdsOponentes(nuevos_ids_oponentes);

            let array_skins_jugadores_poblados = [null, null, null, null];
            let array_skins_jugadores_carreteras = [null, null, null, null];
            let array_skins_jugadores_ciudades = [null, null, null, null];
            let nuevo_usuario_to_color = [null, null, null, null, null];

            // Obtenemos de todos los jugadores sus skins y sus colores
            for (let i = 0; i < jugadores.length; i++) {
              const url_skin_poblado =
                "http://localhost:3000/poblado/" +
                jugadores[i].color +
                "/" +
                jugadores[i].selected_pieces_skin +
                ".png";
              array_skins_jugadores_poblados[i] = url_skin_poblado;

              const url_skin_carretera =
                "http://localhost:3000/carreteras/" +
                jugadores[i].color +
                "/" +
                jugadores[i].selected_pieces_skin +
                ".png";
              array_skins_jugadores_carreteras[i] = url_skin_carretera;

              const url_skin_ciudad =
                "http://localhost:3000/ciudad/" +
                jugadores[i].color +
                "/" +
                jugadores[i].selected_pieces_skin +
                ".png";
              array_skins_jugadores_ciudades[i] = url_skin_ciudad;

              // Indico mi indice
              if (jugadores[i].id === mi_id) {
                setMi_indice(i);
                setMi_color(jugadores[i].color);
              }

              // Indico el color de cada jugador
              nuevo_usuario_to_color[color_to_codigo(jugadores[i].color)] = i;

              id_to_img[jugadores[i].id] =
                jugadores[i].profile_pic === "default"
                  ? "http://localhost:3000/fotos_perfil/skin1.png"
                  : `http://localhost:3000/fotos_perfil/${lista_oponentes[i].profile_pic}.png`;
            }

            setSkins_jugadores_poblados(array_skins_jugadores_poblados);
            setSkins_jugadores_carreteras(array_skins_jugadores_carreteras);
            setSkins_jugadores_ciudades(array_skins_jugadores_ciudades);
            setUsuario_to_color(nuevo_usuario_to_color);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
      return 1;
    },
    {
      refetchInterval: 1000,
      // refetchUntil: (data) => data !== null,
      // enabled: partidaEmpezada,
    }
  );

  // Si es mi turno, obtengo del backend las carreteras legales y las casas
  useQuery(
    ["get-legal-building-nodes"],
    async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL_BACKEND}/get-legal-building-nodes?lobby_id=${codigo_partida}&&color=${mi_color}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${Token}`,
          },
        }
      ).then((res_2) => {
        res_2
          .json()
          .then((data) => {
            setCasas_legales(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });

      const res_2 = await fetch(
        `${process.env.REACT_APP_URL_BACKEND}/get-legal-building-edges?lobby_id=${codigo_partida}&&color=${mi_color}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${Token}`,
          },
        }
      ).then((res_2) => {
        res_2
          .json()
          .then((data) => {
            setCarretera_legales(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });

      return 1;
    },
    {
      refetchInterval: 1000,
      // refetchUntil: (data) => data !== null,
      // enabled: partidaEmpezada,
    }
  );

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// FUNCIONES /////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  // funcion que detecta si se ha cambiado de fase, compara la fase actual con
  // la que se le pasa por parametro y hace las operaciones que correspondan
  // si la fase actual es distinta a la que se le pasa por parametro
  function detectar_cambio_fase(fase, nuevo_turno) {
    if (fase_actual !== fase || nuevo_turno === mi_id) {

      if (fase !== fase_actual) {
        setColocando_ladron(false);
        global_info.colocando_ladron = false;
      }

      setFase_actual(fase);
      if (fase === "RESOURCE_PRODUCTION") {
        if (nuevo_turno === mi_id) {
          // mostramos la pop up de tirar los dados s
          setShowPopupFaseTirada(true);
          setShowPopupFaseNegociacion(false);

          // Log de ambas fases
          if (fase_actual !== fase) {
            console.log("Fase actual:", fase_actual);
            console.log("Fase nueva:", fase);

            setLadronYaColocado(false);
          }
        } else {
          // TODO: Esperar a que el backend me diga qué ha salido
          setShowPopupFaseTirada(false);
          setShowPopupFaseNegociacion(false);
        }
      } else if (fase === "TRADING") {
        // TODO: hacer que se muestre el popup de trading
        setShowPopupFaseTirada(false);
        setShowPopupFaseNegociacion(true);
      } else if (fase === "BUILDING") {
        // Doy permiso para construir carreteras y aldeas
        setShowPopupFaseTirada(false);
        setShowPopupFaseNegociacion(false);
        setPuedo_colocar_aldea(true);
        setPuedo_colocar_carretera(true);

        // TODO: implementar lo de mejorar aldeas a ciudades
      }
    }
  }

  function avanzar_fase() {
    // Hago la llamada al backend para que avance la fase
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/game_phases/advance_phase?lobby_id=${codigo_partida}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Token}`,
        },
      }
    ).then((res) => {
      res
        .json()
        .then((data) => { })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  function construir_poblado(coordenada) {
    if (!aldeas_iniciales_colocadas) {
      // Aviso al backend de que ya he colocado lo mío
      fetch(
        `${process.env.REACT_APP_URL_BACKEND}/build-village?node=${coordenada}`,
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
            console.log("Intento de colocar aldea:", data);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setUltima_aldea_construida(ultima_aldea_construida + 1);

      setPuedo_colocar_aldea(false);
      setPuedo_colocar_carretera(true);
    } else {
      // Aviso al backend de que compro y coloco una aldea con una petición get

      // Ejemplo de url:
      // http://localhost:8000/game_phases/buy_and_build_village?lobby_id=45&coord=45

      fetch(
        `${process.env.REACT_APP_URL_BACKEND}/game_phases/buy_and_build_village?lobby_id=${codigo_partida}&coord=${coordenada}`,
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
            console.log("Intento de colocar aldea:", data);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  // Función que permite colocar 2 carreteras seguidas
  function carta_carreteras() {
    setUsandoCartaCarreteras(true);
  }

  function construir_carretera(coordenada) {
    if (usandoCartaCarreteras) {
      // Aviso al backend de que ya he colocado lo mío
      fetch(
        `${process.env.REACT_APP_URL_BACKEND}/build-road?edge=${coordenada}`,
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
            console.log("Intento de colocar carretera:", data);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setCartasCarreteraColocadas(cartasCarreteraColocadas + 1);

      if (cartasCarreteraColocadas === 2) {
        setUsandoCartaCarreteras(false);
        setCartasCarreteraColocadas(0);
      }
    } else if (!aldeas_iniciales_colocadas) {
      fetch(
        `${process.env.REACT_APP_URL_BACKEND}/build-road?edge=${coordenada}`,
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
            console.log("Intento de colocar carretera:", data);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setPuedo_colocar_carretera(false);

      avanzar_fase();
    } else {
      // Aviso al backend de que compro y coloco una carretera con una petición get

      // Ejemplo de url:
      // http://localhost:8000/game_phases/buy_and_build_road?lobby_id=45&coord=45

      fetch(
        `${process.env.REACT_APP_URL_BACKEND}/game_phases/buy_and_build_road?lobby_id=${codigo_partida}&coord=${coordenada}`,
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
            console.log("Intento de colocar carretera:", data);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  // Función para construir una ciudad
  function construir_ciudad(coordenada) {
    // Ejemplo url:
    // http://localhost:8000/game_phases/buy_and_build_city?lobby_id=23&coord=32

    const url = `${process.env.REACT_APP_URL_BACKEND}/game_phases/buy_and_build_city?lobby_id=${codigo_partida}&coord=${coordenada}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        res.json().then((data) => {
          console.log("Intento de colocar ciudad:", data);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function actualizar_dados(die1, die2) {
    // Si uno de los dados es 0, lo pongo a 1 o a 2 respectivamente
    if (die1 === 0) {
      die1 = 1;
    }
    if (die2 === 0) {
      die2 = 2;
    }

    // Actualizo las imagenes de los dadso con los números pasados por parámetro
    const nuevaImagen = `http://localhost:3000/dados/dado_${die1}.png`;
    setImg_dado_1(nuevaImagen);

    const nuevaImagen2 = `http://localhost:3000/dados/dado_${die2}.png`;
    setImg_dado_2(nuevaImagen2);
  }

  function color_to_hex(color) {
    if (color === "YELLOW") {
      return "#ffcf40";
    } else if (color === "BLUE") {
      return "#006db0";
    } else if (color === "GREEN") {
      return "#00a86b";
    } else {
      return "#9d2933";
    }
  }

  function color_to_hex(color) {
    if (color === "YELLOW") {
      return "#ffcf40";
    } else if (color === "BLUE") {
      return "#006db0";
    } else if (color === "GREEN") {
      return "#00a86b";
    } else {
      return "#9d2933";
    }
  }

  const [usuario_to_color, setUsuario_to_color] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

  function color_to_codigo(color) {
    if (color === "RED") {
      return 1;
    } else if (color === "BLUE") {
      return 2;
    } else if (color === "GREEN") {
      return 3;
    } else {
      return 4;
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  ///////////////////////////// FETCHS INICIALES /////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    ///////////////////////// FETCH DE LA PARTIDA //////////////////////////

    const url_partida = `${process.env.REACT_APP_URL_BACKEND}/create-test-lobby`;

    const res = fetch(
      `${process.env.REACT_APP_URL_BACKEND}/get-lobby-from-player`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Token}`,
        },
      }
    ).then((res) => {
      res
        .json()
        .then((data) => {
          // sacamos el id de la partida con el que vamos a estar trabajando
          setCodigo_partida(data.id);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }, [Token, json_token.id, mi_id]);

  ////////////////////////////////////////////////////////////////////////////
  ///////////////////////////// FETCH PERIODICO //////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const interval = setInterval(() => {
      ///////////////////////// CÓDIGO PERIODICO /////////////////////////

      if (aldeas_iniciales_colocadas && !partidaTerminada) {
        // Si no es mi turno, pongo el tiempo a 0, si no, lo actualizo
        if (turno !== mi_id) {
          setTiempo(0);
        } else {
          const nuevo_tiempo = (tiempo + 1) % (tiempo_maximo + 1);
          setTiempo(nuevo_tiempo);

          if (nuevo_tiempo === 0) {
            // Log
            console.log("Se ha acabado el tiempo del turno");

            // Aviso al backend de que avance la fase
            avanzar_fase();
          }
        }
      } else {
        if (turno == mi_id) {
          if (ultima_aldea_construida < aldea_que_puedo_construir) {
            setPuedo_colocar_aldea(true);

            // Log
            console.log("Puedo colocar aldea");
          }
        } else {
          setPuedo_colocar_aldea(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    tiempo,
    turno,
    aldea_que_puedo_construir,
    ultima_aldea_construida,
    aldeas_iniciales_colocadas,
    partida_empezada,
  ]);

  ////////////////////////////////////////////////////////////////////////////
  ///////////////////////////// RETURN PRINCIPAL /////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  return (
    <div
      style={{
        backgroundImage: `url(http://localhost:3000/fondo_mar.jpg)`,
        backgroundSize: "cover",

        height: "100vh",
        width: "100vw",
      }}
    >
      {/************************ MENÚ SUPERIOR *************************/}

      <div className="parte_superior_partida">
        <div className="menu_superior_partida">
          {jugadores.length >= 2 && (
            <div
              className="superior_jugador_1_partida"
              style={{
                backgroundColor: color_to_hex(colores_oponentes[0]),

                // Si eligiendoJugadorRobar está a true, añado un borde blanco
                // alrededor del jugador con un grosor de 5px
                border: eligiendoJugadorRobar ? "5px solid white" : "",
              }}

              onClick={() => {
                if (eligiendoJugadorRobar) {
                  // Log
                  console.log("Click en jugador 1");

                  // log
                  console.log("Intento de mover ladrón");

                  // Ejemplo de url:
                  // https://cataninc-back-end-production-4d3e.up.railway.app/game_phases/move_thief?lobby_id=3&stolen_player_id=4&new_thief_position_tile_coord=5

                  const url = `${process.env.REACT_APP_URL_BACKEND
                    }/game_phases/move_thief?lobby_id=${codigo_partida}&stolen_player_id=${idsOponentes[0]}&new_thief_position_tile_coord=${nuevaPosicionLadron}`;

                  // Petición GET para mover el ladrón
                  fetch(url, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization: `Bearer ${Token}`,
                    },
                  })
                    .then((res) => {
                      res.json().then((data) => {
                        console.log("Intento de mover ladrón:", data);
                      });
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });

                    setEligiendoJugadorRobar(false);
                }
              }
              }
            >
              <img
                src={imgs_oponentes[0]}
                className="icono_jugador_superior"
                alt="icono_jugadores"
              />

              <img
                src={img_corona}
                className="icono_jugador_superior"
                alt="icono_jugadores"
              />

              {
                // Muestro los puntos de victoria del jugador 1
                <div className="puntos_victoria_jugador_1">
                  {puntos_victoria_oponentes[0]}
                </div>
              }

              {bono_caballeros_oponentes[0] ? (
                <img
                  src={img_caballero_negro}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              ) : (
                <img
                  src={img_caballero_gris}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              )}

              {bono_carreteras_oponentes[0] ? (
                <img
                  src={img_camino_negro}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              ) : (
                <img
                  src={img_camino_gris}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              )}
            </div>
          )}
          {jugadores.length >= 3 && (
            <div
              className="superior_jugador_2_partida"
              style={{
                backgroundColor: color_to_hex(colores_oponentes[1]),

                // Si eligiendoJugadorRobar está a true, añado un borde blanco
                // alrededor del jugador con un grosor de 5px
                border: eligiendoJugadorRobar ? "5px solid white" : "",
              }}

              onClick={() => {
                if (eligiendoJugadorRobar) {
                  // Log
                  console.log("Click en jugador 1");

                  // log
                  console.log("Intento de mover ladrón");

                  // Ejemplo de url:
                  // https://cataninc-back-end-production-4d3e.up.railway.app/game_phases/move_thief?lobby_id=3&stolen_player_id=4&new_thief_position_tile_coord=5

                  const url = `${process.env.REACT_APP_URL_BACKEND
                    }/game_phases/move_thief?lobby_id=${codigo_partida}&stolen_player_id=${idsOponentes[1]}&new_thief_position_tile_coord=${nuevaPosicionLadron}`;

                  // Petición GET para mover el ladrón
                  fetch(url, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization: `Bearer ${Token}`,
                    },
                  })
                    .then((res) => {
                      res.json().then((data) => {
                        console.log("Intento de mover ladrón:", data);
                      });
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });

                    setEligiendoJugadorRobar(false);
                }
              }}
            >
              <img
                src={imgs_oponentes[1]}
                className="icono_jugador_superior"
                alt="icono_jugadores"
              />

              <img
                src={img_corona}
                className="icono_jugador_superior"
                alt="icono_jugadores"
              />

              {
                // Muestro los puntos de victoria del jugador 1
                <div className="puntos_victoria_jugador_2">
                  {puntos_victoria_oponentes[1]}
                </div>
              }

              {bono_caballeros_oponentes[1] ? (
                <img
                  src={img_caballero_negro}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              ) : (
                <img
                  src={img_caballero_gris}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              )}

              {bono_carreteras_oponentes[1] ? (
                <img
                  src={img_camino_negro}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              ) : (
                <img
                  src={img_camino_gris}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              )}
            </div>
          )}
          {jugadores.length === 4 && (
            <div
              className="superior_jugador_3_partida"
              style={{
                backgroundColor: color_to_hex(colores_oponentes[2]),

                // Si eligiendoJugadorRobar está a true, añado un borde blanco
                // alrededor del jugador con un grosor de 5px
                border: eligiendoJugadorRobar ? "5px solid white" : "",
              }}

              onClick={() => {
                if (eligiendoJugadorRobar) {
                  // Log
                  console.log("Click en jugador 1");

                  // log
                  console.log("Intento de mover ladrón");

                  // Ejemplo de url:
                  // https://cataninc-back-end-production-4d3e.up.railway.app/game_phases/move_thief?lobby_id=3&stolen_player_id=4&new_thief_position_tile_coord=5

                  const url = `${process.env.REACT_APP_URL_BACKEND
                    }/game_phases/move_thief?lobby_id=${codigo_partida}&stolen_player_id=${idsOponentes[2]}&new_thief_position_tile_coord=${nuevaPosicionLadron}`;

                  // Petición GET para mover el ladrón
                  fetch(url, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization: `Bearer ${Token}`,
                    },
                  })
                    .then((res) => {
                      res.json().then((data) => {
                        console.log("Intento de mover ladrón:", data);
                      });
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });

                    setEligiendoJugadorRobar(false);
                }
              }}
            >
              <img
                src={imgs_oponentes[2]}
                className="icono_jugador_superior"
                alt="icono_jugadores"
              />

              <img
                src={img_corona}
                className="icono_jugador_superior"
                alt="icono_jugadores"
              />

              {
                // Muestro los puntos de victoria del jugador 1
                <div className="puntos_victoria_jugador_3">
                  {puntos_victoria_oponentes[2]}
                </div>
              }

              {bono_caballeros_oponentes[2] ? (
                <img
                  src={img_caballero_negro}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              ) : (
                <img
                  src={img_caballero_gris}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              )}

              {bono_carreteras_oponentes[2] ? (
                <img
                  src={img_camino_negro}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              ) : (
                <img
                  src={img_camino_gris}
                  className="icono_jugador_superior"
                  alt="icono_jugadores"
                />
              )}
            </div>
          )}
          <img
            src={img_salir}
            className="icono_salir"
            alt="salir"
            onClick={() =>
              (window.location.href = "http://localhost:3000/home")
            }
          />
        </div>

        <div className="contador_tiempo_partida"></div>

        <div
          className="tiempo_partida"
          style={{
            width: `${(tiempo / tiempo_maximo) * 100}%`,
          }}
        ></div>
      </div>

      {/************************* MENÚ LATERAL *************************/}

      <div
        style={{
          position: "absolute",
          top: "120px",
          height: "calc(100% - 120px)",
          left: "0",
          width: "25%",
          backgroundColor: "blue",
        }}
      >
        <Tabs jugador_datos={estado_jugador} turno={turno} mi_id={mi_id} fase={fase_actual} />
      </div>

      {/************************** HEXAGONOS ***************************/}

      <div
        style={{
          position: "absolute",
          top: "120px",
          height: "calc(100% - 120px)",
          left: "25%",
          width: "75%",
        }}
      >
        {Object.entries(board).map(([key], index) => {
          return (
            <div key={key}>
              {
                <button
                  className="w-36 flex h-40 hexagono_partida"
                  style={{
                    position: "absolute",
                    top:
                      init_top_board -
                      top_variation_board[index] * top_variation_unit,
                    left: "50%",
                    transform: `translateX(${init_left_board +
                      left_variation_board[index] * left_variation_unit
                      }px)`,

                    backgroundImage: `url(${ficha_con_id[board[key][1]]})`,
                    color: `${board[key][0] === 6 || board[key][0] === 8
                      ? "red"
                      : "white"
                      }`,
                  }}
                  onClick={() => {
                    // log
                    console.log("Has pulsado el hexágono", key);

                    // Si se está colocando el ladrón, hago la llamada al backend para indicar la nueva posición
                    // del ladrón
                    if (colocando_ladron || global_info.colocando_ladron) {

                      // Desactivo el booleano de colocando_ladron
                      setColocando_ladron(false);
                      global_info.colocando_ladron = false;

                      setLadronYaColocado(true);
                      setEligiendoJugadorRobar(true);
                      setNuevaPosicionLadron(parseInt(key));
                    }
                  }}
                >
                  {board[key][0] !== 0 && board[key][0]}
                </button>
              }

              {/* Ladrón */}
              {/* NOTA: NO CAMBIAR EL == POR ===, SI NO NO FUNCIONA */}
              {key == posicion_ladron && (
                <img
                  src={"http://localhost:3000/ladron.png"}
                  alt="ladron"
                  style={{
                    position: "absolute",
                    top:
                      init_top_board +
                      top_variation_ladron -
                      top_variation_board[index] * top_variation_unit,
                    left: "50%",
                    transform: `translateX(${init_left_board +
                      left_variation_ladron +
                      left_variation_board[index] * left_variation_unit
                      }px)`,
                    width: "100px",
                    height: "100px",
                  }}
                />
              )}

            </div>
          );
        })}

        {/************************** CARRETERAS **************************/}

        {Object.entries(road).map(([key, value], index) => {
          var permiso_construccion =
            puedo_colocar_carretera &&
            Array.isArray(carretera_legales) &&
            carretera_legales.includes(parseInt(key));

          return (
            <div key={key}>
              {type_road[index] === 0 &&
                (road[key] != null || permiso_construccion) && (
                  <button
                    className={`w-20 flex h-5 ${road[key] != null
                      ? "carretera_partida"
                      : "carretera_sin_comprar_partida"
                      }`}
                    style={{
                      position: "absolute",
                      top:
                        init_top_board +
                        init_top_road_relative_vertical -
                        top_variation_road[index] * top_variation_unit,
                      left: "50%",
                      transform: `translateX(${init_left_board +
                        init_left_road_relative_vertical +
                        left_variation_road[index] * left_variation_unit
                        }px) rotate(90deg)`,

                      backgroundImage: `url( ${road[key] != null
                        ? `${skins_jugadores_carreteras[
                        usuario_to_color[road[key]]
                        ]
                        }`
                        : `${skins_jugadores_carreteras[mi_indice]}`
                        } )`,
                    }}
                    onClick={() => {
                      construir_carretera(key);
                    }}
                  />
                )}

              {type_road[index] === 1 &&
                (road[key] != null || permiso_construccion) && (
                  <button
                    className={`w-20 flex h-5 ${road[key] != null
                      ? "carretera_partida"
                      : "carretera_sin_comprar_partida"
                      }`}
                    style={{
                      position: "absolute",
                      top:
                        init_top_board +
                        init_top_road_relative_ascend -
                        top_variation_road[index] * top_variation_unit,
                      left: "50%",
                      transform: `translateX(${init_left_board +
                        init_left_road_relative_ascend +
                        left_variation_road[index] * left_variation_unit
                        }px) rotate(-30deg)`,

                      backgroundImage: `url( ${road[key] != null
                        ? `${skins_jugadores_carreteras[
                        usuario_to_color[road[key]]
                        ]
                        }`
                        : `${skins_jugadores_carreteras[mi_indice]}`
                        } )`,
                    }}
                    onClick={() => {
                      construir_carretera(key);
                    }}
                  />
                )}

              {type_road[index] === 2 &&
                (road[key] != null || permiso_construccion) && (
                  <button
                    className={`w-20 flex h-5 ${road[key] != null
                      ? "carretera_partida"
                      : "carretera_sin_comprar_partida"
                      }`}
                    style={{
                      position: "absolute",
                      top:
                        init_top_board +
                        init_top_road_relative_descend -
                        top_variation_road[index] * top_variation_unit,
                      left: "50%",
                      transform: `translateX(${init_left_board +
                        init_left_road_relative_descend +
                        left_variation_road[index] * left_variation_unit
                        }px) rotate(30deg)`,

                      backgroundImage: `url( ${road[key] != null
                        ? `${skins_jugadores_carreteras[
                        usuario_to_color[road[key]]
                        ]
                        }`
                        : `${skins_jugadores_carreteras[mi_indice]}`
                        } )`,
                    }}
                    onClick={() => {
                      construir_carretera(key);
                    }}
                  />
                )}
            </div>
          );
        })}
        {/************************** PUERTOS **************************/}

        <button
          className="w-36 flex h-40 hexagono_partida"
          style={{
            position: "absolute",
            top: init_top_board - -1 * top_variation_unit,
            left: "50%",
            transform: `translateX(${init_left_board + -5 * left_variation_unit
              }px) rotate(-60deg)`,

            backgroundImage: `url(http://localhost:3000/casillas/puertos/puerto_arcilla.png)`,
          }}
          onClick={() => {
            if (turno == mi_id && fase_actual === "TRADING") {
              // Solo permito el intercambio si tengo una construcción en el
              // nodo 33 o 48
              if (
                building["67"][0] === color_to_codigo(mi_color) ||
                building["82"][0] === color_to_codigo(mi_color)
              ) {
                global_info.realizando_intercambio = true;
                global_info.fase_intercambio = 1;
                global_info.cantidad_ofrecida = 2;
                global_info.recurso_ofrecido = "CLAY";
              }
            }
          }}
        />

        <button
          className="w-36 flex h-40 hexagono_partida"
          style={{
            position: "absolute",
            top: init_top_board - 1 * top_variation_unit,
            left: "50%",
            transform: `translateX(${init_left_board + -5 * left_variation_unit
              }px) rotate(-60deg)`,

            backgroundImage: `url(http://localhost:3000/casillas/puertos/puerto_madera.png)`,
          }}
          onClick={() => {
            if (turno == mi_id && fase_actual === "TRADING") {
              if (
                building["37"][0] === color_to_codigo(mi_color) ||
                building["52"][0] === color_to_codigo(mi_color)
              ) {
                global_info.realizando_intercambio = true;
                global_info.fase_intercambio = 1;
                global_info.cantidad_ofrecida = 2;
                global_info.recurso_ofrecido = "WOOD";
              }
            }
          }}
        />

        <button
          className="w-36 flex h-40 hexagono_partida"
          style={{
            position: "absolute",
            top: init_top_board - 3 * top_variation_unit,
            left: "50%",
            transform: `translateX(${init_left_board + 1 * left_variation_unit
              }px) rotate(60deg)`,

            backgroundImage: `url(http://localhost:3000/casillas/puertos/puerto_trigo.png)`,
          }}
          onClick={() => {
            if (turno == mi_id && fase_actual === "TRADING") {
              if (
                building["90"][0] === color_to_codigo(mi_color) ||
                building["107"][0] === color_to_codigo(mi_color)
              ) {
                global_info.realizando_intercambio = true;
                global_info.fase_intercambio = 1;
                global_info.cantidad_ofrecida = 2;
                global_info.recurso_ofrecido = "WHEAT";
              }
            }
          }}
        />

        <button
          className="w-36 flex h-40 hexagono_partida"
          style={{
            position: "absolute",
            top: init_top_board - 2 * top_variation_unit,
            left: "50%",
            transform: `translateX(${init_left_board + 4 * left_variation_unit
              }px) rotate(60deg)`,

            backgroundImage: `url(http://localhost:3000/casillas/puertos/puerto_roca.png)`,
          }}
          onClick={() => {
            if (turno == mi_id && fase_actual === "TRADING") {
              if (
                building["156"][0] === color_to_codigo(mi_color) ||
                building["173"][0] === color_to_codigo(mi_color)
              ) {
                global_info.realizando_intercambio = true;
                global_info.fase_intercambio = 1;
                global_info.cantidad_ofrecida = 2;
                global_info.recurso_ofrecido = "STONE";
              }
            }
          }}
        />

        <button
          className="w-36 flex h-40 hexagono_partida"
          style={{
            position: "absolute",
            top: init_top_board - -3 * top_variation_unit,
            left: "50%",
            transform: `translateX(${init_left_board + 1 * left_variation_unit
              }px) rotate(180deg)`,

            backgroundImage: `url(http://localhost:3000/casillas/puertos/puerto_3.png)`,
          }}
          onClick={() => {
            if (turno == mi_id && fase_actual === "TRADING") {
              if (
                building["165"][0] === color_to_codigo(mi_color) ||
                building["182"][0] === color_to_codigo(mi_color)
              ) {
                global_info.realizando_intercambio = true;
                global_info.fase_intercambio = 0;
                global_info.cantidad_ofrecida = 3;
              }
            }
          }}
        />

        <button
          className="w-36 flex h-40 hexagono_partida"
          style={{
            position: "absolute",
            top: init_top_board - -2 * top_variation_unit,
            left: "50%",
            transform: `translateX(${init_left_board + 4 * left_variation_unit
              }px) rotate(180deg)`,

            backgroundImage: `url(http://localhost:3000/casillas/puertos/puerto_ovejas.png)`,
          }}
          onClick={() => {
            if (turno == mi_id && fase_actual === "TRADING") {
              if (
                building["201"][0] === color_to_codigo(mi_color) ||
                building["218"][0] === color_to_codigo(mi_color)
              ) {
                global_info.realizando_intercambio = true;
                global_info.fase_intercambio = 1;
                global_info.cantidad_ofrecida = 2;
                global_info.recurso_ofrecido = "SHEEP";
              }
            }
          }}
        />

        <button
          className="w-36 flex h-40 hexagono_partida"
          style={{
            position: "absolute",
            top: init_top_board - 0 * top_variation_unit,
            left: "50%",
            transform: `translateX(${init_left_board + 6 * left_variation_unit
              }px) rotate(120deg)`,

            backgroundImage: `url(http://localhost:3000/casillas/puertos/puerto_3.png)`,
          }}
          onClick={() => {
            if (turno == mi_id && fase_actual === "TRADING") {
              if (
                building["205"][0] === color_to_codigo(mi_color) ||
                building["220"][0] === color_to_codigo(mi_color)
              ) {
                global_info.realizando_intercambio = true;
                global_info.fase_intercambio = 0;
                global_info.cantidad_ofrecida = 3;
              }
            }
          }}
        />

        <button
          className="w-36 flex h-40 hexagono_partida"
          style={{
            position: "absolute",
            top: init_top_board - 3 * top_variation_unit,
            left: "50%",
            transform: `translateX(${init_left_board + -3 * left_variation_unit
              }px) rotate(0deg)`,

            backgroundImage: `url(http://localhost:3000/casillas/puertos/puerto_3.png)`,
          }}
          onClick={() => {
            if (turno == mi_id && fase_actual === "TRADING") {
              if (
                building["39"][0] === color_to_codigo(mi_color) ||
                building["56"][0] === color_to_codigo(mi_color)
              ) {
                global_info.realizando_intercambio = true;
                global_info.fase_intercambio = 0;
                global_info.cantidad_ofrecida = 3;
              }
            }
          }}
        />

        <button
          className="w-36 flex h-40 hexagono_partida"
          style={{
            position: "absolute",
            top: init_top_board - -3 * top_variation_unit,
            left: "50%",
            transform: `translateX(${init_left_board + -3 * left_variation_unit
              }px) rotate(-120deg)`,

            backgroundImage: `url(http://localhost:3000/casillas/puertos/puerto_3.png)`,
          }}
          onClick={() => {
            if (turno == mi_id && fase_actual === "TRADING") {
              if (
                building["114"][0] === color_to_codigo(mi_color) ||
                building["131"][0] === color_to_codigo(mi_color)
              ) {
                global_info.realizando_intercambio = true;
                global_info.fase_intercambio = 0;
                global_info.cantidad_ofrecida = 3;
              }
            }
          }}
        />

        {/*************************** POBLADOS ***************************/}

        {Object.entries(building).map(([key, value], index) => {
          var permiso_construccion =
            puedo_colocar_aldea &&
            Array.isArray(casas_legales) &&
            casas_legales.includes(parseInt(key));

          return (
            <div key={key}>
              {
                // miramos las que ya estan construidas y las que podemos construir
                (building[key][1] !== null || permiso_construccion) && (
                  <button
                    className={`w-10 flex h-10 ${building[key][1] != null
                      ? "construccion_partida"
                      : "construccion_sin_comprar_partida"
                      }`}
                    style={{
                      position: "absolute",
                      top:
                        init_top_board +
                        init_top_building_relative_vertical -
                        top_variation_building[index] * top_variation_unit,
                      left: "50%",
                      transform: `translateX(${init_left_board +
                        init_left_building_relative_vertical +
                        left_variation_building[index] * left_variation_unit
                        }px)`,
                      // id | indiceColumna -> si id === 0[jugador ] -> id === 1 [tipo_construccion]
                      backgroundImage: `url( ${building[key][1] !== null
                        ? `${building[key][1] === 1
                          ? skins_jugadores_poblados[
                          usuario_to_color[building[key][0]]
                          ]
                          : "ciudad"
                        }`
                        : `${skins_jugadores_poblados[mi_indice]}`
                        } )`,
                    }}
                    onClick={() => {
                      // Si en la casilla hay una aldea, la mejoro a ciudad, si no, construyo una aldea
                      if (building[key][1] === 1) {
                        construir_ciudad(key);
                      }
                      if (building[key][1] === null) {
                        construir_poblado(key);
                      }
                    }}
                  />
                )
              }
            </div>
          );
        })}
      </div>

      {/************************** OTRAS COSAS *************************/}

      <h1
        style={{
          position: "absolute",
          left: "50%",
        }}
      >
        {"Fase: " + fase_actual}
      </h1>

      <h1
        style={{
          position: "absolute",
          left: "28%",
          top: "150px",

          fontSize: "50px",
          fontWeight: "bold",
        }}
      >
        {turno == mi_id &&
          // Si estoy realizando un intercambio en fase 0, muestro el mensaje
          // "Seleccione el recurso que ofrece", si estoy en fase 1, muestro el
          // mensaje "Seleccione el recurso que pide". Si no estoy realizando
          // ningún intercambio, muestro el mensaje "¡Tu turno!"
          (global_info.realizando_intercambio
            ? global_info.fase_intercambio === 0
              ? "Seleccione el recurso que ofrece"
              : "Seleccione el recurso que pide"
            : "¡Tu turno!")}
      </h1>

      {/* Div donde se encuentra el botón de 4x1 */}
      {turno === mi_id && fase_actual === "TRADING" && (
        <div
          className="scale-75"
          style={{
            position: "absolute",
            left: "27%",
            bottom: "125px",

            // Marco blanco y fondo gris
            // border: "5px solid white",
            //backgroundColor: "grey",
          }}
        >
          <button
            style={{
              width: "170px",
              height: "80px",
            }}
            onClick={() => {
              // Si es nuestro turno y es la fase de intercambio, indicamos el
              // intercambio y el tipo de intercambio
              // if (turno == mi_id && fase_actual === "TRADING") {
              global_info.realizando_intercambio = true;
              global_info.cantidad_ofrecida = 4;
              // } else {
              //   toast.error("Solo haceptado en la fase de TRADING!!");
              // }

              // carta_carreteras();
            }}
          >
            <img src="http://localhost:3000/iconos-no-recursos/comerciar-banco.png" />
          </button>
        </div>
      )}

      <img
        src={img_dado_1}
        style={{
          position: "absolute",
          left: "28%",
          bottom: "50px",
          width: "80px",
          height: "80px",
        }}
      />
      <img
        src={img_dado_2}
        style={{
          position: "absolute",
          left: "calc(28% + 100px)",
          bottom: "50px",
          width: "80px",
          height: "80px",
        }}
      />

      <button
        style={{
          backgroundImage: `url(${turno == mi_id && aldeas_iniciales_colocadas
            ? "http://localhost:3000/skips/skip_on.png"
            : "http://localhost:3000/skips/skip_off.png"
            })`,
          backgroundSize: "cover",
          position: "absolute",
          right: "80px",
          top: "170px",
          width: "80px",
          height: "80px",
        }}
        onClick={() => {
          setTiempo(1);
          avanzar_fase();
        }}
      />

      <PopupTablaCostes />

      {/* <PopUpCartasDesarrollo
        token={Token}
        lobby={codigo_partida}
      /> */}

      {turno === mi_id && fase_actual === "RESOURCE_PRODUCTION" && (
        <PopUpFaseTirada
          show={ShowPopupFaseTirada}
          token={Token}
          lobby={codigo_partida}
        />
      )}

      {/* ---------------------- Negociar con otros jugadores ------------------- */}
      {turno === mi_id && fase_actual === "TRADING" && (
        <PopUpFaseNegociacion
          //show={ShowPopupFaseNegociacion}
          token={Token}
          lobby={codigo_partida}
          jugador_datos={estado_jugador}
        />
      )}

      {turno === mi_id && fase_actual === "BUILDING" && (
        <PopUpFaseCompra token={Token} lobby={codigo_partida} />
      )}

      {partidaTerminada && (
        <PopUpFinPartida
          token={Token}
          lobby={codigo_partida}
          nombreGanador={nombreGanador}
          idGanador={idGanador}
          imgGanador={imgGanador}
          mi_id={mi_id}
        />
      )}
    </div>
  );
}

export default Partida;
export const global_info = {
  // Para los intercambios con el banco
  realizando_intercambio: false,
  cantidad_ofrecida: 0,
  fase_intercambio: 0,
  recurso_ofrecido: "",

  // Para el uso del ladrón
  colocando_ladron: false,
};
