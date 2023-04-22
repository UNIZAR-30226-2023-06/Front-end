import React from 'react';
import { useState } from 'react';

function Sala_partida() {

    // Nombres de los jugadores en la sala
    const [nombre_jugador_1, setTexto_jugador1] = useState("Usa el código de la partida para invitar a más jugadores");
    const [nombre_jugador_2, setTexto_jugador2] = useState("Usa el código de la partida para invitar a más jugadores");
    const [nombre_jugador_3, setTexto_jugador3] = useState("Usa el código de la partida para invitar a más jugadores");
    const [nombre_jugador_4, setTexto_jugador4] = useState("Usa el código de la partida para invitar a más jugadores");

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

    function actualizar_jugadores() {
        // Pongo el nombre de los jugadores en la sala
        if (jugadores[0].nombre == null) {
            setTexto_jugador1("Usa el código de la partida para invitar a más jugadores");
            setTamano_texto_jugador_1("19px");
            setMostrar_img_jugador_1(false);
        } else {
            setTexto_jugador1(jugadores[0].nombre);
            setTamano_texto_jugador_1("");
            setMostrar_img_jugador_1(true);
        }

        if (jugadores[1].nombre == null) {
            setTexto_jugador2("Usa el código de la partida para invitar a más jugadores");
            setTamano_texto_jugador_2("");
            setMostrar_img_jugador_2(false);
        } else {
            setTexto_jugador2(jugadores[1].nombre);
            setTamano_texto_jugador_2("");
            setMostrar_img_jugador_2(true);
        }

        if (jugadores[2].nombre == null) {
            setTexto_jugador3("Usa el código de la partida para invitar a más jugadores");
            setTamano_texto_jugador_3("");
            setMostrar_img_jugador_3(false);
        }
        else {
            setTexto_jugador3(jugadores[2].nombre);
            setTamano_texto_jugador_3("");
            setMostrar_img_jugador_3(true);
        }

        if (jugadores[3].nombre == null) {
            setTexto_jugador4("Usa el código de la partida para invitar a más jugadores");
            setTamano_texto_jugador_4("");
            setMostrar_img_jugador_4(false);
        }
        else {
            setTexto_jugador4(jugadores[3].nombre);
            setTamano_texto_jugador_4("");
            setMostrar_img_jugador_4(true);
        }
    }

    const jugadores = [
        {img: "http://localhost:3000/jugadores.png", nombre: "Ayelen#1234"},
        {img: "http://localhost:3000/jugadores.png", nombre: "Loreto#1234"},
        {img: null, nombre: null},
        {img: null, nombre: null}
    ];

    return (
        <div style={{
            backgroundColor: '#122465',
        }}>
            
        </div>
    );
}

export default Sala_partida;
