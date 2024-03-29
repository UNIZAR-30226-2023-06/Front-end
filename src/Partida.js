import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Tabs from "./Components/TabComponent/Tabs";
import PopUpOferta from "./pop-up-oferta";
import PopUpFaseTirada from "./pop-up-Fase-tirada";
import PopupTablaCostes from "./pop-up-TablaCostes";
import PopUpFaseCompra from "./pop-up-FaseCompra";
import PopUpFinPartida from "./pop-up-partida-terminada";
import PopUpCartasDesarrollo from "./pop-up-Cartas-desarrollo";
import PopUpFaseNegociacion from "./pop-up-FaseNegociacion";
// 1-- Importamos useCookies y jwt_decode
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

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

  const [maxJugadores, setMaxJugadores] = useState(0);

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
  const [chat, setChat] = useState([]);

  const [partida_empezada, setPartida_empezada] = useState(false);
  const [fase_actual, setFase_actual] = useState("");

  const [cartasCarreteraColocadas, setCartasCarreteraColocadas] = useState(0);

  const [skins_jugadores_poblados, setSkins_jugadores_poblados] = useState([]);
  const [skins_jugadores_carreteras, setSkins_jugadores_carreteras] = useState(
    []
  );
  const [skins_jugadores_ciudades, setSkins_jugadores_ciudades] = useState([]);
  const [skinMarFondo, setSkinMarFondo] = useState("");

  const [colores_oponentes, setColores_oponentes] = useState([]);
  const [mi_color, setMi_color] = useState("");
  const [coloresJugadores, setColoresJugadores] = useState([]);

  const [aldeas_iniciales_colocadas, setAldeas_iniciales_colocadas] =
    useState(false);
  const [puedo_colocar_aldea, setPuedo_colocar_aldea] = useState(false);
  const [puedo_colocar_carretera, setPuedo_colocar_carretera] = useState(false);
  const [aldea_que_puedo_construir, setAldea_que_puedo_construir] = useState(1);
  const [ultima_aldea_construida, setUltima_aldea_construida] = useState(0);

  const [img_dado_1, setImg_dado_1] = useState(
    `${process.env.REACT_APP_URL_FRONTED}/dados/dado_1.png`
  );

  const [img_dado_2, setImg_dado_2] = useState(
    `${process.env.REACT_APP_URL_FRONTED}/dados/dado_2.png`
  );

  const [casas_legales, setCasas_legales] = useState([]);
  const [carretera_legales, setCarretera_legales] = useState([]);

  const [coloresAlrededorLadron, setColoresAlrededorLadron] = useState([]);
  const [indicesAlrededorLadron, setIndicesAlrededorLadron] = useState([]);

  const [ladronHabilitado, setLadronHabilitado] = useState(true);

  const ficha_con_id = [
    null,
    `${process.env.REACT_APP_URL_FRONTED}/casillas/madera.jpg`,
    `${process.env.REACT_APP_URL_FRONTED}/casillas/arcilla.jpg`,
    `${process.env.REACT_APP_URL_FRONTED}/casillas/ovejas.jpg`,
    `${process.env.REACT_APP_URL_FRONTED}/casillas/roca.jpg`,
    `${process.env.REACT_APP_URL_FRONTED}/casillas/trigo.jpg`,
    `${process.env.REACT_APP_URL_FRONTED}/casillas/desierto.jpg`,
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

  const [intercambios, setIntercambios] = useState([]);
  const [tenemosIntercambios, setTenemosIntercambios] = useState(false);

  const [aQuienPuedoColocarLadron] = useState([false, false, false]);

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
    0, 0, 1,
    1, 2, 2, 0,
    1, 2, 3, -1, -1, 0, 0, 1, 1, 2, 2, -1, 0, 1, 2, 3, -2,
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

  const img_salir = `${process.env.REACT_APP_URL_FRONTED}/salir.png`;
  const img_corona = `${process.env.REACT_APP_URL_FRONTED}/corona.png`;
  const img_caballero_negro = `${process.env.REACT_APP_URL_FRONTED}/caballero_negro.png`;
  const img_caballero_gris = `${process.env.REACT_APP_URL_FRONTED}/caballero_gris.png`;
  const img_camino_negro = `${process.env.REACT_APP_URL_FRONTED}/camino_negro.png`;
  const img_camino_gris = `${process.env.REACT_APP_URL_FRONTED}/camino_gris.png`;



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

            const maximo_jugadores = data.max_players;
            setMaxJugadores(data.max_players);

            for (let i = 0; i < maximo_jugadores; i++) {
              if (data[`player_${i}`].victory_points >= data.victory_points_to_win) {
                setPartidaTerminada(true);
                setNombreGanador(data[`player_${i}`].name);
                setIdGanador(data[`player_${i}`].id);
                setImgGanador(id_to_img[data[`player_${i}`].id]);
              }
            }

            let nuevos_jugadores = [];
            for (let i = 0; i < maximo_jugadores; i++) {
              let player = "player_" + i;
              nuevos_jugadores = [...nuevos_jugadores, data[player]];
            }

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

            const miSkinMar = yoyo.selected_grid_skin;

            if (miSkinMar === "default") {
              setSkinMarFondo("skin0");
            } else {
              setSkinMarFondo(miSkinMar);
            }

            setBoard(data.board.tiles);
            setRoad(data.board.edges);
            setBuilding(data.board.nodes);

            setTiempo_maximo(data.turn_time);
            //setTiempo_maximo(9999999);

            setChat(data.chat);

            detectar_cambio_fase(data.turn_phase, data.player_turn);
            setTurno(data.player_turn);

            setLadronHabilitado(data.thief_enabled);

            // Si la suma de los dos dados es 7, activo el booleano de colocando_ladron
            // También debe ser mi turno, la fase de RESOURCE_PRODUCTION y que el ladron
            // no haya sido colocado ya
            if (
              data.die_1 + data.die_2 === 7 &&
              data.player_turn === mi_id &&
              data.turn_phase === "RESOURCE_PRODUCTION" &&
              !ladronYaColocado &&
              data.thief_enabled
            ) {
              setColocando_ladron(true);
            }

            // Si no es mi turno o la fase de RESOURCE_PRODUCTION, pongo el booleano
            // ladronYaColocado a false
            if (
              data.player_turn !== mi_id ||
              data.turn_phase !== "RESOURCE_PRODUCTION"
            ) {
              setLadronYaColocado(false);
            }

            // Si recibo del global_info que se está colocando el ladron, lo pongo a true
            if (global_info.colocando_ladron && !ladronYaColocado && data.thief_enabled) {
              setColocando_ladron(true);
            }

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

            setIntercambios(data.trade_requests);

            // Si tenemos intercambios dirigidos a nosotros, activamos el booleano
            // tenemosIntercambios
            let tenemos_intercambios = false;
            for (let i = 0; i < data.trade_requests.length; i++) {
              if (data.trade_requests[i].reciever === mi_id) {
                tenemos_intercambios = true;
              }
            }
            setTenemosIntercambios(tenemos_intercambios);

            // Si no es la fase de TRADING y hay un intercambio en curso, lo cancelo
            if (data.turn_phase !== "TRADING" && data.trade_requests > 0) {
              // Ejemplo url:
              // http://localhost:8000/game_phases/reject_trade?lobby_id=1234&player2_id=1234
              const url_rechazar_intercambio =
                `${process.env.REACT_APP_URL_BACKEND}/game_phases/reject_trade?lobby_id=` +
                codigo_partida +
                "&player2_id=" +
                data.trade_requests[0].sender;

              // Petición get para rechazar el intercambio
              fetch(url_rechazar_intercambio, {
                method: "GET",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${Token}`,
                },
              }).then((res_2) => {
                res_2
                  .json()
                  .then((data) => {
                    console.log("JSON de la partida:", data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              });

            }

            // Imprimo todas las condiciones de:
            // turno !== mi_id && fase_actual === "TRADING" && tenemosIntercambios == true

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

            for (let i = 0; i < maximo_jugadores - 1; i++) {
              const nueva_img_oponente =
                lista_oponentes[i].profile_pic === "default"
                  ? `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/skin1.png`
                  : `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/${lista_oponentes[i].profile_pic}.png`;

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
            for (let i = 0; i < maximo_jugadores; i++) {
              const url_skin_poblado =
                `${process.env.REACT_APP_URL_FRONTED}/poblado/` +
                jugadores[i].color +
                "/" +
                jugadores[i].selected_pieces_skin +
                ".png";
              array_skins_jugadores_poblados[i] = url_skin_poblado;

              const url_skin_carretera =
                `${process.env.REACT_APP_URL_FRONTED}/carreteras/` +
                jugadores[i].color +
                "/default.png";
              array_skins_jugadores_carreteras[i] = url_skin_carretera;

              const url_skin_ciudad =
                `${process.env.REACT_APP_URL_FRONTED}/ciudad/` +
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

              // Añado el id y el color del jugador al diccionario id_to_color
              id_to_color[jugadores[i].id] = jugadores[i].color;

              id_to_img[jugadores[i].id] =
                jugadores[i].profile_pic === "default"
                  ? `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/skin1.png`
                  : `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/${jugadores[i].profile_pic}.png`;
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

          if (fase_actual !== fase) {
            setLadronYaColocado(false);
          }
        } else {
          // TODO: Esperar a que el backend me diga qué ha salido
          setShowPopupFaseTirada(false);
          setShowPopupFaseNegociacion(false);
        }
      } else if (fase === "TRADING") {

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

  function construir_carretera(coordenada) {
    if (global_info.usandoCartaCarreteras) {
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

      if (cartasCarreteraColocadas === 1) {
        global_info.usandoCartaCarreteras = false;
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
    const nuevaImagen = `${process.env.REACT_APP_URL_FRONTED}/dados/dado_${die1}.png`;
    setImg_dado_1(nuevaImagen);

    const nuevaImagen2 = `${process.env.REACT_APP_URL_FRONTED}/dados/dado_${die2}.png`;
    setImg_dado_2(nuevaImagen2);
  }

  function color_to_hex(color) {
    if (color === "YELLOW") {
      return "#FA9820";
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

  // Diccionario que relaciona el id de un jugador con su color
  const [id_to_color, setId_to_color] = useState({});

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

            // Aviso al backend de que avance la fase
            avanzar_fase();
          }
        }
      } else {
        if (turno == mi_id) {
          if (ultima_aldea_construida < aldea_que_puedo_construir) {
            setPuedo_colocar_aldea(true);
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
        //backgroundImage: `url(`${process.env.REACT_APP_URL_FRONTED}/fondo_mar.jpg)`,
        backgroundImage: `url(${process.env.REACT_APP_URL_FRONTED}/skin_mar/${skinMarFondo}.png)`,
        backgroundSize: "cover",

        height: "100vh",
        width: "100vw",
      }}
    >
      {/************************ MENÚ SUPERIOR *************************/}

      <div className="parte_superior_partida">
        <div className="menu_superior_partida">
          {maxJugadores >= 2 && (
            <div
              className="superior_jugador_1_partida"
              style={{
                backgroundColor: color_to_hex(colores_oponentes[0]),

                // Si eligiendoJugadorRobar está a true, añado un borde blanco
                // alrededor del jugador con un grosor de 5px
                border: (eligiendoJugadorRobar || global_info.eligiendoOponenteIntercambiar) ? "5px solid white" : "",
              }}
              // Compruebo si el color de este oponetne está en coloresAlrededorLadron
              // Si es así, hago un log

              onClick={() => {
                let definitivamenteTieneColor = false;
                const colorOponente0 = color_to_codigo(colores_oponentes[0]);
                // Recorro con un for los pares obtenidos para ver si tiene el color del jugador

                if (eligiendoJugadorRobar) {
                  for (let i = 0; i < coloresAlrededorLadron.nodes.length; i++) {
                    if (coloresAlrededorLadron.nodes[i][0] === colorOponente0) {
                      definitivamenteTieneColor = true;
                    }
                  }
                }

                console.log("Los recursos que ofrecemos son", global_info.recursos_ofrecidos);
                console.log("A cambio queremos ", global_info.recursos_pedidos);
                if (definitivamenteTieneColor && eligiendoJugadorRobar) {

                  // Ejemplo de url:
                  // https://cataninc-back-end-production-4d3e.up.railway.app/game_phases/move_thief?lobby_id=3&stolen_player_id=4&new_thief_position_tile_coord=5

                  const url = `${process.env.REACT_APP_URL_BACKEND}/game_phases/move_thief?lobby_id=${codigo_partida}&stolen_player_id=${idsOponentes[0]}&new_thief_position_tile_coord=${nuevaPosicionLadron}`;

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

                else if (global_info.eligiendoOponenteIntercambiar) {
                  // Ejemplo de url:
                  // http://localhost:8000/game_phases/propose_trade?lobby_id=1234&player2_id=1234&wood_amount_p1=5&clay_amount_p1=5&sheep_amount_p1=5&wheat_amount_p1=5&stone_amount_p1=5&wood_amount_p2=5&clay_amount_p2=5&sheep_amount_p2=5&wheat_amount_p2=5&stone_amount_p2=5

                  const url = `${process.env.REACT_APP_URL_BACKEND}/game_phases/propose_trade?lobby_id=${codigo_partida}&player2_id=${idsOponentes[0]}&wood_amount_p1=${global_info.recursos_ofrecidos[1]}&clay_amount_p1=${global_info.recursos_ofrecidos[0]}&sheep_amount_p1=${global_info.recursos_ofrecidos[2]}&wheat_amount_p1=${global_info.recursos_ofrecidos[4]}&stone_amount_p1=${global_info.recursos_ofrecidos[3]}&wood_amount_p2=${global_info.recursos_pedidos[1]}&clay_amount_p2=${global_info.recursos_pedidos[0]}&sheep_amount_p2=${global_info.recursos_pedidos[2]}&wheat_amount_p2=${global_info.recursos_pedidos[4]}&stone_amount_p2=${global_info.recursos_pedidos[3]}`;

                  // Petición POST para hacer el trading
                  fetch(url, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization: `Bearer ${Token}`,
                    },
                  })
                    .then((res) => {
                      res.json().then((data) => {
                        console.log("Intento de trading:", data);
                      });
                    }
                    )
                    .catch((error) => {
                      console.error("Error:", error);
                    });

                  global_info.eligiendoOponenteIntercambiar = false;
                }
              }}
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
          {maxJugadores >= 3 && (
            <div
              className="superior_jugador_2_partida"
              style={{
                backgroundColor: color_to_hex(colores_oponentes[1]),

                // Si eligiendoJugadorRobar está a true, añado un borde blanco
                // alrededor del jugador con un grosor de 5px
                border: (eligiendoJugadorRobar || global_info.eligiendoOponenteIntercambiar) ? "5px solid white" : "",
              }}
              onClick={() => {
                let definitivamenteTieneColor = false;
                const colorOponente0 = color_to_codigo(colores_oponentes[1]);
                // Recorro con un for los pares obtenidos para ver si tiene el color del jugador


                if (eligiendoJugadorRobar) {
                  for (let i = 0; i < coloresAlrededorLadron.nodes.length; i++) {
                    if (coloresAlrededorLadron.nodes[i][0] === colorOponente0) {
                      definitivamenteTieneColor = true;
                    }
                  }
                }

                if (eligiendoJugadorRobar && definitivamenteTieneColor) {

                  // Ejemplo de url:
                  // https://cataninc-back-end-production-4d3e.up.railway.app/game_phases/move_thief?lobby_id=3&stolen_player_id=4&new_thief_position_tile_coord=5

                  const url = `${process.env.REACT_APP_URL_BACKEND}/game_phases/move_thief?lobby_id=${codigo_partida}&stolen_player_id=${idsOponentes[1]}&new_thief_position_tile_coord=${nuevaPosicionLadron}`;

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

                else if (global_info.eligiendoOponenteIntercambiar) {
                  // Ejemplo de url:
                  // http://localhost:8000/game_phases/propose_trade?lobby_id=1234&player2_id=1234&wood_amount_p1=5&clay_amount_p1=5&sheep_amount_p1=5&wheat_amount_p1=5&stone_amount_p1=5&wood_amount_p2=5&clay_amount_p2=5&sheep_amount_p2=5&wheat_amount_p2=5&stone_amount_p2=5

                  const url = `${process.env.REACT_APP_URL_BACKEND}/game_phases/propose_trade?lobby_id=${codigo_partida}&player2_id=${idsOponentes[1]}&wood_amount_p1=${global_info.recursos_ofrecidos[1]}&clay_amount_p1=${global_info.recursos_ofrecidos[0]}&sheep_amount_p1=${global_info.recursos_ofrecidos[2]}&wheat_amount_p1=${global_info.recursos_ofrecidos[4]}&stone_amount_p1=${global_info.recursos_ofrecidos[3]}&wood_amount_p2=${global_info.recursos_pedidos[1]}&clay_amount_p2=${global_info.recursos_pedidos[0]}&sheep_amount_p2=${global_info.recursos_pedidos[2]}&wheat_amount_p2=${global_info.recursos_pedidos[4]}&stone_amount_p2=${global_info.recursos_pedidos[3]}`;

                  // Petición POST para hacer el trading
                  fetch(url, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization: `Bearer ${Token}`,
                    },
                  })
                    .then((res) => {
                      res.json().then((data) => {
                        console.log("Intento de trading:", data);
                      });
                    }
                    )
                    .catch((error) => {
                      console.error("Error:", error);
                    });

                  global_info.eligiendoOponenteIntercambiar = false;
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
          {maxJugadores === 4 && (
            <div
              className="superior_jugador_3_partida"
              style={{
                backgroundColor: color_to_hex(colores_oponentes[2]),

                // Si eligiendoJugadorRobar está a true, añado un borde blanco
                // alrededor del jugador con un grosor de 5px
                border: (eligiendoJugadorRobar || global_info.eligiendoOponenteIntercambiar) ? "5px solid white" : "",

              }}
              onClick={() => {
                let definitivamenteTieneColor = false;
                const colorOponente0 = color_to_codigo(colores_oponentes[2]);
                // Recorro con un for los pares obtenidos para ver si tiene el color del jugador


                if (eligiendoJugadorRobar) {
                  for (let i = 0; i < coloresAlrededorLadron.nodes.length; i++) {
                    if (coloresAlrededorLadron.nodes[i][0] === colorOponente0) {
                      definitivamenteTieneColor = true;
                    }
                  }
                }

                if (eligiendoJugadorRobar && definitivamenteTieneColor) {

                  // Ejemplo de url:
                  // https://cataninc-back-end-production-4d3e.up.railway.app/game_phases/move_thief?lobby_id=3&stolen_player_id=4&new_thief_position_tile_coord=5
                  console.log();
                  const url = `${process.env.REACT_APP_URL_BACKEND}/game_phases/move_thief?lobby_id=${codigo_partida}&stolen_player_id=${idsOponentes[2]}&new_thief_position_tile_coord=${nuevaPosicionLadron}`;

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

                else if (global_info.eligiendoOponenteIntercambiar) {
                  // Ejemplo de url:
                  // http://localhost:8000/game_phases/propose_trade?lobby_id=1234&player2_id=1234&wood_amount_p1=5&clay_amount_p1=5&sheep_amount_p1=5&wheat_amount_p1=5&stone_amount_p1=5&wood_amount_p2=5&clay_amount_p2=5&sheep_amount_p2=5&wheat_amount_p2=5&stone_amount_p2=5

                  const url = `${process.env.REACT_APP_URL_BACKEND}/game_phases/propose_trade?lobby_id=${codigo_partida}&player2_id=${idsOponentes[2]}&wood_amount_p1=${global_info.recursos_ofrecidos[1]}&clay_amount_p1=${global_info.recursos_ofrecidos[0]}&sheep_amount_p1=${global_info.recursos_ofrecidos[2]}&wheat_amount_p1=${global_info.recursos_ofrecidos[4]}&stone_amount_p1=${global_info.recursos_ofrecidos[3]}&wood_amount_p2=${global_info.recursos_pedidos[1]}&clay_amount_p2=${global_info.recursos_pedidos[0]}&sheep_amount_p2=${global_info.recursos_pedidos[2]}&wheat_amount_p2=${global_info.recursos_pedidos[4]}&stone_amount_p2=${global_info.recursos_pedidos[3]}`;

                  // Petición POST para hacer el trading
                  fetch(url, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization: `Bearer ${Token}`,
                    },
                  })
                    .then((res) => {
                      res.json().then((data) => {
                        console.log("Intento de trading:", data);
                      });
                    }
                    )
                    .catch((error) => {
                      console.error("Error:", error);
                    });

                  global_info.eligiendoOponenteIntercambiar = false;
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
              (window.location.href = `${process.env.REACT_APP_URL_FRONTED}/home`)
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
        <Tabs
          jugador_datos={estado_jugador}
          turno={turno}
          mi_id={mi_id}
          fase={fase_actual}
          chat={chat}
          usuario_to_color={id_to_color}
        />
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

                    // Si se está colocando el ladrón, hago la llamada al backend para indicar la nueva posición
                    // del ladrón
                    if (colocando_ladron || global_info.colocando_ladron) {
                      // Desactivo el booleano de colocando_ladron
                      setColocando_ladron(false);
                      global_info.colocando_ladron = false;

                      setLadronYaColocado(true);
                      setEligiendoJugadorRobar(true);
                      setNuevaPosicionLadron(parseInt(key));

                      // Obtengo los colores alrededor de la nueva posición del ladrón

                      // Ejemplo url:
                      // http://127.0.0.1:8000/get-nodes-around-tile?lobby_id=1234&tileCoord=122

                      fetch(
                        `${process.env.REACT_APP_URL_BACKEND}/get-nodes-around-tile?lobby_id=${codigo_partida}&tileCoord=${key}`,
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
                            setColoresAlrededorLadron(data);
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  }}
                >
                  {board[key][0] !== 0 && board[key][0]}
                </button>
              }

              {/* Ladrón */}
              {/* NOTA: NO CAMBIAR EL == POR ===, SI NO NO FUNCIONA */}
              {key == posicion_ladron && ladronHabilitado && (
                <img
                  src={`${process.env.REACT_APP_URL_FRONTED}/ladron.png`}
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
            (global_info.usandoCartaCarreteras || puedo_colocar_carretera) &&
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

            backgroundImage: `url(${process.env.REACT_APP_URL_FRONTED}/casillas/puertos/puerto_arcilla.png)`,
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

            backgroundImage: `url(${process.env.REACT_APP_URL_FRONTED}/casillas/puertos/puerto_madera.png)`,
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

            backgroundImage: `url(${process.env.REACT_APP_URL_FRONTED}/casillas/puertos/puerto_trigo.png)`,
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

            backgroundImage: `url(${process.env.REACT_APP_URL_FRONTED}/casillas/puertos/puerto_roca.png)`,
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

            backgroundImage: `url(${process.env.REACT_APP_URL_FRONTED}/casillas/puertos/puerto_3.png)`,
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

            backgroundImage: `url(${process.env.REACT_APP_URL_FRONTED}/casillas/puertos/puerto_ovejas.png)`,
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

            backgroundImage: `url(${process.env.REACT_APP_URL_FRONTED}/casillas/puertos/puerto_3.png)`,
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

            backgroundImage: `url(${process.env.REACT_APP_URL_FRONTED}/casillas/puertos/puerto_3.png)`,
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

            backgroundImage: `url(${process.env.REACT_APP_URL_FRONTED}/casillas/puertos/puerto_3.png)`,
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
                          : skins_jugadores_ciudades[
                          usuario_to_color[building[key][0]]
                          ]
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
          // left: "80%",
          right: "4%",

          // Tamaño 50px y negrita
          fontSize: "30px",
          fontWeight: "bold",
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
            left: "26%",
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
            <img src={`${process.env.REACT_APP_URL_FRONTED}/iconos-no-recursos/comerciar-banco.png`} />
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
            ? `${process.env.REACT_APP_URL_FRONTED}/skips/skip_on.png`
            : `${process.env.REACT_APP_URL_FRONTED}/skips/skip_off.png`
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

      {turno === mi_id && fase_actual === "RESOURCE_PRODUCTION" && (
        <PopUpFaseTirada
          show={ShowPopupFaseTirada}
          token={Token}
          lobby={codigo_partida}
        />
      )}

      {/* ---------------------- Negociar con otros jugadores ------------------- */}
      {turno === mi_id && fase_actual === "TRADING" && (
        <div>
          <PopUpFaseNegociacion
            //show={ShowPopupFaseNegociacion}
            token={Token}
            lobby={codigo_partida}
            jugador_datos={estado_jugador}
          />
        </div>
      )}

      {turno !== mi_id && fase_actual === "TRADING" && tenemosIntercambios == true && (
        <div>
          <PopUpOferta
            token={Token}
            lobby={codigo_partida}
            jugador_datos={estado_jugador}
            show={true}
            mi_id={mi_id}
            oferta={intercambios.filter((intercambio) => intercambio.reciever === mi_id)[0]}
          />
        </div>
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

  // Para la carta de carreteras
  usandoCartaCarreteras: false,

  // Para los intercambios
  eligiendoOponenteIntercambiar: false,
  recursos_ofrecidos: [0, 0, 0, 0, 0],
  recursos_pedidos: [0, 0, 0, 0, 0],
};
