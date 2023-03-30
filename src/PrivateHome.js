import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";

export default function PrivateHome() {
  /* --------------------------- "variables" de la página  --------------------------- */

  const [cookies, removeCookie] = useCookies(["token"]); // Agregamos removeCookie
  const [open, setOpen] = useState(true);
  const [dinero, set_dinero] = React.useState(null);
  const [nombre, set_nombre] = React.useState(null);
  const [codigo, set_codigo] = React.useState(null);
  const [imagen, set_imagen] = React.useState(null);
  const [elo, set_elo] = React.useState(null);

  // leemos el token y lo imprimimos por consola
  // console.log(cookies.token);

  /* --------------------------- seguridad  --------------------------- */

  // en caso de que no estemos logueados ve a la página de login
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
  ).then((res) => {
    res.json().then((data) => {
      // Actualizamos el estado de cosas
      const img =
        data.profile_picture === "default"
          ? "http://localhost:3000/fotos_perfil/personaje1.png"
          : `http://localhost:3000/fotos_perfil/personaje${imagen}.png`;

      set_dinero(data.coins);
      set_codigo(data.id);
      set_nombre(data.username);
      set_imagen("http://localhost:3000/fotos_perfil/personaje1.png");
      set_elo(data.elo);
      // console.log(data);
    });
  });

  /* --------------------------- función del boton añadir amigos --------------------------- */

  const handleClick = () => {
    //const value = inputRef.current.value;
    // console.log(value); // haz algo con el valor obtenido del input
  };

  return (
    // fondo
    <div className="w-full h-full flex imagenCustomPrivateHome">
      {/* --------------------------- sidebar --------------------------- */}

      <div
        className={` h-full opacity-95 ${
          open ? "w-72" : "w-20"
        } duration-300 h-screen p-5 pt-8 border border-solid border-cyan-900 relative sidebar_PrivateHome`}
      >
        {/* --------------------------- flecha ---------------------------*/}

        <img
          src="http://localhost:3000/flecha2.png"
          className={`absolute cursor-pointer rounded-full 
          -right-3 top-9 w-7 border-2 p-1 bg-white border-cyan-900 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
          alt="si le das a esta flecha la sidebar se hace más pequeña"
        />

        {/* --------------------------- foto del avatar --------------------------- */}

        <div className="relative block gap-x-4 mx-auto">
          <img
            alt="profil"
            src={imagen}
            className={`mx-auto object-cover rounded-full h-28 w-28 mt-9 ${
              !open &&
              "h-9 w-9 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"
            }`}
          />

          {/* --------------------------- nombre del usuario --------------------------- */}

          <h1
            className={`text-white origin-center content-center font-medium text-xl duration-300 mt-2 ${
              !open && `scale-0`
            }`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {nombre}#{codigo}
          </h1>
          <h1
            className={`text-white origin-center content-center font-medium text-xl duration-300 mt-2 ${
              !open && `scale-0`
            }`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            ELO: {elo} ⚔
          </h1>
        </div>
        <ul className="flex flex-col w-full items-center py-6 px-4 gap-2 ">
          <a
            href="http://localhost:3000/amigosT"
            className="gap-3 mt-2 flex flex-grow"
          >
            {/* --------------------------- editar perfil --------------------------- */}

            <img
              alt="profil"
              src="http://localhost:3000/editProfile.png"
              className={`object-cover h-8 w-8 ${
                !open && "h-8 w-8 duration-300 ml-8"
              }`}
            />

            <h1
              href="/login"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl duration-300 ${
                !open && `scale-0`
              }`}
            >
              Editar perfil
            </h1>
          </a>

          {/* --------------------------- amigos ---------------------------*/}

          <a
            href="http://localhost:3000/amigosT"
            className="gap-3 mt-2 flex flex-grow"
          >
            {/* imagen amigos*/}
            <img
              alt="profil"
              src="http://localhost:3000/friends.png"
              className={`object-cover h-8 w-8 ${
                !open && "h-8 w-8 duration-300 ml-12"
              }`}
            />

            <h1
              href="/login"
              variant={Link}
              className={`text-white font-medium text-xl duration-300 ${
                !open && `scale-0`
              }`}
            >
              Amigos
            </h1>
          </a>

          {/* --------------------------- logout --------------------------- */}

          <div
            className="gap-3 mt-2 flex flex-grow hover:cursor-pointer"
            onClick={() => {
              // borramos las cookies
              removeCookie("token");
              window.location.href = "http://localhost:3000/login";
            }}
          >
            {/* imagen log out*/}
            <img
              alt="profil"
              src="http://localhost:3000/logout.png"
              className={`object-cover h-8 w-8 ${
                !open && "h-8 w-8 duration-300 ml-8"
              }`}
            />

            <h1
              href="/login"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl duration-300 ${
                !open && `scale-0`
              }`}
            >
              Cerrar sesión
            </h1>
          </div>

          {/* --------------------------- añadir amigos --------------------------- */}

          <form
            className={`fixed bottom-0 left-0 p-4 ${!open && `scale-0`}`}
            onSubmit={(e) => {
              e.preventDefault(); // Agregar esto para evitar que la página se recargue
              fetch(
                `${process.env.REACT_APP_URL_BACKEND}/send_friend_request?friend_id=${e.target.amigo_id.value}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${Token}`,
                  },
                }
              ).then((res) => {
                res.json().then((data) => {
                  if ( data.detail === `Friend request already exists`) {
                    toast.error("este usuario ya tiene una solicitud tuya pendiente");
                  } else if (data.detail === `User not found`) {
                    toast.error("usuario no encontrado");
                    toast("si quieres enviar una solicitud pon solo el id", {
                      ico: `😉`,
                    });
                  } else if (data.detail === `Friend request sent`){
                    toast.success("solicitud enviada con éxito");
                  }
                });
              });
                       
            }}
          >
            <input
              id="amigo_id"
              className="p-2 mr-2 border border-transparent border-b-white bg-transparent text-white focus:outline-none focus:border-b-white"
              type="text"
              placeholder="Añadir amigo"
            ></input>
            <button className="px-4 py-2 rounded-full bg-cyan-900 hover:bg-slate-900 text-white w-12 h-10">
              <img
                src="http://localhost:3000/add-friend.png"
                alt="boton de añadir amigos"
              />
            </button>
          </form>
        </ul>
      </div>

      {/* --------------------------- cuerpo de la página --------------------------- */}

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

      {/* --------------------------- botones centrales ---------------------------*/}

      <div className="felx flex-col gap-8 mx-auto my-auto  w-96">
        <button
          className="-mt-40 w-80 flex h-20 btn_private_home "
          onClick={() => {
            window.location.href = "http://localhost:3000/login";
          }}
        >
          BUSCAR PARTIDA
        </button>
        <button
          className="mt-20 w-80 flex h-20 btn_private_home "
          onClick={() => {
            window.location.href = "http://localhost:3000/login";
          }}
        >
          UNIRSE CON CÓDIGO
        </button>
        <button
          className="mt-20 w-80 flex h-20 btn_private_home "
          onClick={() => {
            window.location.href = "http://localhost:3000/login";
          }}
        >
          CREAR PARTIDA CON AMIGOS
        </button>
      </div>
    </div>
  );
}
