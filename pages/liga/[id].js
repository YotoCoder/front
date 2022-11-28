import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Cargador from "../components/Cargador";
import parse from "html-react-parser";
import Flag from "react-world-flags";

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

  const [posicion, setPosicion] = useState({
    VISION_GENERAL: true,
    TABLA: false,
    LIGAS: false,
    REGLAS: false,
  });

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

  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>Venezuela Master CUP</title>
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
                      LIGAS: false,
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
                      LIGAS: false,
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
                      LIGAS: false,
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
                          <a
                            type="buttom"
                            className="bg-[#ffe500] items-center justify-center text-black font-mono py-2 px-4 rounded-[5px] mt-4"
                            href="https://surveyheart.com/form/6376bc345c66671af98b8eed"
                            target="_blank"
                          >
                            Registrarse
                          </a>
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
                                LIGAS: false,
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
                        <th className="px-1 py-2 blanco border border-[#121212]">
                          MMR
                        </th>
                        <th className="px-1 py-2 blanco border border-[#121212]">
                          Ganadas
                        </th>
                        <th className="px-1 py-2 blanco border border-[#121212]">
                          Perdidas
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {jugadores.map((jugador, i) => (
                        <tr className="bg-[#242424] hover:bg-yellow-700">
                          <td className="px-1 py-2 text-white border font-serif border-[#121212]">
                            {i + 1}
                          </td>
                          <td className="px-1 py-2 text-white border border-[#121212]">
                            <div className="lg:flex gap-2 items-center justify-between">
                              <img
                                src={
                                  jugador.imagen
                                    ? jugador.imagen
                                    : "../images/escudo.png"
                                }
                                alt="avatar-jugador"
                                className="w-8 h-8 rounded-full hidden lg:block"
                              />

                              <p className="">{jugador.user.username}</p>

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
            </div>
          </>
        )}

        <Footer />
      </div>
    </Suspense>
  );
};

export default Liga;
