import dynamic from "next/dynamic";
import { Suspense } from "react";
import Cargador from "./components/Cargador";
import ModalFlyer from "./components/modals/ModalFlyer";
import Image from "next/image";
import Link from "next/link";
import { ProximosTorneos } from "./components/ProximosTorneos";
import { Nosotros } from "./components/Nosotros";
import { Eventos } from "./components/Eventos";
import { Equipo } from "./components/Equipo";
import { Patrocinadores } from "./components/Patrocinadores";

const Head = dynamic(() => import("next/head"), {
  suspense: true,
});

const Footer = dynamic(() => import("./components/Footer"), {
  suspense: true,
});

const Nav = dynamic(() => import("./components/Nav"), {
  suspense: true,
});

export default function Home() {
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

        <meta
          property="og:image"
          content="https://vemastercup.com/images/escudo.png"
        />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="icon" href="https://vemastercup.com/images/escudo.png" />
      </Head>

      <div className="flex flex-col">
        <div className="sticky top-0 z-50 w-full">
          <Nav />
        </div>
        <div className="flex flex-col gap-8">
          {/* <MainContent /> <div className="z-[5000]"></div> */}
          {/* <ModalFlyer /> */}

          <div className="text-4xl lg:text-6xl font-extrabold text-center text-[#76C200] mt-10">
            Regístrate en el Torneo
          </div>
          <div className="text-xl lg:text-4xl text-center text-[#76C200] mt-2">
            Campeonato Nacional Clasificatorio, Eliminatorias Brasil 2024
          </div>
          <Image
            // animar el icono que brinque arriba y abajo
            src="/icons/arrowdowngreen.svg"
            alt="Venezuela Master CUP"
            width={20}
            height={20}
            className="mx-auto my-4 lg:mt-6 animate-bounce"
          />
          <div>
            <div className="relative text-center  hover:scale-110 z-10 font-bold text-black bg-backgroundLayer2 bg-center bg-contain bg-no-repeat p-10 mt-2 mx-4">
              <Link
                href="/registro-torneo-vmc-2024"
                className="text-2xl lg:text-2xl cursor-pointer"
              >
                Click aquí para registrarte
              </Link>
            </div>
            <div className="bg-white w-full h-52 -translate-y-12"></div>
          </div>

          <div className="bg-[#76C200] pb-24 pt-8 -translate-y-20" id="torneos">
            <div className="mt-10 mx-4 lg:mx-8">
              <h3 className="text-2xl lg:text-3xl !font-light text-left text-[#1A1A1A] ">
                Próximos torneos
              </h3>
            </div>
            <ProximosTorneos />
          </div>
          <Nosotros />
          <Eventos />

          <Equipo />

          <Patrocinadores />

          <Footer />
        </div>
      </div>
    </Suspense>
  );
}
