import React from "react";
import Carousel from "./Carousel";

export default function Equipo() {
  return (
    <div className="bg-white -translate-y-44 ">
      <div>
        <div className="text-2xl pl-4">Nuestro equipo</div>
      </div>
      <div className="flex overflow-x-auto">

        <Carousel />


      </div>
    </div>
  );
}
