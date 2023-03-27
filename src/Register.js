import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import "./style.css";

import Cookies from 'js-cookie';

export default function Registro() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const coins = 0;
    const selected_grid_skin = "default";
    const selected_piece_skin = "default";
    const saved_music = "default";
    const elo = 500;
    const url = `${process.env.REACT_APP_URL_BACKEND}/register?name=${name}&email=${email}&password=${password}&coins=${coins}&selected_grid_skin=${selected_grid_skin}&selected_piece_skin=${selected_piece_skin}&saved_music=${saved_music}&elo=${elo}`;
    console.log(process.env.REACT_APP_URL_BACKEND)
    if (password !== password2) {
      toast.error("Las contraseñas no coinciden");
    } else {
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data); // Ver respuesta en la consola
            if ("detail" in data && data.detail === "User created") {
              resolve("Registered successfully");
            } else if (
              "detail" in data &&
              data.detail === "Email already exists"
            ) {
              reject("Email already exists");
            } else {
              reject("There was a problem with the registration");
            }
          })
          .catch((err) => {
            console.log(err); // Ver error en la consola
            reject("There was a problem with the registration");
          });
      });
    }
  };
  

  return (
    <div className="h-screen min-h-screen w-screen flex flex-col justify-center items-center py-10 gap-y-8 imagenCustom">
      <form
        className="flex flex-col justify-center items-center p-4 bg-white/60 max-w-md w-full gap-y-2 rounded-xl shadow-xl mb-20"
        onSubmit={(e) => {
          toast
            .promise(handleSubmit(e), {
              loading: "Logging in...",
              success: "Login successfully",
              error: "There was a problem with the registration",
            })
            .then(() => navigate("/login"));
        }}
      >
        <div className="flex justify-between items-center px-2 w-full">
          <a href="/login">
            <img
              src="http://localhost:3000/flechaMenu.png"
              className={`relative cursor-pointer  
        right-3 top-90 w-7 p-1 border-cyan-900 ${!open}`}
              onClick={() => setOpen(!open)}
            />
          </a>

          <div className="mx-auto max-w-xs">
            <h3 className="text-center text-2xl mr-5 font-medium py-2 text-gray-600">
              Registro
            </h3>
          </div>
        </div>

        <div className="flex flex-row gap-x-4 px-2 w-full">
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Introduce nombre"
            className="w-full border border-transparent border-b-black/25 bg-transparent focus:outline-none focus:border-b-black h-12 text-lg"
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Introduce correo"
            className="w-full border border-transparent border-b-black/25 bg-transparent focus:outline-none focus:border-b-black h-12 text-lg"
          />
        </div>

        <div className="flex flex-row gap-x-4 px-2 w-full">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Introduce contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full border border-transparent border-b-black/25 bg-transparent focus:outline-none focus:border-b-black h-12 text-lg"
          />

          <input
            id="password2"
            type="password"
            name="password2"
            placeholder="Repite la contraseña"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
            className="w-full border border-transparent border-b-black/25 bg-transparent focus:outline-none focus:border-b-black h-12 text-lg"
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
  );
}
