import React from "react";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./Home";
import PrivateHome from "./PrivateHome";
import Login from "./Login";
import Register from "./Register";

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/home" element={<PrivateHome/>} />
        </Routes>
      </Router>
    </>
  );
}