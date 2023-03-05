import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./style_registro.css";
import flecha from './imagenes/flecha.svg';

function Registro() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
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

  const errors = {
    uname: "Nombre de usuario inválido",
    pass: "Contraseña incorrecta"
    // corr: "Correo no valido/ya en uso"
    // rpass: "Contraseñas no son iguales"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass, corr, rpass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.correo === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // correo not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }


  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (

    // <div className="form">

      <form onSubmit={handleSubmit}>
    <div className="input-container0">        
      <div className="input-container1">
          <div className="Titulos">Introduce nombre </div>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>

        <div className="input-container2">
          <div className="Titulos">Introduce correo </div>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>

        <div className="input-container1">
          <div className="Titulos">Introduce contraseña </div>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>

        <div className="input-container2">
        <div className="Titulos">Repetir contraseña </div>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div></div>

        <img 
        // const[enabled, setEnabled] = useState(true);
        // onClick = {() => setEnabled(!enabled)}
        src={flecha} />      
        </form>
    // </div>
  );

  const boton = (
    <div className="button-container">
    <input type="submit" />
    </div>
  
  )


  return (
    <div className="style_registro">
      <div className="login-form">
        <div className="title">Creacion de cuenta</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        {isSubmitted ? <div>User is successfully logged in</div> : boton}

      </div>
    </div>
  );
}

export default Registro;