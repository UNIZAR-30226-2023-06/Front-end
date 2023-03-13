import React from "react";
import {Link} from "react-router-dom";

export default function Login() {

  return (
    <div className="h-screen w-screen flex flex-col items-center py-20 gap-y-8 imagenCustom">
      <h2 className="text-4xl font-bold tracking-wide mb-4">
        catanic
      </h2>
      <form className="flex flex-col justify-center items-center p-4 bg-white/75 max-w-sm w-full gap-y-2 rounded-xl shadow-xl">
        <h3 className="text-2xl font-medium py-2">
          Inicio de sesión
        </h3>
        <input 
          id="email"
          type="email" 
          name="email" 
          placeholder="Correo"
          className="w-full border-b py-2 px-4 rounded-md" 
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          className="w-full border-b py-2 px-4 rounded-md" 
          required
        />
        <Link 
          to="/login" 
          rel="noopener noreferrer"
          className="w-full text-sm text-right py-2.5"
        >
          Recuperar Contraseña 
        </Link>
        <button 
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-bold rounded-md"
        >
          Enviar
        </button>
      </form>
      <Link 
        to="/login" 
        rel="noopener noreferrer"
        className="text-sm text-center py-1.5"
      >
        ¿Eres nuevo? Registrate
      </Link>
    </div>
  );
}
