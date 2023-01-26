import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Cargador from "../components/Cargador";
import parse from "html-react-parser";
import Flag from "react-world-flags";

import { toast, Toaster } from "react-hot-toast";

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

  const [inOrder, setInOrder] = useState({
    MMR: false,
    PG: true,
    PP: false,
    PJ: false,
  });

  const [MMR, setMMR] = useState(null);

  const [posicion, setPosicion] = useState({
    VISION_GENERAL: false,
    TABLA: true,
    REGISTRO: false,
    REGLAS: false,
  });

  const API_URL = process.env.APIhost + "/ligas/";

  const host = process.env.APIhost;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`${host}/liga/${id}`).then((res) => {
      setLiga(res.data);

      setCargando(false);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`${host}/liga/${id}/jugadores`).then((res) => {
      setJugadores(res.data);
    });
  }, [id]);

  const handleRegistro = (e) => {
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
        <title>Ligas | VMCP</title>
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
            <div className="bg-[#121212] my-4 lg:mt-4 lg:px-16">
              <div className="flex items-center py-4 justify-center text-xl lg:text-2xl lg:justify-start tituloTorneo">
                {liga.nombre}
              </div>

              <ul className="flex justify-start gap-2 lg:gap-6 text-xs lg:text-base px-2 mb-4 border-b border-[#6E6F73]">
                <li
                  className={`relative flex cursor-pointer items-center justify-center px-1 ${
                    posicion.VISION_GENERAL
                      ? "active border-b-4 top-[1px] border-[#FFC700] pb-4"
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
                      ? "active border-b-4 top-[1px] border-[#FFC700] pb-4"
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
                      ? "active border-b-4 top-[1px] border-[#FFC700] pb-4"
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
              </ul>

              {posicion.VISION_GENERAL && (
                <>
                  <div className="lg:flex justify-between ">
                    <div className="lg:flex lg:flex-col lg:w-screen justify-between">
                      <div className="flex lg:justify-between gap-4 m-4 gris items-center py-4 justify-start text-xl lg:text-2xl tituloLiga">
                        <div>
                          El liga comienza el:
                          <p className="blanco">{liga.fecha_inicio}</p>
                        </div>

                        <div>
                          {localStorage.getItem("token") ? (
                            <button
                              className="bg-[#ffe500] items-center justify-center text-black font-mono py-2 px-4 rounded-[5px] mt-4"
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
                              className="bg-[#ffe500] items-center justify-center text-black font-mono py-2 px-4 rounded-[5px] mt-4"
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

                      <div className="m-4">
                        <p className="gris">COMIENZA A LAS</p>
                        <p className="flex blanco gap-2">
                          <p>{liga.fecha_inicio}</p> <p>5:00 PM</p>
                        </p>
                      </div>

                      <div className="m-4">
                        <p className="blanco lg:text-2xl pb-4 lg:pb-8">
                          RESTRICCIONES DE LA LIGA
                        </p>
                        <p className="text-[#6E6F73] lg:w-96">
                          Al participar solo o en equipo en el liga, todos los
                          jugadores reconocen que están totalmente de acuerdo
                          con las reglas y los términos del liga.
                          <br></br>
                          Al no cumplir con los requisitos previos, los usuarios
                          serán eliminados del liga y baneados.
                        </p>
                        <div className="">
                          <button
                            type="buttom"
                            className="bg-[#ffe500] items-center justify-center text-black font-serif font-bold py-2 px-4 rounded-[5px] mt-4"
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
                          <p className="text-[#FFE600] text-2xl mx-6">
                            {liga.premios}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-white py-6 bg-[#403f3f] px-6 font-bold">
                          VACANTES DISPONIBLES
                        </p>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">Ranuras llenas</p>
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
                        <th className="px-1 py-2 blanco border border-[#121212] ">
                          Pos
                        </th>
                        <th className="px-1 py-2 blanco border border-[#121212]">
                          Jugador
                        </th>
                        <th
                          className={`px-1 py-2 cursor-pointer blanco border border-[#121212] ${
                            inOrder.MMR ? "bg-yellow-800" : ""
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
                          className={`px-1 py-2 cursor-pointer blanco border border-[#121212] ${
                            inOrder.PG ? "bg-yellow-800" : ""
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
                          className={`px-1 py-2 cursor-pointer blanco border border-[#121212] ${
                            inOrder.PP ? "bg-yellow-800" : ""
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
                          className={`px-1 py-2 cursor-pointer blanco border border-[#121212] ${
                            inOrder.PJ ? "bg-yellow-800" : ""
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
                          className={` hover:bg-yellow-700 ${
                            i % 2 == 0 ? "bg-[#1d1d1d]" : "bg-[#242424]"
                          }`}
                        >
                          <td
                            className={`px-1 py-2 text-white border font-serif border-[#121212]`}
                          >
                            {i + 1}
                          </td>
                          <td className="px-1 py-2 text-white border border-[#121212]">
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
                                    '/user/profile/' + jugador.user.username
                                  )}
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
                          <td className="px-1 py-2 text-white border border-[#121212]">
                            {jugador.mmr}
                          </td>
                          <td className="px-1 py-2 text-white border border-[#121212]">
                            {jugador.ganadas}
                          </td>
                          <td className="px-1 py-2 text-white border border-[#121212]">
                            {jugador.perdidas}
                          </td>
                          <td className="px-1 py-2 text-white border border-[#121212]">
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
                    {parse(liga.reglas.replaceAll(".", ".<br></br>"))}
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
                          className="w-1/2 h-full bg-[#FFE600] rounded-full"
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
                        className="w-full py-2 mt-4 text-black bg-[#FFE600] rounded-md focus:outline-none"
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
