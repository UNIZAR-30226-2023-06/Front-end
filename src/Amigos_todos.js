import React from "react";
import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Amigos_Todos() {

  {
    /* --------------------------- variables --------------------------- */
  }

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
  const [dinero, set_dinero] = React.useState(null);
  const [nombre, set_nombre] = React.useState(null);
  const [codigo, set_codigo] = React.useState(null);
  const [imagen, set_imagen] = React.useState(null);
  const [nummensajes, set_nummensajes] = React.useState(null);
  const [elo, set_elo] = React.useState(null);

  const [cookies, setCookie] = useCookies(["token"]); // Agregamos removeCookie

  const [open, setOpen] = useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filtradoTrue, setFiltradoTrue] = React.useState(false);
  const inputRef = useRef(null);
  // Función para acceder a la historia de navegación
  const navigate = useNavigate();
  const [AmigosFiltrados, setAmigosFiltrados] = useState([]);

  // Función para volver a la página anterior
  const handleBack = () => {
    navigate(-1);
  };
  {
    /* --------------------------- obtener datos usuario  --------------------------- */
  }
  // Obtener la cookie de sesión del back-end
  const sessionCookie = getCookie('session');

  // Si la cookie existe, realizar una petición PUT al endpoint correspondiente para obtener la lista de amigos

  const [Amigos, setAmigos] = useState([]);
  // cargamos los datos de los usuarios y hacemos decode del token
  const Token = cookies.token;
  const json_token = jwt_decode(Token);
  console.log(json_token);




  {
    /* --------------------------- calculamos el tamaño de la ventana --------------------------- */
  }

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
  if (cookies.token === "") {
    return <Navigate to="/login" />;
  }


  /* --------------------------- obtener datos usuario  --------------------------- */
  function GetResultados(){

  
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

    {
      /* --------------------------- miramos si hay mensajes pendientes --------------------------- */
    }

    fetch(`${process.env.REACT_APP_URL_BACKEND}/get_friend_requests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        response.json().then((data) => {
          console.log(data.number_of_requests);
          set_nummensajes(data.number_of_requests);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });



    fetch(`${process.env.REACT_APP_URL_BACKEND}/get_friends`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        res.json().then((data) => {
          // Update state
          const nFriends = data.number_of_friends;
          const newAmigos = [];
          for (let i = 0; i < data.number_of_friends; i++) {
            const imagen =
              data.friends[i].profile_picture === "default"
                ? "http://localhost:3000/fotos_perfil/personaje1.png"
                : `http://localhost:3000/fotos_perfil/personaje${data.friends[i].profile_picture}.png`;
            const codigo = data.friends[i].friend_id;
            const name = data.friends[i].friend_name;

            newAmigos.push({
              nombre: name,
              id: codigo,
              foto: imagen
            });
          }
          setAmigos(newAmigos);
          console.log(Amigos);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });


    {
      /* --------------------------- obtener el numero de solicitudes de amistad --------------------------- */
    }
    fetch(`${process.env.REACT_APP_URL_BACKEND}/get_friend_requests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        response.json().then((data) => {
          set_nummensajes(data.number_of_requests);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }, []);
  }









  // Función para obtener una cookie por su nombre
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }


  // Un lista de resultados
  const resultados = Amigos.map((index) => (
    <a className="resultado_busqueda">
      <img src={index.foto} className="icono_jugadores" alt="icono_jugadores" />
      <code>
        {index.nombre}#{index.id}
      </code>
      {/* Botón para dejar de seguir */}
      <button type="button" id="search-button" className="boton-dejar-de-seguir" onClick={() => dejarDeSeguir(index.id, index.nombre)}>Dejar de seguir</button>
    </a>
  ));



  function dejarDeSeguir(id, nombre) {
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/delete_friend?friend_id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        res.json().then((data) => {
          // Si el código es correcto, mostrar un mensaje de éxito en el toast
          if (res.status === 200) {
            toast.success(`has dejado de seguir a ${nombre}`);
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function filtrar(searchTerm) {
    if (!searchTerm.includes("#")) {
      toast.error(`La busqueda tiene que ser del formato nombre#id`);
      return;
    }
    // Hacer algo con el término de búsqueda, como enviarlo a un servidor o filtrar una lista de elementos
    const amigoBuscado = Amigos.find((amigo) => {
      const [nombre, id] = searchTerm.split("#");
      let idEntero = parseInt(id);
      return amigo.nombre === nombre && amigo.id === idEntero;
    });

    if (amigoBuscado) {
      toast.success(`El amigo fue encontrado`);

      const { nombre, id, foto } = amigoBuscado;
      const newFiltrado = [];
      newFiltrado.push({
        nombre: nombre,
        id: id,
        foto: foto
      });
      console.log(newFiltrado);
      setAmigosFiltrados({
        nombre: nombre,
        id: id,
        foto: foto
      });
      console.log(AmigosFiltrados);
      setFiltradoTrue(true);
      const resultadosFiltrado = AmigosFiltrados.map((index) => (
        <a className="resultado_busqueda">
          <img src={index.foto} className="icono_jugadores" alt="icono_jugadores" />
          <code>
            {index.nombre}#{index.id}
          </code>
          {/* Botón para dejar de seguir */}
          <button type="button" id="search-button" className="boton-dejar-de-seguir" onClick={() => dejarDeSeguir(index.id, index.nombre)}>Dejar de seguir</button>
        </a>
      ));

    } else {
      toast.error(`No se ha encontrado el amigo`);

      console.log("Amigo no encontrado");
    }

  }

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
          className={`hover:cursor-pointer ${screenSize < 720 && desplegado ? styleCruzOn : styleCruzOff
            }`}
          onClick={() => {
            setDesplegado(false);
          }}
        />

        {/* --------------------------- datos del usuario --------------------------- */}

        <div className="relative block gap-x-4 mx-auto">
          {/* --------------------------- foto del avatar --------------------------- */}
          <img
            alt="profil"
            src={imagen}
            className={`mx-auto object-cover rounded-full h-28 w-28 mt-9 bg-teal-200`}
          />
          {/* --------------------------- nombre del usuario --------------------------- */}

          <h1
            className={`text-white origin-center content-center font-medium text-xl mt-2`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {nombre}#{codigo}
          </h1>
          <h1
            className={`text-white origin-center content-center font-medium text-lg mt-2`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            ELO: {elo} ⚔
          </h1>
          {/* --------------------------- dinero --------------------------- */}
          <h1
            className={`text-white origin-center content-center font-medium text-lg mt-1`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {dinero}

            <img
              alt="profil"
              src="http://localhost:3000/white_dinero.png"
              className={`w-6 h-6 ml-2`}
            />
          </h1>
        </div>
        <ul className="flex flex-col w-full items-start py-6 px-4 gap-2 ">
          {/* --------------------------- volver al home --------------------------- */}
          <a href="http://localhost:3000/home" className={styleLinks}>
            <img
              alt="profil"
              src="http://localhost:3000/home.png"
              className={`object-cover h-7 w-7`}
            />

            <h1
              href="http://localhost:3000/editarPerfil"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Inicio
            </h1>
          </a>
          {/* --------------------------- editar perfil --------------------------- */}
          <a href="http://localhost:3000/editarPerfil" className={styleLinks}>
            <img
              alt="profil"
              src="http://localhost:3000/editProfile.png"
              className={`object-cover h-7 w-7`}
            />

            <h1
              href="http://localhost:3000/editarPerfil"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Editar perfil
            </h1>
          </a>
          {/* --------------------------- amigos ---------------------------*/}
          <a href="http://localhost:3000/amigosT" className={styleLinks}>
            {/* imagen amigos*/}
            <img
              alt="profil"
              src="http://localhost:3000/friends.png"
              className={`object-cover h-7 w-7}`}
            />
            {nummensajes > 0 && (
              <>
                <div
                  className="absolute top-0 right-0 transform translate-x-14 -translate-y-1/4 h-4 w-4 bg-red-800 text-white text-xs flex items-center justify-center rounded-full"
                  style={{ left: "50%" }}
                >
                  {nummensajes}
                </div>
              </>
            )}
            <h1
              href="/login"
              variant={Link}
              className={`text-white font-medium text-xl duration-300`}
            >
              Amigos
            </h1>
          </a>
          {/* --------------------------- tienda --------------------------- */}
          <a href="http://localhost:3000/tienda" className={styleLinks}>
            <img
              alt="profil"
              src="http://localhost:3000/shopping-cart.png"
              className={`object-cover h-7 w-7`}
            />

            <h1
              href="http://localhost:3000/editarPerfil"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Tienda
            </h1>
          </a>

          {/* --------------------------- logout --------------------------- */}

          <div
            className={`hover:cursor-pointer ${styleLinks}`}
            onClick={() => {
              // "borramos" las cookies
              setCookie("token", "", { path: "/" });
              window.location.href = "http://localhost:3000/login";
            }}
          >
            {/* imagen log out*/}
            <img
              alt="profil"
              src="http://localhost:3000/logout.png"
              className={`object-cover h-7 w-7`}
            />

            <h1
              href="/login"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Cerrar sesión
            </h1>
          </div>
          {/* --------------------------- añadir amigos --------------------------- */}

          <form
            className={`flex bottom-0 left-0 mt-72`}
            // `bottom-0 left-0 p-4 w-auto fixed`
            // "absolute left-0 w-full bg-gray-200 p-4">

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
              )
                .then((res) => {
                  res.json().then((data) => {
                    if (data.detail === `Friend request already exists`) {
                      toast.error(
                        "este usuario ya tiene una solicitud tuya pendiente"
                      );
                    } else if (data.detail === `User not found`) {
                      toast.error("usuario no encontrado");
                      toast("si quieres enviar una solicitud pon solo el id", {
                        ico: `😉`,
                      });
                    } else if (data.detail === `Friend request sent`) {
                      toast.success("solicitud enviada con éxito");
                    }
                  });
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            <input
              id="amigo_id"
              className={`w-48 p-2 mr-2 border border-transparent border-b-white focus:border focus:border-white bg-transparent text-white`}
              type="text"
              placeholder="Añadir amigo: 2345"
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
      {/* --------------------------- menu plegado --------------------------- */}
      <img
        src="http://localhost:3000/menu.png"
        alt="Example image"
        className={`hover:cursor-pointer w-8 h-8 m-4 ${screenSize < 720 && !desplegado ? styleMenuOn : styleMenuOff
          }`}
        onClick={() => {
          setDesplegado(true);
        }}
      />
      {/* --------------------------- Página --------------------------- */}
      <div>
        <h1 className="m-14">


          <div className="bg-cyan-900/60 rounded-lg p-4 inline-flex flex-col items-center h-4/5">
            <div className="flex items-center my-4">

              <a href="/home">
                <img
                  src="http://localhost:3000/flechaMenu.png"
                  className={`relative cursor-pointer left-0 top-90 w-10 p-1 border-cyan-900 flex-grow-0 mr-5 ${!open}`}
                  onClick={() => setOpen(!open)}
                />
              </a>

              <input
                type="text"
                id="search-box"
                placeholder="usuario#1234"
                className="w-96 border border-transparent border-b-black/25 bg-white focus:outline-none focus:border-b-black h-12 text-lg rounded-md mr-5 "
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button type="button" id="search-button" className="bg-white text-blue-500 font-bold py-2 px-4 rounded ml-auto" onClick={() => filtrar(searchTerm)}>Buscar</button>
            </div>

            <div className="flex justify-center mt-4">
              <button type="button" id="todos-button" className="text-black-500 font-bold py-2 px-4 mr-20 border-b border-black border-b-4 mb-2">Todos</button>
              <a href="/AmigosP">
                <button type="button" id="pendientes-button" className="text-white font-bold py-2 px-4 ml-20 mb-2" onClick={() => setOpen(!open)}>Pendientes</button>
                {nummensajes > 0 && (
                  <>
                    {open && (
                      <div
                        className="absolute top-20 right-0 h-4 w-4 bg-red-800 text-white text-xs flex items-center justify-center rounded-full"
                        style={{ left: "50%", transform: "translate(1050%, 1050%)" }}
                      >
                        {nummensajes}
                      </div>
                    )}
                    {!open && (
                      <div
                        className="absolute top-20 right-0 h-4 w-4 bg-red-800 text-white text-xs flex items-center justify-center rounded-full"
                        style={{ left: "50%", transform: "translate(1050%, 1050%)" }}
                      >
                        {nummensajes}
                      </div>
                    )}
                  </>
                )}
              </a>

            </div>



            {/* Lista de resultados */}
            <ul className="opacity-95 bg-cyan-900 w-full rounded-xl shadow-xl mb-20 flex-col justify-center items-center p-4 max-h-98 overflow-y-scroll">
            {!filtradoTrue ? 
  <>
    {GetResultados()}
    {resultados}
  </>
: null}
            </ul>
          </div>

        </h1>
      </div>
    </div>
  );
}