import React from 'react';

import { useNavigate } from 'react-router-dom';

function Sala_partida() {

  // Función para acceder a la historia de navegación
  const navigate = useNavigate();

  // Función para volver a la página anterior
  const handleBack = () => {
    navigate(-1);
  };

  const [searchTerm, setSearchTerm] = React.useState("");

  /*const filteredResults = results.filter((result) => {
    return result.partida.toLowerCase().includes(searchTerm.toLowerCase());
  });*/

  // Aquí los resultados de la búsqueda, estos se sustituirán por los resultados
  // de la búsqueda cuando se implemente la búsqueda llamando al backend
  const results = [
    {
      nombre: "Nombre_1",
      id: "0001",
      ladron: "Sí",
      num_jugadores: 4,
      puntos_victoria: 10,
      tiempo_turno: 60
    },
    {
      nombre: "Nombre_2",
      id: "0002",
      ladron: "No",
      num_jugadores: 5,
      puntos_victoria: 15,
      tiempo_turno: 90
    },
    {
      nombre: "Nombre_3",
      id: "0003",
      ladron: "Sí",
      num_jugadores: 6,
      puntos_victoria: 20,
      tiempo_turno: 120
    },
    {
      nombre: "Nombre_4",
      id: "0004",
      ladron: "No",
      num_jugadores: 7,
      puntos_victoria: 25,
      tiempo_turno: 150
    },
    {
      nombre: "Nombre_5",
      id: "0005",
      ladron: "Sí",
      num_jugadores: 8,
      puntos_victoria: 30,
      tiempo_turno: 180
    },
    {
      nombre: "Nombre_6",
      id: "0006",
      ladron: "No",
      num_jugadores: 9,
      puntos_victoria: 35,
      tiempo_turno: 210
    },
    {
      nombre: "Nombre_7",
      id: "0007",
      ladron: "Sí",
      num_jugadores: 10,
      puntos_victoria: 40,
      tiempo_turno: 240
    }
  ];

  // Un lista de resultados
  const resultados = results.map((index) => (
    <a className="resultado_busqueda" href={`https://www.ejemplo.com/${index.id}`}>
      <code>
        {index.nombre}#{index.id}
      </code>
      <img src={`${process.env.REACT_APP_URL_FRONTED}/jugadores.png`} className="icono_jugadores" alt="icono_jugadores"/>
      <img src={`${process.env.REACT_APP_URL_FRONTED}/ladron.png`} className="icono_ladron" alt="icono_ladron"/>
      <img src={`${process.env.REACT_APP_URL_FRONTED}/puntos_victoria.png`} className="icono_puntos_victoria" alt="icono_puntos_victoria"/>
      <img src={`${process.env.REACT_APP_URL_FRONTED}/tiempo_turno.png` }className="icono_tiempo_turno" alt="icono_tiempo_turno"/>
      <p className="num_jugadores">
        {index.num_jugadores}
      </p>
      <p className="tiempo_turno">
        {index.tiempo_turno}
      </p>
      <p className="puntos_victoria">
        {index.puntos_victoria}
      </p>
      <p className="ladron">
        {index.ladron}
      </p>
    </a>
  ));

  return (
    <div className="estilo">
      {/* Flecha de retroceso */}
      <img src={`${process.env.REACT_APP_URL_FRONTED}/flecha_retroceso.png`} className="icono_retroceso" onClick={handleBack} alt="flecha_retroceso"/>

      {/* Caja de texto para filtrar los resultados */}
      <input type="text" id="search-box" placeholder="      Codigo partida" onChange={(e) => setSearchTerm(e.target.value)} className="input_text"/>

      {/* Botón para filtrar los resultados */}
      <button type="button" id="search-button" className="boton">Buscar</button>

      {/* Lista de resultados */}
      <ul class="lista">
        {/*filteredResults.map((result) => (
          <li key={result.id}>{result.name}</li>
          ))*/}
        {resultados}
      </ul>

    </div>
  );
}

export default Sala_partida;
