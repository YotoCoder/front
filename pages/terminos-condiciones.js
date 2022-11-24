import dynamic from "next/dynamic";
import { Suspense } from "react";

import Cargador from "./components/Cargador";

const Nav = dynamic(() => import("./components/Nav"), {
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

const Titulo = dynamic(() => import("./components/Titulo"), {
  suspense: true,
});

const Terminos = () => {
  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>VMCP | Terminos y Condiciones</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Venezuela Master CUP DOTA 2 | Terminos"
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

      <div className="py-4">
        <Titulo primary={"Terminos y Condiciones"} secondary={""} />
      </div>

      <div className="flex flex-col gap-4 m-2 text-white justify-center items-center">
        <p>
          Nuestros términos y condiciones se basan en la protección de los
          usuarios de nuestro sitio web. En este documento se explica cómo
          recopilamos, almacenamos y utilizamos la información personal de los
          usuarios. Estos términos y condiciones se aplican a todos los usuarios
          de nuestro sitio web.
        </p>

        <p>
          Al utilizar nuestro sitio web, usted acepta que recopilemos y
          utilicemos su información personal de acuerdo con estos términos y
          condiciones. Si no está de acuerdo con estos términos y condiciones,
          no utilice nuestro sitio web.
        </p>

        <p>
          Estos términos y condiciones se pueden actualizar periódicamente. Si
          se actualizan, se publicará una nueva versión en este sitio web. Si
          continúa utilizando nuestro sitio web después de que se publiquen los
          cambios, acepta los términos y condiciones actualizados.
        </p>

        <p>
          Si tiene alguna pregunta sobre estos términos y condiciones, puede
          contactarnos en el siguiente correo electrónico:{" "}
          <a href="mailto:vemastercup@gmail.com'">vemastercup@gmail.com</a>
        </p>
      </div>

      <Footer />
    </Suspense>
  );
};

export default Terminos;
