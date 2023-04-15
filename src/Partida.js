import React, { useEffect } from "react";
import { useState } from 'react';

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

    const [mostrar_img_jugador_1, setMostrar_img_jugador_1] = useState(true);
    const [mostrar_img_jugador_2, setMostrar_img_jugador_2] = useState(true);
    const [mostrar_img_jugador_3, setMostrar_img_jugador_3] = useState(true);

    const [img_jugador_1, setImg_jugador_1] = useState(null);
    const [img_jugador_2, setImg_jugador_2] = useState(null);
    const [img_jugador_3, setImg_jugador_3] = useState(null);

    const [id_jugador_1, setId_jugador_1] = useState(5251);
    const [id_jugador_2, setId_jugador_2] = useState(5252);
    const [id_jugador_3, setId_jugador_3] = useState(1135);

    const [puntos_victoria_jugador_1, setPuntos_victoria_jugador_1] = useState(0);
    const [puntos_victoria_jugador_2, setPuntos_victoria_jugador_2] = useState(0);
    const [puntos_victoria_jugador_3, setPuntos_victoria_jugador_3] = useState(0);

    const [tiene_bono_caballeros_jugador_1, setTiene_bono_caballeros_jugador_1] = useState(false);
    const [tiene_bono_caballeros_jugador_2, setTiene_bono_caballeros_jugador_2] = useState(true);
    const [tiene_bono_caballeros_jugador_3, setTiene_bono_caballeros_jugador_3] = useState(false);

    const [tiene_bono_carreteras_jugador_1, setTiene_bono_carreteras_jugador_1] = useState(true);
    const [tiene_bono_carreteras_jugador_2, setTiene_bono_carreteras_jugador_2] = useState(false);
    const [tiene_bono_carreteras_jugador_3, setTiene_bono_carreteras_jugador_3] = useState(false);

    // Aquí va el id del jugador que tiene el turno
    const [turno, setTurno] = useState(5251);

    // Recordatorio de fases:
    // 0: Obtención de recursos
    // 1: Uso de cartas de desarrollo
    // 2: Negociación
    // 3: Construcción
    const [fase, setFase] = useState(3);

    const [tiempo, setTiempo] = useState(0);
    const [tiempo_maximo, setTiempo_maximo] = useState(30);

    const [color_jugador_1, setColor_jugador_1] = useState(0);
    const [color_jugador_2, setColor_jugador_2] = useState(1);
    const [color_jugador_3, setColor_jugador_3] = useState(2);
    const [color_jugador_4, setColor_jugador_4] = useState(3);

    const jugadores = [
        { img: "http://localhost:3000/jugadores.png", nombre: "Ayelen#1234", puntos_victoria: 2, carreteras: false, caballeros: true },
        { img: "http://localhost:3000/jugadores.png", nombre: "Loreto#1234", puntos_victoria: 3, carreteras: true, caballeros: false },
        { img: "http://localhost:3000/jugadores.png", nombre: "null" },
        { img: null, nombre: null }
    ];

    const [board, setBoard] = useState(
        {
            "51": [6, 3],
            "53": [8, 5],
            "55": [10, 2],
            "83": [4, 2],
            "85": [5, 1],
            "87": [6, 5],
            "89": [8, 4],
            "115": [9, 2],
            "117": [10, 3],
            "119": [0, 6],
            "121": [11, 4],
            "123": [12, 4],
            "149": [2, 3],
            "151": [3, 1],
            "153": [4, 5],
            "155": [5, 3],
            "183": [9, 5],
            "185": [11, 1],
            "187": [3, 1]
        }
    );

    const ficha_con_id = [
        null,
        "http://localhost:3000/casillas/ovejas.jpg",
        "http://localhost:3000/casillas/trigo.jpg",
        "http://localhost:3000/casillas/madera.jpg",
        "http://localhost:3000/casillas/roca.jpg",
        "http://localhost:3000/casillas/arcilla.jpg",
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

    const [road, setRoad] = useState(
        {
            "34": null,
            "35": 1,
            "36": 1,
            "37": 1,
            "38": 1,
            "39": 1,

            "50": null,
            "52": 1,
            "54": 1,
            "56": 1,

            "66": 1,
            "67": 1,
            "68": 1,
            "69": 1,
            "70": 1,
            "71": null,
            "72": 1,
            "73": 1,

            "82": 1,
            "84": 1,
            "86": null,
            "88": 1,
            "90": 1,

            "98": 1,
            "99": 1,
            "100": 1,
            "101": 1,
            "102": null,
            "103": 1,
            "104": 1,
            "105": 1,
            "106": 1,
            "107": 1,

            "114": 1,
            "116": 1,
            "118": null,
            "120": 1,
            "122": 1,
            "124": 1,

            "131": 1,
            "132": 1,
            "133": 1,
            "134": 1,
            "135": 1,
            "136": 1,
            "137": 1,
            "138": 1,
            "139": null,
            "140": 1,

            "148": 1,
            "150": 1,
            "152": null,
            "154": null,
            "156": 1,

            "165": 1,
            "166": 1,
            "167": 1,
            "168": 1,
            "169": 1,
            "170": null,
            "171": 1,
            "172": 1,

            "182": 1,
            "184": 1,
            "186": null,
            "188": 1,

            "199": 1,
            "200": 1,
            "201": 1,
            "202": null,
            "203": 1,
            "204": 1
        }
    );

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
    const [building, setBuilding] = useState(
        {
            "35": [0, 0],
            "37": [1, 1],
            "39": [2, 0],

            "50": [3, 0],
            "52": [0, 0],
            "54": [1, 1],
            "56": [2, 0],

            "67": [3, 0],
            "69": [0, 0],
            "71": [1, 1],
            "73": [2, 0],

            "82": [3, 0],
            "84": [0, 0],
            "86": [1, 0],
            "88": [2, 1],
            "90": [3, 0],

            "99": [0, 0],
            "101": [1, 0],
            "103": [2, 1],
            "105": [3, 0],
            "107": [0, 0],

            "114": [1, 0],
            "116": [2, 0],
            "118": [3, 0],
            "120": null,
            "122": [1, 1],
            "124": [2, 0],

            "131": [3, 0],
            "133": [0, 0],
            "135": [1, 0],
            "137": [2, 1],
            "139": [3, 0],
            "141": [0, 0],

            "148": [1, 0],
            "150": [2, 1],
            "152": null,
            "154": [0, 1],
            "156": [1, 0],

            "165": [2, 0],
            "167": [3, 1],
            "169": [0, 1],
            "171": [1, 0],
            "173": [2, 0],

            "182": [3, 1],
            "184": [0, 0],
            "186": [1, 1],
            "188": [2, 0],

            "199": [3, 0],
            "201": [0, 0],
            "203": [1, 1],
            "205": [2, 0],

            "216": [3, 0],
            "218": [0, 1],
            "220": [1, 0]
        }
    );

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

    function actualizar_jugadores() {
        if (jugadores[0].nombre == null) {
            setMostrar_img_jugador_1(false);
        } else {
            setMostrar_img_jugador_1(true);
        }

        if (jugadores[1].nombre == null) {
            setMostrar_img_jugador_2(false);
        }
        else {
            setMostrar_img_jugador_2(true);
        }

        if (jugadores[2].nombre == null) {
            setMostrar_img_jugador_3(false);
        }
        else {
            setMostrar_img_jugador_3(true);
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// FETCHS INICIALES /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

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

                    // Logs
                    console.log("JSON del jugador:");
                    console.log(data);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        if (mostrar_img_jugador_1) {
            fetch(
                `${process.env.REACT_APP_URL_BACKEND}/get-user-from-id/${parseInt(
                    id_jugador_1
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

        if (mostrar_img_jugador_2) {
            fetch(
                `${process.env.REACT_APP_URL_BACKEND}/get-user-from-id/${parseInt(
                    id_jugador_2
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

        if (mostrar_img_jugador_3) {
            fetch(
                `${process.env.REACT_APP_URL_BACKEND}/get-user-from-id/${parseInt(
                    id_jugador_3
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
    }, [Token, json_token.id, id_jugador_1, id_jugador_2, id_jugador_3, mostrar_img_jugador_1, mostrar_img_jugador_2, mostrar_img_jugador_3]);

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
            <div className="menu_superior_partida">
                {
                    mostrar_img_jugador_1 &&
                    <div className="superior_jugador_1_partida">
                        <img src={img_jugador_1} className="icono_jugador_superior" alt="icono_jugadores" />

                        <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                        {
                            // Muestro los puntos de victoria del jugador 1
                            <div className="puntos_victoria_jugador_1">
                                {puntos_victoria_jugador_1}
                            </div>
                        }

                        {
                            tiene_bono_caballeros_jugador_1 ? (
                                <img src={img_caballero_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                            ) : (
                                <img src={img_caballero_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                            )
                        }

                        {
                            tiene_bono_carreteras_jugador_1 ? (
                                <img src={img_camino_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                            ) : (
                                <img src={img_camino_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                            )
                        }
                    </div>
                }
                {
                    mostrar_img_jugador_2 &&
                    <div className="superior_jugador_2_partida">
                        <img src={img_jugador_2} className="icono_jugador_superior" alt="icono_jugadores" />

                        <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                        {
                            // Muestro los puntos de victoria del jugador 1
                            <div className="puntos_victoria_jugador_2">
                                {puntos_victoria_jugador_2}
                            </div>
                        }

                        {
                            tiene_bono_caballeros_jugador_2 ? (
                                <img src={img_caballero_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                            ) : (
                                <img src={img_caballero_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                            )
                        }

                        {
                            tiene_bono_carreteras_jugador_2 ? (
                                <img src={img_camino_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                            ) : (
                                <img src={img_camino_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                            )
                        }
                    </div>
                }
                {
                    mostrar_img_jugador_3 &&
                    <div className="superior_jugador_3_partida">
                        <img src={img_jugador_3} className="icono_jugador_superior" alt="icono_jugadores" />

                        <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                        {
                            // Muestro los puntos de victoria del jugador 1
                            <div className="puntos_victoria_jugador_3">
                                {puntos_victoria_jugador_3}
                            </div>
                        }

                        {
                            tiene_bono_caballeros_jugador_3 ? (
                                <img src={img_caballero_negro} className="icono_jugador_superior" alt="icono_jugadores" />
                            ) : (
                                <img src={img_caballero_gris} className="icono_jugador_superior" alt="icono_jugadores" />
                            )
                        }

                        {
                            tiene_bono_carreteras_jugador_3 ? (
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

            {/************************** HEXAGONOS ***************************/}

            {Object.entries(board).map(([key, value], index) => {
                return (
                    <button className="w-36 flex h-40 hexagono_partida"
                        style={{
                            position: "absolute",
                            top: init_top_board - top_variation_board[index] * top_variation_unit,
                            left: "50%",
                            transform: `translateX(${init_left_board + left_variation_board[index] * left_variation_unit}px)`,

                            backgroundImage: `url(${ficha_con_id[board[key][1]]
                                })`,
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
                            (road[key] != null || (turno === id_jugador_1 && fase === 3)) &&
                            <button className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : (turno === id_jugador_1 && fase === 3 && "carretera_sin_comprar_partida")}`}
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
                            (road[key] != null || (turno === id_jugador_1 && fase === 3)) &&
                            <button className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : (turno === id_jugador_1 && fase === 3 && "carretera_sin_comprar_partida")}`}
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
                            (road[key] != null || (turno === id_jugador_1 && fase === 3)) &&
                            <button className={`w-20 flex h-5 ${road[key] != null ? "carretera_partida" : (turno === id_jugador_1 && fase === 3 && "carretera_sin_comprar_partida")}`}
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
                            (building[key] != null || (turno === id_jugador_1 && fase === 3)) &&
                            <button
                                className={`w-10 flex h-10 ${building[key] != null ? "construccion_partida" : (turno === id_jugador_1 && fase === 3 && "construccion_sin_comprar_partida")}`}
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
                                                `http://localhost:3000/poblado/poblado_${color_jugador_1}.png`
                                        )
                                        }
                                    )`,
                                }}
                            />
                        }
                    </div>
                )
            })}
        </div>
    );
}

export default Partida;