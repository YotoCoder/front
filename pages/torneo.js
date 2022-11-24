import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import Cargador from "./components/Cargador";

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

  useEffect(() => {
    axios.get("http://localhost:8000/api/torneo/").then((res) => {
      setTorneo(res.data[0]);
    });
  }, []);

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
        <div className="bg-[#121212] my-4 lg:mt-4 m-4 lg:m-0 lg:px-16">
          <div className="flex items-center py-4 justify-center text-xl lg:text-2xl lg:justify-start tituloTorneo">
            {torneo.nombre}
          </div>

          <ul className="flex justify-start gap-4 lg:gap-6 text-xs lg:text-base px-2 mb-4 border-b border-[#6E6F73]">
            <li className="relative px-1 active border-b-4 top-[1px] border-[#FFC700] pb-4 flex items-center justify-center">VISION GENERAL</li>
            <li className="inactive">TABLA</li>
            <li className="inactive">EQUIPOS</li>
            <li className="inactive">REGLAS</li>
          </ul>
        </div>

        <Footer />
      </div>
    </Suspense>
  );
};

export default Torneo;
