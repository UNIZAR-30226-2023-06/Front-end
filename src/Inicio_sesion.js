import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as jose from 'jose'
import jwt_decode from 'jwt-decode';

import "./inicio_sesion.css";

const URL_BACKEND = "http://localhost:8000";

function Inicio_sesion() {
  // Estados de error del mensaje de loggin
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // BD iniciales
  const database = [
    {
      correo: "user1",
      password: "pass1"
    },
    {
      correo: "user2",
      password: "pass2"
    }
  ];

  // Mensajes de errores
  const errors = {
    uname: "Nombre de usuario inválido",
    pass: "Contraseña incorrecta"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams({
            'grant_type': '',
            'username': uname.value,
            'password': pass.value,
            'scope': '',
            'client_id': '',
            'client_secret': ''
        })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.detail === "Incorrect password") {
          // login failed
          console.log("Incorrect password");
          setErrorMessages({ name: "pass", message: errors.pass });

        } else if (data.detail === "Incorrect email"){
          console.log("Incorrect email");
          setErrorMessages({ name: "uname", message: errors.uname });
        }
        else{
          // login success
          console.log("login success")
          console.log(data.access_token);
                  
          //TODO: asegurarse de que el token tiene que venir del backend
          
          var decoded = jwt_decode(data.access_token);
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
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="Titulos">Correo </div>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
        <div className="Titulos">Contraseña </div>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit"/>
        </div>
        <div className="Recuperar_password"> <a href="/"> ¿Has olvidado tu contraseña? </a></div>
      </form>
    </div>
  );


  return (
    <div className="Inicio_sesion">
      
      <div className="login-form">
        <div className="title">Bienvenido a CATANIC</div>
        {isSubmitted ?  <div>User is successfully logged in</div> : renderForm}
      </div> 
      <div className="Recuperar_password"> <a href="/"> ¿Eres nuevo? Registrate </a></div>
    </div>   
  );
}

export default Inicio_sesion;