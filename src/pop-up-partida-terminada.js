import React, { useState, useEffect } from "react";

const PopUpFaseTirada = (props) => {
    const imageStyle = {
        width: "100%",
        height: "auto",
        marginBottom: "10px",
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column", //agregar esta propiedad para cambiar la dirección de los elementos
        alignItems: "center", // agregar esta propiedad para centrar los elementos horizontalmente
        marginTop: "20px",
    };

    return (
        <>
            <div className="fixed z-50 inset-0 bg-black bg-opacity-0 flex items-center justify-center">
                <div
                    className="relative bg-black rounded-lg p-4 bg-opacity-80 inline-flex flex-col items-center h-4/5 "
                    style={{ height: "100%", width: "100%" }}
                >
                    <h1
                        className="text-5xl mt-2"
                        style={{ color: "white", fontWeight: "700", marginTop: "50px" }}
                    >
                        {props.idGanador === props.mi_id ? "¡Ganaste!" : "¡Ha ganado " + props.nombreGanador + "!"}
                    </h1>{" "}
                    <div style={containerStyle}>

                        <img
                            src={props.imgGanador}
                            alt="Imagen 1"
                            style={{ height: "200px", width: "200px", marginTop: "70px" }}
                        />

                        <div class="mt-20">
                            <button
                                onClick={() => {
                                    // Regreso al menú home
                                    window.location.href = "http://localhost:3000/home";
                                }}
                                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                                style={{ fontSize: "30px", marginLeft: "20px" }}
                            >
                                Volver al menú principal
                            </button>
                        </div>
                    </div>
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default PopUpFaseTirada;
