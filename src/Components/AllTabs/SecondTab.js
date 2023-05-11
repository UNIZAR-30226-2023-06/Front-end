import React from "react";

import { global_info } from "../../Partida";

const SecondTab = (params) => {
  /****************************************************************************/
  /******************************** CONSTANTES ********************************/
  /****************************************************************************/

  const [poblados, setPoblados] = React.useState(0);
  const [ciudades, setCiudades] = React.useState(0);
  const [carreteras, setCarreteras] = React.useState(0);

  /****************************************************************************/
  /******************************** CONSTANTES ********************************/
  /****************************************************************************/

  // console.log("URL: ", params.jugador_datos.Token);
  // console.log("TODO: ", params);

  function realizar_intercambio(recurso_ofrecido, recuro_pedido, cantidad_ofrecida) {

    // Ejemplo url: 
    // http://localhost:8000/game_phases/trade_with_bank?lobby_id=1234&resource_type=1324&amount=1234&requested_type=1324

    const url = "http://localhost:8000/game_phases/trade_with_bank?lobby_id=" + params.jugador_datos.codigo_partida + "&resource_type=" + recurso_ofrecido + "&amount=" + cantidad_ofrecida + "&requested_type=" + recuro_pedido;

    fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${params.jugador_datos.Token}`,
        },
      }
    )
      .then((res) => {
        res.json().then((data) => {
          console.log("Intento de hacer el intercambio:", data);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }

  /****************************************************************************/
  /***************************** RETURN PRINCIPAL *****************************/
  /****************************************************************************/

  // console.log("Este es tablero del tab2: ", params.jugador_datos);
  // console.log("Informacion global: ", global_info);

  return (
    <div className="SecondTab_partida">

      <div style={{
        border: "3px solid white", // Establecer el borde a blanco
        width: "90%", // Establecer el ancho del cuadrado
        height: "50px", // Establecer la altura del cuadrado
        display: "flex", // Establecer la propiedad display a "flex"
        justifyContent: "center", // Centrar el contenido horizontalmente
        alignItems: "center", // Centrar el contenido verticalmente
        fontSize: "20px",
        margin: "auto" // Centrar el cuadrado
      }}>
        Recursos
      </div>

      <br />

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}>
        <div style={{
          // Si global_info.realizando_intercambio es true, se muestra el borde
          // de grosor 3px, si no, se muestra el borde de grosor 1px.
          // Luego, si global_info.recurso_ofrecido es "WOOD", se muestra el
          // borde de color verde, si no, se muestra el borde de color blanco.
          border: global_info.realizando_intercambio ? "3px solid " + (global_info.recurso_ofrecido == "WOOD" ? "green" : "white") : "1px solid white",
          width: "40%", // Establecer el ancho del cuadrado
          height: "50px", // Establecer la altura del cuadrado
          display: "flex", // Establecer la propiedad display a "flex"
          justifyContent: "center", // Centrar el contenido horizontalmente
          alignItems: "center", // Centrar el contenido verticalmente
          fontSize: "20px",
        }}
        onClick={() => {
          // Si global_info.fase_intercambio es 0, se establece el valor a 1
          // y guardo en global_info.recurso_ofrecido el recurso ofrecido.
          // Si global_info.fase_intercambio es 1, se establece el valor a 0,
          // pongo a false global_info.realizando_intercambio y hago el fetch
          // al backend para realizar el intercambio.
          // Todo esto solo se hace si global_info.realizando_intercambio es
          // true.
          if (global_info.realizando_intercambio) {
            if (global_info.fase_intercambio == 0) {
              global_info.fase_intercambio = 1;
              global_info.recurso_ofrecido = "WOOD";
            }
            else {
              realizar_intercambio(global_info.recurso_ofrecido, "WOOD", global_info.cantidad_ofrecida);
              
              global_info.fase_intercambio = 0;
              global_info.realizando_intercambio = false;
              global_info.recurso_ofrecido = "";
            }
          }
        }}
        >
          <img
            src="http://localhost:3000/recursos/madera.png" alt="madera"
            width="30" height="30"
            style={{
              marginRight: "20px",
            }}
          />
          {params.jugador_datos == null ? 0 : params.jugador_datos.hand.wood}
        </div>

        <div style={{
          border: global_info.realizando_intercambio ? "3px solid " + (global_info.recurso_ofrecido == "CLAY" ? "green" : "white") : "1px solid white",
          width: "40%", // Establecer el ancho del cuadrado
          height: "50px", // Establecer la altura del cuadrado
          display: "flex", // Establecer la propiedad display a "flex"
          justifyContent: "center", // Centrar el contenido horizontalmente
          alignItems: "center", // Centrar el contenido verticalmente
          fontSize: "20px",
        }}
        onClick={() => {
          // Si global_info.fase_intercambio es 0, se establece el valor a 1
          // y guardo en global_info.recurso_ofrecido el recurso ofrecido.
          // Si global_info.fase_intercambio es 1, se establece el valor a 0,
          // pongo a false global_info.realizando_intercambio y hago el fetch
          // al backend para realizar el intercambio.
          // Todo esto solo se hace si global_info.realizando_intercambio es
          // true.
          if (global_info.realizando_intercambio) {
            if (global_info.fase_intercambio == 0) {
              global_info.fase_intercambio = 1;
              global_info.recurso_ofrecido = "CLAY";
            }
            else {
              realizar_intercambio(global_info.recurso_ofrecido, "CLAY", global_info.cantidad_ofrecida);
              
              global_info.fase_intercambio = 0;
              global_info.realizando_intercambio = false;
              global_info.recurso_ofrecido = "";
            }
          }
        }}
        >
          <img
            src="http://localhost:3000/recursos/arcilla.png" alt="madera"
            width="30" height="30"
            style={{
              marginRight: "20px",
            }}
          />
          {params.jugador_datos == null ? 0 : params.jugador_datos.hand.clay}
        </div>
      </div>

      <br />

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}>
        <div style={{
          border: global_info.realizando_intercambio ? "3px solid " + (global_info.recurso_ofrecido == "SHEEP" ? "green" : "white") : "1px solid white",
          width: "40%", // Establecer el ancho del cuadrado
          height: "50px", // Establecer la altura del cuadrado
          display: "flex", // Establecer la propiedad display a "flex"
          justifyContent: "center", // Centrar el contenido horizontalmente
          alignItems: "center", // Centrar el contenido verticalmente
          fontSize: "20px",
        }}
        onClick={() => {
          // Si global_info.fase_intercambio es 0, se establece el valor a 1
          // y guardo en global_info.recurso_ofrecido el recurso ofrecido.
          // Si global_info.fase_intercambio es 1, se establece el valor a 0,
          // pongo a false global_info.realizando_intercambio y hago el fetch
          // al backend para realizar el intercambio.
          // Todo esto solo se hace si global_info.realizando_intercambio es
          // true.
          if (global_info.realizando_intercambio) {
            if (global_info.fase_intercambio == 0) {
              global_info.fase_intercambio = 1;
              global_info.recurso_ofrecido = "SHEEP";
            }
            else {
              realizar_intercambio(global_info.recurso_ofrecido, "SHEEP", global_info.cantidad_ofrecida);
              
              global_info.fase_intercambio = 0;
              global_info.realizando_intercambio = false;
              global_info.recurso_ofrecido = "";
            }
          }
        }}
        >
          <img
            src="http://localhost:3000/recursos/ovejas.png" alt="madera"
            width="30" height="30"
            style={{
              marginRight: "20px",
            }}
          />
          {params.jugador_datos == null ? 0 : params.jugador_datos.hand.sheep}
        </div>

        <div style={{
          border: global_info.realizando_intercambio ? "3px solid " + (global_info.recurso_ofrecido == "WHEAT" ? "green" : "white") : "1px solid white",
          width: "40%", // Establecer el ancho del cuadrado
          height: "50px", // Establecer la altura del cuadrado
          display: "flex", // Establecer la propiedad display a "flex"
          justifyContent: "center", // Centrar el contenido horizontalmente
          alignItems: "center", // Centrar el contenido verticalmente
          fontSize: "20px",
        }}
        onClick={() => {
          // Si global_info.fase_intercambio es 0, se establece el valor a 1
          // y guardo en global_info.recurso_ofrecido el recurso ofrecido.
          // Si global_info.fase_intercambio es 1, se establece el valor a 0,
          // pongo a false global_info.realizando_intercambio y hago el fetch
          // al backend para realizar el intercambio.
          // Todo esto solo se hace si global_info.realizando_intercambio es
          // true.
          if (global_info.realizando_intercambio) {
            if (global_info.fase_intercambio == 0) {
              global_info.fase_intercambio = 1;
              global_info.recurso_ofrecido = "WHEAT";
            }
            else {
              realizar_intercambio(global_info.recurso_ofrecido, "WHEAT", global_info.cantidad_ofrecida);
              
              global_info.fase_intercambio = 0;
              global_info.realizando_intercambio = false;
              global_info.recurso_ofrecido = "";
            }
          }
        }}
        >
          <img
            src="http://localhost:3000/recursos/trigo.png" alt="madera"
            width="30" height="30"
            style={{
              marginRight: "20px",
            }}
          />
          {params.jugador_datos == null ? 0 : params.jugador_datos.hand.wheat}
        </div>
      </div>

      <br />

      <div style={{
          border: global_info.realizando_intercambio ? "3px solid " + (global_info.recurso_ofrecido == "STONE" ? "green" : "white") : "1px solid white",
          width: "40%", // Establecer el ancho del cuadrado
        height: "50px", // Establecer la altura del cuadrado
        display: "flex", // Establecer la propiedad display a "flex"
        justifyContent: "center", // Centrar el contenido horizontalmente
        alignItems: "center", // Centrar el contenido verticalmente
        fontSize: "20px",

        margin: "auto" // Centrar el cuadrado
      }}
      onClick={() => {
        // Si global_info.fase_intercambio es 0, se establece el valor a 1
        // y guardo en global_info.recurso_ofrecido el recurso ofrecido.
        // Si global_info.fase_intercambio es 1, se establece el valor a 0,
        // pongo a false global_info.realizando_intercambio y hago el fetch
        // al backend para realizar el intercambio.
        // Todo esto solo se hace si global_info.realizando_intercambio es
        // true.
        if (global_info.realizando_intercambio) {
          if (global_info.fase_intercambio == 0) {
            global_info.fase_intercambio = 1;
            global_info.recurso_ofrecido = "STONE";
          }
          else {
            realizar_intercambio(global_info.recurso_ofrecido, "STONE", global_info.cantidad_ofrecida);
            
            global_info.fase_intercambio = 0;
            global_info.realizando_intercambio = false;
            global_info.recurso_ofrecido = "";
          }
        }
      }}
      >
        <img
          src="http://localhost:3000/recursos/roca.png" alt="madera"
          width="30" height="30"
          style={{
            marginRight: "20px",
          }}
        />
        {params.jugador_datos == null ? 0 : params.jugador_datos.hand.rock}
      </div>

      <br /><br />

      <div style={{
        border: "3px solid white", // Establecer el borde a blanco
        width: "90%", // Establecer el ancho del cuadrado
        height: "50px", // Establecer la altura del cuadrado
        display: "flex", // Establecer la propiedad display a "flex"
        justifyContent: "center", // Centrar el contenido horizontalmente
        alignItems: "center", // Centrar el contenido verticalmente
        fontSize: "20px",
        margin: "auto" // Centrar el cuadrado
      }}>
        Construcciones
      </div>

      <br />

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}>
        <div style={{
          // border: "1px solid white", // Establecer el borde a blanco
          width: "40%", // Establecer el ancho del cuadrado
          height: "350px", // Establecer la altura del cuadrado
          display: "inline-block",
          justifyContent: "center", // Centrar el contenido horizontalmente
        }}>
          <div style={{
            border: "1px solid white", // Establecer el borde a blanco
            width: "100%", // Establecer el ancho del cuadrado
            height: "50px", // Establecer la altura del cuadrado
            display: "flex", // Establecer la propiedad display a "flex"
            justifyContent: "center", // Centrar el contenido horizontalmente
            alignItems: "center", // Centrar el contenido verticalmente
            fontSize: "20px",
          }}>
            <img
              src="http://localhost:3000/iconos-no-recursos/poblado.png" alt="madera"
              width="30" height="30"
              style={{
                marginRight: "20px",
              }}
            />
            {poblados}
          </div>

          <br />

          <div style={{
            border: "1px solid white", // Establecer el borde a blanco
            width: "100%", // Establecer el ancho del cuadrado
            height: "50px", // Establecer la altura del cuadrado
            display: "flex", // Establecer la propiedad display a "flex"
            justifyContent: "center", // Centrar el contenido horizontalmente
            alignItems: "center", // Centrar el contenido verticalmente
            fontSize: "20px",
          }}>
            <img
              src="http://localhost:3000/iconos-no-recursos/ciudad.png" alt="madera"
              width="30" height="30"
              style={{
                marginRight: "20px",
              }}
            />
            {ciudades}
          </div>

          <br />

          <div style={{
            border: "1px solid white", // Establecer el borde a blanco
            width: "100%", // Establecer el ancho del cuadrado
            height: "50px", // Establecer la altura del cuadrado
            display: "flex", // Establecer la propiedad display a "flex"
            justifyContent: "center", // Centrar el contenido horizontalmente
            alignItems: "center", // Centrar el contenido verticalmente
            fontSize: "20px",
          }}>
            <img
              src="http://localhost:3000/iconos-no-recursos/carretera.png" alt="madera"
              width="30" height="30"
              style={{
                marginRight: "20px",
              }}
            />
            {carreteras}
          </div>

          <br />

          <div style={{
            border: "1px solid white", // Establecer el borde a blanco
            width: "100%", // Establecer el ancho del cuadrado
            height: "50px", // Establecer la altura del cuadrado
            display: "flex", // Establecer la propiedad display a "flex"
            justifyContent: "center", // Centrar el contenido horizontalmente
            alignItems: "center", // Centrar el contenido verticalmente
            fontSize: "20px",
          }}>
            <img
              src="http://localhost:3000/iconos-no-recursos/caballero.png" alt="madera"
              width="30" height="30"
              style={{
                marginRight: "20px",
              }}
            />
            {params.jugador_datos == null ? 0 : params.jugador_datos.used_knights}
          </div>

        </div>

        <div style={{
          // border: "1px solid white", // Establecer el borde a blanco
          width: "40%", // Establecer el ancho del cuadrado
          height: "350px", // Establecer la altura del cuadrado
          display: "flex", // Establecer la propiedad display a "flex"
          display: "inline-block", // Centrar el contenido horizontalmente
          alignItems: "center", // Centrar el contenido verticalmente
        }}>
          <div style={{
            width: "100%", // Establecer el ancho del cuadrado
            height: "197px", // Establecer la altura del cuadrado
            display: "flex", // Establecer la propiedad display a "flex"
            justifyContent: "center", // Centrar el contenido horizontalmente
            alignItems: "center", // Centrar el contenido verticalmente
            textAlign: "center",
          }}>
            <img
              src="http://localhost:3000/cartas_desarrollo.png" alt="madera"
              style={{
                transform: "scale(0.8)",
              }}
            />
          </div>

          <br />

          <div style={{
            border: "1px solid white", // Establecer el borde a blanco
            width: "100%", // Establecer el ancho del cuadrado
            height: "50px", // Establecer la altura del cuadrado
            display: "flex", // Establecer la propiedad display a "flex"
            justifyContent: "center", // Centrar el contenido horizontalmente
            alignItems: "center", // Centrar el contenido verticalmente
            fontSize: "20px",
          }}>
            <img
              src="http://localhost:3000/iconos-no-recursos/punto_victoria.png" alt="madera"
              width="30" height="30"
              style={{
                marginRight: "20px",
              }}
            />
            {params.jugador_datos == null ? 0 : params.jugador_datos.victory_points}
          </div>
        </div>
      </div>

    </div>
  );
};

export default SecondTab;