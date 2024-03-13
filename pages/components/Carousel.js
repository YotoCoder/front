import CardStaff from "./CardStaff";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Breakpoints } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"

SwiperCore.use([Navigation, Pagination, Autoplay, Breakpoints]);

export default () => {
  return (
    <Swiper
      spaceBetween={30}
      
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      breakpoints={{
        // Cuando el ancho de la ventana es igual o mayor a 768px (tamaño de una tableta en horizontal)
        768: {
          slidesPerView: 2,
        },
        // Cuando el ancho de la ventana es menor a 768px (tamaño de dispositivos móviles)
        0: {
          slidesPerView: 1,
        },
      }}
    >
      <SwiperSlide>
        <CardStaff
          imagen={"/images/team/grechi.jpg"}
          rol={"Host"}
          nombre={"Grecia Mogollón"}
          nick={"@grechi"}
          descripcion={
            "Sreamer, cantante. Amo el metal, la música, juegos de terror y gatos."
          }
        />
      </SwiperSlide>
      <SwiperSlide>
        <CardStaff
          imagen={"/images/team/yotobn.jpg"}
          rol={"Desarrollador Web"}
          nombre={"Yonathan Soto"}
          nick={"@yoto"}
          descripcion={"Amante de los videojuegos, la música y el cine."}
        />
      </SwiperSlide>
      <SwiperSlide>
        <CardStaff
          imagen={"/images/team/miguel.jpg"}
          rol={"Camera"}
          nombre={"Miguel Paz"}
          nick={"@Pepperoni"}
          descripcion={"Apasionado por el Dota y la buena comida."}
        />
      </SwiperSlide>
      <SwiperSlide>
        <CardStaff
          imagen={"/images/team/fito.jpg"}
          rol={"Caster/Analista"}
          nombre={"Rodolfo Arciniegas"}
          nick={"@Fito"}
          descripcion={"Músico, Streamer y Un Fanático extremo del DOTA!"}
        />
      </SwiperSlide>
      <SwiperSlide>
        <CardStaff
          imagen={"/images/team/sayandb.jpg"}
          rol={"Moderador"}
          nombre={"Daniel Arévalo"}
          nick={"@saiyandb"}
          descripcion={"Jugador de dota desde que empezó hasta la actualidad."}
        />
      </SwiperSlide>
    </Swiper>
  );
};
