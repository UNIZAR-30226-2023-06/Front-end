import React from 'react';

import flecha_retroceso from './assets/flecha_retroceso.png';
import { useNavigate } from 'react-router-dom';

import './App.css';

function App() {

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

  return (
    <div className="estilo">
      {/* Flecha de retroceso */}
      <img src={flecha_retroceso} className="icono_retroceso" onClick={handleBack} alt="flecha_retroceso"/>

      {/* Caja de texto para filtrar los resultados */}
      <input type="text" id="search-box" placeholder="      Codigo partida" onChange={(e) => setSearchTerm(e.target.value)} className="input_text"/>

      {/* Botón para filtrar los resultados */}
      <button type="button" id="search-button" className="boton">Buscar</button>

      {/* Lista de resultados */}
      <ul class="lista">
        {/*filteredResults.map((result) => (
          <li key={result.id}>{result.name}</li>
          ))*/}
        <li className="resultado">
          <button type="button" id="search-button">Buscar</button>
        </li>
        <li class="resultado">Resultado 2</li>
        <li class="resultado">Resultado 3</li>
        <li class="resultado">Resultado 4</li>
      </ul>

    </div>
  );
}

export default App;
