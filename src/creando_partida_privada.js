import React from "react";
import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Creando_partida_privada() {
  /* --------------------------- variables --------------------------- */

  const [desplegado, setDesplegado] = useState(true);
  const styleSidebarOn =
    "transition-all duration-900 w-80 h-full opacity-95 p-5 pt-8 border border-solid border-cyan-900 sidebar_PrivateHome";
  const styleSidebarOff = "hidden transition-all duration-900";
  const styleMenuOn =
    "transition-all duration-900 absolute top-0 left-0 w-10 h-10 object-cover";
  const styleMenuOff = "hidden transition-all duration-900";
  const styleCruzOn =
    "hover:cursor-pointer transition-all duration-900 absolute top-0 right-0 w-8 h-8 mr-2 mt-2 object-cover";
  const styleCruzOff = "transition-all duration-900 hidden";
  const styleLinks = "gap-3 mt-2 ml-1 flex flex-grow relative ";
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const navigate = useNavigate();
  const [dinero, set_dinero] = React.useState(null);
  const [nombre, set_nombre] = React.useState(null);
  const [codigo, set_codigo] = React.useState(null);
  const [imagen, set_imagen] = React.useState(null);
  const [cookies, setCookie] = useCookies(["token"]); // Agregamos removeCookie

  /* --------------------------- calculamos el tamaño de la ventana --------------------------- */

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenSize(newScreenWidth);
      if (newScreenWidth < 720) {
        setDesplegado(false);
      } else {
        setDesplegado(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  /* --------------------------- seguridad  --------------------------- */

  // en caso de que no estemos logueados ve a la página de login
  useEffect(() => {
    if (cookies.token === "") {
      navigate("/login");
    }
  }, [cookies.token, navigate]);

  /* --------------------------- cookies  --------------------------- */

  // cargamos los datos de los usuarios y hacemos decode del token
  const Token = cookies.token;
  const json_token = jwt_decode(Token);
  // console.log(json_token);

  /* --------------------------- obtener datos usuario  --------------------------- */

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
          const img =
            data.profile_picture === "default"
              ? "http://localhost:3000/fotos_perfil/skin1.png"
              : `http://localhost:3000/fotos_perfil/${data.profile_picture}.png`;

          set_dinero(data.coins);
          set_codigo(data.id);
          set_nombre(data.username);
          set_imagen(img);
          console.log(img);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [json_token.id]);

  return (
    /* --------------------------- fondo de las montañas --------------------------- */
    <div className="w-full h-full flex imagenCustomPrivateHome">
      {/* --------------------------- menu --------------------------- */}
      <div
        className={`over_SideBaar relative h-full ${
          // si la ventana es pequeña o desplegado falso que no se vea
          screenSize < 720 && !desplegado ? styleSidebarOff : styleSidebarOn
        }`}
      >
        {/* --------------------------- cruz de cerrar menu --------------------------- */}
        <img
          src="http://localhost:3000/white_cross.png"
          alt="imagen para cerrar la sidebar"
          className={`hover:cursor-pointer ${
            screenSize < 720 && desplegado ? styleCruzOn : styleCruzOff
          }`}
          onClick={() => {
            setDesplegado(false);
          }}
        />
        {/*  */}
        <h1
          href="http://localhost:3000/editarPerfil"
          variant={Link}
          className={` w-full p-2 text-white origin-center content-center font-medium text-xl border-solid border-transparent border-b-2 border-white`}
        >
          CONFIGURAR PARTIDA
        </h1>
        {/* --------------------------- volver al home --------------------------- */}
        <a
          href="http://localhost:3000/home"
          className={`absolute bottom-0 left-0 right-0 md:static md:w-auto md:h-auto`}
        >
          <h1
            href="http://localhost:3000/editarPerfil"
            variant={Link}
            className={`text-white origin-center content-center font-medium text-xl`}
          >
            ❌ Cancelar partida privada
          </h1>
        </a>

        {/* --------------------------- menu plegado --------------------------- */}
        <img
          src="http://localhost:3000/menu.png"
          alt="menu desplegable, clicka aqui para desplegarlo"
          className={`hover:cursor-pointer w-8 h-8 m-4 ${
            screenSize < 720 && !desplegado ? styleMenuOn : styleMenuOff
          }`}
          onClick={() => {
            setDesplegado(true);
          }}
        />
        {/* --------------------------- botones centrales ---------------------------*/}
      </div>
    </div>
  );
}
