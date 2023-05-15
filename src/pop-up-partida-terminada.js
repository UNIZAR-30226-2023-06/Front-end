import React, { useState, useEffect } from "react";

const PopUpFinPartida = (params) => {
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
            {params.idGanador === params.mi_id
              ? "¡Ganaste!"
              : "¡Ha ganado " + params.nombreGanador + "!"}
          </h1>{" "}
          <div style={containerStyle}>
            {params.idGanador === params.mi_id && (
              <img
                src={params.imgGanador}
                alt="Imagen 1"
                style={{ height: "200px", width: "200px", marginTop: "70px" }}
              />
            )}

            <div class="mt-20">
              <button
                onClick={() => {
                  // Borrar la partida
                  // Ejemplo url:
                  // http://localhost:8000/delete-lobby?lobby_id=1234
                  fetch(
                    `${process.env.REACT_APP_URL_API}/delete-lobby?lobby_id=${params.lobby}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${params.token}`,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                    })
                    .catch((err) => console.log(err));

                  // Regreso al menú home
                  window.location.href = `${process.env.REACT_APP_URL_FRONTED}/home`;
                }}
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                style={{ fontSize: "30px", marginLeft: "20px" }}
              >
                Volver al menú principal
              </button>
            </div>
          </div>
          {params.children}
        </div>
      </div>
    </>
  );
};

export default PopUpFinPartida;
