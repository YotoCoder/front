import Link from "next/link";
import React from "react";

const Impacto = () => {
  return (
    <div className="pl-[15px] lg:pl-[40px]">
      <div className=" bg-left h-[300px] lg:h-[800px] bg-backgroundImpacto bg-contain bg-no-repeat">
        <div className="lg:flex lg:flex-col lg:items-center">
          <p className="text-white flex justify-end text-4xl lg:text-6xl lg:pt-44 py-7 font-black relative right-10 lg:right-0 lg:left-10">
            GRAN<br></br>
            IMPACTO
          </p>

          <p className="text-white relative lg:w-[400px] lg:left-[100px] hidden lg:block lg:pb-4 ">
            Además de los torneos y ligas regulares, también organizamos eventos
            especiales y de caridad para la comunidad, lo que nos permite
            retribuir a la comunidad y hacer una diferencia en la vida de otros.
          </p>

          <div className="flex justify-end relative lg:left-32">
            <p className="text-white text-4xl lg:text-8xl  font-black  ">42</p>
            <div className="">
              <p className="text-white flex text-sm lg:text-3xl lg:py-3 lg:px-3 font-black py-1 pl-1 ">
                Jugadores
              </p>
              <p className="text-white flex text-xs lg:text-2xl lg:px-3 font-black py-0 pl-1 ">
                Activos
              </p>
              <div className="flex items-center right-10 relative">
                <div>
                  <img
                    src="/images/sections/flecha.svg"
                    alt="flecha"
                    className="py-7 right-2 relative lg:h-24"
                  />
                </div>
                <div>
                  <Link
                    href="https://discord.gg/fcR7VHVd"
                    className="text-white hover:bg-lime-900 text-[10px] lg:text-3xl font-bold px-4 py-[8px] lg:px-8 lg:pb-3 lg:py-[4px] tracking-wide"
                    style={{
                      boxSizing: "border-box",
                      border: "4px solid #77C100",
                      borderRadius: "20px",
                    }}
                    target="_blank"
                  >
                    UNETE AHORA
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 lg:flex flex-col lg:items-center lg:justify-center">
          <p className="text-white lg:invisible flex justify-start text-[14px] pt-7 pb-[10px] font-black relative ">
            APOYAMOS<br></br>
          </p>

          <p className="text-white lg:w-[450px] lg:hidden block ">
            Además de los torneos y ligas regulares, también organizamos eventos
            especiales y de caridad para la comunidad, lo que nos permite
            retribuir a la comunidad y hacer una diferencia en la vida de otros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impacto;
