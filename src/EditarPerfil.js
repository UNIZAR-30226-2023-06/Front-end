import React from "react";
import Popup from "reactjs-popup";
import jwt_decode from "jwt-decode";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function EditarPerfil() {
  /* --------------------------- variables --------------------------- */

  const [desplegado, setDesplegado] = useState(true);
  const styleSidebarOn =
    "transition-all duration-900 w-80 h-full opacity-95 p-5 pt-8 border border-solid border-cyan-900 sidebar_PrivateHome";
  const styleSidebarOff = "hidden transition-all duration-900";
  const styleMenuOn =
    "transition-all duration-900 absolute top-0 left-0 w-10 h-10 object-cover";
  const styleMenuOff = "hidden transition-all duration-900";
  const styleCruzOn =
    "hover:cursor-pointer transition-all duration-900 absolute top-0 right-0 w-8 h-8 mr-2 mt-2 object-cover";
  const styleCruzOff = "transition-all duration-900 hidden";
  const styleLinks = "gap-3 mt-2 ml-1 flex flex-grow relative ";
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [dinero, set_dinero] = React.useState(null);
  const [nombre, set_nombre] = React.useState(null);
  const [codigo, set_codigo] = React.useState(null);
  const [imagen, set_imagen] = React.useState(null);
  const [skin, set_skin] = React.useState(null);
  const [ficha, set_ficha] = React.useState(null);
  const [nummensajes, set_nummensajes] = React.useState(null);
  const [elo, set_elo] = React.useState(null);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]); // Agregamos removeCookie
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const responsive = {
    0: { items: 1 },
    640: { items: 3 },
    768: { items: 3 },
    1024: { items: 4 },
    1280: { items: 4 },
    1536: { items: 6 },
    1792: { items: 6 },
  };

  const fotos_perfil = [];
  const skins = [];
  const fichas = [];

  /* --------------------------- calculamos el tamaño de la ventana --------------------------- */

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenSize(newScreenWidth);
      if (newScreenWidth < 720) {
        setDesplegado(false);
      } else {
        setDesplegado(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  /* --------------------------- seguridad  --------------------------- */

  // en caso de que no estemos logueados ve a la página de login
  useEffect(() => {
    if (cookies.token === "") {
      navigate("/login");
    }
  }, [cookies.token, navigate]);

  /* --------------------------- cookies  --------------------------- */

  // cargamos los datos de los usuarios y hacemos decode del token
  const Token = cookies.token;
  const json_token = jwt_decode(Token);
  // console.log(json_token);

  /* --------------------------- obtener datos usuario  --------------------------- */

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/get-user-from-id/${parseInt(
        json_token.id
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Token}`,
        },
      }
    )
      .then((res) => {
        res.json().then((data) => {
          // Actualizamos el estado de cosas
          const img =
            data.profile_picture === "default"
              ? `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/skin1.png`
              : `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/${data.profile_picture}.png`;
          const skin_tablero =
            data.selected_grid_skin === "default"
              ? `${process.env.REACT_APP_URL_FRONTED}/skin_mar/skin0.png`
              : `${process.env.REACT_APP_URL_FRONTED}/skin_mar/${data.selected_grid_skin}.png`;
          const fich =
            data.selected_pieces_skin === "default"
              ? `${process.env.REACT_APP_URL_FRONTED}/fotos-tienda-urbanizacion/skin0.png`
              : `${process.env.REACT_APP_URL_FRONTED}/fotos-tienda-urbanizacion/${data.selected_pieces_skin}.png`;
          set_dinero(data.coins);
          set_codigo(data.id);
          set_nombre(data.username);
          set_imagen(img);
          set_skin(skin_tablero);
          set_ficha(fich);
          set_elo(data.elo);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [json_token.id]);

  /* --------------------------- miramos si hay mensajes pendientes --------------------------- */

  fetch(`${process.env.REACT_APP_URL_BACKEND}/get_friend_requests`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      response.json().then((data) => {
        //console.log(data.number_of_requests);
        set_nummensajes(data.number_of_requests);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  fetch(`${process.env.REACT_APP_URL_BACKEND}/list-profile-pictures`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${Token}`,
    },
  })
    .then((res) => {
      res.json().then(async (data) => {
        await filterProfilePictures(data);
        mapeoFotos();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  async function filterProfilePictures(data) {
    // asegurarnos de que data está definido antes de continuar
    if (data && data.profile_pictures) {
      await Promise.all(
        data.profile_pictures.map(async (objeto) => {
          console.log(objeto);
          if (objeto !== "default") {
            fotos_perfil.push(objeto);
          } else {
            fotos_perfil.push("skin1");
          }
        })
      );
    }
  }

  fetch(`${process.env.REACT_APP_URL_BACKEND}/list-board-skins`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${Token}`,
    },
  })
    .then((res) => {
      res.json().then(async (data) => {
        await filterBoardSkins(data);
        mapeoSkins();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  async function filterBoardSkins(data) {
    // asegurarnos de que data está definido antes de continuar
    if (data && data.board_skins) {
      await Promise.all(
        data.board_skins.map(async (objeto) => {
          if (objeto !== "default") {
            skins.push(objeto);
          }
        })
      );
    }
  }

  fetch(`${process.env.REACT_APP_URL_BACKEND}/list-piece-skins`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${Token}`,
    },
  })
    .then((res) => {
      res.json().then(async (data) => {
        await filterPieceSkins(data);
        mapeoFichas();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  async function filterPieceSkins(data) {
    // asegurarnos de que data está definido antes de continuar
    if (data && data.piece_skins) {
      await Promise.all(
        data.piece_skins.map(async (objeto) => {
          if (objeto !== "default") {
            fichas.push(objeto);
          }
        })
      );
    }
  }

  var items_fotos_perfil = [];
  var items_skin = [];
  var items_fichas = [];

  async function mapeoFotos() {
    items_fotos_perfil = fotos_perfil.map((foto, i) => (
      <div className="slide_tienda">
        <img
          src={
            `${process.env.REACT_APP_URL_FRONTED}/fotos_perfil/` + foto + `.png`
          }
          className="rounded-full bg-cyan-900 hover:cursor-pointer mt-4"
          name={foto}
          onClick={(event) => {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(foto);
            const name = event.target.name;
            fetch(
              `${process.env.REACT_APP_URL_BACKEND}/change-profile-picture?new_profile_picture=${name}`,
              {
                method: "POST",
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${Token}`,
                },
              }
            );
            toast.loading("cargando");
            const intervalId = setInterval(() => {
              window.location.reload();
            }, 5000);

            return () => clearInterval(intervalId);
          }}
        />
      </div>
    ));
  }

  async function mapeoSkins() {
    items_skin = skins.map((foto, i) => (
      <div className="slide_tienda">
        <img
          src={`${process.env.REACT_APP_URL_FRONTED}/skin_mar/` + foto + `.png`}
          className="rounded-full bg-cyan-900 hover:cursor-pointer mt-4"
          name={foto}
          onClick={(event) => {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(foto);
            const name = event.target.name;
            fetch(
              `${process.env.REACT_APP_URL_BACKEND}/change-grid-skin?new_grid_skin=${name}`,
              {
                method: "POST",
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${Token}`,
                },
              }
            );
            toast.loading("cargando");
            const intervalId = setInterval(() => {
              window.location.reload();
            }, 5000);

            return () => clearInterval(intervalId);
          }}
        />
      </div>
    ));
  }

  async function mapeoFichas() {
    items_fichas = fichas.map((foto, i) => (
      <div className="slide_tienda">
        <img
          src={
            `${process.env.REACT_APP_URL_FRONTED}/fotos-tienda-urbanizacion/` +
            foto +
            `.png`
          }
          className="rounded-full bg-cyan-900 hover:cursor-pointer mt-4"
          name={foto}
          onClick={(event) => {
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(foto);
            const name = event.target.name;
            fetch(
              `${process.env.REACT_APP_URL_BACKEND}/change-pieces-skin?new_pieces_skin=${name}`,
              {
                method: "POST",
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${Token}`,
                },
              }
            );
            toast.loading("cargando");
            const intervalId = setInterval(() => {
              window.location.reload();
            }, 5000);

            return () => clearInterval(intervalId);
          }}
        />
      </div>
    ));
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleNameChange = () => {
    if (inputValue.trim() === "") {
      toast.error("Error en el cambio de nombre:\n debes introducir un nombre");
      return;
    }
    console.log(inputValue.trim());
    fetch(
      `${
        process.env.REACT_APP_URL_BACKEND
      }/change-username?new_username=${inputValue.trim()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Token}`,
        },
      }
    )
      .then((res) => {
        res.json().then(async (data) => {
          console.log(data);
          window.location.reload();
          toast.success("Nombre cambiado con exito");
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setInputValue("");
    setError("");
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword === "" || confirmPassword === "") {
      toast.error("La contraseña no puede estar vacia");
      return;
    } else if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas tienen que coincidir");
      return;
    } else {
      toast.success("Contraseña cambiada correctamente");
    }

    fetch(
      `${process.env.REACT_APP_URL_BACKEND}/change-password?new_password=${newPassword}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Token}`,
        },
      }
    )
      .then((res) => {
        res.json().then(async (data) => {
          console.log(data);
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    /* --------------------------- fondo de las montañas --------------------------- */
    <div className="w-full h-full flex imagenCustomPrivateHome">
      {/* --------------------------- menu --------------------------- */}
      <div
        className={`over_SideBaar relative h-full ${
          // si la ventana es pequeña o desplegado falso que no se vea
          screenSize < 720 && !desplegado ? styleSidebarOff : styleSidebarOn
        }`}
      >
        {/* --------------------------- cruz de cerrar menu --------------------------- */}
        <img
          src={`${process.env.REACT_APP_URL_FRONTED}/white_cross.png`}
          alt="imagen para cerrar la sidebar"
          className={`hover:cursor-pointer ${
            screenSize < 720 && desplegado ? styleCruzOn : styleCruzOff
          }`}
          onClick={() => {
            setDesplegado(false);
          }}
        />

        {/* --------------------------- datos del usuario --------------------------- */}

        <div className="relative block gap-x-4 mx-auto">
          {/* --------------------------- foto del avatar --------------------------- */}
          <img
            alt="profil"
            src={imagen}
            className={`mx-auto object-cover rounded-full h-28 w-28 mt-9 bg-teal-200`}
          />
          {/* --------------------------- nombre del usuario --------------------------- */}

          <h1
            className={`text-white origin-center content-center font-medium text-xl mt-2`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {nombre}#{codigo}
          </h1>
          <h1
            className={`text-white origin-center content-center font-medium text-lg mt-2`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            ELO: {elo} ⚔
          </h1>
          {/* --------------------------- dinero --------------------------- */}
          <h1
            className={`text-white origin-center content-center font-medium text-lg mt-1`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {dinero}

            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/white_dinero.png`}
              className={`w-6 h-6 ml-2`}
            />
          </h1>
        </div>
        <ul className="flex flex-col w-full items-start py-6 px-4 gap-2">
          {/* --------------------------- volver al home --------------------------- */}
          <a
            href={`${process.env.REACT_APP_URL_FRONTED}/home`}
            className={styleLinks}
          >
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/home.png`}
              className={`object-cover h-7 w-7`}
            />

            <h1
              href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Inicio
            </h1>
          </a>
          {/* --------------------------- editar perfil --------------------------- */}
          <a
            href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
            className={styleLinks}
          >
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/editProfile.png`}
              className={`object-cover h-7 w-7`}
            />

            <h1
              href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Editar perfil
            </h1>
          </a>
          {/* --------------------------- amigos ---------------------------*/}
          <a
            href={`${process.env.REACT_APP_URL_FRONTED}/amigosT`}
            className={styleLinks}
          >
            {/* imagen amigos*/}
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/friends.png`}
              className={`object-cover h-7 w-7}`}
            />
            {nummensajes > 0 && (
              <>
                <div
                  className="absolute top-0 right-0 transform translate-x-14 -translate-y-1/4 h-4 w-4 bg-red-800 text-white text-xs flex items-center justify-center rounded-full"
                  style={{ left: "50%" }}
                >
                  {nummensajes}
                </div>
              </>
            )}
            <h1
              href="/login"
              variant={Link}
              className={`text-white font-medium text-xl duration-300`}
            >
              Amigos
            </h1>
          </a>
          {/* --------------------------- tienda --------------------------- */}
          <a
            href={`${process.env.REACT_APP_URL_FRONTED}/tienda`}
            className={styleLinks}
          >
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/shopping-cart.png`}
              className={`object-cover h-7 w-7`}
            />

            <h1
              href={`${process.env.REACT_APP_URL_FRONTED}/editarPerfil`}
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Tienda
            </h1>
          </a>
          {/* --------------------------- Instrucciones --------------------------- */}
          <a
            href={`${process.env.REACT_APP_URL_FRONTED}/Instrucciones`}
            className={styleLinks}
          >
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/libro-abierto.png`}
              className={`object-cover h-7 w-7`}
            />

            <h1
              href={`${process.env.REACT_APP_URL_FRONTED}/Instrucciones`}
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Instrucciones
            </h1>
          </a>
          {/* --------------------------- logout --------------------------- */}

          <div
            className={`hover:cursor-pointer ${styleLinks}`}
            onClick={() => {
              // "borramos" las cookies
              setCookie("token", "", { path: "/" });
              window.location.href = `${process.env.REACT_APP_URL_FRONTED}`;
            }}
          >
            {/* imagen log out*/}
            <img
              alt="profil"
              src={`${process.env.REACT_APP_URL_FRONTED}/logout.png`}
              className={`object-cover h-7 w-7`}
            />

            <h1
              href="/login"
              variant={Link}
              className={`text-white origin-center content-center font-medium text-xl`}
            >
              Cerrar sesión
            </h1>
          </div>
          {/* --------------------------- añadir amigos --------------------------- */}

          <form
            className={`flex bottom-0 left-0 mt-72`}
            // `bottom-0 left-0 p-4 w-auto fixed`
            // "absolute left-0 w-full bg-gray-200 p-4">

            onSubmit={(e) => {
              e.preventDefault(); // Agregar esto para evitar que la página se recargue
              fetch(
                `${process.env.REACT_APP_URL_BACKEND}/send_friend_request?friend_id=${e.target.amigo_id.value}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${Token}`,
                  },
                }
              )
                .then((res) => {
                  res.json().then((data) => {
                    if (data.detail === `Friend request already exists`) {
                      toast.error(
                        "este usuario ya tiene una solicitud tuya pendiente"
                      );
                    } else if (data.detail === `User not found`) {
                      toast.error("usuario no encontrado");
                      toast("si quieres enviar una solicitud pon solo el id", {
                        ico: `😉`,
                      });
                    } else if (data.detail === `Friend request sent`) {
                      toast.success("solicitud enviada con éxito");
                    }
                  });
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            <input
              id="amigo_id"
              className={`w-48 p-2 mr-2 border border-transparent border-b-white focus:border focus:border-white bg-transparent text-white`}
              type="text"
              placeholder="Añadir amigo: 2345"
            />
            <button className="px-4 py-2 rounded-full bg-cyan-900 hover:bg-slate-900 text-white w-12 h-10">
              <img
                src={`${process.env.REACT_APP_URL_FRONTED}/add-friend.png`}
                alt="boton de añadir amigos"
              />
            </button>
          </form>
        </ul>
      </div>
      {/* --------------------------- menu plegado --------------------------- */}
      <img
        src={`${process.env.REACT_APP_URL_FRONTED}/menu.png`}
        alt="menu desplegable, clicka aqui para desplegarlo"
        className={`hover:cursor-pointer w-8 h-8 m-4 ${
          screenSize < 720 && !desplegado ? styleMenuOn : styleMenuOff
        }`}
        onClick={() => {
          setDesplegado(true);
        }}
      />

      <h1 className="m-14">
        <div
          className="bg-cyan-900/60 rounded-lg p-4 inline-flex flex-col items-center h-4/5"
          style={{ minHeight: "800px", minWidth: "1290px" }}
        >
          {" "}
          <div
            className="overflow-y-scroll opacity-95 bg-cyan-900 rounded-xl shadow-xl"
            style={{
              width: "1200px",
              height: "calc(100% - 50px)",
              overflow: "auto",
              position: "relative",
              margin: "20px",
            }}
          >
            {/* --------------------------- pagina ---------------------------*/}
            <div>
              <Popup
                trigger={
                  /************ LO QUE VA AQUI ES LO QUE SACA LA POPUP ************/
                  <div className="flex items-center justify-center flex-col">
                    <h1 className="text-white font-medium text-3xl mb-2 mr-4 mb-4 mt-4">
                      Foto de perfil
                    </h1>
                    <img
                      alt="profil"
                      src={imagen}
                      className="object-cover rounded-full h-60 w-60 bg-cyan-900 hover:cursor-pointer"
                    />
                  </div>
                }
                modal
                nested
                arrow={false}
                contentStyle={{
                  width: "60%",
                  height: "45%",
                  border: "5px solid black",
                  borderRadius: "10px",
                }}
              >
                {(close) => (
                  /************ LO QUE VA AQUI ES LO QUE HAY DENTRO DE LA POP UP ************/
                  <div className="justify-center gap-10 mt-8 mx-2 ml-2">
                    <AliceCarousel
                      mouseTracking
                      items={items_fotos_perfil}
                      responsive={responsive}
                      controlsStrategy="alternate"
                    />
                  </div>
                )}
              </Popup>
            </div>
            <div className="text-center text-white font-medium text-5xl mr-2">
              {"#" + codigo}
            </div>

            <div className="flex justify-center mt-4">
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={`Tu nombre actual: ${nombre}`}
                  className="mb-4"
                />
                {error && <p>{error}</p>}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleNameChange}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
              >
                Cambiar nombre
              </button>
            </div>

            <Popup
              trigger={
                <div className="flex justify-center mt-5">
                  <button className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
                    Cambiar contraseña
                  </button>
                </div>
              }
              modal
              nested
              arrow={false}
              contentStyle={{
                width: "60%",
                height: "45%",
                border: "5px solid black",
                borderRadius: "10px",
              }}
            >
              {(close) => (
                /************ LO QUE VA AQUI ES LO QUE HAY DENTRO DE LA POP UP ************/
                <div className="justify-center gap-10 mt-8 mx-2 ml-2">
                  <h2 className="text-center">
                    Cambiar contraseña
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center"
                  >
                    <label htmlFor="newPassword">Nueva contraseña:</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      className="mb-4"
                    />

                    <label htmlFor="confirmPassword">
                      Confirmar contraseña:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className="mb-4"
                    />

                    {error && <p>{error}</p>}

                    <button
                      type="submit"
                      className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mb-5"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={close}
                      className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                    >
                      Cancelar
                    </button>
                  </form>
                </div>
              )}
            </Popup>
            <div className="flex justify-center">
              <Popup
                trigger={
                  /************ LO QUE VA AQUI ES LO QUE SACA LA POPUP ************/
                  <div>
                    <div
                      className="rounded-lg bg-gray-300 p-4 mt-10"
                      style={{
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h1 className="text-black font-medium text-3xl ml-2">
                        Skins del tablero
                      </h1>
                    </div>

                    <img
                      alt="profil"
                      src={skin}
                      className={`ml-10 object-cover rounded-full h-60 w-60 mt-9 bg-cyan-900 hover:cursor-pointer`}
                    />
                  </div>
                }
                modal
                nested
                arrow={false}
                contentStyle={{
                  width: "60%",
                  height: "45%",
                  border: "5px solid black",
                  borderRadius: "10px",
                }}
              >
                {(close) => (
                  /************ LO QUE VA AQUI ES LO QUE HAY DENTRO DE LA POP UP ************/
                  <div className="justify-center gap-10 mt-8 mx-2 ml-2">
                    <AliceCarousel
                      mouseTracking
                      items={items_skin}
                      responsive={responsive}
                      controlsStrategy="alternate"
                    />
                  </div>
                )}
              </Popup>

              <Popup
                trigger={
                  /************ LO QUE VA AQUI ES LO QUE SACA LA POPUP ************/
                  <div>
                    <div
                      className="rounded-lg bg-gray-300 p-4 mt-10"
                      style={{
                        height: "50px",
                        display: "flex",
                        width: "50%",
                        marginLeft:"90px",
                        alignItems: "center",
                      }}
                    >
                      <h1 className="text-black font-medium text-3xl ml-2">
                        Fichas
                      </h1>
                    </div>

                    <img
                      alt="profil"
                      src={ficha}
                      className={`ml-10 object-cover rounded-full h-60 w-60 mt-9 bg-cyan-900 hover:cursor-pointer`}
                    />
                  </div>
                }
                modal
                nested
                arrow={false}
                contentStyle={{
                  width: "60%",
                  height: "45%",
                  border: "5px solid black",
                  borderRadius: "10px",
                }}
              >
                {(close) => (
                  /************ LO QUE VA AQUI ES LO QUE HAY DENTRO DE LA POP UP ************/
                  <div className="justify-center gap-10 mt-8 mx-2 ml-2">
                    <AliceCarousel
                      mouseTracking
                      items={items_fichas}
                      responsive={responsive}
                      controlsStrategy="alternate"
                    />
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </div>
      </h1>
    </div>
  );
}
