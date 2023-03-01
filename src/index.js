import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Inicio_sesion from './Inicio_sesion';
import Registro from './Registro';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));


// cargamos la página de App los nombres deben de coincidir 
root.render(
  <React.StrictMode>
    <Registro />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
