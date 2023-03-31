import React from 'react';
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useRef } from "react";

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
  console.log(json_token);

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
      console.log(newAmigos);
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
      console.log(newAmigos);
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
      <code>
        {index.nombre}#{index.id}
      </code>
      <img src={index.foto} className="icono_jugadores" alt="icono_jugadores"/>
      {/* Botón para dejar de seguir */}
      <button type="button" id="search-button" className="boton-dejar-de-seguir">Dejar de seguir</button>
    </a>
  ));

  

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

    <button type="button" id="search-button" className="bg-white text-blue-500 font-bold py-2 px-4 rounded ml-auto">Buscar</button>
    </div>

    <div className="flex justify-center mt-4">
  <button type="button" id="todos-button" className="text-black-500 font-bold py-2 px-4 mr-20 border-b border-black border-b-4 mb-2">Todos</button>
  <a href="/AmigosP">
    <button type="button" id="pendientes-button" className="text-white font-bold py-2 px-4 ml-20 mb-2" onClick={() => setOpen(!open)}>Pendientes</button>
  </a>
  
</div>



    {/* Lista de resultados */}
    <ul className="opacity-95 bg-cyan-900 w-full rounded-xl shadow-xl mb-20 flex-col justify-center items-center p-4 max-h-98 overflow-y-scroll">
      {/*filteredResults.map((result) => (
        <li key={result.id}>{result.name}</li>
        ))*/}
      {resultados}
    </ul>
  </div>
</div>

  );
}


