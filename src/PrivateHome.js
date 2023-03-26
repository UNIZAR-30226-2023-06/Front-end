import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function PrivateHome() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  return (
    // fondo
    <div className="w-full h-full flex bg-teal-200">
      {/* sidebar */}
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen p-5 pt-8 bg-cyan-900 relative`}
      >
        {/* flecha */}
        <img
          src="http://localhost:3000/flecha2.png"
          className={`absolute cursor-pointer rounded-full 
          -right-3 top-9 w-7 border-2 p-1 bg-white border-cyan-900 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        {/* foto del avatar */}
        <div className="relative block gap-x-4 mx-auto">
          <img
            alt="profil"
            src="http://localhost:3000/perfil1.avif"
            className={`mx-auto object-cover rounded-full h-28 w-28 mt-9 ${
              !open &&
              "h-10 w-10 mx-auto object-cover mt-9 rounded-full duration-300 justify-center align-middle"
            }`}
          />
          {/* nombre del usuario */}
          <h1
            className={`text-white origin-center content-center font-medium text-xl duration-300 ${
              !open && `scale-0`
            }`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            name#234587
          </h1>
        </div>
        <ul className="flex flex-col w-full items-center py-6 px-4 gap-2 ">
          <a
            href="http://localhost:3000/amigos"
            className="gap-3 mt-2 flex flex-grow"
          >
            {/* imagen amigos*/}
            <img
              alt="profil"
              src="http://localhost:3000/editProfile.png"
              className={`object-cover h-8 w-8 ${
                !open && "h-8 w-8 duration-300 ml-8"
              }`}
            />

            <h1
              href="/login"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl duration-300 ${
                !open && `scale-0`
              }`}
            >
              Editar perfil
            </h1>
          </a>
          <a
            href="http://localhost:3000/amigos"
            className="gap-3 mt-2 flex flex-grow"
          >
            {/* imagen amigos*/}
            <img
              alt="profil"
              src="http://localhost:3000/friends.png"
              className={`object-cover h-8 w-8 ${
                !open && "h-8 w-8 duration-300 ml-12"
              }`}
            />

            <h1
              href="/login"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl duration-300 ${
                !open && `scale-0`
              }`}
            >
              Amigos
            </h1>
          </a>
        </ul>
      </div>
      {/*cuerpo de la página*/}
      <img
        onClick={() => {
          window.location.href = "http://localhost:3000/login";
        }}
        className="absolute top-0 right-0 m-4"
        src="http://localhost:3000/carrito.png"
      />

      <div className="felx flex-col gap-8 place-self-auto m-auto h-96 w-60">
        <button
          className="mt-20 w-80 flex h-20 bg-amber-600 hover:bg-amber-800 text-white text-center font-bold px-24 pt-4 border-b-4 border-amber-900 hover:border-black/40 rounded-lg"
          onClick={() => {
            window.location.href = "http://localhost:3000/login";
          }}
        >
          BUSCAR PARTIDA
        </button>
        <button
          className="mt-20 w-80 flex h-20 bg-amber-600 hover:bg-amber-800 text-white text-center font-bold px-24 pt-4 border-b-4 border-amber-900 hover:border-black/40 rounded-lg"
          onClick={() => {
            window.location.href = "http://localhost:3000/login";
          }}
        >
          CREAR PARTIDA CON AMIGOS
        </button>
      </div>
    </div>
  );
}
