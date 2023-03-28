import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RecPassword() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const sendEmail = async (email) => {
    try {
      await window.Email.send({
        Host: "smtp.gmail.com",
        Username: "cataninctest2@gmail.com",
        Password: "catancatan",
        To: email,
        From: "cataninctest2@gmail.com",
        Subject: "Recuperación de contraseña",
        Body:
          "Hola, has solicitado recuperar tu contraseña en nuestro sitio web. Por favor, utiliza el siguiente enlace para restablecer tu contraseña.",
      });
      toast.success("Correo enviado correctamente");
      navigate("/login"); // navegamos a la pagina de login si se envió el correo electrónico correctamente
    } catch (e) {
      toast.error("Fallo en la recuperación de la contraseña");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    await sendEmail(email);
  };

  return (
    <div className="h-screen min-h-screen w-screen flex flex-col justify-center items-center py-10 gap-y-8 imagenCustom">
      <form
        className="flex flex-col justify-center items-center p-4 bg-white/60 max-w-md w-full gap-y-2 rounded-xl shadow-xl mb-20"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center px-2 w-full">
          <Link to="/login">
            <img
              src="http://localhost:3000/flechaMenu.png"
              className={`relative cursor-pointer right-3 top-90 w-7 p-1 border-cyan-900 ${!open}`}
              onClick={() => setOpen(!open)}
            />
          </Link>

          <div className="mx-auto max-w-xs">
            <h3 className="text-center text-2xl mr-5 font-medium py-2 text-gray-600">
              Recuperación de contraseña
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
  );
}
