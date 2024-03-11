import React from "react";
import Image from "next/image";

export const Patrocinadores = () => {
  return (
    <div className="bg-white -translate-y-52">
      <div className="text-2xl mx-4">Nuestros sponsors</div>

      <div className="lg:flex-row flex flex-col mx-auto">
        <Image
          src={"/images/sponsors/gondwanab&n.png"}
          width={200}
          height={200}
          alt="Gondwana"
          className="m-auto mt-8"
        />
        <Image
          src={"/images/sponsors/melkarb&n.png"}
          width={200}
          height={200}
          alt="Melkar"
          className="m-auto mt-8"
        />
        <Image
          src={"/images/sponsors/salamanderb&n.png"}
          width={200}
          height={200}
          alt="Red Salamander"
          className="m-auto mt-8"
        />
      </div>
    </div>
  );
};
