import React from "react";
import CardStaff from "./CardStaff";

export default function Equipo() {
  return (
    <div className="bg-white -translate-y-44 ">
      <div>
        <div className="text-2xl pl-4">Nuestro equipo</div>
      </div>
      <div className="lg:flex">
        <div>
          <CardStaff
            imagen={"/images/team/grechi.jpg"}
            rol={"Host"}
            nombre={"Grecia Mogollón"}
            nick={"@grechi"}
            descripcion={
              "Sreamer, cantante. Amo el metal, la música, juegos de terror y gatos."
            }
          />

          <CardStaff
            imagen={"/images/team/yotobn.jpg"}
            rol={"Desarrollador Web"}
            nombre={"Yonathan Soto"}
            nick={"@yoto"}
            descripcion={"Amante de los videojuegos, la música y el cine."}
          />
        </div>
        <div>
          <CardStaff
            imagen={"/images/team/miguel.jpg"}
            rol={"Camera"}
            nombre={"Miguel Paz"}
            nick={"@Pepperoni"}
            descripcion={"Apasionado por el Dota y la buena comida."}
          />

          <CardStaff
            imagen={"/images/team/fito.jpg"}
            rol={"Caster/Analista"}
            nombre={"Rodolfo Arciniegas"}
            nick={"@Fito"}
            descripcion={"Músico, Streamer y Un Fanático extremo del DOTA!"}
          />
        </div>
        <div>
        <CardStaff
          imagen={"/images/team/sayandb.jpg"}
          rol={"Moderador"}
          nombre={"Daniel Arévalo"}
          nick={"@saiyandb"}
          descripcion={"Jugador de dota desde que empezó hasta la actualidad."}
        />
        </div>
      </div>
    </div>
  );
}
