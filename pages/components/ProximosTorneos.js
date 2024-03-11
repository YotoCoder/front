import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProximosTorneos() {
  return (
    <div className="lg:flex flex-col lg:flex-row gap-4 justify-center items-center">
      <div className="lg:flex gap-6 bg-[#7DCD00] mt-2 p-6 w-auto">
        <div className="flex flex-col gap-4">
          <div className="text-[#DBFFA3] text-sm">
            Lunes, 11 de Marzo a la 7 PM
          </div>
          <div className="text-white text-xl font-bold cursor-pointer">
            <Link href="/torneo-clasificatorio-iesf-2024">
            Campeonato Nacional Clasificatorio
            </Link>
          </div>
          <div className="text-[#FFFFFF] text-base">
            Eliminatorias Brasil rumbo al IESF WEC24 en Riyahd 2024
          </div>
          <div className="text-[#F1F1F1] text-base">
            #DOTA2 #IESF #FVDE #VMC{" "}
          </div>
        </div>
        <Image
          // animar el icono que brinque arriba y abajo
          src="/images/escudo.png"
          alt="Venezuela Master CUP"
          width={140}
          height={140}
          className="object-cover mt-4 lg:mt-0 bg-[#111111]"
        />
      </div>
      <div className="lg:flex gap-6 bg-[#7DCD00] mt-2 p-6 w-auto">
        <div className="flex flex-col gap-4">
          <div className="text-[#DBFFA3] text-sm">
            Lunes, 11 de Marzo a la 7 PM
          </div>
          <div className="text-white text-xl font-bold cursor-pointer">
            <Link href="/torneo-clasificatorio-iesf-2024">
            Campeonato Nacional Clasificatorio
            </Link>
          </div>
          <div className="text-[#FFFFFF] text-base">
            Eliminatorias Brasil rumbo al IESF WEC24 en Riyahd 2024
          </div>
          <div className="text-[#F1F1F1] text-base">
            #DOTA2 #IESF #FVDE #VMC{" "}
          </div>
        </div>
        <Image
          // animar el icono que brinque arriba y abajo
          src="/images/escudo.png"
          alt="Venezuela Master CUP"
          width={140}
          height={140}
          className="object-cover mt-4 lg:mt-0 bg-[#111111]"
        />
      </div>
    </div>
  );
};
