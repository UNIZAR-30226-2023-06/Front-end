import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const PopUpFaseNegociacion = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [arcilla, setMiArcilla] = useState(0);
  const [roca, setMiRoca] = useState(0);
  const [oveja, setMiOveja] = useState(0);
  const [trigo, setMiTrigo] = useState(0);
  const [madera, setMiMadera] = useState(0);
  // orden: oveja = 1, madera = 2, trigo = 3, piedra = 4, arcilla = 5
  const [countOfrezco, setOfrezco] = useState([0, 0, 0, 0, 0]);
  const [countQuiero, setQuiero] = useState([0, 0, 0, 0, 0]);

  // lista para el map
  const items = [
    { src: "ovejas.png", alt: "oveja", value: oveja },
    { src: "madera.png", alt: "troncos", value: madera },
    { src: "trigo.png", alt: "cebada", value: trigo },
    { src: "roca.png", alt: "piedras", value: roca },
    { src: "arcilla.png", alt: "arcilla", value: arcilla },
  ];

  // useEffect(() => {
  //   if (props.show) {
  //     setShouldShowPopup(true);
  //     setShowPopup(true);

  //   } else {
  //     setShowPopup(false);
  //     setShouldShowPopup(false);
  //   }
  // }, [props.show]);

  const handleClose = () => {
    setShouldShowPopup(false);
    props.onClose();
  };

  const handleOpen = () => {
    setShouldShowPopup(true);
    setShowPopup(true);
    setMiArcilla(props.jugador_datos.hand.clay);
    setMiRoca(props.jugador_datos.hand.rock);
    setMiOveja(props.jugador_datos.hand.sheep);
    setMiTrigo(props.jugador_datos.hand.wheat);
    setMiMadera(props.jugador_datos.hand.wood);
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

  {
    /* ------------------ funciones para los contadores de los botones ------------------ */
  }
  const ActulizarArray = (index, value, tipo) => {
    if (tipo === 2) {
      // ofrezco
      const newValues = [...countOfrezco];
      newValues[index] = value;
      setOfrezco(newValues);
    } else {
      // quiero
      const newValues = [...countQuiero];
      newValues[index] = value;
      setQuiero(newValues);
    }
  };

  {
    /* ------------------ funciones para enviar la oferta al resto de los jugadores ------------------ */
  }

  function LanzarOfertar(e) {
    e.preventDefault();
    // TODO: falta conectar con el backend que la funcion aún no existe pero esta todo preparado ya :)
    console.log("------------------------");
    console.log("y quiero a cambio: ", countQuiero);
    console.log("yo doy: ", countOfrezco);
    toast.success("CONSEJO: negocia por el chat!", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });

    toast.success("Su oferta ha sido enviada!");
  }

  return (
    <>
      <img
        src="http://localhost:3000/iconos-no-recursos/comerciar-jugadores.png"
        alt="Abrir Popup"
        className="cursor-pointer"
        onClick={handleOpen}
        style={{
          position: "absolute",
          left: "15.8%",
          bottom: "30px",

          // Escalo la imagen para que se vea más pequeña
          transform: "scale(0.2)",
        }}
      />
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
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
              {items.map((resource, index) => (
                <div
                  className="flex items-center"
                  style={{ marginTop: "70px", marginLeft: "45px" }}
                  key={index}
                >
                  <div className="mr-2">
                    <img
                      src={`http://localhost:3000/recursos/${resource.src}`}
                      alt={resource.alt}
                      style={{ width: "65px", height: "65px" }}
                    />
                  </div>
                  <h1 className="text-4xl text-white ml-2">{resource.value}</h1>
                </div>
              ))}
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
              <div className="flex">
                {items.map((resource, index) => (
                  <div key={`quiero-${index}`}>
                    <div className="flex flex-row w-200 h-150 ml-30 rounded-13 justify-center mt-4 mb-12 ml-2">
                      <img
                        src={`http://localhost:3000/recursos/${resource.src}`}
                        alt={resource.alt}
                        className="w-14 h-14"
                      />
                      <input
                        type="number"
                        defaultValue={0}
                        min={0}
                        className="w-24 rounded-full text-right"
                        onChange={(e) => {
                          ActulizarArray(index, parseInt(e.target.value), 1);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <h1 className="text-4xl text-white ml-5 mb-4 mt-5">
                Recursos Ofrecidos:
              </h1>
              <div className="flex">
                {items.map((resource, index) => (
                  <div key={`ofrezco-${index}`}>
                    <div className="flex flex-row w-200 h-150 ml-30 rounded-13 justify-center mt-4 mb-4 ml-2">
                      <img
                        src={`http://localhost:3000/recursos/${resource.src}`}
                        alt={resource.alt}
                        className="w-14 h-14"
                      />
                      <input
                        type="number"
                        defaultValue={0}
                        min={0}
                        max={resource.value}
                        className="w-24 rounded-full text-right"
                        onChange={(e) => {
                          ActulizarArray(index, parseInt(e.target.value), 2);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={LanzarOfertar}>
              <div class=" mt-20">
                <button
                  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                  style={{ fontSize: "30px", marginLeft: "20px" }}
                >
                  Realizar Oferta
                </button>
              </div>
            </form>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpFaseNegociacion;
