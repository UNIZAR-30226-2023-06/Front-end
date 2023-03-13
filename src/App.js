import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./Home";
import Login from "./Login";
import LoginAyelen from "./LoginAyelen";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/login-ayelen" element={<LoginAyelen />}/>
      </Routes>
    </Router>
  );
}