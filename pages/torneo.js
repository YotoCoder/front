import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Cargador from "./components/Cargador";
import parse from "html-react-parser";
import Flag from 'react-world-flags'
import Game from "./components/Master";

const Nav = dynamic(() => import("./components/Nav"), {
  suspense: true,
});

const Head = dynamic(() => import("next/head"), {
  suspense: true,
});

const Footer = dynamic(() => import("./components/Footer"), {
  suspense: true,
});

const Titulo = dynamic(() => import("./components/Titulo"), {
  suspense: true,
});

const Torneo = () => {
  const [torneo, setTorneo] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [posicion, setPosicion] = useState({
    VISION_GENERAL: false,
    TABLA: false,
    EQUIPOS: true,
    REGLAS: false,
  });


  // const host = "http://localhost:8000/api/torneo/";

  const host = "https://admin.vemastercup.com/api/torneo/";

  useEffect(() => {
    axios.get(host).then((res) => {
      setTorneo(res.data.results[0]);
      // console.log(res.data.results[0]);
      setCargando(false);
    });
  }, []);

  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>Torneos | VMCP</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Venezuela Master CUP DOTA 2"
          key="title"
        />

        <meta
          name="description"
          content="Pagina de organización de Torneos de Dota 2 online en Venezuela y latinoamerica."
          key="desc"
        />
        <meta
          name="og:description"
          content="Pagina de organización de Torneos de Dota 2 online en Venezuela y latinoamerica."
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
                {torneo.nombre}
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
                      EQUIPOS: false,
                      FASES: false,
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
                      EQUIPOS: false,
                      FASES: false,
                      REGLAS: true,
                    });
                  }}
                >
                  REGLAS
                </li>

                <li
                  className={`relative flex cursor-pointer items-center justify-center px-1 ${
                    posicion.EQUIPOS
                      ? "active border-b-4 top-[1px] border-[#FFC700] pb-4"
                      : "inactive"
                  }`}
                  onClick={() => {
                    setPosicion({
                      VISION_GENERAL: false,
                      TABLA: false,
                      EQUIPOS: true,
                      FASES: false,
                      REGLAS: false,
                    });
                  }}
                >
                  EQUIPOS
                </li>

                <li
                  className={`relative flex cursor-pointer items-center justify-center px-1 ${
                    posicion.FASES
                      ? "active border-b-4 top-[1px] border-[#FFC700] pb-4"
                      : "inactive"
                  }`}
                  onClick={() => {
                    setPosicion({
                      VISION_GENERAL: false,
                      TABLA: false,
                      EQUIPOS: false,
                      FASES: true,
                      REGLAS: false,
                    });
                  }}
                >
                  FASES
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
                      EQUIPOS: false,
                      FASES: false,
                      REGLAS: false,
                    });
                  }}
                >
                  <p>MAIN EVENT</p>
                </li>
              </ul>

              {posicion.VISION_GENERAL && (
                <>
                  <div className="lg:flex justify-between ">
                    <div className="lg:flex lg:flex-col lg:w-screen justify-between">
                      <div className="flex lg:justify-between gap-4 m-4 gris items-center py-4 justify-start text-xl lg:text-2xl tituloTorneo">
                        <div>
                          El torneo comienza el:
                          <p className="blanco">{torneo.fecha_inicio}</p>
                        </div>

                        <div>
                          <a
                            type="buttom"
                            className="bg-[#ffe500] items-center justify-center text-black font-mono py-2 px-4 rounded-[5px] mt-4"
                            href="#"
                            target="_blank"
                          >
                            {torneo.estado == "E" && "Inscribirse"}
                            {torneo.estado == "J" && "En juego"}
                            {torneo.estado == "F" && "Finalizado"}
                          </a>
                        </div>
                      </div>

                      <div className="flex m-4 items-center justify-between">
                        <div>
                          <p className="gris">MODO</p>
                          <p className="blanco">{torneo.modo}</p>
                        </div>

                        <div>
                          <p className="gris">SERVIDOR</p>
                          <p className="blanco">{torneo.servidor}</p>
                        </div>

                        <div className="">
                          <p className="gris">INSCRIPCION</p>
                          <p className="blanco">{torneo.valor_inscripcion}</p>
                        </div>
                      </div>

                      <div className="m-4">
                        <p className="gris">COMIENZA A LAS</p>
                        <p className="flex blanco gap-2">
                          <p>{torneo.fecha_inicio}</p> <p>5:00 PM</p>
                        </p>
                      </div>

                      <div className="m-4">
                        <p className="blanco lg:text-2xl pb-4 lg:pb-8">
                          RESTRICCIONES DEL TORNEO
                        </p>
                        <p className="text-[#6E6F73] lg:w-96">
                          Al participar solo o en equipo en el torneo, todos los
                          jugadores reconocen que están totalmente de acuerdo
                          con las reglas y los términos del torneo.
                          <br></br>
                          Al no cumplir con los requisitos previos, los usuarios
                          serán eliminados del torneo y baneados.
                        </p>
                        <div className="">
                          <button
                            type="buttom"
                            className="bg-[#ffe500] items-center justify-center text-black font-serif font-bold py-2 px-4 rounded-[5px] mt-4"
                            onClick={() => {
                              setPosicion({
                                VISION_GENERAL: false,
                                TABLA: false,
                                EQUIPOS: false,
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
                            {torneo.premio_primer_lugar +
                              torneo.premio_segundo_lugar +
                              torneo.premio_tercer_lugar}
                            $
                          </p>
                        </div>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">1° lugar</p>
                          <p className="text-[#FFE600] text-2xl mx-6">
                            {torneo.premio_primer_lugar}$
                          </p>
                        </div>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">2° lugar</p>
                          <p className="text-[#FFE600] text-2xl mx-6">
                            {torneo.premio_segundo_lugar}$
                          </p>
                        </div>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">3° lugar</p>
                          <p className="text-[#FFE600] text-2xl mx-6">
                            {torneo.premio_tercer_lugar}$
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-white py-6 bg-[#403f3f] px-6 font-bold">
                          VACANTES DISPONIBLES
                        </p>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">Ranuras llenas</p>
                          <p className="blanco text-2xl mx-6">
                            {torneo.inscritos}/{torneo.ranuras}
                          </p>
                        </div>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">Se han inscrito</p>
                          <p className="text-white text-2xl mx-6">
                            {torneo.inscritos}
                          </p>
                        </div>

                        <div className="flex my-[3px] bg-[#242424] justify-between items-center">
                          <p className="text-white p-4 px-6">Reservas</p>
                          <p className="text-white text-2xl mx-6">
                            {torneo.reservas}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {
                // FASES
                posicion.FASES && (
                  <>
                  <div className="flex items-center justify-center">
                    <img src='/images/fases/titulo_fase.png'
                          alt="titulo de la fase del torneo"
                          className=''
                      />
                  </div>
                  <div className="lg:flex items-center justify-center">
                    
                    <img src='/images/fases/grupo_a.png'
                         alt="grupo a del torneo"
                         className='flex decoration-purple-300'
                    />
                    <img src='/images/fases/grupo_b.png'
                         alt="grupo b del torneo"
                         className='flex'
                    />
                  </div>

                    <div className="flex items-center justify-center p-4 py-16">
                      <img src='/images/fases/dia_1.png' alt="dia 1 del torneo"
                           className='border p-4 rounded-2xl shadow-lg shadow-[#e7cd66]'
                      />
                    </div>
                    <div className="flex items-center justify-center p-4 py-16">
                      <img src='/images/fases/dia_2.png' alt="dia 2 del torneo"
                           className='border p-4 rounded-2xl shadow-lg shadow-[#e7cd66]'
                      />
                    </div>
                    <div className="flex items-center justify-center p-4 py-16">
                      <img src='/images/fases/dia_3.png' alt="dia 3 del torneo"
                           className='border p-4 rounded-2xl shadow-lg shadow-[#e7cd66]'
                      />
                    </div>
                    <div className="flex items-center justify-center p-4 py-16">
                      <img src='/images/fases/dia_4.png' alt="dia 4 del torneo"
                           className='border p-4 rounded-2xl shadow-lg shadow-[#e7cd66]'
                      />
                    </div>

                    <div className="flex items-center justify-center p-4 py-16">
                      <img src='/images/fases/dia_5.png' alt="dia 5 del torneo"
                           className='border p-4 rounded-2xl shadow-lg shadow-[#e7cd66]'
                      />
                    </div>
                  </>
                )
              }

              {posicion.TABLA && (
                <>
                  <Titulo primary="Main Event" secondary="VeMasterCUP" />
                  <div className="Game flex">
                    <Game />
                  </div>
                </>
              )}

              {posicion.EQUIPOS && (
                <div className="lg:grid lg:grid-cols-3 gap-4">
                  {torneo.equipos.map((equipo) => (
                    <>
                      <div className="flex relative lg:w-full mt-20 flex-col card items-center justify-center m-4">
                        <div className="flex flex-col items-center justify-center relative top-[-7vh] pt-[-7vh] ">
                          <div>
                            <img
                              src={equipo.avatar}
                              alt="..."
                              className="circuloPerfil p-2 rounded-full w-40 h-auto "
                              style={{
                                background:
                                  "linear-gradient( #c59b37, #f4e078 )",
                              }}
                            />
                            <h2 className="nombreCard text-2xl pt-2">
                              {equipo.nombre}
                            </h2>

                            <p className="subTitulo text-base">{equipo.tag}</p>
                          </div>

                          <div className=" w-full ">
                            {equipo.jugadores.map((jugador) => (
                              <div className="flex items-center hover:bg-yellow-800 justify-between gap-4 py-2">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={jugador.avatar}
                                    alt="..."
                                    className="rounded-full object-cover w-12 h-12"
                                  />

                                  <div className="text-white">
                                    {jugador.nick}
                                  </div>
                                </div>
                                <div className="text-gray-500 ">
                                  <p>{jugador.roll}</p>
                                </div>

                                <div className="flex items-center gap-2 ">
                                  <div className="h-6 w-6 pt-1">
                                    <Flag code={jugador.pais} height="6" />
                                  </div>
                                  {/*console.log(typeof jugador.steam_id)}*/}
                                  <img
                                    src="../icons/steam.svg"
                                    alt="..."
                                    className="rounded-full w-6 h-6 cursor-pointer"
                                    onClick={() =>
                                      window.open(jugador.steam_id)
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <p className="descripcion text-base w-60"></p>

                          <div className="flex gap-10  mt-6">
                            <div
                              className={`
                                      flex items-center text-2xl drop-shadow-sm rounded-2xl border-4  p-4 justify-center w-60 text-white 
                                      ${
                                        equipo.estado == "ACTIVO"
                                          ? "border-green-400 "
                                          : ""
                                      }
                                      ${
                                        equipo.estado == "ELIMINADO"
                                          ? "border-red-900 text-red-600"
                                          : ""
                                      }
                                      ${
                                        equipo.estado == "ESPERA"
                                          ? "border-yellow-400 text-yellow-400"
                                          : ""
                                      }`}
                            >
                              {
                                equipo.nombre == 'Biz Gaming'
                                  ? 'GANADOR'
                                  : equipo.estado                                
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}

              {posicion.REGLAS && (
                <>
                  <div className="flex gap-2 m-4 blanco items-center py-4 justify-start text-xl lg:text-2xl lg:justify-start tituloTorneo">
                    <p className="blanco">Reglas Generales</p>
                  </div>

                  <p className="text-[#ababab] m-4">
                    {parse(torneo.reglas.replaceAll(".", ".<br></br>"))}
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

export default Torneo;
