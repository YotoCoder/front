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
import Tooltip from "@mui/material/Tooltip";
import Flag from "react-world-flags";

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
  const [mmr, setMmr] = useState(null);

  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [topHeroes, setTopHeroes] = useState([]);

  const [heroes, setHeroes] = useState([]);

  const [hero_1, setHero_1] = useState({});
  const [hero_2, setHero_2] = useState({});
  const [hero_3, setHero_3] = useState({});

  const [session, setSession] = useAtom(sessionAtom);
  const [usernameSession, setUsernameSession] = useAtom(usernameSessionAtom);

  const [openTooltip, setOpenTooltip] = useState(false);

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

  useEffect(() => {
    if (
      user.id_amigo != undefined &&
      user.id_amigo != "null" &&
      user.id_amigo != ""
    ) {
      axios
        .get(`https://api.opendota.com/api/players/${user.id_amigo}/`)
        .then((res) => {
          setMmr(res.data.mmr_estimate.estimate);
          setCargando(false);
        });

      axios
        .get(`https://api.opendota.com/api/players/${user.id_amigo}/wl/`)
        .then((res) => {
          setWins(res.data.win);
          setLosses(res.data.lose);
        });

      axios
        .get(`https://api.opendota.com/api/players/${user.id_amigo}/heroes/`)
        .then((res) => {
          setTopHeroes(res.data);
        });

      axios.get(`https://api.opendota.com/api/heroStats/`).then((res) => {
        console.log(res.data);
        setHeroes(res.data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (heroes != []) {
      heroes.map((hero) => {
        // console.log(topHeroes[0].hero_id)
        // console.log(hero.id)

        if (topHeroes[0].hero_id == hero.id) {
          setHero_1(hero);
        }
        if (topHeroes[1].hero_id == hero.id) {
          setHero_2(hero);
        }

        if (topHeroes[2].hero_id == hero.id) {
          setHero_3(hero);
        }
      });
    }
  }, [topHeroes]);

  return (
    <Suspense fallback={<Cargador />}>
      <Head>
        <title>{username} | VMC</title>
        <meta lang="es" />
        <meta
          property="og:title"
          content="Perfil de usuario | Venezuela Master CUP DOTA 2"
          key="title"
        />

        <meta
          name="og:description"
          content={"Perfil de usuario de " + username + " en VMVCP"}
          key="desc"
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
          <div className="flex relative lg:w-[500px] mt-20 flex-col card items-center justify-center w-auto m-4">
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

              {username == usernameSession ? (
                <Link href={"/user/form/" + username}>
                  <img
                    src="../../icons/edit.svg"
                    alt="menu-editar"
                    className="w-6 relative right-[-140px] top-[-40] cursor-pointer"
                  />
                </Link>
              ) : (
                <></>
              )}

              <h2 className="nombreCard text-2xl pt-2">
                {user.first_name ? user.first_name : ""}{" "}
                {user.last_name ? user.last_name : ""}
              </h2>

              <div className="flex items-center gap-2 ">
                <p className="subTitulo text-base">@{username}</p>
                <div className="h-6 w-6 pt-1">
                  <Flag code={user.pais ? user.pais : "VE"} height="6" />
                </div>
              </div>

              <div className="flex flex-col items-start justify-center">
                <div>
                  <p className="text-gray-400 text-base pt-4">
                    Rol: {user.rol ? user.rol : "Sin rol"}
                  </p>
                  <p className="text-gray-400 text-base">
                    MMR avg: {mmr ? mmr : "Sin id amigo o steam privado"}
                  </p>

                  <p className="text-gray-400 text-base pt-2">
                    Wins: {wins ? wins : ""}
                  </p>

                  {/* <p className="text-gray-400 text-base">
                    Losses: {losses ? losses : ""}
                  </p> */}
                </div>
                <div className="bg-[#2f3136] flex flex-col w-72 items-center justify-center drop-shadow-md text-gray-100 text-base p-4 m-4 rounded-xl">
                  <p className="text-bold ">Top 3 Heroes</p>
                  <div className="flex flex-col gap-4 py-2">
                    <div className="flex flex-col bg-[#202225] rounded-2xl p-4 items-center justify-center">
                      {hero_1.localized_name ? hero_1.localized_name : ""}
                      <img
                        src={
                          hero_1.icon
                            ? "https://cdn.cloudflare.steamstatic.com" + hero_1.icon
                            : "../../icons/loader.svg"
                        }
                        alt="hero-1"
                        className="w-6 h-6 rounded-full"
                      />
                      <p className="flex gap-4 items-center justify-start">
                        {topHeroes[0] && (
                          <>
                            <div className="text-green-300">
                              W <b className="text-white">{topHeroes[0].win}</b>
                            </div>
                            <div className="text-red-300">
                              L{" "}
                              <b className="text-white">
                                {topHeroes[0].games - topHeroes[0].win}
                              </b>
                            </div>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col bg-[#202225] rounded-2xl p-4 items-center justify-center">
                      {hero_2.localized_name ? hero_2.localized_name : ""}

                      <img
                        src={
                          hero_2.icon
                            ? "https://cdn.cloudflare.steamstatic.com" + hero_2.icon
                            : "../../icons/loader.svg"
                        }
                        alt="hero-2"
                        className="w-6 h-6 rounded-full"
                      />
                      <p className="flex gap-4 items-center justify-start">
                        {topHeroes[1] && (
                          <>
                            <div className="text-green-300">
                              W <b className="text-white">{topHeroes[1].win}</b>
                            </div>
                            <div className="text-red-300">
                              L{" "}
                              <b className="text-white">
                                {topHeroes[1].games - topHeroes[1].win}
                              </b>
                            </div>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col bg-[#202225] rounded-2xl p-4 items-center justify-center">
                      {hero_3.localized_name ? hero_3.localized_name : ""}
                      <img
                        src={
                          hero_3.icon
                            ? "https://cdn.cloudflare.steamstatic.com" + hero_3.icon
                            : "../../icons/loader.svg"
                        }
                        alt="hero-3"
                        className="w-6 h-6 rounded-full"
                      />
                      <p className="flex gap-4 items-center justify-start">
                        {topHeroes[2] && (
                          <>
                            <div className="text-green-300">
                              W <b className="text-white">{topHeroes[2].win}</b>
                            </div>
                            <div className="text-red-300">
                              L{" "}
                              <b className="text-white">
                                {topHeroes[2].games - topHeroes[2].win}
                              </b>
                            </div>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="about pt-8 pb-4">Sobre Mi</h3>

              <p className="descripcion text-base w-60">
                {user.biografia ? user.biografia : "Agrega una Biografia"}
              </p>

              <div className="flex gap-10 border- border-t border-[#32353B] mt-6">
                <Tooltip
                  title={
                    user.discord ? "Copiado " + user.discord : "Sin discord"
                  }
                  open={openTooltip}
                  onClose={() => setOpenTooltip(false)}
                  arrow
                >
                  <i
                    onClick={() => {
                      navigator.clipboard.writeText(user.discord);
                      setOpenTooltip(true);
                    }}
                    className="fa-sharp fa-solid fa-share-nodes text-[rgba(0,0,0,0.35)] transition-all 500 hover:text-blue-500 cursor-pointer"
                  >
                    <img
                      src="../../icons/discord2.svg"
                      alt="discord"
                      className="w-[60px] mt-4"
                    />
                  </i>
                </Tooltip>

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
