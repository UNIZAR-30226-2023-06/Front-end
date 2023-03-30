import React from "react";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { useNavigate } from 'react-router-dom';

// 1-- Importamos useCookies y jwt_decode
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function Tienda() {

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////// DECLARACIÓN DE LAS CONSTANTES ///////////////////////
    ////////////////////////////////////////////////////////////////////////////

    // Dinero del jugador
    const [dinero, set_dinero] = React.useState(null);

    const [fotos_perfil_compradas, set_fotos_perfil_compradas] =
        React.useState([ true, true, false, false, false, true, false, false,
            false ]);

    // 2-- Creamos la estructura de las cookies
    const [cookies] = useCookies(["token"]);

    // 3-- Obtenemos el token de las cookies
    const Token = cookies.token;

    // 4-- Obtenemos la información del token
    const json_token = jwt_decode(Token);

    // Función para acceder a la historia de navegación
    const navigate = useNavigate();

    // Función para volver a la página anterior
    const handleBack = () => { navigate(-1); };

    const handleDragStart = (e) => e.preventDefault();

    const precio_foto_perfil = "10 $";

    const responsive = {
        0: { items: 1 },
        1: { items: 2 },
        2: { items: 3 },
        3: { items: 4 },
        4: { items: 5 },
        5: { items: 6 },
    };

    const precio_fichas = "50 $";

    const responsive_fotos_fichas = {
        6: { items: 1 },
        7: { items: 2 },
        8: { items: 3 },
        9: { items: 4 },
        10: { items: 5 },
        11: { items: 6 },
    };

    ////////////////////////////////////////////////////////////////////////////
    /////////////////////// FETCHS INICIALES NECESARIOS ////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    // 5-- Hacemos el fetch para obtener la información del usuario
    fetch(`${process.env.REACT_APP_URL_BACKEND}/get-user-from-id/${parseInt(json_token.id)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${Token}`
        }
    })
        .then((res) => {
            res.json().then((data) => {
                set_dinero(data.coins)
            });
        })

    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////// FUNCIONES /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    function comprar(dinero) {
        const url = `${process.env.REACT_APP_URL_BACKEND}/add-coins?amount=
            ${dinero}`;

        fetch(url, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${Token}`,
            },
        });

        set_dinero();
    }

    ////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// COMPONENTES ////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    // CARRUSEL DE FOTOS DE PERFIL
    const items_fotos_perfil = fotos_perfil_compradas.map((foto, i) => (
        <div className="slide_tienda">
            {
                <Popup trigger={
                    fotos_perfil_compradas[i] ?
                        (
                            <img src="http://localhost:3000/ladron.png" onDragStart={handleDragStart} role="presentation"
                                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle" />
                        )
                        :
                        (
                            <img src={"http://localhost:3000/fotos_perfil/personaje" + i + ".png"} onDragStart={handleDragStart} role="presentation"
                                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle" />
                        )
                } modal nested
                    arrow={false}

                    contentStyle={{
                        width: "30%",
                        height: "40%",

                        border: "5px solid black",
                        borderRadius: "10px",
                    }}
                >
                    {close => (
                        <div className="modal_tienda">
                            {/* Botón para cerrar el pop-up */}
                            <button className="close" onClick={close}>
                                &times;
                            </button>

                            {/* Imagen del objeto */}
                            <img src={"http://localhost:3000/fotos_perfil/personaje" + i + ".png"} onDragStart={handleDragStart} role="presentation"
                                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle" />

                            {/* Texto de "¿Estás seguro?" en el centro */}
                            <div className="text-center">
                                <br />
                                <p className="text-2xl font-bold">¿Estás seguro?</p>
                            </div>

                            {/* Boton de comprar */}
                            <br /> <br />
                            <div className="flex justify-center">
                                <button className="boton_comprar_tienda"
                                    onClick={ () => {
                                        comprar(10);
                                        close();
                                    }}
                                >
                                    Confirmar compra:
                                    <br />
                                    {precio_foto_perfil}
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
            }

            {/* Precio del objeto */}
            {precio_foto_perfil}
        </div>
    ));

    // CARRUSEL DE FICHAS
    const items_fotos_fichas = fotos_perfil_compradas.map((foto, i) => (
        <div className="slide_tienda">
            {/* Imagen del objeto */}
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation"
                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle" />

            {/* Precio del objeto */}
            {precio_fichas}
        </div>
    ));

    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////// FUNCIÓN PRINCIPAL /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    return (
        <div className="estilo">
            {/* Flecha de retroceso */}
            <img src="http://localhost:3000/flecha_retroceso.png" className="icono_retroceso" onClick={handleBack} alt="flecha_retroceso" />

            {/* Icono y texto del dinero */}
            <img src="http://localhost:3000/dinero.png" className="icono_dinero_tienda" alt="icono_dinero" />
            <TextComponent dinero={dinero} />

            {/*************************** Sliders ****************************/}

            {/* Titulo de "fotos de perfil" */}
            <a className="titulo_fotos_perfil_tienda">Fotos de perfil</a>

            {/* Slider de fotos de perfil */}
            <div className="slider_fotos_perfil_tienda">
                <AliceCarousel
                    mouseTracking
                    items={items_fotos_perfil}
                    responsive={responsive}
                    controlsStrategy="alternate"
                />
            </div>

            {/* Titulo de "fotos de perfil" */}
            <a className="titulo_fotos_fichas_tienda">Fichas</a>

            {/* Slider de fotos de perfil */}
            <div className="slider_fotos_fichas_tienda">
                <AliceCarousel
                    mouseTracking
                    items={items_fotos_fichas}
                    responsive={responsive_fotos_fichas}
                    controlsStrategy="alternate"
                />
            </div>
        </div>
    );
}

// Para que el otro componente se actualice, lo paso como prop al componente.
function TextComponent(props) {
    return (
        <a className="dinero_tienda">{props.dinero}</a>
    );
}

export default Tienda;
