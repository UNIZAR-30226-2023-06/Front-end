import React from "react";
import { useState } from 'react';

function Partida() {
    const [mostrar_img_jugador_1, setMostrar_img_jugador_1] = useState(true);
    const [mostrar_img_jugador_2, setMostrar_img_jugador_2] = useState(true);
    const [mostrar_img_jugador_3, setMostrar_img_jugador_3] = useState(true);

    function actualizar_jugadores () {
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

    const jugadores = [
        {img: "http://localhost:3000/jugadores.png", nombre: "Ayelen#1234", puntos_victoria: 2, carreteras: false, caballeros: true},
        {img: "http://localhost:3000/jugadores.png", nombre: "Loreto#1234", puntos_victoria: 3, carreteras: true, caballeros: false},
        {img: "http://localhost:3000/jugadores.png", nombre: null},
        {img: null, nombre: null}
    ];
    
    return (
        <div className="estilo">
            <a className="menu_superior">
                {
                    mostrar_img_jugador_1 &&
                    <a className="superior_jugador_1">
                        <img src={jugadores[0].img} className="icono_jugador_superior" alt="icono_jugadores"/>
                    </a>
                }
                {
                    mostrar_img_jugador_2 &&
                    <a className="superior_jugador_2">
                        <img src={jugadores[1].img} className="icono_jugador_superior" alt="icono_jugadores"/>
                    </a>
                }
                {
                    mostrar_img_jugador_3 &&
                    <a className="superior_jugador_3">
                        <img src={jugadores[2].img} className="icono_jugador_superior" alt="icono_jugadores"/>
                    </a>
                }
            </a>

            <a className="contador_tiempo">

            </a>

            <a className="tiempo">

            </a>
        </div>
    );
}

export default Partida;