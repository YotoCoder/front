import React from "react";
import Image from "next/image";

const Circle = () => {
  return <div className="w-6 h-6 bg-white rounded-full"></div>;
};

export const CardStaff = () => {
  return (
    <div className="bg-[#7DCD00] ml-20 mr-4 pt-5 mt-4 max-w-max pr-4">
      <div className="flex">
        <Image
          src="/images/team/yotobn.jpg"
          width={210}
          height={210}
          alt="Yoto"
          className="-translate-x-1/2 w-28 pb-6"
        />
        <div className="-translate-x-10">
          <div className="text-[#DBFFA3]">Desarrollador Web</div>
          <div className="text-xl font-bold text-white">Yonathan Soto</div>
          <div className="text-xl text-white">@yoto</div>
          <div className="text-xs text-white w-48">
            Desarrollador web, amante de los videojuegos, la música y el cine.
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
