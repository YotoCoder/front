import React from 'react'

import { MdSportsEsports } from "react-icons/md";
import { GiVenezuela } from "react-icons/gi";



const About = () => {
  return (
    
    <main className="">
        <h1 className="nombreCard lg:mb-20 flex flex-col items-center justify-center text-3xl lg:text-6xl lg:p-10"
            style={{
              background: "linear-gradient(90deg, #76C200, #76C200, #76C200, #76C200)",
              
              color: '#EFEFEF',
              textShadow: '1px 0px 1px #000000',
              
          }}
        >
              <b>Venezuela Master CUP </b>
            <i className='text-black text-base lg:text-3xl lg:p-2'
               style={{
                textShadow: 'none',
               }}    
            >Organización de torneos de Dota 2 online.</i>

        </h1>

        <div className="flex gap-3 items-center  justify-center flex-col lg:flex-row lg:items-start ">
          <img
            className="w-[380px] h-[400px] object-cover rounded-md"
            src="../images/escudo.png"
            alt='logo'
          />

          <div className="w-full flex flex-col items-center justify-center h-full">
          <h2 className='nombreCard text-4xl pb-4'>¿Quienes somos?</h2>
           
            <p className=" items-center justify-center mx-4 subTitulo text-xl lg:text-2xl">
              <b>Venezuela Master CUP</b> o <b>VMC</b> es un proyecto de <i>Esports</i> en rápido crecimiento.
              Nuestra misión es popularizar los <i>Esports</i> profesionales y organizar torneos para apoyar a la comunidad <b>Venezolana</b> y <b>Latinoamericana</b>.
            </p>

            <div className="flex flex-col gap-2 items-center justify-center lg:flex-row m-10">
              <div className="flex flex-col items-center ">
                <MdSportsEsports className="text-[80px] text-white " />
                <button className="bg-black rounded-full h-[50px] w-[260px] text-white  mt-3">
                  Contactanos
                </button>
              </div>
              <div className="flex flex-col items-center">
                <GiVenezuela className="text-[80px] text-white " />
                <a
                  className="bg-black rounded-full h-[50px] w-[260px] text-white  mt-3 flex justify-center items-center"
                  href="https://instagram.com/vemastercup?igshid=YmMyMTA2M2Y="
                  target="_blank"
                >
                  Más información
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}

export default About