import React from "react";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { useNavigate } from 'react-router-dom';

function Tienda() {

    // Función para acceder a la historia de navegación
    const navigate = useNavigate();

    // Función para volver a la página anterior
    const handleBack = () => {
        navigate(-1);
    };

    // Cantidad del dinero obtenida del backend
    const info = {
        dinero: 50,
        iconos_desbloqueados: [
            true,
            true,
            false,
            false,
            false,
            true,
            false,
            false,
            false
        ]
    }

    const handleDragStart = (e) => e.preventDefault();

    /////////////////////// CARRUSEL DE FOTOS DE PERFIL ////////////////////////

    const precio_foto_perfil = "10 $";

    const responsive = {
        0: { items: 1 },
        1: { items: 2 },
        2: { items: 3 },
        3: { items: 4 },
        4: { items: 5 },
        5: { items: 6 },
    };

    const fotos_perfil = [
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif"
    ]

    function comprar_foto_perfil(indice_foto) {
        info.dinero -= 10;
        info.iconos_desbloqueados[indice_foto] = true;
    }

    const items_fotos_perfil = fotos_perfil.map((foto, i) => (
        <div className="slide_tienda">
            {
                <Popup trigger={
                    info.iconos_desbloqueados[i] ?
                        (
                            <img src="http://localhost:3000/ladron.png" onDragStart={handleDragStart} role="presentation"
                                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle" />
                        )
                        :
                        (
                            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation"
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
                            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation"
                                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle" />

                            {/* Texto de compra en el centro */}
                            <div className="text-center">
                                <br />
                                <p className="text-2xl font-bold">¿Estás seguro?</p>
                            </div>

                            {/* Boton de comprar */}
                            <br /> <br />
                            <div className="flex justify-center">
                                <button className="boton_comprar_tienda"
                                    onClick={() => {
                                        comprar_foto_perfil(i);
                                        console.log(info.dinero);
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

    /////////////////////////// CARRUSEL DE FICHAS /////////////////////////////

    const precio_fichas = "50 $";

    const responsive_fotos_fichas = {
        6: { items: 1 },
        7: { items: 2 },
        8: { items: 3 },
        9: { items: 4 },
        10: { items: 5 },
        11: { items: 6 },
    };

    const fotos_fichas = [
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif",
        "http://localhost:3000/perfil1.avif"
    ]

    const items_fotos_fichas = fotos_perfil.map((foto, i) => (
        <div className="slide_tienda">
            {/* Imagen del objeto */}
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation"
                className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle" />

            {/* Precio del objeto */}
            {precio_fichas}
        </div>
    ));

    //////////////////////////// FUNCIÓN PRINCIPAL /////////////////////////////

    return (
        <div className="estilo">
            {/* Flecha de retroceso */}
            <img src="http://localhost:3000/flecha_retroceso.png" className="icono_retroceso" onClick={handleBack} alt="flecha_retroceso" />

            {/* Icono del dinero con el dinero */}
            <img src="http://localhost:3000/dinero.png" className="icono_dinero_tienda" alt="icono_dinero" />
            <a className="dinero_tienda">{info.dinero}</a>

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
            <a className="titulo_fotos_fichas_tienda">Fotos de perfil</a>

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

export default Tienda;
