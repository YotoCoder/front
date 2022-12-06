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

const Contacto = () => {
  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>VMCP | Contacto</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Venezuela Master CUP DOTA 2 | Contacto"
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
      <div className="sticky top-0 z-50 w-full">
        <Nav />
      </div>
      <div className="pb-4">
        <Titulo
          primary={"Contacto"}
          secondary={"Comunicate con nosotros para mas info."}
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="text-white p-4 text-xl">Información de contacto.</p>

        <div className="flex flex-col gap-2 p-4">
          <p className="text-white text-xl">
            Email:{" "}
            <span className="text-gray-400">
              <a href="mailto:vemastercup@gmail.com">vemastercup@gmail.com</a>
            </span>
          </p>
          <p className="text-white text-xl">
            Instagram:{" "}
            <span className="text-gray-400">
              <a href="https://www.instagram.com/vemastercup/">@vemastercup</a>
            </span>
          </p>
          <p className="text-white text-xl">
            Discord:{" "}
            <span className="text-gray-400">
              <a href="https://discord.gg/87FXMWQE">
                https://discord.gg/87FXMWQE
              </a>
            </span>
          </p>
        </div>
      </div>
      <div className="lg:fixed bottom-0 w-[100%]">
        <Footer />
      </div>
    </Suspense>
  );
};

export default Contacto;
