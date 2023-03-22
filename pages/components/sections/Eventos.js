import Link from "next/link";
import React from "react";

const Eventos = () => {
  return (
    <div className="lg:pl-44">
      <div className="">
        <img
          src="/images/sections/x.svg"
          alt="Eventos"
          className="w-6 lg:w-14"
        />
      </div>
      <div className="px-[10px] bg-right h-[220px] lg:h-[600px] bg-backgroundEvento bg-contain bg-no-repeat">
        <p
          className="text-white pb-4 lg:pb-20 font-black text-3xl lg:text-6xl tracking-wide"
          style={{}}
        >
          EVENTOS
        </p>

        <div className="flex items-center gap-4">
          <div>
            <p className="text-white leading-2 tracking-wide max-w-[200px]  lg:max-w-[460px] text-[10px] lg:text-[24px]">
              Organizamos torneos y ligas de Dota 2 exclusivos para jugadores
              venezolanos, brindando una plataforma para que los jugadores
              muestren su talento y habilidades en el juego.
            </p>

            <p className="pt-2 lg:pt-16 pb-2 lg:pb-8 pl-3 text-white text-xs lg:text-3xl ">
              Participa Ahora!!
            </p>
            <div className="space-x-2">
              <Link
                href="/mmrchampionship/1"
                className="text-white hover:bg-yellow-900 text-xs lg:text-3xl font-bold px-4 py-[2px] lg:px-8 lg:pb-3 lg:py-[4px] tracking-wide"
                style={{
                  boxSizing: "border-box",

                  width: "80px",
                  height: "28px",
                  left: "19px",
                  top: "773px",

                  border: "4px solid #FDEA82",
                  borderRadius: "20px",
                }}
              >
                Ligas
              </Link>

              <Link
                href="/torneo"
                className="text-white hover:bg-yellow-900 text-xs lg:text-3xl font-bold px-4 py-[2px] lg:px-8 lg:pb-3 lg:py-[4px] tracking-wide"
                style={{
                  boxSizing: "border-box",

                  width: "80px",
                  height: "28px",
                  left: "19px",
                  top: "773px",

                  border: "4px solid #FDEA82",
                  borderRadius: "20px",
                }}
              >
                Torneos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventos;
