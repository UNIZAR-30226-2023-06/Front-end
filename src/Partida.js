import React from "react";
import { useEffect } from "react";
import { useState } from 'react';

import Tabs from "./components/Tabs";

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

    const mi_id = useState(json_token.id);

    const [img_jugador_1, setImg_jugador_1] = useState(null);
    const [img_jugador_2, setImg_jugador_2] = useState(null);
    const [img_jugador_3, setImg_jugador_3] = useState(null);

    // Aquí va el id del jugador que tiene el turno
    const [turno, setTurno] = useState(2880);

    // Recordatorio de fases:
    // 0: Obtención de recursos
    // 1: Uso de cartas de desarrollo
    // 2: Negociación
    // 3: Construcción
    const [fase, setFase] = useState(3);

    const [tiempo, setTiempo] = useState(0);
    const [tiempo_maximo, setTiempo_maximo] = useState(30);

    const [jugadores, setJugadores] = useState([]);

    const [board, setBoard] = useState({});

    const ficha_con_id = [
        null,
        "http://localhost:3000/casillas/ovejas.jpg",
        "http://localhost:3000/casillas/arcilla.jpg",
        "http://localhost:3000/casillas/madera.jpg",
        "http://localhost:3000/casillas/roca.jpg",
        "http://localhost:3000/casillas/trigo.jpg",
        "http://localhost:3000/casillas/desierto.jpg"
    ];

    const init_top_board = 470;
    const init_left_board = -100;

    const top_variation_board = [
        0, 1, 2, -1, 0, 1, 2, -2, -1, 0, 1, 2, -2, -1, 0, 1, -2, -1, 0];
    const top_variation_unit = 135;

    const left_variation_board = [
        -4, -3, -2, -3, -2, -1, 0, -2, -1, 0, 1, 2, 0, 1, 2, 3, 2, 3, 4];
    const left_variation_unit = 80;

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

    function Tab(props) {
        const isActive = props.active === props.label;
        return (
            <div
                className={`tab ${isActive ? 'active' : ''}`}
                onClick={() => props.onClick(props.label)}
            >
                {props.label}
            </div>
        );
    }

    function Tabs() {
        const [activeTab, setActiveTab] = useState('tab1');
        const handleClick = (tab) => setActiveTab(tab);
        return (
            <div className="tabs">
                <Tab label="tab1" active={activeTab} onClick={handleClick} />
                <Tab label="tab2" active={activeTab} onClick={handleClick} />
            </div>
        );
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

        fetch(
            url_partida,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${Token}`,
                }
            }
        )
            .then((res) => {
                res.json().then((data) => {
                    console.log("JSON de la partida:");
                    console.log(data);

                    setJugadores(data.players);

                    setBoard(data.game.tiles);
                    setRoad(data.game.edges);
                    setBuilding(data.game.nodes);

                    setTiempo_maximo(data.max_tiempo_turno);
                    setTurno(data.turno);
                    setFase(data.fase);
                });
            });

    }, [Token, json_token.id]);

    useEffect(() => {

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
        const interval = setInterval(() => {

            ///////////////////////// CÓDIGO PERIODICO /////////////////////////

            setTiempo((tiempo + 1) % tiempo_maximo);

            ////////////////////////////////////////////////////////////////////

        }, 1000);

        return () => clearInterval(interval);
    }, [tiempo, tiempo_maximo]);

    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// RETURN PRINCIPAL /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    return (
        <div className="estilo">

            {/* Menu superior */}
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


            {/************************** HEXAGONOS ***************************/}

            {Object.entries(board).map(([key], index) => {
                return (
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
                )
            })}

            {/************************** CARRETERAS **************************/}

            {Object.entries(road).map(([key, value], index) => {
                return (
                    <div>
                        {
                            type_road[index] === 0 &&
                            (road[key] != null || (turno === mi_id && fase === 3)) &&
                            <button className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : (turno === mi_id && fase === 3 && "carretera_sin_comprar_partida")}`}
                                style={{
                                    position: "absolute",
                                    top: ((init_top_board + init_top_road_relative_vertical) - top_variation_road[index] * top_variation_unit),
                                    left: "50%",
                                    transform: `translateX(${(init_left_board + init_left_road_relative_vertical) + left_variation_road[index] * left_variation_unit}px) rotate(90deg)`,

                                    backgroundImage: `url(
                                        ${"http://localhost:3000/carreteras/carretera_" + road["38"] + ".jpg"}
                                    )`,
                                }}
                            />
                        }

                        {
                            type_road[index] === 1 &&
                            (road[key] != null || (turno === mi_id && fase === 3)) &&
                            <button className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : (turno === mi_id && fase === 3 && "carretera_sin_comprar_partida")}`}
                                style={{
                                    position: "absolute",
                                    top: ((init_top_board + init_top_road_relative_ascend) - top_variation_road[index] * top_variation_unit),
                                    left: "50%",
                                    transform: `translateX(${(init_left_board + init_left_road_relative_ascend) + left_variation_road[index] * left_variation_unit}px) rotate(-30deg)`,

                                    backgroundImage: `url(
                                        ${"http://localhost:3000/carreteras/carretera_" + road["38"] + ".jpg"}
                                    )`,
                                }}
                            />
                        }

                        {
                            type_road[index] === 2 &&
                            (road[key] != null || (turno === mi_id && fase === 3)) &&
                            <button className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : (turno === mi_id && fase === 3 && "carretera_sin_comprar_partida")}`}
                                style={{
                                    position: "absolute",
                                    top: ((init_top_board + init_top_road_relative_descend) - top_variation_road[index] * top_variation_unit),
                                    left: "50%",
                                    transform: `translateX(${(init_left_board + init_left_road_relative_descend) + left_variation_road[index] * left_variation_unit}px) rotate(30deg)`,

                                    backgroundImage: `url(
                                        ${"http://localhost:3000/carreteras/carretera_" + road["38"] + ".jpg"}
                                    )`,
                                }}
                            />
                        }
                    </div>
                )
            })}

            {/*************************** POBLADOS ***************************/}

            {Object.entries(building).map(([key, value], index) => {
                return (
                    <div>
                        {
                            (building[key] != null || (turno === mi_id && fase === 3)) &&
                            <button
                                className={`w-10 flex h-10 ${building[key] != null ? "construccion_partida" : (turno === mi_id && fase === 3 && "construccion_sin_comprar_partida")}`}
                                style={{
                                    position: "absolute",
                                    top: ((init_top_board + init_top_building_relative_vertical) - top_variation_building[index] * top_variation_unit),
                                    left: "50%",
                                    transform: `translateX(${(init_left_board + init_left_building_relative_vertical) + left_variation_building[index] * left_variation_unit}px)`,

                                    backgroundImage: `url(
                                        ${(
                                            building[key] != null ?
                                                `http://localhost:3000/${building[key][1] === 0 ? "poblado" : "ciudad"}/${building[key][1] === 0 ? "poblado" : "ciudad"}_` + building[key][0] + ".png"
                                                :
                                                `http://localhost:3000/poblado/poblado_0.png`
                                        )
                                        }
                                    )`,
                                }}
                            />
                        }
                    </div>
                )
            })}

            <img src={"http://localhost:3000/tabla-de-costes.png"} alt="tablero_instrucciones" />

            
        </div>
    );
}

export default Partida;