import React, { useState, useEffect } from "react";

const PopUpOferta = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [arcilla, setMiArcilla] = useState(0);
  const [roca, setMiRoca] = useState(0);
  const [oveja, setMiOveja] = useState(0);
  const [trigo, setMiTrigo] = useState(0);
  const [madera, setMiMadera] = useState(0);

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

  return (
    <>
      <button onClick={handleOpen}>Mostrar Popup</button>
      {showPopup && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleBackgroundClick}
        >
          <div
            className="relative bg-gray-400 rounded-lg p-4 inline-flex flex-col items-center h-4/5 "
            style={{ minHeight: "640px", minWidth: "1290px" }}
          >
            <h1 className="text-3xl mt-2">OFERTA DE /*NOMBRE JUGADOR*/</h1>
            <img
              src={`${process.env.REACT_APP_URL_FRONTED}/white_cross.png`}
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/oveja.png`}
                    alt="oveja"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">0</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/troncos.png`}
                    alt="troncos"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">0</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/cebada.png`}
                    alt="cebada"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">0</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/piedras.png`}
                    alt="piedras"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">0</h1>
              </div>
              <div
                className="flex items-center"
                style={{ marginTop: "70px", marginLeft: "45px" }}
              >
                <div className="mr-2">
                  <img
                    src={`${process.env.REACT_APP_URL_FRONTED}/arcilla.png`}
                    alt="arcilla"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <h1 className="text-4xl text-white ml-2">0</h1>
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/oveja.png`}
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/troncos.png`}
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/cebada.png`}
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/piedras.png`}
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/arcilla.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>
              </div>

              <h1 className="text-4xl text-white ml-5 mb-4 mt-5">
                Recursos a recibir:
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/oveja.png`}
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/troncos.png`}
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/cebada.png`}
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/piedras.png`}
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
                    src={`${process.env.REACT_APP_URL_FRONTED}/arcilla.png`}
                    alt="oveja"
                    style={{ width: "50px", height: "50px", marginTop: "22px" }}
                  />
                  <h1 className="text-4xl text-grey-900 ml-2 mt-7">0</h1>
                </div>
              </div>
            </div>

            <div class=" mt-20">
              <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow mr-2"
                style={{ fontSize: "30px", marginLeft: "100px" }}
              >
                Contraoferta
              </button>
              <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                style={{ fontSize: "30px", marginLeft: "10px" }}
              >
                Rechazar
              </button>
              <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow ml-2"
                style={{ fontSize: "30px", marginLeft: "20px" }}
              >
                Aceptar
              </button>
            </div>

            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpOferta;
