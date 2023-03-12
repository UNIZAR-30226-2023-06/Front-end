import React, { useState } from "react";
import * as jose from "jose";
import jwt_decode from "jwt-decode";
import "./inicio_sesion.css";

export default function Login() {
  // Estados de error del mensaje de loggin
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mensajes de errores
  const errors = {
    uname: "Nombre de usuario inválido",
    pass: "Contraseña incorrecta",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    const { uname, pass } = document.forms[0];

    fetch(process.env.REACT_APP_URL_BACKEND + "/login", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "",
        username: uname.value,
        password: pass.value,
        scope: "",
        client_id: "",
        client_secret: "",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.detail === "Incorrect password") {
          // login failed
          console.log("Incorrect password");
          setErrorMessages({ name: "pass", message: errors.pass });
        } else if (data.detail === "Incorrect email") {
          console.log("Incorrect email");
          setErrorMessages({ name: "uname", message: errors.uname });
        } else {
          // login success
          console.log("login success");
          console.log(data.access_token);

          //TODO: asegurarse de que el token tiene que venir del backend

          const decoded = jwt_decode(data.access_token);
          console.log(decoded);
          console.groupCollapsed(decoded.id);
          console.groupCollapsed(decoded.email);
          console.groupCollapsed(decoded.username);
          setIsSubmitted(true);
        }
      });
  };

  // Mostrar los mensajes de error
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <>
      <div className="form">
        <div className="title">Inicio de sesión</div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input type="text" name="uname" required placeholder="Correo" />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <input
              type="password"
              name="pass"
              required
              placeholder="Contraseña"
            />
            {renderErrorMessage("pass")}
          </div>
          <div className="Recuperar_password">
            <a href="/" rel="noopener noreferrer">
              ¿Has olvidado tu contraseña?{" "}
            </a>
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
          <div className="Recuperar_password">
            <a href="/Registro" rel="noopener noreferrer">
              ¿Eres nuevo? Registrate
            </a>
          </div>
        </form>
      </div>
    </>
  );

  // aqui mostramos lo que l apágina va a renderizar
  return (
    <div className="Inicio_sesion">
      <section>
        <h2>
          <span className="a">C</span>
          <span className="a">A</span>
          <span className="a">T</span>
          <span className="a">A</span>
          <span className="a">N</span>
          <span className="a">I</span>
          <span className="a">C</span>
        </h2>
      </section>
      <div className="login-form">
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}
