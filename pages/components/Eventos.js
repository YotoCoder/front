import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Eventos = () => {
  return (
    <div className="lg:flex">
      <div className="bg-white -translate-y-36 p-4">
        <h3 className="text-xl lg:text-2xl !font-light text-left text-[#1A1A1A] ">
          Eventos
        </h3>
        <div className="flex flex-col bg-[#7DCD00] pb-8">
          <Image
            src="/images/event0.png"
            alt="Venezuela Master CUP"
            width={2000}
            height={0}
            className="shadow-lg"
          />
          <div className="mx-8">
            <div className="text-gray-900 my-4 text-xl">PARTICIPA</div>
            <div className="text-gray-900">
              Organizamos torneos y ligas de Dota 2 exclusivos para jugadores
              venezolanos, brindando una plataforma para que los jugadores
              muestren su talento y habilidades en el juego.
            </div>
            <div className="lg:flex gap-2">
              <button className="bg-white p-5 mt-4 text-gray-900 w-full">
                <Link href="/mmrchampionship/1">LIGAS</Link>
              </button>
              <button className="bg-white p-5 mt-2 lg:mt-4 text-gray-900 w-full">
                <Link href="/torneo-clasificatorio-iesf-2024">TORNEOS</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white -translate-y-36 p-4">
        <div className="flex flex-col bg-[#7DCD00] pb-8 lg:mt-8">
          <Image
            src="/images/event00.png"
            alt="Venezuela Master CUP"
            width={2000}
            height={0}
            className="shadow-lg"
          />
          <div className="mx-8">
            <div className="text-gray-900 my-4 text-xl">GRAN IMPACTO</div>
            <div className="text-gray-900">
              Organizamos eventos especiales y de caridad para la comunidad, lo
              que nos permite retribuir a la comunidad y hacer la diferencia.
              Somos más de 42 jugadores activos.
            </div>
            <div className="lg:flex gap-2">
              <button className="bg-white p-5 mt-4 text-gray-900 w-full">
                <Link href="https://discord.gg/zz9sRDzcFP" target="__blank">
                  UNETE AHORA
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
