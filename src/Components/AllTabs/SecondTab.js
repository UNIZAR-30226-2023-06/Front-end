import React from "react";
const SecondTab = () => {
  /****************************************************************************/
  /******************************** CONSTANTES ********************************/
  /****************************************************************************/

  const [madera, setMadera] = React.useState(0);
  const [arcilla, setArcilla] = React.useState(0);
  const [trigo, setTrigo] = React.useState(0);
  const [roca, setRoca] = React.useState(0);
  const [ovejas, setOvejas] = React.useState(0);

  const [poblados, setPoblados] = React.useState(0);
  const [ciudades, setCiudades] = React.useState(0);
  const [carreteras, setCarreteras] = React.useState(0);

  const [caballeros, setCaballeros] = React.useState(0);
  const [puntosVictoria, setPuntosVictoria] = React.useState(0);

  /****************************************************************************/
  /***************************** RETURN PRINCIPAL *****************************/
  /****************************************************************************/

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
          border: "1px solid white", // Establecer el borde a blanco
          width: "40%", // Establecer el ancho del cuadrado
          height: "50px", // Establecer la altura del cuadrado
          display: "flex", // Establecer la propiedad display a "flex"
          justifyContent: "center", // Centrar el contenido horizontalmente
          alignItems: "center", // Centrar el contenido verticalmente
          fontSize: "20px",
        }}>
          <img
            src="http://localhost:3000/recursos/madera.png" alt="madera"
            width="30" height="30"
            style={{
              marginRight: "20px",
            }}
          />
          {madera}
        </div>

        <div style={{
          border: "1px solid white", // Establecer el borde a blanco
          width: "40%", // Establecer el ancho del cuadrado
          height: "50px", // Establecer la altura del cuadrado
          display: "flex", // Establecer la propiedad display a "flex"
          justifyContent: "center", // Centrar el contenido horizontalmente
          alignItems: "center", // Centrar el contenido verticalmente
          fontSize: "20px",
        }}>
          <img
            src="http://localhost:3000/recursos/arcilla.png" alt="madera"
            width="30" height="30"
            style={{
              marginRight: "20px",
            }}
          />
          {arcilla}
        </div>
      </div>

      <br />

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}>
        <div style={{
          border: "1px solid white", // Establecer el borde a blanco
          width: "40%", // Establecer el ancho del cuadrado
          height: "50px", // Establecer la altura del cuadrado
          display: "flex", // Establecer la propiedad display a "flex"
          justifyContent: "center", // Centrar el contenido horizontalmente
          alignItems: "center", // Centrar el contenido verticalmente
          fontSize: "20px",
        }}>
          <img
            src="http://localhost:3000/recursos/ovejas.png" alt="madera"
            width="30" height="30"
            style={{
              marginRight: "20px",
            }}
          />
          {ovejas}
        </div>

        <div style={{
          border: "1px solid white", // Establecer el borde a blanco
          width: "40%", // Establecer el ancho del cuadrado
          height: "50px", // Establecer la altura del cuadrado
          display: "flex", // Establecer la propiedad display a "flex"
          justifyContent: "center", // Centrar el contenido horizontalmente
          alignItems: "center", // Centrar el contenido verticalmente
          fontSize: "20px",
        }}>
          <img
            src="http://localhost:3000/recursos/trigo.png" alt="madera"
            width="30" height="30"
            style={{
              marginRight: "20px",
            }}
          />
          {trigo}
        </div>
      </div>

      <br />

      <div style={{
        border: "1px solid white", // Establecer el borde a blanco
        width: "40%", // Establecer el ancho del cuadrado
        height: "50px", // Establecer la altura del cuadrado
        display: "flex", // Establecer la propiedad display a "flex"
        justifyContent: "center", // Centrar el contenido horizontalmente
        alignItems: "center", // Centrar el contenido verticalmente
        fontSize: "20px",

        margin: "auto" // Centrar el cuadrado
      }}>
        <img
          src="http://localhost:3000/recursos/roca.png" alt="madera"
          width="30" height="30"
          style={{
            marginRight: "20px",
          }}
        />
        {roca}
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
            {caballeros}
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
            {puntosVictoria}
          </div>
        </div>
      </div>

    </div>
  );
};
export default SecondTab;