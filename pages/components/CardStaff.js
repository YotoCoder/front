import React from "react";
import Image from "next/image";

const Circle = () => {
  return <div className="w-6 h-6 bg-white rounded-full"></div>;
};

export default function CardStaff ({imagen, rol, nombre, nick, descripcion}) {
  return (
    <div className="bg-[#7DCD00] ml-20 mr-4 pt-6 mt-4 max-w-max pr-4 pb-7">
      <div className="flex">
        <Image
          src={imagen}
          width={210}
          height={210}
          alt={nombre}
          className="-translate-x-1/2 w-28 object-cover"
        />
        <div className="-translate-x-10">
          <div className="text-[#DBFFA3]">{rol}</div>
          <div className="text-xl font-bold text-white">{nombre}</div>
          <div className="text-xl text-white">{nick}</div>
          <div className="text-xs text-white w-48">
            {descripcion}
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-1">
          <Circle />
          <Circle />
          <Circle />
        </div>
      </div>
    </div>
  );
};
