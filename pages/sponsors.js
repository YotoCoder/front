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

const Sponsors = dynamic(() => import("./components/Sponsors"), {
  suspense: true,
});

const Partnerts = () => {
  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>VMC | Sponsors</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Venezuela Master CUP DOTA 2 | Sponsors"
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
          primary={"Sponsors"}
          secondary={"Empresas que apoyan el proyecto VMC."}
        />
      </div>

      <Sponsors />

      <Footer />
    </Suspense>
  );
};

export default Partnerts;
