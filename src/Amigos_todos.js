import React from 'react';
import { useState } from "react";

import { useNavigate } from 'react-router-dom';

function Amigos_todos() {

  // Función para acceder a la historia de navegación
  const navigate = useNavigate();

  // Función para volver a la página anterior
  const handleBack = () => {
    navigate(-1);
  };

  const [searchTerm, setSearchTerm] = React.useState("");
  const [open, setOpen] = useState(false);
  /*const filteredResults = results.filter((result) => {
    return result.partida.toLowerCase().includes(searchTerm.toLowerCase());
  });*/

  // Aquí los resultados de la búsqueda, estos se sustituirán por los resultados
  // de la búsqueda cuando se implemente la búsqueda llamando al backend
  const results = [
    {
      nombre: "Nombre_1",
      id: "0001",
      foto: 1
    },
    {
      nombre: "Nombre_2",
      id: "0002",
      foto: 2

    },
    {
      nombre: "Nombre_3",
      id: "0003",
      foto: 3

    },
    {
      nombre: "Nombre_4",
      id: "0004",
      foto: 4
    },
    {
      nombre: "Nombre_5",
      id: "0005",
      foto: 5
    },
    {
      nombre: "Nombre_6",
      id: "0006",
      foto: 6
    },
    {
      nombre: "Nombre_7",
      id: "0007",
      foto: 7
    },

    {
      nombre: "Nombre_8",
      id: "0008",
      foto: 8
    },
    {
      nombre: "Nombre_9",
      id: "0009",
      foto: 9
    }
  ];

  // Un lista de resultados
  const resultados = results.map((index) => (
    <a className="resultado_busqueda" href={`https://www.ejemplo.com/${index.id}`}>
      <code>
        {index.nombre}#{index.id}
      </code>
      <img src="foto" className="icono_jugadores" alt="icono_jugadores"/>
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

export default Amigos_todos;
