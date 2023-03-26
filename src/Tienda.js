import React from "react";
import Slider from "react-slick";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { useNavigate } from 'react-router-dom';

function Tienda() {

    // Función para acceder a la historia de navegación
    const navigate = useNavigate();

    // Función para volver a la página anterior
    const handleBack = () => {
        navigate(-1);
    };

    // Cantidad del dinero obtenida del backend
    const dinero = {
        cantidad: 50
    }

    const precio_icono = "10 $";

    // Configuración del slider
    const handleDragStart = (e) => e.preventDefault();

    const responsive = {
        0: { items: 1 },
        1: { items: 2 },
        2: { items: 3 },
        3: { items: 4 },
        4: { items: 5 },
        5: { items: 6 },
    };

    const items = [
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>
    ];

    const responsive_fotos_fichas = {
        6: { items: 1 },
        7: { items: 2 },
        8: { items: 3 },
        9: { items: 4 },
        10: { items: 5 },
        11: { items: 6 },
    };

    const items_fotos_fichas = [
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>,
        <div className="slide_tienda">
            <img src="http://localhost:3000/perfil1.avif" onDragStart={handleDragStart} role="presentation" 
            className="mx-auto object-cover rounded-full h-28 w-28 mt-9 h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"/>
            
            {/* Precio del objeto */}
            {precio_icono}
        </div>
    ];

    return (
        <div className="estilo">
            {/* Flecha de retroceso */}
            <img src="http://localhost:3000/flecha_retroceso.png" className="icono_retroceso" onClick={handleBack} alt="flecha_retroceso" />

            {/* Icono del dinero con el dinero */}
            <img src="http://localhost:3000/dinero.png" className="icono_dinero_tienda" alt="icono_dinero" />
            <a className="dinero_tienda">{dinero.cantidad}</a>

            {/*************************** Sliders ****************************/}

            {/* Titulo de "fotos de perfil" */}
            <a className="titulo_fotos_perfil_tienda">Fotos de perfil</a>

            {/* Slider de fotos de perfil */}
            <div className="slider_fotos_perfil_tienda">
                <AliceCarousel 
                    mouseTracking
                    items={items}
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
