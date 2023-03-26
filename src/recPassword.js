import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";import "./style.css";
import flecha from './imagenes/flecha.svg';

export default function RecPassword(){

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);

    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_URL_BACKEND}/register`, {
        method: "POST", // hacemos una petición post
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "accept": "application/json",
        },
        body: new URLSearchParams(data),
      })
        .then((res) => {
          console.log(res.json());
          if (res.ok && res.status === 200) {
            resolve("Registed successfully");
          }
          reject(res.json());
        })
        .catch((err) => {
          reject("There was a problem with the registration");
        });
    });
  };
  
  return (
  <div className="h-screen min-h-screen w-screen flex flex-col justify-center items-center py-10 gap-y-8 imagenCustom">
  <form
    className="flex flex-col justify-center items-center p-4 bg-white/60 max-w-md w-full gap-y-2 rounded-xl shadow-xl mb-20"
    onSubmit={(e) => {
      toast
        .promise(handleSubmit(e), {
          loading: "Logging in...",
          success: "Correo enviado correctamente",
          error: "Fallo en la recuperacion de la contraseña",
        })
        .then(() => navigate("/login"));
    }}
  >
    <div className="flex justify-between items-center px-2 w-full">
        <a href="/login">
      <img
        src="http://localhost:3000/flechaMenu.png"
        className={`relative cursor-pointer  
        right-3 top-90 w-7 p-1 border-cyan-900 ${
          !open
        }`}
        onClick={() => setOpen(!open)}
      />
    </a>

      <div className="mx-auto max-w-xs">
        <h3 className="text-center text-2xl mr-5 font-medium py-2 text-gray-600">
          Recuperacion de contraseña
        </h3>
      </div>
    </div>

    <div className="flex flex-row gap-x-4 px-2 w-full">
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Introduce correo"
        className="w-full border border-transparent border-b-black/25 bg-transparent focus:outline-none focus:border-b-black h-12 text-lg mb-5"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2 bg-cyan-900 text-white font-bold rounded-full hover:bg-indigo-900 duration-300"
    >
      Enviar
    </button>
  </form>
</div>
  )
}
