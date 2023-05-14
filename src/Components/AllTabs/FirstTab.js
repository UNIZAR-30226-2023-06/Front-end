import React, { useEffect } from "react";
import { useState } from "react";

const FirstTab = ( params ) => {
  /****************************************************************************/
  /******************************** CONSTANTES ********************************/
  /****************************************************************************/

  // console.log(" Aqui mostramos el chat que recibimos en el FirstTab: ",params.usuario_to_color);

  function color_to_hex(color) {
    if (color === "YELLOW") {
      return "#FA9820";
    } else if (color === "BLUE") {
      return "#006db0";
    } else if (color === "GREEN") {
      return "#00a86b";
    } else {
      return "#9d2933";
    }
  }

  const [chat, setChat] = useState([
    {
      usuario: "Moony",
      mensaje: "HEY, I-NA! Check out this neat trick!",
      id: 2,
    },
    {
      usuario: "Moony",
      mensaje: "Look, there are already some people here. What idiots! Luckily, not many more will be showing up.",
      id: 2,
    },
    {
      usuario: "ENA",
      mensaje: "I wanna go home... I don't like this pawty.... I'm allewgic to people!",
      id: 1,
    },
    {
      usuario: "Moony",
      mensaje: "You know, it smells like I’ll finally be able to make my wish!",
      id: 2,
    },
    {
      usuario: "Moony",
      mensaje: "C'mon, ENA.",
      id: 2,
    },
    {
      usuario: "Moony",
      mensaje: "JENA.",
      id: 2,
    },
    {
      usuario: "Moony",
      mensaje: "C'mon. Don't ruin my moment.",
      id: 2,
    },
    {
      usuario: "ENA",
      mensaje: "I keep heawing voices inside my head... they teww me to eat my veggies.",
      id: 1,
    },
  ]);



  const input = document.getElementById("input");
  const messages = document.getElementById('messages');

  /****************************************************************************/
  /******************************* USE EFFECTS ********************************/
  /****************************************************************************/

  // Cada segundo bajo al fondo del chat
  useEffect(() => {
    const interval = setInterval(() => {
      messages.scrollTop = messages.scrollHeight;
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  

  /****************************************************************************/
  /******************************** FUNCIONES *********************************/
  /****************************************************************************/

  function enviar_mensaje(event) {
    if (event.keyCode == 13) {
      enviar_mensaje_boton();
    }
  }

  function enviar_mensaje_boton() {
    if (input.value !== "") {

      // Ejemplo url:
      // http://localhost:8000/send_chat_message?message=Hola%3F

      const url = `${process.env.REACT_APP_URL_BACKEND}/send_chat_message?message=` + input.value;

      // Peticion POST por fetch
      fetch(url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${params.jugador_datos.Token}`,
          },
        }
      )
        .then((res) => {
          res.json().then((data) => {
            console.log("Intento de colocar aldea:", data);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      
      input.value = "";
      messages.scrollTop = messages.scrollHeight;

    }
  }

  /****************************************************************************/
  /***************************** RETURN PRINCIPAL *****************************/
  /****************************************************************************/

  return (
    <div
      id="chat_partida"
      className="FirstTab_partida"
      style={{
        height: "70vh",
      }}
    >

      <div
        id="messages"
        style={{
          width: "90%", // Establecer el ancho del cuadrado
          height: "95%", // Establecer la altura del cuadrado
          display: "flex", // Establecer la propiedad display a "flex"
          flexDirection: "column", // Establecer la propiedad flexDirection a "column"
          margin: "auto", // Centrar el cuadrado
        }}
      >

        {/* Chat */}
        {
          params.chat.map((mensaje, index) => {
            return (
              <div style={{
                // backgroundColor: `${mensaje.id == params.mi_id ? "#949841" : "#164894"}`, // Establecer el color de fondo a blanco
                backgroundColor: `${color_to_hex(params.usuario_to_color[mensaje.id])}`, // Establecer el color de fondo a blanco
                color: "white", // Establecer el color del texto a gris

                width: "80%", // Establecer el ancho del cuadrado
                height: "fit-content", // Establecer la altura del cuadrado

                borderRadius: "15px", // Establecer el radio de las esquinas
                padding: "10px", // Establecer el padding a 10px

                marginLeft: `${mensaje.id == params.mi_id ? "20%" : "0"}`,
                marginTop: "10px", // Establecer el margen derecho a 10px
              }}>

                <div style={{
                  fontWeight: "bold", // Establecer el grosor de la fuente a "bold"
                }}>
                  {mensaje.id == params.mi_id ? "Tú" : mensaje.username}
                </div>

                <div>
                  {mensaje.id != 0 && mensaje.message}
                </div>

              </div>
            )
          })
        }

      </div>

      <br />

      <div
        onKeyDown={enviar_mensaje}
        style={{
          display: "flex", // Establecer la propiedad display a "flex"
          justifyContent: "center", // Centrar el contenido horizontalmente
          alignItems: "center", // Centrar el contenido verticalmente
        }}
      >
        <input
          type="text" placeholder="Enviar mensaje" id="input"
          style={{
            borderRadius: "15px", // Establecer el radio de las esquinas
            border: "1px solid white", // Establecer el borde a blanco
            padding: "10px", // Establecer el padding a 10px
            marginRight: "10px", // Establecer el margen derecho a 10px
            width: "70%", // Establecer el ancho a 70%
            color: "black", // Establecer el color del texto a gris
          }}
        />

        <button
          onClick={enviar_mensaje_boton}
          style={{
            borderRadius: "15px", // Establecer el radio de las esquinas
            backgroundColor: "#6be9f8", // Establecer el color de fondo a blanco
            color: "black", // Establecer el color del texto a gris
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </div>

    </div>
  );
};
export default FirstTab;