import React from 'react';
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function Amigos_todos() {
  {
    /* --------------------------- "variables" de la página  --------------------------- */
  }

  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Agregamos removeCookie
  const [open, setOpen] = useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const inputRef = useRef(null);
  // Función para acceder a la historia de navegación
  const navigate = useNavigate();
  // Función para volver a la página anterior
  const handleBack = () => {
    navigate(-1);
  };


  {
    /* --------------------------- cookies  --------------------------- */
  }

  // cargamos los datos de los usuarios y hacemos decode del token
  const Token = cookies.token;
  const json_token = jwt_decode(Token);

  {
    /* --------------------------- obtener datos usuario  --------------------------- */
  }
// Obtener la cookie de sesión del back-end
const sessionCookie = getCookie('session');

// Si la cookie existe, realizar una petición PUT al endpoint correspondiente para obtener la lista de amigos

const [Amigos, setAmigos] = useState([]);
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
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  {
    /* --------------------------- obtener el numero de solicitudes de amistad --------------------------- */
  }
  const [nummensajes, set_nummensajes] = React.useState(null);
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
      <img src={index.foto} className="icono_jugadores" alt="icono_jugadores"/>
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

  const [AmigosFiltrados, setAmigosFiltrados] = useState([]);
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
      setAmigosFiltrados(newFiltrado);
      console.log(AmigosFiltrados);
      const resultadosFiltrado = AmigosFiltrados.map((index) => (
        <a className="resultado_busqueda">
          <img src={index.foto} className="icono_jugadores" alt="icono_jugadores"/>
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
      
<div className="h-screen min-h-screen w-screen flex flex-col justify-center items-center py-10 gap-y-8 imagenCustom">
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
      {resultados}
    </ul>
  </div>
</div>

  );
}


