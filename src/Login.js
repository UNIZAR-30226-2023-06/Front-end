import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

export default function Login() {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: e.target.email.value,
      password: e.target.password.value,
    };

    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_URL_BACKEND}/login`, {
        method: "POST", // hacemos una petición post
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      })
        .then((res) => {
          res.json().then((data) => {
            // console.log(data);
            // console.log(data.access_token);

            // path: "/" para que la cookie sea visible en todas las páginas
            // data.access_token lo que añadimos a las cookies
            // token -> variable de las cookies definidas anteriormente a la que asignamos el valor
            setCookie("token", data.access_token, { path: "/" });
          });

          if (res.ok && res.status === 200) {
            resolve("Login successfully");
          }
          reject("Fallo en el inicio de sesion");
        })
        .catch((err) => {
          reject("Fallo en el inicio de sesion");
        });
    });
  };

  return (
    <div className="h-screen min-h-screen w-screen flex flex-col items-center py-10 gap-y-8 imagenCustom">
      <h2 className="text-5xl font-bold mb-4">
        <span className="a"> C </span>
        <span className="a"> A </span>
        <span className="a"> T </span>
        <span className="a"> A </span>
        <span className="a"> N </span>
        <span className="a"> I </span>
        <span className="a"> C </span>
      </h2>
      <form
        className="flex flex-col justify-center items-center p-4 bg-white/60 max-w-sm w-full gap-y-2 rounded-xl shadow-xl"
        onSubmit={(e) => {
          toast
            .promise(handleSubmit(e), {
              loading: "Iniciando sesion...",
              success: "Sesion iniciada correctamente",
              error: "Fallo en el inicio de sesion",
            })
            .then(() => navigate("/home"));
        }}
      >
        <h3 className="text-2xl font-medium py-2 text-gray-600">
          Inicio de sesión
        </h3>
        <div className="flex flex-col gap-y-4 px-2 w-full">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Correo"
            className="w-full border border-transparent border-b-black/25 bg-transparent focus:outline-none focus:border-b-black"
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            className="w-full border border-transparent border-b-black/25 bg-transparent focus:outline-none focus:border-b-black"
            required
          />
        </div>
        <Link
          to="/RecPassword"
          rel="noopener noreferrer"
          className="w-full text-sm text-right py-2.5 text-cyan-900 decoration-cyan-900 underline underline-offset-2"
        >
          Recuperar Contraseña
        </Link>
        <button
          type="submit"
          className="w-full py-2 bg-cyan-900 text-white font-bold rounded-full hover:bg-slate-900 duration-300"
        >
          Enviar
        </button>
        <Link
          to="/registro"
          rel="noopener noreferrer"
          className="text-sm text-center m-0 text-cyan-900 decoration-cyan-900 underline  underline-offset-2"
        >
          ¿Eres nuevo? Registrate
        </Link>
      </form>
    </div>
  );
}
