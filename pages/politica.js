import dynamic from "next/dynamic";
import Link from "next/link";
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

const Politica = () => {
  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>VMCP | Politica</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Venezuela Master CUP DOTA 2 | Politica"
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
        <Titulo primary={"Politica de Privacidad"} secondary={""} />
      </div>

      <div className="flex flex-col gap-4 m-2 text-white justify-center items-center">
        <p>
          Nuestra política de privacidad se basa en la protección de la
          privacidad de los usuarios de nuestro sitio web. En este documento se
          explica cómo recopilamos, almacenamos y utilizamos la información
          personal de los usuarios. Esta política de privacidad se aplica a
          todos los usuarios de nuestro sitio web.
        </p>
        <p>
          Al utilizar nuestro sitio web, usted acepta que recopilemos y
          utilicemos su información personal de acuerdo con esta política de
          privacidad. Si no está de acuerdo con esta política de privacidad, no
          utilice nuestro sitio web.
        </p>
        Esta política de privacidad se puede actualizar periódicamente. Si se
        actualiza, se publicará una nueva versión en este sitio web. Le
        recomendamos que revise esta política de privacidad regularmente para
        estar al tanto de los cambios.
        <p>
          Si tiene alguna pregunta sobre esta política de privacidad, puede
          contactarnos a través de nuestro formulario de contacto.
        </p>
        <h2 className="text-2xl font-bold">¿Información que recopilamos?</h2>
        <p>
          Recopilamos información personal de los usuarios de nuestro sitio web.
          Esta información puede incluir su nombre, dirección de correo
          electrónico, dirección postal, número de teléfono, información de pago
          y cualquier otra información que nos proporcione. También recopilamos
          información no personal de los usuarios de nuestro sitio web. Esta
          información puede incluir su dirección IP, tipo de navegador, sistema
          operativo y páginas visitadas.
        </p>
        <h2 className="text-2xl font-bold">
          ¿Cómo recopilamos su información?
        </h2>
        <p>
          Recopilamos información personal de los usuarios de nuestro sitio web
          cuando se registran en nuestro sitio web, compran un producto o
          servicio, participan en un concurso o promoción, responden a una
          encuesta, llenan un formulario o envían un correo electrónico.
        </p>
        También recopilamos información no personal de los usuarios de nuestro
        sitio web cuando visitan nuestro sitio web. Esta información se recopila
        utilizando cookies y tecnologías de seguimiento similares.
        <h2 className="text-2xl font-bold">¿Cómo utilizamos su información?</h2>
        <p>
          Utilizamos la información personal de los usuarios de nuestro sitio
          web para brindar un mejor servicio al usuario, personalizar su
          experiencia en nuestro sitio web y comunicarnos con usted.
        </p>
        <p>
          Utilizamos la información no personal de los usuarios de nuestro sitio
          web para analizar tendencias, administrar el sitio, rastrear el
          movimiento de los usuarios en el sitio y recopilar información
          demográfica.
        </p>
        <h2 className="text-2xl font-bold">¿Cómo protegemos su información?</h2>
        <p>
          Protegemos la información personal de los usuarios de nuestro sitio
          web mediante el uso de contraseñas seguras y almacenando la
          información en servidores seguros detrás de un firewall.
        </p>
        <h2 className="text-2xl font-bold">¿Compartimos su información?</h2>
        <p>
          No compartimos información personal de los usuarios de nuestro sitio
          web con terceros.
        </p>
        <h2 className="text-2xl font-bold">
          ¿Cómo puede acceder, actualizar o eliminar su información?
        </h2>
        <p>
          Los usuarios de nuestro sitio web pueden acceder, actualizar o
          eliminar su información personal en cualquier momento (salvo que se
          requiera conservar la información para fines administrativos, legales
          o de seguridad).
        </p>
        <h2 className="text-2xl font-bold">¿Cómo puede contactarnos?</h2>
        <p>
          Si tiene alguna pregunta sobre esta política de privacidad, puede
          contactarnos a través de nuestro formulario de{" "}
          <Link href="/contacto">contacto</Link>.
        </p>
      </div>
      <Footer />
    </Suspense>
  );
};

export default Politica;
