import React from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";

export default function EditaPerfil() {
  /* --------------------------- "variables" de la página  --------------------------- */
  const [dinero, set_dinero] = React.useState(null);
  const [nombre, set_nombre] = React.useState(null);
  const [codigo, set_codigo] = React.useState(null);
  const [imagen, set_imagen] = React.useState(null);
  const [elo, set_elo] = React.useState(null);
  const [cookies] = useCookies(["token"]); // Agregamos removeCookie

  if (cookies.token === undefined) {
    window.location.href = "http://localhost:3000/login";
  }

  /* --------------------------- cookies  --------------------------- */

  // cargamos los datos de los usuarios y hacemos decode del token
  const Token = cookies.token;
  const json_token = jwt_decode(Token);
  console.log(json_token);

  /* --------------------------- obtener datos usuario  --------------------------- */

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
            ? "http://localhost:3000/fotos_perfil/personaje1.png"
            : `http://localhost:3000/fotos_perfil/personaje${imagen}.png`;

        set_dinero(data.coins);
        set_codigo(data.id);
        set_nombre(data.username);
        set_imagen(img);
        set_elo(data.elo);
        // console.log(data);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // fotos de perfil
  const fotos_perfil = [
    "http://localhost:3000/fotos_perfil/personaje1.png",
    "http://localhost:3000/fotos_perfil/personaje2.png",
    "http://localhost:3000/fotos_perfil/personaje3.png",
    "http://localhost:3000/fotos_perfil/personaje4.png",
    "http://localhost:3000/fotos_perfil/personaje5.png",
    "http://localhost:3000/fotos_perfil/personaje6.png",
    "http://localhost:3000/fotos_perfil/personaje7.png",
    "http://localhost:3000/fotos_perfil/personaje8.png",
    "http://localhost:3000/fotos_perfil/personaje9.png",
  ];
  const handleDragStart = (e) => e.preventDefault();

  return (
    <div className="w-full h-full flex imagenCustomPrivateHome">
      <div className="h-screen min-h-screen w-screen flex flex-col justify-center items-center py-10 gap-y-8 imagenCustom">
        <div className="bg-cyan-900/60 rounded-lg p-4 inline-flex flex-col items-center h-4/5 w-4/5">
          {/* --------------------------- flecha para atras --------------------------- */}

          <a href="/home" className="absolute top-6 left-4">
            <img
              src="http://localhost:3000/flechaMenu.png"
              className={`relative cursor-pointer w-7 p-1 border-cyan-900`}
            />
          </a>

          {/* --------------------------- carrito y monedas --------------------------- */}

          <div className="absolute top-0 right-0 m-4">
            <div className="flex top-0 right-0 justify-end">
              <h1 className="mt-6 mr-1">{dinero}</h1>
              <img
                className="w-7 h-7 mt-5"
                src="http://localhost:3000/dinero.png"
                alt="indicamos el dinero que los jugadores tienen es una imagen de un billete y a su izquierda esta el número"
              />

              <img
                onClick={() => {
                  window.location.href = "http://localhost:3000/tienda";
                }}
                alt="lin para ir a la tienda del juego"
                className="w-10 h-10 m-4 hover:cursor-pointer"
                src="http://localhost:3000/carrito.png"
              />
            </div>
          </div>

          {/* --------------------------- foto del usuario  --------------------------- */}

          <img
            alt="profil"
            src={imagen}
            className={`mx-auto object-cover rounded-full h-28 w-28 mt-9`}
          />

          {/* --------------------------- nombre del usuario --------------------------- */}

          <h1
            className={`text-white origin-center content-center font-medium text-xl duration-300 mt-2`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {nombre}#{codigo}
          </h1>
          <h1
            className={`text-white origin-center content-center font-medium text-xl duration-300 mt-2`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            ELO: {elo} ⚔
          </h1>

          {/* --------------------------- carrusel 9428 --------------------------- */}

          <AliceCarousel
            responsive={{
              0: { items: 1 },
              640: { items: 3 },
              768: { items: 5 },
              1024: { items: 7 },
              1280: { items: 7 },
              1536: { items: 9 },
              1792: { items: 9 },
            }}
            mouseTracking
            items={fotos_perfil.map((foto, i) => {
              const id = i === 0 ? "imagen" : ""; // Establecer el id de la primera imagen como "imagen"
              const opacity = id ? 1 : 0.5; // Establecer la opacidad de la imagen dependiendo de si tiene el id "imagen" o no

              return (
                <img
                  key={i}
                  src={foto}
                  onDragStart={handleDragStart}
                  role="presentation"
                  className={`mx-auto h-28 w-28 object-cover mt-9 rounded-full duration-300 justify-center align-middle ${id}`}
                  onClick={() => {
                    const imageName = `Imagen ${i + 1}`;
                    alert(imageName);
                  }}
                  style={{ opacity: opacity }} // Establecer la opacidad de la imagen
                />
              );
            })}
          />
        </div>
      </div>
    </div>
  );
}
