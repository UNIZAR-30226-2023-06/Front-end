import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const PopUpFaseCompra = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [IdLobby, set_IdLobby] = React.useState(null);
  const [Detalle, set_detalle] = React.useState(null);

  const [cookies, setCookie] = useCookies(["token"]); // Agregamos removeCookie
  const Token = cookies.token;
  const json_token = jwt_decode(Token);
  const handleClose = () => {
    setShouldShowPopup(false);
    props.onClose();
  };

  const handleOpen = () => {
    setShouldShowPopup(true);
    setShowPopup(true);
  };

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (shouldShowPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [shouldShowPopup]);

  function handleClick() {
    GetLobby();
    ComprarCartaDesarrolllo();
  }

  function ComprarCartaDesarrolllo(){
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/game_phases/buy_development_card=${IdLobby}`,
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
          // Si el código es correcto, mostrar un mensaje de éxito en el toast
          set_detalle(data.id);
          if(Detalle === "No se pueden construir edificios en esta fase del turno"){
            toast.error("No tienes los recursos suficientes")
          }else if(Detalle === null){
            toast.error("Fallo interno del servidor")

          }else{
            toast.success("Carta de desarrollo comprada");
            console.log(Detalle);
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function GetLobby(){
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/get_lobby_from_player`,
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
          // Si el código es correcto, mostrar un mensaje de éxito en el toast
          set_IdLobby(data.id);
          console.log("hola");
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <button onClick={handleOpen}>Mostrar Popup</button>
      {showPopup && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleBackgroundClick}
        >
          <div
            className="relative bg-gray-400 rounded-lg p-4 inline-flex flex-col items-center h-4/5 "
            style={{ minHeight: "640px", width:"1000px" }}
          >
            <h1 className="text-3xl mt-2">FASE DE COMPRA Y CONSTRUCCION</h1>
            <img
              src="http://localhost:3000/white_cross.png"
              alt="close"
              className="absolute top-0 right-0 cursor-pointer mt-3 mr-3"
              style={{ width: "50px", height: "50px" }}
              onClick={handleClose}
            />

            <div
              className="absolute inset-y-0 left-0 w-1/4 bg-gray-900 mt-5 ml-7 rounded-lg"
              style={{ maxHeight: "745px", maxWidth: "200px", marginLeft:"20px" }}
            >
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src="http://localhost:3000/oveja.png"
                    alt="oveja"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">0</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src="http://localhost:3000/troncos.png"
                    alt="troncos"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">0</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src="http://localhost:3000/cebada.png"
                    alt="cebada"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">0</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src="http://localhost:3000/piedras.png"
                    alt="piedras"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">0</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src="http://localhost:3000/arcilla.png"
                    alt="arcilla"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">0</h1>
              </div>
            </div>
            <div>
              <div class="flex">
                <div
                  class="flex flex-col items-center"
                  style={{ marginBottom: "50px" }}
                >
                  <div class="rounded-lg overflow-hidden">
                    <img
                      src="http://localhost:3000/iconos-no-recursos/poblado.png"
                      alt="Foto 1"
                      style={{ height: "150px", width: "150px" }}
                    />
                  </div>
                  <div class="mt-10">
                    <button
                      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                      style={{
                        fontSize: "20px",
                        marginLeft: "20px",
                        width: "125px",
                      }}
                    >
                      Comprar poblado
                    </button>
                  </div>
                </div>

                <div class="rounded-lg overflow-hidden ml-4">
                  <img
                    src="http://localhost:3000/iconos-no-recursos/ciudad.png"
                    alt="Foto 2"
                    style={{ height: "150px", width: "150px" }}
                  />
                  <div class="mt-10">
                    <button
                      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                      style={{
                        fontSize: "20px",
                        marginLeft: "20px",
                        width: "125px",
                      }}
                    >
                      Comprar ciudad
                    </button>
                    
                  </div>
                </div>
              </div>
              <div class="flex">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="http://localhost:3000/iconos-no-recursos/carretera.png"
                    alt="Foto 3"
                    style={{ height: "150px", width: "150px" }}
                  />
                  <div class="mt-10">
                    <button
                      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                      style={{
                        fontSize: "20px",
                        marginLeft: "20px",
                        width: "125px",
                      }}
                    >
                      Comprar carretera
                    </button>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="http://localhost:3000/iconos-no-recursos/carta-de-desarrollo.png"
                    alt="Foto 4"
                    style={{
                      height: "150px",
                      width: "150px",
                      marginLeft: "40px",
                    }}
                  />
                  
                  <div class="mt-10">
                    <button
                      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                      style={{
                        fontSize: "20px",
                        marginLeft: "20px",
                        width: "195px",
                      }}
                      onClick={handleClick}
                    >
                      Comprar cartas de desarrollo
                    </button>
                    
                  </div>
                </div>
              </div>
              
            </div>
            {props.children}


          </div>
          <img
              src="http://localhost:3000/tabla-de-costes.png"
              alt="Foto 4"
              style={{
                height: "600px",
                width: "500px",
                right:"200px",
                top:"200px",
                marginLeft:"20px"
                
              }}
            />
        </div>
        
      )}
    </>
  );
};

export default PopUpFaseCompra;
