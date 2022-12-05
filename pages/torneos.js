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

const Torneos = () => {
  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>VMCP | Torneos</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Venezuela Master CUP DOTA 2 | Nosotros"
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
          primary={"Master CUP 2022"}
          secondary={"Clasificaciones y Resultados."}
        />
      </div>
      <div>
        <p className="flex flex-col text-center text-xl font-bold text-white">
          Equipos Registrados
          <i className="text-gray-300">7 / 16</i>
        </p>
        <div className="flex flex-col items-center justify-left text-gray-300 text-base">
          <p>Inicio: 30/11/2022</p>

          <p>Final: 11/12/2022</p>
        </div>

        <div className="flex flex-col items-center justify-center pt-10 px-10 text-gray-50 text-base">
          <p className="text-bold text-xl">
            Reglas:<br></br>
            <br></br>- Todos los equipos participantes deberán registrarse en el
            formulario disponible, especificando cada punto detalladamente.
            <br></br>
            <br></br>- Inscripcion de rango abierto
            <br></br> <br></br>- Todos los equipos deben suministrar logo del
            equipo y foto de perfil de cada jugador
            <br></br> <br></br>- Los suplentes son opcionales, pero solo podrán
            ser usados los que hayan sido inscriptos, 2 suplentes con rol fijo,
            de lo contrario no serán válidos, no importa si el motivo es error
            en inscripción, o cualquier otro.
            <br></br>
            <br></br>- El líder registrado debe ser el líder oficial del equipo,
            este realizara las selecciones y prohibiciones de héroes. De lo
            contrario, la inscripción no será válida.
            <br></br>
            <br></br>
            Excepciones permitidas 2 de 5 los miembros del equipo pueden ser de
            otros países
            <br></br>
            <br></br>
            ¿Vas a dejar que te lo cuenten? ¡Inscríbete ahora! 👇🏼
            <br></br>
            <br></br>
            <a
              href="https://bit.ly/3tGpK92"
              target="_blank"
              className="flex flex-col items-center justify-center bg-black p-4 rounded-xl"
            >
              ¡Inscríbete!
            </a>
            <br></br>
            <br></br>
            ✅️ Recuerda unirte a nuestro canal de Discord para resolver
            cualquier duda y tener acceso exclusivo a información referente al
            torneo.
            <br></br>
            <br></br>
          </p>
        </div>

        <div className="flex text-white items-center text-bold text-base justify-evenly mx-10">
          <a
            href="https://discord.gg/XrHXMyG6mb"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center rounded-xl"
          >
            Discord
            <img
              src="../icons/discord.svg"
              alt="discord"
              className="w-16 mt-4"
            />
          </a>

          <a
            href="https://instagram.com/vemastercup?igshid=ZDdkNTZiNTM="
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center rounded-xl"
          >
            Instagram
            <img
              src="../icons/insta.svg"
              alt="instagram"
              className="w-16 mt-4"
            />
          </a>
        </div>
      </div>

      <Footer />
    </Suspense>
  );
};

export default Torneos;
