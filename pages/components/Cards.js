import { FaTeamspeak } from "react-icons/fa";

const Cards = () => {
  return (
    <>
    <div className="flex flex-col items-center  gap-3 mt-4">
          <h2 className="text-center text-[2rem] text-white flex items-center gap-2">
            <span>
            El equipo detrás de VMC
            </span>
            <span className="mt-2">
              <FaTeamspeak className="text-[2rem]" />
            </span>
          </h2>
          <div className='flex flex-col items-center justify-center'>
            <img
              className="rounded-md"
              src="../images/team/team.jpg"
              alt=""
            />

          </div>
        </div>
    <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
      <div className="lg:flex">
        {/* Grechiin*/}
        <div className="flex relative lg:w-96 mt-20 flex-col card items-center justify-center w-auto m-4">
          <div className="flex flex-col items-center justify-center relative top-[-7vh] pt-[-7vh] w-52 ">
            <img
              src="../images/team/grechiimcirculo.png"
              alt="..."
              className="circuloPerfil p-2 rounded-full max-w-full h-auto "
              style={{
                background: "linear-gradient(#71C100, #65C900)",
              }}
            />
            <h2 className="nombreCard text-2xl pt-2">Grecia Mogollón</h2>

            <p className="subTitulo text-base">@Grechi</p>

            <h3 className="about pt-8 pb-4">Sobre Mi</h3>

            <p className="descripcion text-base w-60">
              Amo la música, cantar, las películas y juegos de terror y el metal.
            </p>

            <div className="flex gap-10 border- border-t border-[#32353B] mt-6">
            <a
                href="https://www.instagram.com/grechiim"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="../icons/instagram.svg"
                  alt="instagram"
                  className="w-12 mt-4"
                />
              </a>
              <a href="#" rel="noreferrer">
                <img
                  src="../icons/twitter.svg"
                  alt="twitter"
                  className="w-12 mt-4"
                />
              </a>
              <a
                href="https://www.twitch.tv/grechi"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="../icons/twitch.svg"
                  alt="twitch"
                  className="w-12 mt-4"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Span0h*/}

        <div className="flex relative lg:w-96 mt-20 flex-col card items-center justify-center w-auto m-4">
          <div className="flex flex-col items-center justify-center relative top-[-7vh] pt-[-7vh] w-52 ">
            <img
              src="../images/team/yoto.jpg"
              alt="..."
              className="circuloPerfil p-2 rounded-full max-w-full h-auto "
              style={{
                background: "linear-gradient(#71C100, #65C900)",
              }}
            />
            <h2 className="nombreCard text-2xl pt-2">Yonathan Soto</h2>

            <p className="subTitulo text-base">@yoto</p>

            <h3 className="about pt-8 pb-4">Sobre Mi</h3>

            <p className="descripcion text-base w-60">
              Desarrollador web, amante de los videojuegos, la música y el cine.
            </p>

            <div className="flex gap-10 border- border-t border-[#32353B] mt-6">
              <a
                href="https://www.instagram.com/__yoto/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="../icons/instagram.svg"
                  alt="instagram"
                  className="w-12 mt-4"
                />
              </a>
              <a href="https://www.instagram.com/__yoto/" rel="noreferrer"
                 target="_blank"
              >
                <img
                  src="../icons/twitter.svg"
                  alt="twitter"
                  className="w-12 mt-4"
                />
              </a>
              <a href="https://www.instagram.com/__yoto/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="../icons/twitch.svg"
                  alt="twitch"
                  className="w-12 mt-4"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Antony*/}

        <div className="flex relative lg:w-96 mt-20 flex-col card items-center justify-center w-auto m-4">
          <div className="flex flex-col items-center justify-center relative top-[-7vh] pt-[-7vh] w-52 ">
            <img
              src="../images/team/antonycirculo.png"
              alt="..."
              className="circuloPerfil p-2 rounded-full max-w-full h-auto "
              style={{
                background: "linear-gradient(#71C100, #65C900)",
              }}
            />
            <h2 className="nombreCard text-2xl pt-2">Anthony Cerezo</h2>

            <p className="subTitulo text-base">@boss_dota_caster</p>

            <h3 className="about pt-8 pb-4">Sobre Mi</h3>

            <p className="descripcion text-base w-60">
              Jugador de dota 2 de corazón desde mis inicios me apasioné por la
              escena competitiva y actualmente dedico mi tiempo a organizar
              torneos y casteo profesional.
            </p>

            <div className="flex gap-10 border- border-t border-[#32353B] mt-6">
              <a
                href="https://instagram.com/boss_dota_caster?igshid=YmMyMTA2M2Y="
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="../icons/instagram.svg"
                  alt="instagram"
                  className="w-12 mt-4"
                />
              </a>
              <a href="https://instagram.com/boss_dota_caster?igshid=YmMyMTA2M2Y=" rel="noreferrer">
                <img
                  src="../icons/twitter.svg"
                  alt="twitter"
                  className="w-12 mt-4"
                />
              </a>
              <a
                href="https://instagram.com/boss_dota_caster?igshid=YmMyMTA2M2Y="
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="../icons/twitch.svg"
                  alt="twitch"
                  className="w-12 mt-4"
                />
              </a>
            </div>
          </div>
        </div>
      </div>


      <div className="lg:flex">
      {/* elizabeth */}
      <div className="flex lg:w-96 relative mt-20 flex-col card items-center justify-center w-auto m-4">
        <div className="flex flex-col items-center justify-center relative top-[-7vh] pt-[-7vh] w-52 ">
          <img
            src="../images/team/elizabethcirculo.png"
            alt="..."
            className="circuloPerfil p-2 rounded-full max-w-full h-auto "
            style={{
              background: "linear-gradient(#71C100, #65C900)",
            }}
          />
          <h2 className="nombreCard text-2xl pt-2">Elizabeth Banegas</h2>
          <p className="subTitulo text-base">@helguis</p>

          <h3 className="about pt-8 pb-4">Sobre Mi</h3>

          <p className="descripcion text-base w-60">
            Amante de los videojuegos, skincare lover, Otaku de closet 🤭 Aveces
            hago streams en Twitch cuando el internet me deja.
          </p>

          <div className="flex gap-10 border- border-t border-[#32353B] mt-6">
            <a
              href="https://instagram.com/elizabethbanegas_"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="../icons/instagram.svg"
                alt="instagram"
                className="w-12 mt-4"
              />
            </a>
            <a
              href="https://www.twitter.com/helguis_"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="../icons/twitter.svg"
                alt="twitter"
                className="w-12 mt-4"
              />
            </a>
            <a
              href="https://www.twitch.tv/helguis"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="../icons/twitch.svg"
                alt="twitch"
                className="w-12 mt-4"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Sayan Db el que todos quieren una pieza de el xd */}

      <div className="flex lg:w-96 relative mt-20 flex-col card items-center justify-center w-auto m-4">
        <div className="flex flex-col items-center justify-center relative top-[-7vh] pt-[-7vh] w-52 ">
          <img
            src="../images/team/sayancirculo.png"
            alt="..."
            className="circuloPerfil p-2 rounded-full max-w-full h-auto "
            style={{
              background: "linear-gradient(#71C100, #65C900)",
            }}
          />
          <h2 className="nombreCard text-2xl pt-2">Daniel Arevalo</h2>

          <p className="subTitulo text-base">@saiyandb</p>

          <h3 className="about pt-8 pb-4">Sobre Mi</h3>

          <p className="descripcion text-base w-60">
            Jugador de warcraft 3 2001 - 2006, jugador de dota 1 desde 2006 -
            2012 y dota 2012 actualmente.
          </p>

          <div className="flex gap-10 border- border-t border-[#32353B] mt-6">
            <a
              href="https://instagram.com/saiyandb"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="../icons/instagram.svg"
                alt="instagram"
                className="w-12 mt-4"
              />
            </a>
            <a
              href="https://www.twitter.com/saiyanpro"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="../icons/twitter.svg"
                alt="twitter"
                className="w-12 mt-4"
              />
            </a>
            <a
              href="https://www.twitch.tv/saiyanpro"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="../icons/twitch.svg"
                alt="twitch"
                className="w-12 mt-4"
              />
            </a>
          </div>
        </div>
      </div>
      </div>

    </div>
  </>
  );
};

export default Cards;
