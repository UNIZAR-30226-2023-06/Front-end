import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

export default function RecPassword() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    Recuperar(email);
  };

  function Recuperar(email) {
    const url_1 = `${process.env.REACT_APP_URL_BACKEND}/recover-password?email=${email}`;
    fetch(url_1, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.detail === "Password changed successfully"){
          toast.success("La contraseña ha sido enviada a su correo");
        }else{
          toast.error("Este correo no existe");
        }
      });
  }

  return (
    <div className="h-screen min-h-screen w-screen flex flex-col justify-center items-center py-10 gap-y-8 imagenCustom">
      <form
        className="flex flex-col justify-center items-center p-4 bg-white/60 max-w-md w-full gap-y-2 rounded-xl shadow-xl mb-20"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center px-2 w-full">
          <Link to="/">
            <img
              src={`${process.env.REACT_APP_URL_FRONTED}/flechaMenu.png`}
              className={`relative cursor-pointer right-3 top-90 w-7 p-1 border-cyan-900 ${!open}`}
              onClick={() => setOpen(!open)}
            />
          </Link>

          <div className="mx-auto max-w-xs">
            <h3 className="text-center text-2xl mr-5 font-medium py-2 text-gray-600">
              Obtener nueva contraseña
            </h3>
          </div>
        </div>

        <div className="flex flex-row gap-x-4 px-2 w-full">
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            placeholder="Introduce correo"
            onChange={(e) => setEmail(e.target.value)}
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
  );
}
