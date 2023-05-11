import React, { useState, useEffect } from "react";

const PopUpFaseNegociacion = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [arcilla, setMiArcilla] = useState(0);
  const [roca, setMiRoca] = useState(0);
  const [oveja, setMiOveja] = useState(0);
  const [trigo, setMiTrigo] = useState(0);
  const [madera, setMiMadera] = useState(0);
  // orden: arcilla = 1, roca = 2, oveja = 3, trigo = 4, madera = 5
  const [countOfrezco, setOfrezco] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (props.show) {
      setShouldShowPopup(true);
      setShowPopup(true);

      setMiArcilla(props.jugador_datos.hand.clay);
      setMiRoca(props.jugador_datos.hand.rock);
      setMiOveja(props.jugador_datos.hand.sheep);
      setMiTrigo(props.jugador_datos.hand.wheat);
      setMiMadera(props.jugador_datos.hand.wood);
    } else {
      setShowPopup(false);
      setShouldShowPopup(false);
    }
  }, [props.show]);

  const handleClose = () => {
    setShouldShowPopup(false);
    props.onClose();
  };

  const handleOpen = () => {
    setShouldShowPopup(true);
    setShowPopup(true);
  };

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (shouldShowPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [shouldShowPopup]);

  console.log("----------------------------------------");
  console.log(props.jugador_datos);

  console.log(props.jugador_datos.hand.clay);

  return (
    <>
      {showPopup && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleBackgroundClick}
        >
          <div
            className="relative bg-gray-400 rounded-lg p-4 inline-flex flex-col items-center h-4/5 "
            style={{ minHeight: "640px", minWidth: "1290px" }}
          >
            <h1 className="text-3xl mt-2">FASE DE NEGOCIACION</h1>
            <img
              src="http://localhost:3000/white_cross.png"
              alt="close"
              className="absolute top-0 right-0 cursor-pointer mt-3 mr-3"
              style={{ width: "50px", height: "50px" }}
              onClick={handleClose}
            />

            <div
              className="absolute inset-y-0 left-0 w-1/4 bg-gray-900 mt-5 ml-7 rounded-lg"
              style={{ maxHeight: "745px", maxWidth: "200px" }}
            >
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src="	http://localhost:3000/recursos/ovejas.png"
                    alt="oveja"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">{oveja}</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src="	http://localhost:3000/recursos/madera.png"
                    alt="troncos"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">{madera}</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src="	http://localhost:3000/recursos/trigo.png"
                    alt="cebada"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">{trigo}</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src="	http://localhost:3000/recursos/roca.png"
                    alt="piedras"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">{roca}</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src="	http://localhost:3000/recursos/arcilla.png"
                    alt="arcilla"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">{arcilla}</h1>
              </div>
            </div>

            <div
              class="w-1/2 h-20 bg-gray-800 rounded-lg flex flex-col"
              style={{
                marginTop: "40px",
                marginLeft: "150px",
                width: "900px",
                height: "450px",
              }}
            >
              <h1 className="text-4xl text-white ml-5 mb-4 mt-5">
                Recursos solicitados:
              </h1>

              <div class="flex">
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="	http://localhost:3000/recursos/ovejas.png"
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                  {/* 
                  ESTO ESTA EN PROCESO ES LO DE LAS FLECHITAS PERO QUE CON EL STYLE DE ARRIBA HAY QUE 
                  MIRAR COMO CUADRARLO,LAS FUNCIONES LAS TENGO TAMBIÉN FALTA SOLO AÑADIRLAS PERO VOY PASO 
                  A PASO, GRACIAS POR LA PACIENCIA 
                  <div key={3}>
                    <button onClick={() => incrementarContador(3)}>▲</button>
                    <input
                      type="number"
                      className="text-4xl"
                      onChange={(e) =>
                        ActulizarArray(3, parseInt(e.target.value))
                      }
                    />
                    <button onClick={() => decrementarContador(3)}>▼</button>
                  </div> */}
                 
                </div>
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="	http://localhost:3000/recursos/madera.png"
                    alt="madera"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="	http://localhost:3000/recursos/trigo.png"
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="http://localhost:3000/recursos/roca.png"
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="	http://localhost:3000/recursos/arcilla.png"
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>
              </div>

              <h1 className="text-4xl text-white ml-5 mb-4 mt-5">
                Recursos a intercambiar:
              </h1>

              <div class="flex">
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="	http://localhost:3000/recursos/ovejas.png"
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="http://localhost:3000/recursos/madera.png"
                    alt="madera"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="	http://localhost:3000/recursos/trigo.png"
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="	http://localhost:3000/recursos/roca.png"
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>{" "}
                <div
                  class="w-1/2 h-20 bg-gray-100 rounded-lg inline-block"
                  style={{
                    width: "150px",
                    height: "100px",
                    marginLeft: "30px",
                    marginRight: "20px",
                    marginTop: "20px",
                    borderRadius: "13%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="	http://localhost:3000/recursos/arcilla.png"
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>
              </div>
            </div>

            <div class=" mt-20">
              <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                style={{ fontSize: "30px", marginLeft: "20px" }}
              >
                Realizar Oferta
              </button>
            </div>

            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpFaseNegociacion;
