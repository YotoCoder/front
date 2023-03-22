import Link from "next/link";
import React from "react";

const Impacto = () => {
  return (
    <div className="pl-[10px]">
      <div className=" bg-left h-[300px] lg:h-[600px] bg-backgroundImpacto bg-contain bg-no-repeat">
        <div className="">
          <p className="text-white flex justify-end text-4xl py-7 font-black relative right-10">
            GRAN<br></br>
            IMPACTO
          </p>
          <div className="flex justify-end relative">
            <p className="text-white text-4xl font-black  ">42</p>
            <div className="">
              <p className="text-white flex text-sm font-black py-1 pl-1 ">
                Jugadores
              </p>
              <p className="text-white flex text-xs font-black py-0 pl-1 ">
                Activos
              </p>
              <div className="flex items-center right-10 relative">
                <div>
                  <img
                    src="/images/sections/flecha.svg"
                    alt="flecha"
                    className="py-7 right-2 relative"
                  />
                </div>
                <div>
                  <Link
                    href="/mmrchampionship/1"
                    className="text-white hover:bg-yellow-900 text-[10px] lg:text-3xl font-bold px-4 py-[8px] lg:px-8 lg:pb-3 lg:py-[4px] tracking-wide"
                    style={{
                      boxSizing: "border-box",
                      border: "4px solid #FDEA82",
                      borderRadius: "20px",
                    }}
                  >
                    UNETE AHORA
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2">
          <p className="text-white flex justify-start text-[14px] pt-7 pb-[10px] font-black relative ">
            APOYAMOS<br></br>
          </p>

          <p className="text-white ">
            Además de los torneos y ligas regulares, también organizamos eventos especiales y de caridad para la comunidad, lo que nos permite retribuir a la comunidad y hacer una diferencia en la vida de otros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impacto;
