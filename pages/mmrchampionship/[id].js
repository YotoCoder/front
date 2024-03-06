import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Cargador from "../components/Cargador";
import parse from "html-react-parser";
import Flag from "react-world-flags";

import moment from "moment";
import "moment/locale/es";

import { toast, Toaster } from "react-hot-toast";
import Menuligammr from "../components/Menummrchampionship";

import MyModal from "../components/modals/Modalchildren";

import { useAtom } from "jotai";

import { dataJugadorModalAtom, modalIsOpenAtom } from "../../store";

import ColorThief from "colorthief";

import Gozu from "../components/Gozu";

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

  const [puntaje, setPuntaje] = useState(0);

  const [values, setValues] = useAtom(dataJugadorModalAtom);
  const [isOpen, setIsOpen] = useAtom(modalIsOpenAtom);

  const [currentId, setCurrentId] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

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
    MMR_INICIAL: false,
    MMR_ACTUAL: false,
    PG: false,
    PP: false,
    PUNTOS: true,
    UPDATE: false,
  });

  const [MMR, setMMR] = useState(null);

  const [posicion, setPosicion] = useState({
    VISION_GENERAL: false,
    TABLA: true,
    REGISTRO: false,
    REGLAS: false,
  });

  const API_URL = process.env.APIhost + "/mmrchampionship/";

  const host = process.env.APIhost;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`${host}/mmrchampionship/${id}`).then((res) => {
      setLiga(res.data);
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
    const colorThief = new ColorThief();
    const img = new Image();
    img.src = host + liga.avatar;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      setDominantColor(colorThief.getColor(img));
      console.log(dominantColor);
    };
  }, [liga]);

  useEffect(() => {
    axios.get(`${host}/mmrchampionship/${id}/jugadores`).then((res) => {
      const data = res.data;
      const dataWithPoints = data.map((data) => ({
        ...data,
        puntos: data.perdidas - data.ganadas,
      }));

      // ordenar por puntos el array de jugadores
      dataWithPoints.sort((a, b) => {
        if (a.puntos < b.puntos) {
          return -1;
        }
        if (a.puntos > b.puntos) {
          return 1;
        }
        return 0;
      });

      setJugadores(dataWithPoints);
      // ordenar los jugadores por la diferencia entre ganadas y perdidas
    });
  }, [id]);

  const handleRegistro = (e) => {
    // si la fecha de inicio aun no ha llegado no se puede registrar
    // si la fecha de finalizacion ya ha llegado no se puede registrar
    // si el usuario ya esta registrado no se puede registrar
    // mmr minimo para registro 5000

    if (MMR < 5000) {
      toast.error("El MMR minimo para registrarse es 5000");
      return;
    }

    // if (new Date(liga.fecha_inicio) > new Date()) {
    //   toast.error(`La liga aun no ha comenzado, registro abierto a partir del ${liga.fecha_inicio}`);
    //   return;
    // }

    // if (new Date(liga.fecha_fin) < new Date()) {
    //   toast.error("La liga ya ha finalizado");
    //   return;
    // }

    if (
      jugadores.find(
        (jugador) => jugador.user.username === localStorage.getItem("username")
      )
    ) {
      toast.error("Ya estas registrado en esta liga");
      return;
    }

    let headersList = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      edicion_id: id,
      mmr_inicial: MMR,
    });

    let reqOptions = {
      url: `${host}/mmrchampionship/registrar-jugador`,
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

  moment.locale("es");

  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>Ligas | MMR Championship</title>
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
                duration: 5000,
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
            <div className="bg-[#111111] lg:my-4 lg:mt-4 lg:px-16">
              <div className="flex items-center justify-center pb-2 lg:pb-4">
                <img
                  src={host + liga.avatar}
                  className="w-[1200px] h-[80px] lg:h-[200px]"
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
                  MMR Championship
                </div>
                <p
                  className="text-white absolute lg:text-2xl lg:pt-20"
                  style={{ textShadow: "2px 2px 2px #000" }}
                >
                  {liga.nombre}
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
                      ? "active border-b-4 top-[1px] border-[#111111] pb-4"
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
                      ? "active border-b-4 top-[1px] border-[#111111] pb-4"
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
                  <Menuligammr />
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
                              className="bg-[#111111]items-center justify-center text-black font-mono py-2 px-4 rounded-[5px] mt-4"
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
                              className="bg-[#111111]items-center justify-center text-black font-mono py-2 px-4 rounded-[5px] mt-4"
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
                        <p className="blanco lg:text-2xl lg:pb-2">Detalles</p>
                        <p className="text-[#6E6F73] lg:w-96">
                          Biz Gaming te trae la mejor liga individual de dota 2
                          para incentivar el dota venezolano en alto nivel.
                          <br></br>
                          <br></br>
                          Durante 3 semanas se jugarán partidas individuales en
                          modo clasificación (partidas solo ranked), al
                          finalizar la edición las 3 personas que obtengan la
                          mayor cantidad de MMR se llevarán el pozo.
                          <br></br>
                          <br></br>
                          ¡Este torneo se lleva a cabo para dar inicio al gran
                          Segundo torneo de la vemartercup por equipos que se
                          estará realizando a inicios de Abril!
                          <p>
                            Premio extra al jugador que haya jugado la mayor
                            cantidad de partidas y no haya conseguido quedar
                            entre los ganadores.
                          </p>
                        </p>
                        <div className="">
                          <button
                            type="buttom"
                            className="bg-[#111111]items-center justify-center text-black font-serif font-bold py-2 px-4 rounded-[5px] mt-4"
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
                          <p className="text-[#76C100] text-2xl mx-6">300$</p>
                        </div>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">1° lugar</p>
                          <p className="text-[#76C100] text-2xl mx-6">150$</p>
                        </div>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">2° lugar</p>
                          <p className="text-[#76C100] text-2xl mx-6">100$</p>
                        </div>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">3° lugar</p>
                          <p className="text-[#76C100] text-2xl mx-6">50$</p>
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
                        <th className="px-1 py-2 blanco border border-[#111111] ">
                          Pos
                        </th>
                        <th className="px-1 py-2 blanco border border-[#111111]">
                          Jugador
                        </th>
                        <th className="px-1 py-2 blanco border border-[#111111]">
                          ID Amigo
                        </th>
                        <th
                          className={`px-1 py-2 cursor-pointer blanco border border-[#111111] ${
                            inOrder.MMR_INICIAL ? "bg-lime-800" : ""
                          }`}
                          onClick={() => {
                            setAscendente(!ascendente);
                            if (ascendente) {
                              jugadores.sort((a, b) => {
                                return b.mmr_inicial - a.mmr_inicial;
                              });
                            }
                            if (!ascendente) {
                              jugadores.sort((a, b) => {
                                return a.mmr_inicial - b.mmr_inicial;
                              });
                            }
                            setJugadores([...jugadores]);
                            setInOrder({
                              MMR_INICIAL: true,
                              MMR_ACTUAL: false,
                              ganadas: false,
                              perdidas: false,
                            });
                          }}
                        >
                          MMR Inicial
                        </th>

                        {/* <th
                          className={`px-1 py-2 cursor-pointer blanco border border-[#111111] ${
                            inOrder.MMR_ACTUAL ? "bg-lime-800" : ""
                          }`}
                          onClick={() => {
                            setAscendente(!ascendente);
                            if (ascendente) {
                              jugadores.sort((a, b) => {
                                return b.mmr_actual - a.mmr_actual;
                              });
                            }
                            if (!ascendente) {
                              jugadores.sort((a, b) => {
                                return a.mmr_actual - b.mmr_actual;
                              });
                            }
                            setJugadores([...jugadores]);
                            setInOrder({
                              MMR_INICIAL: false,
                              MMR_ACTUAL: true,
                              ganadas: false,
                              perdidas: false,
                            });
                          }}
                        >
                          MMR Actual
                        </th> */}

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
                              MMR_INICIAL: false,
                              MMR_ACTUAL: false,
                              PG: true,
                              PP: false,
                              PUNTOS: false,
                              UPDATE: false,
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
                              MMR_INICIAL: false,
                              MMR_ACTUAL: false,
                              PG: false,
                              PP: true,
                              PUNTOS: false,
                              UPDATE: false,
                            });
                          }}
                        >
                          PP
                        </th>
                        <th
                          className={`px-1 py-2 cursor-pointer blanco border border-[#111111] ${
                            inOrder.PUNTOS ? "bg-lime-800" : ""
                          }`}
                          onClick={() => {
                            setAscendente(!ascendente);

                            if (ascendente) {
                              jugadores.sort((a, b) => {
                                return b.puntos - a.puntos;
                              });
                            }
                            if (!ascendente) {
                              jugadores.sort((a, b) => {
                                return a.puntos - b.puntos;
                              });
                            }

                            setJugadores([...jugadores]);

                            setInOrder({
                              MMR_INICIAL: false,
                              MMR_ACTUAL: false,
                              PG: false,
                              PP: false,
                              PUNTOS: true,
                            });
                          }}
                        >
                          Puntos
                        </th>

                        <th
                          className={`px-1 py-2 cursor-pointer blanco border border-[#111111] ${
                            inOrder.UPDATE ? "bg-lime-800" : ""
                          }`}
                          onClick={() => {
                            setAscendente(!ascendente);
                            if (ascendente) {
                              jugadores.sort((a, b) => {
                                return (
                                  new Date(b.updated_at) -
                                  new Date(a.updated_at)
                                );
                              });
                            }
                            if (!ascendente) {
                              jugadores.sort((a, b) => {
                                return (
                                  new Date(a.updated_at) -
                                  new Date(b.updated_at)
                                );
                              });
                            }
                            setJugadores([...jugadores]);
                            setInOrder({
                              MMR_INICIAL: false,
                              MMR_ACTUAL: false,
                              PG: false,
                              PP: false,
                              PUNTOS: false,
                              UPDATE: true,
                            });
                          }}
                        >
                          Actualizado
                        </th>                       
                          <th className="px-1 py-2 blanco border border-[#111111]">
                            Acciones
                          </th>                        
                      </tr>
                    </thead>

                    <tbody>
                      {
                        // abrir un modal para editar el MMR actual pg pp onClick={() => alert(jugador.mmr_actual)}

                        jugadores.map((jugador, i) => (
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
                                  className="w-0 lg:w-8 h-8 rounded-full lg:block cursor-pointer"
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
                                      jugador.user.pais
                                        ? jugador.user.pais
                                        : "VE"
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
                              {jugador.id_amigo}
                            </td>
                            <td className="px-1 py-2 text-white border border-[#111111]">
                              {jugador.mmr_inicial}
                            </td>
                            {/* <td className="px-1 py-2 text-white border border-[#111111]">
                              {jugador.mmr_actual}
                            </td> */}
                            <td className="px-1 py-2 text-white border border-[#111111]">
                              {jugador.ganadas}
                            </td>
                            <td className="px-1 py-2 text-white border border-[#111111]">
                              {jugador.perdidas}
                            </td>
                            <td
                              className={`px-1 py-2 text-white border border-[#111111]
                                          ${
                                            jugador.ganadas - jugador.perdidas >
                                            0
                                              ? "text-green-400"
                                              : null
                                          }
                                          ${
                                            jugador.ganadas - jugador.perdidas <
                                            0
                                              ? "text-red-400"
                                              : null
                                          }
                                          ${
                                            jugador.ganadas -
                                              jugador.perdidas ==
                                            0
                                              ? "text-lime-400"
                                              : null
                                          }
                                          `}
                            >
                              {(jugador.ganadas - jugador.perdidas) * 30}
                            </td>

                            <td className="px-1 py-2 text-white border border-[#111111]">
                              {
                                // moment(jugador.update_at).format('DD/MM hh:mma')
                                moment(jugador.updated_at).fromNow()
                              }
                            </td>

                            <td className="px-1 py-2 text-white border border-[#111111]">
                              <button
                                className=""
                                onClick={() => {
                                  // modal para editar
                                  console.log(jugador);
                                  setValues({
                                    jugador_id: jugador.id,
                                    id_amigo: jugador.id_amigo,
                                    mmr_actual: jugador.mmr_actual,
                                    ganadas: jugador.ganadas,
                                    perdidas: jugador.perdidas,
                                  });
                                }}
                              >
                                {
                                  // verificar si el usuario existe en local storage para mostrar el boton de editar que llama
                                  jugador.user.username ==
                                  localStorage.getItem("username") ? (
                                    <button
                                      className="border-2 border-lime-400/60 text-white rounded-md px-2 py-1"
                                      onClick={() => {
                                        setIsOpen(true);
                                      }}
                                    >
                                      Editar
                                    </button>
                                    
                                  ) : (
                                 
                                        ''
                                  )
                                }
                              </button>

                              <label htmlFor="my-modal-5" className="btn bg-teal-400"
                                     onClick={() => {
                                        setCurrentPlayer(jugador);
                                        
                                      }}
                              >
                                 <img src="../icons/chart.svg" alt="..." className="w-6 h-6" />
                              </label>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  <MyModal></MyModal>
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
                        className="w-full py-2 mt-4 text-black bg-[#111111]rounded-md focus:outline-none"
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

        

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box lg:w-11/12 lg:max-w-5xl bg-black">
            {currentPlayer && (<Gozu props={currentPlayer} />)}

            <div className="modal-action">
              <label htmlFor="my-modal-5" className="btn text-sm"
                     onClick={() => {                        
                        setCurrentPlayer(null);
                      }
                     }
              >
                Cerrar
              </label>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Suspense>
  );
};

export default Liga;
