import React from "react";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./Home";
import PrivateHome from "./PrivateHome";
import Login from "./Login";
import Registro from "./Register";
import Amigos_todos from "./Amigos_todos";
import Amigos_pendiente from "./Amigos_pendiente"; 
import RecPassword from "./recPassword";
import Lista_partidas from "./Lista_partidas";
import Sala_partida from "./Sala_partida";
import Partida from "./Partida";
import Tienda from "./Tienda";
import EditaPerfil from "./EditarPerfil";
import Instrucciones from "./Instrucciones";
import Creando_partida_privada from "./creando_partida_privada";

export default function App() { 
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Home />}/> */}
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/registro" element={<Registro/>}/>
          <Route exact path="/home" element={<PrivateHome/>} />
          <Route exact path="/amigosT" element={<Amigos_todos/>} />
          <Route exact path="/amigosP" element={<Amigos_pendiente/>} />
          <Route exact path="/RecPassword" element={<RecPassword/>} />
          <Route exact path="/lista_partidas" element={<Lista_partidas/>} />
          <Route exact path="/sala_partida" element={<Sala_partida/>} />
          <Route exact path="/partida" element={<Partida/>} />
          <Route exact path="/tienda" element={<Tienda/>} />
          <Route exact path="/editarPerfil" element={<EditaPerfil/>} />
          <Route exact path="/Instrucciones" element={<Instrucciones/>} />
          <Route exact path="/Partida_privada" element={<Creando_partida_privada />}/>

        </Routes>
      </Router>
    </>
  );
}