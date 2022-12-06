import { useAtom } from "jotai";
import { sessionAtom, usernameSessionAtom } from "../../../store";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Cargador from "../../components/Cargador";
import { Toaster } from "react-hot-toast";
import Link from "next/link";


const Head = dynamic(() => import("next/head"), {
  suspense: true,
});

const Footer = dynamic(() => import("../../components/Footer"), {
  suspense: true,
});

const Titulo = dynamic(() => import("../../components/Titulo"), {
  suspense: true,
});

const Nav = dynamic(() => import("../../components/Nav"), {
  suspense: true,
});

const Username = () => {
  const [cargando, setCargando] = useState(true);
  const [user, setUser] = useState({});

  const [session, setSession] = useAtom(sessionAtom);
  const [usernameSession, setUsernameSession] = useAtom(usernameSessionAtom);

  const host = process.env.APIhost;
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    if (username != undefined) {
    axios.get(`${host}/users/${username}`).then((res) => {
      setUser(res.data);
      console.log(res.data);
      setCargando(false);
    });
    }
  }, [username]);

  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>{username} | VMCP</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Perfil de usuario | Venezuela Master CUP DOTA 2"
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

      <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="lg:flex">
          {/* user profile*/}
          <div className="flex relative lg:w-96 mt-20 flex-col card items-center justify-center w-auto m-4">
            <div className="flex flex-col items-center justify-center relative top-[-7vh] pt-[-7vh] w-52 ">
              <div className="">
                <img
                  src={
                    user.avatar
                      ? host + user.avatar
                      : "https://vemastercup.com/icons/user.svg"
                  }
                  alt="avatar"
                  id="img"
                  className="w-44 h-44 p-2 rounded-full lg:block"
                  style={{
                    background: "linear-gradient( #c59b37, #f4e078 )",
                  }}
                />
              </div>

              {(username == usernameSession) ? (
                <Link
                  href={"/user/form/" + username}
                  // href={'#'}
                  // as={`/user/form/${username}`}
                >
                  <img
                    src="../../icons/edit.svg"
                    alt="menu-editar"
                    className="w-6 relative right-[-140px] top-[-40] cursor-pointer"
                  />
                </Link>
                ) : (<></>)}

              <h2 className="nombreCard text-2xl pt-2">
                {user.first_name ? user.first_name : ""}{" "}
                {user.last_name ? user.last_name : ""}
              </h2>

              <p className="subTitulo text-base">@{username}</p>

              <h3 className="about pt-8 pb-4">Sobre Mi</h3>

              <p className="descripcion text-base w-60">
                {user.biografia ? user.biografia : "Agrega una Biografia"}
              </p>

              <div className="flex gap-10 border- border-t border-[#32353B] mt-6">
                <a
                  href={user.instagram_id ? user.instagram_id : "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="../../icons/discord2.svg"
                    alt="instagram"
                    className="w-[60px] mt-4"
                  />
                </a>
                <a
                  href={user.steam_id ? user.steam_id : "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="../../icons/steam.svg"
                    alt="steam"
                    className="w-12 mt-4"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </Suspense>
  );
};

export default Username;
