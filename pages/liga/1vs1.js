import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Cargador from "../components/Cargador";
import parse from "html-react-parser";
import Flag from "react-world-flags";

import { toast, Toaster } from "react-hot-toast";
import Menuliga from "../components/Menuliga";

import ColorThief from 'colorthief';


const Nav = dynamic(() => import("../components/Nav"), {
  suspense: true,
});

const Head = dynamic(() => import("next/head"), {
  suspense: true,
});

const Footer = dynamic(() => import("../components/Footer"), {
  suspense: true,
});

const Titulo = dynamic(() => import("../components/Titulo"), {
  suspense: true,
});

const Liga = () => {
  const [liga, setLiga] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ascendente, setAscendente] = useState(false);
  const [fechaInicioFormateada, setFechaInicioFormateada] = useState("");
  const [fechaFinFormateada, setFechaFinFormateada] = useState("");
  const [dominantColor, setDominantColor] = useState([0, 0, 0]);

  const nombreMes = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [inOrder, setInOrder] = useState({
    MMR: false,
    PG: true,
    PP: false,
    PJ: false,
  });

  const [MMR, setMMR] = useState(null);

  const [posicion, setPosicion] = useState({
    VISION_GENERAL: true,
    TABLA: false,
    REGISTRO: false,
    REGLAS: false,
  });

  const API_URL = process.env.APIhost + "/ligas/";

  const host = process.env.APIhost;
  const router = useRouter();
  const id = 5;

  useEffect(() => {
    axios.get(`${host}/liga/${id}`).then((res) => {
      setLiga(res.data);

      // formatear fechas dia mes año sin restar un dia

      setFechaInicioFormateada({
        dia: new Date(res.data.fecha_inicio).getDate() + 1,
        mes: new Date(res.data.fecha_inicio).getMonth(),
        ano: new Date(res.data.fecha_inicio).getFullYear(),
      });

      setFechaFinFormateada({
        dia: new Date(res.data.fecha_fin).getDate() + 1,
        mes: new Date(res.data.fecha_fin).getMonth(),
        ano: new Date(res.data.fecha_fin).getFullYear(),
      });

      setCargando(false);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`${host}/liga/${id}/jugadores`).then((res) => {
      setJugadores(res.data);
    });
  }, [id]);

  useEffect(()=>{
    
    const colorThief = new ColorThief();
    const img = new Image();
    img.src = host + liga.avatar;
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      setDominantColor(colorThief.getColor(img));
      console.log(dominantColor);
    };
  }, [liga])

  const handleRegistro = (e) => {
    // si la fecha final ya paso, no se puede registrar
    if (new Date(liga.fecha_fin) < new Date()) {
      toast.error("La fecha de registro ya ha finalizado.");
      return;
    }

    // si ya arranco la liga, no se puede registrar
    if (new Date(liga.fecha_inicio) < new Date()) {
      toast.error("La liga ya ha comenzado, no se puede registrar.");
      return;
    }

    // si ya esta registrado, no se puede registrar cancelar y mostrar mensaje
    for (let i = 0; i < jugadores.length; i++) {
      if (jugadores[i].user.username == localStorage.getItem("username")) {
        toast.error("Ya estas registrado en la liga.");
        return;
      }
    }
    
    let headersList = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      liga_id: id,
      mmr: MMR,
    });

    let reqOptions = {
      url: `${host}/liga/registrar-jugador`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    e.preventDefault();
    axios(reqOptions)
      .then((res) => {
        toast.success("Te has registrado correctamente, GLHF! 🎮 VEmasterCUP!");
        setTimeout(() => {
          router.reload();
        }, 200);
      })
      .catch((err) => {
        toast.error(
          "No se pudo registrar, el MMR es Obligatorio o ya estas registrado en la liga, verifica la tabla."
        );
      });
  };

  useEffect(() => {
    console.log(jugadores);
  }, [jugadores]);

  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>Ligas | {liga.nombre}</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Venezuela Master CUP DOTA 2"
          key="title"
        />

        <meta
          name="description"
          content="Pagina de organización de Ligas de Dota 2 online en Venezuela y latinoamerica."
          key="desc"
        />
        <meta
          name="og:description"
          content="Pagina de organización de Torneos y Ligas de Dota 2 online en Venezuela y latinoamerica."
        />

        <meta property="og:image" content="../images/escudo.png" />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="icon" href="../images/escudo.png" />
      </Head>

      <div className="flex flex-col ">
        <div className="sticky top-0 z-50 w-full">
          <Nav />
          <Toaster
            toastOptions={{
              loading: {
                duration: 5000,
              },

              success: {
                duration: 3000,
              },
              // black theme
              style: {
                background: "#403f3f",
                color: "#fff",
              },
            }}
          />
        </div>

        {cargando ? (
          <div>
            <Cargador />
          </div>
        ) : (
          <>
            <div className="bg-[#111] lg:my-4 lg:mt-4 lg:px-16">
              <div className="flex items-center justify-center pb-2 lg:pb-4">
                <img
                  src={host + liga.avatar}
                  id='img'
                  className="w-[1200px] h-[80px] lg:h-[200px] "
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "brightness(0.7)",
                    borderRadius: "10px",
                    boxShadow: `0px 0px 34px rgb(${dominantColor})`,
                  }}
                />
                <div
                  className="text-white absolute mt-[-40px] lg:mt-[-50px] text-xl lg:text-4xl black titulo-liga"
                  style={{ textShadow: "4px 2px 2px #000" }}
                >
                    {liga.nombre}
                </div>
                <p
                  className="text-white absolute lg:text-2xl lg:pt-20"
                  style={{ textShadow: "2px 2px 2px #000" }}
                >
                  Liga 1vs1 Mixta Mujeres y Hombres
                </p>
                {/* colocar periodo de fechas */}
                <li
                  className="absolute text-xs mr-60 mt-6 text-white items-center lg:mr-[800px] lg:mt-10 lg:text-2xl"
                  style={{ textShadow: "2px 2px 2px #000" }}
                >
                  <div>
                    Inicio:{" "}
                    {fechaInicioFormateada.dia +
                      "-" +
                      nombreMes[fechaInicioFormateada.mes] +
                      "-" +
                      fechaInicioFormateada.ano}
                  </div>
                  <div>
                    Fin:{" "}
                    {fechaFinFormateada.dia +
                      "-" +
                      nombreMes[fechaFinFormateada.mes] +
                      "-" +
                      fechaFinFormateada.ano}
                  </div>
                </li>
              </div>

              <ul className="flex justify-start gap-2 lg:gap-6 text-xs lg:text-base px-2 mb-4 border-b border-[#6E6F73]">
                <li
                  className={`relative flex cursor-pointer items-center justify-center px-1 ${
                    posicion.VISION_GENERAL
                      ? "active border-b-4 top-[1px] border-[#71C100] pb-4"
                      : "inactive"
                  }`}
                  onClick={() => {
                    setPosicion({
                      VISION_GENERAL: true,
                      TABLA: false,
                      REGISTRO: false,
                      REGLAS: false,
                    });
                  }}
                >
                  VISION GENERAL
                </li>

                <li
                  className={`relative flex cursor-pointer items-center justify-center px-1 ${
                    posicion.REGLAS
                      ? "active border-b-4 top-[1px] border-[#71C100] pb-4"
                      : "inactive"
                  }`}
                  onClick={() => {
                    setPosicion({
                      VISION_GENERAL: false,
                      TABLA: false,
                      REGISTRO: false,
                      REGLAS: true,
                    });
                  }}
                >
                  REGLAS
                </li>

                <li
                  className={`relative flex cursor-pointer items-center justify-center px-1 ${
                    posicion.TABLA
                      ? "active border-b-4 top-[1px] border-[#76C200] pb-4"
                      : "inactive"
                  }`}
                  onClick={() => {
                    setPosicion({
                      VISION_GENERAL: false,
                      TABLA: true,
                      REGISTRO: false,
                      REGLAS: false,
                    });
                  }}
                >
                  <p>TABLA</p>
                </li>
                <li className="z-[10]">
                  {/* <Menuliga /> */}
                </li>
              </ul>

              {posicion.VISION_GENERAL && (
                <>
                  <div className="lg:flex justify-between ">
                    <div className="lg:flex lg:flex-col lg:w-screen justify-between">
                      <div className="flex lg:justify-between gap-4 m-4 gris items-center py-4 justify-start text-xl lg:text-2xl tituloLiga">
                        <div>
                          Una liga de dota 2
                          {/* <p className="blanco">{liga.fecha_inicio}</p> */}
                        </div>

                        <div>
                          {localStorage.getItem("token") ? (
                            <button
                              className="bg-[#71C100] items-center justify-center text-white font-mono py-2 px-4 rounded-[5px] mt-4"
                              onClick={() => {
                                setPosicion({
                                  VISION_GENERAL: false,
                                  TABLA: false,
                                  REGISTRO: true,
                                  REGLAS: false,
                                });
                              }}
                            >
                              Registrarse
                            </button>
                          ) : (
                            <button
                              className="bg-[#71C100] items-center justify-center text-white font-mono py-2 px-4 rounded-[5px] mt-4"
                              onClick={() => {
                                toast.error(
                                  "Debes iniciar sesión para registrarte en la liga"
                                );
                              }}
                            >
                              Registrarse
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex m-4 items-center justify-between">
                        <div>
                          <p className="gris">MODO</p>
                          <p className="blanco">{liga.modo}</p>
                        </div>

                        <div>
                          <p className="gris">SERVIDOR</p>
                          <p className="blanco">{liga.servidor}</p>
                        </div>

                        <div className="">
                          <p className="gris">INSCRIPCION</p>
                          <p className="flex blanco text-2xl items-center justify-center">
                            {liga.valor_inscripcion}
                          </p>
                        </div>
                      </div>

                      <div className="m-4 flex gap-4">
                        <div>
                          <p className="gris">COMIENZA</p>
                          <p className=" blanco gap-6">
                            <p>{liga.fecha_inicio}</p> <p></p>
                          </p>
                        </div>

                        <div>
                          <p className="gris">FINALIZA</p>
                          <p className=" blanco gap-2">
                            <p>{liga.fecha_fin}</p> <p></p>
                          </p>
                        </div>
                      </div>

                      <div className="m-4">
                        <p className="blanco lg:text-2xl pb-4 lg:pb-8">
                          DESCRIPCION
                        </p>
                        <p className="text-[#6E6F73] lg:w-96">
                          {parse(liga.descripcion.replaceAll(".", ".<br>"))}
                        </p>
                        <div className="">
                          <button
                            type="buttom"
                            className="bg-[#71C100] items-center justify-center text-white font-serif font-bold py-2 px-4 rounded-[5px] mt-4"
                            onClick={() => {
                              setPosicion({
                                VISION_GENERAL: false,
                                TABLA: false,
                                REGISTRO: false,
                                REGLAS: true,
                              });
                            }}
                          >
                            Ver Todas Las Reglas
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div>
                        <p className="text-white py-4 bg-[#403f3f] px-6 font-bold">
                          PREMIACION DEL TORNEO{" "}
                        </p>
                        <div className="flex bg-[#242424] my-[3px] justify-between items-center">
                          <p className="text-white p-4 text-sm px-6 font-bold">
                            PREMIACION TOTAL
                          </p>
                          <p className="text-[#76C100] text-2xl mx-6">
                            {liga.premios}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-white py-6 bg-[#403f3f] px-6 font-bold">
                          VACANTES DISPONIBLES
                        </p>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">Ranuras</p>
                          <p className="blanco text-2xl mx-6">{liga.ranuras}</p>
                        </div>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">Se han inscrito</p>
                          <p className="text-white text-2xl mx-6">
                            {jugadores.length}
                          </p>
                        </div>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">Reservas</p>
                          <p className="text-white text-2xl mx-6">
                            {liga.reservas}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {posicion.TABLA && (
                <div className="px-1 overflow-x-auto">
                  <table
                    className="w-full text-center"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <thead>
                      <tr className="bg-[#403f3f] ">
                        <th className="px-1 py-2 blanco border border-[#111111] ">
                          Pos
                        </th>
                        <th className="px-1 py-2 blanco border border-[#111111]">
                          Jugador
                        </th>
                        <th
                          className={`px-1 py-2 cursor-pointer blanco border border-[#111111] ${
                            inOrder.MMR ? "bg-lime-800" : ""
                          }`}
                          onClick={() => {
                            setAscendente(!ascendente);
                            if (ascendente) {
                              jugadores.sort((a, b) => {
                                return b.mmr - a.mmr;
                              });
                            }
                            if (!ascendente) {
                              jugadores.sort((a, b) => {
                                return a.mmr - b.mmr;
                              });
                            }
                            setJugadores([...jugadores]);
                            setInOrder({
                              MMR: true,
                              ganadas: false,
                              perdidas: false,
                            });
                          }}
                        >
                          MMR
                        </th>
                        <th
                          className={`px-1 py-2 cursor-pointer blanco border border-[#111111] ${
                            inOrder.PG ? "bg-lime-800" : ""
                          }`}
                          onClick={() => {
                            setAscendente(!ascendente);
                            if (ascendente) {
                              jugadores.sort((a, b) => {
                                return b.ganadas - a.ganadas;
                              });
                            }
                            if (!ascendente) {
                              jugadores.sort((a, b) => {
                                return a.ganadas - b.ganadas;
                              });
                            }
                            setJugadores([...jugadores]);
                            setInOrder({
                              MMR: false,
                              PG: true,
                              PP: false,
                              PJ: false,
                            });
                          }}
                        >
                          PG
                        </th>
                        <th
                          className={`px-1 py-2 cursor-pointer blanco border border-[#111111] ${
                            inOrder.PP ? "bg-lime-800" : ""
                          }`}
                          onClick={() => {
                            setAscendente(!ascendente);
                            if (ascendente) {
                              jugadores.sort((a, b) => {
                                return b.perdidas - a.perdidas;
                              });
                            }
                            if (!ascendente) {
                              jugadores.sort((a, b) => {
                                return a.perdidas - b.perdidas;
                              });
                            }
                            setJugadores([...jugadores]);
                            setInOrder({
                              MMR: false,
                              PG: false,
                              PP: true,
                              PJ: false,
                            });
                          }}
                        >
                          PP
                        </th>
                        <th
                          className={`px-1 py-2 cursor-pointer blanco border border-[#111111] ${
                            inOrder.PJ ? "bg-lime-800" : ""
                          }`}
                          onClick={() => {
                            setAscendente(!ascendente);
                            if (ascendente) {
                              jugadores.sort((a, b) => {
                                return (
                                  b.ganadas +
                                  b.perdidas -
                                  (a.ganadas + a.perdidas)
                                );
                              });
                            }
                            if (!ascendente) {
                              jugadores.sort((a, b) => {
                                return (
                                  a.ganadas +
                                  a.perdidas -
                                  (b.ganadas + b.perdidas)
                                );
                              });
                            }
                            setJugadores([...jugadores]);

                            setInOrder({
                              MMR: false,
                              PG: false,
                              PP: false,
                              PJ: true,
                            });
                          }}
                        >
                          PJ
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {jugadores.map((jugador, i) => (
                        <tr
                          className={` hover:bg-lime-700 ${
                            i % 2 == 0 ? "bg-[#1d1d1d]" : "bg-[#242424]"
                          }`}
                        >
                          <td
                            className={`px-1 py-2 text-white border font-serif border-[#111111]`}
                          >
                            {i + 1}
                          </td>
                          <td className="px-1 py-2 text-white border border-[#111111]">
                            <div className="flex gap-2 items-center justify-between">
                              <img
                                src={
                                  jugador.user.avatar
                                    ? host + jugador.user.avatar
                                    : "https://vemastercup.com/icons/user.svg"
                                }
                                alt="avatar-jugador"
                                className="w-8 h-8 rounded-full lg:block cursor-pointer"
                                onClick={() =>
                                  window.open(
                                    "/user/profile/" + jugador.user.username
                                  )
                                }
                              />

                              <p className="">{jugador.user.username}</p>
                              <div className="flex gap-2">
                                <Flag
                                  code={
                                    jugador.user.pais ? jugador.user.pais : "VE"
                                  }
                                  className="w-6 h-6"
                                />
                                <img
                                  src="../icons/steam.svg"
                                  alt="..."
                                  className="rounded-full  w-6 h-6 cursor-pointer hidden lg:block"
                                  onClick={() =>
                                    window.open(
                                      jugador.user.steam_id
                                        ? jugador.user.steam_id
                                        : "https://steamcommunity.com/"
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-1 py-2 text-white border border-[#111111]">
                            {jugador.mmr}
                          </td>
                          <td className="px-1 py-2 text-white border border-[#111111]">
                            {jugador.ganadas}
                          </td>
                          <td className="px-1 py-2 text-white border border-[#111111]">
                            {jugador.perdidas}
                          </td>
                          <td className="px-1 py-2 text-white border border-[#111111]">
                            {jugador.perdidas + jugador.ganadas}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {posicion.REGLAS && (
                <>
                  <div className="flex gap-2 m-4 blanco items-center py-4 justify-start text-xl lg:text-2xl lg:justify-start tituloLiga">
                    <p className="blanco">Reglas Generales</p>
                  </div>

                  <p className="text-[#ababab] m-4">
                    {parse(liga.reglas.replaceAll(".", ".<br>"))}
                  </p>
                </>
              )}

              {posicion.REGISTRO && (
                <>
                  <div className="flex flex-col gap-2 m-4 blanco items-center py-4 justify-start text-xl lg:text-2xl lg:justify-start tituloLiga">
                    <p className="blanco">Registro</p>

                    <div className="flex gap-2 items-center">
                      <p className="text-[#ababab] text-sm">
                        {jugadores.length} / {liga.ranuras}
                      </p>

                      <div className="w-24 h-2 bg-[#ababab] rounded-full">
                        <div
                          className="w-1/2 h-full bg-[#111111]rounded-full"
                          style={{
                            width: `${
                              (jugadores.length / liga.ranuras) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <p>Ingrese Su MMR</p>
                      <input
                        id="MMR"
                        type="number"
                        required
                        className="block w-full px-4 py-2 mt-2  bg-[#403f3f] border  rounded-md  text-gray-300 border-gray-600  focus:border-gray-500 focus:outline-none focus:ring"
                        onChange={(e) => setMMR(e.target.value)}
                      />
                      <button
                        className="w-full py-2 mt-4 text-white bg-[#71C100] rounded-md focus:outline-none"
                        onClick={handleRegistro}
                      >
                        Registrarme
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        <Footer />
      </div>
    </Suspense>
  );
};

export default Liga;
