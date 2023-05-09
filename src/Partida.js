import React from "react";
import { useEffect } from "react";
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";

import Tabs from "./Components/TabComponent/Tabs";
import PopUpFaseTirada from "./pop-up-Fase-tirada";
import PopupTablaCostes from "./pop-up-TablaCostes";

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
    const [mi_color, setMi_color] = useState("");

    const [imgs_oponentes, setImgs_oponentes] = useState([]);
    const [puntos_victoria_oponentes, setPuntos_victoria_oponentes] = useState([]);
    const [bono_caballeros_oponentes, setBono_caballeros_oponentes] = useState([]);
    const [bono_carreteras_oponentes, setBono_carreteras_oponentes] = useState([]);

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

    const [jugadores, setJugadores] = useState([]);
    const [max_jugadores, setMax_jugadores] = useState(0);

    const [board, setBoard] = useState({});

    const [partida_empezada, setPartida_empezada] = useState(false);
    const [fase_actual, setFase_actual] = useState("");

    const [skins_jugadores_poblados, setSkins_jugadores_poblados] = useState([]);
    const [skins_jugadores_carreteras, setSkins_jugadores_carreteras] = useState([]);
    const [skins_jugadores_ciudades, setSkins_jugadores_ciudades] = useState([]);
    const [colores_jugadores, setColores_jugadores] = useState([]);
    const [colores_oponentes, setColores_oponentes] = useState([]);

    const [aldeas_iniciales_colocadas, setAldeas_iniciales_colocadas] = useState(false);
    const [puedo_colocar_aldea, setPuedo_colocar_aldea] = useState(false);
    const [puedo_colocar_carretera, setPuedo_colocar_carretera] = useState(false);
    const [aldea_que_puedo_construir, setAldea_que_puedo_construir] = useState(1);
    const [ultima_aldea_construida, setUltima_aldea_construida] = useState(0);

    const [img_dado_1, setImg_dado_1] = useState("http://localhost:3000/dados/dado_1.png");
    const [img_dado_2, setImg_dado_2] = useState("http://localhost:3000/dados/dado_2.png");

    const [casas_legales, setCasas_legales] = useState([])
    const [carretera_legales, setCarretera_legales] = useState([])
    const [showPopup, setShowPopup] = useState(false);

    const ficha_con_id = [
        null,
        "http://localhost:3000/casillas/ovejas.jpg",
        "http://localhost:3000/casillas/arcilla.jpg",
        "http://localhost:3000/casillas/madera.jpg",
        "http://localhost:3000/casillas/roca.jpg",
        "http://localhost:3000/casillas/trigo.jpg",
        "http://localhost:3000/casillas/desierto.jpg"
    ];

    const init_top_board = 340;
    const init_left_board = -100;

    const top_variation_board = [
        0, 1, 2, -1, 0, 1, 2, -2, -1, 0, 1, 2, -2, -1, 0, 1, -2, -1, 0];
    const top_variation_unit = 135;

    const left_variation_board = [
        -4, -3, -2, -3, -2, -1, 0, -2, -1, 0, 1, 2, 0, 1, 2, 3, 2, 3, 4];
    const left_variation_unit = 80;

    const [posicion_ladron, setPosicion_ladron] = useState(87);
    const top_variation_ladron = 27;
    const left_variation_ladron = 27;

    const [road, setRoad] = useState({});

    // 0 para las verticales, 1 para las ascendentes, 2 para las descendentes
    const type_road = [
        0, 1, 0, 1, 0, 1,
        2, 2, 2, 2,
        0, 1, 0, 1, 0, 1, 0, 1,
        2, 2, 2, 2, 2,
        0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
        2, 2, 2, 2, 2, 2,
        1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
        2, 2, 2, 2, 2,
        1, 0, 1, 0, 1, 0, 1, 0,
        2, 2, 2, 2,
        1, 0, 1, 0, 1, 0,
    ]

    const init_top_road_relative_vertical = 70;
    const init_top_road_relative_ascend = 2;
    const init_top_road_relative_descend = 138;

    const init_left_road_relative_vertical = -368;
    const init_left_road_relative_ascend = -328;
    const init_left_road_relative_descend = -328;

    const top_variation_road = [
        0, 0, 1, 1, 2, 2,
        0, 1, 2, 3,
        -1, -1, 0, 0, 1, 1, 2, 2,
        -1, 0, 1, 2, 3,
        -2, -2, -1, -1, 0, 0, 1, 1, 2, 2,
        -2, -1, 0, 1, 2, 3,
        -3, -2, -2, -1, -1, 0, 0, 1, 1, 2,
        -2, -1, 0, 1, 2,
        -3, -2, -2, -1, -1, 0, 0, 1,
        -2, -1, 0, 1,
        -3, -2, -2, -1, -1, 0,
    ]

    const left_variation_road = [
        0, 0, 1, 1, 2, 2,
        0, 1, 2, 3,
        1, 1, 2, 2, 3, 3, 4, 4,
        1, 2, 3, 4, 5,
        2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
        2, 3, 4, 5, 6, 7,
        3, 4, 4, 5, 5, 6, 6, 7, 7, 8,
        4, 5, 6, 7, 8,
        5, 6, 6, 7, 7, 8, 8, 9,
        6, 7, 8, 9,
        7, 8, 8, 9, 9, 10,
    ]

    // Asumo que [0] equivale al color y [1] al tipo de edificio
    // tipo 0 = casa, tipo 1 = castillo
    const [building, setBuilding] = useState({});

    const top_variation_building = [
        0, 1, 2,
        -0.7, 0.3, 1.3, 2.3,
        -1, 0, 1, 2,
        -1.7, -0.7, 0.3, 1.3, 2.3,
        -2, -1, 0, 1, 2,
        -2.7, -1.7, -0.7, 0.3, 1.3, 2.3,
        -3, -2, -1, 0, 1, 2,
        -2.7, -1.7, -0.7, 0.3, 1.3,
        -3, -2, -1, 0, 1,
        -2.7, -1.7, -0.7, 0.3,
        -3, -2, -1, 0,
        -2.7, -1.7, -0.7
    ]

    const left_variation_building = [
        0, 1, 2,
        0, 1, 2, 3,
        1, 2, 3, 4,
        1, 2, 3, 4, 5,
        2, 3, 4, 5, 6,
        2, 3, 4, 5, 6, 7,
        3, 4, 5, 6, 7, 8,
        4, 5, 6, 7, 8,
        5, 6, 7, 8, 9,
        6, 7, 8, 9,
        7, 8, 9, 10,
        8, 9, 10
    ]

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
                res_2.json().then((data) => {
                    console.log("JSON de la partida:", data);

                    const nuevos_jugadores = [data.player_0, data.player_1, data.player_2, data.player_3];
                    setJugadores(nuevos_jugadores);

                    // De todos los jugadores saco el que tiene mi mismo id 
                    const yo = nuevos_jugadores.filter((jugador) => jugador.id === mi_id);
                    setEstado_jugador(yo[0]);

                    setBoard(data.board.tiles);
                    setRoad(data.board.edges);
                    setBuilding(data.board.nodes);

                    setTiempo_maximo(data.turn_time);
                    detectar_cambio_fase(data.turn_phase, data.player_turn);
                    setTurno(data.player_turn);

                    // Si el turno coincide con mi id y tengo ambos permisos a
                    // false, activo el permiso de construir aldeas
                    if (data.player_turn === mi_id && !puedo_colocar_aldea && !puedo_colocar_carretera && (data.turn_phase === "INITIAL_TURN1" || data.turn_phase === "INITIAL_TURN2")) {
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
                    if (data.turn_phase !== "INITIAL_TURN1" && data.turn_phase !== "INITIAL_TURN2") {
                        setAldeas_iniciales_colocadas(true);
                    }

                    setPosicion_ladron(data.thief_position);

                    // comprobamos si estamos en la fase 0 del juego ? casas vacias false : true 
                    setFase_actual(data.turn_phase);
                    if (data.turn_phase === "INITIAL_TURN1" || data.turn_phase === "INITIAL_TURN2") {
                        setAldeas_iniciales_colocadas(false);
                    }
                    else {
                        setAldeas_iniciales_colocadas(true);
                    }

                    // sacamos los datos de los distintos jugadores que hay en la partida
                    // quitamos nuestro usuario de la lista 
                    const lista_oponentes = jugadores.filter((jugador) => jugador.id != mi_id);

                    let nueva_lista_imgs_oponentes = [];
                    let nueva_lista_puntos_victoria_oponentes = [];
                    let nueva_lista_bono_caballeros_oponentes = [];
                    let nueva_lista_bono_carreteras_oponentes = [];
                    let nuevos_colores_oponentes = [];

                    for (let i = 0; i < lista_oponentes.length; i++) {
                        const nueva_img_oponente = lista_oponentes[i].profile_pic === "default"
                            ? "http://localhost:3000/fotos_perfil/skin1.png"
                            : `http://localhost:3000/fotos_perfil/${lista_oponentes[i].profile_pic}.png`;

                        nueva_lista_imgs_oponentes = [...nueva_lista_imgs_oponentes, nueva_img_oponente];

                        nueva_lista_puntos_victoria_oponentes = [...nueva_lista_puntos_victoria_oponentes, lista_oponentes[i].victory_points];
                        nueva_lista_bono_caballeros_oponentes = [...nueva_lista_bono_caballeros_oponentes, lista_oponentes[i].has_knights_bonus];
                        nueva_lista_bono_carreteras_oponentes = [...nueva_lista_bono_carreteras_oponentes, lista_oponentes[i].has_longest_road_bonus];

                        nuevos_colores_oponentes = [...nuevos_colores_oponentes, lista_oponentes[i].color];
                    }

                    setImgs_oponentes(nueva_lista_imgs_oponentes);
                    setPuntos_victoria_oponentes(nueva_lista_puntos_victoria_oponentes);
                    setBono_caballeros_oponentes(nueva_lista_bono_caballeros_oponentes);
                    setBono_carreteras_oponentes(nueva_lista_bono_carreteras_oponentes);
                    setColores_oponentes(nuevos_colores_oponentes);

                    let array_skins_jugadores_poblados = [null, null, null, null];
                    let array_skins_jugadores_carreteras = [null, null, null, null];
                    let array_skins_jugadores_ciudades = [null, null, null, null];
                    let array_colores_jugadores = [];
                    let nuevo_usuario_to_color = [null, null, null, null, null];

                    // Obtenemos de todos los jugadores sus skins y sus colores
                    for (let i = 0; i < jugadores.length; i++) {
                        const url_skin_poblado = "http://localhost:3000/poblado/" + jugadores[i].color + "/" + jugadores[i].selected_pieces_skin + ".png";
                        array_skins_jugadores_poblados[i] = url_skin_poblado;
                        // array_colores_jugadores = [...array_colores_jugadores, jugadores[i].color];

                        const url_skin_carretera = "http://localhost:3000/carreteras/" + jugadores[i].color + "/" + jugadores[i].selected_pieces_skin + ".png";
                        array_skins_jugadores_carreteras[i] = url_skin_carretera;

                        const url_skin_ciudad = "http://localhost:3000/ciudad/" + jugadores[i].color + "/" + jugadores[i].selected_pieces_skin + ".png";
                        array_skins_jugadores_ciudades[i] = url_skin_ciudad;

                        // Indico mi indice
                        if (jugadores[i].id === mi_id) {
                            setMi_indice(i);
                            setMi_color(jugadores[i].color);
                        }

                        // Indico el color de cada jugador
                        nuevo_usuario_to_color[color_to_codigo(jugadores[i].color)] = i;
                    }

                    setSkins_jugadores_poblados(array_skins_jugadores_poblados);
                    setSkins_jugadores_carreteras(array_skins_jugadores_carreteras);
                    setSkins_jugadores_ciudades(array_skins_jugadores_ciudades);
                    setColores_jugadores(array_colores_jugadores);
                    setUsuario_to_color(nuevo_usuario_to_color);

                }).catch((error) => {
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
                res_2.json().then((data) => {
                    setCasas_legales(data);

                }).catch((error) => {
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
                res_2.json().then((data) => {
                    setCarretera_legales(data);

                }).catch((error) => {
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

    const handlePopupClose = () => {
        setShowPopup(false);
      };
    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// FUNCIONES /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    // funcion que detecta si se ha cambiado de fase, compara la fase actual con
    // la que se le pasa por parametro y hace las operaciones que correspondan
    // si la fase actual es distinta a la que se le pasa por parametro
    function detectar_cambio_fase(fase, nuevo_turno) {
        if (fase_actual !== fase) {
            setFase_actual(fase);

            // Si la fase es "RESOURCE_PRODUCTION" y es mi turno, tiro los dados
            if (fase === "RESOURCE_PRODUCTION") {
                // Si es mi turno, tiro los dados, si no, espero a que el
                // backend me diga qué ha salido
                if (fase === "RESOURCE_PRODUCTION") {
                    if (nuevo_turno === mi_id) {
                        console.log("mi turno");
                        handlePopupClose();
                        console.log(codigo_partida);
                    }
                    else {
                      // código para cuando no es tu turno
                    }
                  }
                else {
                    // TODO: Esperar a que el backend me diga qué ha salido
                }
            }
            else if (fase === "TRADING") {
                // TODO: hacer que se muestre el popup de trading
            }
            else if (fase === "BUILDING") {
                // Doy permiso para construir carreteras y aldeas
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
            res.json().then((data) => {

            }).catch((error) => {
                console.error("Error:", error);
            });
        }
        );
    }

    function construir_poblado(coordenada) {
        if (aldeas_iniciales_colocadas) {
            // Compruebo qué construccion hay en la coordenada
            if (building[coordenada][1] === 0) {
                // Compruebo si tengo los materiales para construir una ciudad
                if (true) {
                    return;
                }
            }
            else {
                // Compruebo si tengo los materiales para construir un poblado
                if (true) {
                    return;
                }
            }
        }
        else {  // no estan colocadas las aldeas iniciales 
            setUltima_aldea_construida(ultima_aldea_construida + 1);

            setPuedo_colocar_aldea(false);
            setPuedo_colocar_carretera(true);

            // Cambio el conjunto de carreteras que puedo construir a los huecos
            // alrededor de la aldea que acabo de construir

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
            ).then((res) => {
                res.json().then((data) => {
                    console.log("Intento de colocar aldea:", data);
                });
            }).catch((error) => {
                console.error("Error:", error);
            });
        }
    }

    function construir_carretera(coordenada) {
        if (aldeas_iniciales_colocadas) {

            // Aviso al backend de que ya he colocado la carretera
            fetch(
                `${process.env.REACT_APP_URL_BACKEND}/build-road?edge=${coordenada}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${Token}`,
                    },
                }
            ).then((res) => {
                res.json().then((data) => {
                    console.log("Intento de colocar carretera:", data);
                });
            }).catch((error) => {
                console.error("Error:", error);
            });

        }
        else {
            setPuedo_colocar_carretera(false)

            // Aviso al backend de que ya he colocado la carretera
            fetch(
                `${process.env.REACT_APP_URL_BACKEND}/build-road?edge=${coordenada}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${Token}`,
                    },
                }
            ).then((res) => {
                res.json().then((data) => {
                    console.log("Intento de colocar carretera:", data);
                });
            }).catch((error) => {
                console.error("Error:", error);
            });

            avanzar_fase();
        }
    }

    function tirar_dados() {
        // Obtengo la tira de dados del backend
        const numeroAleatorio = Math.floor(Math.random() * 6) + 1;
        const nuevaImagen = `http://localhost:3000/dados/dado_${numeroAleatorio}.png`;

        setImg_dado_1(nuevaImagen);

        const numeroAleatorio2 = Math.floor(Math.random() * 6) + 1;
        const nuevaImagen2 = `http://localhost:3000/dados/dado_${numeroAleatorio2}.png`;

        setImg_dado_2(nuevaImagen2);
    }

    function color_to_hex(color) {
        if (color === "YELLOW") {
            return "#ffcf40";
        }
        else if (color === "BLUE") {
            return "#006db0";
        }
        else if (color === "GREEN") {
            return "#00a86b";
        }
        else {
            return "#9d2933";
        }
    }

    const [usuario_to_color, setUsuario_to_color] = useState([null, null, null, null, null]);
    function color_to_codigo(color) {
        if (color === "RED") {
            return 1;
        }
        else if (color === "BLUE") {
            return 2;
        }
        else if (color === "GREEN") {
            return 3;
        }
        else {
            return 4;
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// FETCHS INICIALES /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    useEffect(() => {

        ////////////////////////// FETCH DEL USUARIO ///////////////////////////

        // fetch(
        //     `${process.env.REACT_APP_URL_BACKEND}/get-user-from-id/${parseInt(
        //         json_token.id
        //     )}`,
        //     {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded",
        //             Authorization: `Bearer ${Token}`,
        //         },
        //     }
        // )
        //     .then((res) => {
        //         res.json().then((data) => {
        //             // Actualizamos el estado de cosas
        //
        //         });
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });

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
            res.json().then((data) => {
                // sacamos el id de la partida con el que vamos a estar trabajando 
                setCodigo_partida(data.id);
                setMax_jugadores(data.game.num_jugadores);

            }).catch((error) => {
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

            if (aldeas_iniciales_colocadas) {

                // Si no es mi turno, pongo el tiempo a 0, si no, lo actualizo
                if (turno !== mi_id) {
                    setTiempo(0);
                }
                else {
                    const nuevo_tiempo = (tiempo + 1) % (tiempo_maximo + 1);
                    setTiempo(nuevo_tiempo);

                    if (nuevo_tiempo === 0) {
                        // Log
                        console.log("Se ha acabado el tiempo del turno");

                        // Aviso al backend de que avance la fase
                        avanzar_fase();
                    }
                }
            }
            else {
                if (turno == mi_id) {
                    if (ultima_aldea_construida < aldea_que_puedo_construir) {
                        setPuedo_colocar_aldea(true);

                        // Log
                        console.log("Puedo colocar aldea");
                    }
                }
                else {
                    setPuedo_colocar_aldea(false);
                }
            }

            ////////////////////////////////////////////////////////////////////

        }, 1000);

        return () => clearInterval(interval);
    }, [tiempo, turno, aldea_que_puedo_construir, ultima_aldea_construida, aldeas_iniciales_colocadas, partida_empezada]);

    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// RETURN PRINCIPAL /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    return (
        <div style={{
            backgroundImage: `url(http://localhost:3000/fondo_mar.jpg)`,
            backgroundSize: "cover",

            height: "100vh",
            width: "100vw",
        }}>

            {/************************ MENÚ SUPERIOR *************************/}

            <div className="parte_superior_partida">
                <div className="menu_superior_partida">
                    {
                        jugadores.length >= 2 &&
                        <div className="superior_jugador_1_partida"
                            style={{
                                backgroundColor: color_to_hex(colores_oponentes[0]),
                            }}
                        >
                            <img src={imgs_oponentes[0]} className="icono_jugador_superior" alt="icono_jugadores" />

                            <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                            {
                                // Muestro los puntos de victoria del jugador 1
                                <div className="puntos_victoria_jugador_1">
                                    {puntos_victoria_oponentes[0]}
                                </div>
                            }

                            {
                                bono_caballeros_oponentes[0] ? (
                                    <img src={img_caballero_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_caballero_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }

                            {
                                bono_carreteras_oponentes[0] ? (
                                    <img src={img_camino_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_camino_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }
                        </div>
                    }
                    {
                        jugadores.length >= 3 &&
                        <div className="superior_jugador_2_partida"
                            style={{
                                backgroundColor: color_to_hex(colores_oponentes[1]),
                            }}>
                            <img src={imgs_oponentes[1]} className="icono_jugador_superior" alt="icono_jugadores" />

                            <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                            {
                                // Muestro los puntos de victoria del jugador 1
                                <div className="puntos_victoria_jugador_2">
                                    {puntos_victoria_oponentes[1]}
                                </div>
                            }

                            {
                                bono_caballeros_oponentes[1] ? (
                                    <img src={img_caballero_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_caballero_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }

                            {
                                bono_carreteras_oponentes[1] ? (
                                    <img src={img_camino_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_camino_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }
                        </div>
                    }
                    {
                        jugadores.length === 4 &&
                        <div className="superior_jugador_3_partida"
                            style={{
                                backgroundColor: color_to_hex(colores_oponentes[2]),
                            }}
                        >
                            <img src={imgs_oponentes[2]} className="icono_jugador_superior" alt="icono_jugadores" />

                            <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                            {
                                // Muestro los puntos de victoria del jugador 1
                                <div className="puntos_victoria_jugador_3">
                                    {puntos_victoria_oponentes[2]}
                                </div>
                            }

                            {
                                bono_caballeros_oponentes[2] ? (
                                    <img src={img_caballero_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_caballero_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }

                            {
                                bono_carreteras_oponentes[2] ? (
                                    <img src={img_camino_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_camino_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }
                        </div>
                    }
                    <
                        img src={img_salir} className="icono_salir" alt="salir"
                        onClick={() =>
                            window.location.href = "http://localhost:3000/home"
                        }
                    />
                </div>

                <div className="contador_tiempo_partida">

                </div>

                <div
                    className="tiempo_partida"
                    style={{
                        width: `${tiempo / tiempo_maximo * 100}%`
                    }}
                >

                </div>
            </div>

            {/************************* MENÚ LATERAL *************************/}

            <div style={{
                position: "absolute",
                top: "120px", height: "calc(100% - 120px)",
                left: "0", width: "25%",
                backgroundColor: "blue"
            }}>
                <Tabs jugador_datos={estado_jugador} />
            </div>


            {/************************** HEXAGONOS ***************************/}

            <div style={{
                position: "absolute",
                top: "120px", height: "calc(100% - 120px)",
                left: "25%", width: "75%",
            }}>

                {Object.entries(board).map(([key], index) => {
                    return (
                        <div key={key}>
                            {
                                <button className="w-36 flex h-40 hexagono_partida"
                                    style={{
                                        position: "absolute",
                                        top: init_top_board - top_variation_board[index] * top_variation_unit,
                                        left: "50%",
                                        transform: `translateX(${init_left_board + left_variation_board[index] * left_variation_unit}px)`,

                                        backgroundImage: `url(${ficha_con_id[board[key][1]]})`,
                                        color: `${(board[key][0] === 6 || board[key][0] === 8) ? "red" : "white"}`,
                                    }}
                                >
                                    {
                                        board[key][0] !== 0 && board[key][0]
                                    }
                                </button>
                            }
                            {
                                (key == posicion_ladron) &&
                                <img
                                    src={"http://localhost:3000/ladron.png"}
                                    alt="ladron"
                                    style={{
                                        position: "absolute",
                                        top: init_top_board + top_variation_ladron - top_variation_board[index] * top_variation_unit,
                                        left: "50%",
                                        transform: `translateX(${init_left_board + left_variation_ladron + left_variation_board[index] * left_variation_unit}px)`,
                                        width: "100px",
                                        height: "100px",
                                    }}
                                />
                            }
                        </div>
                    )
                })}

                {/************************** CARRETERAS **************************/}

                {Object.entries(road).map(([key, value], index) => {
                    var permiso_construccion = (puedo_colocar_carretera && Array.isArray(carretera_legales) && carretera_legales.includes(parseInt(key)));

                    return (
                        <div key={key}>
                            {
                                type_road[index] === 0 &&
                                (road[key] != null || permiso_construccion) &&
                                <button
                                    className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : "carretera_sin_comprar_partida"}`}
                                    style={{
                                        position: "absolute",
                                        top: ((init_top_board + init_top_road_relative_vertical) - top_variation_road[index] * top_variation_unit),
                                        left: "50%",
                                        transform: `translateX(${(init_left_board + init_left_road_relative_vertical) + left_variation_road[index] * left_variation_unit}px) rotate(90deg)`,

                                        backgroundImage: `url( ${(
                                            road[key] != null ?
                                                `${skins_jugadores_carreteras[usuario_to_color[road[key]]]}`
                                                :
                                                `${skins_jugadores_carreteras[mi_indice]}`
                                        )} )`,
                                    }}
                                    onClick={() => {
                                        construir_carretera(key);
                                    }}
                                />
                            }

                            {
                                type_road[index] === 1 &&
                                (road[key] != null || permiso_construccion) &&
                                <button
                                    className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : "carretera_sin_comprar_partida"}`}
                                    style={{
                                        position: "absolute",
                                        top: ((init_top_board + init_top_road_relative_ascend) - top_variation_road[index] * top_variation_unit),
                                        left: "50%",
                                        transform: `translateX(${(init_left_board + init_left_road_relative_ascend) + left_variation_road[index] * left_variation_unit}px) rotate(-30deg)`,

                                        backgroundImage: `url( ${(
                                            road[key] != null ?
                                                `${skins_jugadores_carreteras[usuario_to_color[road[key]]]}`
                                                :
                                                `${skins_jugadores_carreteras[mi_indice]}`
                                        )} )`,
                                    }}
                                    onClick={() => {
                                        construir_carretera(key);
                                    }}
                                />
                            }

                            {
                                type_road[index] === 2 &&
                                (road[key] != null || permiso_construccion) &&
                                <button
                                    className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : "carretera_sin_comprar_partida"}`}
                                    style={{
                                        position: "absolute",
                                        top: ((init_top_board + init_top_road_relative_descend) - top_variation_road[index] * top_variation_unit),
                                        left: "50%",
                                        transform: `translateX(${(init_left_board + init_left_road_relative_descend) + left_variation_road[index] * left_variation_unit}px) rotate(30deg)`,

                                        backgroundImage: `url( ${(
                                            road[key] != null ?
                                                `${skins_jugadores_carreteras[usuario_to_color[road[key]]]}`
                                                :
                                                `${skins_jugadores_carreteras[mi_indice]}`
                                        )} )`,
                                    }}
                                    onClick={() => {
                                        construir_carretera(key);
                                    }}
                                />
                            }
                        </div>
                    )
                })}

                {/*************************** POBLADOS ***************************/}

                {Object.entries(building).map(([key, value], index) => {
                    var permiso_construccion = (puedo_colocar_aldea && Array.isArray(casas_legales) && casas_legales.includes(parseInt(key)));

                    return (
                        <div key={key}>
                            {   // miramos las que ya estan construidas y las que podemos construir
                                (building[key][1] !== null || permiso_construccion) &&
                                <button
                                    className={`w-10 flex h-10 ${building[key][1] != null ? "construccion_partida" : "construccion_sin_comprar_partida"}`}
                                    style={{
                                        position: "absolute",
                                        top: ((init_top_board + init_top_building_relative_vertical) - top_variation_building[index] * top_variation_unit),
                                        left: "50%",
                                        transform: `translateX(${(init_left_board + init_left_building_relative_vertical) + left_variation_building[index] * left_variation_unit}px)`,
                                        // id | indiceColumna -> si id === 0[jugador ] -> id === 1 [tipo_construccion]
                                        backgroundImage: `url( ${(
                                            building[key][1] !== null ?
                                                `${building[key][1] === 1 ? skins_jugadores_poblados[usuario_to_color[building[key][0]]] : "ciudad"}`
                                                :
                                                `${skins_jugadores_poblados[mi_indice]}`
                                        )} )`,
                                    }}
                                    onClick={() => {
                                        construir_poblado(key);
                                    }}
                                />
                            }
                        </div>
                    )
                })}

            </div>

            {/************************** OTRAS COSAS *************************/}

            <h1
                style={{
                    position: "absolute",
                    left: "50%",
                }}>
                {"Max jugadores: " + max_jugadores}
                {"---"}
                {"Tiempo: " + tiempo}
                {"---"}
                {"Turno: " + turno}
                {"---"}
                {"Fase: " + fase_actual}
                {"---"}
                {"Permiso para construir carreteras: " + puedo_colocar_carretera}
                {"---"}
                {"Permiso para construir aldeas: " + puedo_colocar_aldea}
                {"---"}
                {"Ultima aldea construida: " + ultima_aldea_construida}
                {"---"}
                {"Aldea que puedo construir: " + aldea_que_puedo_construir}
                {"---"}
            </h1>

            <h1
                style={{
                    position: "absolute",
                    left: "28%",
                    top: "150px",

                    fontSize: "50px",
                    fontWeight: "bold"
                }}>

                {turno == mi_id && "¡Tu turno!"}
            </h1>

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
                    backgroundImage: `url(${(turno == mi_id && aldeas_iniciales_colocadas) ? "http://localhost:3000/skips/skip_on.png" : "http://localhost:3000/skips/skip_off.png"})`,
                    backgroundSize: 'cover',
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


            <PopUpFaseTirada token={Token} lobby={codigo_partida}>
            </PopUpFaseTirada>

            <PopupTablaCostes />

        </div>
    );
}

export default Partida;