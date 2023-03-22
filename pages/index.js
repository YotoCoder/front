import dynamic from "next/dynamic";
import { Suspense } from "react";

import Cargador from "./components/Cargador";

import { Toaster } from "react-hot-toast";
import Eventos from "./components/sections/Eventos";
import Impacto from "./components/sections";

const MainContent = dynamic(() => import("./components/MainContent"), {
  suspense: true,
});

const Navbar = dynamic(() => import("./components/Navbar"), {
  suspense: true,
});

const Head = dynamic(() => import("next/head"), {
  suspense: true,
});

const About = dynamic(() => import("./components/About"), {
  suspense: true,
});

const Footer = dynamic(() => import("./components/Footer"), {
  suspense: true,
});

const Cards = dynamic(() => import("./components/Cards"), {
  suspense: true,
});

const Sponsors = dynamic(() => import("./components/Sponsors"), {
  suspense: true,
});

const Titulo = dynamic(() => import("./components/Titulo"), {
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
        <div>
          <MainContent /> <div className="z-[5000]"></div>
          <About />
          <div className="lg:pt-16">
            <Eventos />
          </div>

          <div className="">
            <Impacto />
          </div>
          <div className="lg:py-4 py-36">
            <Cards />
          </div>
          
          <div className="py-4">
            <Titulo
              primary={"Sponsors"}
              secondary={"Empresas que apoyan el proyecto VMCP."}
            />
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
          <Sponsors />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}
