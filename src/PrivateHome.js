import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PrivateHome() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    // fondo
    <div className="flex bg-teal-200">
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
        <a
          href="http://localhost:3000/home"
          class="relative block gap-x-4 items-center"
        >
          <img
            alt="profil"
            src="http://localhost:3000/perfil1.avif"
            className={`mx-auto object-cover rounded-full h-28 w-28 mt-9 ${
              !open &&
              "h-8 w-8 mx-auto object-cover rounded-full  mt-9 duration-300"
            }`}
          />
          <h1
            className={`text-white origin-center content-center font-medium text-xl duration-300 ${
              !open && `scale-0`
            }`}
          >
            Name#234567
          </h1>
        </a>
        <ul>
          <a href="http://localhost:3000/amigos"
          className="flex items-center"
          >
            {/* imagen editar perfil*/}
            <img
              alt="profil"
              src="http://localhost:3000/editProfile.png"
              className={`mx-auto object-cover h-8 w-8 mt-9 ${
                !open &&
                "h-8 w-8  object-cover mt-9 duration-300"
              }`}
            ></img>
            <h1
              href="/login"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl duration-300 ${
                !open && `scale-0`
              }`}
            >
              Editar Perfil
            </h1>
          </a>
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-cyan-900 text-white font-bold rounded-full hover:bg-indigo-900 duration-300"
          >
            Amigos
          </button>
        </ul>
      </div>
      <div>
        <h1> Home Page</h1>
      </div>
    </div>
  );
}
