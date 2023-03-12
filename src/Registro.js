import React, { useState } from "react";
import "./Registro.css";
import flecha from './imagenes/flecha.svg';

function Registro() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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

      <form onSubmit={handleSubmit}>
      <div className="input-container1">
          <input type="text" name="uname" required placeholder="Introduce nombre"/>
          {renderErrorMessage("uname")}
        </div>

        <div className="input-container1">
          <input type="text" name="uname" required placeholder="Introduce correo" />
          {renderErrorMessage("uname")}
        </div>

        <div className="input-container2">
          <input type="password" name="pass" required placeholder="Introduce contraseña" />
          {renderErrorMessage("pass")}
        </div>

        <div className="input-container2">
          <input type="password" name="pass" required placeholder="Repetir contraseña" />
          {renderErrorMessage("pass")}
        </div>

        </form>

  );

  const boton = (
    <div className="button-container">
    <input type="submit" />
    </div>
  
  )


  return (
    <div className="style_registro">
      <div className="login-form">
        <div>
        <img 
        // const[enabled, setEnabled] = useState(true);
        // onClick = {() => setEnabled(!enabled)}
        src={flecha} /> 
        <div className="title">Creacion de cuenta</div>
        </div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        {isSubmitted ? <div>User is successfully logged in</div> : boton}
      </div>
    </div>
  );  
}

export default Registro;