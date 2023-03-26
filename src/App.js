import React from "react";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./Home";
import PrivateHome from "./PrivateHome";
import Login from "./Login";
import Registro from "./Register";
import Amigos from "./Amigos";
import RecPassword from "./recPassword";
import Lista_partidas from "./Lista_partidas";
import Sala_partida from "./Sala_partida";
import Partida from "./Partida";

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/registro" element={<Registro/>}/>
          <Route exact path="/home" element={<PrivateHome/>} />
          <Route exact path="/amigos" element={<Amigos/>} />
          <Route exact path="/RecPassword" element={<RecPassword/>} />
          <Route exact path="/Lista_partidas" element={<Lista_partidas/>} />
          <Route exact path="/Sala_partida" element={<Sala_partida/>} />
          <Route exact path="/Partida" element={<Partida/>} />
        </Routes>
      </Router>
    </>
  );
}