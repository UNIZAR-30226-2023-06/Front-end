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
    const [id_jugador_2, setId_jugador_2] = useState(5251);
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

    const jugadores = [
        { img: "http://localhost:3000/jugadores.png", nombre: "Ayelen#1234", puntos_victoria: 2, carreteras: false, caballeros: true },
        { img: "http://localhost:3000/jugadores.png", nombre: "Loreto#1234", puntos_victoria: 3, carreteras: true, caballeros: false },
        { img: "http://localhost:3000/jugadores.png", nombre: null },
        { img: null, nombre: null }
    ];

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
                        setImg_jugador_1("http://localhost:3000/fotos_perfil/personaje1.png");
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
                        setImg_jugador_2("http://localhost:3000/fotos_perfil/personaje2.png");
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
                        setImg_jugador_3("http://localhost:3000/fotos_perfil/personaje3.png");
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, []);

    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// RETURN PRINCIPAL /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    return (
        <div className="estilo">
            <a className="menu_superior_partida">
                {
                    mostrar_img_jugador_1 &&
                    <a className="superior_jugador_1_partida">
                        <img src={img_jugador_1} className="icono_jugador_superior" alt="icono_jugadores" />

                        <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />
                        
                        {
                            // Muestro los puntos de victoria del jugador 1
                            <a className="puntos_victoria_jugador_1">
                                {puntos_victoria_jugador_1}
                            </a>
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
                    </a>
                }
                {
                    mostrar_img_jugador_2 &&
                    <a className="superior_jugador_2_partida">
                        <img src={img_jugador_2} className="icono_jugador_superior" alt="icono_jugadores" />

                        <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                        {
                            // Muestro los puntos de victoria del jugador 1
                            <a className="puntos_victoria_jugador_2">
                                {puntos_victoria_jugador_2}
                            </a>
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
                    </a>
                }
                {
                    mostrar_img_jugador_3 &&
                    <a className="superior_jugador_3_partida">
                        <img src={img_jugador_3} className="icono_jugador_superior" alt="icono_jugadores" />

                        <img src={img_corona} className="icono_jugador_superior" alt="icono_jugadores" />

                        {
                            // Muestro los puntos de victoria del jugador 1
                            <a className="puntos_victoria_jugador_3">
                                {puntos_victoria_jugador_3}
                            </a>
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
                    </a>
                }
                <
                    img src={img_salir} className="icono_salir" alt="salir"
                    onClick={() => 
                                window.location.href = "http://localhost:3000/home"
                            }
                />
            </a>

            <a className="contador_tiempo">

            </a>

            <a className="tiempo">

            </a>

            <button className="w-40 flex h-40 hexagono_partida"
                style={{
                    position: "absolute",
                    top: 200,
                    left: "50%"
                }}
            >
                9
            </button>
        </div>
    );
}

export default Partida;