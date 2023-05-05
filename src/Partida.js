import React from "react";
import { useEffect } from "react";
import { useState } from 'react';

import Tabs from "./Components/TabComponent/Tabs";
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
    const [mi_color, setMi_color] = useState("RED");
    const [mi_skin_construcciones, setMi_skin_construcciones] = useState(1);

    const [img_jugador_1, setImg_jugador_1] = useState(null);
    const [img_jugador_2, setImg_jugador_2] = useState(null);
    const [img_jugador_3, setImg_jugador_3] = useState(null);

    // Aquí va el id del jugador que tiene el turno
    const [turno, setTurno] = useState(7365);

    const [codigo_partida, setCodigo_partida] = useState(0);

    // Recordatorio de fases:
    // 0: Obtención de recursos
    // 1: Uso de cartas de desarrollo
    // 2: Negociación
    // 3: Construcción
    const [fase, setFase] = useState(0);

    const [tiempo, setTiempo] = useState(0);
    const [tiempo_maximo, setTiempo_maximo] = useState(30);

    const [jugadores, setJugadores] = useState([]);
    const [max_jugadores, setMax_jugadores] = useState(0);

    const [board, setBoard] = useState({});

    const [partida_empezada, setPartida_empezada] = useState(false);

    const [aldeas_iniciales_colocadas, setAldeas_iniciales_colocadas] = useState(false);
    const [puedo_colocar_aldea, setPuedo_colocar_aldea] = useState(false);
    const [puedo_colocar_carretera, setPuedo_colocar_carretera] = useState(false);
    const [aldea_que_puedo_construir, setAldea_que_puedo_construir] = useState(1);
    const [ultima_aldea_construida, setUltima_aldea_construida] = useState(0);

    const [img_dado_1, setImg_dado_1] = useState("http://localhost:3000/dados/dado_1.png");
    const [img_dado_2, setImg_dado_2] = useState("http://localhost:3000/dados/dado_2.png");

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
        0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
        2, 2, 2, 2, 2,
        0, 1, 0, 1, 0, 1, 0, 1,
        2, 2, 2, 2,
        0, 1, 0, 1, 0, 1,
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
        -2, -3, -1, -2, 0, -1, 1, 0, 2, 1,
        -2, -1, 0, 1, 2,
        -2, -3, -1, -2, 0, -1, 1, 0,
        -2, -1, 0, 1,
        -2, -3, -1, -2, 0, -1,
    ]

    const left_variation_road = [
        0, 0, 1, 1, 2, 2,
        0, 1, 2, 3,
        1, 1, 2, 2, 3, 3, 4, 4,
        1, 2, 3, 4, 5,
        2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
        2, 3, 4, 5, 6, 7,
        4, 3, 5, 4, 6, 5, 7, 6, 8, 7,
        4, 5, 6, 7, 8,
        6, 5, 7, 6, 8, 7, 9, 8,
        6, 7, 8, 9,
        8, 7, 9, 8, 10, 9,
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



    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// FUNCIONES /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    function codigo_to_color(codigo) {
        const identificador_color = codigo % 4

        if (identificador_color == 0) {
            return "YELLOW";
        }
        else if (identificador_color == 1) {
            return "BLUE";
        }
        else if (identificador_color == 2) {
            return "WHITE";
        }
        else {
            return "RED"
        }
    }

    function color_to_codigo(color) {
        switch (color) {
            case "YELLOW":
                return 0;
            case "BLUE":
                return 1;
            case "WHITE":
                return 2;
            case "RED":
                return 3;
            default:
                return -1; // Si el color no es válido, devolvemos -1
        }
    }

    function codigo_to_skin(codigo) {
        return Math.floor(codigo / 4);
    }

    function construir_poblado(coordenada) {
        if (aldeas_iniciales_colocadas) {
            // Compruebo qué construccion hay en la coordenada
            if (building[coordenada][1] == 0) {
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
        else {
            setUltima_aldea_construida(ultima_aldea_construida + 1);

            setPuedo_colocar_aldea(false);
            setPuedo_colocar_carretera(true);

            // Cambio el conjunto de carreteras que puedo construir a los huecos
            // alrededor de la aldea que acabo de construir

            let construcciones = building;
            construcciones[coordenada] = [mi_skin_construcciones * 4 + color_to_codigo(mi_color), 0];
            setBuilding(construcciones);
        }
    }

    function construir_carretera(coordenada) {
        if (aldeas_iniciales_colocadas) {

        }
        else {
            setPuedo_colocar_carretera(false)

            let carreteras = road;
            carreteras[coordenada] = mi_skin_construcciones * 4 + color_to_codigo(mi_color);
            setRoad(carreteras);

            // Aviso al backend de que ya he colocado lo mío
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

    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// FETCHS INICIALES /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    useEffect(() => {

        ////////////////////////// FETCH DEL USUARIO ///////////////////////////

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

                    // Logs
                    console.log("JSON del jugador:");
                    console.log(data);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        ///////////////////////// FETCH DE LA PARTIDA //////////////////////////

        const url_partida = `${process.env.REACT_APP_URL_BACKEND}/create-test-lobby`;

        console.log("URL de la partida:");
        console.log(url_partida);

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
                console.log("JSON inicial:");
                console.log(data);
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

                // sacamos el id de la partida con el que vamos a estar trabajando 
                setCodigo_partida(data.id);
                setMax_jugadores(data.game.num_jugadores);

                const res_2 = fetch(
                    `${process.env.REACT_APP_URL_BACKEND}/game_phases/get_game_state?lobby_id=${data.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            Authorization: `Bearer ${Token}`,
                        },
                    }
                ).then((res_2) => {
                    res_2.json().then((data) => {
                        // sacamos el turno del jugador y en que fase nos encontram
                        console.log("JSON de la partida:");
                        console.log(data);

                        // setJugadores(data.game.jugadores);
                        setJugadores([data.player_0, data.player_1, data.player_2, data.player_3]);
                        console.log("valor de jugadores despues de insertar nuevos jugadores", jugadores);

                        setBoard(data.board.tiles);
                        setRoad(data.board.edges);
                        setBuilding(data.board.nodes);

                        setTiempo_maximo(data.max_tiempo_turno);

                        setPosicion_ladron(data.thief_position);
                    }).catch((error) => {
                        console.error("Error:", error);
                    });
                });
            }).catch((error) => {
                console.error("Error:", error);
            });
        });

    }, [Token, json_token.id, mi_id]);

    useEffect(() => {

        var num_jugadores_anadidos = 0;

        ///////////////////////// FETCH DEL OPONENTE 1 /////////////////////////

        if (jugadores.length >= 2) {
            fetch(
                `${process.env.REACT_APP_URL_BACKEND}/get-user-from-id/${parseInt(
                    jugadores[1].id
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
                        setImg_jugador_1(data.profile_picture);

                        // Logs
                        console.log("Imagen recibida del jugador 1:");
                        console.log(data.profile_picture);

                        console.log("JSON del jugador 1:");
                        console.log(data);

                        // TODO: Hacer que las imágenes se obtengan de la base de datos
                        setImg_jugador_1("http://localhost:3000/fotos_perfil/skin1.png");
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        ///////////////////////// FETCH DEL OPONENTE 2 /////////////////////////

        if (jugadores.length >= 3) {
            fetch(
                `${process.env.REACT_APP_URL_BACKEND}/get-user-from-id/${parseInt( 
                    jugadores[2].id
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
                        setImg_jugador_2(data.profile_picture);

                        // Logs
                        console.log("Imagen recibida del jugador 2:");
                        console.log(data.profile_picture);

                        console.log("JSON del jugador 2:");
                        console.log(data);

                        // TODO: Hacer que las imágenes se obtengan de la base de datos
                        setImg_jugador_2("http://localhost:3000/fotos_perfil/skin2.png");
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        ///////////////////////// FETCH DEL OPONENTE 3 /////////////////////////

        if (jugadores.length >= 4) {
            fetch(
                `${process.env.REACT_APP_URL_BACKEND}/get-user-from-id/${parseInt(
                    jugadores[3].id
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
                        setImg_jugador_3(data.profile_picture);

                        // Logs
                        console.log("Imagen recibida del jugador 3:");
                        console.log(data.profile_picture);

                        console.log("JSON del jugador 3:");
                        console.log(data);

                        // TODO: Hacer que las imágenes se obtengan de la base de datos
                        setImg_jugador_3("http://localhost:3000/fotos_perfil/skin3.png");
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

    }, [Token, json_token.id, jugadores]);

    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// FETCH PERIODICO //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (tiempo === 0 && partida_empezada) {
            setFase((fase + 1) % 4);
        }
    }, [tiempo]);

    useEffect(() => {
        if (fase === 0 && tiempo === 0 && partida_empezada) {
            setTurno((turno + 1) % max_jugadores);
            // TODO: los turnos van con ids, hay que hacer una llamada al
            // backend para obtener el id del jugador que le toca

            // TODO: Cuando pase un turno, hay que esperar la confirmación del
            // backend para poder pasar al siguiente turno, así todos los
            // jugadores se sincronizan

            if (!aldeas_iniciales_colocadas && turno == mi_id) {
                setAldea_que_puedo_construir(aldea_que_puedo_construir + 1);
            }
        }
    }, [fase]);

    useEffect(() => {
        const interval = setInterval(() => {

            ///////////////////////// CÓDIGO PERIODICO /////////////////////////

            if (aldeas_iniciales_colocadas) {
                setTiempo((tiempo + 1) % (tiempo_maximo + 1));

                if (!partida_empezada && tiempo === 0) {
                    setPartida_empezada(true);
                }
            }
            else {
                if (turno == mi_id) {
                    if (ultima_aldea_construida < aldea_que_puedo_construir) {
                        setPuedo_colocar_aldea(true);
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
                        <div className="superior_jugador_1_partida">
                            <img src={img_jugador_1} className="icono_jugador_superior" alt="icono_jugadores" />

                            <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                            {
                                // Muestro los puntos de victoria del jugador 1
                                <div className="puntos_victoria_jugador_1">
                                    {jugadores[1].puntos_victoria}
                                </div>
                            }

                            {
                                jugadores[1].tiene_bono_caballeros ? (
                                    <img src={img_caballero_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_caballero_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }

                            {
                                jugadores[1].tiene_bono_carreteras ? (
                                    <img src={img_camino_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_camino_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }
                        </div>
                    }
                    {
                        jugadores.length >= 3 &&
                        <div className="superior_jugador_2_partida">
                            <img src={img_jugador_2} className="icono_jugador_superior" alt="icono_jugadores" />

                            <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                            {
                                // Muestro los puntos de victoria del jugador 1
                                <div className="puntos_victoria_jugador_2">
                                    {jugadores[2].puntos_victoria}
                                </div>
                            }

                            {
                                jugadores[2].tiene_bono_caballeros ? (
                                    <img src={img_caballero_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_caballero_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }

                            {
                                jugadores[2].tiene_bono_carreteras ? (
                                    <img src={img_camino_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_camino_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }
                        </div>
                    }
                    {
                        jugadores.length === 4 &&
                        <div className="superior_jugador_3_partida">
                            <img src={img_jugador_3} className="icono_jugador_superior" alt="icono_jugadores" />

                            <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                            {
                                // Muestro los puntos de victoria del jugador 1
                                <div className="puntos_victoria_jugador_3">
                                    {jugadores[3].puntos_victoria}
                                </div>
                            }

                            {
                                jugadores[3].tiene_bono_caballeros ? (
                                    <img src={img_caballero_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                                ) : (
                                    <img src={img_caballero_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                                )
                            }

                            {
                                jugadores[3].tiene_bono_carreteras ? (
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
                <Tabs />
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
                    return (
                        <div key={key}>
                            {
                                type_road[index] === 0 &&
                                (road[key] != null || puedo_colocar_carretera) &&
                                <button
                                    className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : "carretera_sin_comprar_partida"}`}
                                    style={{
                                        position: "absolute",
                                        top: ((init_top_board + init_top_road_relative_vertical) - top_variation_road[index] * top_variation_unit),
                                        left: "50%",
                                        transform: `translateX(${(init_left_board + init_left_road_relative_vertical) + left_variation_road[index] * left_variation_unit}px) rotate(90deg)`,

                                        backgroundImage: `url( ${"http://localhost:3000/carreteras/" + mi_color + "/carretera_" + 1 + ".png"} )`,
                                    }}
                                    onClick={() => {
                                        construir_carretera(key);
                                    }}
                                />
                            }

                            {
                                type_road[index] === 1 &&
                                (road[key] != null || puedo_colocar_carretera) &&
                                <button
                                    className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : "carretera_sin_comprar_partida"}`}
                                    style={{
                                        position: "absolute",
                                        top: ((init_top_board + init_top_road_relative_ascend) - top_variation_road[index] * top_variation_unit),
                                        left: "50%",
                                        transform: `translateX(${(init_left_board + init_left_road_relative_ascend) + left_variation_road[index] * left_variation_unit}px) rotate(-30deg)`,

                                        backgroundImage: `url( ${"http://localhost:3000/carreteras/" + mi_color + "/carretera_" + 1 + ".png"} )`,
                                    }}
                                    onClick={() => {
                                        construir_carretera(key);
                                    }}
                                />
                            }

                            {
                                type_road[index] === 2 &&
                                (road[key] != null || puedo_colocar_carretera) &&
                                <button
                                    className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : "carretera_sin_comprar_partida"}`}
                                    style={{
                                        position: "absolute",
                                        top: ((init_top_board + init_top_road_relative_descend) - top_variation_road[index] * top_variation_unit),
                                        left: "50%",
                                        transform: `translateX(${(init_left_board + init_left_road_relative_descend) + left_variation_road[index] * left_variation_unit}px) rotate(30deg)`,

                                        backgroundImage: `url( ${(
                                            road[key] != null ?
                                                `${"http://localhost:3000/carreteras/" + codigo_to_color(road[key]) + "/carretera_" + codigo_to_skin(road[key]) + ".png"}`
                                                :
                                                `${"http://localhost:3000/carreteras/" + mi_color + "/carretera_" + mi_skin_construcciones + ".png"}`
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
                    return (
                        <div key={key}>
                            {
                                (building[key][1] != null || puedo_colocar_aldea) &&
                                <button
                                    className={`w-10 flex h-10 ${building[key][1] != null ? "construccion_partida" : "construccion_sin_comprar_partida"}`}
                                    style={{
                                        position: "absolute",
                                        top: ((init_top_board + init_top_building_relative_vertical) - top_variation_building[index] * top_variation_unit),
                                        left: "50%",
                                        transform: `translateX(${(init_left_board + init_left_building_relative_vertical) + left_variation_building[index] * left_variation_unit}px)`,

                                        backgroundImage: `url( ${(
                                            building[key][1] != null ?
                                                `${"http://localhost:3000/" + (building[key][1] === 0 ? "poblado" : "ciudad") + "/" + codigo_to_color(building[key][0]) + "/" + (building[key][1] === 0 ? "poblado" : "ciudad") + "_" + codigo_to_skin(building[key][0]) + ".png"}`
                                                :
                                                `${"http://localhost:3000/poblado/" + mi_color + "/poblado_1.png"}`
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
                {"Fase: " + fase}
                {"---"}
                {"Permiso para construir carreteras: " + puedo_colocar_carretera}
                {"---"}
                {"Permiso para construir aldeas: " + puedo_colocar_aldea}
                {"---"}
                {"Ultima aldea construida: " + ultima_aldea_construida}
                {"---"}
                {"Aldea que puedo construir: " + aldea_que_puedo_construir}
                {"---"}
                {console.log("Jugadores: ")}
                {console.log(jugadores)}
                {/* {"Id de jugador 1: " + jugadores[0].id}
                {"---"}
                {"Id de jugador 2: " + jugadores[1].id}
                {"---"}
                {"Id de jugador 3: " + jugadores[2].id}
                {"---"}
                {"Id de jugador 4: " + jugadores[3].id} */}
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

                }}
            />

            <PopupTablaCostes />

        </div>
    );
}

export default Partida;